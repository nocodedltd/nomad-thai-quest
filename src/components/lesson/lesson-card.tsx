import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Award 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: "video" | "quiz" | "interactive";
  status: "locked" | "available" | "in-progress" | "completed";
  progress?: number; // 0-100
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  className?: string;
  onStart?: () => void;
}

export function LessonCard({
  id,
  title,
  description,
  duration,
  type,
  status,
  progress = 0,
  difficulty,
  xpReward,
  className,
  onStart
}: LessonCardProps) {
  const typeIcons = {
    video: Play,
    quiz: BookOpen,
    interactive: Award
  };

  const Icon = typeIcons[type];

  const difficultyColors = {
    beginner: "text-accent",
    intermediate: "text-warning", 
    advanced: "text-destructive"
  };

  const statusConfig = {
    locked: {
      icon: Lock,
      buttonText: "Locked",
      buttonVariant: "outline" as const,
      disabled: true,
      cardClass: "opacity-60"
    },
    available: {
      icon: Play,
      buttonText: "Start",
      buttonVariant: "lesson" as const,
      disabled: false,
      cardClass: "hover:shadow-md"
    },
    "in-progress": {
      icon: Play,
      buttonText: "Continue",
      buttonVariant: "warning" as const,
      disabled: false,
      cardClass: "border-warning/50 bg-warning/5"
    },
    completed: {
      icon: CheckCircle,
      buttonText: "Review",
      buttonVariant: "success" as const,
      disabled: false,
      cardClass: "border-accent/50 bg-accent/5"
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 relative overflow-hidden",
      config.cardClass,
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            status === "completed" ? "bg-accent text-accent-foreground" :
            status === "in-progress" ? "bg-warning text-warning-foreground" :
            "bg-primary/10 text-primary"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          
          <div>
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
        
        <StatusIcon className={cn(
          "w-5 h-5",
          status === "completed" ? "text-accent" :
          status === "locked" ? "text-muted-foreground" :
          "text-primary"
        )} />
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {status === "in-progress" && (
        <div className="mb-4">
          <ProgressBar 
            progress={progress}
            size="sm"
            variant="warning"
            showPercentage={true}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Lesson {id}
        </div>
        
        <Button
          variant={config.buttonVariant}
          size="sm"
          disabled={config.disabled}
          onClick={onStart}
        >
          {config.buttonText}
        </Button>
      </div>
    </Card>
  );
}