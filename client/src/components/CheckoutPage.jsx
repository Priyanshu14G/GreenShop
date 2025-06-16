"use client"

import { useState } from "react"
import Header from "./Header"
import PackagingToggle from "./PackagingToggle"
import CarbonSavingEstimator from "./CarbonSavingEstimator"
import Button from "./ui/Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Separator } from "./ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "US",
  })

  const [packagingOption, setPackagingOption] = useState("minimal")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [darkMode, setDarkMode] = useState(false)

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Order submitted:", { formData, packagingOption, paymentMethod })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const orderTotal = 34.97
  const carbonSaved = 2.5

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950'>
      {/* <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-800 dark:text-green-400">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="dark:text-gray-300 p-2">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white p-2">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="dark:text-gray-300 p-2">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="dark:text-gray-300 p-2">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="dark:text-gray-300 p-2">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="dark:text-gray-300 p-2">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="dark:text-gray-300 p-2">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Sustainable Packaging</CardTitle>
                </CardHeader>
                <CardContent className='dark:text-gray-300 w-max-full'>
                  <PackagingToggle value={packagingOption} onChange={setPackagingOption} darkMode={darkMode} />
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className='dark:text-gray-100 w-max-full'>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="dark:text-gray-300">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="dark:text-gray-300">PayPal</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Bamboo Toothbrush Set (2x)</span>
                      <span>$25.98</span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Organic Cotton Tote Bag</span>
                      <span>$15.99</span>
                    </div>
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>$41.97</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Eco-packaging discount</span>
                    <span className="text-green-600 dark:text-green-400">-$7.00</span>
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="flex justify-between font-bold text-lg dark:text-white">
                    <span>Total</span>
                    <span className="text-green-600 dark:text-green-400">${orderTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <CarbonSavingEstimator carbonSaved={carbonSaved} darkMode={darkMode} />

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 dark:bg-green-700 dark:hover:bg-green-800">
                Complete Order
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}