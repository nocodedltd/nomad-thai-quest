import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, ArrowRight, Star } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

interface UpgradePromptProps {
  title?: string;
  description?: string;
  features?: string[];
  compact?: boolean;
  className?: string;
}

export function UpgradePrompt({ 
  title,
  description,
  features = [],
  compact = false,
  className = "" 
}: UpgradePromptProps) {
  const { userType, setUserType, isDevelopment } = useUser();
  
  // Don't show for paid users
  if (userType === 'paid') return null;
  
  const isGuest = userType === 'guest';
  
  const config = isGuest ? {
    title: title || 'Start Your Thailand Journey',
    description: description || 'Join thousands of digital nomads who have successfully relocated to Thailand',
    buttonText: 'Get Started Free',
    icon: Zap,
    gradient: 'from-blue-500 to-blue-600',
    targetType: 'free' as const,
    features: features.length > 0 ? features : [
      'Free roadmap access',
      'Basic income guides', 
      'Visa requirements',
      'Community access'
    ]
  } : {
    title: title || 'Unlock Your Full Potential',
    description: description || 'Get access to everything you need for a successful move to Thailand',
    buttonText: 'Upgrade to Premium',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    targetType: 'paid' as const,
    features: features.length > 0 ? features : [
      'All courses & masterclasses',
      'Advanced booking tools',
      'Direct mentor access',
      'Premium community',
      'Lifetime updates'
    ]
  };
  
  const Icon = config.icon;
  
  const handleUpgrade = () => {
    if (isDevelopment) {
      setUserType(config.targetType);
    } else {
      // Production upgrade flow
      console.log(`Upgrade to ${config.targetType}`);
    }
  };
  
  if (compact) {
    return (
      <Card className={`p-4 border-2 ${className}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{config.title}</h4>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
          <Button 
            size="sm"
            onClick={handleUpgrade}
            className={`bg-gradient-to-r ${config.gradient} hover:opacity-90`}
          >
            {isGuest ? 'Start Free' : 'Upgrade'}
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className={`p-6 text-center border-2 ${className}`}>
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{config.title}</h3>
      <p className="text-muted-foreground mb-4">{config.description}</p>
      
      {config.features.length > 0 && (
        <div className="space-y-2 mb-6 text-left max-w-sm mx-auto">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <Star className={`w-4 h-4 mr-3 text-yellow-500 fill-current`} />
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
          Dev Mode: Click to simulate {isGuest ? 'signup' : 'upgrade'}
        </Badge>
      )}
    </Card>
  );
}
