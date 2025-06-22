import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Search, Filter, Sparkles, Leaf, Apple, AlignLeft, Grid, List, ChevronDown, Star, Zap, Recycle } from "lucide-react";
// import FilterSidebar from "../components/FilterSidebar"; // Adjust path if needed
import FilterSidebar from "../components/FilterSidebar"

const GRADE_COLORS = {
  "a-plus": "from-emerald-400 via-green-400 to-teal-500",
  "a": "from-green-400 via-lime-400 to-emerald-500", 
  "b": "from-yellow-400 via-amber-400 to-orange-400",
  "c": "from-orange-400 via-red-400 to-pink-400",
  "d": "from-red-400 via-rose-400 to-pink-500",
  "e": "from-pink-500 via-purple-500 to-violet-500",
  "unknown": "from-gray-400 via-slate-400 to-gray-500"
};

const GRADE_SHADOWS = {
  "a-plus": "shadow-emerald-500/25",
  "a": "shadow-green-500/25",
  "b": "shadow-yellow-500/25", 
  "c": "shadow-orange-500/25",
  "d": "shadow-red-500/25",
  "e": "shadow-purple-500/25",
  "unknown": "shadow-gray-500/25"
};

function ProductCard({ product, index }) {
  const { getToken } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const ecoGrade = product.environmental_score_data?.grade || "unknown";
  const nutriGrade = product.nutriscore_grade || "unknown";
  const price = (parseInt(product.code) % 50 + 5.99).toFixed(2);

  const handlePurchase = async () => {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.VITE_REACT_APP_BACKEND_BASEURL}/api/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_code: product.code,
          product_name: product.product_name,
          price: price, 
          image_url: product.image_url || product.image_front_url, 
        }),
      });

      if (res.ok) {
        setPurchased(true);
        alert("✅ Purchase recorded!");
      } else {
        const errorData = await res.json();
        console.error("Purchase failed:", errorData);
        alert(`❌ Failed to record purchase: ${errorData.error}`);
      }
    } catch (error) {
      console.error("❌ Purchase error:", error);
      alert("❌ Error occurred while purchasing. Check console for details.");
    }
  };

  return (
    <div
      className={`group relative transform transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${
        isHovered ? "z-20" : "z-10"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${GRADE_COLORS[ecoGrade]} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-1000`}
      />
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 dark:border-gray-800/50 shadow-2xl hover:shadow-4xl transition-all duration-700">
        {ecoGrade === "a-plus" && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3" />
            PREMIUM
          </div>
        )}

        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
          {product.image_url ? (
            <>
              <img
                src={product.image_url}
                alt={product.product_name}
                className={`w-full h-full transition-all duration-1000 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 dark:from-gray-700 dark:to-gray-600">
              <div className="text-6xl opacity-50">🌿</div>
            </div>
          )}

          {/* Grades */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div
              className={`bg-gradient-to-r ${GRADE_COLORS[ecoGrade]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ${GRADE_SHADOWS[ecoGrade]} flex items-center gap-1`}
            >
              <Leaf className="w-3 h-3" />
              {ecoGrade.toUpperCase()}
            </div>
            <div
              className={`bg-gradient-to-r ${GRADE_COLORS[nutriGrade]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ${GRADE_SHADOWS[nutriGrade]} flex items-center gap-1`}
            >
              <Apple className="w-3 h-3" />
              {nutriGrade.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              {product.product_name || "Eco Product"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description || "Sustainable product with eco-friendly design"}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full font-medium">
              {product.brand || "Eco Brand"}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {product.category || "Sustainable"}
            </span>
          </div>

          {/* Buy Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${price}
            </div>
            <button
              onClick={handlePurchase}
              className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 cursor-pointer rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

function ProductDetail({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    if (product?.code) {
      setLoadingRelated(true);
      fetch(`${process.env.VITE_REACT_APP_BACKEND_BASEURL}/api/recommend/related/${product.code}`)
        .then(res => res.json())
        .then(data => {
          setRelatedProducts(data);
          setLoadingRelated(false);
        })
        .catch(err => {
          console.error("Failed to fetch related products:", err);
          setLoadingRelated(false);
        });
    }
  }, [product?.code]);

  if (!product) return <div>Loading product details...</div>;

  const ecoGrade = product.environmental_score_data?.grade || "unknown";
  const nutriGrade = product.nutriscore_grade || "unknown";
  const price = (parseInt(product.code) % 50 + 5.99).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 dark:border-gray-800/50 shadow-2xl">
          <div className="relative h-96 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 dark:from-gray-700 dark:to-gray-600">
                <div className="text-6xl opacity-50">🌿</div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`bg-gradient-to-r ${GRADE_COLORS[ecoGrade]} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg ${GRADE_SHADOWS[ecoGrade]} flex items-center gap-2`}>
              <Leaf className="w-4 h-4" />
              Eco Score: {ecoGrade.toUpperCase()}
            </div>
            <div className={`bg-gradient-to-r ${GRADE_COLORS[nutriGrade]} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg ${GRADE_SHADOWS[nutriGrade]} flex items-center gap-2`}>
              <Apple className="w-4 h-4" />
              Nutri Score: {nutriGrade.toUpperCase()}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {product.product_name}
          </h1>

          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}
          </p>

          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg inline-block">
            {product.brand || "Eco Brand"}
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            {product.description || "Sustainable product with eco-friendly design"}
          </p>

          <div className="pt-4">
            <button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Sustainable Products</h2>
        
        {loadingRelated ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-gray-800/50 shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.code} product={product} index={0} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No related products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="group relative">
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 dark:border-gray-800/50 shadow-xl animate-pulse">
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-32" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage({ product }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("eco");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!product) {
      fetchProducts();
    }
  }, [product]);

  useEffect(() => {
    if (!product) {
      filterAndSortProducts();
    }
  }, [products, searchTerm, sortBy, product]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.VITE_REACT_APP_BACKEND_BASEURL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sorting logic
    result.sort((a, b) => {
      const gradeOrder = { "a-plus": 0, a: 1, b: 2, c: 3, d: 4, e: 5, unknown: 6 };
      
      if (sortBy === "eco") {
        return gradeOrder[a.environmental_score_data?.grade] - gradeOrder[b.environmental_score_data?.grade];
      } else if (sortBy === "nutri") {
        return gradeOrder[a.nutriscore_grade] - gradeOrder[b.nutriscore_grade];
      } else if (sortBy === "name") {
        return a.product_name?.localeCompare(b.product_name);
      }
      return 0;
    });
    
    setFilteredProducts(result);
  };

  // If we have a specific product prop, show the detail view
  if (product) {
    return <ProductDetail product={product} />;
  }

  // Otherwise show the product grid view
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-300/10 to-green-400/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      <main className="relative container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 dark:border-gray-800/50 shadow-2xl mb-8">
            <Recycle className="w-5 h-5 text-green-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-green-600 dark:text-green-400 font-semibold">Sustainable Living</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 leading-tight">
            Eco-Friendly
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
              Products
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the future of sustainable living with our carefully curated collection of 
            <span className="font-semibold text-green-600 dark:text-green-400"> eco-conscious products</span>. 
            Each item is meticulously evaluated for environmental impact and sustainability.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl px-4 py-2 rounded-full border border-green-200/50 dark:border-green-800/50">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Carbon Neutral</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl px-4 py-2 rounded-full border border-green-200/50 dark:border-green-800/50">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Renewable Energy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl px-4 py-2 rounded-full border border-green-200/50 dark:border-green-800/50">
              <Recycle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recyclable</span>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filter Bar */}
        <div className="mb-12 space-y-6">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Search */}
              <div className="lg:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sustainable products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-green-200/50 dark:border-green-800/50 focus:border-green-400 dark:focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 text-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white transition-all duration-300"
                />
              </div>
              
              {/* Sort Options */}
              <div className="lg:col-span-4">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 shadow-inner">
                  <button
                    onClick={() => setSortBy("eco")}
                    className={`flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      sortBy === "eco" 
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-lg" 
                        : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <Leaf className="w-4 h-4" />
                    Eco
                  </button>
                  <button
                    onClick={() => setSortBy("nutri")}
                    className={`flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      sortBy === "nutri" 
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-lg" 
                        : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <Apple className="w-4 h-4" />
                    Nutri
                  </button>
                  <button
                    onClick={() => setSortBy("name")}
                    className={`flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      sortBy === "name" 
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-lg" 
                        : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <AlignLeft className="w-4 h-4" />
                    Name
                  </button>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="lg:col-span-2">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 shadow-inner">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      viewMode === "grid" 
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-lg" 
                        : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      viewMode === "list" 
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-lg" 
                        : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {loading ? "Loading..." : `${filteredProducts.length} sustainable products found`}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live inventory
            </div>
          </div>
        </div>

        {/* Product Grid */}
     {loading ? (
  <ProductGridSkeleton />
) : filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    {/* Filter Sidebar */}
    <div className="hidden lg:block">
      <FilterSidebar
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
    </div>

    {/* Products */}
    <div className="lg:col-span-3">
      <div
        className={`grid gap-8 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.code} product={product} index={index} />
        ))}
      </div>
    </div>
  </div>
) : (


          <div className="text-center py-32">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <div className="text-6xl animate-bounce">🌿</div>
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-xl mx-auto animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              No products found
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or explore our sustainable categories
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSortBy("eco");
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}