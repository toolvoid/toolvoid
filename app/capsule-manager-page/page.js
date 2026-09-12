import CapsuleManagerClient from './CapsuleManagerClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  ...createToolMetadata('capsule-manager'),
  title: 'Capsule Manager for Saving AI Context | ToolVoid',
  description: 'Save AI chat context in one place with ToolVoid. Keep prompts, decisions, and project details organized so you can resume work instantly.',
  alternates: { canonical: 'https://toolvoid.com/capsule-manager' },
  openGraph: {
    title: 'Capsule Manager for Saving AI Context | ToolVoid',
    description: 'Save AI chat context in one place with ToolVoid and resume work instantly.',
    url: 'https://toolvoid.com/capsule-manager',
    type: 'website',
  },
};

export default function CapsuleManagerPage() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Capsule Manager for Saving AI Context</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Never lose your AI conversation context again with our free capsule manager. If you use AI tools like ChatGPT, Claude, or Gemini for complex, multi-session tasks, you know the frustration of losing context when switching between conversations or picking up an old thread. Our capsule manager solves this by letting you save your entire conversation context — including system prompts, chat history, key decisions, and important details — into a reusable capsule that you can name, tag, and organize. When you need to resume a task, simply load the capsule and instantly restore the full context. Create different capsules for different projects: one for a coding task, another for research, another for creative writing. Each capsule stores all the information the AI needs to understand where you left off. Search through your capsules by name or tag, delete old ones, and export capsules for backup. Your capsules are stored locally in your browser — no data is ever sent to any server. Free, private, and designed for power users who work with AI every day.
        </p>
        <p style={{ marginTop: '1rem', color: '#6b6b85', fontSize: 14 }}>
          Related tools: <a href="/keyword" style={{ color: '#7dd3fc' }}>Keyword generator</a> · <a href="/story" style={{ color: '#7dd3fc' }}>Story generator</a>
        </p>
      </div>
      <CapsuleManagerClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this capsule manager free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on how many capsules you can create. No account or sign-up required." }
          },
          {
            "@type": "Question",
            "name": "How does capsule saving work?",
            "acceptedAnswer": { "@type": "Answer", "text": "Capsules store your AI conversation context including system prompts, chat history, key decisions, and important details. You can name, tag, and organize them for easy retrieval." }
          },
          {
            "@type": "Question",
            "name": "Is my data stored on any server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. All capsules are stored locally in your browser. Your data never leaves your device, ensuring complete privacy." }
          }
        ]
      })}} />
    </>
  )
}
