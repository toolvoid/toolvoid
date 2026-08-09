import PasswordClient from './PasswordClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Strong Password Generator Free — ToolVoid",
  description: "Generate strong, secure, random passwords instantly with our free password generator. Custom length, include symbols, numbers, uppercase and lowercase for maximum security.",
  keywords: ["strong password generator free", "secure password creator", "random password maker", "password generator online", "strong password maker"],
  openGraph: {
    title: "Strong Password Generator | ToolVoid",
    description: "Generate strong, secure passwords instantly with customizable length, symbols, and numbers.",
    url: "https://toolvoid.com/password",
  },
  ...createToolMetadata('password'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Strong Password Generator Free</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Create strong, secure, and truly random passwords with our free online password generator. In today&apos;s digital world, using weak or reused passwords puts your accounts at serious risk of compromise. Our tool generates cryptographically random passwords that are virtually impossible to crack, helping you protect your email, banking, social media, and work accounts from unauthorized access. Customize every aspect of your password — choose length from 8 to 64 characters, toggle uppercase letters, lowercase letters, numbers, and special symbols on or off, and see the password strength indicator update in real time. Copy your new password to clipboard with one click, or generate a fresh one instantly. No data is ever stored or transmitted; everything runs securely in your browser. Whether you need a password for a new account, a master password for your password manager, or a temporary code to share securely, our generator delivers strong, unique passwords every time. Stay safe online with passwords that hackers cannot guess or brute-force.
        </p>
      </div>
      <PasswordClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this password generator free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free to use with no limits on how many passwords you can generate. No account or sign-up required." }
          },
          {
            "@type": "Question",
            "name": "Are the generated passwords truly random?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our password generator uses cryptographically secure random number generation to ensure every password is truly random and unpredictable, making them resistant to brute-force and dictionary attacks." }
          },
          {
            "@type": "Question",
            "name": "Can I customize which characters are included?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. You can toggle uppercase letters, lowercase letters, numbers, and special symbols on or off, and set the password length from 8 to 64 characters for full control." }
          }
        ]
      })}} />
    </>
  )
}
