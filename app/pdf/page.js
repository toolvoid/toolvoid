import PdfClient from './PdfClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "PDF Tools",
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
      <PdfClient />
      <script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify({
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
