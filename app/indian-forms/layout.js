import '../Indian Forms/app/globals.css';

export const metadata = {
  title: 'Indian Form Photo Compressor — ToolVoid',
  description: 'Resize and compress photos and signatures for Indian exams, government IDs, bank applications, and job forms privately in your browser.',
  keywords: ['Indian form photo compressor', 'NEET photo resize', 'SSC photo size', 'PAN card photo resize', 'signature resize'],
  alternates: { canonical: 'https://toolvoid.com/indian-forms' },
  openGraph: {
    title: 'Indian Form Photo Compressor | ToolVoid',
    description: 'Prepare upload-ready photos and signatures for Indian forms in your browser.',
    url: 'https://toolvoid.com/indian-forms',
  },
};

export default function IndianFormsLayout({ children }) {
  const faqs = [
    ['Are my photos uploaded to a server?', 'No. Processing happens in your browser. Background removal downloads its free browser model when you choose that option.'],
    ['Can I use this for NEET, JEE, SSC, UPSC, and banking forms?', 'Yes. The tool includes common presets for these forms. Always check the notification for your current application cycle.'],
    ['What happens after I upload a photo?', 'You see the original file name and size, then a before-and-after result showing output pixels and file size before downloading.'],
  ];

  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  }) }} /></>;
}
