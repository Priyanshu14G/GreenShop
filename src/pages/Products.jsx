"use client"

import { useState } from "react"
import { Star, Shield, Heart, ShoppingCart, Filter } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const Products = () => {
  const { addItem } = useCart()
  const [favorites, setFavorites] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])

  const products = [
    {
      id: 1,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "2.1 kg CO₂",
      tags: ["Organic", "Fair Trade", "Plastic-Free"],
      category: "Fashion",
      rating: 4.8,
      reviews: 124,
      verified: true,
    },
    {
      id: 2,
      name: "Bamboo Phone Case",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
      ecoScore: "A",
      carbonFootprint: "0.8 kg CO₂",
      tags: ["Biodegradable", "Renewable", "Compostable"],
      category: "Electronics",
      rating: 4.9,
      reviews: 89,
      verified: true,
    },
    {
      id: 3,
      name: "Solar Power Bank",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
      ecoScore: "A",
      carbonFootprint: "3.2 kg CO₂",
      tags: ["Solar Powered", "Recyclable", "Energy Efficient"],
      category: "Electronics",
      rating: 4.7,
      reviews: 203,
      verified: true,
    },
    {
      id: 4,
      name: "Reusable Water Bottle",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "1.5 kg CO₂",
      tags: ["BPA-Free", "Lifetime Warranty", "Plastic-Free"],
      category: "Home",
      rating: 4.9,
      reviews: 156,
      verified: true,
    },
    {
      id: 5,
      name: "Eco-Friendly Cleaning Kit",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      ecoScore: "A",
      carbonFootprint: "2.8 kg CO₂",
      tags: ["Non-Toxic", "Biodegradable", "Refillable"],
      category: "Home",
      rating: 4.6,
      reviews: 78,
      verified: true,
    },
    {
      id: 6,
      name: "Organic Quinoa Bowl",
      price: 12.99,
      originalPrice: 16.99,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.5 kg CO₂",
      tags: ["Organic", "Locally Sourced", "Gluten-Free"],
      category: "Food",
      rating: 4.8,
      reviews: 92,
      verified: true,
    },
  ]

  const categories = ["All", "Fashion", "Electronics", "Home", "Food"]

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getEcoScoreColor = (score) => {
    switch (score) {
      case "A+":
        return "bg-green-600 text-white"
      case "A":
        return "bg-green-500 text-white"
      case "B":
        return "bg-yellow-500 text-white"
      case "C":
        return "bg-orange-500 text-white"
      case "D":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesCategory && matchesPrice
  })

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainable Products</h1>
          <p className="text-gray-600">Discover eco-friendly products verified for their environmental impact</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-green-600"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">Showing {filteredProducts.length} products</div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card card">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    {/* Eco Score Badge */}
                    <span className={`absolute top-3 left-3 badge ${getEcoScoreColor(product.ecoScore)}`}>
                      {product.ecoScore}
                    </span>

                    {/* Verified Badge */}
                    {product.verified && (
                      <span className="absolute top-3 right-3 badge bg-blue-600 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute bottom-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="badge bg-gray-100 text-gray-800 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-600">Carbon: {product.carbonFootprint}</div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        className="btn btn-primary flex items-center text-sm"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            ecoScore: product.ecoScore,
                            carbonFootprint: product.carbonFootprint,
                          })
                        }
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
