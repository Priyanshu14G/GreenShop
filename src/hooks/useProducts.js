import { useEffect, useState } from "react";

const mockData = [
  {
    id: "p1",
    name: "Bamboo Toothbrush",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    category: "Beauty",
    ecoGrade: "A",
    ecoScore: 95,
    price: 4.99,
    groupBuyEligible: true,
    groupCount: 3,
    groupThreshold: 10,
    description: "Natural bamboo toothbrush for a plastic-free brushing experience.",
  },
  {
    id: "p2",
    name: "Organic Grocery Bag",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=80",
    category: "Home",
    ecoGrade: "A",
    ecoScore: 92,
    price: 8.99,
    groupBuyEligible: true,
    groupCount: 4,
    groupThreshold: 12,
    description: "Reusable organic cotton grocery bag.",
  },
  {
    id: "p3",
    name: "Beeswax Wraps",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
    category: "Food",
    ecoGrade: "B",
    ecoScore: 88,
    price: 13.99,
    groupBuyEligible: false,
    groupCount: 0,
    groupThreshold: 0,
    description: "Eco-friendly wraps for food storage without plastic.",
  },
  // ... add more products as desired
];

export function useProducts(filters) {
  const [products, setProducts] = useState(mockData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockData];
      if (filters) {
        if (filters.category && filters.category !== "All") {
          filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.ecoGrade && filters.ecoGrade !== "All") {
          filtered = filtered.filter(p => p.ecoGrade === filters.ecoGrade);
        }
        if (filters.groupBuy && filters.groupBuy !== "All") {
          filtered = filtered.filter(p =>
            filters.groupBuy === "Eligible" ? p.groupBuyEligible : !p.groupBuyEligible
          );
        }
        if (filters.sort === "ecoScore") {
          filtered = filtered.sort((a, b) => b.ecoScore - a.ecoScore);
        } else if (filters.sort === "price") {
          filtered = filtered.sort((a, b) => a.price - b.price);
        }
      }
      setProducts(filtered);
      setLoading(false);
    }, 400);
  }, [JSON.stringify(filters)]);

  const getProductById = (id) => products.find((p) => p.id === id);

  return { products, loading, getProductById };
}
