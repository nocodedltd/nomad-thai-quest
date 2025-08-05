import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  DollarSign, 
  FileText, 
  Home, 
  Users, 
  ArrowRight,
  CheckCircle,
  Lock,
  Clock,
  Target,
  Zap
} from "lucide-react";

interface TimelineStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  status: "completed" | "in-progress" | "locked" | "available";
  progress: number;
  lessons: number;
  completedLessons: number;
  color: string;
  gradient: string;
  features: string[];
  nextSteps: string[];
}

const timelineStages: TimelineStage[] = [
  {
    id: "income",
    title: "Income",
    subtitle: "Build Your Financial Foundation",
    description: "Establish sustainable income streams that work from anywhere in Thailand.",
    icon: DollarSign,
    status: "completed",
    progress: 100,
    lessons: 12,
    completedLessons: 12,
    color: "text-green-600",
    gradient: "from-green-500/10 to-green-600/5",
    features: [
      "English Teaching Jobs",
      "Volunteering Opportunities", 
      "Digital Mentorship Courses",
      "Affiliate Program"
    ],
    nextSteps: [
      "Apply for teaching positions",
      "Join volunteer programs",
      "Complete AI automation course",
      "Start affiliate marketing"
    ]
  },
  {
    id: "visa",
    title: "Visa",
    subtitle: "Navigate Legal Requirements",
    description: "Understand and obtain the right visa for your Thailand journey.",
    icon: FileText,
    status: "in-progress",
    progress: 60,
    lessons: 8,
    completedLessons: 5,
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-blue-600/5",
    features: [
      "Tourist Visa Guide",
      "Education Visa Options",
      "Digital Nomad Visa (DTV)",
      "Business Visa Solutions"
    ],
    nextSteps: [
      "Complete visa requirements quiz",
      "Choose your visa path",
      "Prepare required documents",
      "Apply for selected visa"
    ]
  },
  {
    id: "accommodation",
    title: "Accommodation",
    subtitle: "Find Your Perfect Home",
    description: "Discover housing options from hostels to long-term rentals.",
    icon: Home,
    status: "locked",
    progress: 0,
    lessons: 6,
    completedLessons: 0,
    color: "text-purple-600",
    gradient: "from-purple-500/10 to-purple-600/5",
    features: [
      "Accommodation Video Guide",
      "Hostel Finder & Reviews",
      "Real Estate Agent Network",
      "Rental Market Analysis"
    ],
    nextSteps: [
      "Watch accommodation guide",
      "Research target neighborhoods",
      "Connect with real estate agents",
      "Plan your housing budget"
    ]
  },
  {
    id: "community",
    title: "Community",
    subtitle: "Connect & Thrive",
    description: "Join the expat community and build your social network.",
    icon: Users,
    status: "locked",
    progress: 0,
    lessons: 4,
    completedLessons: 0,
    color: "text-orange-600",
    gradient: "from-orange-500/10 to-orange-600/5",
    features: [
      "Discord Community Access",
      "Events Calendar",
      "Group Trip Discounts",
      "Networking Opportunities"
    ],
    nextSteps: [
      "Join Discord server",
      "Browse upcoming events",
      "Connect with fellow nomads",
      "Plan your first meetup"
    ]
  }
];

interface TimelineNavigationProps {
  currentStage?: string;
  onStageClick?: (stageId: string) => void;
}

export default function TimelineNavigation({ currentStage = "income", onStageClick }: TimelineNavigationProps) {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(currentStage);

  const handleStageClick = (stageId: string) => {
    setSelectedStage(stageId);
    onStageClick?.(stageId);
    
    // Navigate to appropriate page based on stage
    switch(stageId) {
      case "income":
        navigate("/income");
        break;
      case "visa":
        navigate("/visa");
        break;
      case "accommodation":
        navigate("/accommodation");
        break;
      case "community":
        navigate("/community");
        break;
    }
  };

  const totalProgress = timelineStages.reduce((sum, stage) => sum + stage.progress, 0) / timelineStages.length;

  return (
    <div className="w-full">
      {/* Progress Overview */}
      <Card className="p-4 mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg md:text-xl font-bold">Your Thailand Journey</h2>
          <Badge variant="secondary" className="text-xs">{Math.round(totalProgress)}% Complete</Badge>
        </div>
        <ProgressBar 
          progress={totalProgress}
          size="lg"
          className="mb-2"
        />
        <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
          <span>Overall Progress</span>
          <span>{Math.round(totalProgress)}% complete</span>
        </div>
      </Card>

      {/* Timeline Stages */}
      <div className="space-y-4">
        {timelineStages.map((stage, index) => {
          const IconComponent = stage.icon;
          const isSelected = selectedStage === stage.id;
          const isAccessible = stage.status !== "locked";
          
          return (
            <Card 
              key={stage.id}
              className={`p-4 md:p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                isSelected ? "ring-2 ring-primary" : ""
              } ${stage.gradient} ${
                stage.status === "locked" ? "opacity-60" : ""
              }`}
              onClick={() => isAccessible && handleStageClick(stage.id)}
            >
              <div className="flex items-start gap-4">
                {/* Stage Icon & Status */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                    stage.status === "completed" ? "bg-green-500" :
                    stage.status === "in-progress" ? "bg-blue-500" :
                    stage.status === "available" ? "bg-primary" :
                    "bg-muted-foreground"
                  }`}>
                    {stage.status === "completed" ? (
                      <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : stage.status === "locked" ? (
                      <Lock className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : (
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    )}
                  </div>
                </div>

                {/* Stage Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold mb-1">{stage.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">{stage.subtitle}</p>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                    <Badge variant={
                      stage.status === "completed" ? "default" :
                      stage.status === "in-progress" ? "secondary" :
                      "outline"
                    } className="text-xs self-start">
                      {stage.status === "completed" ? "Completed" :
                       stage.status === "in-progress" ? "In Progress" :
                       stage.status === "available" ? "Available" :
                       "Locked"}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{stage.completedLessons}/{stage.lessons} lessons</span>
                      <span>{stage.progress}% complete</span>
                    </div>
                    <ProgressBar progress={stage.progress} size="sm" />
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {stage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Next Steps */}
                  {stage.status !== "locked" && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Next Steps:</p>
                      <div className="space-y-1">
                        {stage.nextSteps.slice(0, 2).map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <ArrowRight className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {isAccessible && (
                    <Button 
                      size="sm" 
                      className="mt-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStageClick(stage.id);
                      }}
                    >
                      {stage.status === "completed" ? "Review" :
                       stage.status === "in-progress" ? "Continue" :
                       "Start"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 