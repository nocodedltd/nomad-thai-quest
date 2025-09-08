import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  Upload, 
  Calendar,
  Users,
  Globe,
  Award,
  Clock,
  AlertCircle,
  Send,
  Building
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  englishLevel: string;
  country: string;
  universityDegree: File | null;
  teflCompleted: boolean;
  currentlyInThailand: boolean;
  startDate: string;
  additionalInfo: string;
}

const englishLevels = [
  { value: "native", label: "Native Speaker" },
  { value: "near-native", label: "Near-Native (C2)" },
  { value: "advanced", label: "Advanced (C1)" },
  { value: "upper-intermediate", label: "Upper-Intermediate (B2)" },
  { value: "intermediate", label: "Intermediate (B1)" }
];

const startDateOptions = [
  { value: "asap", label: "ASAP (Immediately)" },
  { value: "next-month", label: "Next Month" },
  { value: "2-months", label: "2 Months" },
  { value: "3-months", label: "3 Months" },
  { value: "6-months", label: "6 Months" },
  { value: "flexible", label: "Flexible" }
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "South Africa",
  "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden", "Norway", "Denmark", "Finland",
  "Japan", "South Korea", "Singapore", "Hong Kong", "Taiwan", "Philippines", "Malaysia", "Indonesia",
  "Brazil", "Argentina", "Mexico", "Chile", "Colombia", "Peru", "Other"
];

export default function EnglishTeachingBoard() {
  const { userType } = useUser();
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    phone: "",
    englishLevel: "",
    country: "",
    universityDegree: null,
    teflCompleted: false,
    currentlyInThailand: false,
    startDate: "",
    additionalInfo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ApplicationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (file.type !== "application/pdf" && file.type !== "image/jpeg" && file.type !== "image/png") {
        setErrors(prev => ({ ...prev, universityDegree: "Please upload a PDF, JPEG, or PNG file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, universityDegree: "File size must be less than 5MB" }));
        return;
      }
      setFormData(prev => ({ ...prev, universityDegree: file }));
      setErrors(prev => ({ ...prev, universityDegree: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.englishLevel) newErrors.englishLevel = "English level is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.universityDegree) newErrors.universityDegree = "University degree attachment is required";
    if (!formData.startDate) newErrors.startDate = "Start date preference is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const PartnershipIntro = () => (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-100">
              Partnered with Leading English Teaching Agencies
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              We've partnered with trusted English teaching agencies across Thailand to connect qualified teachers with amazing opportunities. 
              Submit your application below and we'll match you with suitable positions based on your qualifications and preferences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Verified Agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Direct Placement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Ongoing Support</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ApplicationForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          English Teaching Application Form
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete this form to be matched with English teaching opportunities in Thailand
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country of Origin *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              Qualifications
            </h3>

            <div className="space-y-2">
              <Label htmlFor="englishLevel">English Proficiency Level *</Label>
              <Select value={formData.englishLevel} onValueChange={(value) => handleInputChange("englishLevel", value)}>
                <SelectTrigger className={errors.englishLevel ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your English level" />
                </SelectTrigger>
                <SelectContent>
                  {englishLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.englishLevel && <p className="text-sm text-red-500">{errors.englishLevel}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="universityDegree">University Degree Certificate *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="universityDegree"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                {formData.universityDegree && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {formData.universityDegree.name}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Upload your university degree certificate (PDF, JPG, or PNG, max 5MB)
              </p>
              {errors.universityDegree && <p className="text-sm text-red-500">{errors.universityDegree}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="teflCompleted"
                  checked={formData.teflCompleted}
                  onCheckedChange={(checked) => handleInputChange("teflCompleted", checked)}
                />
                <Label htmlFor="teflCompleted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I have completed a TEFL/TESOL/CELTA course
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="currentlyInThailand"
                  checked={formData.currentlyInThailand}
                  onCheckedChange={(checked) => handleInputChange("currentlyInThailand", checked)}
                />
                <Label htmlFor="currentlyInThailand" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I am currently in Thailand
                </Label>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Availability
            </h3>

            <div className="space-y-2">
              <Label htmlFor="startDate">When would you like to start working in Thailand? *</Label>
              <Select value={formData.startDate} onValueChange={(value) => handleInputChange("startDate", value)}>
                <SelectTrigger className={errors.startDate ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your preferred start date" />
                </SelectTrigger>
                <SelectContent>
                  {startDateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Tell us about your teaching experience, preferences, or any other relevant information..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const SuccessMessage = () => (
    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-green-900 dark:text-green-100">
          Application Submitted Successfully!
        </h3>
        <p className="text-green-800 dark:text-green-200 mb-4">
          Thank you for your interest in teaching English in Thailand. Our partner agencies will review your application and contact you within 3-5 business days with suitable opportunities.
        </p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold mb-2">What happens next?</h4>
          <ul className="text-sm text-left space-y-1">
            <li>• Our team will review your qualifications</li>
            <li>• Partner agencies will match you with suitable positions</li>
            <li>• You'll receive job opportunities via email</li>
            <li>• Direct interviews with schools will be arranged</li>
          </ul>
        </div>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              englishLevel: "",
              country: "",
              universityDegree: null,
              teflCompleted: false,
              currentlyInThailand: false,
              startDate: "",
              additionalInfo: ""
            });
          }}
          variant="outline"
          className="mt-4"
        >
          Submit Another Application
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            🇹🇭 English Teaching Jobs in Thailand
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified English teaching agencies and find your dream job in Thailand
          </p>
        </div>

        <UserContent
          guestContent={
            <div>
              <PartnershipIntro />
              <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-3">Access English Teaching Opportunities</h2>
                  <p className="text-muted-foreground mb-6">
                    Create a free account to submit your application and get matched with teaching positions across Thailand
                  </p>
                  <UpgradePrompt 
                    title="Start Your Teaching Journey"
                    description="Join our network of English teachers and access exclusive job opportunities"
                  />
                </div>
              </div>
            </div>
          }
          
          freeContent={
            <div>
              <PartnershipIntro />
              {isSubmitted ? <SuccessMessage /> : <ApplicationForm />}
            </div>
          }
          
          paidContent={
            <div>
              <PartnershipIntro />
              {isSubmitted ? <SuccessMessage /> : <ApplicationForm />}
            </div>
          }
        />
      </div>
    </div>
  );
}
