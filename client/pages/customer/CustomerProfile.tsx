import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Edit,
  CreditCard,
  Bell,
  Settings,
  Heart,
  MessageSquare,
  FileText,
  HelpCircle,
  LogOut,
  User,
  Home,
  DollarSign,
  Eye,
  Download,
} from "lucide-react";

export default function CustomerProfile() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    dateOfBirth: "1990-01-15",
  });

  const recentBookings = [
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
      canReview: true,
      canRebook: true,
    },
  ];

  const favoriteProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 234,
      lastBooked: "2024-01-15",
    },
    {
      id: 2,
      name: "David Wilson",
      image: "/placeholder.svg",
      service: "Plumbing",
      rating: 4.8,
      reviews: 189,
      lastBooked: "2023-12-20",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      email: "john.doe@example.com",
      isDefault: false,
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
      default:
        return "bg-gray-100 text-gray-800";
    }
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
              <Link
                to="/my-bookings"
                className="text-gray-600 hover:text-gray-900"
              >
                My Bookings
              </Link>
              <Link to="/profile" className="text-blue-600 font-medium">
                Profile
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" alt="John Doe" />
                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setSelectedTab("profile")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "profile"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setSelectedTab("bookings")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "bookings"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => setSelectedTab("favorites")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "favorites"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    Favorites
                  </button>
                  <button
                    onClick={() => setSelectedTab("payments")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "payments"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    Payment Methods
                  </button>
                  <button
                    onClick={() => setSelectedTab("notifications")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "notifications"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setSelectedTab("support")}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTab === "support"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <HelpCircle className="w-5 h-5 mr-3" />
                    Support
                  </button>
                </nav>

                <Separator className="my-6" />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {selectedTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={profileData.state}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              zipCode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* My Bookings */}
            {selectedTab === "bookings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
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
                              <h4 className="font-medium text-gray-900">
                                {booking.service}
                              </h4>
                              <p className="text-sm text-gray-600">
                                with {booking.provider.name}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span>
                                  {booking.date} at {booking.time}
                                </span>
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {booking.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                              ${booking.amount}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {booking.canReview && (
                                <Button variant="ghost" size="sm">
                                  <Star className="w-4 h-4" />
                                </Button>
                              )}
                              {booking.canRebook && (
                                <Button variant="ghost" size="sm">
                                  <Calendar className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Favorites */}
            {selectedTab === "favorites" && (
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {favoriteProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={provider.image}
                              alt={provider.name}
                            />
                            <AvatarFallback>
                              {provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {provider.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {provider.service}
                            </p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm">
                                {provider.rating} ({provider.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-2">
                            Last booked: {provider.lastBooked}
                          </p>
                          <div className="flex space-x-2">
                            <Link to={`/provider/${provider.id}`}>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                            </Link>
                            <Link to={`/booking/${provider.id}`}>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Book Again
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods */}
            {selectedTab === "payments" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {method.type}
                            </h4>
                            {method.last4 ? (
                              <p className="text-sm text-gray-600">
                                {method.brand} ending in {method.last4}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600">
                                {method.email}
                              </p>
                            )}
                            {method.isDefault && (
                              <Badge
                                variant="secondary"
                                className="mt-1 bg-blue-100 text-blue-800"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-2"
                    >
                      + Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications */}
            {selectedTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Receive updates about your bookings
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Get text updates for important events
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Browser notifications for real-time updates
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-sm text-gray-600">
                          Promotional offers and service recommendations
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Support */}
            {selectedTab === "support" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-5 h-5 mr-3" />
                      Live Chat Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-5 h-5 mr-3" />
                      Call Support: 1-800-TRUST-CO
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-5 h-5 mr-3" />
                      Email: support@trustconnect.com
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="w-5 h-5 mr-3" />
                      Help Center & FAQ
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-5 h-5 mr-3" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-5 h-5 mr-3" />
                      Export Booking History
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-5 h-5 mr-3" />
                      Account Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
