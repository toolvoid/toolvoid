const BASE_URL = 'https://toolvoid.com';

const TOOL_METADATA = {
  story: {
    title: 'AI Script Generator for Video Creators Online | ToolVoid',
    description: 'Draft clear video scripts with AI for creators, including structured ideas, narration, and visual direction. Build a starting point for your next video quickly.',
  },
  hashtag: {
    title: 'AI Hashtag Generator for Social Posts Online | ToolVoid',
    description: 'Create relevant AI hashtag suggestions for Instagram, TikTok, LinkedIn, and more. Choose a topic and platform to prepare a focused set of social tags.',
  },
  imagegen: {
    title: 'AI Image Generator From Text Prompts Free | ToolVoid',
    description: 'Turn written prompts into original AI images for concepts, social posts, and creative projects. Describe your idea and generate a visual starting point online.',
  },
  keyword: {
    title: 'SEO Keyword Generator for Content Ideas | ToolVoid',
    description: 'Discover AI-assisted SEO keyword ideas, related terms, and long-tail phrases for content planning. Start researching topics for pages, posts, and campaigns.',
  },
  'image-tools': {
    title: 'Online Image Toolkit for Editing Photos | ToolVoid',
    description: 'Edit images in your browser with tools to resize, compress, crop, convert, and optimize files. Prepare photos and graphics for web, work, or sharing.',
  },
  pdf: {
    title: 'PDF to Image Converter for JPG and PNG Files | ToolVoid',
    description: 'Convert PDF pages into high-quality JPG, PNG, or WebP images in your browser. Choose pages and export images for sharing, presentations, or reuse.',
  },
  passport: {
    title: 'Passport Photo Maker for ID Photos Online | ToolVoid',
    description: 'Create properly sized passport, visa, and ID photos online. Crop, adjust, and export a print-ready image while keeping photo editing simple and private.',
  },
  qr: {
    title: 'QR Code Generator With Custom Downloads | ToolVoid',
    description: 'Make custom QR codes, barcodes, and data matrices for links, text, and contact details. Adjust color and size, then download a ready-to-use image.',
  },
  password: {
    title: 'Secure Random Password Generator Online | ToolVoid',
    description: 'Generate strong random passwords with your preferred length, letters, numbers, and symbols. Create unique credentials quickly without storing them on a server.',
  },
  domain: {
    title: 'Domain Availability Checker for Names Online | ToolVoid',
    description: 'Search domain availability across popular extensions and explore a name for your next project. Check options quickly before registering a domain elsewhere.',
  },
  unit: {
    title: 'Unit Converter for Everyday Measurements | ToolVoid',
    description: 'Convert length, weight, temperature, area, time, speed, and more with one simple online tool. Get clear measurement conversions instantly for everyday tasks.',
  },
  base64: {
    title: 'Base64 Encoder and Decoder for Text Files | ToolVoid',
    description: 'Encode or decode Base64 text, images, and files in your browser. Convert data formats quickly for development, debugging, and data-sharing workflows.',
  },
  emi: {
    title: 'EMI Calculator for Home and Personal Loans | ToolVoid',
    description: 'Estimate monthly EMI payments for home, car, and personal loans. Compare loan amounts, interest rates, and tenures to understand repayment costs clearly.',
  },
  loan: {
    title: 'Loan Eligibility Calculator for Indian Borrowers | ToolVoid',
    description: 'Estimate personal loan eligibility using income, age, expenses, and credit details. Review an indicative borrowing range and repayment outlook before applying.',
  },
  invoice: {
    title: 'Invoice Generator With PDF Download Online | ToolVoid',
    description: 'Create professional invoices with line items, taxes, payment details, and your branding. Review totals and download a polished PDF ready to send to clients.',
  },
  'word-counter': {
    title: 'Word Counter and Character Counter Online | ToolVoid',
    description: 'Count words, characters, sentences, paragraphs, reading time, and keyword use in your writing. Get useful text statistics instantly while you work.',
  },
  json: {
    title: 'JSON Formatter and Validator for Developers | ToolVoid',
    description: 'Format, validate, beautify, and minify JSON in your browser. Spot syntax problems, improve readability, and work with structured data more confidently.',
  },
  tts: {
    title: 'Text to Speech Reader With Natural Voices | ToolVoid',
    description: 'Listen to written text with browser-based speech output. Choose a voice and settings to hear articles, notes, drafts, and other content more comfortably.',
  },
  video: {
    title: 'Online Video Converter for Common Formats | ToolVoid',
    description: 'Convert, resize, compress, and prepare video files in your browser. Work with common formats and create versions suited to sharing, playback, or social posts.',
  },
  resume: {
    title: 'ATS Resume Builder for Professional PDFs | ToolVoid',
    description: 'Build a professional, ATS-friendly resume with guided sections for experience, education, and skills. Customize the layout and download a ready-to-send PDF.',
  },
  'capsule-manager': {
    title: 'AI Conversation Capsule Manager Online App | ToolVoid',
    description: 'Save, organize, and restore reusable AI conversation context in one place. Keep prompts, decisions, and chat details ready for your next working session.',
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
