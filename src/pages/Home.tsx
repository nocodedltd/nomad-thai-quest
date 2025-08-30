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
  Calendar
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

const urgencyTriggers = [
  {
    title: "Visa prices increasing 15% next year",
    timeLeft: "4 months",
    impact: "Save $400+",
    color: "red"
  },
  {
    title: "Remote work revolution accelerating",
    timeLeft: "Limited time",
    impact: "First mover advantage",
    color: "orange"
  },
  {
    title: "Bangkok property prices up 8% this year",
    timeLeft: "Act now",
    impact: "Lock in current rates",
    color: "yellow"
  }
];

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
          // Guest users see motivation-driven landing
          <div>
            <HeroSection />
            <MotivationSection />
            <FeaturesSection />
            <CTASection />
          </div>
        }
        
        freeContent={
          // Free users see motivation + progress
          <div className="container mx-auto p-6">
            {/* Welcome Header with Motivation */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">You're Making It Happen! 🔥</h1>
              <p className="text-xl text-muted-foreground mb-4">Your Thailand dream is getting closer every day</p>
              
              {/* Mini Cost Reminder */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">You're on track to save</div>
                    <div className="text-2xl font-bold text-green-600">$4,680+ per year</div>
                  </div>
                  <PiggyBank className="w-12 h-12 text-green-500" />
                </div>
              </div>
            </div>

            {/* Progress with Celebration */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">🎯 Your Journey Progress</h3>
                  <Badge className="bg-green-500 text-white">Active</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/progress')}>
                  Full Analytics <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">Phase {userState.progress?.currentPhase || 1}</div>
                  <div className="text-sm text-muted-foreground">Current Phase</div>
                  <div className="text-xs text-green-600 mt-1 font-semibold">✅ On track</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                  <div className="text-xs text-blue-600 mt-1">2 of 5 phases unlocked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">6-8</div>
                  <div className="text-sm text-muted-foreground">Months to Thailand</div>
                  <div className="text-xs text-purple-600 mt-1">Estimated timeline</div>
                </div>
              </div>
              
              {/* Motivation boost */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-3 rounded-lg text-center">
                <div className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                  🔥 You're ahead of 73% of people who started this journey!
                </div>
              </div>
            </Card>

            {/* Daily Motivation Facts */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200">
                <div className="text-center">
                  <Crown className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                  <div className="text-2xl font-bold text-blue-600">#1</div>
                  <div className="text-sm font-semibold mb-1">Bangkok Ranked</div>
                  <div className="text-xs text-muted-foreground">Top Digital Nomad City Worldwide</div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
                <div className="text-center">
                  <Banknote className="w-12 h-12 mx-auto text-green-500 mb-3" />
                  <div className="text-2xl font-bold text-green-600">$390+</div>
                  <div className="text-sm font-semibold mb-1">Monthly Savings</div>
                  <div className="text-xs text-muted-foreground">Compared to Western living costs</div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200">
                <div className="text-center">
                  <Timer className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                  <div className="text-2xl font-bold text-orange-600">4 months</div>
                  <div className="text-sm font-semibold mb-1">Until Visa Price Hike</div>
                  <div className="text-xs text-muted-foreground">Save $400+ by acting now</div>
                </div>
              </Card>
            </div>

            {/* Next Actions - Urgent */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {quickActions.slice(0, 2).map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="p-6 hover:shadow-lg transition-all cursor-pointer group border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950" 
                        onClick={() => navigate(action.path)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                        <Button size="sm" className="group-hover:scale-105 transition-transform">
                          Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {/* FOMO Upgrade Section */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">🚀 Unlock Your Full Thailand Potential</h3>
                <p className="text-muted-foreground mb-4">Get the advanced strategies that helped 3,000+ people move successfully</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Visa & Living Masterclasses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">1-on-1 Mentor Support</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Premium Income Strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Done-for-You Templates</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Premium
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <div className="mt-3 text-sm text-purple-600 dark:text-purple-400">
                  💫 127 people upgraded in the last 7 days
                </div>
              </div>
            </Card>

            {/* Today's Focus - High Energy */}
            <Card className="p-6 mb-8 border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold">🎯 Today's Thailand Actions</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-semibold">Continue Income Strategy Course</p>
                    <p className="text-sm text-muted-foreground">Next: Remote Work Setup • 15 min remaining</p>
                    <div className="text-xs text-green-600 mt-1">💰 Unlock $2K+ monthly potential</div>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => navigate('/roadmap?tab=income')}>
                    Continue
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-semibold">Review Visa Requirements</p>
                    <p className="text-sm text-muted-foreground">Deadline: 2 weeks • Price increase in 4 months</p>
                    <div className="text-xs text-orange-600 mt-1">⚡ Save $400+ by completing early</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => navigate('/roadmap?tab=visa')}>
                    Review
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-sm text-muted-foreground mb-2">Your Thailand Timeline</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-600">6-8 months to move</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">On track to save $4,680+/year</span>
                  </div>
                </div>
              </div>
            </Card>
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
