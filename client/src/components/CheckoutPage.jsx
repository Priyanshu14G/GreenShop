"use client";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { ShoppingBag, CreditCard, MapPin, User, Mail, Shield, Sparkles, Leaf, Truck, ChevronRight, Star, Gift, Lock } from "lucide-react";

// Mock components for missing imports
const PackagingToggle = ({ value, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange("minimal")}
        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
          value === "minimal"
            ? "border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-200/50"
            : "border-gray-200 bg-white hover:border-emerald-200"
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Leaf className={`w-6 h-6 ${value === "minimal" ? "text-emerald-600" : "text-gray-400"}`} />
          <span className={`text-sm font-medium ${value === "minimal" ? "text-emerald-700" : "text-gray-600"}`}>
            Eco Minimal
          </span>
          <span className="text-xs text-emerald-600 font-semibold">Save $7.00</span>
        </div>
        {value === "minimal" && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </button>
      <button
        type="button"
        onClick={() => onChange("standard")}
        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
          value === "standard"
            ? "border-gray-400 bg-gray-50 shadow-lg shadow-gray-200/50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Gift className={`w-6 h-6 ${value === "standard" ? "text-gray-600" : "text-gray-400"}`} />
          <span className={`text-sm font-medium ${value === "standard" ? "text-gray-700" : "text-gray-600"}`}>
            Standard
          </span>
        </div>
      </button>
    </div>
  </div>
);

const CarbonSavingEstimator = ({ carbonSaved }) => (
  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
    <div className="relative">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Carbon Impact</h3>
          <p className="text-emerald-100 text-sm">Your eco-friendly choice</p>
        </div>
      </div>
      {carbonSaved > 0 ? (
        <div className="space-y-2">
          <p className="text-3xl font-bold">{carbonSaved}kg CO₂</p>
          <p className="text-emerald-100">saved with minimal packaging</p>
        </div>
      ) : (
        <p className="text-emerald-100">Choose minimal packaging to save carbon</p>
      )}
    </div>
  </div>
);

export default function CheckoutPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "US",
  });
  const [packagingOption, setPackagingOption] = useState("minimal");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken();
        const res = await fetch("/api/purchases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart items");

        const data = await res.json();
        const transformed = data.map((item) => ({
          id: item.product_code,
          product_name: item.product_name,
          product_code: item.product_code,
          price: parseFloat(item.price) || 19.99,
        }));

        setCartItems(transformed);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        // Mock data for demo
        setCartItems([
          { id: "1", product_name: "Premium Eco Kit", product_code: "ECO-001", price: 79.99 },
          { id: "2", product_name: "Sustainable Bundle", product_code: "SUS-002", price: 49.99 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      }));
      fetchCart();
    } else {
      // Mock data for demo
      setCartItems([
        { id: "1", product_name: "Premium Eco Kit", product_code: "ECO-001", price: 79.99 },
        { id: "2", product_name: "Sustainable Bundle", product_code: "SUS-002", price: 49.99 }
      ]);
      setLoading(false);
    }
  }, [user]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const ecoDiscount = packagingOption === "minimal" ? 7.0 : 0;
  const orderTotal = subtotal - ecoDiscount;
  const carbonSaved = packagingOption === "minimal" ? 2.5 : 0;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Order submitted:", {
      shipping: formData,
      packagingOption,
      paymentMethod,
      cartItems,
    });
    alert("Order placed successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium">Preparing your checkout experience...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Information", icon: User },
    { number: 2, title: "Shipping", icon: Truck },
    { number: 3, title: "Payment", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Secure Checkout
                </h1>
                <p className="text-slate-500 text-sm">Complete your eco-friendly purchase</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                      : isActive 
                        ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-600" 
                        : "bg-gray-100 text-gray-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isActive ? "text-emerald-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-emerald-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="xl:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-8 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Contact Information</h2>
                  <p className="text-slate-500 text-sm">We'll use this to send order updates</p>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-8 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Delivery Address</h2>
                  <p className="text-slate-500 text-sm">Where should we send your order?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  required
                  className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                    className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    required
                    className="w-full px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Sustainable Packaging */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-8 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Sustainable Packaging</h2>
                    <p className="text-slate-500 text-sm">Make an eco-friendly choice</p>
                  </div>
                </div>
                {packagingOption === "minimal" && (
                  <div className="flex items-center space-x-2 bg-emerald-100 px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 text-sm font-medium">Eco Choice</span>
                  </div>
                )}
              </div>
              
              <PackagingToggle value={packagingOption} onChange={setPackagingOption} />
            </div>

            {/* Payment Method */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-8 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Payment Method</h2>
                  <p className="text-slate-500 text-sm">Choose your preferred payment option</p>
                </div>
              </div>

              <div className="space-y-3">
                {["card", "paypal"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center space-x-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === method
                        ? "border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-200/50"
                        : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      paymentMethod === method
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-gray-300"
                    }`}>
                      {paymentMethod === method && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      {method === "card" && <CreditCard className="w-5 h-5 text-slate-600" />}
                      {method === "paypal" && <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>}
                      <span className="font-medium text-slate-700">
                        {method === "card" ? "Credit/Debit Card" : "PayPal"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-8 sticky top-32">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
                  <p className="text-slate-500 text-sm">{cartItems.length} items in your cart</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{item.product_code.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{item.product_name}</p>
                        <p className="text-sm text-slate-500">{item.product_code}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {ecoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-4 h-4" />
                      <span>Eco Discount</span>
                    </div>
                    <span className="font-semibold">-${ecoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-slate-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <Lock className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Complete Secure Order</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>

            <CarbonSavingEstimator carbonSaved={carbonSaved} />
          </div>
        </div>
      </div>
    </div>
  );
}