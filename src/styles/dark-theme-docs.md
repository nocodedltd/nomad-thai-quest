# Dark Theme Documentation

## Overview

This project includes a comprehensive dark mode theme system built with CSS custom properties (variables) and Tailwind CSS. The theme provides deep neutral backgrounds, proper contrast ratios, and accessibility considerations.

## File Structure

```
src/styles/
├── dark-theme.css          # Main dark theme styles
└── dark-theme-docs.md     # This documentation
```

## Core Design Principles

### Color Palette
- **Deep Neutral Backgrounds**: `#121212` (primary), `#1e1e1e` (secondary), `#2d2d2d` (tertiary)
- **Light Text**: `#ffffff` (primary), `#e0e0e0` (secondary), `#b0b0b0` (tertiary)
- **Accessibility**: All color combinations meet WCAG AA contrast requirements
- **Thailand-Inspired Accents**: Maintained the original color scheme but optimized for dark mode

### Accessibility Features
- High contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text)
- Focus indicators with proper contrast
- Reduced motion support
- High contrast mode support
- Print-friendly styles

## CSS Variables

### Background Colors
```css
--dark-bg-primary: #121212;      /* Main background */
--dark-bg-secondary: #1e1e1e;    /* Card backgrounds */
--dark-bg-tertiary: #2d2d2d;     /* Interactive elements */
--dark-bg-elevated: #333333;     /* Elevated surfaces */
--dark-bg-overlay: rgba(0, 0, 0, 0.8); /* Overlays */
```

### Text Colors
```css
--dark-text-primary: #ffffff;    /* Primary text */
--dark-text-secondary: #e0e0e0;  /* Secondary text */
--dark-text-tertiary: #b0b0b0;   /* Tertiary text */
--dark-text-muted: #888888;      /* Muted text */
--dark-text-disabled: #666666;   /* Disabled text */
```

### Accent Colors
```css
--dark-primary: #4f9eff;         /* Primary blue */
--dark-secondary: #ffd54f;       /* Thailand gold */
--dark-accent: #4caf50;          /* Success green */
--dark-warning: #ff9800;         /* Warning orange */
--dark-destructive: #f44336;     /* Error red */
```

### Border Colors
```css
--dark-border-primary: #404040;   /* Primary borders */
--dark-border-secondary: #555555; /* Secondary borders */
--dark-border-focus: #4f9eff;    /* Focus indicators */
--dark-border-error: #f44336;    /* Error borders */
--dark-border-success: #4caf50;  /* Success borders */
```

### Shadow Colors
```css
--dark-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
--dark-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.6);
--dark-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.7);
--dark-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.8);
--dark-shadow-glow: 0 0 20px rgba(79, 158, 255, 0.3);
```

## Usage Examples

### Basic Component Styling

```css
/* Using CSS variables directly */
.my-component {
  background-color: var(--dark-bg-secondary);
  color: var(--dark-text-primary);
  border: 1px solid var(--dark-border-primary);
  border-radius: var(--dark-radius-md);
  box-shadow: var(--dark-shadow-md);
}

/* Using Tailwind classes */
.my-component {
  @apply bg-dark-bg-secondary text-dark-text-primary border-dark-border-primary rounded-dark-md shadow-dark-md;
}
```

### Button Variants

```css
/* Primary button */
.btn-primary {
  background: var(--dark-gradient-primary);
  color: var(--dark-text-primary);
  border-color: var(--dark-primary);
}

/* Secondary button */
.btn-secondary {
  background: var(--dark-gradient-secondary);
  color: var(--dark-text-primary);
  border-color: var(--dark-secondary);
}

/* Ghost button */
.btn-ghost {
  background: transparent;
  border-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--dark-bg-tertiary);
}
```

### Card Components

```css
.card {
  background-color: var(--dark-bg-secondary);
  border: 1px solid var(--dark-border-primary);
  border-radius: var(--dark-radius-lg);
  padding: 1.5rem;
  box-shadow: var(--dark-shadow-md);
  transition: all var(--dark-transition-normal);
}

.card:hover {
  box-shadow: var(--dark-shadow-lg);
  transform: translateY(-2px);
}
```

### Form Elements

```css
input, textarea, select {
  background-color: var(--dark-bg-secondary);
  color: var(--dark-text-primary);
  border: 1px solid var(--dark-border-primary);
  border-radius: var(--dark-radius-md);
  padding: 0.75rem;
  transition: all var(--dark-transition-fast);
}

input:focus, textarea:focus, select:focus {
  border-color: var(--dark-border-focus);
  box-shadow: 0 0 0 3px rgba(79, 158, 255, 0.1);
}
```

## Tailwind CSS Classes

### Background Colors
```html
<div class="bg-dark-bg-primary">Primary background</div>
<div class="bg-dark-bg-secondary">Secondary background</div>
<div class="bg-dark-bg-tertiary">Tertiary background</div>
<div class="bg-dark-bg-elevated">Elevated background</div>
```

### Text Colors
```html
<p class="text-dark-text-primary">Primary text</p>
<p class="text-dark-text-secondary">Secondary text</p>
<p class="text-dark-text-tertiary">Tertiary text</p>
<p class="text-dark-text-muted">Muted text</p>
<p class="text-dark-text-disabled">Disabled text</p>
```

### Border Colors
```html
<div class="border-dark-border-primary">Primary border</div>
<div class="border-dark-border-secondary">Secondary border</div>
<div class="border-dark-border-focus">Focus border</div>
<div class="border-dark-border-error">Error border</div>
<div class="border-dark-border-success">Success border</div>
```

### Shadows
```html
<div class="shadow-dark-sm">Small shadow</div>
<div class="shadow-dark-md">Medium shadow</div>
<div class="shadow-dark-lg">Large shadow</div>
<div class="shadow-dark-xl">Extra large shadow</div>
<div class="shadow-dark-glow">Glow shadow</div>
```

### Border Radius
```html
<div class="rounded-dark-sm">Small radius</div>
<div class="rounded-dark-md">Medium radius</div>
<div class="rounded-dark-lg">Large radius</div>
<div class="rounded-dark-xl">Extra large radius</div>
<div class="rounded-dark-full">Full radius</div>
```

### Gradients
```html
<div class="bg-gradient-primary">Primary gradient</div>
<div class="bg-gradient-secondary">Secondary gradient</div>
<div class="bg-gradient-accent">Accent gradient</div>
<div class="bg-gradient-warning">Warning gradient</div>
<div class="bg-gradient-destructive">Destructive gradient</div>
<div class="bg-gradient-hero">Hero gradient</div>
```

### Animations
```html
<div class="animate-slide-up">Slide up animation</div>
<div class="animate-slide-down">Slide down animation</div>
<div class="animate-fade-in">Fade in animation</div>
<div class="animate-fade-out">Fade out animation</div>
<div class="animate-scale-in">Scale in animation</div>
<div class="animate-scale-out">Scale out animation</div>
<div class="animate-bounce-gentle">Gentle bounce</div>
<div class="animate-pulse-glow">Pulse glow</div>
<div class="animate-loading">Loading animation</div>
```

### Transitions
```html
<div class="transition-fast">Fast transition</div>
<div class="transition-normal">Normal transition</div>
<div class="transition-slow">Slow transition</div>
```

## Component-Specific Styles

### Navigation
```css
nav {
  background-color: var(--dark-bg-secondary);
  border-bottom: 1px solid var(--dark-border-primary);
  backdrop-filter: blur(10px);
}

.nav-link {
  color: var(--dark-text-secondary);
  transition: color var(--dark-transition-fast);
}

.nav-link:hover {
  color: var(--dark-text-primary);
}

.nav-link.active {
  color: var(--dark-primary);
  background-color: var(--dark-bg-tertiary);
}
```

### Sidebar
```css
.sidebar {
  background-color: var(--dark-bg-secondary);
  border-right: 1px solid var(--dark-border-primary);
}

.sidebar-item {
  color: var(--dark-text-secondary);
  transition: all var(--dark-transition-fast);
}

.sidebar-item:hover {
  background-color: var(--dark-bg-tertiary);
  color: var(--dark-text-primary);
}

.sidebar-item.active {
  background-color: var(--dark-primary);
  color: var(--dark-text-primary);
}
```

### Modals and Overlays
```css
.modal-overlay {
  background-color: var(--dark-bg-overlay);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--dark-bg-elevated);
  border: 1px solid var(--dark-border-primary);
  border-radius: var(--dark-radius-lg);
  box-shadow: var(--dark-shadow-xl);
}
```

### Alerts
```css
.alert-info {
  background-color: rgba(79, 158, 255, 0.1);
  border-color: var(--dark-primary);
  color: var(--dark-primary-light);
}

.alert-success {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--dark-accent);
  color: var(--dark-accent-light);
}

.alert-warning {
  background-color: rgba(255, 152, 0, 0.1);
  border-color: var(--dark-warning);
  color: var(--dark-warning-light);
}

.alert-error {
  background-color: rgba(244, 67, 54, 0.1);
  border-color: var(--dark-destructive);
  color: var(--dark-destructive-light);
}
```

## Accessibility Features

### Focus Indicators
```css
*:focus-visible {
  outline: 2px solid var(--dark-border-focus);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .dark {
    --dark-border-primary: #ffffff;
    --dark-border-secondary: #ffffff;
    --dark-text-muted: #ffffff;
  }
}
```

### Print Styles
```css
@media print {
  .dark {
    --dark-bg-primary: #ffffff;
    --dark-bg-secondary: #ffffff;
    --dark-text-primary: #000000;
    --dark-text-secondary: #333333;
  }
}
```

## Best Practices

### 1. Use CSS Variables for Consistency
Always use the predefined CSS variables instead of hardcoding colors:
```css
/* ✅ Good */
background-color: var(--dark-bg-secondary);

/* ❌ Bad */
background-color: #1e1e1e;
```

### 2. Maintain Proper Contrast
Ensure text has sufficient contrast against backgrounds:
```css
/* ✅ Good - High contrast */
color: var(--dark-text-primary);
background-color: var(--dark-bg-primary);

/* ❌ Bad - Low contrast */
color: #888888;
background-color: #1e1e1e;
```

### 3. Use Appropriate Transitions
Apply smooth transitions for interactive elements:
```css
/* ✅ Good */
transition: all var(--dark-transition-fast);

/* ❌ Bad */
transition: all 0.3s;
```

### 4. Test Accessibility
Always test your components with:
- Screen readers
- Keyboard navigation
- High contrast mode
- Reduced motion preferences

### 5. Consider Loading States
Use the loading animation for async operations:
```css
.loading {
  background: linear-gradient(90deg, var(--dark-bg-tertiary) 25%, var(--dark-bg-elevated) 50%, var(--dark-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

## Extension Guidelines

### Adding New Colors
1. Define the color in the `:root` section
2. Add corresponding Tailwind classes in `tailwind.config.ts`
3. Document the new color in this file

### Adding New Components
1. Use existing CSS variables when possible
2. Follow the established naming conventions
3. Include hover and focus states
4. Test accessibility
5. Add to this documentation

### Performance Considerations
1. Use CSS variables for dynamic theming
2. Minimize the use of complex gradients
3. Use `will-change` sparingly
4. Consider using `transform` instead of `top/left` for animations

## Troubleshooting

### Common Issues

1. **Colors not updating**: Ensure the `.dark` class is applied to the root element
2. **Inconsistent styling**: Check that you're using CSS variables instead of hardcoded values
3. **Poor performance**: Reduce the number of box-shadow and backdrop-filter properties
4. **Accessibility issues**: Test with screen readers and keyboard navigation

### Debug Tools
- Use browser dev tools to inspect CSS variables
- Test with different contrast settings
- Validate with accessibility tools like axe-core

## Future Enhancements

### Planned Features
- [ ] Color scheme customization
- [ ] Additional animation presets
- [ ] Advanced gradient patterns
- [ ] Component-specific theme variations
- [ ] Automated accessibility testing

### Contributing
When adding new styles to the dark theme:
1. Follow the existing naming conventions
2. Test with multiple screen sizes
3. Ensure accessibility compliance
4. Update this documentation
5. Add examples for common use cases 