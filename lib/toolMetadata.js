const BASE_URL = 'https://toolvoid.com';

const TOOL_METADATA = {
  story: {
    title: 'Plan a Short-Form Video Story | ToolVoid Script Studio',
    description: 'Shape a premise into scenes, narration, and pacing notes for a short video. ToolVoid helps creators turn a loose idea into an editable production draft.',
  },
  hashtag: {
    title: 'Hashtag Sets by Platform and Topic | ToolVoid',
    description: 'Build a balanced tag list for a specific post, audience, and social platform. Compare broad and niche hashtag ideas before adding them to a caption.',
  },
  imagegen: {
    title: 'Turn a Written Brief into an AI Image | ToolVoid',
    description: 'Describe a subject, visual style, and composition to create an image draft for a campaign, concept board, or social post. Refine the prompt and generate another direction.',
  },
  keyword: {
    title: 'Explore Search Terms for Your Next Article | ToolVoid',
    description: 'Start with a topic and audience to collect SEO keyword ideas, related phrases, and search intent angles. Use the results to shape a brief, not as a substitute for search-volume research.',
  },
  'image-tools': {
    title: 'Prepare Image Files for Web and Print | ToolVoid',
    description: 'Adjust image dimensions, crop framing, reduce file weight, or convert formats in one workspace. Check the result before using it in a listing, document, or page.',
  },
  pdf: {
    title: 'Export PDF Pages as Shareable Images | ToolVoid',
    description: 'Render pages from a PDF into JPG, PNG, or WebP images, then choose the pages and quality you need. Useful for previews, slides, and systems that accept images only.',
  },
  passport: {
    title: 'Crop Portraits for Passport and ID Applications | ToolVoid',
    description: 'Prepare a portrait with country and document presets, then adjust framing and background for review. Confirm the receiving authority’s latest photo rules before submitting.',
  },
  qr: {
    title: 'Create QR Codes for Menus, Links, and Contact Cards | ToolVoid',
    description: 'Encode a URL, short message, or contact details as a downloadable QR code. Test the finished image with a phone camera before printing or sharing it widely.',
  },
  password: {
    title: 'Generate a Password with Your Own Character Rules | ToolVoid',
    description: 'Choose password length and whether to include letters, digits, or symbols. Generate a fresh credential for a single account and store it in a trusted password manager.',
  },
  domain: {
    title: 'Check a Name Across Domain Extensions | ToolVoid',
    description: 'Look up a proposed domain, compare available extensions, and inspect registration details for names already in use. Verify availability with a registrar before purchase.',
  },
  unit: {
    title: 'Convert Measurements Across Everyday Unit Systems | ToolVoid',
    description: 'Translate values for length, mass, temperature, and other supported measurements. Keep the original value visible while comparing the converted result and precision.',
  },
  base64: {
    title: 'Inspect Base64 Text and File Encodings | ToolVoid',
    description: 'Encode plain text or decode a Base64 string to inspect its contents. Use the file workflow for data URLs and remember that Base64 is an encoding, not encryption.',
  },
  emi: {
    title: 'Estimate Monthly Loan Instalments and Interest | ToolVoid',
    description: 'Compare a loan amount, annual rate, and repayment term to estimate the monthly instalment and total interest. Use the schedule as a planning estimate, not a lender quote.',
  },
  loan: {
    title: 'Estimate Borrowing Capacity from Monthly Cash Flow | ToolVoid',
    description: 'Enter income, current obligations, and loan assumptions to explore an indicative borrowing range. Actual eligibility depends on lender policy, credit review, and verified documents.',
  },
  invoice: {
    title: 'Draft Itemized Invoices for Client Work | ToolVoid',
    description: 'Add seller and client details, line items, taxes, and payment terms, then export an invoice PDF. Review local tax and record-keeping requirements before sending.',
  },
  'word-counter': {
    title: 'Measure Draft Length, Characters, and Reading Time | ToolVoid',
    description: 'Paste or revise a draft while tracking words, characters, and estimated reading duration. Use the metrics to fit an assignment, caption, or editorial brief.',
  },
  json: {
    title: 'Format JSON and Locate Syntax Errors | ToolVoid',
    description: 'Paste a JSON payload to format or minify it and find parsing errors before debugging an API response or configuration file. Check the output before sharing sensitive data.',
  },
  tts: {
    title: 'Listen to Written Copy with Text-to-Speech | ToolVoid',
    description: 'Choose a voice and playback speed to review written material as audio. Use speech output for proofreading, accessibility, or a draft narration, then check pronunciation.',
  },
  video: {
    title: 'Convert and Resize Clips for Playback | ToolVoid',
    description: 'Prepare a video for a target device or upload by changing format, dimensions, or file size. Preview the exported clip and retain the original until quality is checked.',
  },
  resume: {
    title: 'Organize Experience into an Application-Ready Resume | ToolVoid',
    description: 'Arrange work history, skills, and education in a structured resume layout. Tailor each version to the vacancy and verify dates, links, and exported PDF formatting.',
  },
  'capsule-manager': {
    title: 'Keep Reusable AI Project Context in Capsules | ToolVoid',
    description: 'Save prompts, decisions, and handoff notes as searchable project capsules in your browser. Reopen the relevant context when a long-running task moves to a new chat.',
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
