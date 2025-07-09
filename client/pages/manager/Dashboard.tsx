import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Download,
  Filter,
} from "lucide-react";

export default function ManagerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const analytics = {
    totalRevenue: 485750,
    totalBookings: 12450,
    activeProviders: 2340,
    customerSatisfaction: 4.8,
    averageBookingValue: 67.5,
    conversionRate: 12.3,
    disputeRate: 2.1,
    repeatCustomerRate: 68.9,
  };

  const categoryPerformance = [
    {
      category: "Home Services",
      revenue: 125000,
      bookings: 3200,
      growth: 15.2,
      satisfaction: 4.9,
    },
    {
      category: "Appliance Repair",
      revenue: 98000,
      bookings: 1800,
      growth: 8.7,
      satisfaction: 4.7,
    },
    {
      category: "Beauty & Wellness",
      revenue: 156000,
      bookings: 4100,
      growth: 22.1,
      satisfaction: 4.8,
    },
    {
      category: "Automotive",
      revenue: 67000,
      bookings: 950,
      growth: -2.3,
      satisfaction: 4.6,
    },
  ];

  const recentDisputes = [
    {
      id: 1,
      bookingId: "BK12345",
      customer: "John Doe",
      provider: "Sarah Johnson",
      service: "House Cleaning",
      issue: "Service quality complaint",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      bookingId: "BK12346",
      customer: "Emily Davis",
      provider: "Mike Rodriguez",
      service: "AC Repair",
      issue: "Billing dispute",
      status: "investigating",
      priority: "medium",
      createdAt: "2024-01-14",
    },
  ];

  const topProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      bookings: 127,
      revenue: 8450,
      growth: 18.5,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      service: "AC Repair",
      rating: 4.8,
      bookings: 89,
      revenue: 12300,
      growth: 12.3,
    },
    {
      id: 3,
      name: "Emma Chen",
      service: "Hair Styling",
      rating: 5.0,
      bookings: 156,
      revenue: 9800,
      growth: 25.7,
    },
  ];

  const getDisputeStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TrustConnect Manager
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/manager/dashboard"
                className="text-green-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/manager/analytics"
                className="text-gray-600 hover:text-gray-900"
              >
                Analytics
              </Link>
              <Link
                to="/manager/categories"
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link
                to="/manager/disputes"
                className="text-gray-600 hover:text-gray-900"
              >
                Disputes
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-600">
            Business analytics and performance insights
          </p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${analytics.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.totalBookings.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+8.2%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Providers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.activeProviders.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+5.7%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Satisfaction
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.customerSatisfaction}/5
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-500">Based on recent reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="categories" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="categories">
                  Category Performance
                </TabsTrigger>
                <TabsTrigger value="disputes">Disputes</TabsTrigger>
                <TabsTrigger value="providers">Top Providers</TabsTrigger>
              </TabsList>

              <TabsContent value="categories">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Category Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {categoryPerformance.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {category.category}
                            </h4>
                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="block">Revenue</span>
                                <span className="font-medium text-gray-900">
                                  ${category.revenue.toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="block">Bookings</span>
                                <span className="font-medium text-gray-900">
                                  {category.bookings.toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="block">Satisfaction</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="font-medium text-gray-900">
                                    {category.satisfaction}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-sm font-medium ${
                                category.growth >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {category.growth >= 0 ? "+" : ""}
                              {category.growth}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="disputes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Recent Disputes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDisputes.map((dispute) => (
                        <div
                          key={dispute.id}
                          className="flex items-start justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {dispute.bookingId}
                              </h4>
                              <Badge
                                className={getDisputeStatusColor(
                                  dispute.status,
                                )}
                              >
                                {dispute.status}
                              </Badge>
                              <Badge
                                className={getPriorityColor(dispute.priority)}
                              >
                                {dispute.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Customer:</strong> {dispute.customer} |{" "}
                              <strong>Provider:</strong> {dispute.provider}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Service:</strong> {dispute.service}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Issue:</strong> {dispute.issue}
                            </p>
                            <p className="text-xs text-gray-500">
                              Created: {dispute.createdAt}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Resolve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="providers">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Top Performing Providers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProviders.map((provider, index) => (
                        <div
                          key={provider.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                              #{index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {provider.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {provider.service}
                              </p>
                              <div className="flex items-center mt-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {provider.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${provider.revenue.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {provider.bookings} bookings
                            </div>
                            <div className="text-sm text-green-600">
                              +{provider.growth}% growth
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Category
                </Button>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Avg Booking Value
                  </span>
                  <span className="font-medium">
                    ${analytics.averageBookingValue}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-medium">
                    {analytics.conversionRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dispute Rate</span>
                  <span className="font-medium text-red-600">
                    {analytics.disputeRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Repeat Customers
                  </span>
                  <span className="font-medium text-green-600">
                    {analytics.repeatCustomerRate}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">All Systems Operational</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Payment Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm">Backup in Progress</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
