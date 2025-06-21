import express from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import pkg from "pg";
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/clerk-sdk-node";
import {algoliasearch} from "algoliasearch";
import { recommendClient } from "@algolia/recommend";

// Load environment variables first
dotenv.config();

console.log("🔍 Environment Variables:", {
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID ? "*****" : "MISSING",
  ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY ? "*****" : "MISSING",
  DATABASE_URL: process.env.DATABASE_URL ? "*****" : "MISSING"
});

const { Pool } = pkg;

// Validate required environment variables
const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_API_KEY;
const algoliaSearchKey = process.env.ALGOLIA_SEARCH_API_KEY;

if (!algoliaAppId || !algoliaAdminKey || !algoliaSearchKey) {
  console.error("❌ Algolia configuration missing from environment variables");
  process.exit(1);
}

// Initialize clients after validation
const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminKey);
const recClient = recommendClient(algoliaAppId, algoliaAdminKey);

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: process.env.VITE_REACT_APP_FRONTEND_BASEURL,
  credentials: true
}));
app.use(express.json());

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const requireAuth = ClerkExpressRequireAuth();

console.log("✅ Backend initialized");

// Routes
app.post('/api/sync-products', requireAuth, async (req, res) => {
  try {
    const raw = fs.readFileSync('products.json', 'utf8');
    const { products } = JSON.parse(raw);

    const enriched = products
      .filter(p => p.environmental_score_data?.score >= 80)
      .map(p => ({
        objectID: p.code,
        product_name: p.product_name,
        image_url: p.image_url || p.image_front_url,
        nutriscore_grade: p.nutriscore_grade,
        environmental_score: p.environmental_score_data?.score,
        environmental_grade: p.environmental_score_data?.grade,
        price: p.price_inr,
        category: p.category,
        popularity: Math.floor(Math.random() * 100) // Add a popularity score if not present
      }));

    await algoliaClient.initIndex('eco_products').saveObjects(enriched);

    res.json({ synced: enriched.length });
  } catch (err) {
    console.error("❌ Sync error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const raw = fs.readFileSync("products.json", "utf8");
    const { products } = JSON.parse(raw);

    const filtered = products.filter(p =>
      p.code && p.product_name &&
      (p.image_url || p.image_front_url) &&
      p.nutriscore_grade &&
      p.environmental_score_data?.grade !== "unknown"
    );

    res.json(filtered.slice(0, 50));
  } catch (err) {
    console.error("❌ Products error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recommend/trending', async (req, res) => {
  try {
    // First try to use the Recommend client
    let trendingItems = [];
    
    try {
      const response = await recClient.getRecommendations([
        {
          indexName: 'eco_products',
          model: 'trending-items',
          maxRecommendations: 8
        }
      ]);
      trendingItems = response.results[0]?.hits || [];
    } catch (recError) {
      console.log("⚠️ Using fallback search method for trending items");
      // Fallback to regular search if Recommend fails
      const searchResponse = await algoliaClient.initIndex('eco_products')
        .search('', {
          hitsPerPage: 8,
          filters: 'environmental_grade:a OR environmental_grade:b',
          sortBy: 'desc(popularity)'
        });
      trendingItems = searchResponse.hits;
    }

    // Transform items to match frontend expectations
    const formattedItems = trendingItems.map(item => ({
      objectID: item.objectID || item.code,
      product_name: item.product_name,
      image_url: item.image_url,
      category: item.category,
      price: item.price || 0,
      nutriscore_grade: item.nutriscore_grade || 'a',
      environmental_score: item.environmental_score || item.environmental_score_data?.score || 0,
      environmental_grade: item.environmental_grade || item.environmental_score_data?.grade || 'a',
      isEcoFriendly: true
    }));

    // Fallback items if needed
    if (formattedItems.length < 8) {
      const fallbackItems = [
        {
          objectID: "0012345678908",
          product_name: "Reusable Stainless Steel Water Bottle",
          image_url: "https://ushashriram.in/cdn/shop/products/41xKdTk3ZDL.jpg?v=1690574251",
          category: "kitchen",
          price: 499,
          nutriscore_grade: "a",
          environmental_score: 15,
          environmental_grade: "a",
          isEcoFriendly: true
        },
        {
          objectID: "0012345678923",
          product_name: "Zero-Waste Shampoo Bar",
          image_url: "https://m.media-amazon.com/images/I/71IddDsisTL.jpg",
          category: "personal_care",
          price: 199,
          nutriscore_grade: "a",
          environmental_score: 25,
          environmental_grade: "a",
          isEcoFriendly: true
        },
        {
          objectID: "0012345678916",
          product_name: "Reusable Beeswax Food Wraps",
          image_url: "https://m.media-amazon.com/images/I/81-cLbynG7L.jpg",
          category: "kitchen",
          price: 349,
          nutriscore_grade: "a",
          environmental_score: 14,
          environmental_grade: "a",
          isEcoFriendly: true
        }
      ];
      
      // Merge and deduplicate
      const mergedItems = [...new Map(
        [...formattedItems, ...fallbackItems])
          .map(item => [item.objectID, item])
          .values()
      ].slice(0, 8);
      
      return res.json(mergedItems);
    }
    
    res.json(formattedItems.slice(0, 8));
  } catch (err) {
    console.error("❌ Trending recommendations error:", err);
    res.status(500).json({ 
      error: "Failed to load trending products",
      details: err.message,
      suggestion: "Try refreshing the page or check back later"
    });
  }
});

app.post("/api/purchase", requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error("User email not found");

    const { product_code, product_name, price, image_url } = req.body;
    
    await pool.query(
      `INSERT INTO users(id,email) VALUES($1,$2)
       ON CONFLICT(id) DO UPDATE SET email=EXCLUDED.email`, 
      [userId, email]
    );
    
    await pool.query(
      `INSERT INTO purchases(user_id,product_code,product_name,price,image_url)
       VALUES($1,$2,$3,$4,$5)`, 
      [userId, product_code, product_name, price, image_url]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Purchase error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/purchases", requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;
    const result = await pool.query(
      `SELECT product_code,product_name,price,image_url
       FROM purchases WHERE user_id=$1 ORDER BY purchased_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Purchases error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/purchase/:productCode", requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productCode } = req.params;
    const result = await pool.query(
      `DELETE FROM purchases WHERE user_id=$1 AND product_code=$2 RETURNING *`,
      [userId, productCode]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (err) {
    console.error("❌ Delete purchase error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${process.env.VITE_REACT_APP_FRONTEND_BASEURL}`);
});

//path update