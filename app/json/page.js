import JsonClient from './JsonClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "JSON Formatter & Validator Online | ToolVoid",
  description: "Format, validate, minify, and inspect JSON in your browser, with syntax errors highlighted so you can review service responses and settings before sharing.",
  keywords: ["JSON formatter validator online", "JSON formatter", "JSON validator", "JSON beautifier", "JSON parser online"],
  openGraph: {
    title: "JSON Formatter Validator | ToolVoid",
    description: "Format, validate, and beautify JSON online. Parse and fix JSON syntax errors with line and column guidance.",
    url: "https://toolvoid.com/json",
  },
  ...createToolMetadata('json'),
  title: "JSON Formatter & Validator Online | ToolVoid",
  description: "Format, validate, minify, and inspect JSON in your browser, with syntax errors highlighted so you can review service responses and settings before sharing.",
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
            "name": "Which indentation settings are available?",
            "acceptedAnswer": { "@type": "Answer", "text": "The Indent size control offers 2 spaces and 4 spaces." }
          },
          {
            "@type": "Question",
            "name": "Which transform actions are available?",
            "acceptedAnswer": { "@type": "Answer", "text": "The quick actions include Format, Minify, and Sort Keys." }
          },
          {
            "@type": "Question",
            "name": "Can I import a JSON file?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can import a .json file or a plain text file." }
          }
        ]
      })}} />
    </>
  )
}
