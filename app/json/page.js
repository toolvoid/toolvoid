import JsonClient from './JsonClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Shape messy JSON into clean, usable data.",
  description: "Format, validate, and beautify JSON online with our free JSON formatter. Parse, minify, and fix JSON syntax errors instantly in your browser. No sign-up needed.",
  keywords: ["JSON formatter validator online", "JSON formatter", "JSON validator", "JSON beautifier", "JSON parser online"],
  openGraph: {
    title: "JSON Formatter Validator | ToolVoid",
    description: "Format, validate, and beautify JSON online for free. Parse and fix JSON syntax errors instantly.",
    url: "https://toolvoid.com/json",
  },
  ...createToolMetadata('json'),
  title: "Shape messy JSON into clean, usable data.",
}

export default function Page() {
  return (
    <>
      <JsonClient />
      <script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify({
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
