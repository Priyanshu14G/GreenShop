import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  ShoppingCart,
  Leaf,
  Zap,
  Recycle,
  Sparkles,
  Star,
  Heart,
  Lock,
  Shield,
  Truck,
  Gift,
  Crown,
  Diamond,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [premiumAnimation, setPremiumAnimation] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    setPremiumAnimation(true);
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await fetch("/api/purchases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch purchases");
        }

        const data = await res.json();
        console.log("Fetched purchases:", data);

        // Convert to cart items
        const transformed = data.map((item) => ({
          id: item.product_code,
          name: item.product_name,
          price: parseFloat(item.price) || 19.99,
          quantity: 1,
          image: item.image_front_url || item.image_url || "",
          rating: 4.8,
          reviews: Math.floor(Math.random() * 500) + 100,
          sustainability: Math.floor(Math.random() * 20) + 80,
        }));

        setCartItems(transformed);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const savings = subtotal * 0.15;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-teal-900/20 relative overflow-hidden">
        {/* Light Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(16,185,129,0.03)_120deg,transparent_240deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(16,185,129,0.01)_120deg,transparent_240deg)]"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="text-center">
            <div className="relative mb-12">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 dark:from-emerald-800/30 dark:via-teal-800/30 dark:to-cyan-800/30 animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg">
                  <Crown className="w-12 h-12 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-500/70 dark:to-orange-500/70 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Curating Your Premium Experience
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Preparing your exclusive sustainable collection with utmost care
            </p>

            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-50 dark:from-slate-900 dark:via-red-900/20 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.02)_0%,transparent_70%)]"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 dark:from-red-600 dark:to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-200 dark:shadow-red-900/30">
              <div className="text-4xl">⚠️</div>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Temporary Service Interruption
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
              {error ||
                "Our premium service is momentarily unavailable. We're working to restore your luxury experience."}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="group relative bg-gradient-to-r from-red-400 via-pink-400 to-red-500 dark:from-red-500 dark:via-pink-500 dark:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-red-200 dark:shadow-red-900/30 hover:shadow-red-300 dark:hover:shadow-red-900/40 transition-all duration-500 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Shield className="w-5 h-5" />
                Retry Premium Service
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveItem = async (productCode) => {
    try {
      const token = await getToken();
      const res = await fetch(`/api/purchase/${productCode}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      // Optimistically update the UI
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productCode)
      );

      // Show a success feedback
      setPremiumAnimation(false);
      setTimeout(() => setPremiumAnimation(true), 100);
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900 dark:to-teal-900/20 relative overflow-hidden">
      {/* Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.02)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.02)_0%,transparent_50%)]"></div>
      <div
        className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(16,185,129,0.03)_120deg,transparent_240deg)] animate-spin dark:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(16,185,129,0.01)_120deg,transparent_240deg)]"
        style={{ animationDuration: "60s" }}
      ></div>

      {/* Search Bar - Added at the top */}
      {/* <div className="flex-1 max-w-md mx-6 hidden md:block pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input 
            placeholder="Search eco-friendly products..." 
            className="pl-10 bg-white dark:bg-slate-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600" 
          />
        </div>
      </div> */}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      <div
        className={`relative z-10 p-4 sm:p-8 transition-all duration-1000 ${
          premiumAnimation
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 dark:from-emerald-800/30 dark:to-teal-800/30 backdrop-blur-xl rounded-full px-6 py-3 border border-emerald-400/20 dark:border-emerald-800/50 mb-6 shadow-sm">
              <Crown className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Premium Cart Experience
              </span>
              <Diamond className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Your Luxury
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 bg-clip-text text-transparent">
              Sustainable Collection
            </h2>
          </div>

          <div className="flex flex-col xl:flex-row gap-12">
            {/* Cart Items */}
            <div className="xl:w-2/3">
              <div className="bg-white dark:bg-slate-800 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/20 relative overflow-hidden">
                {/* Light overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <ShoppingCart className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-white">
                            {cartItems.length}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-500 dark:text-slate-300">
                          Your Collection
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Handpicked sustainable luxury
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">
                          {cartItems.length}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Items
                        </div>
                      </div>
                      <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">
                          ${savings.toFixed(0)}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Saved
                        </div>
                      </div>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="text-slate-400 dark:text-slate-500 mb-4">
                        Your premium collection is empty
                      </div>
                      <a
                        href="/products"
                        className="inline-flex items-center gap-2 text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        Discover Premium Products
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {cartItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 m-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 transform hover:scale-[1.02]"
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* DELETE BUTTON */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemoveItem(item.id);
                            }}
                            className="absolute top-4 right-4 p-2 rounded-full cursor-pointer bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 backdrop-blur-md border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 hover:shadow-sm hover:shadow-red-100 dark:hover:shadow-red-900/20 z-20"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer transition-colors duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>

                          {/* Light glow effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl transition-opacity duration-500 ${
                              hoveredItem === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          ></div>

                          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            <div className="relative group-hover:scale-105 transition-transform duration-500">
                              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-xl border border-emerald-200 dark:border-emerald-800">
                                <img
                                  src={item.image || "/default.png"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "/default.png";
                                  }}
                                />
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                                <Heart className="w-4 h-4 text-white" />
                              </div>
                            </div>

                            <div className="flex-1 space-y-4">
                              <div>
                                <h4 className="text-2xl font-bold text-slate-500 dark:text-slate-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                  {item.name}
                                </h4>

                                {/* Rating and Reviews */}
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(item.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-slate-300 dark:text-slate-600"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-slate-700 dark:text-slate-300 font-medium ml-2">
                                      {item.rating}
                                    </span>
                                  </div>
                                  <span className="text-slate-500 dark:text-slate-400">
                                    ({item.reviews} reviews)
                                  </span>
                                </div>

                                {/* Premium badges */}
                                <div className="flex flex-wrap gap-3">
                                  <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-xl border border-emerald-200 dark:border-emerald-800">
                                    <Zap className="w-4 h-4" />
                                    Premium Eco
                                  </div>
                                  <div className="flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-xl border border-teal-200 dark:border-teal-800">
                                    <Recycle className="w-4 h-4" />
                                    100% Recyclable
                                  </div>
                                  <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-xl border border-green-200 dark:border-green-800">
                                    <Shield className="w-4 h-4" />
                                    {item.sustainability}% Sustainable
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-right space-y-2">
                              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                ${item.price.toFixed(2)}
                              </div>
                              <div className="text-slate-500 dark:text-slate-400">
                                Qty: {item.quantity}
                              </div>
                              <div className="text-emerald-500 dark:text-emerald-400 text-sm font-medium">
                                Save ${(item.price * 0.15).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Order Summary */}
            <div className="xl:w-1/3">
              <div className="sticky top-8 space-y-8">
                {/* Main Summary Card */}
                <div className="bg-white dark:bg-slate-800 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-2xl flex items-center justify-center shadow-sm">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-300">
                          Premium Summary
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Luxury breakdown
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Summary Items */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 dark:text-slate-400 text-lg">
                            Subtotal
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                              Premium Shipping
                            </span>
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            ${shipping.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 dark:text-slate-400">
                            Tax (8%)
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            ${tax.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2 text-emerald-600 dark:text-emerald-400">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            <span>Eco Savings (15%)</span>
                          </div>
                          <span className="font-semibold">
                            -${savings.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-slate-500 dark:text-slate-300">
                            Total
                          </span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            ${(total - savings).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-right mt-1">
                          Original:{" "}
                          <span className="line-through">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Premium Features */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Leaf className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Premium Benefits
                        </span>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Carbon-neutral shipping included
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Premium eco-friendly packaging
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Plant a tree with every purchase
                        </li>
                      </ul>
                    </div>

                    {/* Premium Checkout Button */}
                    <button
                      className={`group relative w-full mt-8 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 hover:shadow-emerald-300 dark:hover:shadow-emerald-900/40 transition-all duration-500 transform hover:scale-105 ${
                        cartItems.length === 0
                          ? "text-slate-400 cursor-not-allowed"
                          : "hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 dark:hover:from-emerald-600 dark:hover:via-teal-600 dark:hover:to-cyan-600"
                      }`}
                      disabled={cartItems.length === 0}
                    >
                      <a href="/checkout" className="block text-center text-white py-6 font-medium hover:text-white transition-colors duration-300 text-lg">
                        🛒 Secure Checkout
                      </a>
                    </button>

                    <a
                      href="/products"
                      className="block text-center text-emerald-500 dark:text-emerald-400 font-medium py-4 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-300 text-lg"
                    >
                      Continue Premium Shopping →
                    </a>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white dark:bg-slate-800 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="text-slate-800 dark:text-slate-200 font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    Premium Guarantees
                  </h4>
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      30-day premium return policy
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      SSL encrypted secure checkout
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      100% sustainability verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(5px) rotate(240deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}