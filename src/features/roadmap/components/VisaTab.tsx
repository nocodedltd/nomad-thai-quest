import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  FileText, 
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Plane,
  Calendar,
  GraduationCap,
  Building,
  Heart,
  Crown,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Shield,
  Star
} from "lucide-react";
import { useUser } from "@/shared/contexts/user-context";
import { UserContent } from "@/shared/components/paywall/user-content";
import { Paywall } from "@/shared/components/paywall/paywall";
import { UpgradePrompt } from "@/shared/components/paywall/upgrade-prompt";
import { cn } from "@/shared/lib/utils";
import VisaDetailViewer from "@/features/visa/components/visa-detail-viewer";
import { visaDetails } from "@/features/visa/data/visa-details";

const visaTypes = [
  {
    id: "tourist-visa",
    title: "Tourist Visa / Visa Exemption",
    subtitle: "30-60 days + extensions",
    description: "Perfect for short-term visits and testing the waters in Thailand",
    icon: Plane,
    duration: "30-60 days",
    cost: "$0-60",
    difficulty: "Easy",
    processing: "0-5 days",
    renewable: "Yes (border runs)",
    workAllowed: false,
    gradient: "from-blue-500 to-blue-600",
    requirements: [
      "Valid passport (6+ months)",
      "Return flight ticket",
      "Proof of accommodation",
      "Sufficient funds"
    ],
    access: "free" as const,
    pros: ["No application fee", "Quick entry", "Easy requirements"],
    cons: ["Limited duration", "No work allowed", "Requires border runs"],
    quickRequirements: ["Passport", "Flight ticket", "Accommodation"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: "https://www.immigration.go.th/",
    upgradePrompt: "Upgrade to Premium to stay longer and access advanced visa options"
  },
  {
    id: "muay-thai-education-visa",
    title: "Muay Thai Education Visa",
    subtitle: "1 year renewable",
    description: "Learn Muay Thai while living legally in Thailand with long-term stay",
    icon: GraduationCap,
    duration: "1 year",
    cost: "$500-2,000/year",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes (up to 3 years)",
    workAllowed: false,
    gradient: "from-red-500 to-orange-500",
    requirements: [
      "Acceptance letter from Muay Thai school",
      "Training schedule and curriculum",
      "Bank statement ($5,000+)",
      "Health certificate",
      "Police clearance"
    ],
    access: "paid" as const,
    pros: ["Long-term stay", "Learn Muay Thai", "Cultural immersion"],
    cons: ["Must attend training", "No work allowed", "School dependency"],
    quickRequirements: ["School acceptance", "Training schedule", "Bank statement"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "dtv-visa",
    title: "DTV - Digital Nomad Visa",
    subtitle: "5 years renewable",
    description: "Thailand's official digital nomad visa for remote workers and entrepreneurs",
    icon: Building,
    duration: "5 years",
    cost: "$1,500-3,000",
    difficulty: "Medium",
    processing: "4-8 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-green-500 to-emerald-500",
    requirements: [
      "Proof of remote work or business",
      "Minimum income $80,000/year",
      "Health insurance coverage",
      "Clean criminal record",
      "University degree or work experience"
    ],
    access: "paid" as const,
    pros: ["Long-term stability", "Work legally", "No border runs needed"],
    cons: ["Higher income requirement", "Complex application", "Health insurance needed"],
    quickRequirements: ["Remote work proof", "Income proof", "Health insurance"],
    courseType: "video-quiz-nextsteps",
    partner: "https://www.issacompass.com/",
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "smart-business-visa",
    title: "SMART Business Visa",
    subtitle: "4 years renewable",
    description: "Thailand's Smart Visa program for high-tech and innovative businesses",
    icon: Building,
    duration: "4 years",
    cost: "$2,000-5,000",
    difficulty: "Hard",
    processing: "6-12 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-purple-500 to-pink-500",
    requirements: [
      "Business plan approval",
      "Investment minimum $50,000",
      "Technology focus area",
      "Job creation for Thais",
      "Expertise in target field"
    ],
    access: "paid" as const,
    pros: ["Long-term business visa", "Work permit included", "Fast-track processing"],
    cons: ["High investment requirement", "Complex approval process", "Business focus required"],
    quickRequirements: ["Business plan", "Investment proof", "Expertise proof"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
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
    quickRequirements: ["Job offer", "Work permit", "Degree", "Experience"],
    courseType: "video-quiz-nextsteps",
    partner: "https://atathailand.com/",
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "elite-visa",
    title: "Thailand Privilege Visa (Elite)",
    subtitle: "5-20 years",
    description: "Premium visa program for affluent individuals with VIP services and long-term stay",
    icon: Crown,
    duration: "5-20 years",
    cost: "$15,000-60,000",
    difficulty: "Easy",
    processing: "30-60 days",
    renewable: "No (but long-term)",
    workAllowed: false,
    gradient: "from-yellow-500 to-amber-500",
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
    quickRequirements: ["Membership fee", "Clean record", "Medical cert"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "retirement-visa",
    title: "Retirement Visa (Non-Immigrant O)",
    subtitle: "1 year renewable",
    description: "For those 50+ with sufficient funds to retire in Thailand",
    icon: Heart,
    duration: "1 year",
    cost: "$200",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes",
    workAllowed: false,
    gradient: "from-pink-500 to-rose-500",
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
    quickRequirements: ["Age 50+", "Bank balance", "Health insurance"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "ltr-visa",
    title: "Long-Term Resident (LTR) Visa",
    subtitle: "10 years renewable",
    description: "Thailand's newest long-term visa for wealthy individuals and professionals",
    icon: Star,
    duration: "10 years",
    cost: "$5,000-10,000",
    difficulty: "Medium",
    processing: "8-12 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-emerald-500 to-teal-500",
    requirements: [
      "High net worth ($1M+) or high income ($80K+/year)",
      "Investment in Thailand",
      "Health insurance",
      "Clean criminal record",
      "Professional expertise"
    ],
    access: "paid" as const,
    pros: ["Very long-term", "Work rights", "Investment opportunities"],
    cons: ["High financial requirements", "Investment commitment", "Complex application"],
    quickRequirements: ["Wealth proof", "Investment plan", "Health insurance"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
  },
  {
    id: "marriage-visa",
    title: "Marriage Visa (Non-Immigrant O)",
    subtitle: "1 year renewable",
    description: "For those married to Thai nationals with long-term stay rights",
    icon: Heart,
    duration: "1 year",
    cost: "$200",
    difficulty: "Medium",
    processing: "2-4 weeks",
    renewable: "Yes",
    workAllowed: true,
    gradient: "from-rose-500 to-pink-500",
    requirements: [
      "Marriage certificate",
      "Thai spouse's ID and house registration",
      "Proof of relationship",
      "Financial support evidence",
      "Health certificate",
      "Police clearance"
    ],
    access: "paid" as const,
    pros: ["Long-term stability", "Work rights", "Family unity"],
    cons: ["Marriage requirement", "Spouse dependency", "Regular renewal needed"],
    quickRequirements: ["Marriage cert", "Spouse documents", "Financial proof"],
    courseType: "video-quiz-nextsteps",
    partner: null,
    govWebsite: null,
    upgradePrompt: null
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
              <Calendar className="w-4 h-4 text-muted-foreground" />
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
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{visa.cost}</div>
                <div className="text-xs text-muted-foreground">Total Cost</div>
              </div>
            </div>
          </div>

          {/* Course type indicator */}
          <div className="mb-4">
            <Badge variant="outline" className="text-xs">
              📹 {visa.courseType === "video-quiz-nextsteps" ? "Video Course + Quiz + Next Steps" : "Full Course"}
            </Badge>
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

export default function VisaTab({ compact = false }: { compact?: boolean }) {
  const { userType } = useUser();
  const [selectedVisa, setSelectedVisa] = useState<string | null>(null);
  const [selectedDurationTab, setSelectedDurationTab] = useState<'0-1' | '1-3' | '3+'>('0-1');

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const selectedVisaData = visaTypes.find(v => v.id === selectedVisa);
  const selectedVisaDetail = visaDetails.find(v => v.id === selectedVisa);

  const handleVisaSelect = (visaId: string) => {
    setSelectedVisa(visaId);
  };

  const handleBackToVisaList = () => {
    setSelectedVisa(null);
  };

  // Categorize visas by duration
  const visaCategories = {
    '0-1': visaTypes.filter(visa => {
      const duration = visa.duration.toLowerCase();
      return duration.includes('days') || duration.includes('month') || 
             (duration.includes('1 year') && !duration.includes('renewable'));
    }),
    '1-3': visaTypes.filter(visa => {
      const duration = visa.duration.toLowerCase();
      return duration.includes('1 year renewable') || duration.includes('2') || duration.includes('3');
    }),
    '3+': visaTypes.filter(visa => {
      const duration = visa.duration.toLowerCase();
      return duration.includes('4') || duration.includes('5') || duration.includes('10') || 
             duration.includes('20') || duration.includes('long-term');
    })
  };

  const getDurationLabel = (tab: string) => {
    switch (tab) {
      case '0-1': return '0-1 Years';
      case '1-3': return '1-3 Years';
      case '3+': return '3+ Years';
      default: return tab;
    }
  };

  const getDurationDescription = (tab: string) => {
    switch (tab) {
      case '0-1': return 'Short-term stays and entry-level visas';
      case '1-3': return 'Medium-term visas for education and business';
      case '3+': return 'Long-term and premium visa options';
      default: return '';
    }
  };

  // If a visa is selected, show the detail viewer
  if (selectedVisa && selectedVisaDetail) {
    return (
      <VisaDetailViewer 
        visa={selectedVisaDetail} 
        onBack={handleBackToVisaList}
      />
    );
  }

  return (
    <div>
      {!compact && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">📋 Visa & Legal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate Thailand's visa system with confidence and stay legally compliant
          </p>
        </div>
      )}


      {/* Duration-based Sub Navigation */}
      <div className="flex justify-center mb-6">
        <div className="subsection-nav-frosted">
          {(['0-1', '1-3', '3+'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedDurationTab(tab)}
              className={`subsection-button-frosted capitalize ${selectedDurationTab === tab ? 'selected' : ''}`}
            >
              {getDurationLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Description */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          {getDurationDescription(selectedDurationTab)}
        </p>
      </div>

      <UserContent
        guestContent={
          <div>
            {/* Compact Visa Cards for Selected Duration */}
            <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
              {visaCategories[selectedDurationTab].map((visa) => (
                <CompactVisaCard
                  key={visa.id}
                  visa={visa}
                  userType={userType}
                  onVisaSelect={handleVisaSelect}
                />
              ))}
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
            {/* Compact Visa Cards for Selected Duration */}
            <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
              {visaCategories[selectedDurationTab].map((visa) => (
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
            {/* Compact Visa Cards for Selected Duration */}
            <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
              {visaCategories[selectedDurationTab].map((visa) => (
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
  );
}
