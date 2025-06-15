"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Leaf, Package, Award, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  // Simulate async fetch
  const timeout = setTimeout(() => {
    const mockData = {
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

    setDashboardData(mockData)
    setLoading(false)
  }, 1000)

  return () => clearTimeout(timeout)
}, [])


  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard/user123")
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        {/* <Header /> */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Unable to load dashboard</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-800 dark:text-green-400">
          Your Environmental Impact Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Leaf className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardData.carbonSaved}kg</div>
              <p className="text-xs text-muted-foreground">Equivalent to planting 3 trees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Packaging Saved</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardData.packagingSaved}</div>
              <p className="text-xs text-muted-foreground">Plastic items avoided</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{dashboardData.ordersCount}</div>
              <p className="text-xs text-muted-foreground">Total sustainable purchases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Level</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">Green Hero</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Carbon Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(data.carbon / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-green-600">{data.carbon}kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eco Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {dashboardData.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <Badge variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
