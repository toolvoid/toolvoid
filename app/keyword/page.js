import { createToolMetadata } from '../../lib/toolMetadata';
import KeywordClient from './KeywordClient';

const faqs = [
  {
    question: 'Can I generate keywords for SEO, a blog, or a website?',
    answer: 'Yes. Start with a topic, product, service, or audience, then use the suggestions to plan blog posts, landing pages, product pages, and other search-focused content.',
  },
  {
    question: 'Does the keyword generator suggest long-tail keywords?',
    answer: 'Yes. It can help you explore broad terms alongside more specific long-tail phrases, question keywords, and related ideas for your content plan.',
  },
  {
    question: 'Is the SEO keyword generator free to use?',
    answer: 'Yes. You can generate keyword ideas online without creating an account.',
  },
];

export const metadata = {
  ...createToolMetadata('keyword'),
  title: 'Keyword Generator for SEO Ideas and Content | ToolVoid',
  description: 'Generate SEO keywords for free, find long-tail ideas, and plan content faster with ToolVoid. Instant suggestions, no signup, and clear keyword research starts here.',
  alternates: { canonical: 'https://toolvoid.com/keyword' },
  openGraph: {
    title: 'Keyword Generator for SEO Ideas and Content | ToolVoid',
    description: 'Generate SEO keywords for free, find long-tail ideas, and plan content faster with ToolVoid.',
    url: 'https://toolvoid.com/keyword',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <KeywordClient />
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 1.5rem 5rem', color: '#dce4ef' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 1rem' }}>Generate keywords for SEO, blogs, and websites</h2>
        <p style={{ maxWidth: 760, color: '#9aa4b2', lineHeight: 1.75 }}>
          Use this SEO keyword generator to turn a seed topic into content ideas for a blog, website, product page, or campaign. Explore related phrases and long-tail queries, then choose the terms that genuinely match what your audience needs.
        </p>
        <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
          <p style={{ margin: '0 0 10px', color: '#9aa4b2', fontSize: 14 }}>
            Related tools: <a href="/domain" style={{ color: '#7dd3fc' }}>Domain name checker</a> · <a href="/story" style={{ color: '#7dd3fc' }}>Story generator</a>
          </p>
          {faqs.map(({ question, answer }) => (
            <details key={question} style={{ border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: '0 18px', background: 'rgba(255,255,255,.03)' }}>
              <summary style={{ cursor: 'pointer', padding: '17px 0', fontWeight: 700 }}>{question}</summary>
              <p style={{ margin: '0 0 17px', color: '#9aa4b2', lineHeight: 1.7 }}>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ question, answer }) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          }),
        }}
      />
    </>
  );
}
