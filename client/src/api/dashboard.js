// server.js or api/dashboard.js

import express from "express"
const app = express()
const PORT = 5000

const mockDashboardData = {
  carbonSaved: 15.7,
  packagingSaved: 23,
  ordersCount: 8,
  badges: ["Eco Warrior", "Carbon Saver", "Plastic-Free Pioneer", "Green Shopper", "Sustainability Champion"],
  monthlyData: [
    { month: "Jan", carbon: 2.1 },
    { month: "Feb", carbon: 3.4 },
    { month: "Mar", carbon: 1.8 },
    { month: "Apr", carbon: 4.2 },
    { month: "May", carbon: 2.9 },
    { month: "Jun", carbon: 1.3 },
  ],
}

app.get("/api/dashboard/:userId", (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" })
  }

  // Simulate DB fetch logic
  return res.json(mockDashboardData)
})

app.listen(PORT, () => {
  console.log(`API server running on ${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`)
})
