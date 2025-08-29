import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck, Crown, Settings, X, Move } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export function DevUserSwitcher() {
  const { userType, setUserType, isDevelopment } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const toggleRef = useRef<HTMLDivElement>(null);
  
  // Hide completely in production
  if (!isDevelopment) return null;
  
  const userTypeConfig = {
    guest: { icon: User, label: 'Guest', color: 'bg-gray-500' },
    free: { icon: UserCheck, label: 'Free', color: 'bg-blue-500' },
    paid: { icon: Crown, label: 'Paid', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  };

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Collapsed button
  if (!isExpanded) {
    return (
      <div
        ref={toggleRef}
        className="fixed z-50 cursor-move select-none"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          size="sm"
          onClick={() => setIsExpanded(true)}
          className={`rounded-full shadow-lg border-2 transition-all hover:scale-110 ${userTypeConfig[userType].color}`}
          title={`Dev Mode: ${userTypeConfig[userType].label} User`}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Expanded panel
  return (
    <div
      ref={toggleRef}
      className="fixed z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl max-w-xs cursor-move select-none"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header with drag handle and close */}
      <div className="flex items-center justify-between p-3 pb-2 border-b">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-muted-foreground" />
          <div className="text-xs font-medium text-muted-foreground">
            👤 Dev Preview
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsExpanded(false)}
          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      
      {/* User type buttons */}
      <div className="p-3 pt-2">
        <div className="flex gap-1 mb-3">
          {(['guest', 'free', 'paid'] as const).map((type) => {
            const config = userTypeConfig[type];
            const Icon = config.icon;
            
            return (
              <Button
                key={type}
                size="sm"
                variant={userType === type ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  setUserType(type);
                }}
                className={`capitalize transition-all text-xs ${
                  userType === type ? config.color : ''
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </Button>
            );
          })}
        </div>
        
        <Badge 
          variant="secondary" 
          className={`text-xs w-full justify-center ${userTypeConfig[userType].color}`}
        >
          Currently: {userTypeConfig[userType].label}
        </Badge>
        
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Drag to move • Click gear to collapse
        </div>
      </div>
    </div>
  );
}
