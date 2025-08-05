import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning";
}

export function ProgressBar({ 
  progress, 
  className, 
  showPercentage = false, 
  size = "md",
  variant = "default"
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const variantClasses = {
    default: "bg-primary",
    success: "bg-accent",
    warning: "bg-warning"
  };

  return (
    <div className={cn("w-full", className)}>
      {showPercentage && (
        <div className="flex justify-between text-sm font-medium mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-muted rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            variantClasses[variant]
          )}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}