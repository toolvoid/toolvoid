import DomainClient from './DomainClient'
import { createToolMetadata } from '../../lib/toolMetadata'

const faqs = [
  {
    question: 'How can I check if a domain name is available?',
    answer: 'Enter the domain name you want to use, then review the availability result for the extensions supported by the checker. If your first option is unavailable, try a clear variation or another relevant TLD.',
  },
  {
    question: 'Can I check domain availability across different extensions?',
    answer: 'Yes. Use the domain availability checker to explore popular extensions such as .com, .in, .org, .net, .io, .co, .app, .dev, and .me.',
  },
  {
    question: 'Can I check WHOIS information for an existing domain?',
    answer: 'Yes. The tool provides WHOIS lookups for existing domains, including available registration details and expiry information.',
  },
]

export const metadata = {
  ...createToolMetadata('domain'),
  title: 'Domain Name Checker for Instant Availability | ToolVoid',
  description: 'Check domain availability instantly with ToolVoid. Search names, compare TLDs, and find the right domain for your brand without signing up.',
  alternates: { canonical: 'https://toolvoid.com/domain' },
  openGraph: {
    title: 'Domain Name Checker for Instant Availability | ToolVoid',
    description: 'Check domain availability instantly with ToolVoid and compare TLDs in seconds.',
    url: 'https://toolvoid.com/domain',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Domain Availability Checker</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Check if your dream domain name is available with our free domain availability checker. Whether you are starting a new business, launching a personal blog, building an e-commerce store, or creating a portfolio website, finding the perfect domain name is the first and most important step. Our domain checker lets you search across popular TLDs including .com, .in, .org, .net, .io, .co, .app, .dev, .me, and many more to see if your desired name is available for registration. Simply type your desired domain name and instantly see availability status, with suggestions for alternative names and TLDs if your first choice is taken. Check WHOIS information for existing domains to see registration details and expiry dates. Our tool also checks for domain name variations and suggests creative alternatives using prefixes, suffixes, and different extensions. Whether you need a domain for your startup, side project, or online store, find and secure it fast. No registration required, completely free, and unlimited searches.
        </p>
      </div>
      <DomainClient />
      <section style={{maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 3rem'}}>
        <p style={{ margin: '0 0 12px', color: '#6b6b85', fontSize: 14 }}>
          Related tools: <a href="/keyword" style={{ color: '#2563eb' }}>Keyword generator</a> · <a href="/passport" style={{ color: '#2563eb' }}>Passport photo maker</a>
        </p>
        <h2 style={{fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem'}}>Domain availability checker FAQs</h2>
        <div style={{display: 'grid', gap: 10}}>
          {faqs.map(({question, answer}) => <details key={question} style={{border: '1px solid #e4e4eb', borderRadius: 10, padding: '0 16px'}}><summary style={{cursor: 'pointer', padding: '15px 0', fontWeight: 700}}>{question}</summary><p style={{color: '#6b6b85', lineHeight: 1.7, margin: '0 0 15px'}}>{answer}</p></details>)}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({question, answer}) => ({"@type": "Question", "name": question, "acceptedAnswer": {"@type": "Answer", "text": answer}}))
      })}} />
    </>
  )
}
