import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Package, ShoppingCart, Leaf, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { SellerDataService } from "../../lib/Sellerdata";

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Loading analytics data...");

        const [analyticsData, productsData] = await Promise.all([
          SellerDataService.getAnalytics(),
          SellerDataService.getProducts(),
        ]);

        console.log("Analytics data received:", analyticsData);
        console.log("Products data received:", productsData);

        setAnalytics(analyticsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error loading analytics:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-muted-foreground dark:text-gray-400">Loading your business insights...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 mb-2">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-muted-foreground dark:text-gray-400">No data available yet</p>
        </div>
        <Card className="p-8 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">No Analytics Data</h3>
          <p className="text-muted-foreground dark:text-gray-400 mb-4">
            Start by adding products and receiving orders to see your analytics.
          </p>
          <div className="space-x-4">
            <a
              href="/seller/submit-product"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              Add Your First Product
            </a>
            <a
              href="/seller/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              View Products
            </a>
          </div>
        </Card>
      </div>
    );
  }

  const pieData = [
    {
      name: "A Grade",
      value: products.filter((p) => p.ecoScore.startsWith("A")).length,
      color: "#22c55e",
    },
    {
      name: "B Grade",
      value: products.filter((p) => p.ecoScore.startsWith("B")).length,
      color: "#84cc16",
    },
    {
      name: "C Grade",
      value: products.filter((p) => p.ecoScore.startsWith("C")).length,
      color: "#f97316",
    },
    {
      name: "D Grade",
      value: products.filter((p) => p.ecoScore.startsWith("D")).length,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
        <p className="text-muted-foreground dark:text-gray-400">Real insights from your sustainable business</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${analytics.revenue.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400 flex items-center">
              {analytics.revenue.growth > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-600 dark:text-green-500" />
              ) : analytics.revenue.growth < 0 ? (
                <TrendingDown className="h-3 w-3 mr-1 text-red-600 dark:text-red-500" />
              ) : null}
              {analytics.revenue.growth !== 0
                ? `${Math.abs(analytics.revenue.growth)}% from last month`
                : "No change from last month"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.orders.total}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {analytics.orders.thisMonth} this month • {analytics.orders.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600 dark:text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.products.active}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {analytics.products.total} total • {analytics.products.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Avg Eco-Score</CardTitle>
            <Leaf className="h-4 w-4 text-green-600 dark:text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.sustainability.avgEcoScore}/100</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {analytics.sustainability.avgEcoScore >= 80
                ? "Excellent"
                : analytics.sustainability.avgEcoScore >= 60
                  ? "Good"
                  : "Needs improvement"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Only show if there's data */}
      {analytics.monthlyData.some((d) => d.revenue > 0 || d.orders > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    tick={{ fill: "#6b7280" }} 
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fill: "#6b7280" }} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--foreground))",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">CO₂ Saved Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    tick={{ fill: "#6b7280" }} 
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fill: "#6b7280" }} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--foreground))",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar 
                    dataKey="co2Saved" 
                    fill="#16a34a" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Eco-Score Distribution - Only show if there are products */}
        {pieData.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Eco-Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--foreground))",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                      {entry.name}
                    </div>
                    <span className="font-medium">{entry.value} products</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Products - Only show if there are products with orders */}
        {analytics.topProducts.length > 0 && analytics.topProducts.some((p) => p.orders > 0) && (
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProducts
                  .filter((p) => p.orders > 0)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-900 dark:text-gray-100">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">{product.name}</div>
                          <div className="text-xs text-muted-foreground dark:text-gray-400">{product.orders} orders</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">${product.revenue.toLocaleString()}</div>
                        <Badge variant="secondary" className="text-xs">
                          {product.ecoScore}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sustainability Impact */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Sustainability Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-900 dark:text-gray-100">
                  <span>CO₂ Saved</span>
                  <span className="font-medium">{analytics.sustainability.totalCo2Saved} kg</span>
                </div>
                <Progress
                  value={
                    analytics.sustainability.totalCo2Saved > 0
                      ? Math.min((analytics.sustainability.totalCo2Saved / 100) * 100, 100)
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                  {analytics.sustainability.totalCo2Saved === 0
                    ? "Start selling to track CO₂ savings"
                    : "Great progress!"}
                </p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-900 dark:text-gray-100">
                  <span>Plastic Avoided</span>
                  <span className="font-medium">{analytics.sustainability.totalPlasticAvoided} kg</span>
                </div>
                <Progress
                  value={
                    analytics.sustainability.totalPlasticAvoided > 0
                      ? Math.min((analytics.sustainability.totalPlasticAvoided / 20) * 100, 100)
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                  {analytics.sustainability.totalPlasticAvoided === 0
                    ? "No plastic avoided yet"
                    : "Making a difference!"}
                </p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-900 dark:text-gray-100">
                  <span>Trees Planted</span>
                  <span className="font-medium">{analytics.sustainability.treesPlanted} trees</span>
                </div>
                <Progress
                  value={
                    analytics.sustainability.treesPlanted > 0
                      ? Math.min((analytics.sustainability.treesPlanted / 50) * 100, 100)
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                  {analytics.sustainability.treesPlanted === 0
                    ? "Trees planted based on CO₂ saved"
                    : `${analytics.sustainability.treesPlanted} trees equivalent`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}