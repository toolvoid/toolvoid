# Resume Builder UI - Professional React Component

A world-class, production-ready Resume Builder featuring a split-screen design, live A4 preview, dark/light mode, and PDF export capabilities.

## Features

### 🎨 **Split-Screen Design**
- **Left Side (Editor)**: Scrollable form area with tabbed navigation
  - 6 sections: Personal, Experience, Education, Skills, Projects, Certifications
  - Progress bar with completion percentage
  - Real-time validation and empty states
  
- **Right Side (A4 Preview)**: Fixed, non-editable A4 paper preview
  - Professional resume formatting
  - Live updates as user types
  - Adjustable zoom level (50% - 200%)
  - Responsive, hides on mobile

### 🌓 **Dark/Light Mode**
- Toggle between dark (Slate-900) and light modes
- Professional color palettes using Tailwind CSS
- Smooth transitions and consistent theming

### 📊 **Progress Tracking**
- Calculates completion percentage across all sections
- Visual progress bar with color gradient
- Encourages users to fill all sections before download

### 📋 **Form Editors**
- **Personal Information**: Name, title, email, phone, location, social links, summary
- **Experience**: Company, position, dates, current status, description
- **Education**: School, degree, field of study, graduation year
- **Skills**: Category-based skill organization
- **Projects**: Project title and description (extensible)
- **Certifications**: Certification details (extensible)

### 📄 **A4 Preview**
- Accurate A4 dimensions (210mm × 297mm)
- Professional typography and spacing
- Empty state messages when sections are incomplete
- Maintains proper print formatting

### 🔍 **Zoom Controls**
- Zoom In/Out buttons
- Visual zoom level indicator
- Range: 50% - 200%

### ⬇️ **PDF Download**
- One-click PDF export
- Loading state indicator
- Disabled until profile is at least 50% complete
- Maintains formatting and styling

## Installation

```bash
npm install lucide-react jspdf html2canvas
```

### Dependencies
- **React** 18+
- **Tailwind CSS** (for styling)
- **lucide-react** (for icons)
- **jspdf** (for PDF generation - optional)
- **html2canvas** (for PDF generation - optional)

## Usage

### Basic Implementation

```jsx
import { ResumeBuilderUI } from './components/ResumBuilderUI'

export default function App() {
  const handleDownloadPDF = async (resumeData) => {
    console.log('Resume data:', resumeData)
    // Implement your PDF generation logic here
  }

  return (
    <ResumeBuilderUI onDownloadPDF={handleDownloadPDF} />
  )
}
```

### With Custom Initial Data

```jsx
const initialData = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Senior Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced full-stack developer...',
    photo: null,
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: ''
  },
  experience: [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Engineer',
      startDate: '2022-01',
      endDate: '2024-12',
      current: true,
      description: 'Led development of...'
    }
  ],
  education: [],
  skills: [],
  projects: [],
  certifications: []
}

<ResumeBuilderUI initialData={initialData} onDownloadPDF={handlePDF} />
```

### Resume Data Structure

```typescript
interface ResumeData {
  personal: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    summary: string
    photo: string | null
    linkedin: string
    github: string
    website: string
  }
  experience: Array<{
    id: number
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: number
    school: string
    degree: string
    field: string
    graduationYear: string
  }>
  skills: Array<{
    id: number
    category: string
    items: string[]
  }>
  projects: Array<{
    id: number
    title: string
    description: string
  }>
  certifications: Array<{
    id: number
    title: string
    description: string
  }>
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialData` | `ResumeData` | `null` | Pre-populated resume data |
| `onDownloadPDF` | `async (data) => void` | `null` | Callback function when user clicks download |

## Features Breakdown

### 📊 Progress Calculation
The progress bar calculates completion based on:
- **Personal Info (40%)**: First name, last name, email, title
- **Experience (25%)**: Each entry adds 8%
- **Education (15%)**: Each entry adds 7.5%
- **Skills (15%)**: Each skill adds 3%

### 🎨 Styling System
- **Colors**: Uses Tailwind slate palette (slate-50 to slate-950)
- **Typography**: System fonts for performance
- **Spacing**: Consistent 16px and 24px spacing
- **Shadows**: Tailwind shadow utilities for depth
- **Borders**: Subtle, professional borders

### ♿ Accessibility
- Semantic HTML structure
- ARIA labels on buttons
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Form labels properly associated with inputs

## Customization

### Change Color Scheme

Replace `blue` and `slate` classes with your preferred Tailwind colors:

```jsx
// Example: Using indigo instead of blue
className="bg-indigo-600 text-indigo-400 focus:ring-indigo-500"
```

### Modify Tab Sections

Edit the tabs array in the main component:

```jsx
const tabs = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  // Add more tabs here
]
```

### Custom Preview Template

Replace the `ResumePreview` component to customize the A4 output:

```jsx
function CustomResumePreview({ data, isDark }) {
  // Your custom preview JSX
}
```

## PDF Generation Example

Using jsPDF and html2canvas:

```jsx
async function generatePDF(resumeData) {
  const { jsPDF } = await import('jspdf')
  const html2canvas = await import('html2canvas')

  // Create resume HTML
  const element = document.createElement('div')
  element.innerHTML = buildResumeHTML(resumeData)
  
  // Convert to canvas
  const canvas = await html2canvas(element)
  
  // Create PDF
  const pdf = new jsPDF('portrait', 'mm', 'a4')
  pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0, 210, 297)
  pdf.save(`${resumeData.personal.firstName}_resume.pdf`)
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design adapts)

## Performance Optimizations

- Memoized progress calculation
- Efficient re-renders using React hooks
- Lazy component loading for preview
- Minimal DOM manipulation
- CSS classes instead of inline styles where possible

## Responsive Behavior

| Screen Size | Layout |
|-------------|--------|
| Mobile (< 640px) | Single column, preview hidden |
| Tablet (640px - 1024px) | Editor on left takes full width, preview hidden |
| Desktop (> 1024px) | Full split-screen with 45/55% split |

## Files Included

- **ResumBuilderUI.jsx** - Main builder component
- **ResumeBuilderPage.jsx** - Page wrapper with PDF generation
- **Documentation** - This guide

## Example Usage in Next.js

```tsx
// app/resume-builder/page.tsx
'use client'

import { ResumeBuilderUI } from '@/components/ResumeBuilderUI'
import { generateResumePDF } from '@/lib/pdf'

export default function ResumePage() {
  return (
    <ResumeBuilderUI
      onDownloadPDF={generateResumePDF}
    />
  )
}
```

## Troubleshooting

### Preview not updating
- Check browser console for errors
- Ensure React state is properly updating
- Verify Tailwind CSS is properly configured

### PDF download fails
- Install jsPDF and html2canvas: `npm install jspdf html2canvas`
- Check browser console for specific errors
- Ensure resume has at least 50% completion

### Dark mode not working
- Verify Tailwind dark mode configuration
- Check if `isDark` state is properly toggled
- Ensure CSS classes have both light and dark variants

## Future Enhancements

- [ ] Template selection within builder
- [ ] Spell checker and grammar suggestions
- [ ] ATS score checker
- [ ] Cloud sync and backup
- [ ] Collaborative editing
- [ ] Multi-language support
- [ ] Export to LinkedIn
- [ ] Cover letter builder

## License

Free for personal and commercial use

## Support

For issues or questions, refer to the component source code or create an issue in your repository.

---

**Built with ❤️ for developers, designers, and job seekers everywhere.**
