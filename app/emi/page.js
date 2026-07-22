import EmiClient from './EmiClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Home Loan EMI Calculator India — ToolVoid",
  description: "Calculate home loan, personal loan, and car loan EMI instantly with our free EMI calculator for India. Compare interest rates, loan amounts, and tenures. No sign-up needed.",
  keywords: ["home loan EMI calculator India", "EMI calculator", "loan calculator India", "home loan calculator", "personal loan EMI"],
  openGraph: {
    title: "Home Loan EMI Calculator | ToolVoid",
    description: "Calculate home loan, personal loan, and car loan EMI instantly. Compare rates and tenures free.",
    url: "https://toolvoid.com/emi",
  },
  ...createToolMetadata('emi'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Home Loan EMI Calculator India</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Calculate your monthly EMI for home loans, personal loans, car loans, and education loans instantly with our free EMI calculator designed for Indian borrowers. Whether you are planning to buy a new home, finance a vehicle, or consolidate debt with a personal loan, understanding your Equated Monthly Installment is crucial for budgeting and financial planning. Simply enter your loan amount, annual interest rate, and tenure in months or years, and our calculator instantly shows your monthly EMI, total interest payable, and the full payment schedule. Visualize how your loan is paid down over time with an interactive amortization chart that breaks down principal versus interest for each payment. Adjust any variable — loan amount, rate, or tenure — to see how changes affect your monthly payment and total interest cost. Make informed borrowing decisions, compare different loan offers from banks and NBFCs, and plan your finances with confidence. No personal data required, completely free, and works on any device.
        </p>
      </div>
      <EmiClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this EMI calculator free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on usage. Calculate as many loan scenarios as you need without signing up." }
          },
          {
            "@type": "Question",
            "name": "What types of loans can I calculate?",
            "acceptedAnswer": { "@type": "Answer", "text": "You can calculate EMI for any type of loan — home loans, personal loans, car loans, education loans, or business loans. Just enter the amount, rate, and tenure." }
          },
          {
            "@type": "Question",
            "name": "Does the calculator show a payment schedule?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, it generates a full amortization schedule showing the breakdown of principal and interest for each payment over the entire loan tenure." }
          }
        ]
      })}} />
    </>
  )
}
