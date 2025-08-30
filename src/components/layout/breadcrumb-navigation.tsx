import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
}

export function BreadcrumbNavigation({ 
  items, 
  className, 
  separator = <ChevronRight className="w-4 h-4 text-muted-foreground" />,
  showHome = true 
}: BreadcrumbNavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {showHome && (
          <li className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-muted-foreground hover:text-foreground"
              onClick={() => window.location.href = '/'}
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Button>
            {items.length > 0 && (
              <span className="mx-2">{separator}</span>
            )}
          </li>
        )}
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.current ? (
              <span className="font-medium text-foreground truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-muted-foreground hover:text-foreground font-normal"
                onClick={item.onClick}
              >
                <span className="truncate max-w-[150px]">{item.label}</span>
              </Button>
            )}
            
            {index < items.length - 1 && (
              <span className="mx-2">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
