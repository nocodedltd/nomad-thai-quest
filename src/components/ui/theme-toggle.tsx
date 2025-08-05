import { Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 px-0 relative overflow-hidden group bg-futuristic-bg-glass hover:bg-futuristic-bg-elevated border border-futuristic-border-primary hover:border-futuristic-neon-blue transition-all duration-300"
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-futuristic-neon-blue group-hover:text-futuristic-neon-cyan transition-all duration-300 group-hover:scale-110" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-futuristic-neon-blue group-hover:text-futuristic-neon-cyan transition-all duration-300 group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-futuristic-neon-blue/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 