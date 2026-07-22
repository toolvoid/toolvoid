import ResumeClient from './ResumeClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Free ATS Resume Builder Online — ToolVoid",
  description: "Build professional, ATS-friendly resumes online for free with our resume builder. Customize templates, add experience, education, skills and download as PDF. No sign-up needed.",
  keywords: ["free ATS resume builder online", "resume maker", "free resume builder", "ATS friendly resume", "professional resume creator"],
  openGraph: {
    title: "Free ATS Resume Builder | ToolVoid",
    description: "Build professional, ATS-friendly resumes online for free. Customize templates and download PDF.",
    url: "https://toolvoid.com/resume",
  },
  ...createToolMetadata('resume'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free ATS Resume Builder Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Land your dream job with a professional, ATS-friendly resume created using our free online resume builder. Applicant Tracking Systems (ATS) automatically screen resumes before they reach human recruiters, and most standard templates fail these automated checks. Our builder is designed from the ground up to produce resumes that both robots and humans love. Choose from multiple professionally designed templates, each optimized for ATS parsing with clean typography, proper heading hierarchy, and machine-readable layouts. Add your work experience, education, skills, certifications, and projects with an intuitive interface that guides you through every section. Customize colors, fonts, spacing, and layout to match your personal brand while keeping the structure ATS-compliant. Export your finished resume as a high-quality PDF file ready for immediate submission. No account required, no watermarks, no credit card — just a powerful tool to help you make a great first impression and get more interviews.
        </p>
      </div>
      <ResumeClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this resume builder really free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no hidden charges, no credit card required, and no watermarks on your downloaded resumes." }
          },
          {
            "@type": "Question",
            "name": "Are the resumes ATS-friendly?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Every template is designed with clean formatting, proper heading structure, and standard fonts that Applicant Tracking Systems can parse reliably. This means your resume reaches human recruiters intact." }
          },
          {
            "@type": "Question",
            "name": "Can I download my resume as PDF?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can export your finished resume as a professional PDF file ready for job applications, with all formatting preserved exactly as designed." }
          }
        ]
      })}} />
    </>
  )
}
