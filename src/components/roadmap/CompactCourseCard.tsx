import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  ChevronDown,
  ChevronUp,
  Play,
  MessageCircle,
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
  onMentorContact?: (mentorName: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CompactCourseCard({
  course,
  userType,
  onCourseSelect,
  onMentorContact,
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

  const handleMentorContact = () => {
    if (onMentorContact && !isLocked) {
      onMentorContact(course.mentor);
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
        isExpanded ? "h-[300px] shadow-xl" : "h-[120px]",
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
        <div className="flex items-center gap-4 min-h-0">
          {/* Course icon */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
            "shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105",
            course.gradient
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Course info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg leading-tight truncate">
                {course.title}
              </h3>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {course.category}
              </Badge>
              {isPreview && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  Preview
                </Badge>
              )}
            </div>
            
            {/* Progress bar for collapsed state */}
            {progress > 0 && (
              <ProgressBar 
                progress={progress}
                className="mb-2 h-2"
                showPercentage={false}
              />
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {keyMetric}
              </span>
              <div className="flex items-center gap-2">
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
          "transition-all duration-300 ease-in-out",
          isExpanded ? "opacity-100 mt-4" : "opacity-0 h-0 overflow-hidden"
        )}>
          {/* Course description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Course metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{course.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{course.estimatedIncome}</div>
                <div className="text-xs text-muted-foreground">Potential Income</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{course.timeToProfit}</div>
                <div className="text-xs text-muted-foreground">Time to Profit</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{course.xpReward} XP</div>
                <div className="text-xs text-muted-foreground">Completion Reward</div>
              </div>
            </div>
          </div>

          {/* Mentor info */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{course.mentor}</div>
              <div className="text-xs text-muted-foreground truncate">{course.mentorBio}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            {userType === 'paid' && onMentorContact && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMentorContact();
                }}
                className="flex-1 h-11"
                aria-label={`Contact mentor ${course.mentor}`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Mentor
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCourseStart();
              }}
              disabled={isLocked}
              className="flex-1 h-11"
              aria-label={`${course.completedLessons > 0 ? 'Continue' : 'Start'} ${course.title} course`}
            >
              <Play className="w-4 h-4 mr-2" />
              {course.completedLessons > 0 ? 'Continue' : 'Start Course'}
            </Button>
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
