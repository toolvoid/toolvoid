'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useTilt from '../../components/useTilt';

const OneBrainLightbox = lazy(() => import('./OneBrainLightbox'));

const linuxDownload = 'https://github.com/toolvoid/one-brain/releases/latest/download/One-Brain-linux-x64.AppImage';
const windowsDownload = 'https://github.com/toolvoid/one-brain/releases/latest/download/One-Brain-win-x64.exe';
const macDownload = 'https://github.com/toolvoid/one-brain/releases/latest/download/One-Brain-mac-arm64.dmg';
const githubRepo = 'https://github.com/toolvoid/one-brain';
const releasesUrl = 'https://github.com/toolvoid/one-brain/releases';

const gallery = [
  { src: '/one-brain/main-view.png.png', alt: 'One Brain desktop app main view', caption: 'Your memory workspace', tab: 'Graph' },
  { src: '/one-brain/chat.png.png', alt: 'Chat view in the One Brain desktop app', caption: 'Ask your brain', tab: 'Chat' },
  { src: '/one-brain/insights.png.png', alt: 'Insights dashboard in the One Brain desktop app', caption: 'Activity, evaluation, and status', tab: 'Insights' },
];

const featureCategories = ['All', 'Security', 'Search', 'Connect', 'Tools'];
const categoryForFeature = (title) => ({
  'Encrypted local database': 'Security', 'Master-password vault': 'Security', 'Private memories and review': 'Security', 'Pending memories': 'Security',
  'Smart search': 'Search', '3D memory graph': 'Search', 'Built-in chat': 'Connect', 'Connections dashboard': 'Connect', 'MCP server': 'Connect', 'Local memory proxy': 'Connect',
  'Quick Context': 'Tools', 'Import': 'Tools', 'Insights': 'Tools', 'Clear error codes': 'Tools', 'Offline use': 'Tools',
}[title] || 'Tools');

const features = [
  ['▣', 'Encrypted local database', 'Memories live in an encrypted SQLite database on your computer.'],
  ['⌑', 'Master-password vault', 'Use auto-lock, escalating lockout after wrong passwords, and an encrypted recovery file.'],
  ['◎', '3D memory graph', 'Browse memories from Claude, ChatGPT, Gemini, Codex, Groq, DeepSeek, Perplexity, and Built-In, with suggested links between related memories.'],
  ['⌕', 'Smart search', 'SQLite full-text search and multilingual MiniLM embeddings let “cooking” find a recipe.'],
  ['✦', 'Built-in chat', 'Use your own API keys, choose a provider and model, and ask your saved memories.'],
  ['◉', 'Connections dashboard', 'See which AI clients and browser chats are connected.'],
  ['⌘', 'MCP server', 'Connect MCP clients to your memories.'],
  ['↗', 'Local memory proxy', 'Use an authenticated OpenAI-compatible proxy on your machine.'],
  ['⚡', 'Quick Context', 'Grab relevant context quickly; the global shortcut does not work on Wayland.'],
  ['↓', 'Import', 'Bring existing memories into One Brain.'],
  ['◈', 'Private memories and review', 'See context before it is sent to an AI.'],
  ['◷', 'Pending memories', 'Review items before they are saved.'],
  ['▤', 'Insights', 'Activity, Evaluation, and Status views show usage, retrieval quality, and health.'],
  ['↻', 'Clear error codes', 'OB-... errors include built-in Retry actions, with a graphics fallback for machines where the GPU crashes.'],
  ['⌁', 'Offline use', 'Work fully offline after the first-time roughly 130 MB embedding model download.'],
];

const howSteps = [
  ['Download for your system.', 'Choose the Linux, Windows, or macOS download below.'],
  ['Install or run it.', 'Follow the steps in Install for your operating system.'],
  ['Create your vault.', 'Set a master password and save the recovery file somewhere safe.'],
  ['Add or import memories.', 'Bring your existing memories into One Brain.'],
  ['Run your first search.', 'Internet is needed once for the roughly 130 MB local model. If it fails, connect and press Retry for OB-EMBED-001; it also recovers after reconnecting.'],
  ['Connect an AI.', 'Open Settings → Connections to set up an MCP client, local proxy, or browser extension.'],
  ['Search and chat.', 'Find memories, chat with them, and review context before sending.'],
];

const osGuides = {
  Linux: [
    'Download the AppImage.',
    'Open a terminal in your download folder.',
    'Make the file executable. The downloaded filename may include a version.',
    'On Ubuntu 22.04 and newer, install FUSE. On older Ubuntu or Debian, use libfuse2.',
    'Run the AppImage.',
    'Optionally, use your file manager: Properties → Allow executing as program, then double-click it.',
    'Data location: ~/.config/one-brain. To uninstall, delete the AppImage; delete that folder too if you also want to remove your data.',
  ],
  Windows: [
    'Run the downloaded .exe installer.',
    'The installer is unsigned, so SmartScreen may warn you. Choose More info → Run anyway.',
    'Follow the installer steps.',
    'Launch One Brain from the Start menu.',
  ],
  macOS: [
    'Open the .dmg and drag One Brain to Applications.',
    'On first launch, right-click One Brain and choose Open. Gatekeeper may warn because the app is unsigned.',
    'If macOS says the app is damaged, run the command below. This is commonly needed for unsigned apps.',
  ],
};

const helpItems = [
  ['App will not start on Linux', <>Install FUSE (<code>libfuse2</code>) and make the AppImage executable with <code>chmod +x</code>.</>],
  ['Window is blank or graphics crash', <>Open Settings → Graphics mode → Software. On Wayland, run with <code>ONE_BRAIN_OZONE=auto</code> to see terminal logs.</>],
  ['Semantic search needs attention / OB-EMBED-001', <>The first model download needs internet. Connect and press Retry; it also recovers after reconnecting.</>],
  ['I forgot my master password', <>Use the encrypted recovery file saved when you created the vault. Without it, the data cannot be recovered; this is by design.</>],
  ['Where is my data?', <>On Linux, data is in <code>~/.config/one-brain</code> and is encrypted.</>],
  ['Windows or macOS shows a security warning', <>The installers are unsigned. On Windows choose More info → Run anyway; on macOS right-click the app and choose Open.</>],
  ['Does One Brain send my data anywhere?', <>There is no One Brain cloud server. If you send context to an online AI provider, that provider receives it.</>],
  ['What do the OB- error codes mean?', <>See the <a href="https://github.com/toolvoid/one-brain/blob/main/docs/ERRORS.md" target="_blank" rel="noreferrer">error code guide</a>.</>],
  ['Report a bug or ask a question', <>Visit <a href="https://github.com/toolvoid/one-brain/issues" target="_blank" rel="noreferrer">One Brain on GitHub</a>.</>],
];

function GraphVisual() {
  const graphRef = useRef(null);
  const graphFrame = useRef(0);
  const onGraphMove = (event) => {
    if (!graphRef.current || event.pointerType === 'touch' || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches || document.visibilityState !== 'visible') return;
    const rect = graphRef.current.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    if (graphFrame.current) window.cancelAnimationFrame(graphFrame.current);
    graphFrame.current = window.requestAnimationFrame(() => {
      if (document.visibilityState !== 'visible') { graphFrame.current = 0; return; }
      graphRef.current?.style.setProperty('--mx', `${mx}%`);
      graphRef.current?.style.setProperty('--my', `${my}%`);
      graphFrame.current = 0;
    });
  };
  const resetGraph = () => {
    if (graphFrame.current) window.cancelAnimationFrame(graphFrame.current);
    graphFrame.current = 0;
    graphRef.current?.style.setProperty('--mx', '50%');
    graphRef.current?.style.setProperty('--my', '50%');
  };
  return (
    <div ref={graphRef} className="ob-graph-visual ob-reveal" onPointerMove={onGraphMove} onPointerLeave={resetGraph} aria-hidden="true">
      <svg viewBox="0 0 220 220" role="presentation">
        <g className="ob-graph-orbit" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M110 110 110 25M110 110 183.6 67.5M110 110 183.6 152.5M110 110 110 195M110 110 36.4 152.5M110 110 36.4 67.5" opacity=".55" />
          <circle cx="110" cy="25" r="8" fill="#2dd4bf"/><circle cx="183.6" cy="67.5" r="8" fill="#a78bfa"/>
          <circle cx="183.6" cy="152.5" r="8" fill="#2dd4bf"/><circle cx="110" cy="195" r="8" fill="#a78bfa"/>
          <circle cx="36.4" cy="152.5" r="8" fill="#2dd4bf"/><circle cx="36.4" cy="67.5" r="8" fill="#a78bfa"/>
        </g>
        <circle className="ob-graph-center-halo" cx="110" cy="110" r="25" fill="rgba(45,212,191,.12)" />
        <circle className="ob-graph-center" cx="110" cy="110" r="12" fill="#eafffc" stroke="#2dd4bf" strokeWidth="4" />
      </svg>
    </div>
  );
}

function FeatureCard({ feature, index }) {
  const { ref: tiltRef, onPointerMove, onPointerLeave } = useTilt(6);
  const [icon, title, copy] = feature;
  return (
    <article ref={tiltRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="ob-feature ob-tilt-card ob-reveal" style={{ '--delay': `${Math.min(index, 8) * 45}ms` }}>
      <span className="ob-feature-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3><p>{copy}</p>
    </article>
  );
}

function DownloadCard({ item, recommended }) {
  const { ref: tiltRef, onPointerMove, onPointerLeave } = useTilt(7);
  return (
    <article ref={tiltRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`ob-download-card ${recommended ? 'recommended' : ''}`}>
      {recommended && <span className="ob-recommended-label">Recommended for your system</span>}
      <h3><span className="ob-platform-icon" aria-hidden="true">{item.os === 'Linux' ? '◈' : item.os === 'Windows' ? '▦' : '⌘'}</span>{item.name}</h3>
      <span className="ob-version">Latest release</span>
      <p className="ob-size">{item.type} · {item.size}</p>
      {item.experimental ? <p className="ob-experimental">Experimental: built and smoke-tested in CI, not yet tested on real machines{item.os === 'macOS' ? '. Intel Macs are not supported.' : '.'}</p> : <p className="ob-experimental" aria-hidden="true">&nbsp;</p>}
      <a className="ob-btn primary" href={item.href}>Download for {item.os}</a>
    </article>
  );
}

function CopyBlock({ text, children }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return <div className="ob-code-window"><div className="ob-code-top"><span aria-hidden="true"><i /><i /><i /></span><span>Terminal</span></div><div className="ob-code-row"><pre><code>{children || text}</code></pre><button type="button" className={`ob-copy-btn ${copied ? 'copied' : ''}`} aria-label={`Copy command: ${text}`} onClick={copy}><span aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</span></button></div></div>;
}

export default function OneBrainClient() {
  const { ref: shotTiltRef, onPointerMove: onShotMove, onPointerLeave: onShotLeave } = useTilt(3);
  const [stars, setStars] = useState(null);
  const [activeShot, setActiveShot] = useState(0);
  const [os, setOs] = useState('Linux');
  const [recommendedOs, setRecommendedOs] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [helpQuery, setHelpQuery] = useState('');
  const [activeNav, setActiveNav] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let active = true;
    fetch('https://api.github.com/repos/toolvoid/one-brain')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active && Number.isFinite(data?.stargazers_count)) setStars(data.stargazers_count); })
      .catch(() => {});
    const osDetection = window.setTimeout(() => {
      const ua = navigator.userAgent;
      const detected = /Windows/i.test(ua) ? 'Windows' : /Macintosh|Mac OS/i.test(ua) ? 'macOS' : /Linux|X11/i.test(ua) ? 'Linux' : null;
      if (detected) {
        setRecommendedOs(detected);
        setOs(detected);
      }
    }, 0);
    return () => { active = false; window.clearTimeout(osDetection); };
  }, []);

  useEffect(() => {
    const root = document.querySelector('.ob-page');
    if (!root) return undefined;
    root.classList.add('ob-motion-ready');
    const visibleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = 'true';
        }
        entry.target.dataset.onscreen = entry.isIntersecting ? 'true' : 'false';
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    root.querySelectorAll('.ob-reveal').forEach((node) => visibleObserver.observe(node));
    const featureGrid = root.querySelector('.ob-features');
    const featureMutationObserver = featureGrid ? new MutationObserver(() => featureGrid.querySelectorAll('.ob-reveal:not([data-visible="true"])').forEach((node) => visibleObserver.observe(node))) : null;
    if (featureGrid) featureMutationObserver?.observe(featureGrid, { childList: true });

    const navObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveNav(current.target.id);
    }, { threshold: [0.1, 0.35, 0.6], rootMargin: '-18% 0px -58% 0px' });
    ['features', 'download', 'install', 'extension', 'help'].forEach((id) => {
      const node = document.getElementById(id);
      if (node) navObserver.observe(node);
    });

    const stepObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveStep(Number(current.target.dataset.stepIndex));
    }, { threshold: 0.55, rootMargin: '-10% 0px -25% 0px' });
    const stepNodes = [...root.querySelectorAll('.ob-step')];
    stepNodes.forEach((node) => stepObserver.observe(node));

    const updateVisibility = () => { root.dataset.hidden = document.visibilityState !== 'visible' ? 'true' : 'false'; };
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    let progressFrame = 0;
    const progressNode = root.querySelector('.ob-scroll-progress');
    const updateProgress = () => {
      progressFrame = 0;
      if (document.visibilityState !== 'visible') return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressNode?.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    const onScroll = () => { if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateProgress();

    return () => {
      visibleObserver.disconnect(); featureMutationObserver?.disconnect(); navObserver.disconnect(); stepObserver.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      root.classList.remove('ob-motion-ready');
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector('.ob-page');
    if (!root) return undefined;
    let frame = 0;
    const magnets = [...root.querySelectorAll('.ob-magnetic')];
    let pointerX = 0;
    let pointerY = 0;
    const move = (event) => {
      if (event.pointerType === 'touch' || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(() => {
        if (document.visibilityState !== 'visible') { frame = 0; return; }
        magnets.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (pointerX < rect.left - 40 || pointerX > rect.right + 40 || pointerY < rect.top - 40 || pointerY > rect.bottom + 40) return;
          node.style.setProperty('--mag-x', `${Math.max(-5, Math.min(5, (pointerX - rect.left - rect.width / 2) * .08))}px`);
          node.style.setProperty('--mag-y', `${Math.max(-5, Math.min(5, (pointerY - rect.top - rect.height / 2) * .08))}px`);
        });
        frame = 0;
      });
    };
    const reset = () => magnets.forEach((node) => { node.style.setProperty('--mag-x', '0px'); node.style.setProperty('--mag-y', '0px'); });
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', reset);
    return () => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', reset); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  const starsText = stars !== null ? ` · ★ ${stars.toLocaleString()}` : '';
  const filteredFeatures = activeCategory === 'All' ? features : features.filter(([, title]) => categoryForFeature(title) === activeCategory);
  const filteredHelp = helpItems.filter(([question]) => question.toLowerCase().includes(helpQuery.trim().toLowerCase()));
  const changeLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <main className="ob-page">
      <div className="ob-scroll-progress" aria-hidden="true" />
      <style precedence="default" href="one-brain-page-styles">{`
        .ob-page{--ob-accent:#2dd4bf;--ob-violet:#a78bfa;min-height:100vh;background:#060609;color:#f8fbff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow-x:clip;scroll-behavior:smooth}
        .ob-wrap{width:min(1120px,calc(100% - 32px));margin:0 auto}
        .ob-hero{position:relative;isolation:isolate;padding:88px 0 66px;border-bottom:1px solid rgba(255,255,255,.08);overflow:hidden}
        .ob-hero::before{content:"";position:absolute;z-index:-1;inset:-20% -10% auto auto;width:620px;height:620px;background:radial-gradient(circle,rgba(45,212,191,.2),transparent 64%);pointer-events:none}
        .ob-hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr);align-items:center;gap:30px}
        .ob-kicker{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(45,212,191,.35);background:rgba(45,212,191,.1);color:#99f6e4;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .ob-title{position:relative;margin:18px 0 14px;font-size:clamp(54px,8vw,104px);line-height:.88;font-weight:900;letter-spacing:-.055em;color:#fff}
        .ob-title span{color:var(--ob-accent);text-shadow:0 0 34px rgba(45,212,191,.35)}
        .ob-subtitle{max-width:700px;color:#b7c0d0;font-size:clamp(18px,2.5vw,23px);line-height:1.55}
        .ob-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:28px}
        .ob-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:12px;border:1px solid rgba(255,255,255,.14);text-decoration:none;font-weight:800;color:#f8fbff;background:rgba(255,255,255,.06);transition:transform .18s ease,border-color .18s ease,background .18s ease;cursor:pointer}
        .ob-btn:hover{transform:translateY(-2px);border-color:rgba(45,212,191,.5);background:rgba(45,212,191,.12)}
        .ob-btn.primary{background:#2dd4bf;color:#061312;border-color:#2dd4bf;box-shadow:0 14px 44px rgba(45,212,191,.22)}
        .ob-graph-visual{justify-self:center;display:grid;place-items:center;width:min(100%,370px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,.1),rgba(167,139,250,.055) 48%,transparent 70%);filter:drop-shadow(0 0 28px rgba(45,212,191,.13))}
        .ob-graph-visual svg{width:82%;overflow:visible;color:#9af6eb}
        .ob-graph-orbit{transform-origin:110px 110px;animation:ob-graph-spin 36s linear infinite}
        .ob-graph-center-halo{transform-origin:110px 110px;animation:ob-graph-pulse 3s ease-in-out infinite}
        @keyframes ob-graph-spin{to{transform:rotate(360deg)}}
        @keyframes ob-graph-pulse{0%,100%{transform:scale(.82);opacity:.5}50%{transform:scale(1.18);opacity:1}}
        .ob-trust{display:flex;flex-wrap:wrap;gap:9px;margin-top:26px}
        .ob-trust span{border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);padding:8px 11px;color:#c8d1df;font-size:12px;font-weight:700}
        .ob-trust span{transform:scale(.96);transition:transform .28s ease}.ob-trust[data-visible="true"] span{transform:scale(1)}.ob-trust[data-visible="true"] span:nth-child(2){transition-delay:90ms}.ob-trust[data-visible="true"] span:nth-child(3){transition-delay:180ms}.ob-trust[data-visible="true"] span:nth-child(4){transition-delay:270ms}
        .ob-nav{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(6,6,9,.88);backdrop-filter:blur(16px)}
        .ob-nav-inner{display:flex;justify-content:center;gap:8px;padding:10px 0;overflow-x:auto;scrollbar-width:none}
        .ob-nav-inner::-webkit-scrollbar{display:none}
        .ob-nav a{flex:0 0 auto;padding:9px 13px;border-radius:999px;color:#c5cedc;font-size:13px;font-weight:750;text-decoration:none}
        .ob-nav a:hover{color:#99f6e4;background:rgba(45,212,191,.1)}
        .ob-section{padding:62px 0;border-bottom:1px solid rgba(255,255,255,.08);scroll-margin-top:70px}
        .ob-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:24px}
        .ob-h2{font-size:clamp(30px,4vw,48px);line-height:1;font-weight:900;letter-spacing:-.025em;margin:0}
        .ob-copy{color:#96a1b2;font-size:15px;line-height:1.7;max-width:760px}
        .ob-gallery{max-width:920px;margin:0 auto}
        .ob-shot{overflow:hidden;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.045);border-radius:18px;box-shadow:0 25px 80px rgba(0,0,0,.25)}
        .ob-shot img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
        .ob-shot-caption{padding:13px 16px;color:#cbd5e1;font-size:14px}
        .ob-gallery-tabs{display:flex;justify-content:center;flex-wrap:wrap;gap:9px;margin-top:14px}
        .ob-gallery-tabs button,.ob-tab{border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:9px 14px;color:#c5cedc;background:rgba(255,255,255,.04);font:inherit;font-size:13px;font-weight:750;cursor:pointer}
        .ob-gallery-tabs button[aria-selected="true"],.ob-tab[aria-selected="true"]{color:#041311;border-color:var(--ob-accent);background:var(--ob-accent)}
        .ob-features{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
        .ob-feature{min-height:158px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.025));border-radius:16px;padding:18px}
        .ob-feature-icon{display:grid;place-items:center;width:38px;height:38px;margin-bottom:15px;border:1px solid rgba(45,212,191,.28);border-radius:12px;color:#99f6e4;background:rgba(45,212,191,.09);font-size:20px;font-weight:800}
        .ob-feature h3{margin:0 0 7px;color:#fff;font-size:16px;line-height:1.25}
        .ob-feature p{margin:0;color:#9eabbc;font-size:13px;line-height:1.6}
        .ob-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;counter-reset:ob-steps}
        .ob-step{display:flex;gap:15px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);border-radius:15px;padding:17px}
        .ob-step-num{flex:0 0 34px;display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(45,212,191,.35);border-radius:11px;color:#99f6e4;background:rgba(45,212,191,.09);font:800 12px/1 ui-monospace,monospace}
        .ob-step strong{display:block;color:#fff;margin-bottom:4px}
        .ob-step p{margin:0;color:#9eabbc;font-size:13px;line-height:1.55}
        .ob-note{margin-top:14px;border:1px solid rgba(45,212,191,.2);border-radius:13px;padding:13px 15px;background:rgba(45,212,191,.07);color:#c8f8f1;font-size:13px;line-height:1.6}
        .ob-download{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .ob-download-card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:12px;min-height:250px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(155deg,rgba(255,255,255,.065),rgba(255,255,255,.025));border-radius:18px;padding:21px}
        .ob-download-card.recommended{border-color:rgba(45,212,191,.7);box-shadow:0 0 0 1px rgba(45,212,191,.16),0 20px 55px rgba(45,212,191,.08)}
        .ob-recommended-label{position:absolute;top:13px;right:13px;padding:6px 8px;border-radius:999px;background:rgba(45,212,191,.14);color:#99f6e4;font-size:10px;font-weight:850;letter-spacing:.04em;text-transform:uppercase}
        .ob-download-card h3{margin:0;color:#fff;font-size:19px}
        .ob-size{margin:0;color:#aeb9c8;font-size:13px}
        .ob-experimental{min-height:38px;color:#fcd9a7;font-size:11px;line-height:1.5}
        .ob-download-card .ob-btn{width:100%;min-height:52px;margin-top:auto}
        .ob-releases{display:inline-block;margin-top:18px;color:#99f6e4;font-weight:750}
        .ob-os-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:34px 0 18px}
        .ob-install-panel{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.035);border-radius:18px;padding:22px}
        .ob-install-panel h3{margin:0 0 14px;color:#fff;font-size:21px}
        .ob-install-list{display:grid;gap:12px;margin:0;padding:0;list-style:none;counter-reset:ob-install}
        .ob-install-list li{position:relative;padding:0 0 0 38px;color:#cbd5e1;font-size:14px;line-height:1.65;counter-increment:ob-install}
        .ob-install-list li::before{content:counter(ob-install);position:absolute;left:0;top:0;display:grid;place-items:center;width:25px;height:25px;border:1px solid rgba(45,212,191,.27);border-radius:8px;color:#99f6e4;background:rgba(45,212,191,.08);font-size:11px;font-weight:800}
        .ob-code-row{display:flex;align-items:center;gap:10px;margin:10px 0}
        .ob-code-row pre{flex:1;min-width:0;overflow:auto;margin:0;border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px 14px;background:#0b1013;color:#99f6e4;font-size:13px;line-height:1.6}
        .ob-copy-btn{border:1px solid rgba(45,212,191,.3);border-radius:9px;padding:9px 12px;background:rgba(45,212,191,.08);color:#99f6e4;font:inherit;font-size:12px;font-weight:700;line-height:1;cursor:pointer}
        .ob-inline-code{display:inline-block;margin-top:8px;color:#99f6e4}
        .ob-tip{margin-top:10px;border-left:3px solid var(--ob-accent);padding:10px 13px;background:rgba(45,212,191,.06);color:#cbd5e1;font-size:13px;line-height:1.6}
        .ob-extension-card{position:relative;overflow:hidden;border:1px solid rgba(167,139,250,.3);border-radius:20px;padding:26px;background:radial-gradient(circle at 100% 0,rgba(167,139,250,.12),transparent 42%),rgba(255,255,255,.035)}
        .ob-coming{display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(167,139,250,.32);border-radius:999px;padding:8px 12px;background:rgba(167,139,250,.1);color:#ddd6fe;font-size:12px;font-weight:850;letter-spacing:.04em;text-transform:uppercase}
        .ob-coming::before{content:"";width:8px;height:8px;border-radius:50%;background:#a78bfa;box-shadow:0 0 0 0 rgba(167,139,250,.55);animation:ob-badge-pulse 1.8s ease-out infinite}
        @keyframes ob-badge-pulse{to{box-shadow:0 0 0 9px rgba(167,139,250,0)}}
        .ob-extension-card h3{margin:18px 0 8px;font-size:25px}
        .ob-extension-card p{color:#aeb9c8;line-height:1.7}
        .ob-extension-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:18px 0 0;padding:0;list-style:none}
        .ob-extension-list li{border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:11px 13px;color:#dbe3ed;background:rgba(255,255,255,.035);font-size:13px}
        .ob-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
        .ob-badge{border:1px solid rgba(45,212,191,.3);background:rgba(45,212,191,.08);color:#ccfbf1;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800}
        .ob-faq{display:grid;gap:9px}
        .ob-faq details,.ob-supplement details{border:1px solid rgba(255,255,255,.1);border-radius:13px;background:rgba(255,255,255,.035);overflow:hidden}
        .ob-faq summary,.ob-supplement summary{position:relative;cursor:pointer;list-style:none;padding:15px 46px 15px 16px;color:#f3f6fb;font-weight:750}
        .ob-faq summary::-webkit-details-marker,.ob-supplement summary::-webkit-details-marker{display:none}
        .ob-faq summary::after,.ob-supplement summary::after{content:"+";position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#99f6e4;font-size:21px;font-weight:500}
        .ob-faq details[open] summary::after,.ob-supplement details[open] summary::after{content:"−"}
        .ob-faq details p,.ob-faq details div{margin:0;padding:0 16px 16px;color:#aeb9c8;font-size:14px;line-height:1.7}
        .ob-faq a,.ob-supplement a{color:#99f6e4}
        .ob-final-cta{display:flex;justify-content:space-between;align-items:center;gap:24px;border:1px solid rgba(45,212,191,.22);border-radius:20px;padding:25px;background:linear-gradient(110deg,rgba(45,212,191,.1),rgba(167,139,250,.08))}
        .ob-final-cta h2{margin:0 0 7px;font-size:clamp(23px,3vw,32px)}
        .ob-final-cta p{margin:0;color:#aeb9c8;line-height:1.6}
        .ob-final-actions{display:flex;flex-wrap:wrap;gap:10px}
        .ob-details{width:min(1120px,calc(100% - 32px));margin:0 auto;padding:50px 0 36px;color:#d8deeb;line-height:1.75}
        .ob-details h2{font-size:clamp(26px,3.3vw,38px);line-height:1.1;color:#fff;margin:0 0 16px}
        .ob-details p{margin:0 0 14px;color:#aeb9c8}
        .ob-supplement{width:min(1120px,calc(100% - 32px));margin:0 auto 60px;padding:26px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.02));color:#d8deeb;line-height:1.7}
        .ob-supplement h2,.ob-supplement h3{color:#fff;margin:0 0 14px}
        .ob-supplement h2{font-size:clamp(24px,3vw,34px)}
        .ob-supplement h3{margin-top:24px;font-size:21px}
        .ob-supplement>p{color:#aeb9c8;margin:0 0 12px}
        .ob-supplement ol{padding-left:22px;color:#cbd5e1}
        .ob-supplement li{padding:3px 0 3px 4px}
        .ob-supplement section{display:grid;gap:9px}
        .ob-supplement section h3{grid-column:1/-1}
        .ob-supplement details p{margin:0;padding:0 16px 16px;color:#aeb9c8}
        .ob-scroll-progress{position:fixed;z-index:60;inset:0 0 auto;height:3px;pointer-events:none}.ob-scroll-progress::after{content:"";display:block;width:var(--scroll-progress,0%);height:100%;background:linear-gradient(90deg,#2dd4bf,#a78bfa);box-shadow:0 0 12px rgba(45,212,191,.75)}
        .ob-page :focus-visible{outline:2px solid #5eead4;outline-offset:4px}.ob-hero{background:radial-gradient(ellipse at 75% 18%,rgba(45,212,191,.12),transparent 30%),radial-gradient(ellipse at 40% 90%,rgba(124,58,237,.12),transparent 42%),linear-gradient(130deg,#08090e,#080b11 50%,#0c0915)}
        .ob-hero::after{content:"";position:absolute;z-index:-1;inset:0;opacity:.4;background:linear-gradient(115deg,transparent 30%,rgba(45,212,191,.08),transparent 65%);animation:ob-aurora 14s ease-in-out infinite alternate;pointer-events:none}@keyframes ob-aurora{to{transform:translate3d(8%,0,0);opacity:.7}}
        .ob-title span{background:linear-gradient(110deg,#d9fffa,#2dd4bf 35%,#a78bfa 70%,#2dd4bf);background-size:220% auto;color:transparent;background-clip:text;animation:ob-title-shimmer 9s linear infinite}@keyframes ob-title-shimmer{to{background-position:220% center}}
        .ob-graph-visual{--mx:50%;--my:50%;border:1px solid rgba(255,255,255,.08);box-shadow:inset 0 0 60px rgba(45,212,191,.07),0 0 90px rgba(45,212,191,.07)}.ob-graph-visual svg{transform:translate(calc((var(--mx) - 50%) * .07),calc((var(--my) - 50%) * .07))}.ob-graph-visual:hover .ob-graph-orbit path{opacity:.95;filter:drop-shadow(0 0 5px rgba(45,212,191,.9))}
        .ob-nav{box-shadow:0 12px 35px rgba(0,0,0,.22)}.ob-nav a[aria-current="location"]{color:#061312;background:#2dd4bf}
        .ob-motion-ready .ob-reveal:not([data-visible="true"]){opacity:0;translate:0 18px}.ob-motion-ready .ob-reveal[data-visible="true"]{opacity:1;translate:0 0;transition:translate .65s cubic-bezier(.2,.75,.25,1) var(--delay,0ms),opacity .65s ease var(--delay,0ms)}.ob-reveal:not([data-onscreen="true"]) *{animation-play-state:paused!important}
        .ob-feature{--mx:50%;--my:50%;position:relative;overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));will-change:transform;transition:transform .18s ease-out,border-color .2s,box-shadow .2s}.ob-feature::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(230px circle at var(--mx) var(--my),rgba(45,212,191,.14),rgba(167,139,250,.06) 36%,transparent 68%)}.ob-feature>*{position:relative;z-index:1}.ob-feature:hover{border-color:rgba(45,212,191,.38);box-shadow:0 18px 48px rgba(0,0,0,.25)}.ob-feature-icon{transition:transform .32s,box-shadow .32s}.ob-feature:hover .ob-feature-icon{transform:translateY(-3px) rotate(-7deg) scale(1.06)}
        .ob-filter-chips{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}.ob-filter-chips button{border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:9px 14px;color:#d7e0ec;background:#11151d;font:inherit;font-size:13px;font-weight:750;cursor:pointer}.ob-filter-chips button[aria-pressed="true"]{color:#061312;background:#2dd4bf;border-color:#2dd4bf}
        .ob-shot{position:relative;transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .2s ease-out,box-shadow .25s;cursor:zoom-in}.ob-shot:hover{box-shadow:0 28px 90px rgba(0,0,0,.4)}.ob-shot-open{display:block;width:100%;padding:0;border:0;text-align:left;color:inherit;background:transparent;cursor:zoom-in}.ob-shot-open img{animation:ob-shot-fade .35s ease-out}@keyframes ob-shot-fade{from{opacity:.35}to{opacity:1}}.ob-window-bar{height:38px;display:flex;align-items:center;gap:7px;padding:0 13px;border-bottom:1px solid rgba(255,255,255,.08);background:#10131a}.ob-window-bar i,.ob-code-top i{width:8px;height:8px;border-radius:50%;background:#fb7185}.ob-window-bar i:nth-child(2),.ob-code-top i:nth-child(2){background:#fbbf24}.ob-window-bar i:nth-child(3),.ob-code-top i:nth-child(3){background:#34d399}.ob-window-bar span{margin:auto;color:#778295;font:11px ui-monospace,monospace}
        .ob-steps{position:relative;display:block;max-width:880px;margin:0 auto!important;padding:8px 0 8px 56px!important}.ob-step{position:relative;margin-bottom:12px}.ob-step-dot{position:absolute;left:-49px;top:21px;box-sizing:border-box;width:14px;height:14px;border:2px solid #51616f;border-radius:50%;background:#090b10}.ob-step.is-active .ob-step-dot{border-color:#2dd4bf;background:#2dd4bf;box-shadow:0 0 16px #2dd4bf}.ob-step.is-active{border-color:rgba(45,212,191,.38);background:rgba(45,212,191,.07)}
        .ob-magnetic{translate:var(--mag-x,0px) var(--mag-y,0px);transition:translate .2s ease-out}.ob-download-card{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));will-change:transform;transition:transform .18s ease-out,border-color .25s,box-shadow .25s}.ob-download-card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),rgba(45,212,191,.12),transparent 65%)}.ob-download-card>*{position:relative;z-index:1}.ob-download-card h3{display:flex;align-items:center;gap:10px}.ob-platform-icon{display:grid;place-items:center;width:36px;height:36px;border:1px solid rgba(45,212,191,.26);border-radius:11px;color:#99f6e4;background:rgba(45,212,191,.08);font-size:20px}.ob-version{border:1px solid rgba(167,139,250,.26);border-radius:999px;padding:5px 8px;color:#ddd6fe;background:rgba(167,139,250,.08);font:700 10px ui-monospace,monospace}
        .ob-code-window{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#080c10}.ob-code-top{height:29px;display:flex;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid rgba(255,255,255,.08);color:#778295;font:10px ui-monospace,monospace}.ob-code-top>span:first-child{display:flex;gap:4px}.ob-code-top i{width:7px;height:7px}.ob-code-row{margin:0;padding:7px}.ob-code-row pre{background:transparent;border:0}.ob-copy-btn.copied{background:rgba(45,212,191,.2);animation:ob-copy-pop .28s ease-out}@keyframes ob-copy-pop{50%{transform:scale(1.06)}}
        .ob-os-tabs{position:relative;width:max-content;max-width:100%;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,.13)}.ob-os-tabs::after{content:"";position:absolute;bottom:-1px;left:0;width:33.333%;height:2px;background:#2dd4bf;box-shadow:0 0 12px rgba(45,212,191,.75);transform:translateX(calc(var(--tab-index,0) * 100%));transition:transform .28s}.ob-tab{background:transparent;border-color:transparent}
        .ob-extension-card::after{content:"";position:absolute;inset:-50%;pointer-events:none;background:linear-gradient(110deg,transparent 42%,rgba(255,255,255,.045) 50%,transparent 58%);transform:translateX(-65%);animation:ob-extension-shimmer 7s ease-in-out infinite}.ob-extension-card>*{position:relative;z-index:1}@keyframes ob-extension-shimmer{50%,100%{transform:translateX(65%)}}
        .ob-help-search{width:100%;max-width:480px;margin:0 0 18px;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:13px 15px;background:#0c1017;color:#f8fbff;font:inherit}.ob-help-search::placeholder{color:#9aa6b6}.ob-faq details .ob-faq-body{display:grid;grid-template-rows:0fr;padding:0;transition:grid-template-rows .28s ease}.ob-faq details[open] .ob-faq-body{grid-template-rows:1fr}.ob-faq-body>div{overflow:hidden}.ob-faq-empty{color:#cbd5e1;border:1px dashed rgba(255,255,255,.18);padding:16px;border-radius:12px}
        .ob-lightbox{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:24px;background:rgba(2,3,8,.9);backdrop-filter:blur(16px);animation:ob-fade .2s ease-out}.ob-lightbox-panel{position:relative;width:min(1100px,100%);max-height:calc(100vh - 48px);border:1px solid rgba(255,255,255,.16);border-radius:18px;overflow:hidden;background:#0a0d13;box-shadow:0 30px 100px #000}.ob-lightbox img{display:block;width:100%;height:auto;max-height:calc(100vh - 130px);object-fit:contain}.ob-lightbox-caption{padding:13px 18px;color:#dbe5ef}.ob-lightbox-controls{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between}.ob-lightbox-controls button{border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:10px 13px;background:rgba(4,8,12,.8);color:#fff;font:inherit;cursor:pointer}@keyframes ob-fade{from{opacity:0}to{opacity:1}}
        .ob-page[data-hidden="true"] *{animation-play-state:paused!important}.ob-reveal:not([data-onscreen="true"]),.ob-reveal:not([data-onscreen="true"])::before,.ob-reveal:not([data-onscreen="true"])::after,.ob-reveal:not([data-onscreen="true"]) *{animation-play-state:paused!important}.ob-reveal:not([data-onscreen="true"]) .ob-extension-card::after,.ob-reveal:not([data-onscreen="true"]) .ob-coming::before{animation-play-state:paused!important}
        @media(max-width:720px){.ob-steps{padding-left:48px!important}.ob-step-dot{left:-41px}}
        @media(max-width:620px){.ob-lightbox{padding:10px}.ob-lightbox-panel{max-height:calc(100vh - 20px)}.ob-lightbox img{max-height:calc(100vh - 100px)}.ob-filter-chips{gap:6px}.ob-filter-chips button{padding:8px 11px}.ob-final-actions .ob-btn{flex:1}}
        @media(max-width:380px){.ob-title{font-size:51px}.ob-trust span{font-size:11px;padding:7px 9px}.ob-actions .ob-btn{padding-inline:12px}}
        @media(pointer:coarse){.ob-feature,.ob-download-card,.ob-shot{transform:none!important;transition:none!important;will-change:auto}.ob-feature:active,.ob-download-card:active{transform:scale(.99)!important}}
        @media(prefers-reduced-motion:reduce){.ob-page,.ob-page *{scroll-behavior:auto!important;animation:none!important;transition:none!important}.ob-motion-ready .ob-reveal:not([data-visible="true"]){opacity:1;transform:none;translate:0 0}.ob-feature,.ob-download-card,.ob-shot{transform:none!important;will-change:auto}}
        @media(max-width:950px){.ob-features{grid-template-columns:repeat(2,minmax(0,1fr))}.ob-download{grid-template-columns:1fr 1fr}.ob-download-card:last-child{grid-column:1/-1}}
        @media(max-width:720px){.ob-hero{padding:58px 0 42px}.ob-hero-grid{grid-template-columns:1fr}.ob-graph-visual{grid-row:1;width:min(62vw,250px)}.ob-steps{grid-template-columns:1fr}.ob-extension-list{grid-template-columns:1fr}.ob-final-cta{display:block}.ob-final-actions{margin-top:16px}}
        @media(max-width:620px){.ob-wrap,.ob-details,.ob-supplement{width:min(100% - 24px,1120px)}.ob-section{padding:42px 0}.ob-head{display:block}.ob-copy{margin-top:10px}.ob-features,.ob-download{grid-template-columns:1fr}.ob-download-card:last-child{grid-column:auto}.ob-download-card{min-height:220px}.ob-actions .ob-btn{width:100%}.ob-nav-inner{justify-content:flex-start}.ob-install-panel{padding:16px}.ob-code-row{align-items:stretch;flex-direction:column}.ob-code-row .ob-copy-btn{align-self:flex-end}.ob-supplement{padding:20px 16px}}
        .ob-extension-mock{max-width:620px;margin-top:22px;border:1px solid rgba(255,255,255,.1);border-radius:15px;padding:10px;background:rgba(5,8,13,.56)}.ob-mock-top{display:flex;justify-content:space-between;padding:7px 9px;color:#9ba8ba;font:11px ui-monospace,monospace}.ob-extension-mock .ob-extension-list{margin:0}.ob-extension-mock .ob-extension-list li{background:rgba(255,255,255,.045)}
        @media(prefers-reduced-motion:reduce){.ob-graph-orbit,.ob-graph-center-halo,.ob-coming::before{animation:none!important}.ob-btn{transition:none}.ob-motion-ready .ob-reveal:not([data-visible="true"]){opacity:1!important;translate:0 0!important}}
      `}</style>

      <section className="ob-hero ob-reveal">
        <div className="ob-wrap ob-hero-grid">
          <div>
            <div className="ob-kicker">New Desktop App</div>
            <h1 className="ob-title"><span>One</span> Brain</h1>
            <p className="ob-subtitle">A private, local-first memory for your AI tools.</p>
            <div className="ob-actions">
              <a className="ob-btn primary ob-magnetic" href="#download">Download Now</a>
              <a className="ob-btn" href={githubRepo} target="_blank" rel="noreferrer">View on GitHub</a>
              <a className="ob-btn" href={githubRepo} target="_blank" rel="noreferrer">Star on GitHub{starsText}</a>
            </div>
        <div className="ob-trust ob-reveal"><span>Free</span><span>Open source (MIT)</span><span>Linux · Windows · macOS</span><span>No cloud server</span></div>
          </div>
          <GraphVisual />
        </div>
      </section>

      <nav className="ob-nav" aria-label="One Brain page sections">
        <div className="ob-wrap ob-nav-inner">
          <a href="#features" aria-current={activeNav === 'features' ? 'location' : undefined}>Features</a><a href="#download" aria-current={activeNav === 'download' ? 'location' : undefined}>Download</a><a href="#install" aria-current={activeNav === 'install' ? 'location' : undefined}>Install</a><a href="#extension" aria-current={activeNav === 'extension' ? 'location' : undefined}>Extension</a><a href="#help" aria-current={activeNav === 'help' ? 'location' : undefined}>Help</a>
        </div>
      </nav>

      <section className="ob-section ob-reveal" aria-labelledby="ob-gallery-title">
        <div className="ob-wrap">
          <div className="ob-head"><h2 className="ob-h2" id="ob-gallery-title">A Look Inside</h2></div>
          <div className="ob-gallery">
            <figure ref={shotTiltRef} onPointerMove={onShotMove} onPointerLeave={onShotLeave} className="ob-shot ob-reveal" id="ob-screenshot-panel" role="tabpanel">
              <div className="ob-window-bar" aria-hidden="true"><i /><i /><i /><span>One Brain</span></div>
              <button className="ob-shot-open" type="button" onClick={() => setLightboxIndex(activeShot)} aria-label={`Open ${gallery[activeShot].tab} screenshot`}>
                <Image key={gallery[activeShot].src} src={gallery[activeShot].src} alt={gallery[activeShot].alt} width={1200} height={675} loading="lazy" />
                <figcaption className="ob-shot-caption">{gallery[activeShot].caption}</figcaption>
              </button>
            </figure>
            <div className="ob-gallery-tabs" role="tablist" aria-label="One Brain screenshots">
              {gallery.map((shot, index) => <button key={shot.src} type="button" role="tab" aria-selected={activeShot === index} aria-controls="ob-screenshot-panel" tabIndex={activeShot === index ? 0 : -1} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = (index + (event.key === 'ArrowRight' ? 1 : gallery.length - 1)) % gallery.length; setActiveShot(next); event.currentTarget.parentElement.children[next]?.focus(); } }} onClick={() => setActiveShot(index)}>{shot.tab}</button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ob-section ob-reveal" id="features">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2">Features</h2><p className="ob-copy">Memory, search, and connections stay in one desktop app.</p></div></div>
          <div className="ob-filter-chips" role="group" aria-label="Filter features">
            {featureCategories.map((category) => <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="ob-features" aria-live="polite">{filteredFeatures.map((feature) => <FeatureCard key={feature[1]} feature={feature} index={features.indexOf(feature)} />)}</div>
        </div>
      </section>

      <section className="ob-section ob-reveal" aria-labelledby="ob-steps-title">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2" id="ob-steps-title">How It Works</h2><p className="ob-copy">From your first vault to reusable context.</p></div></div>
          <ol className="ob-steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>{howSteps.map(([title, copy], index) => <li className={`ob-step ${activeStep === index ? 'is-active' : ''}`} data-step-index={index} key={title}><span className="ob-step-dot" aria-hidden="true" /><span className="ob-step-num">{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="ob-section ob-reveal" id="download">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2">Download One Brain</h2><p className="ob-copy">Choose a build for your computer.</p></div></div>
          <div className="ob-download">
            {[
              { os: 'Linux', name: 'Linux x64', type: 'AppImage', size: 'Approx. 192 MB', href: linuxDownload },
              { os: 'Windows', name: 'Windows x64', type: 'Installer', size: 'Approx. 164 MB', href: windowsDownload, experimental: true },
              { os: 'macOS', name: 'macOS Apple Silicon', type: 'DMG', size: 'Approx. 200 MB', href: macDownload, experimental: true },
            ].map((item) => <DownloadCard key={item.os} item={item} recommended={recommendedOs === item.os} />)}
          </div>
          <a className="ob-releases" href={releasesUrl} target="_blank" rel="noreferrer">All releases</a>
        </div>
      </section>

      <section className="ob-section ob-reveal" id="install">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2">Install One Brain</h2><p className="ob-copy">Choose your operating system for installation steps.</p></div></div>
          <div className="ob-os-tabs" role="tablist" aria-label="Installation instructions" style={{ '--tab-index': Object.keys(osGuides).indexOf(os) }}>
            {Object.keys(osGuides).map((name, index) => <button type="button" role="tab" aria-selected={os === name} aria-controls="ob-install-panel" tabIndex={os === name ? 0 : -1} className="ob-tab" key={name} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = (index + (event.key === 'ArrowRight' ? 1 : Object.keys(osGuides).length - 1)) % Object.keys(osGuides).length; const target = Object.keys(osGuides)[next]; setOs(target); event.currentTarget.parentElement.children[next]?.focus(); } }} onClick={() => setOs(name)}>{name}</button>)}
          </div>
          <div className="ob-install-panel" id="ob-install-panel" role="tabpanel" aria-label={`${os} installation instructions`}>
            <h3>{os} installation</h3>
              {os === 'Linux' && <ol className="ob-install-list"><li>Download the AppImage.</li><li>Open a terminal in the download folder.</li><li>Make it executable. The filename may include a version.<CopyBlock text="chmod +x One-Brain-linux-x64.AppImage" /></li><li>On Ubuntu 22.04 and newer install FUSE:<CopyBlock text="sudo apt install libfuse2t64" />On older Ubuntu or Debian:<CopyBlock text="sudo apt install libfuse2" /></li><li>Run the AppImage:<CopyBlock text="./One-Brain-linux-x64.AppImage" /></li><li>Optional: in your file manager choose Properties → Allow executing as program, then double-click.</li><li>Data is stored at <code>~/.config/one-brain</code>. To uninstall, delete the AppImage; also delete that folder if you want to remove your data.</li></ol>}
            {os === 'Windows' && <ol className="ob-install-list"><li>Run the downloaded .exe installer.</li><li>The installer is unsigned. If SmartScreen warns you, choose More info → Run anyway.</li><li>Follow the installer steps.</li><li>Launch One Brain from the Start menu.</li></ol>}
            {os === 'macOS' && <><ol className="ob-install-list"><li>Open the .dmg and drag One Brain to Applications.</li><li>On first launch, right-click the app and choose Open. Gatekeeper may warn because the app is unsigned.</li><li>If macOS says the app is damaged, use this tip commonly needed for unsigned apps:</li></ol><CopyBlock text={'xattr -dr com.apple.quarantine "/Applications/One Brain.app"'} /></>}
            {os === 'Linux' && <div className="ob-tip">Wayland: One Brain relaunches under XWayland to avoid a GPU crash on some Intel graphics. For terminal logs, run:<CopyBlock text="ONE_BRAIN_OZONE=auto ./One-Brain-linux-x64.AppImage" /><br />If the window is blank or graphics crash, choose Settings → Graphics mode → Software.</div>}
          </div>
        </div>
      </section>

      <section className="ob-section ob-reveal" id="extension">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2">Browser Extension</h2><p className="ob-copy">Pair browser chats with the One Brain desktop app.</p></div></div>
          <div className="ob-extension-card">
            <span className="ob-coming">Coming soon</span>
            <h3>Extension will be available in a few days.</h3>
            <p>Install the desktop app first. The Chromium extension for Chrome, Brave, and Edge will add a One Brain button on supported chat sites.</p>
            <div className="ob-extension-mock"><div className="ob-mock-top"><span>One Brain</span><span aria-hidden="true">•••</span></div><ul className="ob-extension-list">{['Add memory', 'Manual context', 'Remove context', 'Save this chat with a preview before saving', 'Smart save toggle (auto-save is OFF by default)'].map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="ob-badges">{['Claude', 'ChatGPT', 'Gemini', 'DeepSeek', 'Groq', 'Perplexity'].map((name) => <span className="ob-badge" key={name}>{name}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="ob-section ob-reveal" id="help">
        <div className="ob-wrap">
          <div className="ob-head"><div><h2 className="ob-h2">Help</h2><p className="ob-copy">Answers for setup, recovery, and common issues.</p></div></div>
          <input className="ob-help-search" type="search" value={helpQuery} onChange={(event) => setHelpQuery(event.target.value)} placeholder="Search help" aria-label="Search help questions" />
          <div className="ob-faq" aria-live="polite">{filteredHelp.map(([question, answer]) => <details key={question}><summary>{question}</summary><div className="ob-faq-body"><div>{answer}</div></div></details>)}{filteredHelp.length === 0 && <p className="ob-faq-empty">No matching help questions.</p>}</div>
        </div>
      </section>

      <section className="ob-wrap ob-section ob-reveal" aria-label="Get One Brain">
        <div className="ob-final-cta"><div><h2>Keep your AI context close.</h2><p>Download One Brain or explore the project on GitHub.</p></div><div className="ob-final-actions"><a className="ob-btn primary ob-magnetic" href="#download">Download</a><a className="ob-btn" href={githubRepo} target="_blank" rel="noreferrer">Star on GitHub{starsText}</a></div></div>
      </section>
      {lightboxIndex !== null && <Suspense fallback={null}><OneBrainLightbox images={gallery} index={lightboxIndex} onClose={closeLightbox} onChange={changeLightbox} /></Suspense>}
    </main>
  );
}
