import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				sidebar: {
					background: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				// Futuristic theme colors
				futuristic: {
					"bg-primary": "var(--futuristic-bg-primary)",
					"bg-secondary": "var(--futuristic-bg-secondary)",
					"bg-tertiary": "var(--futuristic-bg-tertiary)",
					"bg-elevated": "var(--futuristic-bg-elevated)",
					"bg-glass": "var(--futuristic-bg-glass)",
					"bg-overlay": "var(--futuristic-bg-overlay)",
					"text-primary": "var(--futuristic-text-primary)",
					"text-secondary": "var(--futuristic-text-secondary)",
					"text-tertiary": "var(--futuristic-text-tertiary)",
					"text-muted": "var(--futuristic-text-muted)",
					"text-disabled": "var(--futuristic-text-disabled)",
					"neon-blue": "var(--futuristic-neon-blue)",
					"neon-purple": "var(--futuristic-neon-purple)",
					"neon-green": "var(--futuristic-neon-green)",
					"neon-pink": "var(--futuristic-neon-pink)",
					"neon-orange": "var(--futuristic-neon-orange)",
					"neon-cyan": "var(--futuristic-neon-cyan)",
					"border-primary": "var(--futuristic-border-primary)",
					"border-secondary": "var(--futuristic-border-secondary)",
					"border-neon": "var(--futuristic-border-neon)",
					"border-focus": "var(--futuristic-border-focus)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				// Futuristic theme border radius
				"futuristic-sm": "var(--futuristic-radius-sm)",
				"futuristic-md": "var(--futuristic-radius-md)",
				"futuristic-lg": "var(--futuristic-radius-lg)",
				"futuristic-xl": "var(--futuristic-radius-xl)",
				"futuristic-full": "var(--futuristic-radius-full)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"slide-up": {
					"0%": { transform: "translateY(100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"slide-down": {
					"0%": { transform: "translateY(-100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"scale-out": {
					"0%": { transform: "scale(1)", opacity: "1" },
					"100%": { transform: "scale(0.95)", opacity: "0" },
				},
				"bounce-gentle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"pulse-glow": {
					"0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" },
					"50%": { boxShadow: "0 0 40px rgba(0, 255, 255, 0.8)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"neon-pulse": {
					"0%, 100%": { textShadow: "0 0 10px currentColor" },
					"50%": { textShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
				},
				"loading": {
					"0%": { backgroundPosition: "200% 0" },
					"100%": { backgroundPosition: "-200% 0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"slide-up": "slide-up 0.3s ease-out",
				"slide-down": "slide-down 0.3s ease-out",
				"fade-in": "fade-in 0.2s ease-out",
				"fade-out": "fade-out 0.2s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"scale-out": "scale-out 0.2s ease-out",
				"bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
				"float": "float 3s ease-in-out infinite",
				"neon-pulse": "neon-pulse 2s ease-in-out infinite",
				"loading": "loading 1.5s infinite",
			},
			transitionDuration: {
				"fast": "var(--futuristic-transition-fast)",
				"normal": "var(--futuristic-transition-normal)",
				"slow": "var(--futuristic-transition-slow)",
				"bounce": "var(--futuristic-transition-bounce)",
			},
			backdropBlur: {
				xs: "2px",
				sm: "4px",
				md: "8px",
				lg: "16px",
				xl: "24px",
			},
			boxShadow: {
				"futuristic-sm": "var(--futuristic-shadow-sm)",
				"futuristic-md": "var(--futuristic-shadow-md)",
				"futuristic-lg": "var(--futuristic-shadow-lg)",
				"futuristic-xl": "var(--futuristic-shadow-xl)",
				"futuristic-glow": "var(--futuristic-shadow-glow)",
				"glow-blue": "var(--futuristic-glow-blue)",
				"glow-purple": "var(--futuristic-glow-purple)",
				"glow-green": "var(--futuristic-glow-green)",
				"glow-pink": "var(--futuristic-glow-pink)",
			},
			backgroundImage: {
				"gradient-futuristic-primary": "var(--futuristic-gradient-primary)",
				"gradient-futuristic-secondary": "var(--futuristic-gradient-secondary)",
				"gradient-futuristic-accent": "var(--futuristic-gradient-accent)",
				"gradient-futuristic-hero": "var(--futuristic-gradient-hero)",
				"gradient-futuristic-glass": "var(--futuristic-gradient-glass)",
			},
			fontFamily: {
				display: ["Orbitron", "monospace"],
				heading: ["Rajdhani", "sans-serif"],
				body: ["Exo 2", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
