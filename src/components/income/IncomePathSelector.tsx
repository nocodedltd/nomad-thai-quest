import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Building, 
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface IncomePathOption {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Users;
  range: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToStart: string;
  description: string;
  gradient: string;
  shadowColor: string;
}

interface IncomePathSelectorProps {
  onSelect: (pathId: string) => void;
  onContinue: (pathId: string) => void;
}

const incomePaths: IncomePathOption[] = [
  {
    id: "quick-income",
    title: "Quick Income",
    subtitle: "Freelancing & Remote Work",
    icon: Users,
    range: "$2,000-8,000/month",
    difficulty: "Easy",
    timeToStart: "1-2 weeks to start",
    description: "Use existing skills immediately",
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/25"
  },
  {
    id: "scalable-business",
    title: "Scalable Business",
    subtitle: "Online Courses & Products",
    icon: TrendingUp,
    range: "$5,000-20,000/month",
    difficulty: "Medium",
    timeToStart: "1-3 months to start",
    description: "Build assets that work for you",
    gradient: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/25"
  },
  {
    id: "stable-employment",
    title: "Stable Employment",
    subtitle: "Remote Corporate Jobs",
    icon: Building,
    range: "$60,000-150,000/year",
    difficulty: "Medium",
    timeToStart: "2-4 weeks to start",
    description: "Predictable income with benefits",
    gradient: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/25"
  },
  {
    id: "expert-consulting",
    title: "Expert Consulting",
    subtitle: "High-value Services",
    icon: Award,
    range: "$10,000-50,000/month",
    difficulty: "Hard",
    timeToStart: "1-2 months to start",
    description: "Monetize your expertise",
    gradient: "from-orange-500 to-red-600",
    shadowColor: "shadow-orange-500/25"
  }
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
};

export function IncomePathSelector({ onSelect, onContinue }: IncomePathSelectorProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved selection from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedIncomePath");
    if (saved) {
      setSelectedPath(saved);
    }
  }, []);

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    setError(null);
    localStorage.setItem("selectedIncomePath", pathId);
    onSelect(pathId);
  };

  const handleContinue = async () => {
    if (!selectedPath) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 800));
      onContinue(selectedPath);
    } catch (err) {
      setError("Failed to continue. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Income Path</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the income strategy that best matches your skills, timeline, and goals. 
          We'll personalize your learning journey based on your choice.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {incomePaths.map((path, index) => {
          const Icon = path.icon;
          const isSelected = selectedPath === path.id;
          
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-300",
                  "hover:scale-105 hover:shadow-xl",
                  isSelected && "ring-2 ring-primary ring-offset-2",
                  path.shadowColor,
                  error && "opacity-50 pointer-events-none"
                )}
                onClick={() => handlePathSelect(path.id)}
              >
                {/* Background Gradient */}
                <div 
                  className={cn(
                    "absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br",
                    path.gradient
                  )}
                />
                
                {/* Selection Indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-primary rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative p-6 space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br shadow-lg",
                        path.gradient
                      )}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">
                    {path.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>Income Range</span>
                      </div>
                      <span className="font-semibold">{path.range}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="w-4 h-4" />
                        <span>Difficulty</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn("font-medium", difficultyColors[path.difficulty])}
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Timeline</span>
                      </div>
                      <span className="font-medium">{path.timeToStart}</span>
                    </div>
                  </div>

                  {/* Selection Glow Effect */}
                  {isSelected && (
                    <motion.div
                      className={cn(
                        "absolute inset-0 opacity-20 bg-gradient-to-br pointer-events-none",
                        path.gradient
                      )}
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <AnimatePresence>
        {selectedPath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                </motion.div>
              ) : (
                "Continue to Courses"
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}