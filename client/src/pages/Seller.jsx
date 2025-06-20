import { Users, MapPin, Clock, Leaf, DollarSign, Package } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Group Buying</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join with your community to buy sustainable products in bulk and save money while reducing environmental impact
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Active Groups",
            value: "24",
            icon: <Users className="h-4 w-4 text-blue-600" />,
            subtext: "+3 this week",
          },
          {
            label: "Total Savings",
            value: "$2,847",
            icon: <DollarSign className="h-4 w-4 text-green-600" />,
            subtext: "Community savings",
          },
          {
            label: "CO₂ Reduced",
            value: "156kg",
            icon: <Leaf className="h-4 w-4 text-green-600" />,
            subtext: "Through group buying",
          },
          {
            label: "Participants",
            value: "342",
            icon: <Users className="h-4 w-4 text-purple-600" />,
            subtext: "Active members",
          },
        ].map((stat, index) => (
          <div key={index} className="card p-4 rounded-lg shadow-sm bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">{stat.label}</h3>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Group Buy Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {groupBuys.map((groupBuy) => (
          <div key={groupBuy.id} className="card overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-900">
            <div className="relative">
              <img
                src={groupBuy.image || "/placeholder.svg"}
                alt={groupBuy.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-3 left-3 badge bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {groupBuy.category}
              </span>
              <span className="absolute top-3 right-3 badge bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {groupBuy.timeLeft}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{groupBuy.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{groupBuy.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {groupBuy.tags.map((tag, index) => (
                  <span key={index} className="badge bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>Progress</span>
                  <span>{groupBuy.currentParticipants}/{groupBuy.targetParticipants} participants</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${getProgressPercentage(groupBuy.currentParticipants, groupBuy.targetParticipants)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{groupBuy.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{groupBuy.organizer}</span>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">Save ${groupBuy.savings}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">vs individual purchase</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Leaf className="h-4 w-4" />
                      <span className="font-medium">{groupBuy.carbonSavings}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">CO₂ reduction</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">${groupBuy.pricePerUnit}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">${groupBuy.originalPrice}</div>
                </div>
                <button className="btn btn-primary flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded">
                  <Users className="h-4 w-4 mr-2" />
                  Join Group
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupBuying
