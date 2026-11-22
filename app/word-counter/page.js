import WordCounterClient from './WordCounterClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Count words. Analyze deeply. Write better.",
  description: "Count words, characters, sentences, and paragraphs online for free with our word counter. Check writing stats, reading time, and keyword density instantly.",
  keywords: ["free word counter online", "word count", "character counter", "word counter tool", "writing stats"],
  openGraph: {
    title: "Free Word Counter | ToolVoid",
    description: "Count words, characters, sentences, paragraphs online for free. Check reading time and keyword density.",
    url: "https://toolvoid.com/word-counter",
  },
  ...createToolMetadata('word-counter'),
  title: "Count words. Analyze deeply. Write better.",
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
            "name": "Is this word counter free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits. Count words and characters in as much text as you need." }
          },
          {
            "@type": "Question",
            "name": "What statistics does the word counter show?",
            "acceptedAnswer": { "@type": "Answer", "text": "It shows word count, character count (with and without spaces), sentences, paragraphs, reading time, speaking time, and keyword density analysis." }
          },
          {
            "@type": "Question",
            "name": "Can I track word count goals?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can set custom word count goals and track your progress with a visual indicator." }
          }
        ]
      })}} />
    </>
  )
}
