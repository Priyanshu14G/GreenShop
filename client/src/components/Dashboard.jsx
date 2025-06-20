"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Leaf, Package, Award, TrendingUp, Zap, Trees, Recycle, ShoppingBag, ChevronRight, Trophy, BarChart2, RefreshCw, Smile, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = {
        carbonSaved: 15.7,
        packagingSaved: 23,
        ordersCount: 8,
        badges: ["Eco Warrior", "Carbon Saver", "Plastic-Free Pioneer", "Green Shopper", "Sustainability Champion", "Ocean Protector", "Forest Guardian", "Eco Innovator"],
        monthlyData: [
          { month: "Jan", carbon: 2.1 },
          { month: "Feb", carbon: 3.4 },
          { month: "Mar", carbon: 1.8 },
          { month: "Apr", carbon: 4.2 },
          { month: "May", carbon: 2.9 },
          { month: "Jun", carbon: 1.3 },
          { month: "Jul", carbon: 5.1 },
        ],
        impactMetrics: {
          treesSaved: 12,
          plasticBottles: 87,
          waterSaved: 420,
          co2Reduction: 156
        },
        leaderboardPosition: 42,
        nextMilestone: {
          name: "Eco Champion",
          progress: 75,
          target: 20
        }
      }

      setDashboardData(mockData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-8"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow h-64"></div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow h-64"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* <Header /> */}
        <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col items-center justify-center min-h-[50vh]">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-6">
            <Zap className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Unable to load dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            There was an issue loading your environmental impact data.
          </p>
          <button 
            onClick={fetchDashboardData}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600" />
              Your Environmental Impact
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              See how your sustainable choices are making a difference
            </p>
          </motion.div>
          
          <div className="flex gap-2">
            <button 
              onClick={fetchDashboardData}
              className="bg-white dark:bg-gray-300 cursor-pointer border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 cursor-pointer border-b border-gray-200 dark:border-gray-700">
          {["overview", "impact", "badges", "goals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium cursor-pointertransition-colors ${
                activeTab === tab
                  ? "cursor-pointer text-green-600 dark:text-green-400 border-b-2 border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 border border-green-100 dark:border-green-800/30">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    CO₂ Saved
                  </CardTitle>
                  <Trees className="h-4 w-4 text-green-500 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {dashboardData.carbonSaved}kg
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Equivalent to planting {Math.round(dashboardData.carbonSaved / 1.3)} trees
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border border-blue-100 dark:border-blue-800/30">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Packaging Saved
                  </CardTitle>
                  <Recycle className="h-4 w-4 text-blue-500 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {dashboardData.packagingSaved}
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Plastic items prevented from oceans
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border border-purple-100 dark:border-purple-800/30">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Eco Orders
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {dashboardData.ordersCount}
                  </div>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    Sustainable purchases made
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800 border border-amber-100 dark:border-amber-800/30">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Eco Level
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-amber-500 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    Green Hero
                  </div>
                  <div className="mt-3">
                    <Progress value={dashboardData.nextMilestone.progress} className="h-2 bg-amber-100 dark:bg-amber-900/50" indicatorClass="bg-amber-500" />
                    <div className="flex justify-between text-xs mt-1 text-amber-700 dark:text-amber-300">
                      <span>{dashboardData.nextMilestone.progress}%</span>
                      <span>{dashboardData.nextMilestone.target} orders to next level</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-green-500" />
                    <p className="dark:text-gray-100">Monthly Carbon Impact</p>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-100">
                    Your CO₂ reduction over the past months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-10 text-gray-700 dark:text-gray-100">{data.month}</span>
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full text-gray-700 dark:text-gray-100"
                              style={{ width: `${(data.carbon / 6) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400 w-12 text-right">
                            {data.carbon}kg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
                    <Award className="h-5 w-5 text-amber-500 text-gray-700 dark:text-gray-100" />
                    Eco Badges Earned
                  </CardTitle>
                  <CardDescription>
                    Your sustainability achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {dashboardData.badges.map((badge, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="w-full py-2 px-3 flex flex-col items-center text-center gap-1 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-100">{badge}</span>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="space-y-8">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
                  <Activity className="h-5 w-5  text-gray-700 dark:text-gray-100" />
                  Environmental Impact
                </CardTitle>
                <CardDescription>
                  Your sustainable choices are making a real difference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl text-center">
                    <div className="mx-auto bg-green-100 dark:bg-green-800 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Trees className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {dashboardData.impactMetrics.treesSaved}
                    </div>
                    <div className="text-sm font-medium text-green-700 dark:text-green-300 mt-1">
                      Trees Saved
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl text-center">
                    <div className="mx-auto bg-blue-100 dark:bg-blue-800 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Recycle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {dashboardData.impactMetrics.plasticBottles}
                    </div>
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mt-1">
                      Plastic Bottles Prevented
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl text-center">
                    <div className="mx-auto bg-teal-100 dark:bg-teal-800 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15c0 2.3 1.7 4 4 4h10c2.3 0 4-1.7 4-4v-3H3v3zM7 7h10c2.3 0 4 1.7 4 4v1H3v-1c0-2.3 1.7-4 4-4z" />
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                      {dashboardData.impactMetrics.waterSaved}L
                    </div>
                    <div className="text-sm font-medium text-teal-700 dark:text-teal-300 mt-1">
                      Water Saved
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl text-center">
                    <div className="mx-auto bg-amber-100 dark:bg-amber-800 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Zap className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {dashboardData.impactMetrics.co2Reduction}kg
                    </div>
                    <div className="text-sm font-medium text-amber-700 dark:text-amber-300 mt-1">
                      CO₂ Reduction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
                    <BarChart2 className="h-5 w-5 text-green-500 text-gray-700 dark:text-gray-100" />
                    Carbon Impact Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end h-40 gap-2 mt-4">
                    {dashboardData.monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-green-400 to-teal-500 rounded-t-lg"
                          style={{ height: `${(data.carbon / 6) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
                    <Smile className="h-5 w-5 text-amber-500 text-gray-700 dark:text-gray-100" />
                    Community Ranking
                  </CardTitle>
                  <CardDescription className='text-gray-700 dark:text-gray-100'>
                    Your position among eco-conscious shoppers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                        #{dashboardData.leaderboardPosition}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Top 10%
                      </div>
                    </div>
                    <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                      You're making more impact than <span className="font-bold text-green-600 dark:text-green-400">92%</span> of users
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="space-y-8">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-500" />
                  Your Next Milestones
                </CardTitle>
                <CardDescription>
                  Achieve these goals to level up your sustainability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 border border-green-200 dark:border-green-800/50 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                        Eco Champion
                        <Badge className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Next Level</Badge>
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Complete {dashboardData.nextMilestone.target} more sustainable purchases
                      </p>
                      <div className="mt-3">
                        <Progress 
                          value={dashboardData.nextMilestone.progress} 
                          className="h-2 bg-amber-100 dark:bg-amber-900/50" 
                          indicatorClass="bg-amber-500" 
                        />
                        <div className="flex justify-between text-xs mt-1 text-amber-700 dark:text-amber-300">
                          <span>{dashboardData.nextMilestone.progress}%</span>
                          <span>{dashboardData.nextMilestone.target - Math.floor(dashboardData.nextMilestone.target * (dashboardData.nextMilestone.progress/100))} to go</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 border border-blue-200 dark:border-blue-800/50 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                      <Recycle className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-700 dark:text-blue-300">Plastic-Free Pioneer</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        Save 50 plastic items from oceans
                      </p>
                      <div className="mt-3">
                        <Progress 
                          value={(dashboardData.packagingSaved / 50) * 100} 
                          className="h-2 bg-blue-100 dark:bg-blue-900/50" 
                          indicatorClass="bg-blue-500" 
                        />
                        <div className="flex justify-between text-xs mt-1 text-blue-700 dark:text-blue-300">
                          <span>{Math.round((dashboardData.packagingSaved / 50) * 100)}%</span>
                          <span>{50 - dashboardData.packagingSaved} to go</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 border border-purple-200 dark:border-purple-800/50 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                      <Trees className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-purple-700 dark:text-purple-300">Carbon Neutral</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                        Save 50kg of CO₂ emissions
                      </p>
                      <div className="mt-3">
                        <Progress 
                          value={(dashboardData.carbonSaved / 50) * 100} 
                          className="h-2 bg-purple-100 dark:bg-purple-900/50" 
                          indicatorClass="bg-purple-500" 
                        />
                        <div className="flex justify-between text-xs mt-1 text-purple-700 dark:text-purple-300">
                          <span>{Math.round((dashboardData.carbonSaved / 50) * 100)}%</span>
                          <span>{(50 - dashboardData.carbonSaved).toFixed(1)}kg to go</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <button className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                  View all goals <ChevronRight className="h-4 w-4" />
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        <div className="mt-12 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl p-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">Keep making a difference!</h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Your sustainable choices have prevented approximately {dashboardData.packagingSaved * 2} plastic items from entering our oceans this year.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium">
              Explore Sustainable Products
            </button>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Every sustainable choice helps heal our planet. Thank you for being part of the solution.</p>
        <p className="mt-1">© 2023 EcoImpact. All rights reserved.</p>
      </footer>
    </div>
  )
}