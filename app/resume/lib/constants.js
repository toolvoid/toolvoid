import { genId } from './utils'

// ─── 50 TEMPLATES ─────────────────────────────────────────────────────────────
export const TEMPLATES = {
  // ── PROFESSIONAL ──────────────────────────────────────────────────
  'modern-pro':     { name:'Modern Pro',       cat:'Professional', color:'#4A90D9', desc:'Clean two-column, blue header',         base:'two-col',   ov:{ primary:'#1E2D4A', secondary:'#4A90D9', accent:'#10B981' }},
  'executive':      { name:'Executive',        cat:'Professional', color:'#C53030', desc:'Bold centered header, senior roles',    base:'centered',  ov:{ primary:'#1A1A2E', secondary:'#C53030', accent:'#E74C3C' }},
  'corp-navy':      { name:'Corporate Navy',   cat:'Professional', color:'#1E3A8A', desc:'Navy and gold, structured layout',      base:'accent-border',   ov:{ primary:'#1E3A8A', secondary:'#2563EB', accent:'#F59E0B' }},
  'corp-slate':     { name:'Corporate Slate',  cat:'Professional', color:'#475569', desc:'Slate gray, minimal borders',           base:'right-heavy',   ov:{ primary:'#334155', secondary:'#64748B', accent:'#06B6D4' }},
  'prestige':       { name:'Prestige',         cat:'Professional', color:'#6D28D9', desc:'Purple elegance, premium feel',         base:'hero-header',  ov:{ primary:'#1E1B4B', secondary:'#7C3AED', accent:'#A78BFA' }},
  'authority':      { name:'Authority',        cat:'Professional', color:'#111827', desc:'All-black, maximum authority',          base:'centered',  ov:{ primary:'#111827', secondary:'#374151', accent:'#9CA3AF' }},
  'pro-teal':       { name:'Pro Teal',         cat:'Professional', color:'#0D9488', desc:'Teal accents, modern corporate',        base:'split-equal',   ov:{ primary:'#134E4A', secondary:'#0D9488', accent:'#34D399' }},
  'traditional':    { name:'Traditional',      cat:'Professional', color:'#92400E', desc:'Classic serif, timeless design',        base:'centered',  ov:{ primary:'#1C1917', secondary:'#92400E', accent:'#D97706' }},
  'pro-crimson':    { name:'Pro Crimson',      cat:'Professional', color:'#9B1C1C', desc:'Bold red accents, power statement',     base:'cards',   ov:{ primary:'#1F2937', secondary:'#DC2626', accent:'#F87171' }},
  'corporate-blue': { name:'Corporate Blue',   cat:'Professional', color:'#1D4ED8', desc:'Classic blue, universally accepted',    base:'magazine',   ov:{ primary:'#1E3A5F', secondary:'#1D4ED8', accent:'#60A5FA' }},
  // ── MINIMAL ───────────────────────────────────────────────────────
  'minimalist':     { name:'Minimalist',       cat:'Minimal',     color:'#374151', desc:'Pure black & white, maximum clarity',   base:'minimal',   ov:{ primary:'#111', secondary:'#374151', accent:'#6B7280' }},
  'clean-slate':    { name:'Clean Slate',      cat:'Minimal',     color:'#6B7280', desc:'Lots of whitespace, serif typography',  base:'ultra-clean',   ov:{ primary:'#1F2937', secondary:'#6B7280', accent:'#9CA3AF' }},
  'zen':            { name:'Zen',              cat:'Minimal',     color:'#92400E', desc:'Warm minimal, sepia tones',             base:'table-format',   ov:{ primary:'#44403C', secondary:'#78716C', accent:'#A8A29E' }},
  'nordic':         { name:'Nordic',           cat:'Minimal',     color:'#0EA5E9', desc:'Scandinavian clean, sky blue accents',  base:'accent-border',   ov:{ primary:'#0F172A', secondary:'#0EA5E9', accent:'#38BDF8' }},
  'mono-clean':     { name:'Mono Clean',       cat:'Minimal',     color:'#1F2937', desc:'Monochrome, pure typography focus',     base:'mono-dev',   ov:{ primary:'#000', secondary:'#374151', accent:'#9CA3AF' }},
  'thin-line':      { name:'Thin Line',        cat:'Minimal',     color:'#64748B', desc:'Hairline borders, ultra-minimal',       base:'right-heavy',   ov:{ primary:'#1E293B', secondary:'#64748B', accent:'#CBD5E1' }},
  'paper':          { name:'Paper',            cat:'Minimal',     color:'#D97706', desc:'Paper-like texture feel, warm tones',   base:'ultra-clean',   ov:{ primary:'#451A03', secondary:'#D97706', accent:'#FCD34D' }},
  'spartan':        { name:'Spartan',          cat:'Minimal',     color:'#111827', desc:'Brutally minimal, text-only style',     base:'compact',   ov:{ primary:'#030712', secondary:'#111827', accent:'#374151' }},
  // ── CREATIVE ──────────────────────────────────────────────────────
  'creative-burst': { name:'Creative Burst',   cat:'Creative',    color:'#9333EA', desc:'Gradient sidebar, great for designers', base:'sidebar',   ov:{ primary:'#7B2D8B', secondary:'#A855F7', accent:'#EC4899' }},
  'creative-coral': { name:'Creative Coral',   cat:'Creative',    color:'#FF6B6B', desc:'Coral sidebar, warm creative energy',  base:'hero-header',   ov:{ primary:'#C2410C', secondary:'#FF6B6B', accent:'#FBBF24' }},
  'creative-cyan':  { name:'Creative Cyan',    cat:'Creative',    color:'#06B6D4', desc:'Cyan sidebar, fresh and modern',       base:'split-equal',   ov:{ primary:'#164E63', secondary:'#06B6D4', accent:'#34D399' }},
  'designer':       { name:'Designer',         cat:'Creative',    color:'#F97316', desc:'Bold orange, unique typography',        base:'accent-border',   ov:{ primary:'#7C2D12', secondary:'#F97316', accent:'#FDE68A' }},
  'portfolio':      { name:'Portfolio',        cat:'Creative',    color:'#EC4899', desc:'Visual-heavy, for creatives & artists', base:'skill-first',   ov:{ primary:'#831843', secondary:'#EC4899', accent:'#F9A8D4' }},
  'artistic':       { name:'Artistic',         cat:'Creative',    color:'#8B5CF6', desc:'Expressive gradient header, creative',  base:'hero-header',   ov:{ primary:'#2E1065', secondary:'#8B5CF6', accent:'#C4B5FD' }},
  'vivid':          { name:'Vivid',            cat:'Creative',    color:'#10B981', desc:'Vibrant green, energetic layout',       base:'magazine',   ov:{ primary:'#064E3B', secondary:'#10B981', accent:'#6EE7B7' }},
  'bold-split':     { name:'Bold Split',       cat:'Creative',    color:'#EF4444', desc:'Half-page split, high contrast',        base:'right-heavy',   ov:{ primary:'#7F1D1D', secondary:'#EF4444', accent:'#FCA5A5' }},
  // ── TECH ──────────────────────────────────────────────────────────
  'tech-dark':      { name:'Tech Dark',        cat:'Tech',        color:'#00D2FF', desc:'GitHub-style dark, for developers',    base:'dark',          ov:{ primary:'#0D1117', secondary:'#58A6FF', accent:'#3FB950' }},
  'github-style':   { name:'GitHub Style',     cat:'Tech',        color:'#238636', desc:'Pure GitHub aesthetics',               base:'github-readme', ov:{ primary:'#161B22', secondary:'#238636', accent:'#58A6FF' }},
  'terminal':       { name:'Terminal',         cat:'Tech',        color:'#22C55E', desc:'Terminal green, hacker aesthetic',     base:'terminal-cli',      ov:{ primary:'#0A0A0A', secondary:'#22C55E', accent:'#4ADE80' }},
  'cyber-blue':     { name:'Cyber Blue',       cat:'Tech',        color:'#38BDF8', desc:'Neon blue, futuristic tech vibes',     base:'mono-dev',      ov:{ primary:'#020617', secondary:'#38BDF8', accent:'#818CF8' }},
  'matrix':         { name:'Matrix',           cat:'Tech',        color:'#16A34A', desc:'Deep green matrix-inspired style',     base:'matrix-grid',  ov:{ primary:'#052E16', secondary:'#16A34A', accent:'#86EFAC' }},
  'dev-minimal':    { name:'Dev Minimal',      cat:'Tech',        color:'#6366F1', desc:'Clean dark, purple accents for devs',  base:'compact',      ov:{ primary:'#1E1B4B', secondary:'#6366F1', accent:'#A5B4FC' }},
  'startup':        { name:'Startup',          cat:'Tech',        color:'#8B5CF6', desc:'Product & startup roles, modern look', base:'skill-first',   ov:{ primary:'#2D1B69', secondary:'#8B5CF6', accent:'#F59E0B' }},
  // ── ELEGANT ───────────────────────────────────────────────────────
  'elegant':        { name:'Elegant',          cat:'Elegant',     color:'#C9A84C', desc:'Gold accents, serif luxury feel',      base:'elegant',   ov:{ primary:'#1C1C1C', secondary:'#C9A84C', accent:'#F59E0B' }},
  'gold-luxury':    { name:'Gold Luxury',      cat:'Elegant',     color:'#B45309', desc:'Black and gold, ultra premium',        base:'elegant',       ov:{ primary:'#0C0A09', secondary:'#B45309', accent:'#D97706' }},
  'silver':         { name:'Silver',           cat:'Elegant',     color:'#94A3B8', desc:'Silver and charcoal, understated',     base:'ultra-clean',   ov:{ primary:'#0F172A', secondary:'#94A3B8', accent:'#CBD5E1' }},
  'rose-gold':      { name:'Rose Gold',        cat:'Elegant',     color:'#FB7185', desc:'Rose gold tones, stylish feminine',    base:'magazine',      ov:{ primary:'#1C0A0A', secondary:'#FB7185', accent:'#FECDD3' }},
  'midnight-elgnt': { name:'Midnight',         cat:'Elegant',     color:'#6366F1', desc:'Midnight blue with indigo elegance',   base:'elegant',   ov:{ primary:'#1E1B4B', secondary:'#4F46E5', accent:'#A5B4FC' }},
  'platinum':       { name:'Platinum',         cat:'Elegant',     color:'#64748B', desc:'Cool platinum gray, executive class',  base:'table-format',  ov:{ primary:'#0F172A', secondary:'#475569', accent:'#94A3B8' }},
  // ── FRESH / ENTRY LEVEL ───────────────────────────────────────────
  'fresh-grad':     { name:'Fresh Graduate',   cat:'Entry Level', color:'#10B981', desc:'Clean and modern for fresh graduates', base:'timeline',   ov:{ primary:'#064E3B', secondary:'#10B981', accent:'#FBBF24' }},
  'student':        { name:'Student',          cat:'Entry Level', color:'#3B82F6', desc:'Education-focused, clean layout',      base:'cards',  ov:{ primary:'#1E3A5F', secondary:'#3B82F6', accent:'#60A5FA' }},
  'intern':         { name:'Intern',           cat:'Entry Level', color:'#8B5CF6', desc:'Friendly purple, internship-ready',   base:'hero-header',   ov:{ primary:'#2E1065', secondary:'#7C3AED', accent:'#DDD6FE' }},
  'junior':         { name:'Junior Dev',       cat:'Entry Level', color:'#F59E0B', desc:'Energetic amber, junior roles',        base:'skill-first',   ov:{ primary:'#451A03', secondary:'#F59E0B', accent:'#FCD34D' }},
  'campus':         { name:'Campus',           cat:'Entry Level', color:'#06B6D4', desc:'Bright and youthful, campus vibes',    base:'timeline',   ov:{ primary:'#164E63', secondary:'#06B6D4', accent:'#67E8F9' }},
  // ── INDIA SPECIFIC ────────────────────────────────────────────────
  'india-classic':  { name:'India Classic',    cat:'India',       color:'#FF6B35', desc:'Traditional Indian format, trusted',   base:'centered',  ov:{ primary:'#1A3A5C', secondary:'#FF6B35', accent:'#F59E0B' }},
  'naukri-style':   { name:'Naukri Style',     cat:'India',       color:'#4A90E2', desc:'Optimized for Naukri/LinkedIn India',  base:'table-format',  ov:{ primary:'#1E3A5F', secondary:'#4A90E2', accent:'#22C55E' }},
  'mumbai-pro':     { name:'Mumbai Pro',       cat:'India',       color:'#FF5733', desc:'Vibrant Mumbai, finance & consulting', base:'accent-border',   ov:{ primary:'#1A0A00', secondary:'#FF5733', accent:'#FFC300' }},
  'bengaluru-tech': { name:'Bengaluru Tech',   cat:'India',       color:'#6C63FF', desc:'Tech capital style, startup-ready',    base:'skill-first',   ov:{ primary:'#1A1060', secondary:'#6C63FF', accent:'#F59E0B' }},
  'delhi-formal':   { name:'Delhi Formal',     cat:'India',       color:'#DC143C', desc:'Formal and authoritative for Delhi',   base:'magazine',      ov:{ primary:'#1A0010', secondary:'#DC143C', accent:'#FFD700' }},
}

export const TEMPLATE_CATEGORIES = ['Professional','Minimal','Creative','Tech','Elegant','Entry Level','India']

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
export const EDITOR_SECTIONS = [
  { id:'personal',       icon:'👤', label:'Personal',      color:'#FF6B6B' },
  { id:'experience',     icon:'💼', label:'Experience',     color:'#4ECDC4' },
  { id:'education',      icon:'🎓', label:'Education',      color:'#45B7D1' },
  { id:'skills',         icon:'⚡', label:'Skills',         color:'#96CEB4' },
  { id:'projects',       icon:'🚀', label:'Projects',       color:'#FFEAA7' },
  { id:'certifications', icon:'🏅', label:'Certifications', color:'#DDA0DD' },
  { id:'languages',      icon:'🌐', label:'Languages',      color:'#98D8C8' },
  { id:'awards',         icon:'🏆', label:'Awards',         color:'#F7DC6F' },
  { id:'social',         icon:'🔗', label:'Social Links',   color:'#A8E6CF' },
]

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const SKILL_SUGGESTIONS = {
  'Web Dev':    ['React','Vue','Angular','Next.js','Node.js','Express','Django','Flask','TypeScript','JavaScript','Tailwind','GraphQL','REST APIs','HTML5','CSS3'],
  'Mobile':     ['React Native','Flutter','Swift','Kotlin','iOS','Android','Expo'],
  'Data & AI':  ['Python','R','SQL','TensorFlow','PyTorch','Pandas','NumPy','Machine Learning','LLMs','Tableau','Power BI','Scikit-learn'],
  'Design':     ['Figma','Adobe XD','Photoshop','Illustrator','Sketch','Framer','Canva','After Effects'],
  'DevOps':     ['Docker','Kubernetes','AWS','GCP','Azure','CI/CD','Jenkins','Terraform','Linux','Git','GitHub Actions'],
  'Database':   ['MySQL','PostgreSQL','MongoDB','Redis','Firebase','Supabase','SQLite','Elasticsearch'],
  'Testing':    ['Jest','Cypress','Playwright','Vitest','pytest','JUnit','Selenium'],
  'Soft Skills':['Leadership','Communication','Problem Solving','Teamwork','Agile','Scrum','Project Management','Mentoring'],
}
export const ALL_SKILLS = Object.values(SKILL_SUGGESTIONS).flat()

// ─── MONTHS ───────────────────────────────────────────────────────────────────
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// ─── COLOR PRESETS ────────────────────────────────────────────────────────────
export const COLOR_PRESETS = [
  { name:'Coral',   primary:'#1E2D4A', secondary:'#FF6B6B', accent:'#4ECDC4' },
  { name:'Ocean',   primary:'#1A365D', secondary:'#2B6CB0', accent:'#38B2AC' },
  { name:'Forest',  primary:'#1A3A2F', secondary:'#276749', accent:'#48BB78' },
  { name:'Violet',  primary:'#2D1B69', secondary:'#7C3AED', accent:'#A78BFA' },
  { name:'Crimson', primary:'#1A0A0A', secondary:'#C53030', accent:'#FC8181' },
  { name:'Amber',   primary:'#1A1200', secondary:'#B7791F', accent:'#ECC94B' },
  { name:'Tech',    primary:'#0D1117', secondary:'#58A6FF', accent:'#3FB950'  },
  { name:'Ink',     primary:'#111',    secondary:'#444',    accent:'#888'     },
  { name:'Teal',    primary:'#134E4A', secondary:'#0D9488', accent:'#34D399'  },
  { name:'Rose',    primary:'#1C0A0A', secondary:'#FB7185', accent:'#FECDD3'  },
]

// ─── INITIAL STATE ────────────────────────────────────────────────────────────
export const BLANK_RESUME = {
  personal:{ firstName:'',lastName:'',title:'',email:'',phone:'',location:'',website:'',linkedin:'',github:'',twitter:'',summary:'',photo:null },
  experience:[{ id:'exp1',company:'',position:'',location:'',startDate:'',endDate:'',current:false,type:'Full-time',description:'',achievements:[] }],
  education:[{ id:'edu1',institution:'',degree:'',field:'',location:'',startDate:'',endDate:'',current:false,gpa:'',coursework:'',honors:'',activities:'' }],
  skills:[{ id:'sk1',category:'Technical Skills',skills:[] }],
  projects:[{ id:'proj1',name:'',description:'',technologies:[],link:'',github:'',startDate:'',endDate:'',highlights:[] }],
  certifications:[{ id:'cert1',name:'',issuer:'',date:'',expiry:'',credentialId:'' }],
  languages:[{ id:'lang1',language:'',proficiency:'Native' }],
  awards:[{ id:'aw1',title:'',issuer:'',date:'',description:'' }],
  interests:[],
  social:{ stackoverflow:'',medium:'',behance:'',dribbble:'',youtube:'',instagram:'' },
}

export const BLANK_CUSTOMIZATION = {
  primaryColor:'#1E2D4A', secondaryColor:'#4A90D9', accentColor:'#10B981',
  backgroundColor:'#FFFFFF', textColor:'#111827', mutedColor:'#6B7280', borderColor:'#E5E7EB',
  headingFont:'Georgia', bodyFont:'Arial',
  sectionSpacing:'normal', showPhoto:true, photoShape:'circle',
  skillStyle:'dots', bulletStyle:'•', sectionHeaderStyle:'underline',
}

export const SAMPLE_RESUME = {
  personal:{ firstName:'Arjun',lastName:'Mehta',title:'Senior Full-Stack Engineer',email:'arjun.mehta@email.com',phone:'+91 98765 43210',location:'Bengaluru, Karnataka',website:'arjunmehta.dev',linkedin:'arjun-mehta-dev',github:'arjunmehta',twitter:'',summary:'Results-driven software engineer with 6+ years building scalable products at high-growth startups. Led engineering teams of 8+ shipping features to 3M+ users. Expert in React, Node.js, and AWS cloud architecture.',photo:null },
  experience:[
    { id:'e1',company:'Razorpay',position:'Senior Software Engineer',location:'Bengaluru',startDate:'Mar 2022',endDate:'',current:true,type:'Full-time',description:'• Architected payments micro-frontend serving 12M daily transactions\n• Reduced P90 latency by 62% through Redis caching and query optimization\n• Led team of 6 engineers; introduced weekly design reviews cutting bugs by 40%',achievements:['Promoted to Senior 15 months in','Filed patent for dynamic routing algorithm'] },
    { id:'e2',company:'Swiggy',position:'Software Engineer II',location:'Bengaluru',startDate:'Jul 2019',endDate:'Feb 2022',current:false,type:'Full-time',description:'• Rebuilt order-tracking real-time pipeline reducing fallback polling by 88%\n• Built A/B testing framework adopted by 12 product squads',achievements:[] },
  ],
  education:[{ id:'edu1',institution:'BITS Pilani',degree:'B.E.',field:'Computer Science',location:'Pilani, Rajasthan',startDate:'Aug 2015',endDate:'May 2019',current:false,gpa:'8.4',coursework:'Algorithms, OS, Distributed Systems',honors:'Merit Scholarship 2016–2019',activities:'ACM Chapter Secretary' }],
  skills:[
    { id:'sk1',category:'Frontend',skills:[{name:'React',level:92},{name:'Next.js',level:88},{name:'TypeScript',level:85},{name:'Tailwind CSS',level:90}] },
    { id:'sk2',category:'Backend & Infra',skills:[{name:'Node.js',level:88},{name:'PostgreSQL',level:82},{name:'Redis',level:78},{name:'AWS',level:75}] },
    { id:'sk3',category:'Tools',skills:[{name:'Git',level:95},{name:'Docker',level:80},{name:'Figma',level:65}] },
  ],
  projects:[{ id:'p1',name:'Quicklit — AI Summarizer',description:'Production AI app summarizing articles and PDFs using GPT-4',technologies:['Next.js','OpenAI API','PostgreSQL','Stripe'],link:'quicklit.app',github:'arjunmehta/quicklit',startDate:'Jan 2024',endDate:'',highlights:['1,800+ active users','$420 MRR bootstrapped'] }],
  certifications:[{ id:'c1',name:'AWS Solutions Architect – Associate',issuer:'Amazon Web Services',date:'Sep 2022',expiry:'Sep 2025',credentialId:'AWS-SAA-03482' }],
  languages:[{ id:'l1',language:'English',proficiency:'Fluent' },{ id:'l2',language:'Hindi',proficiency:'Native' }],
  awards:[{ id:'a1',title:'Best Engineering Project – Swiggy Hackathon',issuer:'Swiggy',date:'Oct 2020',description:'Won among 200+ participants for real-time delivery prediction model.' }],
  interests:['Open Source','System Design','Technical Writing','Badminton','Carnatic Music'],
  social:{ stackoverflow:'arjunmehta',medium:'@arjun.dev',behance:'',dribbble:'',youtube:'',instagram:'' },
}