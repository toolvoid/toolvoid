import EmiClient from './EmiClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Home Loan EMI Calculator India",
  description: "Calculate home loan, personal loan, and car loan EMI instantly with our free EMI calculator for India. Compare interest rates, loan amounts, and tenures. No sign-up needed.",
  keywords: ["home loan EMI calculator India", "EMI calculator", "loan calculator India", "home loan calculator", "personal loan EMI"],
  openGraph: {
    title: "Home Loan EMI Calculator | ToolVoid",
    description: "Calculate home loan, personal loan, and car loan EMI instantly. Compare rates and tenures free.",
    url: "https://toolvoid.com/emi",
  },
  ...createToolMetadata('emi'),
  title: "Home Loan EMI Calculator India",
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
