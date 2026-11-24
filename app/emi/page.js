import EmiClient from './EmiClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "EMI Calculator India - Monthly Loan Instalment | ToolVoid",
  description: "Estimate monthly instalments for home, personal, or car loans in India, and compare interest costs across loan amounts, rates, and repayment terms.",
  keywords: ["home loan EMI calculator India", "EMI calculator", "loan calculator India", "home loan calculator", "personal loan EMI"],
  openGraph: {
    title: "Home Loan EMI Calculator | ToolVoid",
    description: "Calculate home loan, personal loan, and car loan EMI. Compare rates and tenures.",
    url: "https://toolvoid.com/emi",
  },
  ...createToolMetadata('emi'),
  title: "EMI Calculator India - Monthly Loan Instalment | ToolVoid",
  description: "Estimate monthly instalments for home, personal, or car loans in India, and compare interest costs across loan amounts, rates, and repayment terms.",
}

export default function Page() {
  return (
    <>
      <EmiClient />
      <script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which inputs calculate the EMI?",
            "acceptedAnswer": { "@type": "Answer", "text": "Enter Loan amount, Interest rate %, and Tenure in years. The calculator also has Extra EMI / month and Lump sum inputs." }
          },
          {
            "@type": "Question",
            "name": "What appears in the result panel?",
            "acceptedAnswer": { "@type": "Answer", "text": "The panel shows the EMI, total interest, total payment, closure date, and interest saved." }
          },
          {
            "@type": "Question",
            "name": "Can I view payment rows?",
            "acceptedAnswer": { "@type": "Answer", "text": "Select Open table to view the schedule. The schedule offers monthly or yearly views and CSV or JSON export controls." }
          }
        ]
      })}} />
    </>
  )
}
