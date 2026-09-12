const BASE_URL = 'https://toolvoid.com';

const TOOL_METADATA = {
  story: {
    title: 'Story Generator for Short Video Scripts | ToolVoid',
    description: 'Create short video stories and scripts fast with ToolVoid. Turn a prompt into a clear story outline, scene flow, and engaging content in seconds.',
  },
  hashtag: {
    title: 'Instagram Hashtag Generator for Better Reach | ToolVoid',
    description: 'Generate relevant hashtags for Instagram, TikTok, and LinkedIn with ToolVoid. Build a focused set in seconds and improve reach without sign-up.',
  },
  imagegen: {
    title: 'AI Image Generator for Quick Visual Ideas | ToolVoid',
    description: 'Create art from text prompts with ToolVoid in seconds. Generate visuals for products, posts, and ideas instantly with no signup and no clutter.',
  },
  keyword: {
    title: 'Keyword Generator for SEO Ideas and Content | ToolVoid',
    description: 'Generate SEO keywords for free, find long-tail ideas, and plan content faster with ToolVoid. Instant suggestions, no signup, and clear keyword research starts here.',
  },
  'image-tools': {
    title: 'Image Tools for Resize, Crop, and Compress | ToolVoid',
    description: 'Resize, crop, compress, and convert images instantly with ToolVoid. Edit files in your browser for free with fast results and no signup.',
  },
  pdf: {
    title: 'PDF to Image Converter for Quick Exports | ToolVoid',
    description: 'Convert PDF pages to JPG or PNG in seconds with ToolVoid. Export quality images fast, split files easily, and keep your workflow moving.',
  },
  passport: {
    title: 'Passport Photo Maker for Visa and ID Photos | ToolVoid',
    description: 'Create passport and ID photos in seconds with ToolVoid. Resize, crop, and export print-ready images for free with instant results and no signup.',
  },
  qr: {
    title: 'QR Code Generator for Links and Contacts | ToolVoid',
    description: 'Generate QR codes for links, text, and contact details with ToolVoid. Make clean codes in seconds, download instantly, and share without friction.',
  },
  password: {
    title: 'Password Generator for Strong Safe Logins | ToolVoid',
    description: 'Create strong passwords in seconds with ToolVoid. Choose length, letters, numbers, and symbols, then generate secure logins instantly and safely.',
  },
  domain: {
    title: 'Domain Name Checker for Instant Availability | ToolVoid',
    description: 'Check domain availability instantly with ToolVoid. Search names, compare TLDs, and find the right domain for your brand without signing up.',
  },
  unit: {
    title: 'Unit Converter for Everyday Measurements | ToolVoid',
    description: 'Convert common measurements quickly with ToolVoid. Switch between units for length, weight, temperature, and more with instant results and no confusion.',
  },
  base64: {
    title: 'Base64 Encoder and Decoder for Fast Conversion | ToolVoid',
    description: 'Encode and decode Base64 data instantly with ToolVoid. Convert text or files quickly in your browser and keep your workflow moving without delay.',
  },
  emi: {
    title: 'EMI Calculator for Loans and Repayments | ToolVoid',
    description: 'Estimate EMI payments for home, car, or personal loans with ToolVoid. Compare amounts, rates, and tenures fast to plan repayments clearly.',
  },
  loan: {
    title: 'Loan Eligibility Calculator for Smart Planning | ToolVoid',
    description: 'Check loan eligibility with ToolVoid in minutes. Compare income, expenses, and credit input to estimate borrowing range and plan your next move clearly.',
  },
  invoice: {
    title: 'Invoice Generator for Faster Client Billing | ToolVoid',
    description: 'Create professional invoices fast with ToolVoid. Add totals, taxes, and details, then download a clean PDF instantly for client billing.',
  },
  'word-counter': {
    title: 'Word Counter for Writing and SEO Checks | ToolVoid',
    description: 'Count words, characters, and reading time instantly with ToolVoid. Review text metrics for writing, SEO, and quick edits without extra tools.',
  },
  json: {
    title: 'JSON Formatter for Clean Dev Data | ToolVoid',
    description: 'Format and validate JSON in your browser with ToolVoid. Clean messy data, spot errors, and work faster with instant structured results.',
  },
  tts: {
    title: 'Text to Speech Converter for Natural Audio | ToolVoid',
    description: 'Convert text to natural speech instantly with ToolVoid. Choose a voice, adjust speed, and download audio for free with no signup required.',
  },
  video: {
    title: 'Video Converter for Common Formats | ToolVoid',
    description: 'Convert video files quickly with ToolVoid. Resize or prepare common formats for upload, playback, and sharing with instant browser-based results.',
  },
  resume: {
    title: 'Resume Builder for ATS-Friendly Profiles | ToolVoid',
    description: 'Build a cleaner resume fast with ToolVoid. Add experience, skills, and education, then export a polished profile ready for applications.',
  },
  'capsule-manager': {
    title: 'Capsule Manager for Saving AI Context | ToolVoid',
    description: 'Save AI chat context in one place with ToolVoid. Keep prompts, decisions, and project details organized so you can resume work instantly.',
  },
};

export function createToolMetadata(slug) {
  const metadata = TOOL_METADATA[slug];
  if (!metadata) throw new Error(`Missing metadata for tool: ${slug}`);

  const url = `${BASE_URL}/${slug}`;
  return {
    ...metadata,
    alternates: { canonical: url },
    openGraph: { title: metadata.title, description: metadata.description, url, type: 'website' },
  };
}
