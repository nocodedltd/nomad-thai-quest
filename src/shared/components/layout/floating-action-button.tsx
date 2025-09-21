import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Map, 
  ArrowRight, 
  Target, 
  DollarSign, 
  FileText, 
  Building,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/shared/contexts/user-context";
import { cn } from "@/shared/lib/utils";

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
    description: "Explore courses",
    icon: DollarSign,
    path: "/roadmap?tab=income",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Handle Visa",
    description: "Legal requirements",
    icon: FileText,
    path: "/roadmap?tab=visa",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Find Home",
    description: "Accommodation",
    icon: Building,
    path: "/roadmap?tab=living",
    color: "from-pink-500 to-pink-600"
  }
];

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userType, userState } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on home page for guests
  if (userType === 'guest' && location.pathname === '/') {
    return null;
  }

  const currentPhase = userState.progress?.currentPhase || 1;
  const progressPercentage = userState.progress ? 
    (userState.progress.completedLessons / userState.progress.totalLessons) * 100 : 0;

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-40 transition-all duration-300",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
    )}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-futuristic-neon-blue to-futuristic-neon-purple hover:scale-110 transition-transform duration-200 relative overflow-hidden group"
          >
            <Map className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-80 p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Navigation
            </SheetTitle>
          </SheetHeader>

          {/* Progress Summary */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <h3 className="font-semibold mb-2">Current Progress</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">Phase {currentPhase}</div>
                <div className="text-xs text-muted-foreground">Current</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isCurrentPage = location.pathname === action.path || 
                (action.path.includes('?') && location.pathname + location.search === action.path);
              
              return (
                <button
                  key={action.title}
                  onClick={() => {
                    navigate(action.path);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full p-3 rounded-lg border transition-all hover:shadow-md text-left",
                    isCurrentPage 
                      ? "bg-primary/10 border-primary/20" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                    {isCurrentPage ? (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Today's Focus */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <h3 className="font-semibold text-sm">Today's Focus</h3>
            </div>
            <div className="text-sm">
              {currentPhase === 1 && "Continue income setup course"}
              {currentPhase === 2 && "Review visa requirements"}
              {currentPhase === 3 && "Plan your relocation"}
              {currentPhase >= 4 && "Prepare for settlement"}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-semibold">On track</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

