"use client"

import { Link } from "react-router-dom"
import {
  ShoppingCart,
  Search,
  Menu,
  Sun,
  Moon,
  Leaf,
  User
} from "lucide-react"
import Button from "./ui/Button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import useTheme from "../hooks/useTheme"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/clerk-react"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const cartCount = 2

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="text-xl font-bold text-green-800 dark:text-green-400">
                Green Store
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/products" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search eco-friendly products..." className="pl-10" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className={`h-4 w-4 transition-all ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              <Moon className={`absolute h-4 w-4 transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Clerk Authentication */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}