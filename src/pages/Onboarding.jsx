"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Leaf, Utensils, ShoppingBag, Heart, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"

const Onboarding = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    dietaryPreference: "",
    sustainabilityValues: [],
    shoppingCategories: [],
    monthlyBudget: 100,
    carbonGoal: "moderate",
    notifications: {
      deals: true,
      groupBuys: true,
      impact: true,
      challenges: false,
    },
  })

  const steps = [
    {
      id: 1,
      title: "Dietary Preferences",
      description: "Help us recommend the right food products for you",
      icon: Utensils,
    },
    {
      id: 2,
      title: "Sustainability Values",
      description: "What environmental causes matter most to you?",
      icon: Leaf,
    },
    {
      id: 3,
      title: "Shopping Categories",
      description: "Which product categories are you most interested in?",
      icon: ShoppingBag,
    },
    {
      id: 4,
      title: "Budget & Goals",
      description: "Set your sustainability budget and goals",
      icon: Heart,
    },
  ]

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("userPreferences", JSON.stringify(formData))
    navigate("/dashboard")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Utensils className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">What's your dietary preference?</h2>
              <p className="text-gray-600">This helps us recommend the right food products for your lifestyle</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "omnivore", label: "Omnivore", description: "I eat everything" },
                { id: "vegetarian", label: "Vegetarian", description: "No meat, but dairy and eggs are okay" },
                { id: "vegan", label: "Vegan", description: "Plant-based only" },
                { id: "pescatarian", label: "Pescatarian", description: "Vegetarian + fish" },
                { id: "flexitarian", label: "Flexitarian", description: "Mostly vegetarian with occasional meat" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="dietaryPreference"
                    value={option.id}
                    checked={formData.dietaryPreference === option.id}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="text-green-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Leaf className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">What sustainability values matter to you?</h2>
              <p className="text-gray-600">Select all that apply - we'll prioritize products that match your values</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { id: "plastic-free", label: "Plastic-Free", description: "Avoid single-use plastics" },
                { id: "locally-sourced", label: "Locally Sourced", description: "Support local businesses" },
                { id: "organic", label: "Organic", description: "Chemical-free products" },
                { id: "fair-trade", label: "Fair Trade", description: "Ethical labor practices" },
                { id: "carbon-neutral", label: "Carbon Neutral", description: "Climate-friendly products" },
                { id: "renewable-energy", label: "Renewable Energy", description: "Clean energy powered" },
              ].map((value) => (
                <label
                  key={value.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.sustainabilityValues.includes(value.id)
                      ? "border-green-500 bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.sustainabilityValues.includes(value.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            sustainabilityValues: [...formData.sustainabilityValues, value.id],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            sustainabilityValues: formData.sustainabilityValues.filter((id) => id !== value.id),
                          })
                        }
                      }}
                      className="mt-1 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{value.label}</div>
                      <p className="text-sm text-gray-500">{value.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <ShoppingBag className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">What do you like to shop for?</h2>
              <p className="text-gray-600">We'll customize your feed with products from your favorite categories</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { id: "food", label: "Food & Beverages", description: "Organic, local, sustainable food" },
                { id: "fashion", label: "Fashion & Clothing", description: "Sustainable and ethical fashion" },
                { id: "home", label: "Home & Garden", description: "Eco-friendly home products" },
                { id: "electronics", label: "Electronics", description: "Energy-efficient tech" },
                { id: "beauty", label: "Beauty & Personal Care", description: "Natural and cruelty-free" },
                { id: "baby", label: "Baby & Kids", description: "Safe, non-toxic products" },
              ].map((category) => (
                <label
                  key={category.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.shoppingCategories.includes(category.id)
                      ? "border-green-500 bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.shoppingCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            shoppingCategories: [...formData.shoppingCategories, category.id],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            shoppingCategories: formData.shoppingCategories.filter((id) => id !== category.id),
                          })
                        }
                      }}
                      className="mt-1 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{category.label}</div>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Heart className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">Set your sustainability goals</h2>
              <p className="text-gray-600">Help us personalize your experience and track your impact</p>
            </div>

            <div className="space-y-6">
              {/* Monthly Budget */}
              <div className="space-y-4">
                <label className="text-base font-medium">
                  Monthly sustainability budget: ${formData.monthlyBudget}
                </label>
                <input
                  type="range"
                  min="25"
                  max="500"
                  step="25"
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$25</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Carbon Goal */}
              <div className="space-y-4">
                <label className="text-base font-medium">Carbon reduction goal</label>
                <div className="space-y-2">
                  {[
                    { value: "conservative", label: "Conservative (5-10% reduction)" },
                    { value: "moderate", label: "Moderate (15-25% reduction)" },
                    { value: "ambitious", label: "Ambitious (30%+ reduction)" },
                  ].map((goal) => (
                    <label key={goal.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="carbonGoal"
                        value={goal.value}
                        checked={formData.carbonGoal === goal.value}
                        onChange={(e) => setFormData({ ...formData, carbonGoal: e.target.value })}
                        className="text-green-600"
                      />
                      <span>{goal.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-green-700">EcoMarket</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your sustainable journey!</h1>
          <p className="text-gray-600">Let's personalize your experience with a few quick questions</p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-green-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center space-y-2 ${
                  currentStep >= step.id ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <div className="text-center hidden sm:block">
                  <div className="text-xs font-medium">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="card max-w-4xl mx-auto">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn btn-outline flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-4">
            <button onClick={() => navigate("/dashboard")} className="btn btn-outline text-gray-600">
              Skip for now
            </button>
            <button onClick={handleNext} className="btn btn-primary flex items-center space-x-2">
              <span>{currentStep === steps.length ? "Complete Setup" : "Next"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
