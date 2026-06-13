# Resume Builder - Implementation Guide

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
npm install tailwindcss lucide-react jspdf html2canvas
# or
yarn add tailwindcss lucide-react jspdf html2canvas
# or
pnpm add tailwindcss lucide-react jspdf html2canvas
```

### Step 2: Ensure Tailwind CSS is Configured

**tailwind.config.js**
```js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**globals.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 3: Copy Component Files

Copy these files to your project:
- `ResumBuilderUI.jsx` → `app/resume/components/ResumBuilderUI.jsx`
- `ResumeBuilderPage.jsx` → `app/resume/ResumeBuilderPage.jsx`

### Step 4: Create Route

**app/resume/page.tsx** (or .jsx)
```tsx
import ResumeBuilderPage from './ResumeBuilderPage'

export const metadata = {
  title: 'Resume Builder',
  description: 'Build your professional resume',
}

export default function Page() {
  return <ResumeBuilderPage />
}
```

### Step 5: Done! 🎉

Navigate to `/resume` and start building!

---

## Advanced Setup

### Option A: With Custom PDF Generation

If you want server-side PDF generation:

**1. Create API Route** (`app/api/generate-pdf/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, PDFPage } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const { resumeData } = await request.json()
    
    // Your PDF generation logic here
    // This could use pdf-lib, puppeteer, etc.
    
    // Return PDF as blob
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.pdf"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

**2. Update ResumeBuilderPage.jsx**
```jsx
async function generatePDF(resumeData) {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeData })
    })

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume_${Date.now()}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('PDF generation failed:', error)
  }
}
```

### Option B: With Database Storage

**1. Create Schema** (Prisma example)
```prisma
model Resume {
  id        String   @id @default(cuid())
  userId    String
  data      Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
}
```

**2. Create API** (`app/api/resumes/save/route.ts`)
```typescript
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const { resumeData, userId } = await request.json()
  
  const resume = await db.resume.create({
    data: {
      userId,
      data: resumeData
    }
  })
  
  return Response.json(resume)
}
```

**3. Load Resume** in component
```jsx
useEffect(() => {
  async function loadResume() {
    const response = await fetch(`/api/resumes/${resumeId}`)
    const resume = await response.json()
    setResumeData(resume.data)
  }
  loadResume()
}, [])
```

### Option C: With Authentication

**1. Protect Route** (with Middleware)
```typescript
// middleware.ts
import { auth } from '@/auth'

export async function middleware(request: Request) {
  const session = await auth()
  
  if (!session && request.nextUrl.pathname.startsWith('/resume')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/resume/:path*']
}
```

**2. Add Auth Context**
```jsx
import { useSession } from 'next-auth/react'

export default function ResumePage() {
  const { data: session } = useSession()
  
  return (
    <ResumeBuilderUI
      userId={session?.user?.id}
      onDownloadPDF={generatePDF}
    />
  )
}
```

---

## Troubleshooting

### Issue: Tailwind CSS classes not applying

**Solution:**
1. Verify `tailwind.config.js` includes the correct content paths
2. Check that `globals.css` has `@tailwind` directives
3. Restart dev server
4. Clear `.next` folder: `rm -rf .next && npm run dev`

### Issue: Icons not showing

**Solution:**
```bash
npm install lucide-react
```
Make sure import is correct:
```jsx
import { Download, ZoomIn, ZoomOut, ChevronRight } from 'lucide-react'
```

### Issue: PDF download not working

**Solution:**
```bash
npm install jspdf html2canvas
```

Add to ResumeBuilderPage.jsx:
```jsx
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
```

### Issue: Preview not showing on mobile

**This is by design.** The preview is hidden on screens < 768px width.

To change this, edit ResumBuilderUI.jsx:
```jsx
// Change from:
className="hidden md:flex"

// To:
className="flex"
```

### Issue: Form not updating preview

**Check:**
1. Is `isDark` prop being passed correctly?
2. Are state updates happening? (check console)
3. Browser console for errors?

---

## Performance Tips

### 1. Lazy Load PDF Libraries
```jsx
const generatePDF = async (resumeData) => {
  const { jsPDF } = await import('jspdf')
  const html2canvas = await import('html2canvas')
  // ...
}
```

### 2. Memoize Components
```jsx
const PersonalEditor = React.memo(({ data, onUpdate, isDark }) => {
  // Component code
})
```

### 3. Use LocalStorage
```jsx
const saveToLocalStorage = (data) => {
  localStorage.setItem('resume_data', JSON.stringify(data))
}

useEffect(() => {
  const saved = localStorage.getItem('resume_data')
  if (saved) setResumeData(JSON.parse(saved))
}, [])
```

---

## Customization Examples

### Change from Blue to Purple

**ResumBuilderUI.jsx, search and replace:**
```
from-blue-600 to-blue-700     → from-purple-600 to-purple-700
text-blue-400                  → text-purple-400
border-blue-500                → border-purple-500
ring-blue-500/20               → ring-purple-500/20
focus:border-blue-500          → focus:border-purple-500
```

### Add Your Company Logo

In the header section (around line 200):
```jsx
<img src="/logo.svg" alt="Company" className="h-8" />
```

### Change Progress Bar Color

```jsx
// Line ~250, change to:
className={`h-full bg-gradient-to-r ${progress === 100 ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'} transition-all duration-500`}
```

### Add More Tabs

```jsx
// In the tabs array (around line 270):
{
  id: 'certifications',
  label: 'Certs',
  icon: '🏆'
},
{
  id: 'languages',
  label: 'Languages',
  icon: '🌐'
}
```

---

## Testing

### Manual Testing Checklist

- [ ] **Form Input**: Can type in all fields?
- [ ] **Preview Update**: Does preview update as you type?
- [ ] **Tab Navigation**: Can switch between tabs?
- [ ] **Add/Remove**: Can add and remove items?
- [ ] **Dark Mode**: Toggle works correctly?
- [ ] **Zoom**: Zoom in/out on preview?
- [ ] **Progress**: Progress bar updates?
- [ ] **PDF Download**: File downloads with correct name?
- [ ] **Mobile View**: Looks good on mobile?
- [ ] **Tablet View**: Responsive on tablet?

### Automated Testing Example

```jsx
// __tests__/ResumeBuilder.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import ResumeBuilderUI from '../ResumBuilderUI'

describe('Resume Builder', () => {
  it('renders the component', () => {
    render(<ResumeBuilderUI />)
    expect(screen.getByText('Resume Builder')).toBeInTheDocument()
  })

  it('updates personal name field', () => {
    render(<ResumeBuilderUI />)
    const firstNameInput = screen.getByPlaceholderText('John')
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } })
    expect(firstNameInput.value).toBe('Jane')
  })

  it('toggles dark mode', () => {
    render(<ResumeBuilderUI />)
    const toggleButton = screen.getByTitle('Light mode')
    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveTitle('Light mode')
  })
})
```

---

## Deployment

### Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# No additional setup needed!
```

### Docker

**Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Variables

If using database or APIs, create `.env.local`:
```
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
```

---

## File Structure

```
app/
├── resume/
│   ├── page.tsx (or page.jsx)
│   ├── layout.tsx
│   ├── ResumeBuilderPage.jsx ← Main page component
│   ├── RESUME_BUILDER_README.md ← Documentation
│   ├── STYLING_GUIDE.md ← Design system
│   ├── USAGE_EXAMPLES.jsx ← Examples
│   ├── IMPLEMENTATION.md ← This file
│   └── components/
│       ├── ResumBuilderUI.jsx ← Main builder component
│       ├── editors.jsx (existing)
│       ├── templates/
│       ├── Modals.jsx (existing)
│       └── ... other components
```

---

## Getting Help

### Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Inspect element** to see CSS classes
3. **Network tab** to check API calls
4. **React DevTools** to see component state

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tailwind not working | Restart dev server, clear `.next` |
| Icons missing | `npm install lucide-react` |
| PDF not generating | `npm install jspdf html2canvas` |
| Preview blank | Check isDark prop, look for errors |
| Mobile layout broken | Check responsive classes |

---

## Next Steps

1. ✅ Copy component files
2. ✅ Install dependencies
3. ✅ Set up Tailwind CSS
4. ✅ Create `/resume` route
5. 📋 Test locally
6. 🚀 Deploy to production
7. 📊 Monitor usage
8. 🔄 Gather feedback
9. 📝 Plan enhancements

---

## Support & Feedback

For issues or feature requests:
1. Check the troubleshooting section
2. Review component source code
3. Consult the design system guide
4. Create an issue with reproducible example

---

**Happy Building! 🚀**

*Version: 1.0 | Last Updated: January 2025*
