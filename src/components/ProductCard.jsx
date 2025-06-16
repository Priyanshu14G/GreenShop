import React from "react";
import { Link } from "react-router-dom";
import { Leaf, ShoppingCart } from "lucide-react";

// Replace these paths with correct ones from your project structure
// import { Button } from "./components/ui/button";
// import { Card, CardContent, CardFooter } from "./components/ui/card";
// import { Badge } from "./components/ui/badge";
import EcoGradeBadge from "./EcoGradeBadge";
import Button from "./ui/Button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

export default function ProductCard({ product }) {
  const addToCart = (e) => {
    e.preventDefault();
    console.log("Added to cart:", product.id);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <EcoGradeBadge grade={product.ecoGrade} />
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
          <Leaf className="h-4 w-4" />
          <span>{product.carbonSaved}kg CO₂ saved</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={addToCart}
          className="w-full bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
