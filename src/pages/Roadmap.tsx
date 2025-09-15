import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, 
  Clock, 
  Lock, 
  ArrowRight, 
  Target, 
  DollarSign, 
  FileText, 
  Plane, 
  Building, 
  Users,
  Star,
  MapPin,
  Calendar,
  Award,
  Package,
  Bot,
  GraduationCap,
  Play,
  TrendingUp,
  Search,
  Filter,
  Download,
  ExternalLink,
  AlertCircle,
  Crown,
  Heart,
  Coffee,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import IncomeTab from "@/components/roadmap/IncomeTab";
import VisaTab from "@/components/roadmap/VisaTab";
import LivingTab from "@/components/roadmap/LivingTab";

// Journey phases data (removed preparation phase)
const journeyPhases = [
  {
    id: 1,
    title: "Income Setup", 
    subtitle: "Secure Your Revenue",
    description: "Establish reliable income streams before you move",
    icon: DollarSign,
    duration: "2-4 months",
    difficulty: "Beginner" as const,
    progress: 60,
    lessons: 12,
    completedLessons: 7,
    neonColor: "green",
    gradientColor: "from-green-500 to-green-600",
    features: ["Remote Work Setup", "Freelancing", "Online Business", "Passive Income"],
    nextSteps: ["Launch first income stream", "Build client base"],
    requiredLevel: null,
    targetTab: 'income'
  },
  {
    id: 2,
    title: "Legal & Visa",
    subtitle: "Handle Documentation",
    description: "Navigate Thailand's visa system and legal requirements",
    icon: FileText,
    duration: "1-2 months",
    difficulty: "Intermediate" as const,
    progress: 25,
    lessons: 10,
    completedLessons: 2,
    neonColor: "purple",
    gradientColor: "from-purple-500 to-purple-600",
    features: ["Visa Applications", "Legal Setup", "Documentation", "Compliance"],
    nextSteps: ["Choose visa type", "Gather documents"],
    requiredLevel: "paid" as const,
    targetTab: 'visa'
  },
  {
    id: 3,
    title: "Relocation",
    subtitle: "Make the Move",
    description: "Execute your move to Thailand with confidence",
    icon: Plane,
    duration: "1 month",
    difficulty: "Advanced" as const,
    progress: 0,
    lessons: 15,
    completedLessons: 0,
    neonColor: "orange",
    gradientColor: "from-orange-500 to-orange-600",
    features: ["Travel Planning", "Initial Setup", "Accommodation", "First Steps"],
    nextSteps: ["Book flights", "Arrange temporary accommodation"],
    requiredLevel: "paid" as const,
    targetTab: 'living'
  },
  {
    id: 4,
    title: "Settlement",
    subtitle: "Build Your Life",
    description: "Establish your new life and integrate into Thai society",
    icon: Building,
    duration: "Ongoing",
    difficulty: "Advanced" as const,
    progress: 0,
    lessons: 20,
    completedLessons: 0,
    neonColor: "pink",
    gradientColor: "from-pink-500 to-pink-600",
    features: ["Community Building", "Local Integration", "Lifestyle Setup", "Long-term Planning"],
    nextSteps: ["Join expat communities", "Learn basic Thai"],
    requiredLevel: "paid" as const,
    targetTab: 'living'
  }
];

const timelineSteps = [
  { phase: 1, title: "Income Stream Setup", weeks: "Week 1-8", status: "in-progress" },
  { phase: 1, title: "Client Acquisition", weeks: "Week 9-12", status: "pending" },
  { phase: 2, title: "Visa Application", weeks: "Week 13-16", status: "locked" },
  { phase: 2, title: "Document Preparation", weeks: "Week 17-18", status: "locked" },
  { phase: 3, title: "Travel Preparation", weeks: "Week 19-22", status: "locked" },
  { phase: 4, title: "Arrival & Setup", weeks: "Month 6+", status: "locked" },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'income' | 'visa' | 'living'>('income');
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1])); // Start with first phase expanded

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['income', 'visa', 'living'].includes(tab)) {
      setSelectedTab(tab as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'income' | 'visa' | 'living') => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  const handlePhaseClick = (phase: typeof journeyPhases[0]) => {
    handleTabChange(phase.targetTab);
  };

  const togglePhaseExpansion = (phaseId: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };
  
  const hasPhaseAccess = (phase: typeof journeyPhases[0]) => {
    if (!phase.requiredLevel) return true;
    if (phase.requiredLevel === 'paid') return userType === 'paid';
    return userType !== 'guest';
  };

  const getPhaseStatus = (phaseId: number) => {
    if (userState.progress?.completedPhases?.includes(phaseId)) return 'completed';
    if (userState.progress?.currentPhase === phaseId) return 'current';
    if (userState.access?.unlockedPhases?.includes(phaseId)) return 'available';
    return 'locked';
  };

  // Minimal overall progress value used in compact header
  const overallProgress = (() => {
    if (userType === 'paid') {
      const phase = userState.progress?.currentPhase || 1;
      return Math.min(100, (phase / 4) * 100);
    }
    // Show one of four phases accessible for guests/free
    return 25;
  })();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Hero Header Section */}
        <Card className="p-6 sm:p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="text-center">
            {/* User Level */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Nomad Level 1</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Your Journey to Thailand
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              From home to Thailand in three simple steps, with support along every step of the journey
            </p>
            
            {/* Enhanced Progress Bar Section */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
              </div>
              <ProgressBar progress={overallProgress} size="sm" className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {userType === 'paid' ? 
                  `${userState.progress?.currentPhase || 1}/4 stages completed` : 
                  `${Math.min(1, Math.round(overallProgress / 25))}/4 stages completed`
                }
              </p>
            </div>
          </div>
        </Card>

        {/* Main Section Tabs */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-2 p-2 subsection-nav-frosted">
            <button
              onClick={() => handleTabChange('income')}
              className={`nav-button-frosted ${selectedTab === 'income' ? 'selected' : ''}`}
            >
              💰 Income Setup
            </button>
            <button
              onClick={() => handleTabChange('visa')}
              className={`nav-button-frosted ${selectedTab === 'visa' ? 'selected' : ''}`}
            >
              📋 Visa & Legal
            </button>
            <button
              onClick={() => handleTabChange('living')}
              className={`nav-button-frosted ${selectedTab === 'living' ? 'selected' : ''}`}
            >
              🏠 Living Setup
            </button>
          </div>
        </div>

        {/* Income Tab */}
        {selectedTab === 'income' && <IncomeTab compact />}

        {/* Visa Tab */}
        {selectedTab === 'visa' && <VisaTab compact />}

        {/* Living Tab */}
        {selectedTab === 'living' && <LivingTab compact />}
      </div>
    </div>
  );
}