import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Filter,
  SlidersHorizontal,
  Clock,
  CheckCircle,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";

export default function Services() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedFilters, setSelectedFilters] = useState({
    availability: "any",
    rating: "any",
    verified: false,
    distance: 25,
  });

  // Handle URL parameters on component mount
  useEffect(() => {
    const queryParam = searchParams.get("query");
    const locationParam = searchParams.get("location");

    if (queryParam) setSearchQuery(queryParam);
    if (locationParam) setLocation(locationParam);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    if (location) params.append("location", location);
    if (sortBy !== "rating") params.append("sort", sortBy);

    navigate(`/services?${params.toString()}`);
  };

  const handleProviderClick = (providerId: number) => {
    navigate(`/provider/${providerId}`);
  };

  const handleBookingClick = (serviceId: number) => {
    navigate(`/booking/${serviceId}`);
  };

  const services = [
    {
      id: 1,
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg",
        verified: true,
        rating: 4.9,
        reviews: 234,
      },
      title: "Professional House Cleaning",
      description: "Deep cleaning service for homes and apartments",
      category: "Home Services",
      price: 35,
      priceType: "hour",
      location: "Downtown",
      distance: 2.3,
      availability: "Available today",
      tags: ["Deep Cleaning", "Eco-friendly", "Insured"],
      responseTime: "Within 1 hour",
      completedJobs: 1200,
    },
    {
      id: 2,
      provider: {
        name: "Mike Rodriguez",
        image: "/placeholder.svg",
        verified: true,
        rating: 4.8,
        reviews: 189,
      },
      title: "AC Repair & Maintenance",
      description: "Expert air conditioning repair and maintenance services",
      category: "Appliance Repair",
      price: 80,
      priceType: "service",
      location: "North Side",
      distance: 4.1,
      availability: "Available tomorrow",
      tags: ["Same Day Service", "Licensed", "Emergency"],
      responseTime: "Within 30 mins",
      completedJobs: 850,
    },
    // Add more services...
  ];

  const categories = [
    "All Services",
    "Home Services",
    "Appliance Repair",
    "Beauty & Wellness",
    "Automotive",
    "Electronics",
    "Professional Services",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TrustConnect
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/services" className="text-blue-600 font-medium">
                Services
              </Link>
              <Link
                to="/my-bookings"
                className="text-gray-600 hover:text-gray-900"
              >
                My Bookings
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/provider/register">Join as Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSearch}
            >
              <Filter className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="text-blue-600"
                        defaultChecked={cat === "All Services"}
                      />
                      <span className="text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={5}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Availability</h4>
                <Select
                  value={selectedFilters.availability}
                  onValueChange={(value) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      availability: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Available today</SelectItem>
                    <SelectItem value="tomorrow">Available tomorrow</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        className="text-blue-600"
                      />
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {rating}+ stars
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.verified}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        verified: e.target.checked,
                      })
                    }
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    Verified providers only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {category
                  ? `${category} Services`
                  : `${services.length} services found`}
              </h2>
            </div>

            <div className="space-y-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Provider Info */}
                      <div className="flex items-start space-x-4 lg:min-w-[300px]">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={service.provider.image}
                              alt={service.provider.name}
                            />
                            <AvatarFallback>
                              {service.provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {service.provider.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {service.provider.name}
                          </h3>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-900">
                              {service.provider.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({service.provider.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {service.distance} km away
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {service.responseTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                              {service.title}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {service.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-700"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">
                                ${service.price}
                              </span>
                              <span>/{service.priceType}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-600">
                                {service.availability}
                              </span>
                            </div>
                            <div>{service.completedJobs} jobs completed</div>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              onClick={() => handleProviderClick(service.id)}
                            >
                              View Profile
                            </Button>
                            <Button
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleBookingClick(service.id)}
                            >
                              Book Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
