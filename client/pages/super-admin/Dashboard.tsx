import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  AlertTriangle,
  Activity,
  Database,
  Settings,
  Lock,
  Monitor,
  FileText,
  Download,
  Upload,
  Globe,
  Server,
  Zap,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const systemStats = {
    totalUsers: 125430,
    totalProviders: 8920,
    totalRevenue: 2450750,
    systemUptime: "99.9%",
    activeConnections: 1247,
    databaseSize: "2.4 GB",
    serverLoad: "42%",
    memoryUsage: "68%",
  };

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High Memory Usage",
      description: "Server memory usage is above 65%",
      timestamp: "5 minutes ago",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      title: "Scheduled Maintenance",
      description: "Database backup completed successfully",
      timestamp: "1 hour ago",
      severity: "low",
    },
    {
      id: 3,
      type: "error",
      title: "Payment Gateway Issue",
      description: "PayPal integration reporting intermittent failures",
      timestamp: "2 hours ago",
      severity: "high",
    },
  ];

  const adminUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@trustconnect.com",
      role: "admin",
      lastActive: "2 minutes ago",
      permissions: ["user_management", "provider_management"],
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@trustconnect.com",
      role: "manager",
      lastActive: "15 minutes ago",
      permissions: ["analytics", "content_management"],
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@trustconnect.com",
      role: "support",
      lastActive: "1 hour ago",
      permissions: ["customer_support", "dispute_resolution"],
    },
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      level: "INFO",
      service: "Auth Service",
      message: "User authentication successful",
      userId: "user_123",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:29:18",
      level: "ERROR",
      service: "Payment Service",
      message: "Payment processing failed",
      userId: "user_456",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:28:45",
      level: "WARN",
      service: "Database",
      message: "Slow query detected",
      userId: null,
    },
  ];

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "WARN":
        return "bg-yellow-100 text-yellow-800";
      case "INFO":
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TrustConnect Super Admin
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/super-admin/dashboard"
                className="text-purple-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/super-admin/users"
                className="text-gray-600 hover:text-gray-900"
              >
                User Management
              </Link>
              <Link
                to="/super-admin/system"
                className="text-gray-600 hover:text-gray-900"
              >
                System
              </Link>
              <Link
                to="/super-admin/security"
                className="text-gray-600 hover:text-gray-900"
              >
                Security
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt="Super Admin" />
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
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600">
            System overview and administrative controls
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemStats.totalUsers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    System Uptime
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemStats.systemUptime}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Server Load
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemStats.serverLoad}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Server className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${systemStats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="alerts" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="alerts">System Alerts</TabsTrigger>
                <TabsTrigger value="logs">System Logs</TabsTrigger>
                <TabsTrigger value="admins">Admin Users</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {alert.title}
                              </h4>
                              <Badge className={getAlertColor(alert.severity)}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {alert.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {alert.timestamp}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Resolve
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      System Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {systemLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-3 border rounded-lg text-sm"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge className={getLogLevelColor(log.level)}>
                              {log.level}
                            </Badge>
                            <span className="text-gray-500">
                              {log.timestamp}
                            </span>
                            <span className="font-medium">{log.service}</span>
                          </div>
                          <div className="flex-1 mx-4">
                            <p className="text-gray-900">{log.message}</p>
                            {log.userId && (
                              <p className="text-xs text-gray-500">
                                User: {log.userId}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admins">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Admin Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminUsers.map((admin) => (
                        <div
                          key={admin.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {admin.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {admin.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {admin.email}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  {admin.role}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  Active {admin.lastActive}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Suspend
                            </Button>
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
                  <Database className="w-4 h-4 mr-2" />
                  Database Backup
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Monitor className="w-4 h-4 mr-2" />
                  System Monitor
                </Button>
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="font-medium">{systemStats.serverLoad}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "42%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="font-medium">{systemStats.memoryUsage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database Size</span>
                  <span className="font-medium">
                    {systemStats.databaseSize}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Active Connections
                  </span>
                  <span className="font-medium">
                    {systemStats.activeConnections}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">SSL Certificate Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Firewall Active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Backups Current</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">2FA Required</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
