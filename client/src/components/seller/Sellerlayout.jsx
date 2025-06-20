import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingCart,
  HelpCircle,
  Menu,
  Bell,
  Settings,
  LogOut,
  Leaf,
  TrendingUp,
  Users,
} from "lucide-react";
import { SellerDataService } from "../../lib/Sellerdata";

export default function SellerLayout({ children }) {
  const location = useLocation();
  const [notifications] = useState(3);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [countsLoaded, setCountsLoaded] = useState(false);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [products, orders] = await Promise.all([
          SellerDataService.getProducts(),
          SellerDataService.getOrders(),
        ]);
        setProductCount(products.length);
        setOrderCount(
          orders.filter((o) => o.status === "pending" || o.status === "processing").length
        );
      } catch (error) {
        console.error("Error loading counts:", error);
      } finally {
        setCountsLoaded(true);
      }
    };

    loadCounts();
  }, []);

  const navigation = useMemo(() => [
    {
      name: "Dashboard",
      href: "/seller/sellerdashboard",
      icon: LayoutDashboard,
      current: location.pathname === "/seller/sellerdashboard",
    },
    {
      name: "Products",
      href: "/seller/sellerproducts",
      icon: Package,
      current: location.pathname === "/seller/sellerproducts",
      badge: productCount > 0 ? productCount.toString() : undefined,
    },
    {
      name: "Submit Product",
      href: "/seller/submitproduct",
      icon: Plus,
      current: location.pathname === "/seller/submitproduct",
    },
    {
      name: "Orders",
      href: "/seller/orders",
      icon: ShoppingCart,
      current: location.pathname === "/seller/orders",
      badge: orderCount > 0 ? orderCount.toString() : undefined,
    },
    {
      name: "Analytics",
      href: "/seller/analytics",
      icon: TrendingUp,
      current: location.pathname === "/seller/analytics",
    },
    {
      name: "Customers",
      href: "/seller/customers",
      icon: Users,
      current: location.pathname === "/seller/customers",
    },
    {
      name: "Help",
      href: "/seller/help",
      icon: HelpCircle,
      current: location.pathname === "/seller/help",
    },
  ], [location.pathname, productCount, orderCount]);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-6">
        <Link to="/seller/sellerdashboard" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <div>
            <span className="text-xl font-bold text-green-600">EcoMarket</span>
            <p className="text-xs text-muted-foreground dark:text-white">Seller Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${
              item.current
                ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
            {item.badge && (
              <Badge variant="secondary" className="ml-auto dark:bg-gray-700 dark:text-gray-200">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3">
          <div className="flex items-center">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="ml-2 text-sm font-medium text-green-800 dark:text-green-200">Eco Impact</span>
          </div>
          <div className="mt-2 space-y-1 text-xs text-green-700 dark:text-green-300">
            <div className="flex justify-between">
              <span>CO₂ Saved:</span>
              <span className="font-semibold">245 kg</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Eco-Score:</span>
              <span className="font-semibold">B+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!countsLoaded) {
    return (
      <div className="flex h-screen justify-center items-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading seller dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden w-64 flex-col bg-white dark:bg-gray-800 shadow-sm lg:flex">
        <SidebarContent />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 dark:bg-gray-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {navigation.find((item) => item.current)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-black dark:text-white" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs ">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Seller" />
                    <AvatarFallback className="dark:bg-gray-700 dark:text-gray-200">JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 dark:bg-gray-800 dark:border-gray-700"
                align="end"
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-gray-900 dark:text-gray-100">John Smith</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      john@ecomarket.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="dark:hover:bg-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-gray-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="dark:hover:bg-gray-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
