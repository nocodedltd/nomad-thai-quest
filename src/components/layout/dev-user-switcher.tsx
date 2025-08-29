import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck, Crown } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export function DevUserSwitcher() {
  const { userType, setUserType, isDevelopment } = useUser();
  
  // Hide completely in production
  if (!isDevelopment) return null;
  
  const userTypeConfig = {
    guest: { icon: User, label: 'Guest', color: 'bg-gray-500' },
    free: { icon: UserCheck, label: 'Free', color: 'bg-blue-500' },
    paid: { icon: Crown, label: 'Paid', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg max-w-xs">
      <div className="text-xs font-medium mb-2 text-muted-foreground">
        👤 Development Preview Mode
      </div>
      
      <div className="flex gap-1 mb-3">
        {(['guest', 'free', 'paid'] as const).map((type) => {
          const config = userTypeConfig[type];
          const Icon = config.icon;
          
          return (
            <Button
              key={type}
              size="sm"
              variant={userType === type ? 'default' : 'outline'}
              onClick={() => setUserType(type)}
              className={`capitalize transition-all ${
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
        Currently viewing as: {userTypeConfig[userType].label}
      </Badge>
      
      <div className="text-xs text-muted-foreground mt-2 text-center">
        Switch between user types to test different experiences
      </div>
    </div>
  );
}
