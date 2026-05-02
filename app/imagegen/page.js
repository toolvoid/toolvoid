'use client';
import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.ig-root *, .ig-root *::before, .ig-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ig-root {
  cursor: auto !important;
  --bg: #0c0a06; --bg2: #111008; --card: #141209;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12);
  --text: #e8e8f0; --text-muted: #6b6b85; --text-dim: #9090aa;
  --accent: #F59E0B; --accent2: #FCD34D;
  --accent-dim: rgba(245,158,11,0.12); --accent-dim2: rgba(245,158,11,0.06);
  --accent-glow: rgba(245,158,11,0.28);
  --error: #ff6b7a; --success: #34d399;
  --shadow: 0 4px 24px rgba(0,0,0,0.5); --shadow-lg: 0 12px 48px rgba(0,0,0,0.7);
  --radius: 14px; --radius-sm: 9px; --radius-xs: 6px;
  --tr: 0.2s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Syne', sans-serif;
  --font-body: 'Instrument Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  font-family: var(--font-body);
  background: var(--bg); color: var(--text);
  line-height: 1.6; overflow-x: hidden;
}

.ig-root.light {
  --bg: #fafaf7; --bg2: #f0efe8; --card: #ffffff;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.13);
  --text: #1a1507; --text-muted: #8a7a50; --text-dim: #5a4e32;
  --accent: #d97706; --accent2: #f59e0b;
  --accent-dim: rgba(217,119,6,0.1); --accent-dim2: rgba(217,119,6,0.05);
  --accent-glow: rgba(217,119,6,0.22);
  --error: #dc2626; --success: #059669;
  --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.14);
}
.ig-root.light .ig-nav { background: rgba(250,250,247,0.82); }
.ig-root.light .ig-tries.green { color: #059669; border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.06); }
.ig-root.light .ig-tries.yellow { color: #b45309; border-color: rgba(180,83,9,0.25); background: rgba(180,83,9,0.06); }
.ig-root.light .ig-tries.red { color: #dc2626; border-color: rgba(220,38,38,0.25); background: rgba(220,38,38,0.06); }

.ig-root a { color: inherit; text-decoration: none; }
.ig-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.ig-root ::selection { background: var(--accent-dim); color: var(--accent); }
.ig-root ::-webkit-scrollbar { width: 5px; }
.ig-root ::-webkit-scrollbar-track { background: var(--bg); }
.ig-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* ── NAV ── */
.ig-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(12,10,6,0.78); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); }
.ig-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.ig-logo-icon { width: 30px; height: 30px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
.ig-logo-text { color: var(--text-dim); font-size: 0.88rem; font-weight: 600; }
.ig-nav-right { display: flex; align-items: center; gap: 1rem; }
.ig-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.ig-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--tr); }
.ig-nav-links a:hover { color: var(--text); }
.ig-nav-cta { padding: 0.45rem 1.1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-size: 0.85rem; font-weight: 600; transition: all var(--tr); white-space: nowrap; }
.ig-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }
.ig-theme-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--tr); font-size: 1rem; flex-shrink: 0; }
.ig-theme-btn:hover { border-color: var(--accent); color: var(--accent); }

/* ── HERO ── */
.ig-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.ig-hero-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 58px 58px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.ig-hero-glow { position: absolute; top: 45%; left: 50%; transform: translate(-50%,-62%); width: 700px; height: 600px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.ig-hero-glow2 { position: absolute; top: 65%; right: 15%; width: 380px; height: 320px; background: radial-gradient(circle, rgba(252,211,77,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.ig-hero-content { position: relative; z-index: 1; max-width: 820px; }
.ig-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.25); border-radius: 99px; font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; color: var(--accent); letter-spacing: 0.05em; margin-bottom: 2rem; animation: igFadeUp 0.6s ease both; }
.ig-badge::before { content:''; width:6px; height:6px; border-radius:50%; background: var(--accent); animation: igPulse 2s ease-in-out infinite; }
@keyframes igPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
.ig-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem,7vw,5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: igFadeUp 0.7s 0.1s ease both; }
.ig-hero h1 .grad { background: linear-gradient(135deg, var(--accent), var(--accent2), #FEF3C7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.ig-hero-sub { font-size: clamp(1rem,2.5vw,1.2rem); color: var(--text-dim); max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; animation: igFadeUp 0.7s 0.2s ease both; }
.ig-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: igFadeUp 0.7s 0.3s ease both; }
.ig-btn-primary { padding: 0.75rem 1.8rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px var(--accent-glow); }
.ig-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 45px var(--accent-glow); opacity: 0.9; }
.ig-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.ig-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.ig-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: igFadeUp 0.7s 0.4s ease both; }
.ig-stat { text-align: center; }
.ig-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.ig-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
@keyframes igFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* ── SECTIONS ── */
.ig-section { padding: 6rem 1.5rem; }
.ig-section-inner { max-width: 1100px; margin: 0 auto; }
.ig-section-alt { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.ig-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.ig-title { font-family: var(--font-head); font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.ig-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; margin-left:auto; margin-right:auto; text-align:center; }

/* ── GENERATOR ── */
.ig-gen { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.ig-gen-header { text-align: center; margin-bottom: 3rem; }
.ig-gen-layout { display: grid; grid-template-columns: 400px 1fr; gap: 1.5rem; align-items: start; }
@media(max-width:900px) { .ig-gen-layout { grid-template-columns: 1fr; } }

/* ── CONTROLS CARD ── */
.ig-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 1.4rem; }
.ig-ctrl-label { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; color: var(--text-dim); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.45rem; display: block; }
.ig-textarea { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); resize: vertical; min-height: 96px; outline: none; transition: border-color var(--tr); }
.ig-textarea:focus { border-color: var(--accent); }
.ig-textarea.err { border-color: var(--error); }
.ig-textarea::placeholder { color: var(--text-muted); }
.ig-char-row { display: flex; align-items: center; justify-content: space-between; margin-top: 0.35rem; }
.ig-char-count { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
.ig-enhance-btn { display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.2); padding: 0.2rem 0.6rem; border-radius: 99px; cursor: pointer; transition: all var(--tr); }
.ig-enhance-btn:hover { background: rgba(245,158,11,0.2); }
.ig-enhance-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ig-select { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; outline: none; transition: border-color var(--tr); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b6b85' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.7rem center; background-size: 0.9rem; padding-right: 2.2rem; }
.ig-select:focus { border-color: var(--accent); }
.ig-select option { background: #0e0e18; }
.ig-selects-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.ig-ratio-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.5rem; }
.ig-ratio-btn { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 0.55rem 0.4rem; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--text-dim); transition: all var(--tr); }
.ig-ratio-btn .ratio-icon { font-size: 1rem; }
.ig-ratio-btn:hover { border-color: var(--accent); color: var(--accent); }
.ig-ratio-btn.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

/* Negative prompt */
.ig-neg-toggle { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); cursor: pointer; transition: color var(--tr); }
.ig-neg-toggle:hover { color: var(--text); }
.ig-neg-area { display: none; margin-top: 0.6rem; }
.ig-neg-area.open { display: block; }
.ig-neg-input { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text); outline: none; transition: border-color var(--tr); }
.ig-neg-input:focus { border-color: rgba(245,158,11,0.4); }
.ig-neg-input::placeholder { color: var(--text-muted); }

/* Tries display */
.ig-tries { text-align: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; padding: 0.6rem 0.9rem; border-radius: var(--radius-xs); background: var(--bg2); border: 1px solid var(--border); }
.ig-tries.green { color: #34d399; border-color: rgba(52,211,153,0.2); background: rgba(52,211,153,0.05); }
.ig-tries.yellow { color: #fbbf24; border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.05); }
.ig-tries.red { color: var(--error); border-color: rgba(255,107,122,0.2); background: rgba(255,107,122,0.05); }
.ig-usage-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:0.55rem; }
.ig-usage-stat { background: var(--bg2); border:1px solid var(--border); border-radius: var(--radius-xs); padding:0.65rem 0.75rem; }
.ig-usage-k { font-family: var(--font-mono); font-size:0.64rem; letter-spacing:0.08em; text-transform:uppercase; color: var(--text-muted); }
.ig-usage-v { margin-top:0.25rem; font-family: var(--font-head); font-size:1rem; font-weight:700; letter-spacing:-0.03em; color: var(--text); }

/* Generate button */
.ig-btn-gen { width: 100%; padding: 0.9rem 1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.95rem; transition: all var(--tr); display: flex; align-items: center; justify-content: center; gap: 0.6rem; box-shadow: 0 4px 20px var(--accent-glow); }
.ig-btn-gen:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 6px 28px var(--accent-glow); }
.ig-btn-gen:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.ig-spin { animation: igSpin 0.7s linear infinite; display: inline-block; }
@keyframes igSpin { to { transform: rotate(360deg); } }
.ig-error-box { display: flex; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(255,107,122,0.08); border: 1px solid rgba(255,107,122,0.22); border-radius: var(--radius-xs); font-size: 0.83rem; color: #fca5a5; font-family: var(--font-mono); }

/* ── PREVIEW PANEL ── */
.ig-preview { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; min-height: 520px; display: flex; flex-direction: column; box-shadow: var(--shadow); }
.ig-preview-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
.ig-live-badge { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; }
.ig-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: igLive 1.5s ease-in-out infinite; }
@keyframes igLive { 0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,0.5)} 50%{box-shadow:0 0 0 5px rgba(245,158,11,0)} }
.ig-gen-time { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); padding: 0.2rem 0.6rem; border: 1px solid var(--border); border-radius: 99px; }

/* Image canvas area */
.ig-img-wrap { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); position: relative; overflow: hidden; min-height: 320px; display: flex; align-items: center; justify-content: center; }
.ig-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--border-hi) 1px, transparent 1px); background-size: 18px 18px; opacity: 0.5; pointer-events: none; }

/* Placeholder */
.ig-placeholder { text-align: center; position: relative; z-index: 1; padding: 2rem; }
.ig-placeholder-icon { font-size: 3rem; opacity: 0.15; margin-bottom: 0.75rem; animation: igFloat 3s ease-in-out infinite; }
@keyframes igFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.ig-placeholder-text { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }

/* Loading shimmer */
.ig-shimmer { position: absolute; inset: 0; z-index: 2; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; padding: 1.5rem; }
.ig-shimmer.show { display: flex; }
.ig-shimmer-bg { position: absolute; inset: 0; background: linear-gradient(90deg, var(--bg2) 0%, rgba(245,158,11,0.07) 50%, var(--bg2) 100%); background-size: 200% 100%; animation: igShimmer 2s ease-in-out infinite; }
@keyframes igShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.ig-shimmer-text { position: relative; z-index: 1; font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent); animation: igPulse 1.5s ease-in-out infinite; }
.ig-progress-bar { position: relative; z-index: 1; width: 80%; max-width: 260px; height: 3px; background: var(--border-hi); border-radius: 99px; overflow: hidden; }
.ig-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 99px; width: 0%; transition: width 0.5s ease; }
.ig-wait-msg { position: relative; z-index: 1; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }

/* Generated image */
.ig-output-img { position: relative; z-index: 1; max-width: 100%; max-height: 480px; border-radius: var(--radius-sm); box-shadow: 0 8px 32px rgba(0,0,0,0.6); opacity: 0; transition: opacity 0.5s ease; object-fit: contain; display: none; cursor: zoom-in; }
.ig-output-img.show { opacity: 1; display: block; }

/* Image hover overlay */
.ig-img-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.85)); padding: 1.5rem 1rem 0.75rem; opacity: 0; transition: opacity var(--tr); z-index: 3; pointer-events: none; border-radius: 0 0 var(--radius-sm) var(--radius-sm); }
.ig-img-wrap:hover .ig-img-overlay { opacity: 1; }
.ig-overlay-info { font-family: var(--font-mono); font-size: 0.72rem; color: rgba(255,255,255,0.7); display: flex; gap: 1rem; flex-wrap: wrap; }
.ig-overlay-info span { background: rgba(255,255,255,0.08); padding: 0.2rem 0.5rem; border-radius: 4px; }

/* Action buttons below image */
.ig-img-actions { display: none; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap; }
.ig-img-actions.show { display: flex; }
.ig-act-btn { flex: 1; min-width: 100px; display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.65rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600; transition: all var(--tr); }
.ig-act-dl { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 3px 14px var(--accent-glow); }
.ig-act-dl:hover { opacity: 0.85; transform: translateY(-1px); }
.ig-act-regen { background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); }
.ig-act-regen:hover { border-color: var(--accent); color: var(--accent); }
.ig-act-var { background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); }
.ig-act-var:hover { border-color: var(--accent2); color: var(--accent2); }
.ig-act-share { background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); }
.ig-act-share:hover { border-color: var(--success); color: var(--success); }
.ig-btn-dl-main { width: 100%; padding: 0.8rem 1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all var(--tr); box-shadow: 0 4px 16px var(--accent-glow); }
.ig-btn-dl-main:hover { opacity: 0.88; transform: translateY(-1px); }
.ig-btn-dl-main:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

/* Image History */
.ig-history { margin-top: 1.25rem; display: none; }
.ig-history.show { display: block; }
.ig-history-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.6rem; }
.ig-history-row { display: flex; gap: 0.6rem; }
.ig-thumb { width: 72px; height: 72px; border-radius: var(--radius-xs); object-fit: cover; border: 2px solid var(--border); cursor: pointer; transition: all var(--tr); opacity: 0.7; }
.ig-thumb:hover { border-color: var(--accent); opacity: 1; transform: scale(1.05); }
.ig-thumb.active { border-color: var(--accent); opacity: 1; }

/* ── FEATURES ── */
.ig-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.ig-feat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--tr); position: relative; overflow: hidden; }
.ig-feat-card::before { content:''; position:absolute; inset:0; background: var(--accent-dim2); opacity:0; transition: opacity var(--tr); }
.ig-feat-card:hover::before { opacity:1; }
.ig-feat-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.ig-feat-icon { width:44px; height:44px; background: var(--accent-dim); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:1.1rem; }
.ig-feat-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.ig-feat-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* ── HOW IT WORKS ── */
.ig-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.ig-hiw-steps::before { content:''; position:absolute; top:2.4rem; left:10%; right:10%; height:1px; background: linear-gradient(90deg,transparent,var(--border-hi),transparent); }
.ig-step { text-align: center; }
.ig-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--accent); opacity: 0.13; line-height: 1; margin-bottom: 0.75rem; }
.ig-step-icon { width:52px; height:52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin: 0 auto 1rem; }
.ig-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.ig-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* ── USE CASES ── */
.ig-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.ig-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--tr); }
.ig-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.ig-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.65rem; border-radius: 99px; margin-bottom: 0.9rem; }
.ig-tag-b { background: var(--accent-dim); color: var(--accent); }
.ig-tag-p { background: rgba(167,139,250,0.12); color: #a78bfa; }
.ig-tag-g { background: rgba(52,211,153,0.1); color: #34d399; }
.ig-case-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.ig-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* ── FAQ ── */
.ig-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.ig-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--tr); }
.ig-faq-item.open { border-color: var(--border-hi); }
.ig-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--tr); gap: 1rem; }
.ig-faq-q:hover { color: var(--accent); }
.ig-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.ig-faq-item.open .ig-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.ig-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.75; }
.ig-faq-item.open .ig-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

/* ── FOOTER ── */
.ig-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.ig-footer-inner { max-width: 1100px; margin: 0 auto; }
.ig-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.ig-footer-logo-icon { width: 28px; height: 28px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; }
.ig-footer-sub { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; }
.ig-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; list-style: none; }
.ig-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--tr); }
.ig-footer-links a:hover { color: var(--accent); }
.ig-footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }

/* ── MODAL ── */
.ig-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1.5rem; animation: igFadeIn 0.2s ease; }
@keyframes igFadeIn { from{opacity:0} to{opacity:1} }
.ig-modal { background: var(--card); border: 1px solid var(--border-hi); border-radius: var(--radius); padding: 2.25rem; max-width: 380px; width: 100%; text-align: center; box-shadow: var(--shadow-lg); animation: igSlideUp 0.25s ease; }
@keyframes igSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.ig-modal-icon { width:64px; height:64px; background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.25); border-radius: 16px; display:flex; align-items:center; justify-content:center; margin: 0 auto 1.25rem; font-size:1.8rem; }
.ig-modal h3 { font-family: var(--font-head); font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; }
.ig-modal p { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 0.35rem; }
.ig-modal-reset { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.75rem; }
.ig-modal-btns { display: flex; flex-direction: column; gap: 0.75rem; }
.ig-modal-upgrade { padding: 0.85rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.92rem; transition: all var(--tr); }
.ig-modal-upgrade:hover { opacity: 0.85; transform: translateY(-1px); }
.ig-modal-cancel { padding: 0.85rem; background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-sm); font-weight: 500; font-size: 0.88rem; transition: all var(--tr); }
.ig-modal-cancel:hover { border-color: var(--accent); color: var(--text); }

/* ── TOAST ── */
.ig-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.7rem 1.2rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.5rem; pointer-events: none; transform: translateY(80px); opacity: 0; transition: all 0.28s cubic-bezier(0.4,0,0.2,1); }
.ig-toast.show { transform: translateY(0); opacity: 1; }
.ig-toast-icon { color: var(--accent); }

/* ── RESPONSIVE ── */
@media(max-width:640px) {
  .ig-nav-links { display: none; }
  .ig-hero-stats { gap: 1.5rem; }
  .ig-stat-num { font-size: 1.4rem; }
  .ig-ratio-row { grid-template-columns: repeat(2,1fr); }
  .ig-selects-row { grid-template-columns: 1fr; }
  .ig-hiw-steps::before { display: none; }
  .ig-img-actions { flex-direction: column; }
  .ig-act-btn { flex: none; width: 100%; }
}
`;

const STYLES = ['Realistic','Digital Art','Anime/Manga','Oil Painting','Watercolor','Sketch/Pencil','Cinematic','Minimalist','Fantasy','Vintage/Retro'];
const MOODS  = ['Neutral','Dark & Moody','Bright & Cheerful','Dramatic','Peaceful & Calm','Mysterious'];
const RATIOS = [
  { id:'1:1',  label:'1:1',  sub:'Square',    icon:'⬛' },
  { id:'16:9', label:'16:9', sub:'Wide',       icon:'▬' },
  { id:'9:16', label:'9:16', sub:'Portrait',   icon:'▮' },
  { id:'4:3',  label:'4:3',  sub:'Standard',   icon:'🟫' },
];
const LOAD_MSGS = ['🎨 Starting generation…','✨ Adding details…','🖌️ Applying style…','🔮 Almost there — image servers can be slow…'];
const HIST_KEY  = 'ig_history_v1';
const TRIES_KEY = 'ig_tries_v1';
const POOLINATION_FREE_LIMIT = 6;
const EXTRA_PACKAGES = {
  10: 19,
  40: 39,
};

export default function ImageGenPage() {
  const { status } = useSession();
  const authStatusRef = useRef(status);
  authStatusRef.current = status;

  useEffect(() => {
    const root = document.getElementById('ig-root');
    if (!root) return;

    const G = id => document.getElementById(id);
    const isSignedIn = () => authStatusRef.current === 'authenticated';
    function getHistory() { try { return JSON.parse(localStorage.getItem(HIST_KEY)||'[]'); } catch { return []; } }
    function saveHistory(entry) {
      try { const h=getHistory(); localStorage.setItem(HIST_KEY,JSON.stringify([entry,...h.filter(x=>x.ts!==entry.ts)].slice(0,3))); } catch {}
    }
    async function readJsonSafe(res) {
      const text = await res.text();
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch {
        return { error: text.slice(0, 200) || 'Invalid server response' };
      }
    }

    // ─── State ───────────────────────────────────────────────────────────────
    let state = {
      prompt:'', style:'Realistic', ratio:'1:1', mood:'Neutral', generator:'poolinations',
      negPrompt:'', loading:false, currentImg:null,
      genTime:0, startTime:0, msgIdx:0, msgTimer:null,
      progressTimer:null, progressVal:0,
      authenticated:false, authChecking:true, quota:{ used:0, remaining:null, limit:POOLINATION_FREE_LIMIT, reset:'Loading…' },
      resetTime:'', activeThumb:-1, lastEngine:'', lastModel:'',
    };

    // ─── DOM refs ─────────────────────────────────────────────────────────────
    const textarea    = G('ig-prompt');
    const charCount   = G('ig-charcount');
    const styleSel    = G('ig-style');
    const moodSel     = G('ig-mood');
    const authWrap    = G('ig-auth-wrap');
    const triesBadge  = G('ig-tries');
    const usageGrid   = G('ig-usage');
    const genBtn      = G('ig-genbtn');
    const errorBox    = G('ig-error');
    const shimmer     = G('ig-shimmer');
    const shimmerTxt  = G('ig-shimmer-txt');
    const shimmerWait = G('ig-shimmer-wait');
    const progressFill= G('ig-progress-fill');
    const placeholder = G('ig-placeholder');
    const outputImg   = G('ig-output-img');
    const imgActions  = G('ig-img-actions');
    const imgWrap     = G('ig-img-wrap');
    const genTimeEl   = G('ig-gen-time');
    const overlayInfo = G('ig-overlay-info');
    const histSection = G('ig-history');
    const histRow     = G('ig-hist-row');
    const modal       = G('ig-modal');
    const modalReset  = G('ig-modal-reset');
    const toast       = G('ig-toast');
    const toastMsg    = G('ig-toast-msg');
    const enhanceBtn  = G('ig-enhance-btn');
    const negToggle   = G('ig-neg-toggle');
    const negArea     = G('ig-neg-area');
    const negInput    = G('ig-neg-input');

    if (!textarea) return;

    function getActiveGenerator() { return 'poolinations'; }

    refreshQuota();
    renderHistory();

    // Disable download button initially
    const dlMain = G('ig-btn-dl-main');
    if (dlMain) { dlMain.disabled = true; }

    // Hide action buttons initially
    const actRow = G('ig-img-actions-row');
    if (actRow) actRow.classList.remove('show');

    async function refreshQuota() {
      const activeGenerator = getActiveGenerator();
      if (authStatusRef.current === 'loading') {
        state.authenticated = false;
        state.authChecking = true;
        state.quota = {
          used: 0,
          remaining: 0,
          limit: POOLINATION_FREE_LIMIT,
          reset: 'Checking account…',
        };
        state.resetTime = state.quota.reset;
        updateTries();
        return;
      }

      try {
        const res = await fetch('/api/ai-quota?tool=image-generator', { cache: 'no-store' });
        const data = await readJsonSafe(res);

        if (!res.ok) {
          const isAuthError = res.status === 401 || data?.requiresAuth;
          const fallbackLimit = POOLINATION_FREE_LIMIT;
          state.authenticated = isAuthError ? false : isSignedIn();
          state.authChecking = false;
          state.quota = {
            used: 0,
            remaining: isAuthError ? 0 : fallbackLimit,
            limit: fallbackLimit,
            reset: isAuthError ? (data.error || 'Connect your account to start') : (data.error || 'Could not load quota'),
          };
          state.resetTime = state.quota.reset;
          updateTries();
          return;
        }

        state.authenticated = true;
        state.authChecking = false;
        state.quota = data.quota;
        state.resetTime = data.quota.reset;
        updateTries();
      } catch {
        const fallbackLimit = POOLINATION_FREE_LIMIT;
        state.authenticated = isSignedIn();
        state.authChecking = false;
        state.quota = {
          used: 0,
          remaining: isSignedIn() ? fallbackLimit : 0,
          limit: fallbackLimit,
          reset: 'Could not load quota',
        };
        state.resetTime = state.quota.reset;
        updateTries();
      }
    }

    // ─── Textarea ────────────────────────────────────────────────────────────
    textarea.addEventListener('input', () => {
      state.prompt = textarea.value.slice(0,500);
      if (textarea.value.length>500) textarea.value=state.prompt;
      charCount.textContent = `${state.prompt.length}/500`;
      charCount.style.color = state.prompt.length>=460?'#f97316':'';
    });

    // ─── Style / Mood ────────────────────────────────────────────────────────
    styleSel.addEventListener('change', ()=>{ state.style=styleSel.value; });
    moodSel.addEventListener('change',  ()=>{ state.mood=moodSel.value; });
    async function handleSessionChanged(event) {
      const nextStatus = event?.detail?.status || 'unauthenticated';
      if (nextStatus === 'loading') {
        state.authenticated = false;
        state.authChecking = true;
        state.quota = {
          used: 0,
          remaining: 0,
          limit: POOLINATION_FREE_LIMIT,
          reset: 'Checking account…',
        };
        state.resetTime = state.quota.reset;
        updateTries();
        return;
      }

      const authenticated = nextStatus === 'authenticated';
      if (!authenticated) {
        state.authenticated = false;
        state.authChecking = false;
        state.quota = {
          used: 0,
          remaining: 0,
          limit: POOLINATION_FREE_LIMIT,
          reset: 'Connect your account to start',
        };
        state.resetTime = state.quota.reset;
        updateTries();
        return;
      }
      state.authenticated = true;
      state.authChecking = false;
      updateTries();
      await refreshQuota();
    }

    const handleWindowFocus = () => {
      refreshQuota();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) refreshQuota();
    };

    window.addEventListener('ig-session-changed', handleSessionChanged);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── Ratio buttons ───────────────────────────────────────────────────────
    root.querySelectorAll('.ig-ratio-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        root.querySelectorAll('.ig-ratio-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        state.ratio = btn.dataset.ratio;
      });
    });

    // ─── Negative prompt toggle ──────────────────────────────────────────────
    negToggle.addEventListener('click',()=>negArea.classList.toggle('open'));
    negInput.addEventListener('input',()=>{ state.negPrompt=negInput.value; });

    // ─── FAQ accordion ───────────────────────────────────────────────────────
    root.querySelectorAll('.ig-faq-q').forEach(q=>{
      q.addEventListener('click',()=>{
        const item=q.closest('.ig-faq-item'), open=item.classList.contains('open');
        root.querySelectorAll('.ig-faq-item').forEach(i=>i.classList.remove('open'));
        if(!open) item.classList.add('open');
      });
      q.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();} });
    });

    // ─── Modal ───────────────────────────────────────────────────────────────
    const handleModalCancel = () => { modal.style.display='none'; };
    const handleModalBuy10 = () => { modal.style.display='none'; };
    const handleModalBuy40 = () => { modal.style.display='none'; };
    const handleModalBackdrop = e => { if(e.target===modal) modal.style.display='none'; };
    const handleEscapeKey = e => { if(e.key==='Escape') modal.style.display='none'; };

    G('ig-modal-cancel').addEventListener('click', handleModalCancel);
    G('ig-modal-buy10').addEventListener('click', handleModalBuy10);
    G('ig-modal-buy40').addEventListener('click', handleModalBuy40);
    modal.addEventListener('click', handleModalBackdrop);
    document.addEventListener('keydown', handleEscapeKey);


    // ─── Generate button ─────────────────────────────────────────────────────
    genBtn.addEventListener('click',()=>generate());

    // ─── Action buttons ──────────────────────────────────────────────────────
    G('ig-btn-dl').addEventListener('click', downloadImage);
    G('ig-btn-dl-main').addEventListener('click', downloadImage);
    G('ig-btn-regen').addEventListener('click',()=>{ generate(); });
    G('ig-btn-var').addEventListener('click',()=>{ generate(true); });
    G('ig-btn-share').addEventListener('click', shareImage);

    // ─── Enhance prompt ──────────────────────────────────────────────────────
    enhanceBtn.addEventListener('click', enhancePrompt);

    // ─── MAIN GENERATE ───────────────────────────────────────────────────────
    async function generate(isVariation=false) {
      if (!state.prompt.trim()) { showError('Please describe the image you want'); return; }
      if (!state.authenticated) { showError('Connect your account to use Image Generator'); return; }
      if (state.quota.remaining <= 0) {
        showModalFn(); return;
      }

      clearError();
      setLoading(true);
      state.startTime = Date.now();
      startMsgCycle();
      startProgress();

      try {
        const body = {
          prompt: state.prompt.trim(),
          style: state.style,
          ratio: state.ratio,
          mood: state.mood,
          generator: 'poolinations',
          negPrompt: state.negPrompt,
          variation: isVariation,
          variationSeed: isVariation ? Math.floor(Math.random()*9999) : undefined,
        };

        const res = await fetch('/api/generate-image', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(body),
        });

        const data = await readJsonSafe(res);

        if (res.status===401 || data.requiresAuth) {
          state.authenticated = false;
          await refreshQuota();
          throw new Error(data.error || 'Connect your account to use this tool');
        }
        if (res.status===429 || data.error==='rate_limit') {
          if (data.quota) state.quota = data.quota;
          state.resetTime = data.reset || '';
          showModalFn(); return;
        }
        if (res.status===503) {
          alert('Server is busy right now. Please try again in a moment.');
          return;
        }
        if (!res.ok) throw new Error(data.error||'Generation failed');

        const elapsed = ((Date.now()-state.startTime)/1000).toFixed(1);
        state.genTime = elapsed;
        state.currentImg = data.imageBase64;
        state.lastEngine = data.generator || state.generator;
        state.lastModel = data.model || '';

        showImage(data.imageBase64, elapsed);
        if (data.quota) {
          state.quota = data.quota;
          state.resetTime = data.quota.reset;
        }
        updateTries();
        saveHistory({ b64: data.imageBase64, style: state.style, prompt: state.prompt.trim(), ts: Date.now() });
        renderHistory();

      } catch(err) {
        showError(err.message||'Connection failed, please retry');
        showPlaceholder();
      } finally {
        stopMsgCycle(); stopProgress(); setLoading(false);
      }
    }

    // ─── Enhance Prompt ──────────────────────────────────────────────────────
    async function enhancePrompt() {
      if (!state.prompt.trim()) { showError('Enter a basic description first'); return; }
      enhanceBtn.disabled = true;
      enhanceBtn.textContent = '⏳ Enhancing…';

      try {
        const res = await fetch('/api/generate-image', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ enhanceOnly: true, prompt: state.prompt.trim() }),
        });
        const data = await readJsonSafe(res);
        if (data.enhanced) {
          textarea.value = data.enhanced.slice(0,500);
          state.prompt = textarea.value;
          charCount.textContent = `${state.prompt.length}/500`;
          showToast('✨ Prompt enhanced!');
        }
      } catch { showToast('Could not enhance — try again'); }
      finally {
        enhanceBtn.disabled = false;
        enhanceBtn.innerHTML = '💡 Enhance Prompt';
      }
    }

    // ─── Loading helpers ──────────────────────────────────────────────────────
    function setLoading(on) {
      state.loading = on;
      genBtn.disabled = on;
      textarea.disabled = on;
      styleSel.disabled = on;
      moodSel.disabled = on;
      enhanceBtn.disabled = on;
      if (on) {
        state.currentImg = null;
        state.lastEngine = '';
        state.lastModel = '';
        genBtn.innerHTML = '<span class="ig-spin">◌</span><span>Generating…</span>';
        shimmer.classList.add('show');
        placeholder.style.display = 'none';
        outputImg.classList.remove('show');
        outputImg.style.display = 'none';
        outputImg.src = '';
        imgActions.classList.remove('show');
        const dlMain = G('ig-btn-dl-main');
        if (dlMain) dlMain.disabled = true;
        histRow?.querySelectorAll('.ig-thumb').forEach(t=>t.classList.remove('active'));
      } else {
        genBtn.innerHTML = '<span>🎨</span><span>Generate Image</span>';
        shimmer.classList.remove('show');
        progressFill.style.width='0%';
        textarea.disabled = false;
        styleSel.disabled = false;
        moodSel.disabled = false;
      }
    }

    function startMsgCycle() {
      state.msgIdx=0;
      if(shimmerTxt) shimmerTxt.textContent=LOAD_MSGS[0];
      if(shimmerWait) shimmerWait.textContent = 'This may take 20–30 seconds…'; // ← ye add karo
      state.msgTimer = setInterval(()=>{
        state.msgIdx=(state.msgIdx+1)%LOAD_MSGS.length;
        if(shimmerTxt) shimmerTxt.textContent=LOAD_MSGS[state.msgIdx];
      },2000);
    }
    function stopMsgCycle() { if(state.msgTimer){clearInterval(state.msgTimer);state.msgTimer=null;} }

    function startProgress() {
      state.progressVal=0;
      const target=90;
      state.progressTimer = setInterval(()=>{
        if(state.progressVal<target){
          state.progressVal = Math.min(target, state.progressVal + (target-state.progressVal)*0.06 + 0.3);
          if(progressFill) progressFill.style.width=state.progressVal+'%';
        }
      },500);
    }
    function stopProgress() {
      if(state.progressTimer){clearInterval(state.progressTimer);state.progressTimer=null;}
      if(progressFill) progressFill.style.width='100%';
    }

    function showPlaceholder() {
      placeholder.style.display=''; outputImg.classList.remove('show'); outputImg.style.display='none'; imgActions.classList.remove('show');
      const actRow = G('ig-img-actions-row');
      if (actRow) actRow.classList.remove('show');
    }

    function showImage(b64, elapsed) {
      shimmer.classList.remove('show');
      placeholder.style.display='none';
      outputImg.src = `data:image/png;base64,${b64}`;
      outputImg.style.display='block';
      requestAnimationFrame(()=>requestAnimationFrame(()=>outputImg.classList.add('show')));
      imgActions.classList.add('show');
      const dlMain = G('ig-btn-dl-main');
      if (dlMain) { dlMain.disabled = false; }
      const actRow = G('ig-img-actions-row');
      if (actRow) actRow.classList.add('show');
      if(genTimeEl) genTimeEl.textContent=`${elapsed}s`;
      if(overlayInfo) {
        overlayInfo.innerHTML=`<span>AI Poolination</span><span>Style: ${state.style}</span><span>${elapsed}s</span><span title="${escHtml(state.prompt)}">${state.prompt.slice(0,40)}${state.prompt.length>40?'…':''}</span>`;
        
      }
    }

    // ─── Tries ───────────────────────────────────────────────────────────────
    function updateTries() {
      const { used, remaining: rem, limit, reset } = state.quota;
      triesBadge.className='ig-tries';
      if (state.authChecking) {
        triesBadge.textContent='⏳ Checking account…';
        genBtn.disabled = true;
      } else if (rem === null) {
        triesBadge.textContent='Loading quota...';
        genBtn.disabled = state.loading;
      } else if (!state.authenticated) {
        triesBadge.textContent='🔐 Connect your account to use Image Generator';
        genBtn.disabled = true;
      } else if (rem <= 0) {
        triesBadge.className += ' red';
        triesBadge.textContent = `🔴 AI Poolination limit reached · resets in ${reset}`;
        genBtn.disabled = false;
      } else if (rem === 1) {
        triesBadge.className += ' yellow';
        triesBadge.textContent = `⚠️ AI Poolination: ${rem}/${limit} remaining today`;
        genBtn.disabled = false;
      } else {
        triesBadge.className += ' green';
        triesBadge.textContent = `✅ AI Poolination: ${rem}/${limit} remaining today`;
        genBtn.disabled = false;
      }
      if (usageGrid) {
        usageGrid.innerHTML = `
          <div class="ig-usage-stat"><div class="ig-usage-k">Used Today</div><div class="ig-usage-v">${state.authenticated ? used : '-'}</div></div>
          <div class="ig-usage-stat"><div class="ig-usage-k">Remaining</div><div class="ig-usage-v">${rem}</div></div>
          <div class="ig-usage-stat"><div class="ig-usage-k">Total Daily</div><div class="ig-usage-v">${limit}</div></div>
        `;
      }
    }

    // ─── Image History ────────────────────────────────────────────────────────
    function renderHistory() {
      const h=getHistory();
      if(!h.length){histSection.classList.remove('show');return;}
      histSection.classList.add('show');
      histRow.innerHTML=h.map((item,i)=>`<img class="ig-thumb${i===0?' active':''}" src="data:image/png;base64,${item.b64}" data-i="${i}" alt="History ${i+1}" loading="lazy"/>`).join('');
      histRow.querySelectorAll('.ig-thumb').forEach(th=>{
        th.addEventListener('click',()=>{
          const item=h[parseInt(th.dataset.i)];
          showImage(item.b64,'–');
          state.currentImg=item.b64;
          state.style=item.style;
          textarea.value=item.prompt;
          state.prompt=item.prompt;
          charCount.textContent=`${item.prompt.length}/500`;
          histRow.querySelectorAll('.ig-thumb').forEach(t=>t.classList.remove('active'));
          th.classList.add('active');
        });
      });
    }

    // ─── Download ─────────────────────────────────────────────────────────────
    function downloadImage() {
      if(!state.currentImg){showToast('No image to download');return;}
      try {
        const a=document.createElement('a');
        a.href=`data:image/png;base64,${state.currentImg}`;
        a.download=`ai-image-${Date.now()}.png`;
        a.style.display='none';
        document.body.appendChild(a);
        a.click();
        setTimeout(()=>document.body.removeChild(a), 200);
        showToast('✓ Download started!');
      } catch(e) {
        showToast('⚠ Download failed, try right-clicking the image');
      }
    }

    function shareImage() {
      if(!state.currentImg){showToast('Generate an image first');return;}
      const text=`AI Generated: ${state.prompt.slice(0,80)}`;
      if(navigator.share){ navigator.share({title:'AI Image',text}).catch(()=>{}); }
      else { navigator.clipboard.writeText(text).then(()=>showToast('✓ Prompt copied!')).catch(()=>showToast('Copy failed')); }
    }

    // ─── Modal ────────────────────────────────────────────────────────────────
    async function purchaseExtra(amount) {
      try {
        const res = await fetch('/api/use-quota', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: 'image-generator' }),
        });
        const data = await readJsonSafe(res);
        if (!res.ok) throw new Error(data.error || 'Purchase failed');
        state.authenticated = true;
        state.quota = data.quota;
        state.resetTime = data.quota.reset;
        updateTries();
        showToast(`Premium unlocked: +${amount} images added`);
        modal.style.display='none';
      } catch (err) {
        showToast(err.message || 'Purchase failed');
      }
    }

    function showModalFn() {
      const titleEl = G('ig-modal-title');
      const messageEl = G('ig-modal-text');
      if (titleEl) titleEl.textContent = 'Daily Limit Reached';
      if (messageEl) messageEl.textContent = `You have used all ${POOLINATION_FREE_LIMIT} free uses for today. Come back tomorrow for more!`;
      if (modalReset) modalReset.textContent = state.resetTime ? `Resets ${state.resetTime}` : '';
      modal.style.display='flex';
    }

    // ─── Error / Toast ────────────────────────────────────────────────────────
    function showError(msg) { errorBox.innerHTML=`<span>⚠</span><span>${msg}</span>`; errorBox.style.display='flex'; textarea.classList.add('err'); }
    function clearError() { errorBox.style.display='none'; textarea.classList.remove('err'); }
    let toastTimer=null;
    function showToast(msg) {
      toastMsg.textContent=msg; toast.classList.add('show');
      if(toastTimer) clearTimeout(toastTimer);
      toastTimer=setTimeout(()=>toast.classList.remove('show'),2500);
    }
    function escHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    return () => {
      window.removeEventListener('ig-session-changed', handleSessionChanged);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      G('ig-modal-cancel')?.removeEventListener('click', handleModalCancel);
      G('ig-modal-buy10')?.removeEventListener('click', handleModalBuy10);
      G('ig-modal-buy40')?.removeEventListener('click', handleModalBuy40);
      modal?.removeEventListener('click', handleModalBackdrop);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('ig-session-changed', {
      detail: { status },
    }));
  }, [status]);

  return (
    <div id="ig-root" className="ig-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <button
        onClick={() => window.history.back()}
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100, display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.45rem 1rem', borderRadius: '99px', border: '1px solid var(--border-hi)', background: 'rgba(7,7,15,0.8)', backdropFilter: 'blur(12px)', color: 'var(--text-dim)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .18s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
      >
        ← Back
      </button>
      <div id="ig-auth-wrap" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100, maxWidth: 'calc(100vw - 7.5rem)', display: 'flex', justifyContent: 'flex-end' }}><GoogleAuthButton compact /></div>

      {/* ── HERO ── */}
      <section className="ig-hero">
        <div className="ig-hero-grid" aria-hidden="true" />
        <div className="ig-hero-glow" aria-hidden="true" />
        <div className="ig-hero-glow2" aria-hidden="true" />
        <div className="ig-hero-content">
          <div className="ig-badge">Image Engine Active</div>
          <h1>Turn Your Ideas<br /><span className="grad">Into Stunning Art.</span></h1>
          <p className="ig-hero-sub">Describe anything — the image engine renders it in seconds. Realistic photos, anime, oil paintings, cinematic scenes and more.</p>
          <div className="ig-hero-actions">
            <a href="#ig-generator" className="ig-btn-primary"><span>🎨 Start Creating</span></a>
            <a href="#ig-features" className="ig-btn-ghost"><span>See Features ↓</span></a>
          </div>
          <div className="ig-hero-stats">
            <div className="ig-stat"><div className="ig-stat-num">10</div><div className="ig-stat-label">Art Styles</div></div>
            <div className="ig-stat"><div className="ig-stat-num">4</div><div className="ig-stat-label">Aspect Ratios</div></div>
            <div className="ig-stat"><div className="ig-stat-num">6</div><div className="ig-stat-label">Free / Day</div></div>
          </div>
        </div>
      </section>

      {/* ── GENERATOR ── */}
      <section className="ig-section ig-gen" id="ig-generator">
        <div className="ig-section-inner">
          <div className="ig-gen-header">
            <div className="ig-label">🎨 Live Generator</div>
            <h2 className="ig-title">Generate Your Image</h2>
            <p className="ig-sub">Describe what you want, pick a style — the image engine renders it in seconds.</p>
          </div>

          <div className="ig-gen-layout">
            {/* Controls */}
            <div className="ig-card">
              {/* Prompt */}
              <div>
                <label className="ig-ctrl-label" htmlFor="ig-prompt">Image Description</label>
                <textarea id="ig-prompt" className="ig-textarea" placeholder="Describe the image you want…" maxLength={500} rows={4} />
                <div className="ig-char-row">
                  <span className="ig-char-count" id="ig-charcount">0/500</span>
                  <button className="ig-enhance-btn" id="ig-enhance-btn">💡 Enhance Prompt</button>
                </div>
              </div>

              {/* Style + Mood */}
              <div>
                <label className="ig-ctrl-label">Style &amp; Mood</label>
                <div className="ig-selects-row">
                  <select id="ig-style" className="ig-select">
                    {STYLES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                  <select id="ig-mood" className="ig-select">
                    {MOODS.map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="ig-ctrl-label">Aspect Ratio</label>
                <div className="ig-ratio-row">
                  {RATIOS.map(r=>(
                    <button key={r.id} className={`ig-ratio-btn${r.id==='1:1'?' active':''}`} data-ratio={r.id}>
                      <span className="ratio-icon">{r.icon}</span>
                      <span>{r.label}</span>
                      <span style={{fontSize:'0.6rem',opacity:0.6}}>{r.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Negative Prompt */}
              <div>
                <div className="ig-neg-toggle" id="ig-neg-toggle">
                  <span>▸</span><span>Negative Prompt (optional)</span>
                </div>
                <div className="ig-neg-area" id="ig-neg-area">
                  <input id="ig-neg-input" className="ig-neg-input" type="text" placeholder="What to avoid: no blurry, no text, no watermark…" />
                </div>
              </div>

              {/* Error */}
              <div id="ig-error" className="ig-error-box" style={{display:'none'}} />

              {/* Tries */}
              <div id="ig-tries" className="ig-tries">⏳ Checking account…</div>
              <div id="ig-usage" className="ig-usage-grid" aria-live="polite">
                <div className="ig-usage-stat"><div className="ig-usage-k">Used Today</div><div className="ig-usage-v">-</div></div>
                <div className="ig-usage-stat"><div className="ig-usage-k">Remaining</div><div className="ig-usage-v">-</div></div>
                <div className="ig-usage-stat"><div className="ig-usage-k">Total Daily</div><div className="ig-usage-v">-</div></div>
              </div>

              {/* Generate */}
              <button id="ig-genbtn" className="ig-btn-gen">
                <span>🎨</span><span>Generate Image</span>
              </button>
            </div>

            {/* Preview Panel */}
            <div className="ig-preview">
              <div className="ig-preview-header">
                <div className="ig-live-badge">
                  <span className="ig-live-dot" />
                  LIVE CANVAS
                </div>
                <div className="ig-gen-time" id="ig-gen-time">—</div>
              </div>

              <div className="ig-img-wrap" id="ig-img-wrap">
                <div className="ig-dot-bg" aria-hidden="true" />

                {/* Placeholder */}
                <div id="ig-placeholder" className="ig-placeholder">
                  <div className="ig-placeholder-icon">🖼️</div>
                  <div className="ig-placeholder-text">Your image will appear here</div>
                </div>

                {/* Shimmer loader */}
                <div id="ig-shimmer" className="ig-shimmer">
                  <div className="ig-shimmer-bg" />
                  <div id="ig-shimmer-txt" className="ig-shimmer-text">🎨 Starting generation…</div>
                  <div className="ig-progress-bar">
                    <div className="ig-progress-fill" id="ig-progress-fill" />
                  </div>
                  <div id="ig-shimmer-wait" className="ig-wait-msg" />
                </div>

                {/* Output image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="ig-output-img" className="ig-output-img" alt="AI Generated" />

                {/* Hover overlay */}
                <div className="ig-img-overlay">
                  <div className="ig-overlay-info" id="ig-overlay-info" />
                </div>
              </div>

              {/* Action buttons */}
              <div id="ig-img-actions" className="ig-img-actions">
                <button id="ig-btn-dl-main" className="ig-btn-dl-main">⬇ Download PNG</button>
              </div>
              <div id="ig-img-actions-row" className="ig-img-actions" style={{marginTop:'0.5rem'}}>
                <button id="ig-btn-dl" className="ig-act-btn ig-act-dl">💾 Save</button>
                <button id="ig-btn-regen" className="ig-act-btn ig-act-regen">🔄 Regenerate</button>
                <button id="ig-btn-var" className="ig-act-btn ig-act-var">🎲 Variation</button>
                <button id="ig-btn-share" className="ig-act-btn ig-act-share">↗ Share</button>
              </div>

              {/* History */}
              <div id="ig-history" className="ig-history">
                <div className="ig-history-label">Recent Generations</div>
                <div id="ig-hist-row" className="ig-history-row" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="ig-section" id="ig-features">
        <div className="ig-section-inner">
          <div className="ig-label">✦ Why Choose Us</div>
          <h2 className="ig-title">Built for Creators</h2>
          <p className="ig-sub">Everything you need to generate stunning visuals — fast, free, and private.</p>
          <div className="ig-features-grid">
            {[
              { icon:'🤖', title:'Pollinations Powered', desc:'Images are generated using Pollinations AI — a free, open image engine that creates high-quality visuals from your text descriptions.' },
              { icon:'🎨', title:'10 Art Styles',        desc:'From photorealistic renders to anime, oil paintings, watercolors, sketches and cinematic shots — one tool covers all.' },
              { icon:'💡', title:'Prompt Enhancer',      desc:'Type a basic idea and let AI expand it into a detailed, optimized prompt for dramatically better results.' },
              { icon:'📐', title:'4 Aspect Ratios',      desc:'Square, landscape, portrait, and standard — optimized for Instagram, YouTube, TikTok, and desktop wallpapers.' },
              { icon:'⬇', title:'Instant Download',     desc:'Download your generated image as a high-quality PNG instantly with one click. No watermarks, ever.' },
              { icon:'🔒', title:'Private by Default', desc:'Your prompts are never stored on our servers. Generated images are saved only in your browser locally for history.' },
            ].map((f,i)=>(
              <article className="ig-feat-card" key={i}>
                <div className="ig-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ig-section ig-section-alt" id="ig-how">
        <div className="ig-section-inner">
          <div className="ig-label">◎ Process</div>
          <h2 className="ig-title">How It Works</h2>
          <p className="ig-sub">From idea to image in under 30 seconds.</p>
          <div className="ig-hiw-steps">
            {[
              { n:'01', icon:'✍️', title:'Write Your Idea',    desc:'Describe the image you want — be as specific or as simple as you like.' },
              { n:'02', icon:'🎨', title:'Choose a Style',     desc:'Pick from 10 art styles and set the mood, aspect ratio, and what to avoid.' },
              { n:'03', icon:'🤖', title:'Engine Renders It',   desc:'The image engine processes your prompt and generates a high-quality image in seconds.' },
              { n:'04', icon:'⬇', title:'Download & Share',   desc:'Download your image as PNG, regenerate variations, or share directly.' },
            ].map((s,i)=>(
              <div className="ig-step" key={i}>
                <div className="ig-step-num">{s.n}</div>
                <div className="ig-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="ig-section" id="ig-cases">
        <div className="ig-section-inner">
          <div className="ig-label">◻ Applications</div>
          <h2 className="ig-title">Who Uses This</h2>
          <p className="ig-sub">From social media to product design — AI images for every use case.</p>
          <div className="ig-cases-grid">
            {[
              { tag:'ig-tag-b', label:'Social Media',  title:'Content Creation',    desc:'Generate eye-catching thumbnails, post backgrounds, and story visuals for Instagram, YouTube, and TikTok.' },
              { tag:'ig-tag-p', label:'Design',        title:'Concept Art & Mockups',desc:'Create concept art, mood boards, and visual mockups for presentations and client pitches in minutes.' },
              { tag:'ig-tag-g', label:'Marketing',     title:'Ad Creative',         desc:'Generate unique product visuals, banner art, and campaign imagery without expensive photoshoots.' },
              { tag:'ig-tag-b', label:'Developers',    title:'Placeholder & UI Art', desc:'Generate placeholder images, icons, and UI illustrations for prototypes and development projects.' },
              { tag:'ig-tag-p', label:'Education',     title:'Visual Learning',      desc:'Create diagrams, illustrations, and visual aids to explain complex topics clearly and memorably.' },
              { tag:'ig-tag-g', label:'Personal',      title:'Wallpapers & Prints',  desc:'Generate personal wallpapers, phone backgrounds, and printable art from your own imagination.' },
            ].map((c,i)=>(
              <article className="ig-case-card" key={i}>
                <div className={`ig-case-tag ${c.tag}`}>{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ig-section ig-section-alt" id="ig-faq">
        <div className="ig-section-inner">
          <div style={{textAlign:'center'}}>
            <div className="ig-label">❓ Questions</div>
            <h2 className="ig-title">Frequently Asked</h2>
            <p className="ig-sub" style={{margin:'0 auto'}}>Everything about the AI Image Generator.</p>
          </div>
          <div className="ig-faq-list">
            {[
              { q:'How many free images do I get?',              a:`AI Poolination gives ${POOLINATION_FREE_LIMIT} free images per day. After that, Premium packs are 10 images for Rs ${EXTRA_PACKAGES[10]} or 40 images for Rs ${EXTRA_PACKAGES[40]}.` },
              { q:'What generates the images?',                  a:'We use a powerful image generation engine that creates high-quality, detailed images with strong prompt adherence.' },
              { q:'Can I use generated images commercially?',    a:'Images generated are yours to use. However, verify compliance with the service terms for commercial usage in your specific case.' },
              { q:'What\'s the difference between styles?',      a:'Each style changes the visual rendering: Realistic gives photographic results, Digital Art gives illustrated looks, Cinematic adds film-like lighting and composition, etc.' },
              { q:'What does the Prompt Enhancer do?',           a:'It takes your basic description and uses AI to add artistic details, lighting descriptions, composition notes, and quality modifiers — resulting in significantly better images.' },
              { q:'Are my prompts and images stored?',           a:'No. Prompts are sent to the API for generation only and not stored on our servers. Generated images are stored temporarily in your browser\'s localStorage and never uploaded anywhere.' },
            ].map((f,i)=>(
              <div className="ig-faq-item" key={i}>
                <div className="ig-faq-q" role="button" tabIndex={0} aria-expanded="false">
                  {f.q}<span className="ig-faq-arrow">⌄</span>
                </div>
                <div className="ig-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ig-footer">
        <div className="ig-footer-inner">
          <div className="ig-footer-logo">
            <div className="ig-footer-logo-icon">🎨</div>
            AI Image Generator
          </div>
          <p className="ig-footer-sub">Turn your ideas into art. Powered by our image engine.</p>
          <ul className="ig-footer-links">
            <li><a href="#ig-generator">Generator</a></li>
            <li><a href="#ig-features">Features</a></li>
            <li><a href="#ig-cases">Use Cases</a></li>
            <li><a href="#ig-faq">FAQ</a></li>
          </ul>
          <p className="ig-footer-copy">Daily free credits · No tracking · Images never stored</p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <div id="ig-modal" className="ig-modal-bg" style={{display:'none'}}>
        <div className="ig-modal" onClick={e=>e.stopPropagation()}>
          <div className="ig-modal-icon">🔒</div>
          <h3 id="ig-modal-title">Daily Limit Reached</h3>
          <p id="ig-modal-text">You have used all 6 free images for today.</p>
          <p className="ig-modal-reset">Resets daily at 5:30 AM IST (midnight UTC)</p>
          <div className="ig-modal-btns">
            <button id="ig-modal-cancel" className="ig-modal-upgrade">Got it, come back tomorrow</button>
            <button id="ig-modal-buy10" style={{display:'none'}} />
            <button id="ig-modal-buy40" style={{display:'none'}} />
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      <div id="ig-toast" className="ig-toast">
        <span className="ig-toast-icon">✓</span>
        <span id="ig-toast-msg">Done!</span>
      </div>
    </div>
  );
}
