import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
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
  Award
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";

const journeyPhases = [
  {
    id: 1,
    title: "Preparation Phase",
    subtitle: "Build Your Foundation",
    description: "Get mentally and financially prepared for your Thailand journey",
    icon: Target,
    duration: "3-6 months",
    difficulty: "Beginner" as const,
    progress: 75,
    lessons: 8,
    completedLessons: 6,
    neonColor: "blue",
    gradientColor: "from-blue-500 to-blue-600",
    features: ["Goal Setting", "Research & Planning", "Budget Planning", "Skill Assessment"],
    nextSteps: ["Complete financial planning", "Research visa options"],
    requiredLevel: null
  },
  {
    id: 2,
    title: "Income Setup", 
    subtitle: "Secure Your Revenue",
    description: "Establish reliable income streams before you move",
    icon: DollarSign,
    duration: "2-4 months",
    difficulty: "Intermediate" as const,
    progress: 60,
    lessons: 12,
    completedLessons: 7,
    neonColor: "green",
    gradientColor: "from-green-500 to-green-600",
    features: ["Remote Work Setup", "Freelancing", "Online Business", "Passive Income"],
    nextSteps: ["Launch first income stream", "Build client base"],
    requiredLevel: null
  },
  {
    id: 3,
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
    requiredLevel: "paid" as const
  },
  {
    id: 4,
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
    requiredLevel: "paid" as const
  },
  {
    id: 5,
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
    requiredLevel: "paid" as const
  }
];

const timelineSteps = [
  { phase: 1, title: "Research & Planning", weeks: "Week 1-4", status: "completed" },
  { phase: 1, title: "Financial Preparation", weeks: "Week 5-8", status: "completed" },
  { phase: 2, title: "Income Stream Setup", weeks: "Week 9-16", status: "in-progress" },
  { phase: 2, title: "Client Acquisition", weeks: "Week 17-20", status: "pending" },
  { phase: 3, title: "Visa Application", weeks: "Week 21-24", status: "locked" },
  { phase: 4, title: "Travel Preparation", weeks: "Week 25-28", status: "locked" },
  { phase: 5, title: "Arrival & Setup", weeks: "Month 7+", status: "locked" },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [selectedPhase, setSelectedPhase] = useState(1);
  
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

  return (
    <div className="min-h-screen bg-background">
      <UserContent
        guestContent={
          <div className="container mx-auto p-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Your Thailand Journey Roadmap</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A step-by-step guide to successfully relocating to Thailand as a digital nomad
              </p>
            </div>

            {/* Phase Overview for Guests */}
            <div className="grid gap-6 mb-12">
              {journeyPhases.slice(0, 2).map((phase) => {
                const Icon = phase.icon;
                return (
                  <Card key={phase.id} className="p-6 border-2">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.gradientColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{phase.title}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {phase.features.map((feature) => (
                            <div key={feature} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              
              {/* Locked phases preview */}
              {journeyPhases.slice(2).map((phase) => {
                const Icon = phase.icon;
                return (
                  <Card key={phase.id} className="p-6 border-2 border-dashed opacity-50">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.gradientColor} flex items-center justify-center flex-shrink-0`}>
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{phase.title}</h3>
                          <Badge variant="outline">🔒 Premium</Badge>
                        </div>
                        <p className="text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <UpgradePrompt 
              title="Unlock Your Complete Roadmap"
              description="Get access to all 5 phases and start your Thailand journey today"
              features={[
                "Complete 5-phase roadmap",
                "Detailed action plans",
                "Progress tracking",
                "Community support"
              ]}
            />
          </div>
        }
        
        freeContent={
          <div className="container mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Your Thailand Journey</h1>
              <p className="text-xl text-muted-foreground">Track your progress through each phase</p>
            </div>

            {/* Progress Overview */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Overall Progress</h3>
                <Badge variant="secondary">Phase {userState.progress?.currentPhase || 1}</Badge>
              </div>
              <ProgressBar 
                progress={40} // 2 out of 5 phases for free users
                showPercentage={true}
                size="lg"
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">2 of 5 phases accessible with your current plan</p>
            </Card>

            {/* Available Phases */}
            <div className="grid gap-6 mb-8">
              {journeyPhases.slice(0, 2).map((phase) => {
                const Icon = phase.icon;
                const status = getPhaseStatus(phase.id);
                
                return (
                  <Card key={phase.id} className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedPhase === phase.id ? 'border-primary' : ''
                  }`} onClick={() => setSelectedPhase(phase.id)}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.gradientColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{phase.title}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                          {status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <ProgressBar 
                          progress={phase.progress}
                          showPercentage={true}
                          size="sm"
                          className="mb-4"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {phase.features.map((feature) => (
                            <div key={feature} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Locked Phases */}
            <Paywall 
              requiredLevel="paid"
              title="Unlock Phases 3-5"
              description="Complete your Thailand journey with advanced phases"
              features={["Legal & visa guidance", "Relocation planning", "Settlement support"]}
            >
              <div className="grid gap-6">
                {journeyPhases.slice(2).map((phase) => {
                  const Icon = phase.icon;
                  return (
                    <Card key={phase.id} className="p-6 border-2">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.gradientColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold">{phase.title}</h3>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{phase.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {phase.features.map((feature) => (
                              <div key={feature} className="flex items-center text-sm">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Paywall>
          </div>
        }
        
        paidContent={
          <div className="container mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Your Complete Thailand Journey</h1>
              <p className="text-xl text-muted-foreground">Master all 5 phases of relocation</p>
            </div>

            {/* Progress Overview */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Overall Progress</h3>
                <Badge variant="secondary">Phase {userState.progress?.currentPhase || 1} of 5</Badge>
              </div>
              <ProgressBar 
                progress={((userState.progress?.currentPhase || 1) / 5) * 100}
                showPercentage={true}
                size="lg"
                className="mb-4"
              />
              
              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-6">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                      step.status === 'pending' ? 'bg-yellow-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step.phase}
                    </div>
                    <div className="text-xs font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.weeks}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* All Phases */}
            <div className="grid gap-6 mb-8">
              {journeyPhases.map((phase) => {
                const Icon = phase.icon;
                const status = getPhaseStatus(phase.id);
                const isAccessible = hasPhaseAccess(phase);
                
                return (
                  <Card key={phase.id} className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedPhase === phase.id ? 'border-primary' : ''
                  } ${!isAccessible ? 'opacity-50' : ''}`} 
                  onClick={() => setSelectedPhase(phase.id)}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.gradientColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{phase.title}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                          <Badge className={`${phase.difficulty === 'Beginner' ? 'bg-green-500' : 
                            phase.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                            {phase.difficulty}
                          </Badge>
                          {status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {status === 'current' && <Clock className="w-5 h-5 text-blue-500" />}
                        </div>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <ProgressBar 
                          progress={phase.progress}
                          showPercentage={true}
                          size="sm"
                          className="mb-4"
                        />
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-muted-foreground">
                            {phase.completedLessons} of {phase.lessons} lessons completed
                          </div>
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (phase.id <= 2) {
                                navigate('/income');
                              } else if (phase.id === 3) {
                                navigate('/visa');
                              } else {
                                navigate('/living');
                              }
                            }}
                          >
                            {phase.progress === 0 ? 'Start Phase' : 'Continue'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {phase.features.map((feature) => (
                            <div key={feature} className="flex items-center text-sm">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Action Center */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {journeyPhases[selectedPhase - 1]?.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Target className="w-5 h-5 text-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        }
      />
    </div>
  );
}
