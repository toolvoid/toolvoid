import PdfClient from './PdfClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "PDF to Image Converter Free — ToolVoid",
  description: "Convert PDF pages to high-quality images online for free. Extract images from PDF, convert PDF to JPG, PNG, and WebP. No upload needed, 100% private.",
  keywords: ["PDF to image converter free", "PDF to JPG", "PDF to PNG", "extract images from PDF", "PDF converter online"],
  openGraph: {
    title: "PDF to Image Converter Free | ToolVoid",
    description: "Convert PDF pages to high-quality JPG, PNG, and WebP images online for free. 100% private.",
    url: "https://toolvoid.com/pdf",
  },
  ...createToolMetadata('pdf'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>PDF to Image Converter Free</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Convert PDF pages to high-quality images instantly with our free online PDF to image converter. Whether you need to extract a single page from a PDF as a JPG for a presentation, convert an entire PDF document to PNG images for easy sharing on social media, or transform PDF certificates and forms into WebP images for your website, our tool delivers pixel-perfect results in seconds. Simply upload your PDF file — the tool works entirely in your browser using advanced PDF rendering technology, so your documents never leave your device. Choose from multiple output formats including JPG, PNG, and WebP, select the image quality and resolution, and pick specific pages or convert the entire document. Each page is rendered individually, preserving all text, graphics, fonts, and layout exactly as they appear in the original PDF. Download individual images or zip all pages together for bulk download. Perfect for designers, marketers, students, and professionals who need to repurpose PDF content without expensive software. No sign-up required, no file size limits, completely free.
        </p>
      </div>
      <PdfClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this PDF to image converter free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on file size or number of pages. No sign-up required." }
          },
          {
            "@type": "Question",
            "name": "Are my PDF files uploaded to a server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs entirely in your browser. Your PDF files never leave your device, ensuring complete privacy." }
          },
          {
            "@type": "Question",
            "name": "What image formats can I export to?",
            "acceptedAnswer": { "@type": "Answer", "text": "You can export PDF pages as JPG, PNG, or WebP images with adjustable quality and resolution settings." }
          }
        ]
      })}} />
    </>
  )
}
