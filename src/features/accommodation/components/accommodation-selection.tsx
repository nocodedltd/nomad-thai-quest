import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Globe,
  Home,
  Clock,
  DollarSign,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import AccommodationDetailViewer from "./accommodation-detail-viewer";

const accommodationTypes = [
  {
    id: "facebook-marketplace",
    title: "Facebook Marketplace + Groups",
    termType: "Long Term",
    description: "Direct contact with Thai landlords and agents for authentic local prices",
    idealFor: "Ideal for long-term stays and budget-conscious nomads",
    icon: Facebook,
    gradient: "from-blue-500 to-blue-600",
    quickRequirements: ["Active Facebook profile", "Basic communication", "Patience for searching"],
    timeToSource: "1-2 weeks",
    savings: "High",
    mainPositive: "Cheapest prices",
    mainDrawback: "Time intensive",
    resourcesIncluded: "Full guide + Direct groups",
    access: "free" as const
  },
  {
    id: "real-estate-websites",
    title: "Real Estate Websites + Agents",
    termType: "Long Term",
    description: "Professional platforms with English-speaking agents and polished listings",
    idealFor: "Ideal for professionals wanting full-service support",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
    quickRequirements: ["Higher budget", "Professional approach", "Service fees"],
    timeToSource: "3-5 days",
    savings: "Medium",
    mainPositive: "Professional service",
    mainDrawback: "Higher prices",
    resourcesIncluded: "Full guide + Agent contacts",
    access: "paid" as const
  },
  {
    id: "airbnb-short-term",
    title: "Airbnb Short-term",
    termType: "Short Term",
    description: "Quick accommodation for initial stays while searching for long-term options",
    idealFor: "Ideal for quick holiday stays and initial accommodation",
    icon: Home,
    gradient: "from-pink-500 to-rose-500",
    quickRequirements: ["Payment method", "Flexible dates", "Tourist areas"],
    timeToSource: "Same day",
    savings: "Low",
    mainPositive: "Instant booking",
    mainDrawback: "Tourist pricing",
    resourcesIncluded: "Full guide + Booking tips",
    access: "paid" as const
  }
];

interface AccommodationType {
  id: string;
  title: string;
  termType: string;
  description: string;
  idealFor: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  quickRequirements: string[];
  timeToSource: string;
  savings: string;
  mainPositive: string;
  mainDrawback: string;
  resourcesIncluded: string;
  access: 'free' | 'paid';
}

function CompactAccommodationCard({
  accommodation,
  userType,
  onAccommodationSelect
}: {
  accommodation: AccommodationType;
  userType: 'guest' | 'free' | 'paid';
  onAccommodationSelect: (accommodationId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = accommodation.icon;

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const accessible = hasAccess(accommodation.access);
  const isLocked = !accessible;

  const handleExpand = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAccommodationSelect = () => {
    if (!isLocked) {
      onAccommodationSelect(accommodation.id);
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
      aria-label={`${accommodation.title} accommodation card. ${isExpanded ? 'Press Enter to collapse' : 'Press Enter to expand'}`}
    >
      {/* Main content container */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Collapsed state content */}
        <div className="flex items-center gap-3 min-h-0">
          {/* Accommodation icon */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
            "shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105",
            accommodation.gradient
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Accommodation info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-lg leading-tight min-w-0 flex-shrink">
                {accommodation.title}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                <Badge variant="outline" className="text-xs">
                  {accommodation.termType}
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
                {accommodation.timeToSource} • {accommodation.savings} Savings
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpand();
                  }}
                  aria-label={isExpanded ? "Collapse accommodation details" : "Expand accommodation details"}
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
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {accommodation.description}
          </p>

          {/* Ideal for */}
          <p className="text-sm font-medium text-green-600 mb-4">
            {accommodation.idealFor}
          </p>

          {/* Quick requirements */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Common Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {accommodation.quickRequirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick figures grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{accommodation.timeToSource}</div>
                <div className="text-xs text-muted-foreground">Time to source</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{accommodation.savings}</div>
                <div className="text-xs text-muted-foreground">Savings</div>
              </div>
            </div>
          </div>

          {/* Main positive and drawback */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-green-600 font-medium">{accommodation.mainPositive}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-red-600 font-medium">{accommodation.mainDrawback}</span>
            </div>
          </div>

          {/* Resources included */}
          <div className="mb-4">
            <Badge variant="default" className="text-xs">
              {accommodation.resourcesIncluded}
            </Badge>
          </div>

          {/* Action button */}
          <div className="mt-auto pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAccommodationSelect();
              }}
              disabled={isLocked}
              className="w-full h-11 text-sm"
              aria-label={`Continue to ${accommodation.title} guide`}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <Card className="max-w-sm mx-4 p-4 text-center border-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold mb-2">Premium Access Required</h4>
            <p className="text-sm text-muted-foreground">Upgrade to unlock this accommodation guide</p>
          </Card>
        </div>
      )}
    </Card>
  );
}

export default function AccommodationSelection({ userType }: { userType: 'guest' | 'free' | 'paid' }) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'details'>('overview');

  const selectedAccommodationData = accommodationTypes.find(a => a.id === selectedAccommodation);

  const handleAccommodationSelect = (accommodationId: string) => {
    setSelectedAccommodation(accommodationId);
    setCurrentView('details');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedAccommodation(null);
  };

  // Show detailed view if an accommodation is selected
  if (currentView === 'details' && selectedAccommodationData) {
    return (
      <AccommodationDetailViewer
        accommodation={selectedAccommodationData}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🏠 Choose Your Accommodation Strategy</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the accommodation sourcing method that best fits your needs and budget
        </p>
      </div>

      {/* Accommodation Cards */}
      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {accommodationTypes.map((accommodation) => (
          <CompactAccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            userType={userType}
            onAccommodationSelect={handleAccommodationSelect}
          />
        ))}
      </div>
    </div>
  );
}