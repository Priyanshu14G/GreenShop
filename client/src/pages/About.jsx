import { Leaf, Users, Award, Target } from "lucide-react"

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-green mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              About EcoMarket
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Building a Sustainable Future Together
            </h1>
            <p className="text-xl text-gray-600">
              We're on a mission to make sustainable shopping accessible, transparent, and rewarding for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, EcoMarket was born from a simple belief: that every purchase decision can contribute to
                a more sustainable world. We saw the need for a platform that not only offers eco-friendly products but
                also educates consumers about their environmental impact.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be a leading marketplace for sustainable products, helping thousands of customers
                make informed choices that benefit both them and the planet.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To democratize access to sustainable products and empower consumers with the knowledge and tools they
                need to make environmentally conscious purchasing decisions.
              </p>
              <p className="text-gray-600">
                We believe that by making sustainability accessible and rewarding, we can create a positive impact that
                extends far beyond individual purchases.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Building a community of eco-conscious consumers who support each other in making sustainable choices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Every product is carefully vetted for quality, sustainability, and environmental impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact Focused</h3>
              <p className="text-gray-600">
                Measuring and maximizing the positive environmental impact of every purchase made on our platform.
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Ready to be part of the sustainable shopping revolution? Start your journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary">Shop Sustainable Products</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
