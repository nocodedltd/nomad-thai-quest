import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ExternalLink,
  Plane,
  Calendar,
  DollarSign,
  GraduationCap,
  Building,
  Heart,
  Crown,
  Star,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Users,
  Shield
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import { cn } from "@/lib/utils";

const visaTypes = [
  {
    id: "tourist",
    title: "Tourist Visa (TR)",
    subtitle: "60 days + 30 day extension",
    description: "Perfect for testing the waters and short-term stays",
    icon: Plane,
    duration: "60+30 days",
    cost: "$40-60",
    difficulty: "Easy",
    processing: "3-5 days",
    renewable: "Yes (border runs)",
    workAllowed: false,
    gradient: "from-blue-500 to-blue-600",
    requirements: [
      "Valid passport (6+ months)",
      "Return flight ticket",
      "Bank statement ($3,000+)",
      "Accommodation booking",
      "Passport photos"
    ],
    access: "free" as const,
    pros: ["Quick processing", "Low cost", "Easy requirements"],
    cons: ["No work allowed", "Requires border runs", "Limited duration"],
    quickRequirements: ["Passport", "Flight ticket", "Bank statement"]
  },
  {
    id: "education",
    title: "Education Visa (ED)",
    subtitle: "1 year renewable",
    description: "Learn Thai language or skills while living in Thailand",
    icon: GraduationCap,
    duration: "1 year",
    cost: "$500-2,000/year",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes (up to 3 years)",
    workAllowed: false,
    gradient: "from-purple-500 to-purple-600",
    requirements: [
      "Acceptance letter from school",
      "Educational background documents",
      "Bank statement ($5,000+)",
      "Health certificate",
      "Police clearance"
    ],
    access: "paid" as const,
    pros: ["Long-term stay", "Legal residence", "Study opportunities"],
    cons: ["Must attend classes", "No work allowed", "School dependency"],
    quickRequirements: ["School acceptance", "Documents", "Bank statement"]
  },
  {
    id: "elite",
    title: "Elite Visa", 
    subtitle: "5-20 years",
    description: "Premium visa program for affluent individuals",
    icon: Crown,
    duration: "5-20 years",
    cost: "$15,000-60,000",
    difficulty: "Easy",
    processing: "30-60 days",
    renewable: "No (but long-term)",
    workAllowed: false,
    gradient: "from-yellow-500 to-yellow-600",
    requirements: [
      "Payment of membership fee",
      "Valid passport",
      "Clean criminal record",
      "Medical certificate",
      "Financial documentation"
    ],
    access: "paid" as const,
    pros: ["Very long-term", "VIP services", "Airport assistance"],
    cons: ["Very expensive", "No work rights", "High financial barrier"],
    quickRequirements: ["Membership fee", "Clean record", "Medical cert"]
  },
  {
    id: "work",
    title: "Work Visa (B)",
    subtitle: "1 year renewable",
    description: "For those employed by Thai companies or remote workers",
    icon: Building,
    duration: "1 year",
    cost: "$200-500",
    difficulty: "Hard",
    processing: "4-8 weeks", 
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-green-500 to-green-600",
    requirements: [
      "Job offer from Thai company",
      "Work permit application",
      "University degree",
      "Experience certificates",
      "Health certificate",
      "Police clearance"
    ],
    access: "paid" as const,
    pros: ["Work legally", "Path to residency", "Stable status"],
    cons: ["Complex process", "Employer dependency", "Strict requirements"],
    quickRequirements: ["Job offer", "Work permit", "Degree", "Experience"]
  },
  {
    id: "retirement",
    title: "Retirement Visa",
    subtitle: "1 year renewable",
    description: "For those 50+ with sufficient funds",
    icon: Heart,
    duration: "1 year",
    cost: "$200",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes",
    workAllowed: false,
    gradient: "from-pink-500 to-pink-600",
    requirements: [
      "Age 50+ years",
      "Bank balance ($25,000+)",
      "Health insurance",
      "Police clearance",
      "Medical certificate"
    ],
    access: "paid" as const,
    pros: ["Long-term stability", "Straightforward renewal", "Retirement focus"],
    cons: ["Age requirement", "High financial requirement", "No work allowed"],
    quickRequirements: ["Age 50+", "Bank balance", "Health insurance"]
  }
];

const documentTemplates = [
  { name: "Visa Application Form", type: "PDF", access: "free" },
  { name: "Bank Statement Template", type: "DOC", access: "paid" },
  { name: "Employment Letter Template", type: "DOC", access: "paid" },
  { name: "Accommodation Booking Guide", type: "PDF", access: "paid" },
  { name: "Health Insurance Comparison", type: "XLS", access: "paid" },
  { name: "Police Clearance Guide", type: "PDF", access: "paid" }
];

const visaTimeline = [
  { step: "Research & Choose", weeks: "Week 1", status: "completed" },
  { step: "Gather Documents", weeks: "Week 2-3", status: "in-progress" },
  { step: "Submit Application", weeks: "Week 4", status: "pending" },
  { step: "Processing Period", weeks: "Week 5-6", status: "pending" },
  { step: "Collect Visa", weeks: "Week 7", status: "pending" },
  { step: "Travel to Thailand", weeks: "Week 8", status: "pending" }
];

function CompactVisaCard({ visa, userType, onVisaSelect }: {
  visa: any;
  userType: 'guest' | 'free' | 'paid';
  onVisaSelect: (visaId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = visa.icon;
  
  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const accessible = hasAccess(visa.access);
  const isLocked = !accessible;

  const handleExpand = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleVisaSelect = () => {
    if (!isLocked) {
      onVisaSelect(visa.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleExpand();
    }
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer",
        "hover:shadow-lg border border-border/50",
        isExpanded ? "min-h-[400px] shadow-xl" : "h-[140px]",
        isLocked && "opacity-75",
        "bg-transparent"
      )}
      onClick={handleExpand}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${visa.title} visa card. ${isExpanded ? 'Press Enter to collapse' : 'Press Enter to expand'}`}
    >
      {/* Main content container */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Collapsed state content */}
        <div className="flex items-center gap-3 min-h-0">
          {/* Visa icon */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
            "shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105",
            visa.gradient
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Visa info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-lg leading-tight min-w-0 flex-shrink">
                {visa.title}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                <Badge variant="outline" className="text-xs">
                  {visa.difficulty}
                </Badge>
                {!accessible && (
                  <Badge variant="secondary" className="text-xs">
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-primary truncate flex-1">
                {visa.duration} • {visa.cost}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="text-xs">
                  {visa.workAllowed ? "Work Allowed" : "No Work"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpand();
                  }}
                  aria-label={isExpanded ? "Collapse visa details" : "Expand visa details"}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded state content */}
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "opacity-100 mt-4 flex-1" : "opacity-0 h-0"
        )}>
          {/* Visa description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {visa.description}
          </p>

          {/* Quick requirements */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Quick Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {visa.quickRequirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* Visa metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{visa.processing}</div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{visa.renewable}</div>
                <div className="text-xs text-muted-foreground">Renewable</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{visa.workAllowed ? "Yes" : "No"}</div>
                <div className="text-xs text-muted-foreground">Work Rights</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{visa.cost}</div>
                <div className="text-xs text-muted-foreground">Total Cost</div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-auto pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVisaSelect();
              }}
              disabled={isLocked}
              className="w-full h-11 text-sm"
              aria-label={`View full details for ${visa.title}`}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View Full Details
            </Button>
          </div>
        </div>
      </div>

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Premium Access Required</p>
            <p className="text-xs text-muted-foreground">Upgrade to unlock this visa guide</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function Visa() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [selectedVisa, setSelectedVisa] = useState("tourist");
  const [currentView, setCurrentView] = useState<'overview' | 'details'>('overview');

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const selectedVisaData = visaTypes.find(v => v.id === selectedVisa);

  const handleVisaSelect = (visaId: string) => {
    setSelectedVisa(visaId);
    setCurrentView('details');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  // Show detailed view if a visa is selected
  if (currentView === 'details' && selectedVisaData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={handleBackToOverview}
            className="mb-6"
          >
            ← Back to Visa Overview
          </Button>

          {/* Detailed visa view - keeping existing detailed layout */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">📋 {selectedVisaData.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {selectedVisaData.description}
            </p>
          </div>

          <UserContent
            guestContent={
              <div>
                {selectedVisaData.access === 'free' ? (
                  <div className="grid gap-6 mb-8">
                    <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                      <h3 className="text-2xl font-bold mb-4">{selectedVisaData.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {selectedVisaData.description}
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">{selectedVisaData.duration}</div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">{selectedVisaData.cost}</div>
                          <div className="text-sm text-muted-foreground">Cost</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">{selectedVisaData.processing}</div>
                          <div className="text-sm text-muted-foreground">Processing</div>
                        </div>
                      </div>
                      <Button className="w-full">Learn Visa Process</Button>
                    </Card>
                  </div>
                ) : (
                  <UpgradePrompt 
                    title="Unlock Complete Visa Guide"
                    description="Get detailed guides for all visa types, document templates, and step-by-step processes"
                    features={[
                      "All 5 visa type guides",
                      "Document templates & checklists", 
                      "Application timelines",
                      "Legal consultation access"
                    ]}
                  />
                )}
              </div>
            }
            
            freeContent={
              <div>
                {selectedVisaData.access === 'free' ? (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2">
                      <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedVisaData.gradient} flex items-center justify-center`}>
                            <selectedVisaData.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{selectedVisaData.title}</h2>
                            <p className="text-muted-foreground">{selectedVisaData.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <div className="font-semibold">{selectedVisaData.duration}</div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                          </div>
                          <div>
                            <div className="font-semibold">{selectedVisaData.cost}</div>
                            <div className="text-sm text-muted-foreground">Cost</div>
                          </div>
                          <div>
                            <div className="font-semibold">{selectedVisaData.processing}</div>
                            <div className="text-sm text-muted-foreground">Processing</div>
                          </div>
                          <div>
                            <div className="font-semibold">{selectedVisaData.difficulty}</div>
                            <div className="text-sm text-muted-foreground">Difficulty</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Requirements:</h4>
                            <div className="space-y-2">
                              {selectedVisaData.requirements.slice(0, 3).map((req, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm">{req}</span>
                                </div>
                              ))}
                              {selectedVisaData.requirements.length > 3 && (
                                <div className="text-sm text-muted-foreground">
                                  + {selectedVisaData.requirements.length - 3} more requirements (Premium)
                                </div>
                              )}
                            </div>
                          </div>

                          <Button className="w-full">
                            Start Visa Application
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </div>

                    <div>
                      <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold mb-4">Pros & Cons</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="font-medium text-green-600 mb-2">Advantages:</div>
                            {selectedVisaData.pros.slice(0, 2).map((pro, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {pro}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-medium text-red-600 mb-2">Considerations:</div>
                            {selectedVisaData.cons.slice(0, 2).map((con, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <AlertCircle className="w-3 h-3 text-red-500" />
                                {con}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <UpgradePrompt 
                    compact
                    title="Unlock Complete Visa Guide"
                    description="Get detailed guides for all visa types, document templates, and step-by-step processes"
                  />
                )}
              </div>
            }
            
            paidContent={
              <div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedVisaData.gradient} flex items-center justify-center`}>
                          <selectedVisaData.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{selectedVisaData.title}</h2>
                          <p className="text-muted-foreground">{selectedVisaData.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <div className="font-semibold">{selectedVisaData.duration}</div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                        </div>
                        <div>
                          <div className="font-semibold">{selectedVisaData.cost}</div>
                          <div className="text-sm text-muted-foreground">Cost</div>
                        </div>
                        <div>
                          <div className="font-semibold">{selectedVisaData.processing}</div>
                          <div className="text-sm text-muted-foreground">Processing</div>
                        </div>
                        <div>
                          <div className="font-semibold">{selectedVisaData.difficulty}</div>
                          <div className="text-sm text-muted-foreground">Difficulty</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Complete Requirements:</h4>
                          <div className="space-y-2">
                            {selectedVisaData.requirements.map((req, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            Start Application Process
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline">
                            Book Consultation
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold mb-4">Pros & Cons</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium text-green-600 mb-2">Advantages:</div>
                          {selectedVisaData.pros.map((pro, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm mb-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {pro}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="font-medium text-red-600 mb-2">Considerations:</div>
                          {selectedVisaData.cons.map((con, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm mb-1">
                              <AlertCircle className="w-3 h-3 text-red-500" />
                              {con}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold mb-4">Document Templates</h4>
                      <div className="space-y-2">
                        {documentTemplates.filter(doc => doc.access === 'free' || userType === 'paid').map((doc, index) => (
                          <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            {doc.name} ({doc.type})
                          </Button>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Application Timeline */}
                <Card className="p-6 mb-8 bg-transparent border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Application Timeline</h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {visaTimeline.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="font-medium text-sm">{step.step}</div>
                        <div className="text-xs text-muted-foreground">{step.weeks}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center bg-transparent border border-gray-200 dark:border-gray-700">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                    <h4 className="font-semibold mb-2">Document Checklist</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a personalized checklist for your chosen visa type
                    </p>
                    <Button variant="outline" className="w-full">Generate Checklist</Button>
                  </Card>

                  <Card className="p-6 text-center bg-transparent border border-gray-200 dark:border-gray-700">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <h4 className="font-semibold mb-2">Legal Consultation</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Book a 1-on-1 session with visa experts
                    </p>
                    <Button variant="outline" className="w-full">Book Session</Button>
                  </Card>

                  <Card className="p-6 text-center bg-transparent border border-gray-200 dark:border-gray-700">
                    <ExternalLink className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h4 className="font-semibold mb-2">Application Portal</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Direct links to official visa application portals
                    </p>
                    <Button variant="outline" className="w-full">Access Portal</Button>
                  </Card>
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">📋 Visa & Legal Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate Thailand's visa system with confidence and stay legally compliant
          </p>
        </div>

        <UserContent
          guestContent={
            <div>
              {/* Visa Overview for Guests */}
              <div className="grid gap-6 mb-8">
                <Card className="p-6 bg-transparent border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">Tourist Visa (Free Guide)</h3>
                  <p className="text-muted-foreground mb-4">
                    Perfect for first-time visitors and short-term stays up to 90 days total.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">60+30</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">$40-60</div>
                      <div className="text-sm text-muted-foreground">Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">3-5</div>
                      <div className="text-sm text-muted-foreground">Days Processing</div>
                    </div>
                  </div>
                  <Button className="w-full">Learn Tourist Visa Process</Button>
                </Card>

                {/* Locked visa types */}
                {visaTypes.slice(1, 3).map((visa) => {
                  const Icon = visa.icon;
                  return (
                    <Card key={visa.id} className="p-6 opacity-50 border-dashed bg-transparent border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${visa.gradient} flex items-center justify-center`}>
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{visa.title}</h3>
                          <p className="text-muted-foreground">{visa.subtitle}</p>
                        </div>
                        <Badge variant="outline">🔒 Premium</Badge>
                      </div>
                      <p className="text-muted-foreground">{visa.description}</p>
                    </Card>
                  );
                })}
              </div>

              <UpgradePrompt 
                title="Unlock Complete Visa Guide"
                description="Get detailed guides for all visa types, document templates, and step-by-step processes"
                features={[
                  "All 5 visa type guides",
                  "Document templates & checklists", 
                  "Application timelines",
                  "Legal consultation access"
                ]}
              />
            </div>
          }
          
          freeContent={
            <div>
              {/* Compact Visa Cards */}
              <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {visaTypes.map((visa) => (
                  <CompactVisaCard
                    key={visa.id}
                    visa={visa}
                    userType={userType}
                    onVisaSelect={handleVisaSelect}
                  />
                ))}
              </div>
              
              <UpgradePrompt 
                compact
                title="Unlock All Visa Types & Tools"
                description="Get complete guides, document templates, and legal support"
              />
            </div>
          }
          
          paidContent={
            <div>
              {/* Compact Visa Cards */}
              <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {visaTypes.map((visa) => (
                  <CompactVisaCard
                    key={visa.id}
                    visa={visa}
                    userType={userType}
                    onVisaSelect={handleVisaSelect}
                  />
                ))}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
