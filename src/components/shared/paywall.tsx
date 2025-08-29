import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Zap, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

interface PaywallProps {
  children: ReactNode;
  requiredLevel: 'free' | 'paid';
  title?: string;
  description?: string;
  features?: string[];
  className?: string;
}

export function Paywall({ 
  children, 
  requiredLevel, 
  title,
  description,
  features = [],
  className = "" 
}: PaywallProps) {
  const { userType, setUserType, isDevelopment } = useUser();
  
  const hasAccess = () => {
    if (requiredLevel === 'free') return userType !== 'guest';
    if (requiredLevel === 'paid') return userType === 'paid';
    return true;
  };
  
  if (hasAccess()) {
    return <>{children}</>;
  }
  
  const upgradeConfig = {
    free: {
      title: title || 'Create Your Free Account',
      description: description || 'Sign up for free to access this content and start your Thailand journey',
      buttonText: 'Sign Up Free',
      icon: Zap,
      gradient: 'from-blue-500 to-blue-600',
      features: features.length > 0 ? features : [
        'Access to roadmap phases 1-2',
        'Basic income strategies',
        'Tourist visa guide',
        'Community previews'
      ]
    },
    paid: {
      title: title || 'Upgrade to Premium',
      description: description || 'Unlock all features and get the complete Thailand relocation toolkit',
      buttonText: 'Upgrade to Premium',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-500',
      features: features.length > 0 ? features : [
        'All 5 roadmap phases unlocked',
        'Complete course library',
        'Advanced booking tools',
        'Direct mentor access',
        'Premium community access'
      ]
    }
  };
  
  const config = upgradeConfig[requiredLevel];
  const Icon = config.icon;
  
  const handleUpgrade = () => {
    if (isDevelopment) {
      // In development, just switch user type for testing
      setUserType(requiredLevel === 'free' ? 'free' : 'paid');
    } else {
      // In production, this would handle real upgrade flow
      console.log(`Upgrade to ${requiredLevel}`);
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none opacity-50">
        {children}
      </div>
      
      {/* Paywall overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Card className="max-w-md mx-4 p-6 text-center border-2">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">{config.title}</h3>
          <p className="text-muted-foreground mb-4">{config.description}</p>
          
          {config.features.length > 0 && (
            <div className="space-y-2 mb-6">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient} mr-3`} />
                  {feature}
                </div>
              ))}
            </div>
          )}
          
          <Button 
            onClick={handleUpgrade}
            className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90`}
            size="lg"
          >
            {config.buttonText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          {isDevelopment && (
            <Badge variant="outline" className="mt-3">
              Dev Mode: Click to test upgrade
            </Badge>
          )}
        </Card>
      </div>
    </div>
  );
}
