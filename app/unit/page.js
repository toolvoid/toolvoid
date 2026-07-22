import UnitClient from './UnitClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Free Unit Converter Online — ToolVoid",
  description: "Convert between units of measurement online for free. Length, mass, volume, temperature, area, speed, time, and more. Instant conversion, no sign-up needed.",
  keywords: ["free unit converter online", "unit converter", "measurement converter", "length converter", "weight converter"],
  openGraph: {
    title: "Free Unit Converter | ToolVoid",
    description: "Convert length, mass, volume, temperature, area, speed, time units online for free.",
    url: "https://toolvoid.com/unit",
  },
  ...createToolMetadata('unit'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Unit Converter Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Instantly convert between hundreds of units of measurement across all major categories with our free online unit converter. Whether you are a student solving physics problems, a professional in engineering or construction working with different measurement systems, a traveler converting currencies and temperatures, or a cook adapting recipes from different countries, our unit converter makes it effortless. Convert length (meters, feet, inches, kilometers, miles), mass (kilograms, pounds, ounces, tons), volume (liters, gallons, cups, milliliters), temperature (Celsius, Fahrenheit, Kelvin), area (square meters, acres, hectares), speed (km/h, mph, knots), time (seconds, minutes, hours, days), pressure, energy, power, and many more categories. The converter updates results in real time as you type, with support for decimal precision up to 10 decimal places. Favorites feature lets you save commonly used conversions for quick access. The clean interface works perfectly on mobile, tablet, and desktop. Everything runs in your browser with no data sent to any server. Free, unlimited, and always available without registration.
        </p>
      </div>
      <UnitClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this unit converter free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with unlimited conversions across all measurement categories. No registration required." }
          },
          {
            "@type": "Question",
            "name": "What units can I convert?",
            "acceptedAnswer": { "@type": "Answer", "text": "You can convert length, mass, volume, temperature, area, speed, time, pressure, energy, power, and many more units with high decimal precision." }
          },
          {
            "@type": "Question",
            "name": "Can I save my favorite conversions?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, the favorites feature lets you save commonly used conversions for quick access." }
          }
        ]
      })}} />
    </>
  )
}
