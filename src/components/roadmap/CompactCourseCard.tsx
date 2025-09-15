import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  ChevronDown,
  ChevronUp,
  Play,
  Star,
  Clock,
  Award,
  TrendingUp,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompactCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    mentor: string;
    mentorBio: string;
    category: string;
    difficulty: string;
    duration: string;
    lessons: number;
    completedLessons: number;
    estimatedIncome: string;
    timeToProfit: string;
    xpReward: number;
    icon: any;
    gradient: string;
  };
  userType: 'guest' | 'free' | 'paid';
  onCourseSelect: (courseId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CompactCourseCard({
  course,
  userType,
  onCourseSelect,
  className,
  style
}: CompactCourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = course.icon;
  
  const progress = course.completedLessons > 0 
    ? (course.completedLessons / course.lessons) * 100 
    : 0;

  const getAccessLevel = () => {
    if (userType === 'guest') return 'none';
    if (userType === 'free') return 'preview';
    return 'full';
  };

  const accessLevel = getAccessLevel();
  const isLocked = accessLevel === 'none';
  const isPreview = accessLevel === 'preview';

  const keyMetric = progress > 0 
    ? `${Math.round(progress)}% Complete`
    : course.estimatedIncome;

  const handleExpand = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCourseStart = () => {
    if (!isLocked) {
      onCourseSelect(course.id);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleExpand();
    }
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer",
        "hover:shadow-lg border border-border/50",
        isExpanded ? "min-h-[320px] sm:min-h-[300px] shadow-xl" : "h-[120px]",
        isLocked && "opacity-75",
        className
      )}
      style={style}
      onClick={handleExpand}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${course.title} course card. ${isExpanded ? 'Press Enter to collapse' : 'Press Enter to expand'}`}
    >
      {/* Gradient background accent */}
      <div 
        className={cn(
          "absolute inset-0 opacity-5 bg-gradient-to-br",
          course.gradient
        )} 
      />
      
      {/* Main content container */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Collapsed state content */}
        <div className="flex items-center gap-3 sm:gap-4 min-h-0">
          {/* Course icon */}
          <div className={cn(
            "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
            "shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105",
            course.gradient
          )}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          {/* Course info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start sm:items-center gap-2 mb-1 flex-wrap sm:flex-nowrap">
              <h3 className="font-bold text-base sm:text-lg leading-tight min-w-0 flex-shrink">
                {course.title}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                <Badge variant="outline" className="text-xs">
                  {course.category}
                </Badge>
                {isPreview && (
                  <Badge variant="secondary" className="text-xs">
                    Preview
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Progress bar for collapsed state */}
            {progress > 0 && (
              <ProgressBar 
                progress={progress}
                className="mb-2 h-2"
                showPercentage={false}
              />
            )}
            
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-primary truncate flex-1">
                {keyMetric}
              </span>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Badge className="text-xs">{course.difficulty}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpand();
                  }}
                  aria-label={isExpanded ? "Collapse course details" : "Expand course details"}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded state content */}
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "opacity-100 mt-4 flex-1" : "opacity-0 h-0"
        )}>
          {/* Course description */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Course metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{course.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{course.estimatedIncome}</div>
                <div className="text-xs text-muted-foreground">Potential Income</div>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{course.timeToProfit}</div>
                <div className="text-xs text-muted-foreground">Time to Profit</div>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{course.xpReward} XP</div>
                <div className="text-xs text-muted-foreground">Completion Reward</div>
              </div>
            </div>
          </div>

          {/* Mentor info */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs sm:text-sm">{course.mentor}</div>
              <div className="text-xs text-muted-foreground truncate">{course.mentorBio}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-auto pt-2">
            <div className="relative">
              {/* Subtle glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg transition-all duration-300",
                "bg-gradient-to-r from-primary/10 to-primary/5 opacity-0",
                !isLocked && "group-hover:opacity-100"
              )} />
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCourseStart();
                }}
                disabled={isLocked}
                className={cn(
                  "w-full h-9 sm:h-11 text-xs sm:text-sm relative overflow-hidden transition-all duration-300",
                  "border-2 border-transparent rounded-lg text-white",
                  "bg-gradient-to-r from-slate-800 to-slate-900",
                  "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-slate-600/50 before:to-slate-700/50",
                  "before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-xor",
                  "hover:before:from-slate-500/60 hover:before:to-slate-600/60",
                  "hover:shadow-lg hover:shadow-slate-900/20",
                  "focus:ring-2 focus:ring-slate-600/30 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                  !isLocked && "hover:scale-[1.02] active:scale-[0.98]"
                )}
                aria-label={`${course.completedLessons > 0 ? 'Continue' : 'Start'} ${course.title} course`}
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-white" />
                <span className="truncate text-white">{course.completedLessons > 0 ? 'Continue' : 'Start Course'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Sign up to unlock</p>
            <p className="text-xs text-muted-foreground">Create an account to access this course</p>
          </div>
        </div>
      )}
    </Card>
  );
}
