import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Award,
  Star,
  Target,
  Lightbulb,
  Video,
  Trophy,
  Zap,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedLessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: "video" | "quiz" | "interactive";
  status: "locked" | "available" | "in-progress" | "completed";
  progress?: number; // 0-100
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  keyPoints?: string[];
  isCurrentLesson?: boolean;
  isNextRecommended?: boolean;
  className?: string;
  onStart?: () => void;
  onPreview?: () => void;
  completedLessons?: number;
  totalLessons?: number;
}

// Milestone celebration component
const MilestoneIndicator = ({ completedLessons, totalLessons }: { completedLessons: number; totalLessons: number }) => {
  const milestones = [25, 50, 75, 100];
  const progressPercent = (completedLessons / totalLessons) * 100;
  const nextMilestone = milestones.find(m => m > progressPercent);
  const justReachedMilestone = milestones.includes(Math.round(progressPercent));

  if (!justReachedMilestone) return null;

  return (
    <div className="absolute -top-2 -right-2 animate-bounce">
      <div className="relative">
        <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        <div className="absolute -top-1 -right-1">
          <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
        </div>
      </div>
    </div>
  );
};

// Progress ring animation
const ProgressRing = ({ progress, size = 40 }: { progress: number; size?: number }) => {
  const radius = (size - 4) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-muted/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export function EnhancedLessonCard({
  id,
  title,
  description,
  duration,
  type,
  status,
  progress = 0,
  difficulty,
  xpReward,
  keyPoints = [],
  isCurrentLesson = false,
  isNextRecommended = false,
  className,
  onStart,
  onPreview,
  completedLessons = 0,
  totalLessons = 1
}: EnhancedLessonCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile();

  const typeIcons = {
    video: Video,
    quiz: BookOpen,
    interactive: Target
  };

  const Icon = typeIcons[type];

  const difficultyColors = {
    beginner: "text-green-500",
    intermediate: "text-yellow-500", 
    advanced: "text-red-500"
  };

  const statusConfig = {
    locked: {
      icon: Lock,
      buttonText: "Locked",
      buttonVariant: "outline" as const,
      disabled: true,
      cardClass: "opacity-60 cursor-not-allowed",
      glowClass: ""
    },
    available: {
      icon: Play,
      buttonText: "Start Lesson",
      buttonVariant: "default" as const,
      disabled: false,
      cardClass: "hover:shadow-lg cursor-pointer transition-all duration-300",
      glowClass: ""
    },
    "in-progress": {
      icon: Play,
      buttonText: "Continue Lesson",
      buttonVariant: "default" as const,
      disabled: false,
      cardClass: "border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/10 hover:shadow-lg cursor-pointer transition-all duration-300",
      glowClass: "shadow-lg shadow-yellow-500/20"
    },
    completed: {
      icon: CheckCircle,
      buttonText: "Review Lesson",
      buttonVariant: "outline" as const,
      disabled: false,
      cardClass: "border-green-500/50 bg-green-50/50 dark:bg-green-900/10 hover:shadow-lg cursor-pointer transition-all duration-300",
      glowClass: "shadow-lg shadow-green-500/20"
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const handleCardClick = () => {
    if (config.disabled) return;
    
    if (onPreview) {
      onPreview();
      setShowPreview(true);
    }
  };

  const handleStartLesson = () => {
    setShowPreview(false);
    if (onStart) {
      onStart();
    }
  };

  const PreviewContent = () => (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-3 rounded-lg",
            status === "completed" ? "bg-green-100 text-green-600" :
            status === "in-progress" ? "bg-yellow-100 text-yellow-600" :
            "bg-blue-100 text-blue-600"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {duration} min
              </span>
              <span className={cn("font-medium", difficultyColors[difficulty])}>
                {difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                {xpReward} XP
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground">{description}</p>

        {keyPoints.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              What you'll learn:
            </h4>
            <ul className="space-y-1">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {status === "in-progress" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <ProgressBar 
              progress={progress}
              size="sm"
              className="transition-all duration-500"
            />
          </div>
        )}
      </div>
    </>
  );

  const PreviewFooter = () => (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1">
        Close
      </Button>
      <Button onClick={handleStartLesson} className="flex-1">
        {config.buttonText}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <>
      <Card 
        className={cn(
          "p-6 transition-all duration-300 relative overflow-hidden",
          config.cardClass,
          config.glowClass,
          isCurrentLesson && "ring-2 ring-primary ring-offset-2 scale-[1.02]",
          isNextRecommended && "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/10",
          className
        )}
        onClick={handleCardClick}
      >
        {/* Milestone indicator */}
        <MilestoneIndicator completedLessons={completedLessons} totalLessons={totalLessons} />
        
        {/* Current lesson indicator */}
        {isCurrentLesson && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary">
              <Star className="w-3 h-3 mr-1" />
              Current
            </Badge>
          </div>
        )}

        {/* Next recommended indicator */}
        {isNextRecommended && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
              <Zap className="w-3 h-3 mr-1" />
              Up Next
            </Badge>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={cn(
              "p-2 rounded-lg transition-all duration-300",
              status === "completed" ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" :
              status === "in-progress" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400" :
              status === "locked" ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500" :
              "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {duration} min
                </span>
                <span className={cn("font-medium", difficultyColors[difficulty])}>
                  {difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {xpReward} XP
                </span>
              </div>
            </div>
          </div>
          
          {status === "in-progress" ? (
            <ProgressRing progress={progress} size={40} />
          ) : (
            <StatusIcon className={cn(
              "w-5 h-5 transition-all duration-300",
              status === "completed" ? "text-green-500" :
              status === "locked" ? "text-gray-400" :
              "text-primary"
            )} />
          )}
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Lesson {id}
          </div>
          
          <Button
            variant={config.buttonVariant}
            size="sm"
            disabled={config.disabled}
            onClick={(e) => {
              e.stopPropagation();
              handleStartLesson();
            }}
            className={cn(
              "transition-all duration-300",
              !config.disabled && "hover:scale-105"
            )}
          >
            {config.buttonText}
            {!config.disabled && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        {/* Visual hierarchy enhancements */}
        {isCurrentLesson && (
          <div className="absolute inset-0 rounded-lg border-2 border-primary animate-pulse opacity-20 pointer-events-none" />
        )}
        
        {isNextRecommended && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-lg" />
        )}
      </Card>

      {/* Preview Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showPreview} onOpenChange={setShowPreview}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Lesson Preview</DrawerTitle>
              <DrawerDescription>
                Get ready to start this lesson
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 pb-4">
              <PreviewContent />
            </div>
            
            <DrawerFooter>
              <PreviewFooter />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Lesson Preview</SheetTitle>
              <SheetDescription>
                Get ready to start this lesson
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6">
              <PreviewContent />
            </div>
            
            <SheetFooter className="mt-6">
              <PreviewFooter />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
