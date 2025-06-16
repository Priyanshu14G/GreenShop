import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import { Pool } from "@neondatabase/serverless";
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const requireAuth = ClerkExpressRequireAuth();

console.log("✅ Clerk initialized successfully");
console.log("✅ Clerk Secret Key:", process.env.CLERK_SECRET_KEY?.slice(0, 8) + "...");
console.log("✅ Database URL:", process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || "Connected");

// GET products — public route
app.get("/api/products", async (req, res) => {
  try {
    const raw = fs.readFileSync("products.json");
    const data = JSON.parse(raw);
    const products = data.products;
    
    const filtered = products.filter((p) =>
      p.code &&
      p.product_name &&
      (p.image_url || p.image_front_url) &&
      p.nutriscore_grade &&
      p.environmental_score_data?.grade !== "unknown"
    );
    
    console.log("Filtered products:", filtered.length);
    res.json(filtered.slice(0, 50));
  } catch (error) {
    console.error("Error reading products.json:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/purchase", requireAuth, async (req, res) => {
  const { userId } = req.auth;

  try {
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found");
    }

    // Extract all fields from request body
    const { product_code, product_name, carbon_emission } = req.body;
    
    // DEBUG: Log the received carbon emission
    console.log(`Carbon emission for ${product_name}:`, carbon_emission);

    // Insert user
    await pool.query(
      `INSERT INTO users (id, email)
       VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email`,
      [userId, email]
    );

    // Insert purchase with carbon_emission
    await pool.query(
      `INSERT INTO purchases (user_id, product_code, product_name, carbon_emission)
       VALUES ($1, $2, $3, $4)`,
      [userId, product_code, product_name, carbon_emission]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error inserting purchase:", error);
    res.status(500).json({ 
      error: error.message,
      details: "Error recording purchase"
    });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});