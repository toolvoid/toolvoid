import WordCounterClient from './WordCounterClient'

export const metadata = {
  title: "Free Word Counter Online — ToolVoid",
  description: "Count words, characters, sentences, and paragraphs online for free with our word counter. Check writing stats, reading time, and keyword density instantly.",
  keywords: ["free word counter online", "word count", "character counter", "word counter tool", "writing stats"],
  openGraph: {
    title: "Free Word Counter | ToolVoid",
    description: "Count words, characters, sentences, paragraphs online for free. Check reading time and keyword density.",
    url: "https://toolvoid.com/word-counter",
  }
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Word Counter Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Count words, characters, sentences, paragraphs, and pages with our free online word counter. Whether you are a student writing an essay with a strict word limit, a content creator optimizing blog posts for SEO, a professional drafting reports and proposals, or a copywriter crafting social media content with character constraints, our word counter provides all the writing statistics you need in real time. Simply start typing or paste your text — the counter updates instantly, showing you word count, character count (with and without spaces), sentence count, paragraph count, average reading time, and speaking time. The keyword density analysis helps you identify frequently used terms to avoid overuse and improve readability. Set custom word count goals and track your progress with a visual indicator. The tool also highlights long sentences and difficult words to help you simplify your writing. Everything runs in your browser with no data sent to any server. Free, unlimited, and works offline for writers who need reliable stats without distractions.
        </p>
      </div>
      <WordCounterClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
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
