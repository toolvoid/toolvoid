import Base64Client from './Base64Client'

export const metadata = {
  title: "Base64 Encoder Decoder Online — ToolVoid",
  description: "Encode and decode Base64 data instantly with our free online Base64 encoder decoder. Convert text, images, and files to Base64 format. No sign-up needed.",
  keywords: ["base64 encoder decoder online", "base64 encode", "base64 decode", "base64 converter", "base64 tool"],
  openGraph: {
    title: "Base64 Encoder Decoder | ToolVoid",
    description: "Encode and decode Base64 data instantly. Convert text, images, and files to Base64 format free.",
    url: "https://toolvoid.com/base64",
  }
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Base64 Encoder Decoder Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Encode and decode Base64 data instantly with our free online Base64 encoder and decoder. Base64 encoding is essential for transmitting binary data over text-based protocols like HTTP, embedding images in HTML and CSS, storing binary data in JSON, and many other applications in web development and data processing. Our tool makes it effortless — simply type or paste your text, upload a file, or drag and drop an image, and instantly get the Base64-encoded or decoded result. The encoder converts plain text, files, and images to Base64 strings, while the decoder reverses the process back to readable text or downloadable binary files. Real-time preview shows you the output as you type, with automatic detection of whether your input is Base64-encoded or plain text. Copy results to clipboard with one click. Everything runs entirely in your browser — no data is ever uploaded to any server, making it safe for sensitive credentials, tokens, and private files. Free, unlimited, and works offline.
        </p>
      </div>
      <Base64Client />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this Base64 encoder decoder free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits. Encode and decode as many strings and files as you need." }
          },
          {
            "@type": "Question",
            "name": "Can I encode images to Base64?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can upload or drag and drop images to convert them to Base64 strings, perfect for embedding images directly in HTML, CSS, or JSON." }
          },
          {
            "@type": "Question",
            "name": "Is my data sent to any server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs entirely in your browser. Your data never leaves your device, making it safe for sensitive information." }
          }
        ]
      })}} />
    </>
  )
}
