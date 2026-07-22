import DomainClient from './DomainClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Free Domain Availability Checker — ToolVoid",
  description: "Check domain name availability instantly with our free domain availability checker. Search .com, .in, .org, .net and more. Find your perfect domain name today.",
  keywords: ["free domain availability checker", "domain name search", "domain checker", "check domain availability", "domain name availability"],
  openGraph: {
    title: "Free Domain Availability Checker | ToolVoid",
    description: "Check domain name availability instantly. Search .com, .in, .org, .net and more for free.",
    url: "https://toolvoid.com/domain",
  },
  ...createToolMetadata('domain'),
}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this domain checker free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with unlimited searches. Check as many domain names as you need without any registration." }
          },
          {
            "@type": "Question",
            "name": "What TLDs can I search?",
            "acceptedAnswer": { "@type": "Answer", "text": "You can search popular TLDs including .com, .in, .org, .net, .io, .co, .app, .dev, .me, and many more extensions." }
          },
          {
            "@type": "Question",
            "name": "Can I check WHOIS information?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, our tool provides WHOIS lookups for existing domains, showing registration details and expiry information." }
          }
        ]
      })}} />
    </>
  )
}
