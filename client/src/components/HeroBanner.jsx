"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  ShoppingCart,
  Users,
  Leaf,
  Recycle,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Award,
  Shield,
  Truck,
  BarChart3,
} from "lucide-react"

// Mock data
const heroProducts = [
  { id: 1, name: "Bamboo Water Bottle", price: 24.99, x: 20, y: 30 },
  { id: 2, name: "Organic Cotton Tote", price: 18.99, x: 70, y: 60 },
  { id: 3, name: "Solar Power Bank", price: 45.99, x: 45, y: 80 },
]

const productCollections = {
  forYou: [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Reusable Food Wraps",
      price: 19.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 3,
      name: "Organic Cotton Sheets",
      price: 89.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 4,
      name: "Solar Garden Lights",
      price: 34.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 312,
    },
  ],
  trending: [
    {
      id: 5,
      name: "Compost Bin",
      price: 67.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 445,
    },
    {
      id: 6,
      name: "Eco Cleaning Kit",
      price: 29.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 278,
    },
    {
      id: 7,
      name: "Bamboo Cutting Board",
      price: 24.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 167,
    },
    {
      id: 8,
      name: "Organic Skincare Set",
      price: 54.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 203,
    },
  ],
  groupBuys: [
    {
      id: 9,
      name: "Solar Panel Kit",
      price: 299.99,
      groupPrice: 199.99,
      image: "/placeholder.svg",
      participants: 47,
      target: 100,
    },
    {
      id: 10,
      name: "Organic Fertilizer Bulk",
      price: 89.99,
      groupPrice: 59.99,
      image: "/placeholder.svg",
      participants: 23,
      target: 50,
    },
    {
      id: 11,
      name: "Eco Paint Set",
      price: 149.99,
      groupPrice: 99.99,
      image: "/placeholder.svg",
      participants: 78,
      target: 150,
    },
  ],
}

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    quote: "Green Store has transformed how I shop. The group buys save me money while helping the planet!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    image: "/placeholder.svg",
    quote: "Love tracking my CO₂ impact. It's amazing to see the difference we're making together.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    image: "/placeholder.svg",
    quote: "Quality eco products at great prices. The packaging is completely plastic-free too!",
    rating: 5,
  },
]

const features = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "Eco-Graded Products",
    description: "Every product rated for environmental impact with detailed sustainability scores.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Join Group-Buy for Discounts",
    description: "Team up with other eco-conscious shoppers to unlock bulk pricing on premium products.",
  },
  {
    icon: <Recycle className="h-8 w-8" />,
    title: "Choose Sustainable Packaging",
    description: "Select from plastic-free, compostable, or reusable packaging options for every order.",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Track Your CO₂ Impact",
    description: "Monitor your environmental savings and see your positive impact grow over time.",
  },
]

const faqs = [
  {
    question: "How do group buys work?",
    answer:
      "Group buys allow multiple customers to purchase the same product together to unlock bulk pricing. Once the minimum number of participants is reached, everyone gets the discounted price.",
  },
  {
    question: "Are all products certified eco-friendly?",
    answer:
      "Yes, every product goes through our rigorous eco-grading process. We verify certifications, materials, manufacturing processes, and packaging to ensure genuine sustainability.",
  },
  {
    question: "What packaging options are available?",
    answer:
      "We offer plastic-free packaging made from recycled cardboard, compostable materials, or reusable containers. You can choose your preferred option at checkout.",
  },
  {
    question: "How is my CO₂ impact calculated?",
    answer:
      "We calculate your impact based on the products you buy, comparing them to conventional alternatives. This includes manufacturing, packaging, and shipping emissions saved.",
  },
]

function SpotlightHotspot({ product, x, y }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg">
        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute"></div>
      </div>
      {isVisible && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border z-10 whitespace-nowrap">
          <p className="font-semibold text-sm">{product.name}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
          <Button size="sm" className="mt-2 w-full">
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  )
}

function ProductCarousel({ title, products, isGroupBuy = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= products.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1))
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-1/4 min-w-[250px]">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  {!isGroupBuy ? (
                    <>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <p className="text-xl font-bold text-green-600 mb-3">${product.price}</p>
                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-green-600">${product.groupPrice}</span>
                        <span className="text-sm text-gray-500 line-through">${product.price}</span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{product.participants} joined</span>
                          <span>{product.target} needed</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(product.participants / product.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Join Group Buy
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
