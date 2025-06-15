import { useState, useEffect } from "react";

const mockDashboard = {
  products: [
    { id: "p1", name: "Bamboo Toothbrush" },
    { id: "p3", name: "Beeswax Wraps" },
  ],
  groupBuys: [
    { id: "p2", name: "Organic Grocery Bag" },
  ],
  recommendations: [{ id: "new1", name: "Wool Dryer Balls" }],
  orders: [
    { id: "order1", name: "Bamboo Toothbrush" },
    { id: "order2", name: "Beeswax Wraps" },
  ],
  impact: [
    { month: "Mar", CO2Saved: 2.2 },
    { month: "Apr", CO2Saved: 3.1 },
    { month: "May", CO2Saved: 4.5 },
    { month: "Jun", CO2Saved: 3.8 },
    { month: "Jul", CO2Saved: 5.1 },
  ],
  totalCO2: 18.7,
  materials: 13,
  badges: 4,
};

export function useDashboard(userId) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDashboard(mockDashboard);
      setLoading(false);
    }, 600);
  }, [userId]);

  return { dashboard: dashboard || { products: [], groupBuys: [], recommendations: [], orders: [], impact: [], totalCO2: 0, materials: 0, badges: 0 }, loading };
}