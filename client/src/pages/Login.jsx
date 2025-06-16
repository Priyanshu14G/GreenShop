import { SignIn } from "@clerk/clerk-react"

import React from 'react'

const Login = () => {
  return (
    <SignIn/>
  )
}

export default Login
// "use client"
// import { Link } from "react-router-dom"
// import { ArrowRight, Leaf, TreePine, Recycle, Star, Shield, ShoppingCart } from "lucide-react"
// import { useCart } from "../contexts/CartContext"

// const Home = () => {
//   const { addItem } = useCart()

//   const featuredProducts = [
//     {
//       id: 1,
//       name: "Organic Cotton T-Shirt",
//       price: 29.99,
//       originalPrice: 39.99,
//       image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
//       ecoScore: "A+",
//       carbonFootprint: "2.1 kg CO₂",
//       tags: ["Organic", "Fair Trade", "Plastic-Free"],
//       rating: 4.8,
//       reviews: 124,
//       verified: true,
//     },
//     {
//       id: 2,
//       name: "Bamboo Phone Case",
//       price: 24.99,
//       originalPrice: 34.99,
//       image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//       ecoScore: "A",
//       carbonFootprint: "0.8 kg CO₂",
//       tags: ["Biodegradable", "Renewable", "Compostable"],
//       rating: 4.9,
//       reviews: 89,
//       verified: true,
//     },
//     {
//       id: 3,
//       name: "Reusable Water Bottle",
//       price: 19.99,
//       originalPrice: 29.99,
//       image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
//       ecoScore: "A+",
//       carbonFootprint: "1.5 kg CO₂",
//       tags: ["BPA-Free", "Lifetime Warranty", "Plastic-Free"],
//       rating: 4.9,
//       reviews: 156,
//       verified: true,
//     },
//   ]

//   const getEcoScoreColor = (score) => {
//     switch (score) {
//       case "A+":
//         return "bg-green-600 text-white"
//       case "A":
//         return "bg-green-500 text-white"
//       case "B":
//         return "bg-yellow-500 text-white"
//       case "C":
//         return "bg-orange-500 text-white"
//       case "D":
//         return "bg-red-500 text-white"
//       default:
//         return "bg-gray-500 text-white"
//     }
//   }

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="hero-gradient py-24">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <div className="space-y-4">
//                 <span className="badge badge-green">
//                   <Leaf className="w-3 h-3 mr-1" />
//                   Carbon Neutral Shopping
//                 </span>
//                 <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
//                   Sustainability isn't a choice—
//                   <span className="text-green-600">it's the future</span>
//                 </h1>
//                 <p className="text-xl text-gray-600 max-w-2xl">
//                   Shop with purpose. Every purchase is verified by blockchain, rated for sustainability, and helps you
//                   track your carbon impact. Join the movement towards a greener tomorrow.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link to="/products" className="btn btn-primary inline-flex items-center">
//                   Start Shopping Sustainably
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//                 <Link to="/onboarding" className="btn btn-outline">
//                   Calculate Your Carbon Impact
//                 </Link>
//               </div>

//               <div className="grid grid-cols-3 gap-8 pt-8">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">50K+</div>
//                   <div className="text-sm text-gray-600">Eco Products</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">2.5M</div>
//                   <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">15K+</div>
//                   <div className="text-sm text-gray-600">Happy Customers</div>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="card relative z-10">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold">Your Eco Impact</h3>
//                     <span className="badge badge-green">A+ Rating</span>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <TreePine className="h-4 w-4 text-green-600" />
//                         <span className="text-sm">Trees Planted</span>
//                       </div>
//                       <span className="font-semibold">127</span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Recycle className="h-4 w-4 text-blue-600" />
//                         <span className="text-sm">Plastic Avoided</span>
//                       </div>
//                       <span className="font-semibold">45kg</span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Leaf className="h-4 w-4 text-green-600" />
//                         <span className="text-sm">Carbon Saved</span>
//                       </div>
//                       <span className="font-semibold">1.2 tons</span>
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t text-center">
//                     <div className="text-2xl font-bold text-green-600">92%</div>
//                     <div className="text-xs text-gray-500">Sustainability Score</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-24 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center space-y-4 mb-16">
//             <span className="badge badge-green">
//               <Leaf className="w-3 h-3 mr-1" />
//               Featured Products
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Eco-Rated Products</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover our most popular sustainable products, all verified and rated for their environmental impact.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="product-card card">
//                 <div className="relative mb-4">
//                   <img
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.name}
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                   <span className={`absolute top-3 left-3 badge ${getEcoScoreColor(product.ecoScore)}`}>
//                     {product.ecoScore}
//                   </span>
//                   {product.verified && (
//                     <span className="absolute top-3 right-3 badge bg-blue-600 text-white">
//                       <Shield className="w-3 h-3 mr-1" />
//                       Verified
//                     </span>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <div className="flex items-center">
//                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm font-medium ml-1">{product.rating}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-1">
//                     {product.tags.slice(0, 2).map((tag, index) => (
//                       <span key={index} className="badge bg-gray-100 text-gray-800 text-xs">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between text-sm text-gray-600">
//                     <span>Carbon footprint:</span>
//                     <span className="font-medium">{product.carbonFootprint}</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="space-y-1">
//                       <div className="flex items-center space-x-2">
//                         <span className="text-2xl font-bold text-green-600">${product.price}</span>
//                         <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                       </div>
//                       <div className="text-xs text-green-600 font-medium">
//                         Save ${(product.originalPrice - product.price).toFixed(2)}
//                       </div>
//                     </div>
//                     <button
//                       className="btn btn-primary flex items-center"
//                       onClick={() =>
//                         addItem({
//                           id: product.id,
//                           name: product.name,
//                           price: product.price,
//                           image: product.image,
//                           ecoScore: product.ecoScore,
//                           carbonFootprint: product.carbonFootprint,
//                         })
//                       }
//                     >
//                       <ShoppingCart className="h-4 w-4 mr-2" />
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <div className="max-w-4xl mx-auto space-y-8">
//             <span className="badge bg-white/20 text-white border-white/30">
//               <Leaf className="w-3 h-3 mr-1" />
//               Join the Movement
//             </span>

//             <h2 className="text-3xl md:text-5xl font-bold">Ready to make a difference?</h2>

//             <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
//               Join thousands of eco-conscious shoppers who are already making a positive impact on our planet through
//               sustainable choices.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/onboarding" className="btn bg-white text-green-600 hover:bg-gray-100 inline-flex items-center">
//                 Get Started Today
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//               <Link to="/products" className="btn border-white text-white hover:bg-white/10">
//                 Browse Products
//               </Link>
//             </div>

//             <div className="pt-8 text-green-100">
//               <p className="text-sm">🌱 Over 15,000 customers have already saved 2.5M kg of CO₂ emissions</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home
