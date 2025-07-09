import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Award,
  ThumbsUp,
  Users,
  Camera,
  Verified,
  DollarSign,
  Heart,
  Share2,
  Flag,
} from "lucide-react";

export default function ProviderProfile() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("overview");

  const provider = {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    verified: true,
    rating: 4.9,
    reviews: 234,
    responseTime: "Within 1 hour",
    completedJobs: 1200,
    memberSince: "2019",
    location: "Downtown",
    bio: "Professional house cleaning service with over 8 years of experience. I specialize in deep cleaning, eco-friendly solutions, and maintaining the highest standards of cleanliness for your home.",
    services: [
      {
        id: 1,
        title: "Deep House Cleaning",
        price: 35,
        priceType: "hour",
        description: "Complete deep cleaning service for all rooms",
        duration: "2-4 hours",
      },
      {
        id: 2,
        title: "Regular Maintenance Cleaning",
        price: 25,
        priceType: "hour",
        description: "Weekly or bi-weekly maintenance cleaning",
        duration: "1-2 hours",
      },
      {
        id: 3,
        title: "Move-in/Move-out Cleaning",
        price: 45,
        priceType: "hour",
        description: "Thorough cleaning for moving situations",
        duration: "3-5 hours",
      },
    ],
    certifications: [
      "EPA Certified",
      "Bonded & Insured",
      "Green Cleaning Certified",
      "Background Checked",
    ],
    availability: {
      monday: { available: true, hours: "9:00 AM - 6:00 PM" },
      tuesday: { available: true, hours: "9:00 AM - 6:00 PM" },
      wednesday: { available: true, hours: "9:00 AM - 6:00 PM" },
      thursday: { available: true, hours: "9:00 AM - 6:00 PM" },
      friday: { available: true, hours: "9:00 AM - 6:00 PM" },
      saturday: { available: true, hours: "10:00 AM - 4:00 PM" },
      sunday: { available: false, hours: "Closed" },
    },
    gallery: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  };

  const reviews = [
    {
      id: 1,
      customer: {
        name: "Emily Davis",
        image: "/placeholder.svg",
        initials: "ED",
      },
      rating: 5,
      date: "2024-01-10",
      comment:
        "Exceptional service! Sarah was professional, thorough, and my house has never been cleaner. Highly recommend!",
      service: "Deep House Cleaning",
    },
    {
      id: 2,
      customer: {
        name: "Michael Chen",
        image: "/placeholder.svg",
        initials: "MC",
      },
      rating: 5,
      date: "2024-01-08",
      comment:
        "Very reliable and detail-oriented. Uses eco-friendly products which I appreciate. Will definitely book again.",
      service: "Regular Maintenance Cleaning",
    },
    {
      id: 3,
      customer: {
        name: "Jessica Martinez",
        image: "/placeholder.svg",
        initials: "JM",
      },
      rating: 4,
      date: "2024-01-05",
      comment:
        "Good service overall. Arrived on time and did a thorough job. House looked great afterwards.",
      service: "Move-in/Move-out Cleaning",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
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
              <Link
                to="/services"
                className="text-gray-600 hover:text-gray-900"
              >
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
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Provider Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={provider.image} alt={provider.name} />
                      <AvatarFallback className="text-2xl">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {provider.verified && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Verified className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {provider.name}
                        </h1>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold text-gray-900">
                              {provider.rating}
                            </span>
                            <span className="text-gray-500 ml-1">
                              ({provider.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.location}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.certifications.map((cert) => (
                            <Badge
                              key={cert}
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{provider.bio}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {provider.completedJobs}
                        </div>
                        <div className="text-sm text-gray-600">Jobs Done</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {provider.memberSince}
                        </div>
                        <div className="text-sm text-gray-600">
                          Member Since
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {provider.responseTime.split(" ")[1]}
                        </div>
                        <div className="text-sm text-gray-600">
                          Response Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          98%
                        </div>
                        <div className="text-sm text-gray-600">
                          On-Time Rate
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link to={`/booking/${provider.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </Link>
                      <Link to={`/chat/${provider.id}`}>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </Link>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {provider.bio} I take pride in delivering exceptional
                        results and building long-term relationships with my
                        clients. Every job is approached with attention to
                        detail and a commitment to exceeding expectations.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(provider.availability).map(
                          ([day, schedule]) => (
                            <div
                              key={day}
                              className="flex items-center justify-between py-2"
                            >
                              <span className="font-medium capitalize">
                                {day}
                              </span>
                              <span
                                className={
                                  schedule.available
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {schedule.hours}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <div className="space-y-4">
                  {provider.services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {service.duration}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <div className="text-2xl font-bold text-gray-900">
                              ${service.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              per {service.priceType}
                            </div>
                            <Button
                              className="mt-3 bg-blue-600 hover:bg-blue-700"
                              size="sm"
                            >
                              Book This
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={review.customer.image}
                              alt={review.customer.name}
                            />
                            <AvatarFallback>
                              {review.customer.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {review.customer.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">
                                for {review.service}
                              </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {provider.gallery.map((image, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square bg-gray-200 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    $35/hour
                  </div>
                  <div className="text-sm text-gray-600">Starting price</div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Response time:</span>
                    <span className="font-medium">{provider.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Next available:</span>
                    <span className="font-medium text-green-600">Today</span>
                  </div>
                </div>
                <Link to={`/booking/${provider.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book Now
                  </Button>
                </Link>
                <Link to={`/chat/${provider.id}`}>
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Identity verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Background checked</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Insurance verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Licensed professional</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
