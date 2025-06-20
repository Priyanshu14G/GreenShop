import { Users, MapPin, Clock, Leaf, DollarSign, Package, ChevronRight } from "lucide-react"

const GroupBuying = () => {
  const groupBuys = [
    {
      id: 1,
      title: "Organic Produce Box",
      description: "Fresh organic vegetables and fruits from local farms",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
      currentParticipants: 18,
      targetParticipants: 25,
      pricePerUnit: 24.99,
      originalPrice: 34.99,
      savings: 10.0,
      carbonSavings: "2.5 kg CO₂",
      location: "Downtown Area",
      timeLeft: "3 days",
      category: "Food",
      organizer: "GreenGrocer Co.",
      tags: ["Organic", "Local", "Plastic-Free"],
    },
    {
      id: 2,
      title: "Bamboo Kitchenware Set",
      description: "Complete eco-friendly kitchen utensil set made from bamboo",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      currentParticipants: 12,
      targetParticipants: 20,
      pricePerUnit: 39.99,
      originalPrice: 59.99,
      savings: 20.0,
      carbonSavings: "1.8 kg CO₂",
      location: "Westside",
      timeLeft: "5 days",
      category: "Home",
      organizer: "EcoKitchen",
      tags: ["Bamboo", "Biodegradable", "Durable"],
    },
    {
      id: 3,
      title: "Solar Garden Lights",
      description: "Energy-efficient solar-powered LED garden lighting",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      currentParticipants: 8,
      targetParticipants: 15,
      pricePerUnit: 29.99,
      originalPrice: 44.99,
      savings: 15.0,
      carbonSavings: "3.2 kg CO₂",
      location: "Suburbs",
      timeLeft: "1 week",
      category: "Garden",
      organizer: "SolarTech",
      tags: ["Solar", "Energy Efficient", "Weather Resistant"],
    },
  ]

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="bg-green-100 dark:bg-gray-800">
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Community Purchasing
        </span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Group Buying <span className="text-green-600 dark:text-green-400">Collective Impact</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join with your community to buy sustainable products in bulk and save money while reducing environmental impact
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ">
        <div className="bg-sky-50 dark:bg-sky-900 p-6 rounded-xl  shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2 ">
            <h3 className="text-sm font-medium text-sky-500 dark:text-sky-200">Active Groups</h3>
            <Users className="h-5 w-5 text-sky-500 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-sky-500 dark:text-sky-400">24</div>
          <p className="text-xs text-sky-700 dark:text-sky-200 mt-1">+3 this week</p>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-teal-500 dark:text-teal-200">Total Savings</h3>
            <DollarSign className="h-5 w-5 text-teal-500 dark:text-teal-400" />
          </div>
          <div className="text-3xl font-bold text-teal-500 dark:text-teal-400">$2,847</div>
          <p className="text-xs text-teal-700 dark:text-teal-200 mt-1">Community savings</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-500 dark:text-green-200">CO₂ Reduced</h3>
            <Leaf className="h-5 w-5 text-green-500 dark:text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-500 dark:text-green-400">156kg</div>
          <p className="text-xs text-green-700 dark:text-green-200 mt-1">Through group buying</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-500 dark:text-purple-200">Participants</h3>
            <Users className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-500 dark:text-purple-400">342</div>
          <p className="text-xs text-purple-700 dark:text-purple-200 mt-1">Active members</p>
        </div>
      </div>

      {/* Group Buy Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groupBuys.map((groupBuy) => (
          <div 
            key={groupBuy.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={groupBuy.image || "/placeholder.svg"}
                alt={groupBuy.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-500 dark:bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {groupBuy.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-green-500 dark:bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {groupBuy.timeLeft}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{groupBuy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{groupBuy.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {groupBuy.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Progress</span>
                    <span>
                      {groupBuy.currentParticipants}/{groupBuy.targetParticipants} participants
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 dark:bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${getProgressPercentage(groupBuy.currentParticipants, groupBuy.targetParticipants)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{groupBuy.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Package className="h-4 w-4" />
                    <span>{groupBuy.organizer}</span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">Save ${groupBuy.savings}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">vs individual purchase</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Leaf className="h-4 w-4" />
                        <span className="font-medium">{groupBuy.carbonSavings}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">CO₂ reduction</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">${groupBuy.pricePerUnit}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">${groupBuy.originalPrice}</div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                    <Users className="h-4 w-4 mr-2" />
                    Join Group
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors">
          View all group buys
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
    </div>
  )
}

export default GroupBuying