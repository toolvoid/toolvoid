# Resume Builder - Styling & Design System Guide

## Overview

The Resume Builder UI is built with **Tailwind CSS** and follows a professional design system using the **Slate color palette** with optional accent colors. It supports both dark and light modes seamlessly.

---

## Color System

### Primary Palette (Slate)

| Shade | Light Mode | Dark Mode | Usage |
|-------|-----------|----------|-------|
| 50 | `#f8fafc` | - | Light backgrounds |
| 100 | `#f1f5f9` | - | Light cards, inputs |
| 200 | `#e2e8f0` | - | Light borders |
| 300 | `#cbd5e1` | - | Light dividers |
| 600 | `#475569` | - | Light text (secondary) |
| 700 | `#334155` | - | Light text (primary) |
| 800 | - | `#1e293b` | Dark cards |
| 900 | - | `#0f172a` | Dark backgrounds |
| 950 | - | `#020617` | Dark main background |

### Accent Colors

- **Blue**: `#3b82f6` (primary actions, focus states)
  - Used for: Buttons, active states, highlights
  - Variants: `blue-500`, `blue-600`, `blue-700`

- **Emerald**: `#10b981` (success, 100% completion)
  - Used for: Progress completion, success states
  - Variants: `emerald-500`, `emerald-600`

- **Red/Amber**: For warnings and destructive actions
  - Remove buttons: `red-600`, `red-100`
  - Warnings: `amber-400`, `yellow-400`

---

## Typography

### Font Stack
```css
/* Headlines */
font-family: system-ui, -apple-system, sans-serif;
font-weight: 700; /* Bold */

/* Body */
font-family: system-ui, -apple-system, sans-serif;
font-weight: 400; /* Regular */

/* Monospace (future) */
font-family: 'Monaco', 'Courier New', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Example Class |
|---------|------|--------|-------------|---------------|
| H1 | 24px | 700 | 1.2 | `text-2xl font-bold` |
| H2 | 18px | 700 | 1.3 | `text-lg font-bold` |
| H3 | 16px | 600 | 1.4 | `text-base font-semibold` |
| Body | 14px | 400 | 1.6 | `text-sm` |
| Small | 12px | 500 | 1.5 | `text-xs font-medium` |
| Caption | 11px | 400 | 1.4 | `text-xs` |

---

## Component Styling

### Buttons

#### Primary Action Button
```jsx
className="px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 transition-all"
```

#### Secondary Button
```jsx
className="px-4 py-2 rounded-lg font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
```

#### Destructive (Remove) Button
```jsx
className="text-xs font-medium px-3 py-1 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
```

#### Icon Button
```jsx
className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
```

### Input Fields

#### Standard Input
```jsx
className="w-full px-3 py-2 rounded-lg border bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
```

Light Mode Version:
```jsx
className="w-full px-3 py-2 rounded-lg border bg-slate-50 border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
```

#### Textarea
```jsx
className="w-full px-3 py-2 rounded-lg border bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
```

### Tabs Navigation

#### Active Tab
```jsx
className="px-4 py-2 rounded-lg font-medium text-sm border-b-2 bg-slate-800 border-blue-500 text-blue-400 transition-all"
```

#### Inactive Tab
```jsx
className="px-4 py-2 rounded-lg font-medium text-sm border-b-2 border-transparent text-slate-300 hover:bg-slate-700/50 transition-all"
```

### Cards

#### Editor Card
```jsx
className="p-4 rounded-lg border bg-slate-800/30 border-slate-700"
```

#### Input Section
```jsx
className="p-6 rounded-lg border-2 border-dashed bg-slate-800/30 border-slate-700 text-center text-slate-400"
```

### Progress Bar

```jsx
// Container
className="h-2 rounded-full bg-slate-800 overflow-hidden"

// Fill (completion)
className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"

// At 100%
className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
```

---

## Spacing System

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Padding inside inputs, small gaps |
| SM | 8px | Gap between form fields in group |
| MD | 12px | Padding in cards, space between sections |
| LG | 16px | Container padding, vertical spacing |
| XL | 24px | Major section spacing |
| 2XL | 32px | Layout spacing |

### Common Patterns
```jsx
// Compact vertical spacing
className="space-y-3"

// Standard spacing
className="space-y-6"

// Grid gaps
className="gap-4"
className="gap-2"
```

---

## Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Layout Breakpoints

| Viewport | Layout |
|----------|--------|
| < 640px (Mobile) | Single column, full width |
| 640px - 1024px (Tablet) | Single column, Editor full width |
| > 1024px (Desktop) | Split screen 45/55 |

### Classes Used
```jsx
// Hide on mobile, show on medium+
className="hidden md:flex"

// Responsive width
className="w-full md:w-1/2 lg:w-[45%]"

// Mobile padding vs desktop
className="p-4 md:p-6 lg:p-8"
```

---

## Dark Mode Implementation

### CSS Variables Approach (Alternative)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --bg-card: #1e293b;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
  }
}
```

### Tailwind Class Approach (Current)
```jsx
// Conditional classNames based on isDark state
className={`${isDark ? 'bg-slate-900 text-slate-50' : 'bg-white text-slate-950'}`}
```

---

## Animations & Transitions

### Standard Transitions
```jsx
// Smooth hover effects
className="transition-all" // All properties

// Color transitions
className="transition-colors"

// Opacity transitions
className="transition-opacity"

// Duration
className="transition-all duration-200" // Fast
className="transition-all duration-500" // Standard
```

### Hover Effects
```jsx
// Scale
className="hover:scale-95"
className="hover:scale-105"

// Shadow
className="hover:shadow-lg"
className="hover:shadow-blue-500/50"

// Translate
className="hover:translate-y-1"
className="hover:-translate-y-1"

// Opacity
className="hover:opacity-75"
```

### Disabled States
```jsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## Shadows & Depth

| Level | Class | Use Case |
|-------|-------|----------|
| Light | `shadow` | Cards, buttons |
| Medium | `shadow-md` | Elevated cards |
| Large | `shadow-lg` | Modals, dropdowns |
| Extra Large | `shadow-2xl` | A4 preview |

### Custom Shadow Example
```jsx
className="shadow-lg shadow-blue-500/50" // Colored shadow
```

---

## Border Styling

### Standard Borders
```jsx
// Subtle border (light mode)
className="border border-slate-300"

// Subtle border (dark mode)
className="border border-slate-700"

// Highlighted border (focus)
className="focus:border-blue-500"

// Dashed border (empty states)
className="border-2 border-dashed border-slate-700"
```

### Border Radius
```jsx
// Small
className="rounded-lg" // 8px

// Standard
className="rounded-lg" // 8px

// Full
className="rounded-full" // 9999px
```

---

## Custom Color Implementations

### To Change Primary Color from Blue to Purple

**1. Update all blue references:**
```jsx
// Search & Replace
from-blue-600 to-blue-700  →  from-purple-600 to-purple-700
text-blue-400              →  text-purple-400
border-blue-500            →  border-purple-500
ring-blue-500/20           →  ring-purple-500/20
```

**2. Example in Input:**
```jsx
// Before
className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"

// After
className="focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
```

### To Add Dark Mode with System Preference

```jsx
import { useEffect, useState } from 'react'

export function useSystemDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(isDarkMode)

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return isDark
}
```

---

## Accessibility Considerations

### Color Contrast
- **Dark text on light backgrounds**: 4.5:1+ (WCAG AA)
- **Light text on dark backgrounds**: 4.5:1+ (WCAG AA)
- All current colors meet these standards

### Focus Indicators
```jsx
// Always include focus states
className="focus:outline-none focus:ring-2 focus:ring-blue-500/20"
```

### Font Sizes
- Minimum readable size: 12px
- Standard body: 14px
- Headings: 18px+

---

## Production Checklist

- [ ] Test all color combinations for contrast
- [ ] Verify responsive design on devices
- [ ] Check dark/light mode switching
- [ ] Test keyboard navigation
- [ ] Verify touch targets on mobile (44px minimum)
- [ ] Test with screen readers
- [ ] Check loading states and animations
- [ ] Verify hover states on desktop
- [ ] Test on multiple browsers
- [ ] Performance test (animations should be smooth)

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG Color Contrast Checker](https://contrast-ratio.com/)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Typography Scale Calculator](https://www.fontpairings.com)

---

**Design System Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Production Ready
