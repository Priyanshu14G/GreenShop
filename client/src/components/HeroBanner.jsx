import React from "react";
import { Leaf, Recycle, Heart } from "lucide-react";

// Replace these with actual paths in your project
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom"; // Using React Router for navigation

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-400 mb-6">
            Shop Sustainably,
            <br />
            <span className="text-blue-600 dark:text-blue-400">Live Responsibly</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover eco-friendly products that make a difference. Track your environmental impact and join group buys
            to maximize sustainability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Shop Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                View Impact
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Eco-Certified</h3>
              <p className="text-sm text-muted-foreground">All products are verified for environmental impact</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <Recycle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Zero Waste</h3>
              <p className="text-sm text-muted-foreground">Minimal packaging with recyclable materials</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Impact</h3>
              <p className="text-sm text-muted-foreground">Join group buys and make collective change</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
