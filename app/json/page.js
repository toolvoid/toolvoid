import JsonClient from './JsonClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "JSON Formatter Validator Online — ToolVoid",
  description: "Format, validate, and beautify JSON online with our free JSON formatter. Parse, minify, and fix JSON syntax errors instantly in your browser. No sign-up needed.",
  keywords: ["JSON formatter validator online", "JSON formatter", "JSON validator", "JSON beautifier", "JSON parser online"],
  openGraph: {
    title: "JSON Formatter Validator | ToolVoid",
    description: "Format, validate, and beautify JSON online for free. Parse and fix JSON syntax errors instantly.",
    url: "https://toolvoid.com/json",
  },
  ...createToolMetadata('json'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>JSON Formatter Validator Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Format, validate, beautify, and minify JSON data instantly with our free online JSON formatter and validator. Whether you are a developer working with REST APIs, a data analyst processing JSON files, or a student learning data structures, our tool makes working with JSON seamless and error-free. Paste any JSON string into the editor and immediately see it formatted with proper indentation, color-coded syntax highlighting, and collapsible tree view for easy navigation. The built-in validator checks for syntax errors in real time and highlights the exact location of any issues, saving you hours of debugging. Switch between formatted (beautified) and minified views with one click. Transform JSON data by converting keys, sorting properties, or escaping strings. Use the tree viewer to explore deeply nested JSON structures without getting lost. Every operation runs entirely in your browser — no data is ever sent to any server, making it safe for sensitive API responses, configuration files, and private data. Free, unlimited, and works offline.
        </p>
      </div>
      <JsonClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this JSON formatter free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on usage. Format and validate as much JSON as you need." }
          },
          {
            "@type": "Question",
            "name": "Does my JSON data leave my computer?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs locally in your browser. Your JSON data is never sent to any server, keeping it private and secure." }
          },
          {
            "@type": "Question",
            "name": "Can I minify and beautify JSON?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can switch between formatted (beautified) and minified views instantly with a single click." }
          }
        ]
      })}} />
    </>
  )
}
