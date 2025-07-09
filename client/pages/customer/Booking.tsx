import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Home,
  DollarSign,
  Info,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function Booking() {
  const { serviceId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState({
    serviceType: "",
    estimatedHours: "2",
    specialRequests: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    paymentMethod: "",
    promoCode: "",
  });

  const provider = {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 234,
    verified: true,
    responseTime: "Within 1 hour",
    location: "Downtown",
  };

  const serviceOptions = [
    {
      id: 1,
      name: "Deep House Cleaning",
      price: 35,
      duration: "2-4 hours",
      description: "Complete deep cleaning service",
    },
    {
      id: 2,
      name: "Regular Maintenance",
      price: 25,
      duration: "1-2 hours",
      description: "Weekly/bi-weekly cleaning",
    },
    {
      id: 3,
      name: "Move-in/Move-out",
      price: 45,
      duration: "3-5 hours",
      description: "Thorough moving cleaning",
    },
  ];

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const selectedService = serviceOptions.find(
    (s) => s.name === bookingData.serviceType,
  );
  const basePrice = selectedService?.price || 0;
  const hours = parseInt(bookingData.estimatedHours);
  const subtotal = basePrice * hours;
  const platformFee = subtotal * 0.08; // 8% commission
  const paymentProcessingFee = subtotal * 0.029 + 0.3; // 2.9% + $0.30
  const total = subtotal + platformFee + paymentProcessingFee;

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 4 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderServiceSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Service Type</h3>
        <div className="space-y-3">
          {serviceOptions.map((service) => (
            <div
              key={service.id}
              onClick={() =>
                setBookingData({ ...bookingData, serviceType: service.name })
              }
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                bookingData.serviceType === service.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />${service.price}
                      /hour
                    </div>
                  </div>
                </div>
                {bookingData.serviceType === service.name && (
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="estimatedHours">Estimated Hours</Label>
        <Select
          value={bookingData.estimatedHours}
          onValueChange={(value) =>
            setBookingData({ ...bookingData, estimatedHours: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 hour</SelectItem>
            <SelectItem value="2">2 hours</SelectItem>
            <SelectItem value="3">3 hours</SelectItem>
            <SelectItem value="4">4 hours</SelectItem>
            <SelectItem value="5">5 hours</SelectItem>
            <SelectItem value="6">6+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any specific areas to focus on or special requirements..."
          value={bookingData.specialRequests}
          onChange={(e) =>
            setBookingData({ ...bookingData, specialRequests: e.target.value })
          }
          rows={3}
        />
      </div>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-base font-medium">Choose Date</Label>
            <div className="mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
          </div>
          <div>
            <Label className="text-base font-medium">Available Times</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    selectedTime === time
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">
              Booking scheduled for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderAddressDetails = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Service Address & Contact</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            placeholder="Enter service address"
            value={bookingData.address}
            onChange={(e) =>
              setBookingData({ ...bookingData, address: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="City"
            value={bookingData.city}
            onChange={(e) =>
              setBookingData({ ...bookingData, city: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            placeholder="ZIP Code"
            value={bookingData.zipCode}
            onChange={(e) =>
              setBookingData({ ...bookingData, zipCode: e.target.value })
            }
            required
          />
        </div>
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={bookingData.phone}
            onChange={(e) =>
              setBookingData({ ...bookingData, phone: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={bookingData.email}
            onChange={(e) =>
              setBookingData({ ...bookingData, email: e.target.value })
            }
            required
          />
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment & Review</h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Payment Method</Label>
            <div className="space-y-3 mt-3">
              {[
                { id: "card", name: "Credit/Debit Card", icon: CreditCard },
                { id: "paypal", name: "PayPal", icon: DollarSign },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() =>
                    setBookingData({ ...bookingData, paymentMethod: method.id })
                  }
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    bookingData.paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <method.icon className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {bookingData.paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          )}

          {bookingData.paymentMethod === "paypal" && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800">
                  You'll be redirected to PayPal to complete payment
                </span>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="promoCode">Promo Code (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="promoCode"
                placeholder="Enter promo code"
                value={bookingData.promoCode}
                onChange={(e) =>
                  setBookingData({ ...bookingData, promoCode: e.target.value })
                }
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Service:</span>
                <span className="font-medium">{bookingData.serviceType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {bookingData.estimatedHours} hours
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {selectedDate?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>Service cost:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform fee (8%):</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment processing:</span>
                <span>${paymentProcessingFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

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
              <Link to={`/provider/${provider.id}`}>
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={provider.image} alt={provider.name} />
                <AvatarFallback>
                  {provider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Booking with {provider.name}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{provider.rating}</span>
                    <span className="ml-1">({provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {provider.location}
                  </div>
                  {provider.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader>
              {renderStepIndicator()}
              <div className="text-center">
                <CardTitle>
                  {currentStep === 1 && "Service Details"}
                  {currentStep === 2 && "Date & Time"}
                  {currentStep === 3 && "Address & Contact"}
                  {currentStep === 4 && "Payment & Review"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderServiceSelection()}
              {currentStep === 2 && renderDateTimeSelection()}
              {currentStep === 3 && renderAddressDetails()}
              {currentStep === 4 && renderPayment()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={
                      (currentStep === 1 && !bookingData.serviceType) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                      (currentStep === 3 &&
                        (!bookingData.address ||
                          !bookingData.city ||
                          !bookingData.phone ||
                          !bookingData.email))
                    }
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!bookingData.paymentMethod}
                  >
                    Confirm Booking (${total.toFixed(2)})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
