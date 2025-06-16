import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, Leaf, Truck, Package, ArrowLeft, Gift, Sparkles } from "lucide-react";
import Header from "./Header";
import Button from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      image: "/placeholder.svg",
      quantity: 2,
      ecoGrade: "A+",
      ecoImpact: "Saves 5 plastic bottles from oceans",
    },
    {
      id: "2",
      name: "Organic Cotton Tote Bag",
      price: 15.99,
      image: "/placeholder.svg",
      quantity: 1,
      ecoGrade: "A",
      ecoImpact: "Reduces plastic bag usage by 99%",
    },
    {
      id: "3",
      name: "Reusable Coffee Cup",
      price: 18.50,
      image: "/placeholder.svg",
      quantity: 1,
      ecoGrade: "A+",
      ecoImpact: "Eliminates 100 disposable cups per year",
    }
  ]);

  const [packagingOption, setPackagingOption] = useState("minimal");
  const [isSticky, setIsSticky] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems((items) => items.filter((item) => item.id !== id));
    } else {
      setCartItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
    
    // Show animation when quantity changes
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const ecoCredits = cartItems.reduce((sum, item) => sum + (item.ecoGrade === "A+" ? 5 : 3) * item.quantity, 0);
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-2">
          <Link to="/products" className="flex items-center text-green-600 hover:text-green-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
            <ShoppingCart className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400">Your Eco Cart</h1>
          <span className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full flex items-center gap-1">
            <Leaf className="h-4 w-4" />
            {ecoCredits} Eco Points
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto">
            <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-6 rounded-full w-32 h-32 flex items-center justify-center mb-6">
              <ShoppingCart className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your eco cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Discover sustainable products that help our planet
            </p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 mx-auto">
                <Sparkles className="h-4 w-4" />
                Explore Eco Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-green-500" />
                  Your Eco Items
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="rounded-xl w-full sm:w-32 h-32 object-cover border border-gray-200 dark:border-gray-700"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          {item.ecoGrade}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                              <Leaf className="h-3 w-3 text-green-500" />
                              {item.ecoImpact}
                            </p>
                          </div>
                          <p className="font-bold text-green-600 text-lg">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="rounded-full border-gray-300 hover:bg-green-50 hover:border-green-300"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded-full border-gray-300 hover:bg-green-50 hover:border-green-300"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-green-500" />
                    Add a gift note
                  </h3>
                  <textarea 
                    placeholder="Write a personal message..." 
                    className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-500" />
                  Packaging Options
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: "minimal", label: "Minimal Packaging", desc: "Simple & eco-friendly", icon: <Leaf className="h-5 w-5" /> },
                    { value: "recycled", label: "Recycled Packaging", desc: "100% recycled materials", icon: <Sparkles className="h-5 w-5" /> },
                    { value: "gift", label: "Gift Packaging", desc: "Beautiful reusable wrap", icon: <Gift className="h-5 w-5" /> }
                  ].map((option) => (
                    <div 
                      key={option.value}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        packagingOption === option.value 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700"
                      }`}
                      onClick={() => setPackagingOption(option.value)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          packagingOption === option.value 
                            ? "bg-green-500 text-white" 
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}>
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-gray-200">{option.label}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`${isSticky ? "lg:sticky lg:top-24 transition-all" : ""}`}>
                <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <CardHeader className="bg-green-500 py-5">
                    <CardTitle className="text-white flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          Shipping
                          {shipping === 0 && (
                            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full ml-2">
                              Free!
                            </span>
                          )}
                        </span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          Eco Packaging
                          <Leaf className="h-4 w-4 text-green-500" />
                        </span>
                        <span>Free</span>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-green-600">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {subtotal < 50 && (
                        <div className="mt-6 bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                          <div className="flex justify-between text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                            <span>Free shipping at $50!</span>
                            <span>${(50 - subtotal).toFixed(2)} away</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <Link to="/checkout">
                          <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold rounded-xl">
                            Proceed to Checkout
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="text-center mt-4">
                        <Link to="/products" className="text-green-600 hover:text-green-800 font-medium">
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
                        <Truck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Carbon Neutral Shipping</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Delivered in 2-4 business days</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Your Eco Impact
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">{cartItems.length * 3}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Plastic items saved</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">{cartItems.reduce((acc, item) => acc + item.quantity, 0) * 2}kg</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">CO2 prevented</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showAnimation && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            Cart updated!
          </div>
        )}
      </main>
      
      <footer className="mt-12 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Every purchase helps restore our planet. Thank you for choosing sustainability!</p>
        <p className="mt-1">© 2023 EcoStore. All rights reserved.</p>
      </footer>
    </div>
  );
}