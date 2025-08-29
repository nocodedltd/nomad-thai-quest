import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  ArrowRight, 
  Map, 
  DollarSign, 
  FileText, 
  Building, 
  Target, 
  Zap, 
  Users,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Award
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

// Removed recentLessons - this data is now managed in the Progress page to avoid duplication

const quickActions = [
  {
    title: "Continue Your Journey",
    description: "View your roadmap progress",
    icon: Map,
    path: "/roadmap",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Build Income Streams",
    description: "Explore courses and job opportunities",
    icon: DollarSign,
    path: "/roadmap?tab=income",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Handle Visa & Legal",
    description: "Navigate visa requirements",
    icon: FileText,
    path: "/roadmap?tab=visa",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Find Your Home",
    description: "Discover accommodation & community",
    icon: Building,
    path: "/roadmap?tab=living",
    color: "from-pink-500 to-pink-600"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  
  const progressPercentage = userState.progress ? 
    (userState.progress.completedLessons / userState.progress.totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <UserContent
        guestContent={
          // Guest users see the landing page
          <div>
            <HeroSection />
            <div className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose Nomad Thai Quest?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of digital nomads who have successfully made Thailand their home
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Card key={action.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </Card>
                  );
                })}
              </div>
              
              <UpgradePrompt />
            </div>
            <FeaturesSection />
            <CTASection />
          </div>
        }
        
        freeContent={
          // Free users see a simplified dashboard
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
              <p className="text-muted-foreground">Ready to continue your Thailand journey?</p>
            </div>

            {/* Current Status */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Current Status</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/progress')}>
                  View Analytics <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">Phase {userState.progress?.currentPhase || 1}</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
                  <div className="text-xs text-green-600 mt-1">On track</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                  <div className="text-xs text-blue-600 mt-1">2 of 5 phases unlocked</div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickActions.slice(0, 2).map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => navigate(action.path)}>
                    <div className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                );
              })}
              
              {/* Locked Actions */}
              {quickActions.slice(2).map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-6 opacity-50 border-dashed">
                    <div className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Badge variant="outline" className="w-full">🔒 Premium Feature</Badge>
                  </Card>
                );
              })}
            </div>

            {/* Today's Focus */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Today's Priorities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Continue Income Strategy Course</p>
                    <p className="text-sm text-muted-foreground">Next: Remote Work Setup</p>
                  </div>
                  <Button size="sm" onClick={() => navigate('/roadmap?tab=income')}>
                    Continue
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Review Visa Requirements</p>
                    <p className="text-sm text-muted-foreground">Deadline: 2 weeks</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate('/roadmap?tab=visa')}>
                    Review
                  </Button>
                </div>
              </div>
            </Card>

            <UpgradePrompt compact />
          </div>
        }
        
        paidContent={
          // Paid users see the full dashboard
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
              <p className="text-muted-foreground">Ready to continue your Thailand journey?</p>
            </div>

            {/* Current Status - Enhanced */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Current Status</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/progress')}>
                  Detailed Analytics <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">Phase {userState.progress?.currentPhase || 3}</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
                  <div className="text-xs text-green-600 mt-1">Legal & Visa</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{Math.round(progressPercentage) || 75}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                  <div className="text-xs text-blue-600 mt-1">All phases unlocked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">2 weeks</div>
                  <div className="text-sm text-muted-foreground">Next Milestone</div>
                  <div className="text-xs text-orange-600 mt-1">Visa deadline</div>
                </div>
              </div>
            </Card>

            {/* Quick Actions - All Unlocked */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => navigate(action.path)}>
                    <div className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* Today's Focus - Enhanced for Paid Users */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Today's Priorities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Continue AI Automation Course</p>
                    <p className="text-sm text-muted-foreground">Lesson 6: Client Acquisition Strategies</p>
                  </div>
                  <Button size="sm" onClick={() => navigate('/roadmap?tab=income')}>
                    Continue
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Submit Visa Application</p>
                    <p className="text-sm text-muted-foreground">Deadline: 5 days - Documents ready</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate('/roadmap?tab=visa')}>
                    Submit
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Book Bangkok Accommodation</p>
                    <p className="text-sm text-muted-foreground">Arrival in 3 weeks</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate('/roadmap?tab=living')}>
                    Browse
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Journey Snapshot */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Journey Snapshot</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/progress')}>
                  View Detailed Analytics <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">Phase 3</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">75%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">2 weeks</div>
                  <div className="text-sm text-muted-foreground">To Next Milestone</div>
                </div>
              </div>
            </Card>
          </div>
        }
      />
    </div>
  );
}
