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

const recentLessons = [
  {
    id: 1,
    title: "Amazon FBA Product Research",
    course: "Income Mastery",
    progress: 100,
    duration: "15 min",
    xpReward: 50
  },
  {
    id: 2,
    title: "Tourist Visa Requirements",
    course: "Visa Guide",
    progress: 75,
    duration: "12 min",
    xpReward: 40
  },
  {
    id: 3,
    title: "Bangkok Neighborhoods Guide",
    course: "Living in Thailand",
    progress: 0,
    duration: "18 min",
    xpReward: 60
  }
];

const quickActions = [
  {
    title: "Continue Your Journey",
    description: "Pick up where you left off",
    icon: Map,
    path: "/roadmap",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Explore Income Options",
    description: "Build your revenue streams",
    icon: DollarSign,
    path: "/income",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Plan Your Visa",
    description: "Navigate legal requirements",
    icon: FileText,
    path: "/visa",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Find Accommodation",
    description: "Discover your new home",
    icon: Building,
    path: "/living",
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

            {/* Progress Overview */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Your Progress</h3>
                <Badge variant="secondary">{Math.round(progressPercentage)}% Complete</Badge>
              </div>
              <ProgressBar 
                progress={progressPercentage}
                showPercentage={false}
                size="lg"
                className="mb-4"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.completedLessons || 0}</div>
                  <div className="text-sm text-muted-foreground">Lessons Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.totalXP || 0}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.currentPhase || 1}</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
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

            {/* Recent Lessons */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Lessons</h3>
              <div className="space-y-4">
                {recentLessons.slice(0, 2).map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{lesson.progress}%</div>
                        <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                      <ProgressBar progress={lesson.progress} size="sm" className="w-20" />
                    </div>
                  </div>
                ))}
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

            {/* Progress Overview */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Your Progress</h3>
                <Badge variant="secondary">{Math.round(progressPercentage)}% Complete</Badge>
              </div>
              <ProgressBar 
                progress={progressPercentage}
                showPercentage={false}
                size="lg"
                className="mb-4"
              />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.completedLessons || 0}</div>
                  <div className="text-sm text-muted-foreground">Lessons Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.totalXP || 0}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.currentPhase || 1}</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userState.progress?.achievements?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
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

            {/* Recent Lessons */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Lessons</h3>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{lesson.progress}%</div>
                        <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                      <ProgressBar progress={lesson.progress} size="sm" className="w-20" />
                      {lesson.progress === 100 && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userState.progress?.achievements?.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
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
