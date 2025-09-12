import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Map, DollarSign, FileText, Building, Target, Lock, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/user-context";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { userType, userState } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: Home, 
      access: ['guest', 'free', 'paid'] as const
    },
    { 
      path: "/roadmap", 
      label: "Roadmap", 
      icon: Map, 
      access: ['guest', 'free', 'paid'] as const
    },
    { 
      path: "/progress", 
      label: "Profile", 
      icon: User, 
      access: ['free', 'paid'] as const
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  const hasAccess = (item: typeof navItems[0]) => {
    return item.access.includes(userType);
  };

  const renderNavItem = (item: typeof navItems[0], isMobile = false) => {
    const Icon = item.icon;
    const hasUserAccess = hasAccess(item);
    
    if (hasUserAccess) {
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={isMobile ? () => setIsOpen(false) : undefined}
          className={cn(
            isMobile 
              ? "block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3 group"
              : "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden group",
            isActive(item.path)
              ? "bg-primary text-primary-foreground shadow-glow"
              : "text-muted-foreground hover:text-foreground hover:glass"
          )}
        >
          <Icon className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            isMobile ? "h-5 w-5" : "h-4 w-4"
          )} />
          {item.label}
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          )}
        </Link>
      );
    } else if (userType === 'guest') {
      // Show locked items for guests
      return (
        <div
          key={item.path}
          className={cn(
            isMobile 
              ? "block px-3 py-2 rounded-lg text-base font-medium flex items-center gap-3 opacity-50 cursor-not-allowed"
              : "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 opacity-50 cursor-not-allowed",
            "text-muted-foreground"
          )}
        >
          <Icon className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
          {item.label}
          <Lock className={cn(isMobile ? "h-4 w-4" : "h-3 w-3", "ml-1")} />
        </div>
      );
    }
    
    return null;
  };

  return (
    <nav className={cn(
      "nav-frosted fixed top-0 w-full z-50 backdrop-blur-lg transition-all duration-300",
      isScrolled 
        ? "h-12 glass shadow-lg border-b border-border/20" 
        : "h-16 glass-elevated"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex justify-between transition-all duration-300",
          isScrolled ? "h-12" : "h-16"
        )}>
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={cn(
                "font-heading font-bold text-primary transition-all duration-300",
                isScrolled ? "text-lg" : "text-xl"
              )}
            >
              <div className="flex items-center gap-2">
                🇹🇭 
                <span className={cn(
                  "transition-all duration-300",
                  isScrolled && "hidden sm:inline"
                )}>
                  Nomad Thai Quest
                </span>
                <span className={cn(
                  "sm:hidden",
                  !isScrolled && "hidden"
                )}>
                  NTQ
                </span>
                {userType !== 'guest' && (
                  <Badge variant="outline" className={cn(
                    "capitalize transition-all duration-300 badge-frosted",
                    isScrolled ? "text-xs px-1 py-0" : "text-xs"
                  )}>
                    {userType}
                  </Badge>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => renderNavItem(item, false))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary hover:glass transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 glass border-t border-border">
              {navItems.map((item) => renderNavItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;