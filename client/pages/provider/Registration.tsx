import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  CheckCircle,
  X,
  Plus,
  DollarSign,
} from "lucide-react";

export default function ProviderRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Business Info
    businessName: "",
    businessType: "",
    experience: "",
    description: "",
    serviceCategories: [] as string[],
    serviceAreas: [] as string[],
    hourlyRate: "",
    availability: {
      monday: { available: false, start: "", end: "" },
      tuesday: { available: false, start: "", end: "" },
      wednesday: { available: false, start: "", end: "" },
      thursday: { available: false, start: "", end: "" },
      friday: { available: false, start: "", end: "" },
      saturday: { available: false, start: "", end: "" },
      sunday: { available: false, start: "", end: "" },
    },

    // Documents
    profileImage: null as File | null,
    idDocument: null as File | null,
    businessLicense: null as File | null,
    certificates: [] as File[],

    // Terms
    agreeToTerms: false,
    backgroundCheck: false,
  });

  const serviceCategories = [
    "Home Services",
    "Appliance Repair",
    "Beauty & Wellness",
    "Automotive",
    "Electronics",
    "Professional Services",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Cleaning",
    "Landscaping",
  ];

  const cities = [
    "Downtown",
    "North Side",
    "West End",
    "East Side",
    "Central",
    "Suburbs",
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData({
      ...formData,
      serviceCategories: formData.serviceCategories.includes(category)
        ? formData.serviceCategories.filter((c) => c !== category)
        : [...formData.serviceCategories, category],
    });
  };

  const handleAreaToggle = (area: string) => {
    setFormData({
      ...formData,
      serviceAreas: formData.serviceAreas.includes(area)
        ? formData.serviceAreas.filter((a) => a !== area)
        : [...formData.serviceAreas, area],
    });
  };

  const handleFileUpload = (
    field: string,
    file: File | null,
    isMultiple = false,
  ) => {
    if (isMultiple && file) {
      setFormData({
        ...formData,
        [field]: [
          ...(formData[field as keyof typeof formData] as File[]),
          file,
        ],
      });
    } else {
      setFormData({
        ...formData,
        [field]: file,
      });
    }
  };

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

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Address</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Business Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              placeholder="Leave blank if individual"
            />
          </div>
          <div>
            <Label htmlFor="businessType">Business Type *</Label>
            <Select
              value={formData.businessType}
              onValueChange={(value) =>
                setFormData({ ...formData, businessType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="llc">LLC</SelectItem>
                <SelectItem value="corporation">Corporation</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experience">Years of Experience *</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="hourlyRate">Starting Hourly Rate *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: e.target.value })
                }
                className="pl-10"
                placeholder="25"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="description">Business Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your services and expertise..."
            rows={4}
            required
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Service Categories *</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {serviceCategories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.serviceCategories.includes(category)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                {formData.serviceCategories.includes(category) && (
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Service Areas *</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cities.map((area) => (
            <div
              key={area}
              onClick={() => handleAreaToggle(area)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.serviceAreas.includes(area)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{area}</span>
                {formData.serviceAreas.includes(area) && (
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Document Verification</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Profile Photo *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Upload your profile photo</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileUpload("profileImage", e.target.files?.[0] || null)
              }
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label>Government ID *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Driver's license or passport
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                handleFileUpload("idDocument", e.target.files?.[0] || null)
              }
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label>Business License</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Business license (if applicable)
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                handleFileUpload("businessLicense", e.target.files?.[0] || null)
              }
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label>Certifications</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Professional certifications (optional)
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file) =>
                  handleFileUpload("certificates", file, true),
                );
              }}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium mb-3">Personal Information</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Name:</span> {formData.firstName}{" "}
            {formData.lastName}
          </div>
          <div>
            <span className="text-gray-600">Email:</span> {formData.email}
          </div>
          <div>
            <span className="text-gray-600">Phone:</span> {formData.phone}
          </div>
          <div>
            <span className="text-gray-600">Business Type:</span>{" "}
            {formData.businessType}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium mb-3">Service Information</h4>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600 text-sm">Categories:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.serviceCategories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Service Areas:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.serviceAreas.map((area) => (
                <Badge key={area} variant="outline">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Starting Rate:</span> $
            {formData.hourlyRate}/hour
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            id="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="backgroundCheck"
            type="checkbox"
            checked={formData.backgroundCheck}
            onChange={(e) =>
              setFormData({ ...formData, backgroundCheck: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <Label htmlFor="backgroundCheck" className="text-sm">
            I consent to background check verification
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              TrustConnect
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Service Provider
          </h1>
          <p className="text-gray-600">
            Join our platform and start earning by providing quality services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader>
              {renderStepIndicator()}
              <div className="text-center">
                <CardTitle>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Business Details"}
                  {currentStep === 3 && "Document Upload"}
                  {currentStep === 4 && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of 4 - Complete all steps to join as a
                  provider
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderBusinessInfo()}
              {currentStep === 3 && renderDocuments()}
              {currentStep === 4 && renderReview()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={
                      !formData.agreeToTerms || !formData.backgroundCheck
                    }
                  >
                    Submit Application
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
