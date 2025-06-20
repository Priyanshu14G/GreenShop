import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  Users,
  Leaf,
  Package,
  ShoppingCart,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Download,
} from "lucide-react";

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "medium",
    description: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Lightbulb,
      faqs: [
        {
          question: "How do I create my first product listing?",
          answer:
            "To create your first product listing, navigate to 'Submit Product' in the sidebar. Fill out all required fields including product details, sustainability information, and upload high-quality images. Our AI will calculate an Eco-Score based on your inputs. Make sure to provide accurate information about materials, certifications, and manufacturing processes for the best score.",
        },
        {
          question: "What information do I need to provide for Eco-Score calculation?",
          answer:
            "You'll need to provide: 1) Materials used (organic, recycled, etc.), 2) Certifications (GOTS, Fair Trade, etc.), 3) Manufacturing method and energy source, 4) Country of origin, 5) Shipping distance, 6) Packaging type and materials. The more accurate and detailed information you provide, the better your Eco-Score will be.",
        },
        {
          question: "How long does it take for my product to be approved?",
          answer:
            "Product approval typically takes 24-48 hours. Products with higher Eco-Scores and complete information are often approved faster. You'll receive an email notification once your product is approved. If there are issues, we'll contact you with specific feedback.",
        },
        {
          question: "How do I set up my seller profile?",
          answer:
            "Go to Settings in your dashboard to complete your seller profile. Add your business information, sustainability story, certifications, and contact details. A complete profile builds trust with customers and can improve your sales.",
        },
      ],
    },
    {
      id: "eco-scoring",
      title: "Eco-Score System",
      icon: Leaf,
      faqs: [
        {
          question: "How is the Eco-Score calculated?",
          answer:
            "The Eco-Score uses a weighted algorithm: Materials (25%), Manufacturing (20%), Shipping (15%), Packaging (20%), and Certifications (20%). Each factor is scored 0-100, then combined for your final grade (A+ to D). Higher scores mean better sustainability.",
        },
        {
          question: "Can I improve my product's Eco-Score?",
          answer:
            "Yes! Improve by: 1) Using sustainable materials (organic, recycled), 2) Obtaining certifications, 3) Reducing energy consumption, 4) Choosing eco-friendly packaging, 5) Sourcing locally to reduce shipping. You can edit products to update sustainability information.",
        },
        {
          question: "What certifications boost my Eco-Score the most?",
          answer:
            "High-impact certifications: Cradle to Cradle (+25 points), Carbon Neutral (+22 points), Organic (+20 points), GOTS (+19 points), Fair Trade (+18 points), FSC Certified (+15 points). Multiple certifications can significantly boost your score.",
        },
        {
          question: "Why is my Eco-Score lower than expected?",
          answer:
            "Common reasons: incomplete information, high-impact materials, long shipping distances, non-recyclable packaging, or lack of certifications. Review each category in your product details and update with more sustainable options where possible.",
        },
      ],
    },
    {
      id: "product-management",
      title: "Product Management",
      icon: Package,
      faqs: [
        {
          question: "How do I edit my existing products?",
          answer:
            "Go to 'Products' in the sidebar, find your product, and click the edit button (pencil icon). You can update pricing, stock levels, descriptions, images, and sustainability information. Note that changing sustainability factors will recalculate your Eco-Score.",
        },
        {
          question: "Can I bulk upload products?",
          answer:
            "Currently, products must be added individually to ensure accurate Eco-Score calculation. We're working on a bulk upload feature with CSV templates. For now, use the product submission form for each item.",
        },
        {
          question: "How do I manage my inventory?",
          answer:
            "Track inventory in the Products section. Set low stock alerts, update quantities, and mark items as out of stock. The system automatically hides out-of-stock items from customers unless you enable backorders in your settings.",
        },
        {
          question: "What image requirements should I follow?",
          answer:
            "Use high-quality images (minimum 800x800px), show multiple angles, include lifestyle shots, and highlight sustainable features. Good images can increase sales by up to 40%. Avoid watermarks and ensure good lighting.",
        },
      ],
    },
    {
      id: "orders-shipping",
      title: "Orders & Shipping",
      icon: ShoppingCart,
      faqs: [
        {
          question: "How do I process orders?",
          answer:
            "New orders appear in your Orders dashboard. Update order status: Pending → Processing → Shipped → Delivered. Customers receive automatic email notifications for each status change. Include tracking information when marking as shipped.",
        },
        {
          question: "What shipping options should I offer?",
          answer:
            "Offer carbon-neutral shipping options when possible. Partner with eco-friendly carriers, provide consolidated shipping for multiple items, and consider local pickup options to reduce environmental impact. Clearly communicate shipping policies.",
        },
        {
          question: "How do I handle returns?",
          answer:
            "Set clear return policies focusing on sustainability. Offer returnable packaging options, refurbishment services, and donation programs for items that can't be resold. Process returns quickly to maintain customer satisfaction.",
        },
        {
          question: "Can I offer international shipping?",
          answer:
            "Yes, but consider the environmental impact. International shipping affects your Eco-Score due to increased carbon footprint. Consider partnering with international distributors or focusing on regional markets first.",
        },
      ],
    },
    {
      id: "analytics-growth",
      title: "Analytics & Growth",
      icon: TrendingUp,
      faqs: [
        {
          question: "How do I interpret my analytics dashboard?",
          answer:
            "Your analytics show revenue trends, order patterns, customer behavior, and sustainability impact. Focus on conversion rates, average order value, customer lifetime value, and eco-score improvements to grow your business strategically.",
        },
        {
          question: "How can I increase my sales?",
          answer:
            "Strategies: 1) Improve Eco-Scores, 2) Optimize product photos and descriptions, 3) Highlight sustainability benefits, 4) Engage with eco-conscious communities, 5) Participate in group buys, 6) Collect and showcase customer reviews.",
        },
        {
          question: "What marketing tools are available?",
          answer:
            "Use sustainability metrics in marketing, participate in group buying campaigns, leverage customer reviews, share environmental impact stories, connect with eco-influencers, and join our seller community forums for networking.",
        },
        {
          question: "How do I track my environmental impact?",
          answer:
            "Your dashboard shows CO₂ saved, plastic avoided, and trees planted through your sales. These metrics are calculated based on your products' sustainability attributes and can be used in your marketing materials.",
        },
      ],
    },
  ];

  const quickLinks = [
    { title: "Submit Your First Product", href: "/seller/submit-product", icon: Package },
    { title: "View Analytics", href: "/seller/analytics", icon: TrendingUp },
    { title: "Manage Orders", href: "/seller/orders", icon: ShoppingCart },
    { title: "Customer Management", href: "/seller/customers", icon: Users },
  ];

  const resources = [
    {
      title: "Seller Onboarding Video",
      description: "Complete walkthrough of the seller dashboard and key features",
      type: "Video",
      duration: "15 min",
      icon: Video,
      url: "#",
      downloadable: false,
    },
    {
      title: "Eco-Score Optimization Guide",
      description: "Detailed guide to maximize your sustainability score and attract eco-conscious customers",
      type: "PDF",
      pages: "24 pages",
      icon: FileText,
      url: "#",
      downloadable: true,
    },
    {
      title: "Sustainable Packaging Best Practices",
      description: "Learn about eco-friendly packaging options that reduce environmental impact",
      type: "Article",
      readTime: "8 min",
      icon: Book,
      url: "#",
      downloadable: false,
    },
    {
      title: "Marketing Your Sustainable Products",
      description: "Proven strategies for reaching and converting eco-conscious customers",
      type: "Guide",
      readTime: "12 min",
      icon: Lightbulb,
      url: "#",
      downloadable: true,
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    useToast({
      title: "Support ticket submitted!",
      description:
        "We'll get back to you within 24 hours. Ticket #" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    });

    setTicketForm({
      subject: "",
      priority: "medium",
      description: "",
      category: "general",
    });
    setIsSubmitting(false);
  };

  const handleResourceClick = (resource) => {
    if (resource.downloadable) {
      useToast({
        title: "Download started",
        description: `${resource.title} is being downloaded...`,
      });
    } else {
      useToast({
        title: "Opening resource",
        description: `${resource.title} will open in a new tab.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Help Center</h1>
        <p className="text-muted-foreground dark:text-gray-400">Everything you need to succeed as a sustainable seller</p>
      </div>

      {/* Search */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-gray-500" />
            <Input
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800 dark:border-gray-700">
          <TabsTrigger value="faq" className="text-black dark:text-white cursor-pointer data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-700 data-[state=active]:text-white dark:data-[state=active]:text-green-400">
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides" className="text-black dark:text-white cursor-pointer data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-700 data-[state=active]:text-white dark:data-[state=active]:text-green-400">
            Guides
          </TabsTrigger>
          <TabsTrigger value="contact" className="text-black dark:text-white cursor-pointer data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-700 data-[state=active]:text-white dark:data-[state=active]:text-green-400">
            Contact
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-black dark:text-white cursor-pointer data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-700 data-[state=active]:text-white dark:data-[state=active]:text-green-400">
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Quick Links */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center dark:text-white">
                <Lightbulb className="mr-2 h-5 w-5 text-green-600 dark:text-green-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link) => (
                  <Button 
                    key={link.title} 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600" 
                    asChild
                  >
                    <a href={link.href}>
                      <link.icon className="h-6 w-6 mb-2" />
                      <span className="text-sm text-center">{link.title}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="grid gap-4">
            {(searchTerm ? filteredFAQs : faqCategories).map((category) => (
              <Card key={category.id} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <category.icon className="mr-2 h-5 w-5 text-green-600 dark:text-green-500" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`} className="dark:border-gray-700">
                        <AccordionTrigger className="text-left dark:text-gray-300 hover:dark:text-white">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground dark:text-gray-400">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <resource.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 dark:text-white">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground dark:text-gray-500">
                            {resource.duration || resource.pages || resource.readTime}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResourceClick(resource)}
                          className="flex items-center space-x-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                        >
                          {resource.downloadable ? (
                            <>
                              <Download className="h-3 w-3" />
                              <span>Download</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-3 w-3" />
                              <span>View</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 dark:text-white">Live Chat</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                  Get instant help from our support team
                </p>
                <Button
                  className="w-full dark:text-white dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600"
                  onClick={() =>
                    useToast({ title: "Chat started", description: "A support agent will be with you shortly!" })
                  }
                >
                  Start Chat
                </Button>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">Available 9 AM - 6 PM PST</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 dark:text-white">Email Support</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">Send us a detailed message</p>
                <Button
                  variant="outline"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                  onClick={() =>
                    useToast({ title: "Email client opened", description: "Your default email client should open now." })
                  }
                >
                  Send Email
                </Button>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 dark:text-white">Phone Support</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                  Speak directly with our team
                </p>
                <Button
                  variant="outline"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                  onClick={() => useToast({ title: "Calling...", description: "Connecting you to +1 (555) 123-4567" })}
                >
                  Call Now
                </Button>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
          </div>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Submit a Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject" className="p-2 dark:text-gray-300">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="p-2 dark:text-gray-300">Priority</Label>
                    <Select
                      value={ticketForm.priority}
                      onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-800 border dark:border-gray-700 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800  dark:border-white-700">
                        <SelectItem value="low" className="dark:hover:bg-gray-700 dark:text-white">Low</SelectItem>
                        <SelectItem value="medium" className="dark:hover:bg-gray-700 dark:text-white">Medium</SelectItem>
                        <SelectItem value="high" className="dark:hover:bg-gray-700 dark:text-white">High</SelectItem>
                        <SelectItem value="urgent" className="dark:hover:bg-gray-700 dark:text-white">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="p-2 dark:text-gray-300">Category</Label>
                  <Select
                    value={ticketForm.category}
                    onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="general" className="dark:hover:bg-gray-700 text-black dark:text-white">General Question</SelectItem>
                      <SelectItem value="technical" className="dark:hover:bg-gray-700 text-black dark:text-white">Technical Issue</SelectItem>
                      <SelectItem value="billing" className="dark:hover:bg-gray-700 text-black dark:text-white">Billing & Payments</SelectItem>
                      <SelectItem value="product" className="dark:hover:bg-gray-700 text-black dark:text-white">Product Management</SelectItem>
                      <SelectItem value="eco-score" className="dark:hover:bg-gray-700 text-black dark:text-white">Eco-Score Questions</SelectItem>
                      <SelectItem value="orders" className="dark:hover:bg-gray-700 text-black dark:text-white">Orders & Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description" className="p-2 dark:text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    rows={4}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full text-black dark:text-white border dark:border-gray-700 bg-green-500 hover:bg-green-700">
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Book className="mr-2 h-5 w-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium dark:text-white">API Documentation</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Complete API reference for advanced integrations
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                      onClick={() =>
                        useToast({ title: "Opening docs", description: "API documentation will open in a new tab." })
                      }
                    >
                      View Docs
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium dark:text-white">Developer Tools</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      SDKs, webhooks, and testing environments
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                      onClick={() =>
                        useToast({ title: "Accessing tools", description: "Developer tools portal is opening..." })
                      }
                    >
                      Access Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Users className="mr-2 h-5 w-5" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium dark:text-white">Seller Forum</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Connect with other sustainable sellers
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                      onClick={() =>
                        useToast({ title: "Joining forum", description: "Welcome to the seller community!" })
                      }
                    >
                      Join Forum
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium dark:text-white">Best Practices</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Learn from successful eco-entrepreneurs
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                      onClick={() =>
                        useToast({ title: "Loading stories", description: "Success stories are loading..." })
                      }
                    >
                      Read Stories
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-300">Platform Status</span>
                    <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-300">Payment Processing</span>
                    <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-300">Eco-Score Calculator</span>
                    <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
                    onClick={() =>
                      useToast({ title: "Status page", description: "Full system status page is opening..." })
                    }
                  >
                    View Full Status Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}