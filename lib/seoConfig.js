// lib/seoConfig.js
// ToolSite - Complete SEO Configuration for all 21 tools + static pages

const BASE_URL = 'https://toolvoid.com' // apna domain yahan daalo

export const siteMeta = {
  siteName: 'ToolSite',
  baseUrl: BASE_URL,
  defaultOgImage: `${BASE_URL}/og-default.png`,
  twitterHandle: '@toolsite',
}

export const toolsSEO = {

  // ─── TOOLS ────────────────────────────────────────────────

  'base64': {
    title: 'Base64 Encoder & Decoder Online — Free | ToolSite',
    description: 'Encode or decode Base64 strings instantly in your browser. Supports text, URLs, and files. No signup required — 100% free.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 online', 'encode decode base64', 'base64 converter'],
    ogImage: `${BASE_URL}/og/base64.png`,
    schema: 'WebApplication',
  },

  'domain': {
    title: 'Domain Checker — Check Domain Availability & WHOIS | ToolSite',
    description: 'Instantly check domain name availability, WHOIS info, DNS records, and SSL status. Find your perfect domain for free.',
    keywords: ['domain checker', 'domain availability checker', 'whois lookup', 'dns lookup', 'check domain name'],
    ogImage: `${BASE_URL}/og/domain.png`,
    schema: 'WebApplication',
  },

  'emi': {
    title: 'EMI Calculator Online — Loan & Interest Calculator | ToolSite',
    description: 'Calculate your EMI for home loan, car loan, personal loan instantly. Get monthly breakdown, total interest and amortization schedule.',
    keywords: ['emi calculator', 'loan emi calculator', 'home loan emi', 'car loan calculator', 'monthly installment calculator'],
    ogImage: `${BASE_URL}/og/emi.png`,
    schema: 'WebApplication',
  },

  'hashtag': {
    title: 'Hashtag Generator — AI-Powered Free Hashtags | ToolSite',
    description: 'Generate trending hashtags for Instagram, Twitter, LinkedIn and TikTok using AI. Boost your reach with the best hashtags for your content.',
    keywords: ['hashtag generator', 'instagram hashtags', 'ai hashtag generator', 'free hashtag tool', 'trending hashtags'],
    ogImage: `${BASE_URL}/og/hashtag.png`,
    schema: 'WebApplication',
  },

  'image-generator': {
    title: 'AI Image Generator — Free Text to Image Online | ToolSite',
    description: 'Generate stunning AI images from text prompts for free. Powered by advanced AI models. No watermark, no signup needed.',
    keywords: ['ai image generator', 'text to image', 'free ai image generator', 'ai art generator', 'image from text'],
    ogImage: `${BASE_URL}/og/image-generator.png`,
    schema: 'WebApplication',
  },

  'image-tools': {
    title: 'Image Tools — Resize, Convert, Compress & Remove BG | ToolSite',
    description: 'All-in-one free image toolkit. Resize, compress, crop, convert format, remove background, and more — all in your browser.',
    keywords: ['image tools', 'image resizer', 'remove background online', 'image compressor', 'image converter free'],
    ogImage: `${BASE_URL}/og/image-tools.png`,
    schema: 'WebApplication',
  },

  'invoice': {
    title: 'Free Invoice Generator — Create & Download PDF Invoice | ToolSite',
    description: 'Create professional invoices online for free. Add your logo, items, taxes, multi-currency support. Download as PDF instantly.',
    keywords: ['invoice generator', 'free invoice maker', 'online invoice creator', 'pdf invoice', 'professional invoice template'],
    ogImage: `${BASE_URL}/og/invoice.png`,
    schema: 'WebApplication',
  },

  'json': {
    title: 'JSON Formatter & Validator Online — Free | ToolSite',
    description: 'Format, validate, minify and beautify JSON online. Instant syntax highlighting and error detection. Free JSON viewer and editor.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier', 'online json viewer'],
    ogImage: `${BASE_URL}/og/json.png`,
    schema: 'WebApplication',
  },

  'keyword': {
    title: 'SEO Keyword Generator — Free Keyword Research Tool | ToolSite',
    description: 'Generate high-ranking SEO keywords for your content, blog, or YouTube videos. AI-powered keyword suggestions with search volume insights.',
    keywords: ['keyword generator', 'seo keyword tool', 'free keyword research', 'keyword ideas', 'youtube keyword generator'],
    ogImage: `${BASE_URL}/og/keyword.png`,
    schema: 'WebApplication',
  },

  'loan': {
    title: 'Loan Calculator — Calculate Interest & Monthly Payment | ToolSite',
    description: 'Free loan calculator to estimate monthly payments, total interest, and repayment schedule for any type of loan. Simple and accurate.',
    keywords: ['loan calculator', 'loan interest calculator', 'personal loan calculator', 'loan repayment calculator', 'monthly payment calculator'],
    ogImage: `${BASE_URL}/og/loan.png`,
    schema: 'WebApplication',
  },

  'passport': {
    title: 'Passport Photo Maker — Free Online Passport Size Photo | ToolSite',
    description: 'Create passport size photos online for free. Supports US, UK, India, EU and 50+ country formats. Download print-ready JPG instantly.',
    keywords: ['passport photo maker', 'passport size photo online', 'visa photo maker', 'passport photo generator', 'id photo online'],
    ogImage: `${BASE_URL}/og/passport.png`,
    schema: 'WebApplication',
  },

  'password': {
    title: 'Password Generator — Strong & Secure Random Passwords | ToolSite',
    description: 'Generate strong, random passwords instantly. Customize length, symbols, numbers. 100% client-side — your passwords never leave your browser.',
    keywords: ['password generator', 'strong password generator', 'random password', 'secure password maker', 'free password generator'],
    ogImage: `${BASE_URL}/og/password.png`,
    schema: 'WebApplication',
  },

  'pdf': {
    title: 'Free PDF Tools — Convert, Merge, Split, Compress PDF | ToolSite',
    description: '19 free PDF tools in one place. Convert, merge, split, compress, rotate, watermark, and secure PDF files. No upload to server needed.',
    keywords: ['pdf tools', 'pdf converter', 'merge pdf', 'split pdf', 'compress pdf online', 'pdf to word free'],
    ogImage: `${BASE_URL}/og/pdf.png`,
    schema: 'WebApplication',
  },

  'qr': {
    title: 'QR Code Generator — Free Custom QR Codes | ToolSite',
    description: 'Generate QR codes for URLs, text, email, WiFi, contact cards and more. Customize colors, add logo. Download PNG or SVG for free.',
    keywords: ['qr code generator', 'free qr code maker', 'custom qr code', 'qr code creator online', 'qr code download'],
    ogImage: `${BASE_URL}/og/qr.png`,
    schema: 'WebApplication',
  },

  'resume': {
    title: 'Free Resume Builder — ATS-Friendly Resume Templates | ToolSite',
    description: 'Build a professional resume online with 50+ ATS-friendly templates. Pass ATS checks, download as PDF. No account needed.',
    keywords: ['resume builder', 'free resume maker', 'ats resume builder', 'resume templates', 'cv maker online free'],
    ogImage: `${BASE_URL}/og/resume.png`,
    schema: 'WebApplication',
  },

  'story': {
    title: 'AI Story Generator — Free Short Story Writer Online | ToolSite',
    description: 'Generate creative short stories, fiction, and narratives using AI. Choose genre, characters and theme. Powered by Groq & Gemini.',
    keywords: ['ai story generator', 'short story writer', 'ai fiction generator', 'story maker online', 'free story generator ai'],
    ogImage: `${BASE_URL}/og/story.png`,
    schema: 'WebApplication',
  },

  'tts': {
    title: 'Text to Speech — Free Online TTS Voice Generator | ToolSite',
    description: 'Convert text to natural-sounding speech online for free. Multiple voices and languages. Download MP3 or listen directly in browser.',
    keywords: ['text to speech', 'tts online', 'free text to speech', 'voice generator', 'text to voice converter'],
    ogImage: `${BASE_URL}/og/tts.png`,
    schema: 'WebApplication',
  },

  'unit': {
    title: 'Unit Converter — Convert Length, Weight, Temperature & More | ToolSite',
    description: 'Free online unit converter for length, weight, temperature, area, volume, speed and more. Instant conversion with formula shown.',
    keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'online unit conversion'],
    ogImage: `${BASE_URL}/og/unit.png`,
    schema: 'WebApplication',
  },

  'video': {
    title: 'Online Video Tools — Trim, Convert & Compress Video Free | ToolSite',
    description: 'Free browser-based video tools. Trim, compress, convert video format and more — no upload to server, everything runs in your browser.',
    keywords: ['video tools online', 'video compressor', 'video trimmer online', 'video converter free', 'browser video editor'],
    ogImage: `${BASE_URL}/og/video.png`,
    schema: 'WebApplication',
  },

  'word-counter': {
    title: 'Word Counter & Text Analyzer — Free Online | ToolSite',
    description: 'Count words, characters, sentences and paragraphs. Analyze reading time, keyword density, and text statistics instantly for free.',
    keywords: ['word counter', 'character counter', 'text analyzer', 'word count online', 'reading time calculator'],
    ogImage: `${BASE_URL}/og/word-counter.png`,
    schema: 'WebApplication',
  },

  // ─── STATIC PAGES ─────────────────────────────────────────

  'tools': {
    title: 'All Free Online Tools — 20+ Web Tools | ToolSite',
    description: 'ToolSite offers 20+ free online tools — PDF tools, resume builder, AI image generator, QR code maker, calculators, and more. No signup required.',
    keywords: ['free online tools', 'web tools', 'toolsite', 'pdf tools', 'ai tools free', 'online utilities'],
    ogImage: `${BASE_URL}/og/tools.png`,
    schema: 'WebSite',
  },

  'about': {
    title: 'About ToolSite — Free Tools Built for Everyone',
    description: 'Learn about ToolSite — a collection of 20+ free, privacy-friendly online tools for everyday use. No account needed, no data stored.',
    keywords: ['about toolsite', 'toolsite info'],
    ogImage: `${BASE_URL}/og-default.png`,
    schema: 'WebPage',
  },

  'privacy': {
    title: 'Privacy Policy | ToolSite',
    description: 'ToolSite privacy policy. We value your privacy — most tools run entirely in your browser and we do not store your data.',
    keywords: ['toolsite privacy policy'],
    ogImage: `${BASE_URL}/og-default.png`,
    schema: 'WebPage',
  },

  'terms': {
    title: 'Terms of Service | ToolSite',
    description: 'Terms and conditions for using ToolSite and its free online tools.',
    keywords: ['toolsite terms of service'],
    ogImage: `${BASE_URL}/og-default.png`,
    schema: 'WebPage',
  },
}

// ─── Helper: Get metadata for Next.js generateMetadata() ──────────────────────

export function getToolMetadata(slug) {
  const seo = toolsSEO[slug]
  if (!seo) return {}

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}/${slug === 'tools' ? 'tools' : `tools/${slug}`}`,
      siteName: siteMeta.siteName,
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    alternates: {
      canonical: `${BASE_URL}/${slug === 'tools' ? 'tools' : `tools/${slug}`}`,
    },
  }
}