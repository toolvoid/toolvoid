import LoanClient from './LoanClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Personal Loan Eligibility Calculator India — ToolVoid",
  description: "Check your personal loan eligibility and calculate monthly EMI with our free loan calculator for India. Instant approval estimation based on income, age, and credit score.",
  keywords: ["personal loan eligibility calculator India", "loan eligibility calculator", "personal loan India", "loan calculator", "EMI eligibility"],
  openGraph: {
    title: "Personal Loan Eligibility Calculator | ToolVoid",
    description: "Check personal loan eligibility and calculate EMI instantly for Indian borrowers. Free and private.",
    url: "https://toolvoid.com/loan",
  },
  ...createToolMetadata('loan'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Personal Loan Eligibility Calculator India</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Check your personal loan eligibility instantly with our free personal loan eligibility calculator designed for Indian borrowers. Before applying for a personal loan, it is crucial to understand how much you can borrow based on your income, age, existing obligations, and credit profile. Our calculator uses standard lending criteria used by Indian banks and NBFCs to estimate your maximum loan amount, monthly EMI, and total interest payable. Enter your monthly income, current age, retirement age, existing monthly obligations, and desired loan tenure to see your eligible loan amount and the EMI it translates to. Adjust any variable to see how increasing your income, reducing existing debt, or choosing a longer tenure affects your borrowing power. The calculator also shows the debt-to-income ratio, which lenders use to assess repayment capacity. Make informed decisions before approaching a bank, compare different loan scenarios, and apply with confidence. No personal data is stored or transmitted. Free, private, and available 24/7.
        </p>
      </div>
      <LoanClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this loan eligibility calculator free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits. Check as many loan scenarios as you need without signing up." }
          },
          {
            "@type": "Question",
            "name": "How is loan eligibility calculated?",
            "acceptedAnswer": { "@type": "Answer", "text": "Eligibility is calculated based on your monthly income, age, retirement age, existing monthly obligations, and desired loan tenure, using standard lending criteria used by Indian banks and NBFCs." }
          },
          {
            "@type": "Question",
            "name": "Is my personal information stored?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. All calculations happen in your browser. Your income and personal details are never stored or transmitted." }
          }
        ]
      })}} />
    </>
  )
}
