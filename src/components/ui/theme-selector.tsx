import React from 'react';
import { Sparkles, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'frosted-glass' as const,
      name: 'Frosted Glass',
      description: 'Modern glassmorphism design with translucent panels and soft gradients',
      icon: Sparkles,
      isDefault: true,
    },
    {
      id: 'cyberpunk' as const,
      name: 'Cyberpunk',
      description: 'Futuristic neon aesthetic with bold colors and glowing effects',
      icon: Moon,
      isDefault: false,
    },
  ];

  return (
    <Card className="card-frosted-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Theme Settings
        </CardTitle>
        <CardDescription>
          Choose your preferred visual theme for the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.id;
            
            return (
              <Button
                key={themeOption.id}
                variant={isSelected ? "glass-primary" : "glass"}
                className={cn(
                  "h-auto p-4 justify-start text-left",
                  isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                onClick={() => setTheme(themeOption.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isSelected 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted/50 text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{themeOption.name}</span>
                      {themeOption.isDefault && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {themeOption.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Your theme preference is automatically saved and will be applied across all devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
