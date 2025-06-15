import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";
// import { Toaster } from "@/components/ui/toaster";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full border-b bg-white dark:bg-neutral-900">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2 font-bold text-2xl text-green-700 hover:underline">Green Store</a>
          <nav className="flex gap-6">
            <a href="/" className="hover:underline font-medium">Home</a>
            <a href="/products" className="hover:underline font-medium">Shop</a>
            <a href="/dashboard" className="hover:underline font-medium">Dashboard</a>
            <a href="/cart" className="hover:underline font-medium">Cart</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </main>
    </div>
  </BrowserRouter>
);

export default App;