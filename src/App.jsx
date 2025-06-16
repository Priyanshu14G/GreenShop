// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import GroupBuying from "./pages/GroupBuying"
import Dashboard from "./components/Dashboard"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Cart from "./components/Cart"
import Onboarding from "./pages/Onboarding"
import CheckoutPage from "./components/CheckoutPage"
import "./App.css"
import Header from "./components/Header"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
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
                </Routes>
              </main>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
