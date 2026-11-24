import PdfClient from './PdfClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "PDF to Image Converter Online | ToolVoid",
  description: "Convert selected PDF pages to JPG, PNG, or WebP images in your browser, choose output quality and resolution, and download individual pages or a ZIP.",
  keywords: ["PDF to image converter free", "PDF to JPG", "PDF to PNG", "extract images from PDF", "PDF converter online"],
  openGraph: {
    title: "PDF to Image Converter Free | ToolVoid",
    description: "Convert PDF pages to JPG, PNG, and WebP images in your browser.",
    url: "https://toolvoid.com/pdf",
  },
  ...createToolMetadata('pdf'),
  title: "PDF to Image Converter Online | ToolVoid",
  description: "Convert selected PDF pages to JPG, PNG, or WebP images in your browser, choose output quality and resolution, and download individual pages or a ZIP.",
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
            "name": "Where is my PDF processed?",
            "acceptedAnswer": { "@type": "Answer", "text": "In your browser. Your PDF is read on your device and is not uploaded to ToolVoid." }
          },
          {
            "@type": "Question",
            "name": "Which image formats can I export?",
            "acceptedAnswer": { "@type": "Answer", "text": "The Convert to Images controls include JPG, PNG, and WebP output formats." }
          },
          {
            "@type": "Question",
            "name": "Can I select a page range?",
            "acceptedAnswer": { "@type": "Answer", "text": "The page-range controls include All Pages, Custom Range, and Current Page." }
          }
        ]
      })}} />
    </>
  )
}
