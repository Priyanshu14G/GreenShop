import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductSubmissionFlow } from "../seller/Productsubmission"
import { Package, ShoppingCart, TrendingUp, DollarSign, Plus, Eye, Star, Leaf } from "lucide-react"
import { Link } from "react-router-dom"
import { SellerDataService } from "../../lib/Sellerdata"

export function SellerDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [analyticsData, productsData] = await Promise.all([
          SellerDataService.getAnalytics(),
          SellerDataService.getProducts(),
        ])

        setAnalytics(analyticsData)
        setRecentProducts(productsData.slice(0, 3)) // Get 3 most recent products
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No data available</h3>
          <p className="text-gray-500 dark:text-gray-400">Start by adding your first product</p>
          <Button asChild className="mt-4 text-black dark:text-white border">
            <Link href="/seller/submitproduct">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Products",
      value: analytics.products.total.toString(),
      change: `${analytics.products.active} active`,
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Orders",
      value: analytics.orders.total.toString(),
      change: `+${analytics.orders.thisMonth} this month`,
      icon: ShoppingCart,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Revenue",
      value: `$${analytics.revenue.total.toFixed(2)}`,
      change: `+${analytics.revenue.growth.toFixed(1)}% from last month`,
      icon: DollarSign,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Avg Eco-Score",
      value: `${analytics.sustainability.avgEcoScore}/100`,
      change: `${analytics.sustainability.monthlyGrowth}% improvement`,
      icon: Leaf,
      color: "text-green-600 dark:text-green-400",
    },
  ]

  const getEcoScoreColor = (score) => {
    if (score.startsWith("A")) return "bg-green-500"
    if (score.startsWith("B")) return "bg-lime-500"
    if (score.startsWith("C")) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Welcome back, John!</h2>
        <p className="text-muted-foreground dark:text-gray-400">Here's what's happening with your sustainable store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="submitproduct" 
            className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            Submit New Product
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Products */}
            <Card className="col-span-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                {recentProducts.length > 0 ? (
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                              {product.name}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={product.status === "active" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {product.status}
                              </Badge>
                              <Badge className={`text-xs text-white ${getEcoScoreColor(product.ecoScore)}`}>
                                {product.ecoScore}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground dark:text-gray-400">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {product.views}
                          </div>
                          <div className="flex items-center">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {product.orders}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No products yet</p>
                    <Button asChild className="mt-2">
                      <Link href="/seller/submitproduct">Add your first product</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" asChild>
                  <Link href="/seller/submitproduct">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Product
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  asChild
                >
                  <Link href="/seller/products">
                    <Package className="mr-2 h-4 w-4" />
                    Manage Products
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  asChild
                >
                  <Link href="/seller/orders">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Orders
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  asChild
                >
                  <Link href="/seller/analytics">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Metrics */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <Leaf className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Sustainability Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">CO₂ Saved</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">{analytics.sustainability.totalCo2Saved} kg</span>
                  </div>
                  <Progress value={(analytics.sustainability.totalCo2Saved / 50) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Plastic Avoided</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">
                      {analytics.sustainability.totalPlasticAvoided} kg
                    </span>
                  </div>
                  <Progress value={(analytics.sustainability.totalPlasticAvoided / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Trees Planted</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">{analytics.sustainability.treesPlanted} trees</span>
                  </div>
                  <Progress value={(analytics.sustainability.treesPlanted / 30) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Avg Eco-Score</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">{analytics.sustainability.avgEcoScore}/100</span>
                  </div>
                  <Progress value={analytics.sustainability.avgEcoScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submitproduct">
          <ProductSubmissionFlow />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-gray-100">Total Views</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {recentProducts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-gray-100">Conversion Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {analytics.orders.total > 0 && recentProducts.reduce((sum, p) => sum + p.views, 0) > 0
                        ? (
                            (analytics.orders.total / recentProducts.reduce((sum, p) => sum + p.views, 0)) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-gray-100">Avg. Order Value</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      $
                      {analytics.orders.total > 0
                        ? (analytics.revenue.total / analytics.orders.total).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-gray-100">Customer Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1 text-gray-900 dark:text-gray-100">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Eco-Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      grade: "A",
                      count: recentProducts.filter((p) => p.ecoScore.startsWith("A")).length,
                      color: "bg-green-500",
                    },
                    {
                      grade: "B",
                      count: recentProducts.filter((p) => p.ecoScore.startsWith("B")).length,
                      color: "bg-lime-500",
                    },
                    {
                      grade: "C",
                      count: recentProducts.filter((p) => p.ecoScore.startsWith("C")).length,
                      color: "bg-orange-500",
                    },
                    {
                      grade: "D",
                      count: recentProducts.filter((p) => p.ecoScore.startsWith("D")).length,
                      color: "bg-red-500",
                    },
                  ].map(({ grade, count, color }) => (
                    <div key={grade} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
                        <span className="text-sm text-gray-900 dark:text-gray-100">Grade {grade}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{count} products</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SellerDashboard