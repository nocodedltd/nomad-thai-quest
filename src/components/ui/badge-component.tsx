import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgeComponentProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  earned?: boolean;
  className?: string;
}

export function BadgeComponent({ 
  icon: Icon, 
  title, 
  description, 
  earned = false, 
  className 
}: BadgeComponentProps) {
  return (
    <div className={cn(
      "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
      earned 
        ? "bg-accent/10 border-accent text-accent shadow-lg animate-pulse-glow" 
        : "bg-muted/30 border-muted text-muted-foreground",
      className
    )}>
      <div className={cn(
        "p-3 rounded-full mb-2 transition-all",
        earned 
          ? "bg-accent text-accent-foreground shadow-md" 
          : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-sm text-center">{title}</h3>
      {description && (
        <p className="text-xs text-center mt-1 opacity-80">{description}</p>
      )}
    </div>
  );
}