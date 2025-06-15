"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Leaf, Users, TrendingUp, Award, ShoppingBag, Calendar, Filter, Star, Package, Recycle, BarChart3, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard({ data }) {
  const [productFilter, setProductFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('6months')

  if (!data) return null

  const { metrics, products, groupBuys, recommendations, orderHistory, badges } = data

  const filteredProducts = products.filter(product => {
    if (productFilter === 'all') return true
    if (productFilter === 'eco') return product.type === 'eco'
    if (productFilter === 'group-buys') return product.type === 'group-buy'
    if (productFilter === 'recommendations') return product.recommended
    return true
  })

  return (
    <div className="space-y-8">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {metrics.co2Saved} kg
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +{metrics.co2SavedIncrease}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Materials Saved</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {metrics.materialsSaved} kg
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Plastic & packaging
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Group Buys</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {metrics.groupBuysJoined}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  ${metrics.groupBuysSavings} saved
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Eco Score</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                  {metrics.ecoScore}/100
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Level {metrics.level}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products & Orders</TabsTrigger>
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Your Products & Orders
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Select value={productFilter} onValueChange={setProductFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="eco">Eco Products</SelectItem>
                      <SelectItem value="group-buys">Group Buys</SelectItem>
                      <SelectItem value="recommendations">Recommendations</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Try adjusting your filters or start shopping for eco-friendly products
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {order.date} • {order.items} items • ${order.total}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`text-xs ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {order.status}
                          </Badge>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {order.co2Saved} kg CO₂ saved
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Environmental Impact Over Time
            </h3>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  CO₂ Savings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Monthly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">CO₂ Reduction Goal</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {metrics.monthlyGoals.co2.current}/{metrics.monthlyGoals.co2.target} kg
                    </span>
                  </div>
                  <Progress 
                    value={(metrics.monthlyGoals.co2.current / metrics.monthlyGoals.co2.target) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Eco Products Goal</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {metrics.monthlyGoals.products.current}/{metrics.monthlyGoals.products.target} items
                    </span>
                  </div>
                  <Progress 
                    value={(metrics.monthlyGoals.products.current / metrics.monthlyGoals.products.target) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Group Buy Participation</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {metrics.monthlyGoals.groupBuys.current}/{metrics.monthlyGoals.groupBuys.target} buys
                    </span>
                  </div>
                  <Progress 
                    value={(metrics.monthlyGoals.groupBuys.current / metrics.monthlyGoals.groupBuys.target) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Badges & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 text-center transition-colors ${
                      badge.earned 
                        ? 'border-green-500 bg-green-50 dark:bg-green-950' 
                        : 'border-gray-200 dark:border-gray-700 opacity-50'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      badge.earned 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <badge.icon className={`w-6 h-6 ${
                        badge.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <h4 className={`text-sm font-semibold mb-1 ${
                      badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                    }`}>
                      {badge.name}
                    </h4>
                    <p className={`text-xs ${
                      badge.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
                    }`}>
                      {badge.description}
                    </p>
                    {badge.earned && badge.earnedDate && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Earned {badge.earnedDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.type === 'group-buy' && (
            <Badge className="absolute top-2 left-2 bg-orange-500">
              <Users className="w-3 h-3 mr-1" />
              Group Buy
            </Badge>
          )}
          {product.recommended && (
            <Badge className="absolute top-2 right-2 bg-blue-500">
              <Star className="w-3 h-3 mr-1" />
              Recommended
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                <Leaf className="w-3 h-3 mr-1" />
                {product.ecoGrade}
              </Badge>
              {product.status && (
                <Badge variant="outline" className="text-xs">
                  {product.status}
                </Badge>
              )}
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>
          {product.co2Saved && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              Saved {product.co2Saved} kg CO₂
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
