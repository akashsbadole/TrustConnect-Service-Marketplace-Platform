import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Search,
  Filter,
  Send,
  Headphones,
  Star,
  Calendar,
  FileText,
} from "lucide-react";

export default function SupportDashboard() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    openTickets: 47,
    todayTickets: 23,
    avgResponseTime: "12 mins",
    satisfaction: 4.6,
    resolvedToday: 31,
    myTickets: 12,
  };

  const supportTickets = [
    {
      id: "TICK-001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        image: "/placeholder.svg",
      },
      subject: "Payment Issue - Booking #BK123",
      priority: "high",
      status: "open",
      category: "payment",
      createdAt: "2024-01-15 14:30",
      lastUpdate: "5 minutes ago",
      assignedTo: "me",
      description:
        "Customer reports payment was charged but booking not confirmed",
    },
    {
      id: "TICK-002",
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        image: "/placeholder.svg",
      },
      subject: "Provider No-Show",
      priority: "medium",
      status: "in-progress",
      category: "service",
      createdAt: "2024-01-15 13:15",
      lastUpdate: "1 hour ago",
      assignedTo: "Alex Smith",
      description: "Provider didn't show up for scheduled cleaning service",
    },
    {
      id: "TICK-003",
      customer: {
        name: "Mike Johnson",
        email: "mike@example.com",
        image: "/placeholder.svg",
      },
      subject: "Account Access Problem",
      priority: "low",
      status: "waiting",
      category: "account",
      createdAt: "2024-01-15 12:00",
      lastUpdate: "2 hours ago",
      assignedTo: "unassigned",
      description: "User unable to reset password",
    },
  ];

  const liveChats = [
    {
      id: 1,
      customer: "Emily Davis",
      message: "Hi, I need help with my booking",
      timestamp: "2 minutes ago",
      status: "active",
      waitTime: "0m",
    },
    {
      id: 2,
      customer: "Robert Chen",
      message: "Payment not going through",
      timestamp: "5 minutes ago",
      status: "waiting",
      waitTime: "5m",
    },
    {
      id: 3,
      customer: "Lisa Garcia",
      message: "Thank you for your help!",
      timestamp: "8 minutes ago",
      status: "closed",
      waitTime: "0m",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "ticket_resolved",
      description: "Resolved payment issue for customer #12345",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      type: "chat_started",
      description: "Started chat with Emily Davis",
      timestamp: "15 minutes ago",
    },
    {
      id: 3,
      type: "ticket_assigned",
      description: "Assigned TICK-004 to Alex Smith",
      timestamp: "30 minutes ago",
    },
  ];

  const getTicketPriorityColor = (priority: string) => {
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

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "waiting":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChatStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TrustConnect Support
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/support/dashboard"
                className="text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/support/tickets"
                className="text-gray-600 hover:text-gray-900"
              >
                Tickets
              </Link>
              <Link
                to="/support/chat"
                className="text-gray-600 hover:text-gray-900"
              >
                Live Chat
              </Link>
              <Link
                to="/support/knowledge"
                className="text-gray-600 hover:text-gray-900"
              >
                Knowledge Base
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-5 h-5" />
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  3
                </span>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt="Support Agent" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Support Dashboard
          </h1>
          <p className="text-gray-600">
            Manage customer support tickets and live chat sessions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Open Tickets
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.openTickets}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600">+5</span>
                <span className="text-gray-500 ml-1">since yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    My Tickets
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.myTickets}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-blue-600">2 urgent</span>
                <span className="text-gray-500 ml-1">need attention</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Response Time
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.avgResponseTime}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600">-2 mins</span>
                <span className="text-gray-500 ml-1">vs yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="tickets" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Support Tickets</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={ticket.customer.image}
                                  alt={ticket.customer.name}
                                />
                                <AvatarFallback>
                                  {ticket.customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {ticket.subject}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {ticket.customer.name} •{" "}
                                  {ticket.customer.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getTicketPriorityColor(
                                  ticket.priority,
                                )}
                              >
                                {ticket.priority}
                              </Badge>
                              <Badge
                                className={getTicketStatusColor(ticket.status)}
                              >
                                {ticket.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {ticket.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>#{ticket.id}</span>
                            <span>Created: {ticket.createdAt}</span>
                            <span>Updated: {ticket.lastUpdate}</span>
                            <span>
                              Assigned to:{" "}
                              {ticket.assignedTo === "me"
                                ? "You"
                                : ticket.assignedTo}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Live Chat Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {liveChats.map((chat) => (
                        <div
                          key={chat.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                {chat.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {chat.customer}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {chat.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {chat.timestamp}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getChatStatusColor(chat.status)}>
                              {chat.status}
                            </Badge>
                            {chat.waitTime !== "0m" && (
                              <p className="text-xs text-red-600 mt-1">
                                Waiting: {chat.waitTime}
                              </p>
                            )}
                            <Button
                              size="sm"
                              className="mt-2 bg-blue-600 hover:bg-blue-700"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Join Chat
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-900">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp}
                            </p>
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
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Make Call
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle>My Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Tickets Resolved Today
                  </span>
                  <span className="font-medium">{stats.resolvedToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Customer Satisfaction
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{stats.satisfaction}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Avg Response Time
                  </span>
                  <span className="font-medium text-green-600">
                    {stats.avgResponseTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tickets Today</span>
                  <span className="font-medium">{stats.todayTickets}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  How to escalate tickets
                </button>
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  Payment issue resolution
                </button>
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  Provider dispute handling
                </button>
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  Account access problems
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
