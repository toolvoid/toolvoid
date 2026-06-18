import PassportClient from './PassportClient'

export const metadata = {
  title: "Free Passport Photo Maker Online — ToolVoid",
  description: "Create passport-size photos online for free with our passport photo maker. Crop, resize, and adjust photos to meet official passport, visa, and ID card requirements.",
  keywords: ["free passport photo maker online", "passport photo maker", "passport size photo", "visa photo maker", "ID photo creator"],
  openGraph: {
    title: "Free Passport Photo Maker | ToolVoid",
    description: "Create passport-size photos online for free. Crop and resize to meet official requirements.",
    url: "https://toolvoid.com/passport",
  }
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Passport Photo Maker Online</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Create professional passport, visa, and ID card photos online for free with our passport photo maker. Gone are the days of expensive photo booth sessions or studio visits for passport photos. Our tool lets you take or upload a photo from your phone or computer and automatically crop, resize, and adjust it to meet the exact specifications of passport and visa applications for countries around the world, including the United States, India, United Kingdom, Canada, Australia, Schengen countries, and many more. Simply upload your photo, select the document type and country, and our intelligent cropping guide helps you position your face correctly within the frame. Adjust the background to solid white or light blue as required by official guidelines, fine-tune brightness and contrast, and ensure your photo meets all requirements including size, resolution, and head position. Download your final photo as a high-resolution print-ready JPG or PNG. Completely free, no sign-up, and your photos never leave your device — ensuring your privacy is protected.
        </p>
      </div>
      <PassportClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this passport photo maker free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits. Create as many passport photos as you need without any sign-up." }
          },
          {
            "@type": "Question",
            "name": "Does it support different country requirements?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, we support passport and visa photo requirements for the US, India, UK, Canada, Australia, Schengen countries, and many more." }
          },
          {
            "@type": "Question",
            "name": "Are my photos uploaded to a server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs in your browser. Your photos never leave your device, ensuring your privacy is protected." }
          }
        ]
      })}} />
    </>
  )
}
