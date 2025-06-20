const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const mockProducts = [
  {
    id: "p1",
    name: "Bamboo Toothbrush",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    category: "Beauty",
    ecoGrade: "A",
    ecoScore: 95,
    price: 4.99,
    groupBuyEligible: true,
    groupCount: 4,
    groupThreshold: 12,
    description: "Natural bamboo toothbrush for a plastic-free brushing experience.",
  },
  // ... add more products as above
];

const dashboardMock = {
  // ... Copy from the dashboard mock in useDashboard.js
};

app.get("/api/products", (req, res) => {
  // Filtering logic can be added based on req.query
  res.json(mockProducts);
});

app.get("/api/products/:id", (req, res) => {
  const prod = mockProducts.find((p) => p.id === req.params.id);
  if (!prod) return res.status(404).json({ error: "Product not found" });
  res.json(prod);
});

app.post("/api/group-buy/join", (req, res) => {
  // Should increment groupCount, but just reply OK for now
  res.json({ message: "Joined group buy", groupCount: Math.floor(4 + Math.random() * 4) });
});

app.get("/api/dashboard/:userId", (req, res) => {
  res.json(dashboardMock);
});

app.listen(3001, () =>
  console.log(`Mock server listening on ${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`)
);
