'use client';
import { useEffect } from 'react';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.ht-root *, .ht-root *::before, .ht-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ht-root {
  cursor: auto !important;
  --bg: #0f0808; --bg2: #150d0d; --bg3: #1a1010; --card: #160c0c;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.11);
  --text: #e8e8f0; --text-muted: #6b6b85; --text-dim: #9090aa;
  --accent: #FF6B6B; --accent2: #FF8E8E;
  --accent-dim: rgba(255,107,107,0.12); --accent-dim2: rgba(255,107,107,0.06);
  --accent-glow: rgba(255,107,107,0.25);
  --hi: #ff7eb3; --hi-dim: rgba(255,126,179,0.12);
  --med: #60a5fa; --med-dim: rgba(96,165,250,0.12);
  --niche: #34d399; --niche-dim: rgba(52,211,153,0.12);
  --error: #ff6b7a;
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


.ht-root.light {
  --bg: #fff5f5; --bg2: #ffe8e8; --bg3: #fdd; --card: #ffffff;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.13);
  --text: #1a0808; --text-muted: #8a5050; --text-dim: #5a3030;
  --accent: #e53e3e; --accent2: #fc8181;
  --accent-dim: rgba(229,62,62,0.1); --accent-dim2: rgba(229,62,62,0.05);
  --accent-glow: rgba(229,62,62,0.2);
  --hi: #e53e3e; --hi-dim: rgba(229,62,62,0.1);
  --med: #2563eb; --med-dim: rgba(37,99,235,0.1);
  --niche: #059669; --niche-dim: rgba(5,150,105,0.1);
  --error: #c53030;
  --shadow: 0 4px 24px rgba(0,0,0,0.07); --shadow-lg: 0 12px 48px rgba(0,0,0,0.13);
}
.ht-root.light .ht-nav { background: rgba(255,245,245,0.82); }
.ht-root.light .ht-select option { background: #fff; color: #1a0808; }
.ht-root.light .ht-tries.green { color: #059669; border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.06); }
.ht-root.light .ht-tries.yellow { color: #b45309; border-color: rgba(180,83,9,0.25); background: rgba(180,83,9,0.06); }
.ht-root.light .ht-tries.red { color: #c53030; border-color: rgba(197,48,48,0.25); background: rgba(197,48,48,0.06); }
.ht-root.light .ht-chip.hi { background: rgba(229,62,62,0.1); color: #c53030; border-color: rgba(229,62,62,0.25); }
.ht-root.light .ht-chip.med { background: rgba(37,99,235,0.1); color: #1d4ed8; border-color: rgba(37,99,235,0.25); }
.ht-root.light .ht-chip.ni { background: rgba(5,150,105,0.1); color: #047857; border-color: rgba(5,150,105,0.25); }

.ht-theme-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--tr); font-size: 1rem; flex-shrink: 0; }
.ht-theme-btn:hover { border-color: var(--accent); color: var(--accent); }
.ht-root a { color: inherit; text-decoration: none; }
.ht-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.ht-root ::selection { background: var(--accent-dim); color: var(--accent); }
.ht-root ::-webkit-scrollbar { width: 5px; }
.ht-root ::-webkit-scrollbar-track { background: var(--bg); }
.ht-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* ── NAV ── */
.ht-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 62px;
  background: rgba(10,8,8,0.75);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid var(--border);
}
.ht-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.ht-logo-tag { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; padding: 0.1em 0.4em; border-radius: 5px; font-size: 0.88em; line-height: 1.3; }
.ht-logo-text { color: var(--text-dim); font-size: 0.88rem; font-weight: 600; }
.ht-nav-right { display: flex; align-items: center; gap: 1rem; }
.ht-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.ht-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--tr); }
.ht-nav-links a:hover { color: var(--text); }
.ht-nav-cta { padding: 0.45rem 1.1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-size: 0.85rem; font-weight: 600; transition: all var(--tr); white-space: nowrap; }
.ht-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

/* ── HERO ── */
.ht-hero {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 6rem 1.5rem 4rem;
  position: relative; overflow: hidden;
}
.ht-hero-grid {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.ht-hero-glow { position: absolute; top: 45%; left: 50%; transform: translate(-50%,-60%); width: 700px; height: 600px; background: radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.ht-hero-glow2 { position: absolute; top: 65%; left: 25%; width: 400px; height: 350px; background: radial-gradient(circle, rgba(255,142,142,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.ht-hero-content { position: relative; z-index: 1; max-width: 820px; }
.ht-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.35rem 0.9rem; background: var(--accent-dim);
  border: 1px solid rgba(255,107,107,0.25); border-radius: 99px;
  font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500;
  color: var(--accent); letter-spacing: 0.05em; margin-bottom: 2rem;
  animation: htFadeUp 0.6s ease both;
}
.ht-badge::before { content:''; width:6px; height:6px; border-radius:50%; background: var(--accent); animation: htPulse 2s ease-in-out infinite; }
@keyframes htPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
.ht-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem,7vw,5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: htFadeUp 0.7s 0.1s ease both; }
.ht-hero h1 .grad { background: linear-gradient(135deg, var(--accent), var(--accent2), #ffb3b3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.ht-hero-sub { font-size: clamp(1rem,2.5vw,1.2rem); color: var(--text-dim); max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; animation: htFadeUp 0.7s 0.2s ease both; }
.ht-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: htFadeUp 0.7s 0.3s ease both; }
.ht-btn-primary { padding: 0.75rem 1.8rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px var(--accent-glow); }
.ht-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 45px var(--accent-glow); opacity: 0.9; }
.ht-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.ht-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.ht-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: htFadeUp 0.7s 0.4s ease both; }
.ht-stat { text-align: center; }
.ht-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; }
.ht-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
@keyframes htFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* ── SECTIONS ── */
.ht-section { padding: 6rem 1.5rem; }
.ht-section-inner { max-width: 1100px; margin: 0 auto; }
.ht-section-alt { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.ht-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.ht-title { font-family: var(--font-head); font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.ht-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }

/* ── GENERATOR SECTION ── */
.ht-gen { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.ht-gen-header { text-align: center; margin-bottom: 3rem; }
.ht-gen-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
@media(max-width:860px) { .ht-gen-layout { grid-template-columns: 1fr; } }

/* Controls card */
.ht-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 1.4rem; }
.ht-ctrl-label { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--text-dim); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.5rem; }
.ht-textarea { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); resize: vertical; min-height: 88px; outline: none; transition: border-color var(--tr); }
.ht-textarea:focus { border-color: var(--accent); }
.ht-textarea::placeholder { color: var(--text-muted); }
.ht-textarea.err { border-color: var(--error); }
.ht-char-count { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-align: right; margin-top: 0.3rem; }
.ht-selects { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.ht-select { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; outline: none; transition: border-color var(--tr); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b6b85' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.7rem center; background-size: 0.9rem; padding-right: 2.2rem; }
.ht-select:focus { border-color: var(--accent); }
.ht-select option { background: #0e0e1a; }
.ht-count-row { display: flex; gap: 0.5rem; }
.ht-count-btn { flex: 1; padding: 0.55rem 0; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600; color: var(--text-dim); transition: all var(--tr); }
.ht-count-btn:hover { border-color: var(--accent); color: var(--accent); }
.ht-count-btn.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }
.ht-tries {
  text-align: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; padding: 0.6rem 0.9rem;
  border-radius: var(--radius-xs); background: var(--bg2); border: 1px solid var(--border);
}
.ht-tries.green { color: #34d399; border-color: rgba(52,211,153,0.2); background: rgba(52,211,153,0.05); }
.ht-tries.yellow { color: #fbbf24; border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.05); }
.ht-tries.red { color: var(--error); border-color: rgba(255,107,122,0.2); background: rgba(255,107,122,0.05); }
.ht-usage-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:0.55rem; }
.ht-usage-stat { background: var(--bg2); border:1px solid var(--border); border-radius: var(--radius-xs); padding:0.65rem 0.75rem; }
.ht-usage-k { font-family: var(--font-mono); font-size:0.64rem; letter-spacing:0.08em; text-transform:uppercase; color: var(--text-muted); }
.ht-usage-v { margin-top:0.25rem; font-family: var(--font-head); font-size:1rem; font-weight:700; letter-spacing:-0.03em; color: var(--text); }
.ht-btn-gen {
  width: 100%; padding: 0.9rem 1rem;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.95rem;
  transition: all var(--tr); display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  box-shadow: 0 4px 20px var(--accent-glow);
}
.ht-btn-gen:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 6px 28px var(--accent-glow); }
.ht-btn-gen:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.ht-btn-regen { margin-top: -0.6rem; padding: 0.6rem 1rem; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-dim); font-size: 0.85rem; font-weight: 500; transition: all var(--tr); display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.ht-btn-regen:hover { border-color: var(--accent); color: var(--accent); }
.ht-history-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; }
.ht-history-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
.ht-history-chip { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.75rem; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-dim); cursor: pointer; transition: all var(--tr); max-width: 160px; overflow: hidden; }
.ht-history-chip:hover { border-color: var(--accent); color: var(--accent); }
.ht-history-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ht-error-msg { display: flex; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(255,107,122,0.08); border: 1px solid rgba(255,107,122,0.2); border-radius: var(--radius-xs); font-size: 0.83rem; color: #fca5a5; }

/* Preview / Results panel */
.ht-preview-panel { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; min-height: 460px; display: flex; flex-direction: column; box-shadow: var(--shadow); }
.ht-preview-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.ht-live-indicator { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; }
.ht-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: htLive 1.5s ease-in-out infinite; }
@keyframes htLive { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,0.5)} 50%{box-shadow:0 0 0 5px rgba(255,107,107,0)} }
.ht-preview-badge { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); padding: 0.22rem 0.6rem; border: 1px solid var(--border); border-radius: 99px; letter-spacing: 0.05em; }
.ht-preview-body { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; min-height: 300px; position: relative; overflow: hidden; }
.ht-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--border-hi) 1px, transparent 1px); background-size: 18px 18px; opacity: 0.5; pointer-events: none; }

/* Placeholder */
.ht-placeholder { text-align: center; position: relative; z-index: 1; }
.ht-placeholder-icon { font-size: 2.8rem; opacity: 0.18; margin-bottom: 0.75rem; animation: htFloat 3s ease-in-out infinite; }
@keyframes htFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.ht-placeholder-text { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }

/* Skeleton */
.ht-skeleton { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1.25rem; width: 100%; }
.ht-skel-label { height: 14px; width: 100px; background: rgba(255,255,255,0.07); border-radius: 99px; animation: htShimmer 1.5s ease-in-out infinite; }
.ht-skel-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.ht-skel-tag { height: 32px; background: rgba(255,255,255,0.06); border-radius: 99px; animation: htShimmer 1.5s ease-in-out infinite; }
@keyframes htShimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
.ht-loading-msg { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); text-align: center; margin-bottom: 1rem; opacity: 0.8; }

/* Results */
.ht-results { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1.25rem; animation: htFadeUp 0.4s ease both; }
.ht-group-label { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; margin-bottom: 0.6rem; }
.ht-group-count { font-size: 0.68rem; background: rgba(255,255,255,0.06); padding: 0.15rem 0.5rem; border-radius: 99px; color: var(--text-muted); }
.ht-tags-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.ht-chip { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all var(--tr); border: 1px solid transparent; user-select: none; }
.ht-chip:active { transform: scale(0.94); }
.ht-chip.hi { background: rgba(255,126,179,0.1); color: #fda4c8; border-color: rgba(255,126,179,0.2); }
.ht-chip.hi:hover { background: rgba(255,126,179,0.18); border-color: rgba(255,126,179,0.4); }
.ht-chip.med { background: rgba(96,165,250,0.1); color: #93c5fd; border-color: rgba(96,165,250,0.2); }
.ht-chip.med:hover { background: rgba(96,165,250,0.18); border-color: rgba(96,165,250,0.4); }
.ht-chip.ni { background: rgba(52,211,153,0.1); color: #6ee7b7; border-color: rgba(52,211,153,0.2); }
.ht-chip.ni:hover { background: rgba(52,211,153,0.18); border-color: rgba(52,211,153,0.4); }
.ht-chip.done { opacity: 0.7; }
.ht-divider { border: none; border-top: 1px solid var(--border); }
.ht-results-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.ht-char-info { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
.ht-char-warn { color: #fbbf24; }
.ht-copy-all {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.25rem; background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.85rem;
  transition: all var(--tr);
}
.ht-copy-all:hover { opacity: 0.85; transform: translateY(-1px); }

/* ── FEATURES ── */
.ht-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.ht-feat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--tr); position: relative; overflow: hidden; }
.ht-feat-card::before { content:''; position:absolute; inset:0; background: var(--accent-dim2); opacity:0; transition: opacity var(--tr); }
.ht-feat-card:hover::before { opacity:1; }
.ht-feat-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.ht-feat-icon { width:44px; height:44px; background: var(--accent-dim); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:1.1rem; }
.ht-feat-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.ht-feat-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* ── HOW IT WORKS ── */
.ht-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.ht-hiw-steps::before { content:''; position:absolute; top:2.4rem; left:10%; right:10%; height:1px; background: linear-gradient(90deg, transparent, var(--border-hi), transparent); }
.ht-step { text-align: center; }
.ht-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--accent); opacity: 0.13; line-height: 1; margin-bottom: 0.75rem; }
.ht-step-icon { width:52px; height:52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin: 0 auto 1rem; }
.ht-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.ht-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* ── USE CASES ── */
.ht-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.ht-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--tr); }
.ht-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.ht-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.65rem; border-radius: 99px; margin-bottom: 0.9rem; }
.ht-tag-v { background: var(--accent-dim); color: var(--accent); }
.ht-tag-p { background: var(--hi-dim); color: var(--hi); }
.ht-tag-b { background: var(--med-dim); color: var(--med); }
.ht-case-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.ht-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* ── FAQ ── */
.ht-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.ht-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--tr); }
.ht-faq-item.open { border-color: var(--border-hi); }
.ht-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--tr); gap: 1rem; }
.ht-faq-q:hover { color: var(--accent); }
.ht-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.ht-faq-item.open .ht-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.ht-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.75; }
.ht-faq-item.open .ht-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

/* ── FOOTER ── */
.ht-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.ht-footer-inner { max-width: 1100px; margin: 0 auto; }
.ht-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.ht-footer-logo .logo-tag { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; padding: 0.05em 0.35em; border-radius: 5px; }
.ht-footer-sub { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; }
.ht-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; list-style: none; }
.ht-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--tr); }
.ht-footer-links a:hover { color: var(--accent); }
.ht-footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }

/* ── MODAL ── */
.ht-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.72); backdrop-filter: blur(6px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1.5rem; animation: htFadeIn 0.2s ease; }
@keyframes htFadeIn { from{opacity:0} to{opacity:1} }
.ht-modal { background: var(--card); border: 1px solid var(--border-hi); border-radius: var(--radius); padding: 2.25rem; max-width: 380px; width: 100%; text-align: center; box-shadow: var(--shadow-lg); animation: htSlideUp 0.25s ease; }
@keyframes htSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.ht-modal-icon { width:64px; height:64px; background: var(--accent-dim); border: 1px solid rgba(255,107,107,0.25); border-radius: 16px; display:flex; align-items:center; justify-content:center; margin: 0 auto 1.25rem; font-size: 1.8rem; }
.ht-modal h3 { font-family: var(--font-head); font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; }
.ht-modal p { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 0.35rem; }
.ht-modal-reset { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.75rem; }
.ht-modal-btns { display: flex; flex-direction: column; gap: 0.75rem; }
.ht-modal-upgrade { padding: 0.85rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.92rem; transition: all var(--tr); }
.ht-modal-upgrade:hover { opacity: 0.85; transform: translateY(-1px); }
.ht-modal-cancel { padding: 0.85rem; background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-sm); font-weight: 500; font-size: 0.88rem; transition: all var(--tr); }
.ht-modal-cancel:hover { border-color: var(--accent); color: var(--text); }

/* ── TOAST ── */
.ht-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.7rem 1.2rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.5rem; pointer-events: none; transform: translateY(80px); opacity: 0; transition: all 0.28s cubic-bezier(0.4,0,0.2,1); }
.ht-toast.show { transform: translateY(0); opacity: 1; }
.ht-toast-icon { color: var(--accent); }

/* ── SPINNER ── */
.ht-spin { animation: htSpin 0.7s linear infinite; display: inline-block; }
@keyframes htSpin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media(max-width:640px) {
  .ht-nav-links { display: none; }
  .ht-hero-stats { gap: 1.5rem; }
  .ht-stat-num { font-size: 1.4rem; }
  .ht-selects { grid-template-columns: 1fr; }
  .ht-hiw-steps::before { display: none; }
  .ht-results-footer { flex-direction: column; align-items: stretch; }
  .ht-copy-all { justify-content: center; }
}
`;

const PLATFORMS = ['Instagram', 'Twitter/X', 'LinkedIn', 'YouTube', 'TikTok'];
const CATEGORIES = ['General','Business','Fashion','Food & Recipes','Travel','Technology','Fitness & Health','Education','Photography','Entertainment'];
const COUNTS = [15, 20, 30];
const LOADING_MSGS = ['Analyzing your topic…','Finding trending hashtags…','Checking platform trends…','Almost ready…'];
const HISTORY_KEY = 'ht_history_v1';
const TRIES_KEY = 'ht_tries_v1';

export default function HashtagPage() {
  useEffect(() => {
    const root = document.getElementById('ht-root');
    if (!root) return;

    // ─── Utils ───────────────────────────────────────────────────────────────
    const G = id => document.getElementById(id);
    const todayPT = () => new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' });

    function getLocalTries() {
      try {
        const d = JSON.parse(localStorage.getItem(TRIES_KEY) || '{}');
        return d.date === todayPT() ? d : { used: 0, date: todayPT() };
      } catch { return { used: 0, date: todayPT() }; }
    }
    function saveLocalTry(cur) {
      const next = { used: (cur.used || 0) + 1, date: todayPT() };
      localStorage.setItem(TRIES_KEY, JSON.stringify(next));
      return next;
    }
    function getHistory() {
      try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
    }
    function saveHistory(entry) {
      try {
        const h = getHistory().filter(x => x.topic !== entry.topic);
        localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...h].slice(0, 3)));
      } catch {}
    }

    // ─── State ───────────────────────────────────────────────────────────────
    let state = {
      topic: '', platform: 'Instagram', category: 'General',
      count: 30, loading: false, results: null,
      authenticated: false,
      quota: { used: 0, remaining: null, limit: 10, reset: 'Loading…' },
      msgIdx: 0, msgTimer: null, resetTime: '',
    };

    // ─── DOM Refs ─────────────────────────────────────────────────────────────
    const textarea     = G('ht-topic');
    const charCount    = G('ht-charcount');
    const platformSel  = G('ht-platform');
    const categorySel  = G('ht-category');
    const triesBadge   = G('ht-tries');
    const usageGrid    = G('ht-usage');
    const genBtn       = G('ht-genbtn');
    const regenBtn     = G('ht-regenbtn');
    const errorBox     = G('ht-error');
    const placeholder  = G('ht-placeholder');
    const skeleton     = G('ht-skeleton');
    const results      = G('ht-results');
    const loadingMsg   = G('ht-loadmsg');
    const historyWrap  = G('ht-history');
    const historyRow   = G('ht-history-row');
    const toast        = G('ht-toast');
    const toastMsg     = G('ht-toastmsg');
    const modal        = G('ht-modal');
    const modalReset   = G('ht-modal-reset');
    const copyAllBtn   = G('ht-copyall');
    const charInfo     = G('ht-charinfo');
    const previewBadge = G('ht-preview-badge');

    if (!textarea) return;
    const controller = new AbortController();
    const { signal } = controller;

    // ─── Init ─────────────────────────────────────────────────────────────────
    refreshQuota();
    renderHistory();

    async function refreshQuota() {
      try {
        const res = await fetch('/api/ai-quota?tool=hashtag-generator', { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok) {
          state.authenticated = false;
          state.quota = { used: 0, remaining: 0, limit: 10, reset: data.error || 'Connect your account to start' };
          state.resetTime = state.quota.reset;
          updateTries();
          return;
        }

        state.authenticated = true;
        state.quota = data.quota;
        state.resetTime = data.quota.reset;
        updateTries();
      } catch {
        state.authenticated = false;
        state.quota = { used: 0, remaining: 0, limit: 10, reset: 'Could not load quota' };
        state.resetTime = state.quota.reset;
        updateTries();
      }
    }

    // ─── Textarea ─────────────────────────────────────────────────────────────
    textarea.addEventListener('input', () => {
      state.topic = textarea.value.slice(0, 200);
      if (textarea.value.length > 200) textarea.value = state.topic;
      charCount.textContent = `${state.topic.length}/200`;
      charCount.style.color = state.topic.length >= 180 ? '#f97316' : '';
    });

    // ─── Platform / Category ─────────────────────────────────────────────────
    platformSel.addEventListener('change', () => {
      state.platform = platformSel.value;
      previewBadge.textContent = state.platform.toUpperCase();
    });
    categorySel.addEventListener('change', () => { state.category = categorySel.value; });

    // ─── Count Buttons ────────────────────────────────────────────────────────
    root.querySelectorAll('.ht-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.ht-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.count = parseInt(btn.dataset.count);
      });
    });


    // ─── FAQ Accordion ────────────────────────────────────────────────────────
    root.querySelectorAll('.ht-faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.ht-faq-item');
        const isOpen = item.classList.contains('open');
        root.querySelectorAll('.ht-faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
      q.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
      });
    });

    // ─── Modal ────────────────────────────────────────────────────────────────
    G('ht-modal-cancel').addEventListener('click', () => modal.style.display = 'none');
    G('ht-modal-upgrade').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.style.display = 'none'; });

    // ─── Copy All ─────────────────────────────────────────────────────────────
    copyAllBtn.addEventListener('click', async () => {
      if (!state.results) return;
      const all = [...(state.results.high_volume||[]), ...(state.results.medium||[]), ...(state.results.niche||[])].join(' ');
      try { await navigator.clipboard.writeText(all); } catch { fallbackCopy(all); }
      copyAllBtn.innerHTML = '<span>✓</span><span>Copied!</span>';
      copyAllBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        copyAllBtn.innerHTML = '<svg class="ht-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span>Copy All Hashtags</span>';
        copyAllBtn.style.background = '';
      }, 2000);
    });

    // ─── Generate ────────────────────────────────────────────────────────────
    genBtn.addEventListener('click', () => generate(), { signal });
    regenBtn.addEventListener('click', () => { state.results = null; generate(); }, { signal });

    async function generate() {
      if (!state.topic.trim()) { showError('Please enter a topic first'); return; }
      if (!state.authenticated) { showError('Connect your account to use Hashtag Generator'); return; }
      if (state.quota.remaining <= 0) { showModalDialog(); return; }
    
      clearError();
      setLoading(true);
      startMsgCycle();
    
      try {
        const res = await fetch('/api/generate-hashtags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: state.topic.trim(),
            platform: state.platform,
            category: state.category,
            count: state.count,
          }),
        });
    
        const data = await res.json();
    
        if (res.status === 401 || data.requiresAuth) {
          state.authenticated = false;
          await refreshQuota();
          throw new Error(data.error || 'Connect your account to use this tool');
        }
        if (res.status === 429 || data.error === 'rate_limit') {
          // Update quota from server response
          if (data.quota) {
            state.quota = data.quota;
          } else {
            // Force remaining to 0 if server says rate limited
            state.quota = { ...state.quota, remaining: 0 };
          }
          state.resetTime = data.reset || state.resetTime;
          updateTries();
          showModalDialog();
          return;
        }
        if (res.status === 503) {
          alert('Server is busy right now. Please try again in a moment.');
          return;
        }
        if (!res.ok) throw new Error(data.error || 'Something went wrong');
    
        state.results = data.hashtags;
    
        // ── QUOTA UPDATE (with local fallback) ──────────────────
        if (data.quota) {
          // Server returned updated quota - use it
          state.quota = data.quota;
          state.resetTime = data.quota.reset || state.resetTime;
        } else {
          // Server didn't return quota - decrement locally
          state.quota = {
            ...state.quota,
            used: (state.quota.used || 0) + 1,
            remaining: Math.max(0, (state.quota.remaining ?? state.quota.limit) - 1),
          };
        }
        // ────────────────────────────────────────────────────────
    
        updateTries();
        saveHistory({ topic: state.topic.trim(), platform: state.platform, category: state.category });
        renderHistory();
        renderResults();
    
      } catch (err) {
        showError(err.message || 'Connection failed, please retry');
        showPlaceholder();
      } finally {
        stopMsgCycle();
        setLoading(false);
      }
    }


    // ─── Loading Cycle ────────────────────────────────────────────────────────
    function startMsgCycle() {
      state.msgIdx = 0;
      if (loadingMsg) loadingMsg.textContent = LOADING_MSGS[0];
      state.msgTimer = setInterval(() => {
        state.msgIdx = (state.msgIdx + 1) % LOADING_MSGS.length;
        if (loadingMsg) loadingMsg.textContent = LOADING_MSGS[state.msgIdx];
      }, 1200);
    }
    function stopMsgCycle() {
      if (state.msgTimer) { clearInterval(state.msgTimer); state.msgTimer = null; }
    }

    // ─── UI States ────────────────────────────────────────────────────────────
    function setLoading(on) {
      state.loading = on;
      genBtn.disabled = on;
      textarea.disabled = on;
      platformSel.disabled = on;
      categorySel.disabled = on;
      if (on) {
        genBtn.innerHTML = '<span class="ht-spin">◌</span><span>Generating…</span>';
        placeholder.style.display = 'none';
        results.style.display = 'none';
        skeleton.style.display = 'flex';
        regenBtn.style.display = 'none';
      } else {
        genBtn.innerHTML = '<span>✨</span><span>Generate Hashtags</span>';
        skeleton.style.display = 'none';
        textarea.disabled = false;
        platformSel.disabled = false;
        categorySel.disabled = false;
      }
    }

    function showPlaceholder() {
      placeholder.style.display = '';
      results.style.display = 'none';
      skeleton.style.display = 'none';
    }

    function renderResults() {
      if (!state.results) return;
      const r = state.results;
      skeleton.style.display = 'none';
      placeholder.style.display = 'none';

      // Build result HTML
      const hiTags = (r.high_volume || []).map(t => chipHTML(t, 'hi')).join('');
      const medTags = (r.medium || []).map(t => chipHTML(t, 'med')).join('');
      const niTags = (r.niche || []).map(t => chipHTML(t, 'ni')).join('');
      const all = [...(r.high_volume||[]), ...(r.medium||[]), ...(r.niche||[])];
      const total = all.length;
      const chars = all.join(' ').length;
      const warnHtml = chars > 2200 ? '<span class="ht-char-warn"> ⚠ Instagram 2200 char limit</span>' : '';

      results.innerHTML = `
        <div>
          <div class="ht-group-label"><span style="color:#fda4c8">🔥 High Volume</span><span class="ht-group-count">${(r.high_volume||[]).length}</span></div>
          <div class="ht-tags-wrap">${hiTags}</div>
        </div>
        <hr class="ht-divider"/>
        <div>
          <div class="ht-group-label"><span style="color:#93c5fd">📊 Medium Volume</span><span class="ht-group-count">${(r.medium||[]).length}</span></div>
          <div class="ht-tags-wrap">${medTags}</div>
        </div>
        <hr class="ht-divider"/>
        <div>
          <div class="ht-group-label"><span style="color:#6ee7b7">💎 Niche</span><span class="ht-group-count">${(r.niche||[]).length}</span></div>
          <div class="ht-tags-wrap">${niTags}</div>
        </div>
      `;

      charInfo.innerHTML = `${total} hashtags · ${chars} chars${warnHtml}`;
      results.style.display = 'flex';
      copyAllBtn.style.display = 'flex';
      charInfo.style.display = '';
      regenBtn.style.display = 'flex';

      // Chip click copy
      results.querySelectorAll('.ht-chip').forEach(chip => {
        chip.addEventListener('click', async () => {
          const tag = chip.dataset.tag;
          try { await navigator.clipboard.writeText(tag); } catch { fallbackCopy(tag); }
          chip.classList.add('done');
          chip.innerHTML = `<span>✓</span><span>Copied</span>`;
          setTimeout(() => {
            chip.classList.remove('done');
            chip.innerHTML = `<span>${tag}</span>`;
          }, 1800);
        });
      });
    }

    function chipHTML(tag, cls) {
      return `<button class="ht-chip ${cls}" data-tag="${tag}"><span>${tag}</span></button>`;
    }

    // ─── Tries display ────────────────────────────────────────────────────────
    function updateTries() {
      const { used, remaining: rem, limit, reset } = state.quota;
      triesBadge.className = 'ht-tries';
      if (rem === null) {
        triesBadge.textContent = 'Loading quota...';
        genBtn.disabled = state.loading;
      } else if (!state.authenticated) {
        triesBadge.textContent = '🔐 Connect your account to start';
        genBtn.disabled = true;
      } else if (rem <= 0) {
        triesBadge.className += ' red';
        triesBadge.textContent = `🔴 Daily limit reached · resets in ${reset}`;
        genBtn.disabled = false;
      } else if (rem === 1) {
        triesBadge.className += ' yellow';
        triesBadge.textContent = `⚠️ ${rem}/${limit} tries remaining today`;
        genBtn.disabled = false;
      } else {
        triesBadge.className += ' green';
        triesBadge.textContent = `✅ ${rem}/${limit} tries remaining today`;
        genBtn.disabled = false;
      }
      if (usageGrid) {
        usageGrid.innerHTML = `
          <div class="ht-usage-stat"><div class="ht-usage-k">Used Today</div><div class="ht-usage-v">${state.authenticated ? used : '-'}</div></div>
          <div class="ht-usage-stat"><div class="ht-usage-k">Remaining</div><div class="ht-usage-v">${rem}</div></div>
          <div class="ht-usage-stat"><div class="ht-usage-k">Total Daily</div><div class="ht-usage-v">${limit}</div></div>
        `;
      }
    }

    // ─── History ──────────────────────────────────────────────────────────────
    function renderHistory() {
      const hist = getHistory();
      if (!hist.length) { historyWrap.style.display = 'none'; return; }
      historyWrap.style.display = '';
      historyRow.innerHTML = hist.map((h, i) => `
        <button class="ht-history-chip" data-i="${i}">
          <span>🕐</span>
          <span>${escHtml(h.topic)}</span>
        </button>
      `).join('');
      historyRow.querySelectorAll('.ht-history-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const h = hist[parseInt(btn.dataset.i)];
          textarea.value = h.topic; state.topic = h.topic;
          charCount.textContent = `${h.topic.length}/200`;
          platformSel.value = h.platform; state.platform = h.platform;
          categorySel.value = h.category; state.category = h.category;
        });
      });
    }

    // ─── Error ────────────────────────────────────────────────────────────────
    function showError(msg) {
      errorBox.innerHTML = `<span>⚠</span><span>${msg}</span>`;
      errorBox.style.display = 'flex';
      textarea.classList.add('err');
    }
    function clearError() {
      errorBox.style.display = 'none';
      textarea.classList.remove('err');
    }

    // ─── Modal ────────────────────────────────────────────────────────────────
    function showModalDialog() {
      if (state.resetTime) modalReset.textContent = `Resets in ${state.resetTime}`;
      modal.style.display = 'flex';
    }

    // ─── Toast ────────────────────────────────────────────────────────────────
    let toastTimer = null;
    function showToast(msg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function fallbackCopy(text) {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }

    function escHtml(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
    return () => controller.abort();
  }, []);

  return (
    <div id="ht-root" className="ht-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <button
        onClick={() => window.history.back()}
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100, display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.45rem 1rem', borderRadius: '99px', border: '1px solid var(--border-hi)', background: 'rgba(7,7,15,0.8)', backdropFilter: 'blur(12px)', color: 'var(--text-dim)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .18s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
      >
        ← Back
      </button>
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100, maxWidth: 'calc(100vw - 7.5rem)', display: 'flex', justifyContent: 'flex-end' }}><GoogleAuthButton compact /></div>

      {/* ── HERO ── */}
      <section className="ht-hero">
        <div className="ht-hero-grid" aria-hidden="true" />
        <div className="ht-hero-glow" aria-hidden="true" />
        <div className="ht-hero-glow2" aria-hidden="true" />
        <div className="ht-hero-content">
          <div className="ht-badge">AI-Powered Hashtag Engine Active</div>
          <h1>
            Generate Perfect<br />
            <span className="grad">Hashtags. Instantly.</span>
          </h1>
          <p className="ht-hero-sub">
            Platform-optimized hashtags for Instagram, TikTok, LinkedIn & more —
            sorted by volume, ready to copy in one click.
          </p>
          <div className="ht-hero-actions">
            <a href="#ht-generator" className="ht-btn-primary">
              <span>✨ Start Generating</span>
            </a>
            <a href="#ht-features" className="ht-btn-ghost">
              <span>See Features ↓</span>
            </a>
          </div>
          <div className="ht-hero-stats">
            <div className="ht-stat">
              <div className="ht-stat-num" style={{ background:'linear-gradient(135deg,#FF6B6B,#FF8E8E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>30</div>
              <div className="ht-stat-label">Hashtags / Run</div>
            </div>
            <div className="ht-stat">
              <div className="ht-stat-num" style={{ background:'linear-gradient(135deg,#FF6B6B,#FF8E8E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>5</div>
              <div className="ht-stat-label">Platforms</div>
            </div>
            <div className="ht-stat">
              <div className="ht-stat-num" style={{ background:'linear-gradient(135deg,#FF6B6B,#FF8E8E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Free</div>
              <div className="ht-stat-label">Free / Day</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GENERATOR ── */}
      <section className="ht-section ht-gen" id="ht-generator">
        <div className="ht-section-inner">
          <div className="ht-gen-header">
            <div className="ht-label">✦ Live Generator</div>
            <h2 className="ht-title">Generate Your Hashtags</h2>
            <p className="ht-sub">Enter your topic, pick your platform — get 30 targeted hashtags in seconds.</p>
          </div>

          <div className="ht-gen-layout">
            {/* ── Controls ── */}
            <div className="ht-card">
              {/* Topic */}
              <div>
                <div className="ht-ctrl-label">Topic / Description</div>
                <textarea
                  id="ht-topic"
                  className="ht-textarea"
                  placeholder="Describe your post topic, product, or content…"
                  maxLength={200}
                  rows={3}
                />
                <div className="ht-char-count" id="ht-charcount">0/200</div>
              </div>

              {/* Platform + Category */}
              <div>
                <div className="ht-ctrl-label">Platform &amp; Category</div>
                <div className="ht-selects">
                  <select id="ht-platform" className="ht-select">
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <select id="ht-category" className="ht-select">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Count */}
              <div>
                <div className="ht-ctrl-label">Hashtag Count</div>
                <div className="ht-count-row">
                  {COUNTS.map(n => (
                    <button key={n} className={`ht-count-btn${n === 30 ? ' active' : ''}`} data-count={n}>{n}</button>
                  ))}
                </div>
              </div>

              {/* Error */}
              <div id="ht-error" style={{ display: 'none' }} className="ht-error-msg" />

              {/* Tries */}
              <div id="ht-tries" className="ht-tries green">Loading quota...</div>
              <div id="ht-usage" className="ht-usage-grid" aria-live="polite">
                <div className="ht-usage-stat"><div className="ht-usage-k">Used Today</div><div className="ht-usage-v">0</div></div>
                <div className="ht-usage-stat"><div className="ht-usage-k">Remaining</div><div className="ht-usage-v">...</div></div>
                <div className="ht-usage-stat"><div className="ht-usage-k">Total Daily</div><div className="ht-usage-v">10</div></div>
              </div>

              {/* Generate */}
              <button id="ht-genbtn" className="ht-btn-gen">
                <span>✨</span><span>Generate Hashtags</span>
              </button>

              {/* Regenerate */}
              <button id="ht-regenbtn" className="ht-btn-regen" style={{ display: 'none' }}>
                🔄 Regenerate (uses 1 try)
              </button>

              {/* History */}
              <div id="ht-history" style={{ display: 'none' }}>
                <div className="ht-history-label">Recent Searches</div>
                <div id="ht-history-row" className="ht-history-row" />
              </div>
            </div>

            {/* ── Preview Panel ── */}
            <div className="ht-preview-panel">
              <div className="ht-preview-header">
                <div className="ht-live-indicator">
                  <span className="ht-live-dot" />
                  LIVE OUTPUT
                </div>
                <div className="ht-preview-badge" id="ht-preview-badge">INSTAGRAM</div>
              </div>

              <div className="ht-preview-body">
                <div className="ht-dot-bg" aria-hidden="true" />

                {/* Placeholder */}
                <div id="ht-placeholder" className="ht-placeholder">
                  <div className="ht-placeholder-icon">🏷️</div>
                  <div className="ht-placeholder-text">Enter a topic to generate hashtags</div>
                </div>

                {/* Skeleton */}
                <div id="ht-skeleton" className="ht-skeleton" style={{ display: 'none' }}>
                  <div id="ht-loadmsg" className="ht-loading-msg">Analyzing your topic…</div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i}>
                      <div className="ht-skel-label" style={{ animationDelay: `${i * 120}ms` }} />
                      <div className="ht-skel-tags" style={{ marginTop: '0.6rem' }}>
                        {[...Array(6)].map((_, j) => (
                          <div key={j} className="ht-skel-tag" style={{ width: `${55 + j * 12}px`, animationDelay: `${j * 80}ms` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Results */}
                <div id="ht-results" className="ht-results" style={{ display: 'none' }} />
              </div>

              {/* Footer */}
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div id="ht-charinfo" className="ht-char-info" style={{ display: 'none' }} />
                <button id="ht-copyall" className="ht-copy-all" style={{ display: 'none' }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy All Hashtags</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="ht-section" id="ht-features">
        <div className="ht-section-inner">
          <div className="ht-label">✦ Why Choose Us</div>
          <h2 className="ht-title">Built for Creators & Marketers</h2>
          <p className="ht-sub">Everything you need to maximize reach — no fluff, no filler.</p>
          <div className="ht-features-grid">
            {[
              { icon: '🤖', title: 'Gemini AI Powered', desc: 'Uses Google Gemini to understand context, trends, and platform-specific best practices for each generation.' },
              { icon: '📊', title: '3-Tier Volume Mix', desc: 'Get 10 high-volume, 10 medium, and 10 niche hashtags — the perfect blend for maximum algorithmic reach.' },
              { icon: '📱', title: '5 Platform Modes', desc: 'Hashtags are tuned for Instagram, TikTok, Twitter/X, LinkedIn, and YouTube — each has a different optimal strategy.' },
              { icon: '⚡', title: 'One-Click Copy', desc: 'Click any hashtag to copy it instantly, or grab all 30 at once with the Copy All button.' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your topic data is never stored or logged. Each API call is stateless and private.' },
              { icon: '🔢', title: 'Instagram Char Limit', desc: 'Real-time character count with warning when you exceed Instagram\'s 2200 character caption limit.' },
            ].map((f, i) => (
              <article className="ht-feat-card" key={i}>
                <div className="ht-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ht-section ht-section-alt" id="ht-how">
        <div className="ht-section-inner">
          <div className="ht-label">◎ Process</div>
          <h2 className="ht-title">How It Works</h2>
          <p className="ht-sub">From topic to publishable hashtags in under 10 seconds.</p>
          <div className="ht-hiw-steps">
            {[
              { n: '01', icon: '✍️', title: 'Describe Your Post', desc: 'Enter your topic, product, or content description in up to 200 characters.' },
              { n: '02', icon: '📱', title: 'Pick Your Platform', desc: 'Select Instagram, TikTok, LinkedIn, YouTube or Twitter/X and your content category.' },
              { n: '03', icon: '🤖', title: 'AI Generates', desc: 'Gemini analyzes your topic and crafts 30 platform-specific, trend-aware hashtags.' },
              { n: '04', icon: '📋', title: 'Copy & Publish', desc: 'Click individual hashtags or copy all at once — paste directly into your post.' },
            ].map((s, i) => (
              <div className="ht-step" key={i}>
                <div className="ht-step-num">{s.n}</div>
                <div className="ht-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="ht-section" id="ht-cases">
        <div className="ht-section-inner">
          <div className="ht-label">◻ Applications</div>
          <h2 className="ht-title">Who Uses This Tool</h2>
          <p className="ht-sub">Built for everyone who posts content and wants more reach.</p>
          <div className="ht-cases-grid">
            {[
              { tag: 'ht-tag-v', label: 'Creators', title: 'Instagram Reels & Posts', desc: 'Get the right mix of trending and niche hashtags to push your Reels into the explore page algorithm.' },
              { tag: 'ht-tag-p', label: 'Brands', title: 'Product Launches', desc: 'Generate hashtags for product drops, campaigns, and brand awareness posts across multiple platforms at once.' },
              { tag: 'ht-tag-b', label: 'Marketers', title: 'LinkedIn Content', desc: 'LinkedIn hashtags work differently — our tool generates professional, industry-specific tags that reach decision-makers.' },
              { tag: 'ht-tag-v', label: 'YouTubers', title: 'Video Descriptions', desc: 'YouTube hashtags appear above your title and in search. Get the right ones to surface your videos.' },
              { tag: 'ht-tag-p', label: 'Agencies', title: 'Client Content', desc: 'Manage hashtag strategies for multiple client niches and industries quickly without manual research.' },
              { tag: 'ht-tag-b', label: 'Coaches', title: 'Educational Content', desc: 'Reach your target audience on TikTok and Instagram with hashtags tuned for educational and motivational content.' },
            ].map((c, i) => (
              <article className="ht-case-card" key={i}>
                <div className={`ht-case-tag ${c.tag}`}>{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ht-section ht-section-alt" id="ht-faq">
        <div className="ht-section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="ht-label">❓ Questions</div>
            <h2 className="ht-title">Frequently Asked</h2>
            <p className="ht-sub" style={{ margin: '0 auto' }}>Everything you need to know about the Hashtag Generator.</p>
          </div>
          <div className="ht-faq-list">
            {[
              { q: 'Is this tool completely free?', a: 'Yes — 10 free generations per day.' },
              { q: 'How many hashtags should I use on Instagram?', a: 'Instagram currently recommends 3–5 hashtags for best reach, though many creators still use 15–30. Our tool gives you 30 so you can pick the best ones.' },
              { q: 'Are the hashtags updated and relevant?', a: 'Gemini AI generates hashtags fresh each time based on current knowledge of platform trends, ensuring relevance to your topic and category.' },
              { q: 'Does this work for TikTok hashtags?', a: 'Yes. TikTok hashtags are generated with the platform\'s discovery algorithm in mind — focusing on trending sounds and content categories specific to TikTok.' },
              { q: 'What is the high / medium / niche split?', a: 'High volume tags have millions of posts and give broad exposure. Medium tags balance reach and competition. Niche tags have targeted, highly engaged audiences. Using all three maximizes algorithmic reach.' },
              { q: 'Is my topic data stored?', a: 'No. Your input is sent to the AI to generate hashtags and is never stored, logged, or used for any other purpose.' },
            ].map((f, i) => (
              <div className="ht-faq-item" key={i}>
                <div className="ht-faq-q" role="button" tabIndex={0} aria-expanded="false">
                  {f.q}
                  <span className="ht-faq-arrow">⌄</span>
                </div>
                <div className="ht-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ht-footer">
        <div className="ht-footer-inner">
          <div className="ht-footer-logo">
            <span className="logo-tag">#</span> Hashtag Generator
          </div>
          <p className="ht-footer-sub">Platform-optimized hashtags. Powered by AI. Free forever.</p>
          <ul className="ht-footer-links">
            <li><a href="#ht-generator">Generator</a></li>
            <li><a href="#ht-features">Features</a></li>
            <li><a href="#ht-cases">Use Cases</a></li>
            <li><a href="#ht-faq">FAQ</a></li>
          </ul>
          <p className="ht-footer-copy">Daily free credits · No tracking · Results never stored</p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <div id="ht-modal" className="ht-modal-backdrop" style={{ display: 'none' }}>
        <div className="ht-modal" onClick={e => e.stopPropagation()}>
          <div className="ht-modal-icon">🔒</div>
          <h3>Daily Limit Reached</h3>
          <p>You have used all 10 free uses for today. Come back tomorrow for more!</p>
          <p className="ht-modal-reset" id="ht-modal-reset"></p>
          <div className="ht-modal-btns">
            <button id="ht-modal-upgrade" className="ht-modal-cancel">Got it</button>
            <button id="ht-modal-cancel" className="ht-modal-cancel">Close</button>
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      <div id="ht-toast" className="ht-toast">
        <span className="ht-toast-icon">✓</span>
        <span id="ht-toastmsg">Copied!</span>
      </div>
    </div>
  );
}
