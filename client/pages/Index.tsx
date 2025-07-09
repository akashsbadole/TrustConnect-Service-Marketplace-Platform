import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SEO, { pageSEO } from "@/components/SEO";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Wrench,
  Scissors,
  Car,
  Laptop,
  Paintbrush,
  Users,
  ThumbsUp,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (searchQuery || location) {
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (location) params.append("location", location);
      navigate(`/services?${params.toString()}`);
    } else {
      navigate("/services");
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(
      `/services/${encodeURIComponent(category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"))}`,
    );
  };

  const handleProviderClick = (providerId: number) => {
    navigate(`/provider/${providerId}`);
  };

  const handleBookingClick = (providerId: number) => {
    navigate(`/booking/${providerId}`);
  };

  const serviceCategories = [
    {
      icon: Home,
      title: "Home Services",
      description: "Cleaning, maintenance, repairs",
      count: "2,400+",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Wrench,
      title: "Appliance Repair",
      description: "AC, refrigerator, washing machine",
      count: "1,800+",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Scissors,
      title: "Beauty & Wellness",
      description: "Salon, spa, fitness trainers",
      count: "3,200+",
      color: "bg-pink-50 text-pink-600",
    },
    {
      icon: Car,
      title: "Automotive",
      description: "Car wash, repairs, maintenance",
      count: "950+",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Laptop,
      title: "Electronics",
      description: "Phone, laptop, TV repairs",
      count: "1,100+",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Paintbrush,
      title: "Professional Services",
      description: "Legal, accounting, consulting",
      count: "750+",
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  const featuredProfessionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 234,
      image: "/placeholder.svg",
      verified: true,
      price: "$35/hour",
      location: "Downtown",
      experience: "5+ years",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      service: "AC Repair Specialist",
      rating: 4.8,
      reviews: 189,
      image: "/placeholder.svg",
      verified: true,
      price: "$80/service",
      location: "North Side",
      experience: "8+ years",
    },
    {
      id: 3,
      name: "Emma Chen",
      service: "Hair Stylist",
      rating: 5.0,
      reviews: 156,
      image: "/placeholder.svg",
      verified: true,
      price: "$45/hour",
      location: "Central",
      experience: "6+ years",
    },
    {
      id: 4,
      name: "David Thompson",
      service: "Electronics Repair",
      rating: 4.9,
      reviews: 267,
      image: "/placeholder.svg",
      verified: true,
      price: "$60/hour",
      location: "West End",
      experience: "10+ years",
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Search & Discover",
      description:
        "Find trusted professionals near you by service type or location",
      icon: Search,
    },
    {
      step: 2,
      title: "Compare & Choose",
      description:
        "Review profiles, ratings, and prices to find the perfect match",
      icon: Users,
    },
    {
      step: 3,
      title: "Book & Relax",
      description: "Schedule your service and enjoy professional quality work",
      icon: ThumbsUp,
    },
  ];

  return (
    <>
      <SEO {...pageSEO.home} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  TrustConnect
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Services
                </Link>
                <a
                  href="#professionals"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Professionals
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/provider/register">
                  <Button
                    size="sm"
                    className="bg-slate-800 hover:bg-cyan-400 transition-colors duration-200"
                  >
                    Join as Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your One-Stop Destination for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Trusted Professionals
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Discover verified professionals near you for all your needs -
                home services, appliance repairs, beauticians, and much more.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="What service do you need?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    className="h-12 bg-slate-800 hover:bg-cyan-400 text-lg font-semibold transition-colors duration-200"
                    onClick={handleSearch}
                  >
                    Search Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    10,000+
                  </div>
                  <div className="text-gray-600">Verified Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    50,000+
                  </div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100+</div>
                  <div className="text-gray-600">Service Categories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Popular Service Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From home maintenance to personal care, find the right
                professional for every need
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
                    onClick={() => handleCategoryClick(category.title)}
                  >
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-gray-100">
                          {category.count} professionals
                        </Badge>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Professionals */}
        <section id="professionals" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Trusted Professionals
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet some of our top-rated professionals who deliver exceptional
                service
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage
                          src={professional.image}
                          alt={professional.name}
                        />
                        <AvatarFallback>
                          {professional.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {professional.verified && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {professional.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {professional.service}
                      </p>

                      <div className="flex items-center justify-center space-x-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900">
                          {professional.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({professional.reviews})
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Price:</span>
                          <span className="font-medium text-gray-900">
                            {professional.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Location:</span>
                          <span>{professional.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Experience:</span>
                          <span>{professional.experience}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          className="flex-1 bg-gray-100 text-gray-900 hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProviderClick(professional.id);
                          }}
                        >
                          View Profile
                        </Button>
                        <Button
                          className="flex-1 bg-slate-800 hover:bg-cyan-400 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookingClick(professional.id);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Getting the help you need is simple and straightforward
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {howItWorksSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="text-center relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center text-sm font-bold text-blue-600">
                      {step.step}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>

                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Find Your Perfect Professional?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Join thousands of satisfied customers who trust TrustConnect for
                all their service needs
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-slate-800 hover:bg-cyan-100 transition-colors duration-200"
                  onClick={() => navigate("/services")}
                >
                  <Search className="mr-2 w-5 h-5" />
                  Find a Professional
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-cyan-400 hover:text-slate-800 transition-colors duration-200"
                  onClick={() => navigate("/provider/register")}
                >
                  <Shield className="mr-2 w-5 h-5" />
                  Become a Professional
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">TrustConnect</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Your trusted platform for discovering reliable professionals
                  near you.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-6">Services</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <button
                      onClick={() => handleCategoryClick("Home Services")}
                      className="hover:text-white transition-colors text-left"
                    >
                      Home Services
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("Appliance Repair")}
                      className="hover:text-white transition-colors text-left"
                    >
                      Appliance Repair
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("Beauty & Wellness")}
                      className="hover:text-white transition-colors text-left"
                    >
                      Beauty & Wellness
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("Automotive")}
                      className="hover:text-white transition-colors text-left"
                    >
                      Automotive
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("Electronics")}
                      className="hover:text-white transition-colors text-left"
                    >
                      Electronics
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-6">Company</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Trust & Safety
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
                <h3 className="font-semibold mb-6">Support</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 TrustConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
