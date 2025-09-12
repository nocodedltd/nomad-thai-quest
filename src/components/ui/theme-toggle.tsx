import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 px-0 relative overflow-hidden group glass hover:glass-elevated border border-border hover:border-primary transition-all duration-300"
    >
      {theme === 'frosted-glass' ? (
        <Sparkles className="h-[1.2rem] w-[1.2rem] text-primary group-hover:text-primary-light transition-all duration-300 group-hover:scale-110" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary group-hover:text-primary-light transition-all duration-300 group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 