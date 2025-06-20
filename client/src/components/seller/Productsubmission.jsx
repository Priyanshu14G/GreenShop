import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EcoScoreVisualization from "../seller/Ecoscorevisualization";
import {
  Upload,
  Info,
  Loader2,
  CheckCircle,
  Leaf,
  Package,
  Truck,
  Factory,
  Award,
  Globe,
  Zap,
  Recycle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import EcoScoreCalculator from "../../lib/Ecoscorecalculator";
import { SellerDatabaseService } from "../../lib/Sellerdatabase";

export function ProductSubmissionFlow() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [ecoScore, setEcoScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [blockchainVerification, setBlockchainVerification] = useState(false);
  const [returnablePackaging, setReturnablePackaging] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    category: "",
    price: "",
    originalPrice: "",
    stockQuantity: "",
    materials: [],
    certifications: [],
    manufacturingMethod: "",
    countryOfOrigin: "",
    shippingDistance: "",
    energyConsumption: "",
    packagingType: "",
  });

  const categories = [
    "Fashion & Clothing",
    "Food & Beverages",
    "Home & Garden",
    "Electronics",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Books & Media",
    "Toys & Games",
  ];

  const materials = [
    "Organic Cotton",
    "Recycled Plastic",
    "Bamboo",
    "Hemp",
    "Aluminum",
    "Recycled Paper",
    "Cork",
    "Jute",
    "Linen",
    "Wool",
    "Wood",
    "Glass",
  ];

  const certifications = [
    "FSC Certified",
    "Fair Trade",
    "Organic",
    "Plastic Neutral",
    "Carbon Neutral",
    "GOTS",
    "Cradle to Cradle",
    "Energy Star",
    "B Corp",
    "Rainforest Alliance",
  ];

  const manufacturingMethods = ["Handmade", "Machine-made", "Automated", "3D Printed", "Traditional Craft"];

  const packagingTypes = ["Plastic-Free", "Compostable", "Recyclable", "Reusable", "Minimal Packaging", "Biodegradable"];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Denmark",
    "India",
    "China",
    "Japan",
    "Australia",
    "New Zealand",
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value],
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange("image", file);
    }
  };

  const calculateEcoScore = async () => {
    setIsCalculating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Calculate real eco-score using the form data
    const calculatedScore = EcoScoreCalculator.calculate({
      materials: formData.materials,
      certifications: formData.certifications,
      manufacturingMethod: formData.manufacturingMethod,
      countryOfOrigin: formData.countryOfOrigin,
      shippingDistance: formData.shippingDistance,
      energyConsumption: formData.energyConsumption,
      packagingType: formData.packagingType,
      description: formData.description,
    });

    setEcoScore(calculatedScore);
    setIsCalculating(false);
    setCurrentStep(2);
  };

  const handleSubmitProduct = async () => {
    setIsSubmitting(true);

    try {
      // Upload image if exists (simplified - in real app you'd upload to storage)
      let imageUrl = null;
      if (formData.image) {
        // In a real app, you'd upload to Supabase Storage or another service
        imageUrl = "/placeholder.svg?height=200&width=200";
      }

      // Create product in database
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        original_price: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : null,
        category: formData.category,
        image_url: imageUrl,
        materials: formData.materials,
        certifications: formData.certifications,
        manufacturing_method: formData.manufacturingMethod,
        country_of_origin: formData.countryOfOrigin,
        shipping_distance: formData.shippingDistance ? Number.parseInt(formData.shippingDistance) : null,
        energy_consumption: formData.energyConsumption ? Number.parseFloat(formData.energyConsumption) : null,
        packaging_type: formData.packagingType,
        eco_score_grade: ecoScore?.grade,
        eco_score_numeric: ecoScore?.score,
        carbon_footprint: ecoScore?.carbonFootprint,
        stock_quantity: formData.stockQuantity ? Number.parseInt(formData.stockQuantity) : 0,
        status: "pending", // Products start as pending for review
      };

      const result = await SellerDatabaseService.createProduct(productData);

      if (result) {
        setIsSubmitted(true);
        setCurrentStep(3);
        toast({
          title: "Product submitted successfully!",
          description: "Your product has been submitted for review and will be listed soon.",
        });
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast({
        title: "Error submitting product",
        description: "There was an error submitting your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEcoScoreColor = (grade) => {
    if (grade?.startsWith("A")) return "bg-green-500 dark:bg-green-600";
    if (grade?.startsWith("B")) return "bg-lime-500 dark:bg-lime-600";
    if (grade?.startsWith("C")) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.description &&
      formData.category &&
      formData.price &&
      formData.stockQuantity &&
      formData.materials.length > 0 &&
      formData.manufacturingMethod &&
      formData.countryOfOrigin &&
      formData.shippingDistance &&
      formData.energyConsumption &&
      formData.packagingType
    );
  };

  if (currentStep === 3 && isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Product Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-6 dark:text-gray-300">
            Your product has been submitted and will be reviewed before listing with an Eco-Score of{" "}
            <Badge className={`text-white ${getEcoScoreColor(ecoScore?.grade)}`}>{ecoScore?.grade}</Badge>.
            {blockchainVerification && " Blockchain verification is pending."}
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Package className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm dark:text-gray-300">Product submitted for review</span>
            </div>
            {blockchainVerification && (
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                <span className="text-sm dark:text-gray-300">Blockchain verification initiated</span>
              </div>
            )}
            {returnablePackaging && (
              <div className="flex items-center justify-center space-x-2">
                <Recycle className="h-5 w-5 text-green-500 dark:text-green-400" />
                <span className="text-sm dark:text-gray-300">Returnable packaging logistics enabled</span>
              </div>
            )}
          </div>

          <div className="flex space-x-4 justify-center">
            <Button onClick={() => window.location.reload()}>Submit Another Product</Button>
            <Button variant="outline" asChild>
              <a href="/seller/products">View My Products</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 ">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center ${currentStep >= 1 ? "text-green-600 dark:text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-green-600 text-white dark:bg-green-700" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            1
          </div>
          <span className="ml-2 text-sm font-medium dark:text-gray-300">Product Details</span>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <div className={`flex items-center ${currentStep >= 2 ? "text-green-600 dark:text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-green-600 text-white dark:bg-green-700" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            2
          </div>
          <span className="ml-2 text-sm font-medium dark:text-gray-300">Eco-Score Review</span>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <div className={`flex items-center ${currentStep >= 3 ? "text-green-600 dark:text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? "bg-green-600 text-white dark:bg-green-700" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            3
          </div>
          <span className="ml-2 text-sm font-medium dark:text-gray-300">Confirmation</span>
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <Package className="mr-2 h-5 w-5" />
              Submit New Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TooltipProvider>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold dark:text-white">Basic Information</h3>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="productName" className="dark:text-gray-300">Product Name</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Enter a clear, descriptive name for your product</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="productName"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Organic Cotton T-Shirt"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="description" className="dark:text-gray-300">Product Description</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Detailed description helps our AI analyze sustainability features</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your product's features, benefits, and sustainability aspects..."
                    rows={4}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="dark:text-gray-300">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="29.99"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice" className="dark:text-gray-300">Original Price ($) - Optional</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      placeholder="39.99"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity" className="dark:text-gray-300">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
                      placeholder="100"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="dark:text-gray-300">Upload Product Image</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>High-quality images help customers make informed decisions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="imageUpload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                    {formData.image && <p className="text-sm text-green-600 dark:text-green-500 mt-2">✓ {formData.image.name}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="dark:text-gray-300">Product Category</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Category helps customers find your product and affects eco-scoring</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="dark:hover:bg-gray-700">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="dark:bg-gray-700" />

              {/* Sustainability Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center dark:text-white">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  Sustainability Details
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="dark:text-gray-300">Materials Used</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Select all materials used in your product. Sustainable materials improve eco-score</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={material}
                          checked={formData.materials.includes(material)}
                          onCheckedChange={() => handleArrayToggle("materials", material)}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor={material} className="text-sm dark:text-gray-300">
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.materials.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.materials.map((material) => (
                        <Badge key={material} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="dark:text-gray-300">Certifications</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Certifications significantly boost your product's eco-score</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert}
                          checked={formData.certifications.includes(cert)}
                          onCheckedChange={() => handleArrayToggle("certifications", cert)}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor={cert} className="text-sm dark:text-gray-300">
                          {cert}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Separator className="dark:bg-gray-700" />

              {/* Production & Logistics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center dark:text-white">
                  <Factory className="mr-2 h-5 w-5 text-blue-600" />
                  Production & Logistics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label className="dark:text-gray-300">Manufacturing Method</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-gray-800 dark:text-white">
                          <p>Handmade and traditional methods often have lower environmental impact</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={formData.manufacturingMethod}
                      onValueChange={(value) => handleInputChange("manufacturingMethod", value)}
                    >
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        {manufacturingMethods.map((method) => (
                          <SelectItem key={method} value={method} className="dark:hover:bg-gray-700">
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label className="dark:text-gray-300">Country of Origin</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-gray-800 dark:text-white">
                          <p>Country affects shipping distance and carbon footprint calculations</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={formData.countryOfOrigin}
                      onValueChange={(value) => handleInputChange("countryOfOrigin", value)}
                    >
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country} className="dark:hover:bg-gray-700">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2" />
                              {country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="shippingDistance" className="dark:text-gray-300">Shipping Distance (km)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-gray-800 dark:text-white">
                          <p>Average distance from production to customer. Shorter distances reduce carbon footprint</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        id="shippingDistance"
                        type="number"
                        value={formData.shippingDistance}
                        onChange={(e) => handleInputChange("shippingDistance", e.target.value)}
                        placeholder="e.g., 500"
                        className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="energyConsumption" className="dark:text-gray-300">Energy Consumption (kWh/unit)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-gray-800 dark:text-white">
                          <p>Energy used to produce one unit. Lower values improve eco-score</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        id="energyConsumption"
                        type="number"
                        step="0.1"
                        value={formData.energyConsumption}
                        onChange={(e) => handleInputChange("energyConsumption", e.target.value)}
                        placeholder="e.g., 2.5"
                        className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label className="dark:text-gray-300">Packaging Type</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="dark:bg-gray-800 dark:text-white">
                        <p>Sustainable packaging options significantly improve your eco-score</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={formData.packagingType}
                    onValueChange={(value) => handleInputChange("packagingType", value)}
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Select packaging type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {packagingTypes.map((type) => (
                        <SelectItem key={type} value={type} className="dark:hover:bg-gray-700">
                          <div className="flex items-center">
                            <Recycle className="h-4 w-4 mr-2 text-green-600" />
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TooltipProvider>

            <div className="flex justify-end pt-6">
              <Button onClick={calculateEcoScore} disabled={!isFormValid()} size="lg">
                Preview & Calculate Eco-Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          {isCalculating ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 dark:text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Calculating Eco-Score...</h3>
                <p className="text-muted-foreground dark:text-gray-400 mb-4">Our AI is analyzing your product's sustainability features</p>
                <Progress value={66} className="w-64 mx-auto" />
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                  Processing materials, certifications, and impact data
                </p>
              </CardContent>
            </Card>
          ) : (
            ecoScore && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between dark:text-white">
                      <span className="flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-green-600" />
                        Eco-Score Results
                      </span>
                      <Badge className={`text-white text-lg px-4 py-2 ${getEcoScoreColor(ecoScore.grade)}`}>
                        {ecoScore.grade}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">{ecoScore.score}/100</div>
                      <p className="text-muted-foreground dark:text-gray-400">{ecoScore.explanation}</p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold dark:text-white">Estimated Carbon Footprint</span>
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ecoScore.carbonFootprint} kg CO₂</span>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">per unit</p>
                      </div>
                    </div>

                    <EcoScoreVisualization breakdown={ecoScore.breakdown} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="dark:text-white">Confirmation & Submission</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="blockchain"
                          checked={blockchainVerification}
                          onCheckedChange={setBlockchainVerification}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor="blockchain" className="flex items-center dark:text-gray-300">
                          <Award className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-500" />
                          Submit product for blockchain verification
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 ml-6">
                        Blockchain verification provides additional trust and transparency for your sustainable claims.
                      </p>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="returnable"
                          checked={returnablePackaging}
                          onCheckedChange={setReturnablePackaging}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor="returnable" className="flex items-center dark:text-gray-300">
                          <Recycle className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                          Allow returnable packaging logistics
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 ml-6">
                        Enable customers to return packaging for reuse, further reducing environmental impact.
                      </p>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Edit
                      </Button>
                      <Button onClick={handleSubmitProduct} disabled={isSubmitting} size="lg">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm and Submit Product
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}