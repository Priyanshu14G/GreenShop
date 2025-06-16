// components/ProductCard.js
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";

// Eco grade color mapping
const ECO_GRADE_COLORS = {
  "a-plus": "bg-green-700 dark:bg-green-900",
  a: "bg-green-600 dark:bg-green-800",
  b: "bg-lime-500 dark:bg-lime-700",
  c: "bg-yellow-500 dark:bg-yellow-700",
  d: "bg-orange-500 dark:bg-orange-700",
  e: "bg-red-500 dark:bg-red-700",
  unknown: "bg-gray-500 dark:bg-gray-700"
};

// Nutri grade colors
const NUTRI_GRADE_COLORS = {
  a: "bg-green-600 dark:bg-green-800",
  b: "bg-lime-500 dark:bg-lime-700",
  c: "bg-yellow-500 dark:bg-yellow-700",
  d: "bg-orange-500 dark:bg-orange-700",
  e: "bg-red-500 dark:bg-red-700"
};

export default function ProductCard({ product }) {
  const [purchased, setPurchased] = useState(false);

  const {
    product_name,
    image_url,
    image_front_url,
    image_front_small_url,
    nutriscore_grade,
    environmental_score_data,
    packaging_tags = [],
    ingredients_analysis_tags = [],
    nutriments = {},
    code
  } = product;

  const image = image_url || image_front_url || image_front_small_url;
  const ecoGrade = environmental_score_data?.grade?.toLowerCase() || "unknown";
  const carbonFootprint = nutriments["carbon-footprint-from-known-ingredients_100g"];

  // Extract packaging materials
  const packaging = packaging_tags
    .filter(tag => tag.startsWith("en:"))
    .map(tag => tag.split(":")[1].replace(/-/g, " "));

  // 💰 Buy button handler
  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_code: code,
          product_name
        })
      });

      if (res.ok) {
        setPurchased(true);
        alert("✅ Purchase recorded!");
      } else {
        alert("❌ Failed to record purchase.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("❌ Error occurred while purchasing.");
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-green-100 dark:border-green-900/50">
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={product_name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400">
            <span>No Image</span>
          </div>
        )}
        
        {/* Eco Grade Badge */}
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${ECO_GRADE_COLORS[ecoGrade]}`}>
          {ecoGrade === "a-plus" ? "A+" : ecoGrade.charAt(0).toUpperCase()}
        </div>

        {/* Optional Purchased badge */}
        {purchased && (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            Purchased
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h2 className="font-bold text-xl mb-2 text-green-800 dark:text-green-200 line-clamp-1">
          {product_name}
        </h2>

        {/* Environmental Impact Summary */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Environmental Impact</h3>
            <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300">
              Score: {environmental_score_data?.score || "N/A"}
            </Badge>
          </div>

          {/* Carbon Footprint */}
          {carbonFootprint && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">♻️</span>
              </div>
              <p className="text-sm">
                <span className="font-medium">Carbon Footprint:</span> {carbonFootprint} kg CO₂-eq
              </p>
            </div>
          )}

          {/* Packaging */}
          {packaging.length > 0 && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">📦</span>
              </div>
              <p className="text-sm">
                <span className="font-medium">Packaging:</span> {packaging.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Additional Indicators */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-green-100 dark:border-green-900/50">
          {/* Nutri-Score */}
          {nutriscore_grade && (
            <div className={`px-3 py-1 rounded-full text-white text-xs font-bold ${NUTRI_GRADE_COLORS[nutriscore_grade]}`}>
              Nutri-Score: {nutriscore_grade.toUpperCase()}
            </div>
          )}

          {/* Palm Oil */}
          {ingredients_analysis_tags.includes("en:palm-oil") && (
            <div className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs">
              🐒 Palm Oil
            </div>
          )}

          {/* Vegetarian */}
          {ingredients_analysis_tags.includes("en:vegetarian") && (
            <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
              🌱 Vegetarian
            </div>
          )}
        </div>

        {/* 🛒 Buy Button */}
        <div className="mt-4">
          <button
            onClick={handlePurchase}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
            disabled={purchased}
          >
            {purchased ? "✔ Purchased" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}
