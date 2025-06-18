import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import pkg from "pg";
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();

const { Pool } = pkg;

const app = express();
const PORT = 4000;

app.use(cors({
  origin: "http://localhost:5173", // ✅ Your frontend origin
  credentials: true                // ✅ Allow sending tokens/cookies
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

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

    const filtered = products.filter(
      (p) =>
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
// POST /purchase — requires authentication
app.post("/api/purchase", requireAuth, async (req, res) => {
  const { userId } = req.auth;

  try {
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found");
    }

    const { product_code, product_name, price, image_url } = req.body; // ✅ added image_url

    await pool.query(
      `INSERT INTO users (id, email)
       VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email`,
      [userId, email]
    );

    await pool.query(
      `INSERT INTO purchases (user_id, product_code, product_name, price, image_url)
       VALUES ($1, $2, $3, $4, $5)`, // ✅ updated with image_url
      [userId, product_code, product_name, price, image_url]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error inserting purchase:", error);
    res.status(500).json({
      error: error.message,
      details:
        "Ensure your users table has an 'email' column that allows nulls or has a default.",
    });
  }
});

// GET /purchases — requires authentication
app.get("/api/purchases", requireAuth, async (req, res) => {
  const { userId } = req.auth;

  try {
    const result = await pool.query(
      `SELECT product_code, product_name, price, image_url
       FROM purchases 
       WHERE user_id = $1 
       ORDER BY purchased_at DESC`, // ✅ includes image_url now
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
});

// Add this new endpoint before app.listen()

// DELETE /purchase — requires authentication
app.delete("/api/purchase/:productCode", requireAuth, async (req, res) => {
  const { userId } = req.auth;
  const { productCode } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM purchases 
       WHERE user_id = $1 AND product_code = $2
       RETURNING *`,
      [userId, productCode]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found in purchases" });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({ error: "Failed to remove purchase" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});