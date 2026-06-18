import TtsClient from './TtsClient'

export const metadata = {
  title: "Free Text to Speech Converter Online — ToolVoid",
  description: "Convert text to natural-sounding speech online for free with our text to speech converter. Choose from multiple voices and languages. No sign-up needed.",
  keywords: ["free text to speech converter online", "text to speech", "TTS online", "speech generator", "text to voice"],
  openGraph: {
    title: "Free Text to Speech Converter | ToolVoid",
    description: "Convert text to natural-sounding speech online for free. Multiple voices and languages available.",
    url: "https://toolvoid.com/tts",
  }
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Text to Speech Converter Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Convert any text into natural-sounding speech instantly with our free online text to speech converter. Whether you need to listen to articles and documents hands-free, create voiceovers for videos and presentations, help children and students with reading comprehension, or assist users with visual impairments, our TTS tool delivers high-quality audio output in multiple voices and languages. Simply type or paste your text, choose from a variety of natural-sounding voices including male and female options in different accents, adjust the speaking rate and pitch to your preference, and click play. The audio streams directly in your browser with no downloads needed, or you can download the generated speech as an MP3 file for offline use and playback on any device. Use it to proofread your writing by hearing it read aloud — you will catch errors your eyes miss. Perfect for content creators, students, professionals, and anyone who prefers listening over reading. Completely free, unlimited usage, and works on any device with a modern browser.
        </p>
      </div>
      <TtsClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this text to speech converter free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on usage. Convert as much text as you need without signing up." }
          },
          {
            "@type": "Question",
            "name": "Can I download the speech as an audio file?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can download the generated speech as an MP3 file for offline playback on any device." }
          },
          {
            "@type": "Question",
            "name": "What voices and languages are available?",
            "acceptedAnswer": { "@type": "Answer", "text": "Multiple voices are available including male and female options in various accents and languages, with adjustable speaking rate and pitch." }
          }
        ]
      })}} />
    </>
  )
}
