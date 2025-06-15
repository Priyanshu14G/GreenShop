import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, Sun, Moon, Leaf } from "lucide-react";
import Button from "./ui/Button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";


export default function Header() {
  const [cartCount] = useState(2);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800 dark:text-green-400">
                Green Store
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/products" className="text-sm font-medium hover:text-green-600 transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-green-600 transition-colors">
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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className={`h-4 w-4 transition-all ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              <Moon className={`absolute h-4 w-4 transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
              <span className="sr-only">Toggle theme</span>
            </Button>

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

            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Icon */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
