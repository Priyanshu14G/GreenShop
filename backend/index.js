import express from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import pkg from "pg";
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/clerk-sdk-node";

// Load environment variables first
dotenv.config();

console.log("🔍 Environment Variables:", {
  DATABASE_URL: process.env.DATABASE_URL ? "*****" : "MISSING"
});

const { Pool } = pkg;

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: process.env.VITE_REACT_APP_FRONTEND_BASEURL,
  credentials: true
}));
app.use(express.json());

const requireAuth = ClerkExpressRequireAuth();

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

console.log("✅ Backend initialized");

// Routes

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
