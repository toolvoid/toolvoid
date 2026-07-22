'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const tools = [
  { name: 'Script Generator',     href: '/story-generator', desc: 'Generate timed AI video scripts with narration & visuals', color: '#A78BFA', tag: 'AI' },
  { name: 'Hashtag Generator',   href: '/hashtag',      desc: 'Smart hashtags for Instagram, YouTube & Twitter',        color: '#FF6B6B', tag: 'AI' },
  { name: 'Image Generator',     href: '/imagegen',     desc: 'Generate AI images with daily free credits',            color: '#F59E0B', tag: 'AI' },
  { name: 'Keyword Generator',   href: '/keyword',      desc: 'Find best SEO keywords for your content instantly',      color: '#34D399', tag: 'SEO' },
  { name: 'Image Toolkit',       href: '/image-tools',  desc: 'Resize, compress & convert images — all in one',        color: '#FFD93D', tag: 'Image' },
  { name: 'PDF to Image',        href: '/pdf',          desc: 'Extract high-quality images from any PDF file',         color: '#FF9A3C', tag: 'Image' },
  { name: 'Passport Photo',      href: '/passport',     desc: 'Resize any photo to passport size instantly free',      color: '#60A5FA', tag: 'Image' },
  { name: 'QR Generator',        href: '/qr',           desc: 'Generate QR codes for any URL or text instantly',       color: '#00FFB2', tag: 'Utility' },
  { name: 'Password Generator',  href: '/password',     desc: 'Generate strong, secure random passwords instantly',    color: '#F472B6', tag: 'Security' },
  { name: 'Domain Checker',      href: '/domain',       desc: 'Check domain availability across all extensions',       color: '#00C9FF', tag: 'Utility' },
  { name: 'Unit Converter',      href: '/unit',         desc: 'Convert length, weight, temperature & more instantly',  color: '#6BCB77', tag: 'Utility' },
  { name: 'Base64 Encoder',      href: '/base64',       desc: 'Encode and decode Base64 strings in one click',         color: '#C77DFF', tag: 'Dev' },
  { name: 'EMI Calculator',      href: '/emi',          desc: 'Calculate loan EMI with interest & amortization chart', color: '#FB923C', tag: 'Finance' },
  { name: 'Loan Eligibility',    href: '/loan',         desc: 'Check home & personal loan eligibility instantly',      color: '#E879F9', tag: 'Finance' },
  { name: 'Invoice Generator',   href: '/invoice',      desc: 'Create professional invoices & download as PDF free',   color: '#38BDF8', tag: 'Business' },
  { name: 'Word Counter',        href: '/word-counter', desc: 'Count words, characters & estimate reading time',       color: '#4D96FF', tag: 'Content' },
  { name: 'JSON Formatter',      href: '/json',         desc: 'Format, validate and beautify JSON instantly',          color: '#86EFAC', tag: 'Dev' },
  { name: 'Text to Speech',      href: '/tts',          desc: 'Convert any text to natural voice instantly free',      color: '#4D96FF', tag: 'Voice' },
  { name: 'Video Converter',     href: '/video',        desc: 'Convert MP4, MOV, AVI, MKV to any format free',        color: '#FF4ECD', tag: 'Media' },
  { name: 'Resume Builder',      href: '/resume',       desc: 'Multiple templates · PDF download · Quick workflow',    color: '#FF6B6B', tag: 'Career' },
  { name: 'Capsule Manager',     href: '/capsule-manager', desc: 'Save AI conversations as capsules. Never lose context again.', color: '#a78bfa', tag: 'NEW' },
];

const ALL_TAGS = ['All', 'NEW', 'AI', 'Image', 'Dev', 'Finance', 'Utility', 'Content', 'Business', 'Media'];

const audiences = [
  { title: 'Creators',    desc: 'Stories, hashtags, AI images & more for your content.', color: '#00FFB2' },
  { title: 'Developers',  desc: 'QR, Base64, JSON formatter, domain checker. Fast.', color: '#4D96FF' },
  { title: 'Students',    desc: 'Word counter, resume builder, PDF tools. Free.', color: '#FFD93D' },
  { title: 'Freelancers', desc: 'Invoices, EMI, password gen. Quick client-ready utilities.', color: '#C77DFF' },
];

const features = [
  { title: 'Lightning Fast', desc: 'No heavy setup. Open a tool, drop your input and get results fast.', color: '#00FFB2' },
  { title: 'Privacy First',  desc: 'Most flows stay in the browser so your files never leave your device.', color: '#4D96FF' },
  { title: 'Works Everywhere', desc: 'Designed for phones, tablets and desktop without an app install.', color: '#C77DFF' },
  { title: 'Fair Daily Access', desc: 'AI tools include clear daily limits so everyone gets a smooth run.', color: '#FF6B6B' },
  { title: 'Free Daily Credits',  desc: 'Core utility tools stay accessible and AI tools include daily free usage.', color: '#FFD93D' },
  { title: 'Always Growing', desc: 'New tools added regularly. Built by creators, for creators.', color: '#6BCB77' },
];

const comparisons = [
  { label: 'AI Access',          us: 'Daily free credits', other: 'Paid plan' },
  { label: 'Cost',               us: 'Free daily limits', other: '₹500+/mo' },
  { label: 'File Upload',        us: '✗ Never',        other: '✓ Always' },
  { label: 'Works in Browser',   us: '✓ Yes',          other: '✗ No' },
  { label: 'Instant Results',    us: '✓ Always',       other: '⚡ Sometimes' },
];

const faqs = [
  { q: 'Is TooL Void really free?',    a: 'Yes. Core utilities are free, and AI tools include daily free credits.' },
  { q: 'Does it work on mobile?',     a: 'Built mobile-first. Optimized for one-hand browsing.' },
  { q: 'Do I need to install anything?', a: 'No. Open in any browser and start immediately.' },
  { q: 'Are my files uploaded?',      a: 'Most tools run locally in your browser. Your files stay private.' },
  { q: 'Which tools use AI?',         a: 'Script Generator, Hashtag Generator, Image Generator and Keyword Generator use AI APIs.' },
  { q: 'Can I use it for client work?', a: 'Yes. Invoice generator, resume builder and image tools are built for professional use.' },
  { q: 'Will more tools be added?',   a: 'Yes. The site grows with more utilities and polish over time.' },
];

const supports = [
  { title: 'Email Support',     desc: 'Send a message if something feels broken or confusing.',       link: 'mailto:0voidtool0@gmail.com', cta: 'Email Us →',    color: '#00FFB2' },
  { title: 'Community Help',    desc: 'Share feedback, ideas and common issues by email for now.',   link: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Community', cta: 'Join In →', color: '#4D96FF' },
  { title: 'Bug Reports',       desc: 'Point out a broken flow and it gets fixed faster.',           link: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Bug%20Report', cta: 'Report It →', color: '#FF6B6B' },
  { title: 'Feature Requests',  desc: 'If a missing tool would help you, ask for it directly.',      link: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Feature%20Request', cta: 'Suggest One →', color: '#FFD93D' },
];

// ── Tool Icon SVGs (inline, no 3D dep on mobile) ──────────
function MobileToolIcon({ href, color }) {
  const s = { stroke: color, strokeWidth: '2.4', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  const f = { fill: color };
  const base = { width: 44, height: 44, viewBox: '0 0 44 44', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };

  const icons = {
    '/story-generator': <svg {...base}><path d="M10 10C13 9 16 9 20 10V34C16 33 13 33 10 34V10Z" {...s}/><path d="M24 10C28 9 31 9 34 10V34C31 33 28 33 24 34V10Z" {...s}/><path d="M22 10V34" {...s}/><path d="M32 8L33.5 11.5L37 13L33.5 14.5L32 18L30.5 14.5L27 13L30.5 11.5L32 8Z" {...f} fill={color}/></svg>,
    '/hashtag':     <svg {...base}><path d="M16 7L12 37" {...s}/><path d="M30 7L26 37" {...s}/><path d="M8 16H34" {...s}/><path d="M6 28H32" {...s}/></svg>,
    '/imagegen':    <svg {...base}><rect x="8" y="8" width="28" height="28" rx="5" {...s}/><circle cx="29" cy="16" r="3" {...f} fill={color}/><path d="M13 29L19 23L24 27L30 20L34 24" {...s}/></svg>,
    '/keyword':     <svg {...base}><circle cx="19" cy="19" r="9" {...s}/><path d="M25.5 25.5L34 34" {...s}/><path d="M16 19H22" {...s}/><path d="M19 16V22" {...s}/></svg>,
    '/image-tools': <svg {...base}><rect x="6" y="10" width="20" height="16" rx="3" {...s}/><rect x="10" y="14" width="20" height="16" rx="3" {...s} strokeOpacity="0.6"/><rect x="14" y="18" width="20" height="16" rx="3" {...s} strokeOpacity="0.3"/><path d="M10 22L14 18L18 22L22 16L26 20" {...s}/></svg>,
    '/pdf':         <svg {...base}><path d="M14 6H26L34 14V34C34 36.2 32.2 38 30 38H14C11.8 38 10 36.2 10 34V10C10 7.8 11.8 6 14 6Z" {...s}/><path d="M26 6V14H34" {...s}/><path d="M22 30V36" {...s}/><path d="M18 33L22 38L26 33" {...s}/></svg>,
    '/passport':    <svg {...base}><rect x="10" y="7" width="24" height="30" rx="4" {...s}/><circle cx="22" cy="17" r="5" {...s}/><path d="M14 31C16 27 19 25 22 25C25 25 28 27 30 31" {...s}/></svg>,
    '/qr':          <svg {...base}><rect x="6" y="6" width="10" height="10" rx="2" {...s}/><rect x="28" y="6" width="10" height="10" rx="2" {...s}/><rect x="6" y="28" width="10" height="10" rx="2" {...s}/><rect x="10" y="10" width="3" height="3" rx="1" {...f} fill={color}/><rect x="32" y="10" width="3" height="3" rx="1" {...f} fill={color}/><rect x="10" y="32" width="3" height="3" rx="1" {...f} fill={color}/><rect x="24" y="24" width="4" height="4" rx="1" {...f} fill={color}/><rect x="30" y="24" width="4" height="4" rx="1" {...f} fill={color}/><rect x="24" y="30" width="4" height="4" rx="1" {...f} fill={color}/></svg>,
    '/password':    <svg {...base}><rect x="12" y="20" width="20" height="14" rx="4" {...s}/><path d="M16 20V16C16 13.8 18 12 22 12C26 12 28 13.8 28 16V20" {...s}/><circle cx="22" cy="27" r="2" {...f} fill={color}/><path d="M22 27V31" {...s}/></svg>,
    '/domain':      <svg {...base}><circle cx="19" cy="19" r="11" {...s}/><path d="M8 19H30" {...s}/><path d="M19 8C22 11 23 15 23 19C23 23 22 27 19 30" {...s}/><path d="M19 8C16 11 15 15 15 19C15 23 16 27 19 30" {...s}/><circle cx="31" cy="31" r="5" {...s}/><path d="M34.5 34.5L38 38" {...s}/></svg>,
    '/unit':        <svg {...base}><rect x="8" y="18" width="28" height="8" rx="3" {...s}/><path d="M12 18V14M16 18V15M20 18V13M24 18V15M28 18V14" {...s}/><path d="M6 12L10 8M6 30L10 34" {...s}/><path d="M38 12L34 8M38 30L34 34" {...s}/><path d="M6 8H38" {...s} strokeOpacity="0.4"/><path d="M6 36H38" {...s} strokeOpacity="0.4"/></svg>,
    '/base64':      <svg {...base}><path d="M12 8L8 22L12 36" {...s}/><path d="M32 8L36 22L32 36" {...s}/><circle cx="22" cy="16" r="2" {...f} fill={color}/><circle cx="22" cy="22" r="2" {...f} fill={color}/><circle cx="22" cy="28" r="2" {...f} fill={color}/><circle cx="16" cy="19" r="1.5" {...f} fill={color}/><circle cx="28" cy="19" r="1.5" {...f} fill={color}/><circle cx="16" cy="25" r="1.5" {...f} fill={color}/><circle cx="28" cy="25" r="1.5" {...f} fill={color}/></svg>,
    '/emi':         <svg {...base}><rect x="9" y="7" width="26" height="30" rx="4" {...s}/><rect x="13" y="11" width="18" height="8" rx="2" {...s}/><path d="M13 25H22" {...s}/><path d="M13 30H18" {...s}/><path d="M26 24L28 27L32 22" {...s} stroke="#22c55e"/></svg>,
    '/loan':        <svg {...base}><path d="M12 20L22 10L32 20" {...s}/><rect x="15" y="20" width="14" height="14" rx="2" {...s}/><rect x="19" y="26" width="6" height="8" rx="1" {...s}/><circle cx="32" cy="10" r="6" fill="#22c55e" fillOpacity="0.9"/><path d="M29 10L31 12L35 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    '/invoice':     <svg {...base}><path d="M14 6H28L34 12V36C34 37.1 33.1 38 32 38H12C10.9 38 10 37.1 10 36V8C10 6.9 10.9 6 12 6" {...s}/><path d="M28 6V12H34" {...s}/><path d="M16 20H28" {...s}/><path d="M16 25H24" {...s}/><circle cx="30" cy="32" r="6" fill="#22c55e" fillOpacity="0.9"/><text x="30" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">₹</text></svg>,
    '/word-counter': <svg {...base}><path d="M12 12H32" {...s}/><path d="M12 18H28" {...s}/><path d="M12 24H30" {...s}/><path d="M12 30H22" {...s}/><circle cx="32" cy="32" r="8" fill="#4D96FF" fillOpacity="0.9"/><text x="32" y="36" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">99</text></svg>,
    '/json':        <svg {...base}><path d="M16 8L12 12L16 16" {...s}/><path d="M28 8L32 12L28 16" {...s}/><path d="M16 28L12 32L16 36" {...s}/><path d="M28 28L32 32L28 36" {...s}/><path d="M20 20H24" {...s}/><circle cx="18" cy="22" r="2" {...f} fill={color}/><circle cx="26" cy="22" r="2" {...f} fill={color}/></svg>,
    '/tts':         <svg {...base}><rect x="17" y="8" width="10" height="18" rx="5" {...s}/><path d="M13 20C13 25 17 29 22 29C27 29 31 25 31 20" {...s}/><path d="M22 29V35" {...s}/><path d="M17 35H27" {...s}/></svg>,
    '/video':       <svg {...base}><circle cx="22" cy="22" r="14" {...s}/><path d="M19 16L29 22L19 28V16Z" {...f} fill={color}/></svg>,
    '/resume':      <svg {...base}><rect x="11" y="6" width="22" height="32" rx="4" {...s}/><circle cx="18" cy="15" r="3" {...s}/><path d="M15 22C16 20.5 17 20 18 20C19 20 20 20.5 21 22" {...s}/><path d="M24 14H29" {...s}/><path d="M24 19H29" {...s}/><path d="M15 27H29" {...s}/><path d="M15 32H25" {...s}/></svg>,
    '/capsule-manager': <svg {...base}><rect x="9" y="16" width="26" height="12" rx="6" {...s}/><path d="M22 16V28" {...s}/><path d="M13 16L9 22L13 28" {...s} strokeOpacity="0.5"/><path d="M31 16L35 22L31 28" {...s} strokeOpacity="0.5"/><rect x="15" y="9" width="14" height="6" rx="3" {...s}/><rect x="15" y="29" width="14" height="6" rx="3" {...s}/></svg>,
  };

  return icons[href] || <svg {...base}><circle cx="22" cy="22" r="12" {...s}/><path d="M18 22H26M22 18V26" {...s}/></svg>;
}

export default function MobileHome() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const pageRef = useRef(null);
  const statsRef = useRef(null);

  const filteredTools = tools.filter(t => {
    const matchTag = activeTag === 'All' || t.tag === activeTag;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  useEffect(() => {
    const node = pageRef.current;
    if (!node) return;
    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const scrollY = window.scrollY || 0;
      node.style.setProperty('--bg-shift', `${scrollY * 0.18}px`);
      node.style.setProperty('--bg-shift-soft', `${scrollY * 0.1}px`);
    };
    const onScroll = () => { if (frame) return; frame = window.requestAnimationFrame(updateScene); };
    updateScene();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { if (frame) window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <style precedence="default" href="toolsite-mobile-v2">{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Bebas+Neue&family=JetBrains+Mono:wght@500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#060609;--fg:#f8fbff;--muted:#8893a3;--green:#00FFB2;--line:rgba(255,255,255,.1)}
        html,body{background:var(--bg);color:var(--fg);font-family:'Outfit',sans-serif;min-height:100vh;overflow-x:hidden;scroll-behavior:smooth}
        a{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
        button{-webkit-tap-highlight-color:transparent;touch-action:manipulation;cursor:pointer}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes driftGrid{0%{transform:perspective(500px) rotateX(75deg) translateY(0)}100%{transform:perspective(500px) rotateX(75deg) translateY(36px)}}
        @keyframes orbA{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(18px,-24px,0)}}
        @keyframes orbB{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-16px,22px,0)}}

        /* ── Page bg ── */
        .m-page{--bg-shift:0px;--bg-shift-soft:0px;position:relative;min-height:100vh;background:radial-gradient(circle at 18% 12%,rgba(52,211,153,.14),transparent 26%),radial-gradient(circle at 82% 22%,rgba(96,165,250,.12),transparent 24%),linear-gradient(180deg,#08090c 0%,#060609 100%);overflow:hidden}
        .m-bg{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
        .m-grid{position:absolute;left:-18%;right:-18%;top:140px;height:320px;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:30px 30px;transform-origin:center top;transform:perspective(820px) rotateX(72deg) translateY(calc(var(--bg-shift) * .55))}
        .m-orb{position:absolute;border-radius:50%;filter:blur(22px);opacity:.4}
        .m-orb.a{width:180px;height:180px;top:110px;left:-40px;background:radial-gradient(circle,rgba(52,211,153,.22),transparent 70%);animation:orbA 10s ease-in-out infinite}
        .m-orb.b{width:160px;height:160px;top:280px;right:-50px;background:radial-gradient(circle,rgba(96,165,250,.2),transparent 72%);animation:orbB 12s ease-in-out infinite}

        /* ── Layout ── */
        .m-wrap{position:relative;z-index:1;padding:18px 18px 80px;max-width:560px;margin:0 auto}

        /* ── Nav ── */
        .m-nav{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:12px 0 16px;background:linear-gradient(180deg,rgba(6,6,9,.95),rgba(6,6,9,.8),transparent);animation:fadeUp .4s both}
        .m-logo{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:1px;text-decoration:none;color:white}
        .m-logo em{color:var(--green);font-style:normal}
        .m-pill{padding:7px 12px;border-radius:999px;border:1px solid rgba(0,255,178,.22);background:rgba(0,255,178,.08);color:var(--green);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:700}

        /* ── Hero ── */
        .m-hero{padding:60px 4px 44px;text-align:center;animation:fadeUp .6s .08s both}
        .m-eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.42);margin-bottom:14px}
        .m-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,16vw,90px);line-height:.84;letter-spacing:1px;margin-bottom:18px;text-transform:uppercase}
        .m-title .green{color:var(--green)}
        .m-desc{font-size:15px;line-height:1.85;color:var(--muted);max-width:340px;margin:0 auto 28px}
        .m-actions{display:flex;flex-direction:column;gap:12px}
        .m-cta{display:flex;align-items:center;justify-content:center;min-height:52px;padding:14px 18px;border-radius:16px;text-decoration:none;font-weight:800;letter-spacing:.05em;text-transform:uppercase;font-size:13px;border:none;outline:none}
        .m-cta.primary{background:linear-gradient(135deg,var(--green),#78ffd2);color:#031611;box-shadow:0 8px 18px rgba(0,255,178,.15)}
        .m-cta.secondary{background:rgba(255,255,255,.05);border:1px solid var(--line);color:white}

        /* ── Stats Bar ── */
        .m-stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 36px;padding:20px 16px;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);animation:fadeUp .5s .1s both}
        .m-stat{text-align:center}
        .m-stat-n{font-family:'Bebas Neue',sans-serif;font-size:28px;line-height:1;color:white}
        .m-stat-l{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:4px}

        /* ── Section ── */
        .m-section{padding:36px 0}
        .m-sh{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,10vw,52px);line-height:.9;letter-spacing:1px;color:white;margin-bottom:8px}
        .m-sp{font-size:13px;line-height:1.8;color:var(--muted);margin-bottom:20px}

        /* ── Search + Filter ── */
        .m-search{position:relative;margin-bottom:14px}
        .m-search-input{width:100%;padding:12px 16px 12px 40px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:white;font-size:14px;font-family:'Outfit',sans-serif;outline:none;-webkit-appearance:none}
        .m-search-input::placeholder{color:var(--muted)}
        .m-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:15px;pointer-events:none}
        .m-tags{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;margin-bottom:18px}
        .m-tags::-webkit-scrollbar{display:none}
        .m-tag{flex-shrink:0;padding:7px 14px;border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;border:none;transition:all .2s}
        .m-tag.active{background:var(--green);color:#000}
        .m-tag.inactive{background:rgba(255,255,255,.06);color:var(--muted);border:1px solid rgba(255,255,255,.1)}

        /* ── Tool Grid ── */
        .m-tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .m-tool-card{display:block;text-decoration:none;color:inherit;border-radius:20px;padding:18px 14px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden;min-height:140px;transition:transform .15s,border-color .2s,background .2s;-webkit-tap-highlight-color:transparent}
        .m-tool-card:active{transform:scale(.97);background:rgba(255,255,255,.07)}
        .m-tool-card::before{content:'';position:absolute;inset:0;border-radius:20px;opacity:0;transition:opacity .3s}
        .m-tool-icon{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
        .m-tool-tag{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
        .m-tool-name{font-size:13px;font-weight:700;color:white;line-height:1.3;margin-bottom:4px}
        .m-tool-desc{font-size:11px;line-height:1.6;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .m-tool-go{margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.6}
        .m-tool-bar{position:absolute;bottom:0;left:0;right:0;height:2px;border-radius:0 0 20px 20px}

        /* Featured full-width tool */
        .m-tool-card.featured{grid-column:span 2;min-height:auto;padding:20px 18px;display:flex;align-items:center;gap:16px}
        .m-tool-card.featured .m-tool-icon{width:56px;height:56px;flex-shrink:0}
        .m-tool-card.featured .m-tool-name{font-size:16px}
        .m-tool-card.featured .m-tool-desc{-webkit-line-clamp:3;font-size:12px}
        .m-tool-card.featured .m-tool-body{flex:1}

        /* No results */
        .m-no-results{grid-column:span 2;text-align:center;padding:40px 20px;color:var(--muted);font-size:14px}

        /* ── Panels ── */
        .m-stack{display:grid;gap:12px}
        .m-panel{border-radius:20px;padding:20px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);animation:fadeUp .5s both}
        .m-panel-tag{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:8px}
        .m-panel-title{font-size:17px;font-weight:700;margin-bottom:6px}
        .m-panel-copy{font-size:13px;line-height:1.8;color:var(--muted)}
        .m-panel-link{display:inline-block;margin-top:12px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;transition:letter-spacing .2s}
        .m-panel-link:hover{letter-spacing:.14em}

        /* ── Compare rows ── */
        .m-compare{display:grid;gap:10px}
        .m-cmp-row{padding:16px 14px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06)}
        .m-cmp-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
        .m-cmp-vals{display:flex;gap:12px;align-items:center}
        .m-cmp-us{font-size:14px;font-weight:700;color:var(--green)}
        .m-cmp-vs{font-size:11px;color:rgba(255,255,255,.3);margin-left:auto}

        /* ── Steps ── */
        .m-steps{display:grid;gap:12px}
        .m-step{display:grid;grid-template-columns:56px 1fr;gap:14px;align-items:start;padding:18px 14px;border-radius:20px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08)}
        .m-step-no{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--green);background:rgba(0,255,178,.06);border:1px solid rgba(0,255,178,.18);flex-shrink:0}
        .m-step-title{font-size:16px;font-weight:700;color:white;margin-bottom:5px}
        .m-step-copy{font-size:13px;line-height:1.8;color:var(--muted)}

        /* ── FAQ ── */
        .m-faq{display:grid;gap:10px}
        .m-faq-item{border-radius:18px;overflow:hidden;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08)}
        .m-faq-item summary{list-style:none;cursor:pointer;padding:18px 16px;display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:600;color:white;gap:12px}
        .m-faq-item summary::-webkit-details-marker{display:none}
        .m-faq-icon{width:22px;height:22px;border-radius:50%;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;color:var(--muted);transition:all .3s}
        .m-faq-item[open] .m-faq-icon{transform:rotate(45deg);border-color:rgba(0,255,178,.28);color:var(--green)}
        .m-faq-item p{padding:0 16px 18px;font-size:13px;line-height:1.8;color:var(--muted)}

        /* ── CTA Box ── */
        .m-cta-box{position:relative;padding:32px 22px;border-radius:28px;overflow:hidden;background:linear-gradient(135deg,rgba(0,255,178,.1),rgba(255,229,0,.03) 55%,rgba(77,150,255,.08));border:1px solid rgba(0,255,178,.18)}
        .m-cta-kicker{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(0,255,178,.76);margin-bottom:10px}
        .m-cta-title{font-family:'Bebas Neue',sans-serif;font-size:52px;line-height:.88;color:white;margin-bottom:10px}
        .m-cta-title span{color:var(--green)}
        .m-cta-copy{font-size:14px;line-height:1.8;color:var(--muted);margin-bottom:20px}
        .m-cta-btns{display:grid;gap:10px}

        /* ── Footer ── */
        .m-footer{padding:24px 0 12px}
        .m-footer-brand{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:1px;color:white;margin-bottom:8px}
        .m-footer-brand em{color:var(--green);font-style:normal}
        .m-footer-copy{font-size:13px;line-height:1.8;color:var(--muted);margin-bottom:20px}
        .m-footer-cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
        .m-footer-col h4{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:10px}
        .m-footer-col a{display:block;text-decoration:none;color:#6b7280;font-size:12px;line-height:2.1}
        .m-footer-end{padding-top:14px;border-top:1px solid rgba(255,255,255,.06);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.04em;color:#2a2a3a;display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px}

        /* ── Divider ── */
        .m-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);margin:4px 0}
      `}</style>

      <div className="m-page" ref={pageRef}>
        <div className="m-bg">
          <div className="m-grid" />
          <div className="m-orb a" />
          <div className="m-orb b" />
        </div>

        <div className="m-wrap">

          {/* ── Nav ── */}
          <div className="m-nav">
            <Link href="/" className="m-logo"><em>Tool</em> Void</Link>
            <div className="m-pill">21 Tools</div>
          </div>

          {/* ── Hero ── */}
          <section className="m-hero">
            <div className="m-eyebrow">Free tools for creators & builders</div>
            <div className="m-title">
              <span className="green">21 Tools.</span>
              <span>Zero Cost.</span>
              <span>Always.</span>
            </div>
            <div className="m-desc">
              AI tools, image editors, dev utilities, finance calculators — fast browser tools with daily AI credits.
            </div>
            <div className="m-actions">
              <a href="#tools" className="m-cta primary">Explore All 21 Tools ⚡</a>
              <a href="#how" className="m-cta secondary">See How It Works →</a>
            </div>
          </section>

          {/* ── Stats Bar ── */}
          <div className="m-stats-bar" ref={statsRef}>
            {[['21','Tools'],['₹0','Forever'],['3s','To Start'],['24/7','Access']].map(([n,l])=>(
              <div key={l} className="m-stat">
                <div className="m-stat-n">{n}</div>
                <div className="m-stat-l">{l}</div>
              </div>
            ))}
          </div>

          <div className="m-divider" />

          {/* ── Tools ── */}
          <section className="m-section" id="tools">
            <h2 className="m-sh">All 21 Tools</h2>
            <p className="m-sp">AI generators, image editors, dev tools, finance calculators — all free.</p>

            {/* Search */}
            <div className="m-search">
              <span className="m-search-icon">🔍</span>
              <input
                className="m-search-input"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tag filter */}
            <div className="m-tags">
              {ALL_TAGS.map(tag => (
                <button key={tag} className={`m-tag ${activeTag === tag ? 'active' : 'inactive'}`}
                  onClick={() => { setActiveTag(tag); setSearchQuery(''); }}>
                  {tag}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="m-tools-grid">
              {filteredTools.length === 0 && (
                <div className="m-no-results">No tools found. Try a different search.</div>
              )}
              {filteredTools.map((tool, i) => {
                const isFeatured = i === 0 && activeTag === 'All' && !searchQuery;
                return (
                  <a href={tool.href} key={tool.href}
                    className={`m-tool-card${isFeatured ? ' featured' : ''}`}
                    style={{ borderColor: `${tool.color}22`, animationDelay: `${0.04 + i * 0.025}s` }}>
                    <div style={{ position:'absolute', inset:0, borderRadius:'20px',
                      background:`radial-gradient(circle at 20% 20%, ${tool.color}10, transparent 55%)`,
                      pointerEvents:'none' }} />
                    <div className="m-tool-icon" style={{ borderColor:`${tool.color}30` }}>
                      <MobileToolIcon href={tool.href} color={tool.color} />
                    </div>
                    {isFeatured ? (
                      <div className="m-tool-body">
                        <div className="m-tool-tag">{tool.tag} · Featured</div>
                        <div className="m-tool-name">{tool.name}</div>
                        <div className="m-tool-desc">{tool.desc}</div>
                        <div className="m-tool-go" style={{ color: tool.color }}>Try Now →</div>
                      </div>
                    ) : (
                      <>
                        <div className="m-tool-tag">{tool.tag}</div>
                        <div className="m-tool-name">{tool.name}</div>
                        <div className="m-tool-desc">{tool.desc}</div>
                        <div className="m-tool-go" style={{ color: tool.color }}>Open →</div>
                      </>
                    )}
                    <div className="m-tool-bar" style={{ background: tool.color }} />
                  </a>
                );
              })}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── Audiences ── */}
          <section className="m-section" id="audience">
            <h2 className="m-sh">Built For Everyone</h2>
            <p className="m-sp">Students, creators, developers and freelancers all have tools here.</p>
            <div className="m-stack">
              {audiences.map((a, i) => (
                <div key={a.title} className="m-panel" style={{ borderColor:`${a.color}22`, animationDelay:`${0.06+i*0.05}s` }}>
                  <div className="m-panel-tag">Audience</div>
                  <div className="m-panel-title" style={{ color: a.color }}>{a.title}</div>
                  <div className="m-panel-copy">{a.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── Features ── */}
          <section className="m-section" id="features">
            <h2 className="m-sh">Built Different</h2>
            <p className="m-sp">Everything you hate about other tools — we removed it.</p>
            <div className="m-stack">
              {features.map((f, i) => (
                <div key={f.title} className="m-panel" style={{ borderColor:`${f.color}1e`, animationDelay:`${0.05+i*0.04}s` }}>
                  <div className="m-panel-title" style={{ color: f.color }}>{f.title}</div>
                  <div className="m-panel-copy">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── Compare ── */}
          <section className="m-section" id="compare">
            <h2 className="m-sh">TooL Void vs Others</h2>
            <p className="m-sp">Why creators choose TooL Void over paid alternatives.</p>
            <div className="m-compare">
              {comparisons.map((row, i) => (
                <div key={row.label} className="m-cmp-row" style={{ animationDelay:`${0.04+i*0.04}s` }}>
                  <div className="m-cmp-label">{row.label}</div>
                  <div className="m-cmp-vals">
                    <span className="m-cmp-us">{row.us}</span>
                    <span className="m-cmp-vs">{row.other}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── How it works ── */}
          <section className="m-section" id="how">
            <h2 className="m-sh">3 Steps. That&apos;s It.</h2>
            <p className="m-sp">Pick, input, done. No loops, no clutter, no wasted clicks.</p>
            <div className="m-steps">
              {[
                { n:'01', t:'Pick Your Tool', d:'Scroll the grid, use search or filter by tag. Tap any tool to start instantly.', color:'#00FFB2' },
                { n:'02', t:'Add Your Input',  d:'Paste text, upload a file, or type your idea. Low friction on phones.', color:'#4D96FF' },
                { n:'03', t:'Get Results',     d:'Download, copy or share. Fast output, no endless setup screens.', color:'#FFE500' },
              ].map((s, i) => (
                <div key={s.n} className="m-step" style={{ animationDelay:`${0.08+i*0.06}s`, borderColor:`${s.color}18` }}>
                  <div className="m-step-no" style={{ color:s.color, background:`${s.color}0a`, borderColor:`${s.color}22` }}>{s.n}</div>
                  <div>
                    <div className="m-step-title">{s.t}</div>
                    <div className="m-step-copy">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── FAQ ── */}
          <section className="m-section" id="faq">
            <h2 className="m-sh">Questions?</h2>
            <p className="m-sp">Common answers before you dive in.</p>
            <div className="m-faq">
              {faqs.map((f, i) => (
                <details key={f.q} className="m-faq-item" style={{ animationDelay:`${0.04+i*0.03}s` }}>
                  <summary>
                    {f.q}
                    <div className="m-faq-icon">+</div>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── Support ── */}
          <section className="m-section" id="support">
            <h2 className="m-sh">Support</h2>
            <p className="m-sp">If something breaks, there is a clear next step.</p>
            <div className="m-stack">
              {supports.map((s, i) => (
                <a key={s.title} href={s.link} className="m-panel" style={{ textDecoration:'none', borderColor:`${s.color}1e`, animationDelay:`${0.05+i*0.04}s` }}>
                  <div className="m-panel-tag">Support</div>
                  <div className="m-panel-title" style={{ color: s.color }}>{s.title}</div>
                  <div className="m-panel-copy">{s.desc}</div>
                  <div className="m-panel-link" style={{ color: s.color }}>{s.cta}</div>
                </a>
              ))}
            </div>
          </section>

          <div className="m-divider" />

          {/* ── Final CTA ── */}
          <section className="m-section" id="cta">
            <div className="m-cta-box">
              <div className="m-cta-kicker">{'// Ready to go?'}</div>
              <div className="m-cta-title">Stop Waiting<br/><span>Start Building</span></div>
              <div className="m-cta-copy">21 tools. Free daily AI credits. Just open a tab and get moving.</div>
              <div className="m-cta-btns">
                <a href="#tools" className="m-cta primary">Try Free Tools ⚡</a>
                <a href="#faq" className="m-cta secondary">Read FAQs →</a>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="m-footer">
            <div className="m-footer-brand"><em>Tool</em>void</div>
            <div className="m-footer-copy">21 tools for creators, builders and hustlers. Fast workflows, clear daily AI limits.</div>
            <div className="m-footer-cols">
              <div className="m-footer-col">
                <h4>AI Tools</h4>
                {tools.filter(t=>t.tag==='AI').map(t=><a key={t.href} href={t.href}>{t.name}</a>)}
                <h4 style={{marginTop:'16px'}}>Finance</h4>
                {tools.filter(t=>t.tag==='Finance').map(t=><a key={t.href} href={t.href}>{t.name}</a>)}
              </div>
              <div className="m-footer-col">
                <h4>Dev Tools</h4>
                {tools.filter(t=>t.tag==='Dev').map(t=><a key={t.href} href={t.href}>{t.name}</a>)}
                <h4 style={{marginTop:'16px'}}>Utilities</h4>
                {tools.filter(t=>t.tag==='Utility').map(t=><a key={t.href} href={t.href}>{t.name}</a>)}
              </div>
            </div>
            <div className="m-footer-end">
              <span>© 2026 TooL Void · All rights reserved</span>
              <span style={{color:'#1a1a2e'}}>Made with ⚡ Free Forever</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
