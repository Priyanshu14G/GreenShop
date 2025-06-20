import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ProductCard from "./ProductCard"; // Assuming you have this
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Check,
  ArrowRight,
  Heart,
  ShieldCheck,
  Package,
  Sprout,
  Globe,
  BadgePercent,
  LeafyGreen,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

// Mock data
const heroProducts = [
  { id: 1, name: "Bamboo Water Bottle", price: 24.99, x: 20, y: 30 },
  { id: 2, name: "Organic Cotton Tote", price: 18.99, x: 70, y: 60 },
  { id: 3, name: "Solar Power Bank", price: 45.99, x: 45, y: 80 },
];

const productCollections = {
  forYou: [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      image: "https://m.media-amazon.com/images/I/51RM9Gr4n0L._AC_.jpg",
      rating: 4.8,
      reviews: 234,
      ecoScore: 95,
    },
    {
      id: 2,
      name: "Reusable Food Wraps",
      price: 19.99,
      image: "https://hips.hearstapps.com/hmg-prod/images/reusable-beeswax-1579042994.png?crop=0.492xw:0.984xh;0.245xw,0&resize=1200:*",
      rating: 4.9,
      reviews: 156,
      ecoScore: 98,
    },
    {
      id: 3,
      name: "Organic Cotton Sheets",
      price: 89.99,
      image: "https://lanelinen.in/cdn/shop/files/White3_hrfrnd_b86b6f79-b34d-4f3e-9f7d-6d6784a40117_1200x1200.png?v=1735367585",
      rating: 4.7,
      reviews: 89,
      ecoScore: 92,
    },
    // {
    //   id: 4,
    //   name: "Solar Garden Lights",
    //   price: 34.99,
    //   image: "/placeholder.svg",
    //   rating: 4.6,
    //   reviews: 312,
    //   ecoScore: 97,
    // },
  ],
  trending: [
    {
      id: 5,
      name: "Compost Bin",
      price: 67.99,
      image: "https://samataproducts.com/wp-content/uploads/2020/07/Untitled-2.jpg",
      rating: 4.8,
      reviews: 445,
      ecoScore: 96,
    },
    {
      id: 6,
      name: "Eco Cleaning Kit",
      price: 29.99,
      image: "https://ecosyscleaners.com/cdn/shop/files/3_1bf26c22-dd8d-45c1-82f0-8d2c71133c98.webp?v=1715166879&width=1445",
      rating: 4.9,
      reviews: 278,
      ecoScore: 94,
    },
    {
      id: 7,
      name: "Bamboo Cutting Board",
      price: 24.99,
      image: "https://m.media-amazon.com/images/I/61TrRmbLPPL.jpg",
      rating: 4.7,
      reviews: 167,
      ecoScore: 99,
    },
    // {
    //   id: 8,
    //   name: "Organic Skincare Set",
    //   price: 54.99,
    //   image: "/placeholder.svg",
    //   rating: 4.8,
    //   reviews: 203,
    //   ecoScore: 93,
    // },
  ],
  groupBuys: [
    {
      id: 9,
      name: "Solar Panel Kit",
      price: 299.99,
      groupPrice: 199.99,
      image: "https://images-cdn.ubuy.co.in/652a44960e5d8250db05f879-eco-worthy-4-8kwh-solar-power-complete.jpg",
      participants: 47,
      target: 100,
      savings: 100,
    },
    {
      id: 10,
      name: "Organic Fertilizer Bulk",
      price: 89.99,
      groupPrice: 59.99,
      image: "https://ayushkerala.com/wp-content/uploads/2023/04/FACTAMFOS-Organic-Fertilizer.jpg",
      participants: 23,
      target: 50,
      savings: 30,
    },
    {
      id: 11,
      name: "Eco Paint Set",
      price: 149.99,
      groupPrice: 99.99,
      image: "https://ecopaints.co.in/wp-content/uploads/2019/02/06-1.jpg",
      participants: 78,
      target: 150,
      savings: 50,
    },
  ],
};

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "https://prochange.com/wp-content/uploads/2023/06/Sara-Johnson-Headshot.png",
    quote: "Green Store has transformed how I shop. The group buys save me money while helping the planet!",
    rating: 5,
    location: "Portland, OR",
  },
  {
    name: "Mike Chen",
    image: "https://nationaltoday.com/wp-content/uploads/2022/11/456841355-min-1200x834.jpg",
    quote: "Love tracking my CO₂ impact. It's amazing to see the difference we're making together.",
    rating: 5,
    location: "Austin, TX",
  },
  {
    name: "Emma Davis",
    image: "https://www.womenaustralia.info/wp-content/uploads/2024/07/Emma-Davidson.jpg",
    quote: "Quality eco products at great prices. The packaging is completely plastic-free too!",
    rating: 5,
    location: "Boulder, CO",
  },
];

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
];

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
];

function TrendingSection() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:4000/api/recommend/trending");
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch trending products");
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }
        
        const validatedData = data.map(item => ({
          objectID: item.code || Math.random().toString(36).substring(2, 9),
          product_name: item.product_name || "Untitled Product",
          image_url: item.image_url || '/placeholder-product.png',
          category: item.category || "uncategorized",
          price: typeof item.price === 'number' ? item.price : 0,
          nutriscore_grade: item.nutriscore_grade || 'a',
          environmental_score: item.environmental_score || 0,
          environmental_grade: item.environmental_grade || 'a',
          isEcoFriendly: item.isEcoFriendly !== undefined ? item.isEcoFriendly : true
        }));
        
        setTrending(validatedData);
        
      } catch (err) {
        console.error("Trending fetch failed:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="mb-8">
      {/* Implementation remains the same */}
    </div>
  );
}

function SpotlightHotspot({ product, x, y }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="relative">
        <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse shadow-lg ring-2 ring-white ring-offset-2 ring-offset-green-500/30">
          <div className="w-5 h-5 bg-green-500 rounded-full animate-ping absolute"></div>
        </div>
        {isVisible && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-10 min-w-[220px] transition-all duration-300 ease-out">
            <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
            <p className="text-green-600 font-bold text-lg">${product.price}</p>
            <Button size="sm" className="mt-3 w-full group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, isGroupBuy = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card 
      className={`h-full transition-all duration-300 ${isHovered ? 'shadow-xl border-green-100 dark:border-green-900/50' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-60 object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`absolute top-3 right-3 p-2 rounded-full ${isLiked ? 'bg-red-500/20 text-red-500' : 'bg-white/80 text-gray-600 hover:bg-white'} shadow-sm transition-colors`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          {!isGroupBuy && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
            </div>
          )}
          {product.ecoScore && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Leaf className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">{product.ecoScore}</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium mb-2 line-clamp-2 leading-snug">{product.name}</h3>
          
          {!isGroupBuy ? (
            <>
              <div className="mt-auto">
                <p className="text-xl font-bold text-green-600 mb-3">${product.price}</p>
                <Button 
                  className={`w-full transition-all ${isHovered ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50 text-green-600 border border-green-600'}`}
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-green-600">${product.groupPrice}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-auto">
                    Save ${product.savings}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1 text-gray-500">
                    <span>{product.participants} joined</span>
                    <span>{product.target - product.participants} more needed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (product.participants / product.target) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <Button 
                  className={`w-full transition-all ${isHovered ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50 text-green-600 border border-green-600'}`}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Group Buy
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCarousel({ title, products, isGroupBuy = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const totalPages = Math.ceil(products.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div className="mb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2 sm:px-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {isGroupBuy
              ? "Join forces with other eco-conscious shoppers"
              : "Curated selection of sustainable products"}
          </p>
        </div>

        {/* Active Chevron Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={prevSlide}
            className="rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-300 shadow-md"
            size="icon"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={nextSlide}
            className="rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-300 shadow-md"
            size="icon"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative overflow-hidden px-1">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-1"
            >
              <div className="backdrop-blur-md bg-white/60 dark:bg-gray-900/50 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.02]">
                <ProductCard product={product} isGroupBuy={isGroupBuy} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-6 gap-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-green-600 w-5"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


export default function GreenStoreLanding() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Floating Navigation */}
      {/* <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">GreenStore</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Shop</a>
                <a href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Group Buys</a>
                <a href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Impact</a>
                <a href="#" className="text-sm font-medium hover:text-green-600 transition-colors">About</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search eco products..."
                  className="pl-10 w-[200px] lg:w-[300px] bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Button className="hidden md:flex bg-green-600 hover:bg-green-700">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 overflow-hidden">
  {/* Background Image & Overlay */}
  <div className="absolute inset-0">
    <img
      src="/home.jpg"
      alt="Eco-friendly lifestyle"
      className="object-cover opacity-70 dark:opacity-10"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-green-50/80 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-green-900/20" />
    {heroProducts.map((product) => (
      <SpotlightHotspot key={product.id} product={product} x={product.x} y={product.y} />
    ))}
  </div>

  {/* Centered Content */}
  <div className="relative z-10 max-w-4xl text-center px-6 py-8 ">
    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-800/40 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full mb-6 shadow-md">
      <Sprout className="h-4 w-4" />
      <span className="text-sm font-medium tracking-wide">Sustainable Shopping Redefined</span>
    </div>

    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-transparent bg-clip-text drop-shadow-md">
      Shop Consciously,<br />Live Sustainably
    </h1>

    <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 mb-8 font-light max-w-2xl mx-auto">
      Discover premium eco-friendly products, join group buys for exclusive prices, and track your positive environmental impact.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
      <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl shadow-green-500/30">
        <ShoppingBag className="h-5 w-5 mr-2" />
        Shop Now
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="bg-white/80 dark:bg-gray-800/80 border border-green-300 dark:border-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md"
      >
        <Users className="h-5 w-5 mr-2" />
        Explore Group Buys
      </Button>
    </div>

    {/* Highlights */}
    <div className="flex flex-wrap justify-center gap-6 text-gray-700 dark:text-gray-300 text-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        Certified Eco-Friendly
      </div>
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-green-600" />
        Plastic-Free Packaging
      </div>
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-green-600" />
        Carbon-Neutral Shipping
      </div>
    </div>
  </div>

  {/* Down Arrow Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-300" />
  </div>
</section>


      {/* Trust Indicators */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-t border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Saved</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Eco Products</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sustainable Sourcing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Collections */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingSection />
          <ProductCarousel title="Curated For You" products={productCollections.forYou} />
          <ProductCarousel title="Trending Eco Products" products={productCollections.trending} />
          <ProductCarousel title="Community Group Buys" products={productCollections.groupBuys} isGroupBuy={true} />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainable Shopping Made Simple</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine premium eco-products with innovative features to make sustainable living accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-green-100 dark:bg-green-900/30 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="text-green-600 mb-4 flex justify-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Community Voices
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of eco-conscious shoppers making a difference every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-green-100 dark:bg-green-900/30 opacity-20"></div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How GreenStore Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three simple steps to start your eco-friendly shopping journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Choose</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse our curated selection of eco-friendly products with detailed sustainability ratings.
              </p>
            </div>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Group-Buy or Buy Direct</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Save money by joining group purchases or buy directly at competitive prices.
              </p>
            </div>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your environmental savings and see your positive impact grow over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Shop Sustainably?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of eco-conscious shoppers and start making a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 border-white text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Need Help?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about shopping sustainably with us.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-green-500 transition-colors"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-left">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">GreenStore</span>
              </div>
              <p className="text-gray-400 mb-6">
                Making sustainable shopping accessible, affordable, and impactful for everyone.
              </p>
              <div className="flex gap-4 mb-6">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure Payment Options</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Group Buys
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Impact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Help</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe for eco tips, exclusive offers, and new product alerts.
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 placeholder-gray-500 text-white" 
                />
                <Button size="icon" className="bg-green-600 hover:bg-green-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  I agree to receive emails about eco-friendly products and sustainability tips.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GreenStore. All rights reserved.
            </p>
            <div className="flex gap-6">
              <img src="/payment-visa.svg" alt="Visa" className="h-6 opacity-70" />
              <img src="/payment-mastercard.svg" alt="Mastercard" className="h-6 opacity-70" />
              <img src="/payment-paypal.svg" alt="PayPal" className="h-6 opacity-70" />
              <img src="/payment-applepay.svg" alt="Apple Pay" className="h-6 opacity-70" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}