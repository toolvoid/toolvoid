import WordCounterClient from './WordCounterClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Word Counter Online - Words & Characters | ToolVoid",
  description: "Count words, characters, sentences, and paragraphs while checking reading time and keyword density for a draft, caption, assignment, or other text.",
  keywords: ["free word counter online", "word count", "character counter", "word counter tool", "writing stats"],
  openGraph: {
    title: "Free Word Counter | ToolVoid",
    description: "Count words, characters, sentences, paragraphs online for free. Check reading time and keyword density.",
    url: "https://toolvoid.com/word-counter",
  },
  ...createToolMetadata('word-counter'),
  title: "Word Counter Online - Words & Characters | ToolVoid",
  description: "Count words, characters, sentences, and paragraphs while checking reading time and keyword density for a draft, caption, assignment, or other text.",
}

export default function Page() {
  return (
    <>
      <WordCounterClient />
      <script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which live counters does the page show?",
            "acceptedAnswer": { "@type": "Answer", "text": "The page updates words, characters, sentences, paragraphs, lines, unique words, and average word length." }
          },
          {
            "@type": "Question",
            "name": "Which reading measures are listed?",
            "acceptedAnswer": { "@type": "Answer", "text": "The page lists average, slow, and fast reading estimates, plus speaking time." }
          },
          {
            "@type": "Question",
            "name": "Which text export formats are offered?",
            "acceptedAnswer": { "@type": "Answer", "text": "The page provides text downloads in .txt, .md, and .html formats, plus a Download Stats Report button." }
          }
        ]
      })}} />
    </>
  )
}
