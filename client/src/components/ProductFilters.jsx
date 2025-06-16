import React from "react";

// Replace these with actual imports or your own UI library components
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export default function ProductFilters({ filters, onFiltersChange }) {
  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.category}
            onValueChange={(value) => updateFilter("category", value)}
          >
            {[
              ["", "All Categories"],
              ["personal-care", "Personal Care"],
              ["home-garden", "Home & Garden"],
              ["clothing", "Clothing"],
              ["food-drink", "Food & Drink"],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`category-${value || "all"}`} />
                <Label htmlFor={`category-${value || "all"}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Eco Grade Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Eco Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.ecoGrade}
            onValueChange={(value) => updateFilter("ecoGrade", value)}
          >
            {[
              ["", "All Grades"],
              ["A+", "A+ (Excellent)"],
              ["A", "A (Very Good)"],
              ["B+", "B+ (Good)"],
              ["B", "B (Fair)"],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`ecoGrade-${value || "all"}`} />
                <Label htmlFor={`ecoGrade-${value || "all"}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
          >
            {[
              ["", "All Prices"],
              ["0-25", "$0 - $25"],
              ["25-50", "$25 - $50"],
              ["50-100", "$50 - $100"],
              ["100+", "$100+"],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`price-${value || "all"}`} />
                <Label htmlFor={`price-${value || "all"}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
