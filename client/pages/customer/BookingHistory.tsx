import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Star,
  Calendar,
  MapPin,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  RotateCcw,
  Download,
} from "lucide-react";

export default function BookingHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const bookings = [
    {
      id: 1,
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg",
        rating: 4.9,
      },
      service: "House Cleaning",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "completed",
      amount: 75.0,
      location: "123 Main Street",
      bookingId: "BK001",
      canReview: true,
      canRebook: true,
    },
    {
      id: 2,
      provider: {
        name: "Mike Rodriguez",
        image: "/placeholder.svg",
        rating: 4.8,
      },
      service: "AC Repair",
      date: "2024-01-20",
      time: "2:00 PM",
      status: "upcoming",
      amount: 120.0,
      location: "123 Main Street",
      bookingId: "BK002",
      canReview: false,
      canRebook: false,
    },
    {
      id: 3,
      provider: {
        name: "Emma Chen",
        image: "/placeholder.svg",
        rating: 5.0,
      },
      service: "Hair Styling",
      date: "2024-01-12",
      time: "3:00 PM",
      status: "completed",
      amount: 85.0,
      location: "Downtown Salon",
      bookingId: "BK003",
      canReview: true,
      canRebook: true,
    },
    {
      id: 4,
      provider: {
        name: "David Wilson",
        image: "/placeholder.svg",
        rating: 4.7,
      },
      service: "Plumbing Repair",
      date: "2024-01-08",
      time: "11:00 AM",
      status: "cancelled",
      amount: 95.0,
      location: "123 Main Street",
      bookingId: "BK004",
      canReview: false,
      canRebook: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (bookingId: number) => {
    // Navigate to booking details page when implemented
    console.log("View booking details:", bookingId);
  };

  const handleContactProvider = (providerId: number) => {
    navigate(`/chat/${providerId}`);
  };

  const handleRebook = (serviceId: number) => {
    navigate(`/booking/${serviceId}`);
  };

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
              <Link to="/my-bookings" className="text-blue-600 font-medium">
                My Bookings
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Track and manage all your service bookings
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <Card
              key={booking.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Provider Info */}
                  <div className="flex items-start space-x-4 lg:min-w-[300px]">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={booking.provider.image}
                        alt={booking.provider.name}
                      />
                      <AvatarFallback>
                        {booking.provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {booking.provider.name}
                      </h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900">
                          {booking.provider.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Booking ID: {booking.bookingId}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {booking.service}
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {booking.date} at {booking.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          ${booking.amount}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactProvider(booking.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      {booking.canRebook && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRebook(booking.id)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Book Again
                        </Button>
                      )}
                      {booking.canReview && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any bookings yet"}
              </p>
              <Link to="/services">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
