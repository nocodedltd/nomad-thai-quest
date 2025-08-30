import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  isVisible?: boolean;
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

const positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6", 
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6"
};

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-14 w-14", 
  lg: "h-16 w-16"
};

const variantClasses = {
  default: "bg-primary hover:bg-primary/90 text-primary-foreground",
  secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
  success: "bg-green-500 hover:bg-green-600 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  destructive: "bg-red-500 hover:bg-red-600 text-white"
};

export function FloatingActionButton({
  onClick,
  children,
  className,
  size = "md",
  position = "bottom-right",
  isVisible = true,
  variant = "default"
}: FloatingActionButtonProps) {
  if (!isVisible) return null;

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed z-40 rounded-full shadow-lg",
        "transform transition-all duration-300 hover:scale-110",
        "flex items-center justify-center",
        positionClasses[position],
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Button>
  );
}
