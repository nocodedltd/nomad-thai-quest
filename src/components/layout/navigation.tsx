import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LayoutDashboard, Map, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/overview", label: "Thailand Roadmap", icon: Map },
    { path: "/courses", label: "All Courses", icon: BookOpen },
    { path: "/course/amazon-fba", label: "Amazon FBA", icon: GraduationCap },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav-futuristic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-display font-bold neon-text animate-neon-pulse"
            >
              THE FARANG FORGE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden group",
                    isActive(item.path)
                      ? "bg-gradient-to-r from-futuristic-neon-blue to-futuristic-neon-purple text-futuristic-bg-primary shadow-glow-blue"
                      : "text-futuristic-text-secondary hover:text-futuristic-text-primary hover:bg-futuristic-bg-glass"
                  )}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  {item.label}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Link>
              );
            })}
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
              className="p-2 text-futuristic-text-primary hover:text-futuristic-neon-blue hover:bg-futuristic-bg-glass transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-futuristic-bg-glass backdrop-blur-md border-t border-futuristic-border-primary">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3 group",
                      isActive(item.path)
                        ? "bg-gradient-to-r from-futuristic-neon-blue to-futuristic-neon-purple text-futuristic-bg-primary shadow-glow-blue"
                        : "text-futuristic-text-secondary hover:text-futuristic-text-primary hover:bg-futuristic-bg-glass"
                    )}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;