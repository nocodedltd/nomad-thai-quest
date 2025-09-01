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
  Award,
  Flame,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Crown,
  AlertTriangle,
  Timer,
  Banknote,
  Home,
  PiggyBank,
  Calendar,
  MessageCircle,
  Coins,
  Trophy
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import { MotivationSection } from "@/components/home/MotivationSection";

// Thailand motivation facts and statistics
const thailandFacts = {
  costComparison: {
    thailand: {
      rent: 400,
      food: 200,
      transport: 50,
      utilities: 60,
      entertainment: 150,
      total: 860
    },
    western: {
      rent: 1200,
      food: 400,
      transport: 200,
      utilities: 150,
      entertainment: 300,
      total: 2250
    }
  },
  millionaireData: {
    ukExodus: {
      leaving: 9500,
      arriving: 1000,
      netChange: -8500
    },
    thailandInflux: {
      leaving: 200,
      arriving: 3200,
      netChange: +3000
    }
  },
  achievements: {
    bangkokRanking: 1,
    totalDigitalNomads: 47000,
    avgIncomeIncrease: 65,
    visaApprovalRate: 94
  }
};

const quickActions = [
  {
    title: "Continue Journey",
    description: "View roadmap progress",
    icon: Map,
    path: "/roadmap",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Build Income",
    description: "Explore opportunities",
    icon: DollarSign,
    path: "/roadmap?tab=income",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Handle Visa",
    description: "Navigate requirements",
    icon: FileText,
    path: "/roadmap?tab=visa",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Find Home",
    description: "Discover accommodation",
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
          // Guest users see motivation-driven landing
          <div>
            <HeroSection />
            <MotivationSection />
            <FeaturesSection />
            <CTASection />
          </div>
        }
        
        freeContent={
          // Free users see compact dashboard with motivation
          <div className="container mx-auto p-4 space-y-4">
            {/* Compact Welcome Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome! 👋</h1>
                <p className="text-sm text-muted-foreground">Your Thailand journey awaits</p>
              </div>
              <Badge className="bg-green-500 text-white">Free</Badge>
            </div>

            {/* Compact Progress Overview */}
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">Phase {userState.progress?.currentPhase || 1}</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">6-8m</div>
                  <div className="text-xs text-muted-foreground">Timeline</div>
                </div>
              </div>
            </Card>

            {/* Compact Motivation - Money Hack */}
            <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <div className="text-center mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-bold">💰 The Thailand Money Hack</h3>
                </div>
                <p className="text-sm text-muted-foreground">$2,000/month in Thailand = More than $3,500/month in the West</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                  <div className="text-xs text-muted-foreground">Western Life</div>
                  <div className="text-lg font-bold text-red-600">${thailandFacts.costComparison.western.total}</div>
                  <div className="text-xs">Monthly expenses</div>
                </div>
                <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                  <div className="text-xs text-muted-foreground">Thailand Life</div>
                  <div className="text-lg font-bold text-green-600">${thailandFacts.costComparison.thailand.total}</div>
                  <div className="text-xs">Monthly expenses</div>
                </div>
              </div>
              
              <div className="bg-green-500 text-white p-2 rounded text-center">
                <div className="text-sm font-bold">🎯 Save $390+ per month = $4,680+ per year!</div>
              </div>
            </Card>

            {/* Compact Motivation - Wealth Migration */}
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold">📈 The Great Wealth Migration</h3>
                <p className="text-sm text-muted-foreground">Smart money is moving to Thailand</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                  <TrendingDown className="w-6 h-6 mx-auto text-red-500 mb-1" />
                  <div className="text-lg font-bold text-red-600">-8,500</div>
                  <div className="text-xs">UK millionaires left</div>
                </div>
                <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                  <TrendingUpIcon className="w-6 h-6 mx-auto text-green-500 mb-1" />
                  <div className="text-lg font-bold text-green-600">+3,000</div>
                  <div className="text-xs">Thailand millionaires</div>
                </div>
              </div>
              
              <div className="bg-purple-500 text-white p-2 rounded text-center">
                <div className="text-sm font-bold">💡 Millionaires are choosing Thailand</div>
              </div>
            </Card>

            {/* Compact Stats */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-yellow-600">#1</div>
                <div className="text-xs">Bangkok Ranked</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-blue-600">47K+</div>
                <div className="text-xs">Digital Nomads</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-green-600">+65%</div>
                <div className="text-xs">Income Boost</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-purple-600">94%</div>
                <div className="text-xs">Visa Success</div>
              </Card>
            </div>

            {/* Discord Community */}
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-indigo-500" />
                <div className="flex-1">
                  <h3 className="font-bold">Join Our Discord Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with 2,000+ Thailand nomads</p>
                </div>
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                  Join Now
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              {quickActions.slice(0, 2).map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-3 hover:shadow-lg transition-all cursor-pointer" 
                        onClick={() => navigate(action.path)}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Upgrade Prompt */}
            <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
              <div className="text-center">
                <h3 className="font-bold mb-2">🚀 Unlock Premium Features</h3>
                <p className="text-sm text-muted-foreground mb-3">Get advanced strategies and 1-on-1 support</p>
                <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Crown className="w-4 h-4 mr-1" />
                  Upgrade
                </Button>
              </div>
            </Card>
          </div>
        }
        
        paidContent={
          // Paid users see compact dashboard with motivation
          <div className="container mx-auto p-4 space-y-4">
            {/* Compact Welcome Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
                <p className="text-sm text-muted-foreground">Ready to continue your Thailand journey?</p>
              </div>
              <Badge className="bg-purple-500 text-white">Premium</Badge>
            </div>

            {/* Compact Progress Overview */}
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Current Status</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/progress')}>
                  Analytics <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">Phase {userState.progress?.currentPhase || 3}</div>
                  <div className="text-xs text-muted-foreground">Current Phase</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{Math.round(progressPercentage) || 75}%</div>
                  <div className="text-xs text-muted-foreground">Overall Progress</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">2 weeks</div>
                  <div className="text-xs text-muted-foreground">Next Milestone</div>
                </div>
              </div>
            </Card>

            {/* Compact Motivation - Money Hack */}
            <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <div className="text-center mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-bold">💰 The Thailand Money Hack</h3>
                </div>
                <p className="text-sm text-muted-foreground">$2,000/month in Thailand = More than $3,500/month in the West</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                  <div className="text-xs text-muted-foreground">Western Life</div>
                  <div className="text-lg font-bold text-red-600">${thailandFacts.costComparison.western.total}</div>
                  <div className="text-xs">Monthly expenses</div>
                </div>
                <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                  <div className="text-xs text-muted-foreground">Thailand Life</div>
                  <div className="text-lg font-bold text-green-600">${thailandFacts.costComparison.thailand.total}</div>
                  <div className="text-xs">Monthly expenses</div>
                </div>
              </div>
              
              <div className="bg-green-500 text-white p-2 rounded text-center">
                <div className="text-sm font-bold">🎯 Save $390+ per month = $4,680+ per year!</div>
              </div>
            </Card>

            {/* Compact Motivation - Wealth Migration */}
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold">📈 The Great Wealth Migration</h3>
                <p className="text-sm text-muted-foreground">Smart money is moving to Thailand</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                  <TrendingDown className="w-6 h-6 mx-auto text-red-500 mb-1" />
                  <div className="text-lg font-bold text-red-600">-8,500</div>
                  <div className="text-xs">UK millionaires left</div>
                </div>
                <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                  <TrendingUpIcon className="w-6 h-6 mx-auto text-green-500 mb-1" />
                  <div className="text-lg font-bold text-green-600">+3,000</div>
                  <div className="text-xs">Thailand millionaires</div>
                </div>
              </div>
              
              <div className="bg-purple-500 text-white p-2 rounded text-center">
                <div className="text-sm font-bold">💡 Millionaires are choosing Thailand</div>
              </div>
            </Card>

            {/* Compact Stats */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-yellow-600">#1</div>
                <div className="text-xs">Bangkok Ranked</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-blue-600">47K+</div>
                <div className="text-xs">Digital Nomads</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-green-600">+65%</div>
                <div className="text-xs">Income Boost</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="text-lg font-bold text-purple-600">94%</div>
                <div className="text-xs">Visa Success</div>
              </Card>
            </div>

            {/* Discord Community */}
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-indigo-500" />
                <div className="flex-1">
                  <h3 className="font-bold">Join Our Discord Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with 2,000+ Thailand nomads</p>
                </div>
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                  Join Now
                </Button>
              </div>
            </Card>

            {/* Quick Actions - All Unlocked */}
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-3 hover:shadow-lg transition-all cursor-pointer" 
                        onClick={() => navigate(action.path)}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Today's Priorities - Compact */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Today's Priorities</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Continue AI Automation Course</p>
                    <p className="text-xs text-muted-foreground">Lesson 6: Client Acquisition</p>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    Continue
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Submit Visa Application</p>
                    <p className="text-xs text-muted-foreground">Deadline: 5 days</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Submit
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        }
      />
    </div>
  );
}
