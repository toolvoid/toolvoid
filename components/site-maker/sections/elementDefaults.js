const PALETTES = {
  hero: '#172554', text: '#1e1b4b', about: '#1e293b', gallery: '#312e81', services: '#134e4a', testimonials: '#3f1d2e', pricing: '#3f3a17', contact: '#1f2937', support: '#172554', partners: '#f4fbfb', footer: '#202124', video: '#0f3d56', faq: '#3b2d1e',
};

const COPY = {
  hero: ['Build something people remember', 'A clear, focused message for your new website.', 'Get started'],
  text: ['Write your own story', 'Click any text to write your own heading, description, announcement, or callout.', 'Learn more'],
  about: ['About our work', 'Tell visitors what makes your project different.', 'Learn more'],
  gallery: ['Selected work', 'A curated collection of thoughtful details.', 'View all'],
  services: ['What we do', 'Creative direction, design, and delivery for ambitious teams.', 'Explore services'],
  testimonials: ['Loved by clients', '“The team made every part of the process feel thoughtful and easy.”', 'Read stories'],
  pricing: ['Simple pricing', 'Everything you need to make an impact.', 'Choose a plan'],
  contact: ['Let’s work together', 'Tell us a little about what you want to make next.', 'Send message'],
  support: ['Need a hand?', 'Give visitors a simple way to get help, report an issue, or reach your team.', 'Contact support'],
  partners: ['Trusted by thoughtful teams', 'Use this space for clients, collaborators, certifications, or community partners.', ''],
  footer: ['Your brand', 'A short line about what you do and why it matters.', ''],
  video: ['See it in action', 'A closer look at the work, process, and people behind it.', 'Play video'],
  faq: ['Frequently asked questions', 'Answers to the things visitors ask most.', 'Get in touch'],
};

const id = () => crypto.randomUUID();
const styleFor = (type) => ({ fontFamily: type === 'heading' ? 'Syne' : 'Inter', fontSize: type === 'heading' ? 42 : type === 'button' ? 16 : 19, fontWeight: type === 'heading' ? 800 : type === 'button' ? 700 : 400, textAlign: 'left', color: type === 'button' ? '#1e1b4b' : '#ffffff', backgroundColor: type === 'button' ? '#ffffff' : 'transparent', borderWidth: 0, borderStyle: 'none', borderColor: '#ffffff', borderRadius: type === 'button' ? 999 : 14, boxShadow: 'none', opacity: 1 });
const element = (type, content, x, y, width, height, zIndex) => ({ id: id(), type, content, x, y, width, height, zIndex, style: styleFor(type), responsive: { tablet: null, mobile: null }, locked: false });
const styled = (type, content, x, y, width, height, zIndex, style) => ({ ...element(type, content, x, y, width, height, zIndex), style: { ...styleFor(type), ...style } });

export function createDefaultElements(type) {
  const [heading, text, button] = COPY[type];
  if (type === 'gallery') return [
    element('heading', heading, 84, 58, 650, 82, 2), element('text', text, 84, 150, 650, 58, 3),
    element('image', '', 84, 245, 310, 205, 4), element('image', '', 425, 245, 310, 205, 5), element('image', '', 766, 245, 310, 205, 6),
  ];
  if (type === 'services') return [
    element('heading', heading, 84, 60, 700, 80, 2), element('text', text, 84, 152, 660, 58, 3),
    styled('text', '01 — Strategy\nClear positioning and a plan that makes the next step obvious.', 84, 255, 300, 130, 4, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,.18)', borderRadius: 18, padding: 20, fontSize: 16 }),
    styled('text', '02 — Design\nA visual system that feels memorable and easy to use.', 450, 255, 300, 130, 5, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,.18)', borderRadius: 18, padding: 20, fontSize: 16 }),
    styled('text', '03 — Launch\nA thoughtful finish, ready for people to use and share.', 816, 255, 300, 130, 6, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,.18)', borderRadius: 18, padding: 20, fontSize: 16 }),
  ];
  if (type === 'testimonials') return [
    element('heading', heading, 84, 60, 620, 80, 2),
    styled('text', '“The process was simple, fast, and the final result felt exactly like us.”\n\n— A happy client', 84, 175, 470, 180, 3, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.1)', borderRadius: 22, padding: 28, fontSize: 18, fontStyle: 'italic' }),
    styled('text', '“A rare mix of sharp thinking, great communication, and beautiful execution.”\n\n— Another happy client', 630, 225, 470, 180, 4, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.06)', borderRadius: 22, padding: 28, fontSize: 18, fontStyle: 'italic' }),
  ];
  if (type === 'pricing') return [
    element('heading', heading, 84, 48, 650, 76, 2), element('text', text, 84, 132, 650, 48, 3),
    styled('text', 'Starter\n₹0 / month\nFor personal projects', 84, 220, 290, 155, 4, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.08)', borderRadius: 18, padding: 22, fontSize: 18 }),
    styled('text', 'Pro\n₹999 / month\nFor growing teams', 455, 200, 290, 175, 5, { whiteSpace: 'pre-line', backgroundColor: '#ffffff', color: '#1e1b4b', borderRadius: 18, padding: 22, fontSize: 18, boxShadow: '0 16px 35px rgba(0,0,0,.18)' }),
    styled('text', 'Custom\nLet’s talk\nFor tailored work', 826, 220, 290, 155, 6, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.08)', borderRadius: 18, padding: 22, fontSize: 18 }),
  ];
  if (type === 'faq') return [
    element('heading', heading, 84, 52, 660, 76, 2), element('text', text, 84, 135, 620, 50, 3),
    ...['What happens after I get in touch?','Can I change this content?','Is this section mobile-friendly?','Where can visitors find help?'].map((question, index) => styled('text', `${question}                                            +`, 84, 220 + (index * 52), 930, 40, index + 4, { backgroundColor: 'rgba(255,255,255,.08)', borderRadius: 10, padding: 10, fontSize: 15 })),
  ];
  if (type === 'contact' || type === 'support') return [
    element('heading', heading, 84, 70, 610, 90, 2), element('text', text, 84, 175, 510, 75, 3), element('button', button, 84, 285, 190, 48, 4),
    styled('text', type === 'support' ? 'Email support\nhelp@yourbrand.com\n\nResponse time\nUsually within one business day' : 'Start a conversation\nTell us about your project and we’ll get back to you soon.', 720, 90, 370, 220, 5, { whiteSpace: 'pre-line', backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,.18)', borderRadius: 20, padding: 28, fontSize: 17 }),
  ];
  if (type === 'partners') return [
    styled('heading', heading, 84, 45, 720, 62, 2, { color: '#17323d', fontSize: 36 }), styled('text', text, 84, 115, 820, 45, 3, { color: '#3b5560', fontSize: 16 }),
    ...['NORTHSTAR','LUMEN','GOOD GROUND','ORBITAL','MOSS & CO.'].map((name, index) => styled('text', name, 84 + (index * 210), 230, 170, 54, index + 4, { color: '#49717b', fontSize: 18, fontWeight: 800, textAlign: 'center', padding: 14, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(23,50,61,.15)', borderRadius: 10 })),
  ];
  if (type === 'footer') return [
    styled('heading', heading, 84, 55, 260, 46, 2, { fontSize: 30 }), styled('text', text, 84, 120, 260, 78, 3, { color: '#b5bdc9', fontSize: 15 }),
    styled('text', 'Explore\nWork\nAbout\nServices', 420, 58, 180, 150, 4, { whiteSpace: 'pre-line', color: '#e8edf5', fontSize: 15, fontWeight: 500 }),
    styled('text', 'Questions?\nHelp center\nContact\nPress', 640, 58, 180, 150, 5, { whiteSpace: 'pre-line', color: '#e8edf5', fontSize: 15, fontWeight: 500 }),
    styled('text', 'Stay in the loop\nYour email address\n\nSubscribe →', 860, 58, 250, 150, 6, { whiteSpace: 'pre-line', color: '#e8edf5', fontSize: 15, fontWeight: 500, backgroundColor: 'rgba(255,255,255,.06)', borderRadius: 14, padding: 18 }),
    styled('text', '© 2026 Your brand · Privacy · Terms', 84, 340, 700, 30, 7, { color: '#8f99aa', fontSize: 13 }),
  ];
  const hasImage = ['hero', 'about', 'gallery', 'video'].includes(type);
  const headingX = hasImage ? 84 : 120;
  const image = hasImage ? [element('image', '', type === 'about' ? 84 : 720, 82, type === 'gallery' ? 390 : 390, 280, 1)] : [];
  return [
    element('heading', heading, headingX, 70, hasImage ? 650 : 960, 150, 2),
    element('text', text, headingX, 255, hasImage ? 570 : 760, 80, 3),
    element('button', button, headingX, 370, 160, 48, 4),
    ...image,
  ];
}

export function createSection(type) {
  const base = PALETTES[type];
  return { id: id(), type, elements: createDefaultElements(type), background: base, backgroundType: 'solid', backgroundColors: [base, '#7c3aed'], backgroundAngle: 135, size: 'medium', padding: '48px', animation: 'none', hidden: false, height: type === 'hero' ? 500 : 440 };
}

export const SECTION_BACKGROUNDS = PALETTES;
