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
  HomeIcon,
  PiggyBank,
  Calendar,
  MessageCircle,
  Coins,
  Trophy,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import { MotivationSection } from "@/components/home/MotivationSection";
import { useState, useEffect } from "react";

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

const motivationalSlides = [
  {
    id: 1,
    title: "💰 The Thailand Money Hack",
    subtitle: "$2,000/month in Thailand = More than $3,500/month in the West",
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-2 bg-transparent border border-red-200 dark:border-red-800 rounded">
          <div className="text-xs text-muted-foreground">Western Life</div>
          <div className="text-lg font-bold text-red-600">${thailandFacts.costComparison.western.total}</div>
          <div className="text-xs">Monthly expenses</div>
        </div>
        <div className="text-center p-2 bg-transparent border border-green-200 dark:border-green-800 rounded">
          <div className="text-xs text-muted-foreground">Thailand Life</div>
          <div className="text-lg font-bold text-green-600">${thailandFacts.costComparison.thailand.total}</div>
          <div className="text-xs">Monthly expenses</div>
        </div>
      </div>
    ),
    footer: "🎯 Save $390+ per month = $4,680+ per year!",
    icon: Coins
  },
  {
    id: 2,
    title: "📈 The Great Wealth Migration",
    subtitle: "Smart money is moving to Thailand",
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-2 bg-transparent border border-red-200 dark:border-red-800 rounded">
          <TrendingDown className="w-6 h-6 mx-auto text-red-500 mb-1" />
          <div className="text-lg font-bold text-red-600">-8,500</div>
          <div className="text-xs">UK millionaires left</div>
        </div>
        <div className="text-center p-2 bg-transparent border border-green-200 dark:border-green-800 rounded">
          <TrendingUpIcon className="w-6 h-6 mx-auto text-green-500 mb-1" />
          <div className="text-lg font-bold text-green-600">+3,000</div>
          <div className="text-xs">Thailand millionaires</div>
        </div>
      </div>
    ),
    footer: "💡 Millionaires are choosing Thailand",
    icon: TrendingUp
  },
  {
    id: 3,
    title: "🏆 Thailand: World's #1 Choice",
    subtitle: "Join the digital nomad revolution",
    content: (
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center p-2 bg-transparent border border-yellow-200 dark:border-yellow-800 rounded">
          <div className="text-lg font-bold text-yellow-600">#1</div>
          <div className="text-xs">Bangkok Ranked</div>
        </div>
        <div className="text-center p-2 bg-transparent border border-blue-200 dark:border-blue-800 rounded">
          <div className="text-lg font-bold text-blue-600">47K+</div>
          <div className="text-xs">Digital Nomads</div>
        </div>
        <div className="text-center p-2 bg-transparent border border-green-200 dark:border-green-800 rounded">
          <div className="text-lg font-bold text-green-600">+65%</div>
          <div className="text-xs">Income Boost</div>
        </div>
        <div className="text-center p-2 bg-transparent border border-purple-200 dark:border-purple-800 rounded">
          <div className="text-lg font-bold text-purple-600">94%</div>
          <div className="text-xs">Visa Success</div>
        </div>
      </div>
    ),
    footer: "🌟 Join thousands already living the dream",
    icon: Trophy
  }
];

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

function MotivationalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalSlides.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % motivationalSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + motivationalSlides.length) % motivationalSlides.length);
  };

  const currentSlideData = motivationalSlides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold">{currentSlideData.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{currentSlideData.subtitle}</p>
      </div>
      
      <div className="transition-all duration-500 ease-in-out transform">
        {currentSlideData.content}
      </div>
      
      <div className="mt-3 text-center">
        <div className="bg-green-500 text-white p-2 rounded text-sm font-bold">
          {currentSlideData.footer}
        </div>
      </div>

      {/* Navigation dots and arrows */}
      <div className="flex items-center justify-between mt-3">
        <Button variant="ghost" size="sm" onClick={prevSlide} className="p-1 hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex gap-1">
          {motivationalSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-green-500 scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        
        <Button variant="ghost" size="sm" onClick={nextSlide} className="p-1 hover:bg-white/20 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar for auto-advance */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-green-500 h-1 rounded-full"
            style={{ 
              width: '0%',
              animation: 'progressBar 10s linear infinite'
            }}
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `
      }} />
    </Card>
  );
}

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
          <div className="landing-page">
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

            {/* Two-column layout for progress and motivation */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Compact Progress Overview */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
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

              {/* Discord Community */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-indigo-500" />
                  <div className="flex-1">
                    <h3 className="font-bold">Join Our Discord</h3>
                    <p className="text-xs text-muted-foreground">2,000+ Thailand nomads</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-indigo-500 hover:bg-indigo-600"
                    onClick={() => window.open('https://discord.com/invite/C4gHpDDqet', '_blank')}
                  >
                    Join
                  </Button>
                </div>
              </Card>
            </div>

            {/* Two-column layout: Motivational Carousel + Combined Actions & Priorities */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Motivational Carousel - Half Width */}
              <MotivationalCarousel />

              {/* Combined Actions & Priorities */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold mb-3">Today's Priorities & Actions</h3>
                <div className="space-y-3">
                  {/* Priority Items */}
                  <div className="flex items-center gap-2 p-2 bg-transparent border border-green-200 dark:border-green-800 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Continue AI Course</p>
                      <p className="text-xs text-muted-foreground">Lesson 6: Client Acquisition</p>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Continue
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-transparent border border-blue-200 dark:border-blue-800 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Submit Visa</p>
                      <p className="text-xs text-muted-foreground">Deadline: 5 days</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Submit
                    </Button>
                  </div>
                  
                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Card key={action.title} className="p-2 hover:shadow-lg transition-all cursor-pointer bg-transparent border border-gray-200 dark:border-gray-700" 
                              onClick={() => navigate(action.path)}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-xs">{action.title}</h3>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Upgrade Prompt - Full Width */}
            <Card className="p-4 bg-transparent border border-yellow-200 dark:border-yellow-800">
              <div className="text-center">
                <h3 className="font-bold mb-2">🚀 Unlock Premium</h3>
                <p className="text-sm text-muted-foreground mb-3">Advanced strategies & support</p>
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

            {/* Two-column layout for progress and motivation */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Compact Progress Overview */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
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

              {/* Discord Community */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-indigo-500" />
                  <div className="flex-1">
                    <h3 className="font-bold">Join Our Discord</h3>
                    <p className="text-xs text-muted-foreground">2,000+ Thailand nomads</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-indigo-500 hover:bg-indigo-600"
                    onClick={() => window.open('https://discord.com/invite/C4gHpDDqet', '_blank')}
                  >
                    Join
                  </Button>
                </div>
              </Card>
            </div>

            {/* Two-column layout: Motivational Carousel + Combined Actions & Priorities */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Motivational Carousel - Half Width */}
              <MotivationalCarousel />

              {/* Combined Actions & Priorities */}
              <Card className="p-4 bg-transparent border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold mb-3">Today's Priorities & Actions</h3>
                <div className="space-y-3">
                  {/* Priority Items */}
                  <div className="flex items-center gap-2 p-2 bg-transparent border border-green-200 dark:border-green-800 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Continue AI Course</p>
                      <p className="text-xs text-muted-foreground">Lesson 6: Client Acquisition</p>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Continue
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-transparent border border-blue-200 dark:border-blue-800 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Submit Visa</p>
                      <p className="text-xs text-muted-foreground">Deadline: 5 days</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Submit
                    </Button>
                  </div>
                  
                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Card key={action.title} className="p-2 hover:shadow-lg transition-all cursor-pointer bg-transparent border border-gray-200 dark:border-gray-700" 
                              onClick={() => navigate(action.path)}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-xs">{action.title}</h3>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        }
      />
    </div>
  );
}
