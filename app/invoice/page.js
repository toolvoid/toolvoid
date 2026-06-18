import InvoiceClient from './InvoiceClient'

export const metadata = {
  title: "Free Invoice Generator PDF Download — ToolVoid",
  description: "Create professional invoices online for free and download as PDF. Generate invoices with custom logo, items, tax, and payment details. No sign-up needed.",
  keywords: ["free invoice generator PDF download", "invoice maker", "create invoice online", "invoice generator", "free PDF invoice"],
  openGraph: {
    title: "Free Invoice Generator PDF Download | ToolVoid",
    description: "Create professional invoices online for free and download as PDF. Custom logo, items, tax included.",
    url: "https://toolvoid.com/invoice",
  }
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Invoice Generator PDF Download</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Create professional, customizable invoices online for free and download them as PDF with our free invoice generator. Whether you are a freelancer sending invoices to clients, a small business owner managing billing, or a contractor tracking project payments, our tool makes invoicing simple and professional. Add your business logo, company name, and contact details, then list your products or services with quantities, rates, and amounts. Apply tax percentages, discounts, and shipping charges — the totals calculate automatically. Choose from multiple invoice templates and color schemes to match your brand. Preview your invoice in real time as you build it, then download as a polished PDF file ready to email or print. Track invoice numbers automatically and include payment terms, due dates, and bank account details for easy payment collection. No account registration required, no watermarks on your invoices, and your data never leaves your browser. Generate unlimited invoices for free — perfect for freelancers, startups, and small businesses who need professional billing without expensive software.
        </p>
      </div>
      <InvoiceClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this invoice generator free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on how many invoices you create. No account registration or credit card required." }
          },
          {
            "@type": "Question",
            "name": "Can I download invoices as PDF?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can download any invoice as a professional PDF file ready for emailing or printing." }
          },
          {
            "@type": "Question",
            "name": "Can I add my logo and customize the design?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. You can upload your business logo, set your company details, choose color schemes, and customize templates to match your brand." }
          }
        ]
      })}} />
    </>
  )
}
