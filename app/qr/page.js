import QrClient from './QrClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Free QR Code Generator Online — ToolVoid",
  description: "Generate QR codes, barcodes, fingerprint patterns and data matrices instantly with our free online QR code generator. Custom colors, sizes, and export to PNG or SVG. No sign-up required.",
  keywords: ["free qr code generator online", "qr code maker", "barcode generator", "custom qr code", "qr creator"],
  openGraph: {
    title: "Free QR Code Generator | ToolVoid",
    description: "Generate QR codes, barcodes, and data matrices instantly. Custom colors, sizes, PNG/SVG export.",
    url: "https://toolvoid.com/qr",
  },
  ...createToolMetadata('qr'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free QR Code Generator Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Create stunning QR codes, barcodes, fingerprint patterns, and data matrices instantly with our free online QR code generator. No sign-up required, no data sent to servers — everything runs in your browser. Customize foreground and background colors, adjust sizes from 128 to 512 pixels, and choose from multiple error correction levels for optimal scan reliability. Whether you need a QR code for your business card, a Code 128 barcode for product labels, a unique fingerprint pattern for authentication, or a custom data matrix for industrial tracking, our tool delivers pixel-perfect results in real time. Download as high-resolution PNG or vector SVG for print-ready output that scales to any size without quality loss.
        </p>
      </div>
      <QrClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the QR Code Generator free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes — completely free, with no account required, no hidden limits, and no watermarks on your exported codes." }
          },
          {
            "@type": "Question",
            "name": "Does it send my data to any server?",
            "acceptedAnswer": { "@type": "Answer", "text": "Never. Everything runs entirely in your browser using client-side JavaScript. Your data never leaves your device, making it safe for sensitive information like passwords, private URLs, or internal codes." }
          },
          {
            "@type": "Question",
            "name": "Which barcode formats are supported?",
            "acceptedAnswer": { "@type": "Answer", "text": "We support Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14, Pharmacode, and MSI Plessey — covering nearly every commercial use case from retail to logistics." }
          }
        ]
      })}} />
    </>
  )
}
