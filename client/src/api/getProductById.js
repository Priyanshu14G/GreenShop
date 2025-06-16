const mockProducts = [
  {
    id: "1",
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    image: "/placeholder.svg?height=500&width=500",
    ecoGrade: "A+",
    category: "personal-care",
    description: "Biodegradable bamboo toothbrushes with soft bristles...",
    carbonSaved: 0.5,
    features: [
      "100% biodegradable bamboo handle",
      "Soft BPA-free bristles",
      "Plastic-free packaging",
      "Compostable after use",
      "Ergonomic design",
      "Natural antimicrobial properties",
    ],
    specifications: {
      Material: "Bamboo",
      "Bristle Type": "Soft Nylon",
      "Pack Size": "4 brushes",
      Biodegradable: "Yes",
      Length: "19cm",
      Weight: "15g each",
    },
  },
  {
    id: "2",
    name: "Organic Cotton Tote Bag",
    price: 15.99,
    image: "/placeholder.svg?height=500&width=500",
    ecoGrade: "A",
    category: "clothing",
    description: "Durable organic cotton tote bag...",
    carbonSaved: 1.2,
    features: [
      "GOTS certified organic cotton",
      "Reinforced handles",
      "Machine washable",
      "Replaces 1000+ plastic bags",
      "Spacious 15L capacity",
      "Natural undyed cotton color",
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Capacity: "15L",
      Dimensions: "38x42cm",
      "Handle Length": "70cm",
      "Weight Capacity": "20kg",
      Certification: "GOTS",
    },
  },
  {
    id: "3",
    name: "Reusable Glass Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=500&width=500",
    ecoGrade: "A+",
    category: "home-garden",
    description: "Premium borosilicate glass water bottle...",
    carbonSaved: 2.1,
    features: [
      "BPA-free borosilicate glass",
      "Leak-proof bamboo lid",
      "Protective silicone sleeve",
      "Dishwasher safe",
      "Wide mouth",
      "Temperature resistant",
    ],
    specifications: {
      Capacity: "500ml",
      Material: "Borosilicate Glass",
      "Lid Material": "Bamboo with Silicone Seal",
      "Sleeve Material": "Food-grade Silicone",
      Height: "22cm",
      Diameter: "7cm",
    },
  },
];

// This mimics a GET API call
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      reject({ error: "Product not found", status: 404 });
    } else {
      resolve(product);
    }
  });
}

export function getFilteredProducts(filters) {
  return new Promise((resolve) => {
    let filtered = [...mockProducts];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.ecoGrade) {
      filtered = filtered.filter((p) => p.ecoGrade === filters.ecoGrade);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    // simulate network delay
    setTimeout(() => resolve(filtered), 300);
  });
}

// Alternative implementation that fetches products by barcode
export async function getFilteredProductsByBarcode(filters) {
  const barcodes = ["3017624010701", "737628064502", "0048151623426"];

  const prods = await Promise.all(
    barcodes.map(async (code) => {
      try {
        return await fetchProductByBarcode(code);
      } catch {
        return null;
      }
    })
  );

  return prods.filter(Boolean);
}

// Note: fetchProductByBarcode would need to be implemented separately
// as it's not included in the provided code snippets