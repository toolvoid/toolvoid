import ImageToolsClient from './ImageToolsClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Compress Image Online Free — ToolVoid",
  description: "Compress, resize, and optimize images online for free with our image tools. Reduce JPG, PNG, and WebP file sizes without losing quality. No uploads needed.",
  keywords: ["compress image online free", "image compressor", "resize image online", "optimize image", "free image tool"],
  openGraph: {
    title: "Compress Image Online Free | ToolVoid",
    description: "Compress, resize, and optimize JPG, PNG, WebP images for free. No uploads, no sign-ups.",
    url: "https://toolvoid.com/image-tools",
  },
  ...createToolMetadata('image-tools'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Compress Image Online Free</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Compress, resize, and optimize your images online for free with our powerful image tools suite. Whether you need to reduce the file size of high-resolution photos for faster website loading, resize images for social media profiles and banners, or convert between JPG, PNG, and WebP formats, our tools handle it all instantly in your browser — no uploads to any server, ensuring your images remain private and secure. The image compressor uses intelligent algorithms to reduce file size by up to 80% while preserving visual quality, making your web pages load faster and saving bandwidth. The resizer lets you set exact dimensions in pixels or scale by percentage, with real-time preview of the result. Optimize images for e-commerce product listings, email attachments, portfolio websites, or any application where file size matters. Every tool runs 100% client-side using advanced canvas APIs, so your images never leave your device. Free, unlimited, and always available.
        </p>
      </div>
      <ImageToolsClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this image compressor free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on usage or file size. Compress as many images as you need." }
          },
          {
            "@type": "Question",
            "name": "Are my images uploaded to any server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs entirely in your browser using JavaScript. Your images never leave your device, ensuring complete privacy." }
          },
          {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our tools support JPG, PNG, and WebP formats for compression, resizing, and format conversion." }
          }
        ]
      })}} />
    </>
  )
}
