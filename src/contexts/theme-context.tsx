import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'frosted-glass' | 'cyberpunk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'frosted-glass' || savedTheme === 'cyberpunk')) {
      return savedTheme;
    }
    // Default to frosted glass theme
    return 'frosted-glass';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${theme}`);
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', theme);
    
    // Force re-render by updating the body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
    
    // Debug logging
    console.log('Theme changed to:', theme);
    console.log('Root classes:', root.className);
    console.log('Data theme:', root.getAttribute('data-theme'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'frosted-glass' ? 'cyberpunk' : 'frosted-glass');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 