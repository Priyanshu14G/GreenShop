import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import GroupBuying from "./pages/GroupBuying";
import Dashboard from "./components/Dashboard";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import Onboarding from "./pages/Onboarding";
import CheckoutPage from "./components/CheckoutPage";
import "./App.css";
import Header from "./components/Header";
import Seller from "./pages/Seller";
import Analytics from "./seller/Analytics"
import Customers from "./seller/Customers"
import Sellerdashboard from "./seller/Sellerdashboard"
import Help from "./seller/Help"
import Orders from "./seller/Orders"
import Sellerproducts from "./seller/Sellerproducts"
import Submitproduct from "./seller/Submitproduct"
import SellerLayout from "./components/seller/Sellerlayout";
import { ToastProvider } from "./components/ui/use-toast";
// Wrapper component to separate contexts from routing
function AppWrapper({ children }) {
  return (
    <ToastProvider>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
    </ToastProvider>
  );
}

function AppRoutes() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/group-buying" element={<GroupBuying />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/analytics" element={<Analytics />} />
            <Route path="/seller/customers" element={<Customers />} />
            <Route path="/seller/sellerdashboard" element={<Sellerdashboard />} />
            <Route path="/seller/help" element={<Help />} />
            <Route path="/seller/orders" element={<Orders />} />
            <Route path="/seller/sellerproducts" element={<Sellerproducts />} />
            <Route path="/seller/submitproduct" element={<Submitproduct />} />
            <Route path="/sellerlayout" element={<SellerLayout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  );
}

export default App;