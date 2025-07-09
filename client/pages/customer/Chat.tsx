import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Send,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Headphones,
  Bot,
  User,
  Star,
} from "lucide-react";

export default function Chat() {
  const { providerId } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("provider");

  const provider = {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    rating: 4.9,
    verified: true,
    status: "online",
    lastSeen: "2 minutes ago",
    service: "House Cleaning",
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "provider",
      content:
        "Hi! Thanks for your booking request. I'm available for cleaning on January 15th at 10 AM. Would that work for you?",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content:
        "Yes, that works perfectly! I have a 3-bedroom house that needs deep cleaning. Do you bring your own supplies?",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      sender: "provider",
      content:
        "Absolutely! I bring all eco-friendly cleaning supplies. For a 3-bedroom deep clean, I estimate it will take about 4 hours. The total would be $140.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      sender: "user",
      content:
        "That sounds great! Should I prepare anything specific before you arrive?",
      timestamp: "10:37 AM",
      type: "text",
    },
    {
      id: 5,
      sender: "provider",
      content:
        "Just make sure there's access to water and electricity. If you have any specific areas you'd like me to focus on, please let me know!",
      timestamp: "10:40 AM",
      type: "text",
    },
  ]);

  const supportMessages = [
    {
      id: 1,
      sender: "support",
      content:
        "Hi! I'm Alex from TrustConnect support. How can I help you today?",
      timestamp: "2:30 PM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content:
        "I need help with a booking issue. My payment didn't go through.",
      timestamp: "2:32 PM",
      type: "text",
    },
    {
      id: 3,
      sender: "support",
      content:
        "I'd be happy to help you with that payment issue. Can you please share your booking ID?",
      timestamp: "2:33 PM",
      type: "text",
    },
  ];

  const aiMessages = [
    {
      id: 1,
      sender: "ai",
      content:
        "Hello! I'm TrustBot, your AI assistant. I can help you with booking questions, service recommendations, and general support. What would you like to know?",
      timestamp: "Now",
      type: "text",
    },
  ];

  const getCurrentMessages = () => {
    switch (activeChat) {
      case "provider":
        return messages;
      case "support":
        return supportMessages;
      case "ai":
        return aiMessages;
      default:
        return messages;
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };

    if (activeChat === "provider") {
      setMessages([...messages, newMessage]);
    }

    setMessage("");

    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: activeChat,
        content:
          activeChat === "ai"
            ? "I understand you need help. Let me assist you with that. What specific information are you looking for?"
            : "Thanks for your message! I'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };

      if (activeChat === "provider") {
        setMessages((prev) => [...prev, response]);
      }
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

            <div className="flex items-center space-x-4">
              <Link to="/services">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {/* Provider Chat */}
                  <button
                    onClick={() => setActiveChat("provider")}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b ${
                      activeChat === "provider"
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
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
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">
                            {provider.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            10:40 AM
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Just make sure there's access to water...
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 text-xs"
                          >
                            {provider.service}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Support Chat */}
                  <button
                    onClick={() => setActiveChat("support")}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b ${
                      activeChat === "support"
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            Customer Support
                          </h4>
                          <span className="text-xs text-gray-500">2:33 PM</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          I'd be happy to help you with that...
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 text-xs"
                          >
                            Support Team
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* AI Assistant */}
                  <button
                    onClick={() => setActiveChat("ai")}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b ${
                      activeChat === "ai" ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            TrustBot AI
                          </h4>
                          <span className="text-xs text-gray-500">Online</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          How can I help you today?
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-800 text-xs"
                          >
                            AI Assistant
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {activeChat === "provider" && (
                      <>
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
                          <h3 className="font-semibold text-gray-900 flex items-center">
                            {provider.name}
                            {provider.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-600 ml-2" />
                            )}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {provider.status}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {provider.rating}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeChat === "support" && (
                      <>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Headphones className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Customer Support
                          </h3>
                          <p className="text-sm text-gray-600">
                            Typically replies within minutes
                          </p>
                        </div>
                      </>
                    )}

                    {activeChat === "ai" && (
                      <>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Bot className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            TrustBot AI Assistant
                          </h3>
                          <p className="text-sm text-gray-600">
                            Instant AI-powered support
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {activeChat === "provider" && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {getCurrentMessages().map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex space-x-2 max-w-xs lg:max-w-md ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        {msg.sender === "user" ? (
                          <>
                            <AvatarImage src="/placeholder.svg" alt="You" />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </>
                        ) : msg.sender === "support" ? (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Headphones className="w-4 h-4 text-blue-600" />
                          </div>
                        ) : msg.sender === "ai" ? (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-purple-600" />
                          </div>
                        ) : (
                          <>
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
                          </>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white"
                            : msg.sender === "support"
                              ? "bg-blue-100 text-gray-900"
                              : msg.sender === "ai"
                                ? "bg-purple-100 text-gray-900"
                                : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
