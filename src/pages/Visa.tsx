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
import VisaDetailViewer from "@/components/visa/visa-detail-viewer";
import { visaDetails } from "@/data/visas/visa-details";

const visaTypes = [
  {
    id: "tourist-visa",
    title: "Tourist Visa / Visa Exemption",
    subtitle: "30-60 days",
    description: "Perfect for testing the waters and short-term stays",
    icon: Plane,
    duration: "30-60 days",
    cost: "Free - $40",
    difficulty: "Easy",
    processing: "Immediate",
    renewable: "Yes (border runs)",
    workAllowed: false,
    gradient: "from-blue-500 to-blue-600",
    requirements: [
      "Valid passport (6+ months)",
      "Return flight ticket",
      "Proof of accommodation",
      "Sufficient funds (20,000 THB)",
      "Return ticket or onward ticket"
    ],
    access: "free" as const,
    pros: ["No visa fee for visa exemption", "Quick entry process", "Can be extended once for 30 days"],
    cons: ["Cannot work on tourist visa", "Limited to 30-60 days stay", "Must show proof of onward travel"],
    quickRequirements: ["Passport", "Flight ticket", "Accommodation"]
  },
  {
    id: "muay-thai-education-visa",
    title: "Muay Thai Education Visa",
    subtitle: "1 year renewable",
    description: "Learn Muay Thai while living legally in Thailand with long-term stay",
    icon: GraduationCap,
    duration: "1 year",
    cost: "$200-400",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes (up to 3 years)",
    workAllowed: false,
    gradient: "from-red-500 to-orange-500",
    requirements: [
      "Enrollment in approved Muay Thai school",
      "Valid passport (6+ months remaining)",
      "Medical certificate",
      "Criminal background check",
      "Proof of financial means"
    ],
    access: "paid" as const,
    pros: ["Stay up to 1 year", "Learn authentic Muay Thai", "Immerse in Thai culture"],
    cons: ["Must attend classes regularly", "Cannot work on this visa", "Must report to immigration every 90 days"],
    quickRequirements: ["School acceptance", "Training schedule", "Bank statement"]
  },
  {
    id: "dtv-visa",
    title: "Digital Nomad Visa (DTV)",
    subtitle: "5 years renewable",
    description: "Thailand's new Digital Nomad Visa allows remote workers to stay long-term",
    icon: Building,
    duration: "5 years",
    cost: "$500-1,000",
    difficulty: "Hard",
    processing: "4-8 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-green-500 to-emerald-500",
    requirements: [
      "Remote work income of $80,000+ annually",
      "Valid passport (6+ months remaining)",
      "Health insurance coverage",
      "Criminal background check",
      "Proof of remote work"
    ],
    access: "paid" as const,
    pros: ["Stay up to 5 years", "Work remotely legally", "Access to Thai healthcare"],
    cons: ["Higher income requirement", "Complex application", "Health insurance needed"],
    quickRequirements: ["Remote work proof", "Income proof", "Health insurance"]
  },
  {
    id: "smart-business-visa",
    title: "SMART Business Visa",
    subtitle: "4 years renewable",
    description: "Thailand's Smart Visa program for high-tech and innovative businesses",
    icon: Building,
    duration: "4 years",
    cost: "$1,000-2,000",
    difficulty: "Hard",
    processing: "6-12 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-purple-500 to-pink-500",
    requirements: [
      "Business investment of $200,000+",
      "Valid passport (6+ months remaining)",
      "Business plan or investment proof",
      "Health insurance",
      "Criminal background check"
    ],
    access: "paid" as const,
    pros: ["Stay up to 4 years", "Work in your business", "Bring family members"],
    cons: ["High investment requirement", "Complex approval process", "Business focus required"],
    quickRequirements: ["Business plan", "Investment proof", "Expertise proof"]
  },
  {
    id: "non-b-business-visa",
    title: "Non-B Business Visa",
    subtitle: "1 year renewable",
    description: "Traditional business visa for working in Thailand with local companies",
    icon: Building,
    duration: "1 year",
    cost: "$200-500",
    difficulty: "Hard",
    processing: "4-8 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-indigo-500 to-blue-500",
    requirements: [
      "Job offer from Thai company OR business activities",
      "Valid passport (6+ months remaining)",
      "Work permit application",
      "Company documents",
      "Medical certificate"
    ],
    access: "paid" as const,
    pros: ["Work legally in Thailand", "Stay up to 1 year", "Can be renewed annually"],
    cons: ["Complex process", "Employer dependency", "Strict requirements"],
    quickRequirements: ["Job offer", "Work permit", "Degree", "Experience"]
  },
  {
    id: "elite-visa",
    title: "Thailand Elite Visa",
    subtitle: "5-20 years",
    description: "Premium visa program offering long-term stay with exclusive benefits",
    icon: Crown,
    duration: "5-20 years",
    cost: "$15,000-60,000",
    difficulty: "Easy",
    processing: "30-60 days",
    renewable: "No (but long-term)",
    workAllowed: false,
    gradient: "from-yellow-500 to-amber-500",
    requirements: [
      "Valid passport (6+ months remaining)",
      "Proof of financial means",
      "Clean criminal record",
      "Health insurance (some tiers)",
      "Application fee payment"
    ],
    access: "paid" as const,
    pros: ["Stay 5-20 years", "VIP airport services", "Exclusive member events"],
    cons: ["High cost investment", "Cannot work (some exceptions)", "Must maintain membership"],
    quickRequirements: ["Membership fee", "Clean record", "Medical cert"]
  },
  {
    id: "retirement-visa",
    title: "Retirement Visa (Non-Immigrant O)",
    subtitle: "1 year renewable",
    description: "For retirees aged 50+ who want to live in Thailand long-term",
    icon: Heart,
    duration: "1 year",
    cost: "$200-500",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes",
    workAllowed: false,
    gradient: "from-pink-500 to-rose-500",
    requirements: [
      "Age 50 or older",
      "Valid passport (6+ months remaining)",
      "Retirement income OR bank deposit",
      "Medical certificate",
      "Criminal background check"
    ],
    access: "paid" as const,
    pros: ["Stay up to 1 year", "Can be renewed annually", "No work permit needed"],
    cons: ["Cannot work in Thailand", "Must maintain financial requirements", "Annual renewal required"],
    quickRequirements: ["Age 50+", "Bank balance", "Health insurance"]
  },
  {
    id: "ltr-visa",
    title: "Long-Term Resident (LTR) Visa",
    subtitle: "10 years renewable",
    description: "New long-term visa program for high-income individuals, retirees, and professionals",
    icon: Star,
    duration: "10 years",
    cost: "$1,000-2,000",
    difficulty: "Hard",
    processing: "8-12 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-emerald-500 to-teal-500",
    requirements: [
      "High income OR significant assets",
      "Valid passport (6+ months remaining)",
      "Health insurance",
      "Criminal background check",
      "Financial statements"
    ],
    access: "paid" as const,
    pros: ["Stay up to 10 years", "Work permit included", "Tax benefits"],
    cons: ["High income/asset requirements", "Must maintain category requirements", "Limited to specific activities"],
    quickRequirements: ["Wealth proof", "Investment plan", "Health insurance"]
  },
  {
    id: "marriage-visa",
    title: "Marriage Visa (Non-Immigrant O)",
    subtitle: "1 year renewable",
    description: "For those married to Thai citizens with long-term stay rights",
    icon: Heart,
    duration: "1 year",
    cost: "$200-500",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-rose-500 to-pink-500",
    requirements: [
      "Marriage to Thai citizen",
      "Valid passport (6+ months remaining)",
      "Marriage certificate",
      "Thai spouse's documents",
      "Financial proof"
    ],
    access: "paid" as const,
    pros: ["Stay up to 1 year", "Can work with work permit", "Can be renewed annually"],
    cons: ["Must maintain marriage", "Annual renewal required", "Must report to immigration every 90 days"],
    quickRequirements: ["Marriage cert", "Spouse documents", "Financial proof"]
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
  const [selectedVisa, setSelectedVisa] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'details'>('overview');

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const selectedVisaData = visaTypes.find(v => v.id === selectedVisa);
  const selectedVisaDetail = visaDetails.find(v => v.id === selectedVisa);

  const handleVisaSelect = (visaId: string) => {
    setSelectedVisa(visaId);
    setCurrentView('details');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedVisa(null);
  };

  // Show detailed view if a visa is selected
  if (currentView === 'details' && selectedVisaDetail) {
    return (
      <VisaDetailViewer 
        visa={selectedVisaDetail} 
        onBack={handleBackToOverview}
      />
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
                  <h3 className="text-2xl font-bold mb-4">Tourist Visa / Visa Exemption (Free Guide)</h3>
                  <p className="text-muted-foreground mb-4">
                    Perfect for first-time visitors and short-term stays up to 60 days total.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">30-60</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">Free - $40</div>
                      <div className="text-sm text-muted-foreground">Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">Immediate</div>
                      <div className="text-sm text-muted-foreground">Processing</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleVisaSelect("tourist-visa")}
                  >
                    Learn Tourist Visa Process
                  </Button>
                </Card>

                {/* Locked visa types */}
                {visaTypes.slice(1, 4).map((visa) => {
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
                  "All 9 visa type guides",
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
                title="Unlock All 9 Visa Types & Tools"
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
