import { SignUp } from "@clerk/clerk-react"

const Signup = () => {
  return (
    <SignUp/>
  )
}

export default Signup

// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { Leaf, Mail, Lock, Eye, EyeOff, User } from "lucide-react"

// const Signup = () => {
//   const navigate = useNavigate()
//   const { signup } = useAuth()
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//     subscribeNewsletter: true,
//   })

//   const validateForm = () => {
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return false
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return false
//     }
//     if (!formData.email.trim()) {
//       setError("Email is required")
//       return false
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email address")
//       return false
//     }
//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters long")
//       return false
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       return false
//     }
//     if (!formData.agreeToTerms) {
//       setError("You must agree to the Terms of Service")
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     if (!validateForm()) {
//       return
//     }

//     setIsLoading(true)

//     try {
//       const result = await signup({
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//       })

//       if (result.success) {
//         // Redirect to onboarding for new users
//         navigate("/onboarding")
//       } else {
//         setError(result.error || "Failed to create account")
//       }
//     } catch (err) {
//       setError("Failed to create account")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center hero-gradient p-4">
//       <div className="card w-full max-w-md">
//         <div className="text-center mb-6">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
//               <Leaf className="h-6 w-6 text-white" />
//             </div>
//             <span className="font-bold text-2xl text-green-700">EcoMarket</span>
//           </div>
//           <h1 className="text-2xl font-bold">Create your account</h1>
//           <p className="text-gray-600">Join thousands of eco-conscious shoppers making a difference</p>
//         </div>

//         {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   placeholder="John"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="input pl-10"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name
//               </label>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 type="text"
//                 placeholder="Doe"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="input"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="input pl-10"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Create a strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="input pl-10 pr-10"
//                 required
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 disabled={isLoading}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="input pl-10 pr-10"
//                 required
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 disabled={isLoading}
//               >
//                 {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="agreeToTerms"
//                 checked={formData.agreeToTerms}
//                 onChange={handleChange}
//                 required
//                 disabled={isLoading}
//                 className="text-green-600"
//               />
//               <span className="text-sm">
//                 I agree to the{" "}
//                 <Link to="/terms" className="text-green-600 hover:underline">
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link to="/privacy" className="text-green-600 hover:underline">
//                   Privacy Policy
//                 </Link>
//               </span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="subscribeNewsletter"
//                 checked={formData.subscribeNewsletter}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 className="text-green-600"
//               />
//               <span className="text-sm">Subscribe to our newsletter for eco-tips and exclusive offers</span>
//             </label>
//           </div>

//           <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <div className="spinner mr-2"></div>
//                 Creating Account...
//               </>
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-600 hover:underline font-medium">
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
