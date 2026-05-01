'use client';
import { useEffect } from 'react';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.kw-root *, .kw-root *::before, .kw-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.kw-root {
  cursor: auto !important;
  --bg: #09100d; --bg2: #0d1610; --card: #0f1a12;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.11);
  --text: #e4ede8; --text-muted: #5a7065; --text-dim: #8aaa94;
  --accent: #34D399; --accent2: #6ee7b7;
  --accent-dim: rgba(52,211,153,0.12); --accent-dim2: rgba(52,211,153,0.06);
  --accent-glow: rgba(52,211,153,0.25);
  --yellow: #fbbf24; --yellow-dim: rgba(251,191,36,0.12);
  --red: #f87171; --red-dim: rgba(248,113,113,0.12);
  --blue: #60a5fa; --blue-dim: rgba(96,165,250,0.12);
  --purple: #a78bfa; --purple-dim: rgba(167,139,250,0.12);
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

.kw-root.light {
  --bg: #f4faf7; --bg2: #e8f5ef; --card: #ffffff;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.13);
  --text: #071a0f; --text-muted: #4a7a5e; --text-dim: #2d5c42;
  --accent: #059669; --accent2: #34D399;
  --accent-dim: rgba(5,150,105,0.1); --accent-dim2: rgba(5,150,105,0.05);
  --accent-glow: rgba(5,150,105,0.2);
  --yellow: #d97706; --yellow-dim: rgba(217,119,6,0.1);
  --red: #dc2626; --red-dim: rgba(220,38,38,0.08);
  --blue: #2563eb; --blue-dim: rgba(37,99,235,0.1);
  --purple: #7c3aed; --purple-dim: rgba(124,58,237,0.1);
  --error: #dc2626;
  --shadow: 0 4px 24px rgba(0,0,0,0.07); --shadow-lg: 0 12px 48px rgba(0,0,0,0.13);
}
.kw-root.light .kw-nav { background: rgba(244,250,247,0.82); }
.kw-root.light .kw-table th { background: var(--bg2); }
.kw-root.light .kw-table tr:hover td { background: rgba(0,0,0,0.02); }
.kw-root.light .kw-table tr.best-row td { background: rgba(5,150,105,0.05); }
.kw-root.light .v-high { background: rgba(5,150,105,0.12); color: #059669; }
.kw-root.light .v-medium { background: rgba(217,119,6,0.12); color: #b45309; }
.kw-root.light .v-low { background: rgba(0,0,0,0.07); color: #6b7280; }
.kw-root.light .d-easy { background: rgba(5,150,105,0.12); color: #059669; }
.kw-root.light .d-medium { background: rgba(234,88,12,0.12); color: #c2410c; }
.kw-root.light .d-hard { background: rgba(220,38,38,0.12); color: #dc2626; }
.kw-root.light .i-info { background: rgba(37,99,235,0.1); color: #2563eb; }
.kw-root.light .i-comm { background: rgba(124,58,237,0.1); color: #7c3aed; }
.kw-root.light .i-trans { background: rgba(5,150,105,0.1); color: #059669; }
.kw-root.light .i-nav { background: rgba(217,119,6,0.1); color: #b45309; }
.kw-root.light .kw-tries.green { color: #059669; border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.06); }
.kw-root.light .kw-tries.yellow { color: #b45309; border-color: rgba(180,83,9,0.25); background: rgba(180,83,9,0.06); }
.kw-root.light .kw-tries.red { color: #dc2626; border-color: rgba(220,38,38,0.25); background: rgba(220,38,38,0.06); }

.kw-root a { color: inherit; text-decoration: none; }
.kw-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.kw-root ::selection { background: var(--accent-dim); color: var(--accent); }
.kw-root ::-webkit-scrollbar { width: 5px; }
.kw-root ::-webkit-scrollbar-track { background: var(--bg); }
.kw-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* ── NAV ── */
.kw-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(9,15,13,0.75); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); }
.kw-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.kw-logo-icon { width: 30px; height: 30px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
.kw-logo-text { color: var(--text-dim); font-size: 0.88rem; font-weight: 600; }
.kw-nav-right { display: flex; align-items: center; gap: 1rem; }
.kw-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.kw-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--tr); }
.kw-nav-links a:hover { color: var(--text); }
.kw-nav-cta { padding: 0.45rem 1.1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-size: 0.85rem; font-weight: 600; transition: all var(--tr); white-space: nowrap; }
.kw-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }
.kw-theme-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--tr); font-size: 1rem; flex-shrink: 0; }
.kw-theme-btn:hover { border-color: var(--accent); color: var(--accent); }

/* ── HERO ── */
.kw-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.kw-hero-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 58px 58px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.kw-hero-glow { position: absolute; top: 45%; left: 50%; transform: translate(-50%,-62%); width: 700px; height: 600px; background: radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.kw-hero-glow2 { position: absolute; top: 65%; right: 15%; width: 380px; height: 320px; background: radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.kw-hero-content { position: relative; z-index: 1; max-width: 820px; }
.kw-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--accent-dim); border: 1px solid rgba(52,211,153,0.25); border-radius: 99px; font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; color: var(--accent); letter-spacing: 0.05em; margin-bottom: 2rem; animation: kwFadeUp 0.6s ease both; }
.kw-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--accent); animation: kwPulse 2s ease-in-out infinite; }
@keyframes kwPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
.kw-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem,7vw,5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: kwFadeUp 0.7s 0.1s ease both; }
.kw-hero h1 .grad { background: linear-gradient(135deg, var(--accent), var(--accent2), #a7f3d0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.kw-hero-sub { font-size: clamp(1rem,2.5vw,1.2rem); color: var(--text-dim); max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; animation: kwFadeUp 0.7s 0.2s ease both; }
.kw-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: kwFadeUp 0.7s 0.3s ease both; }
.kw-btn-primary { padding: 0.75rem 1.8rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: 99px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px var(--accent-glow); }
.kw-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 45px var(--accent-glow); opacity:0.9; }
.kw-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.kw-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.kw-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: kwFadeUp 0.7s 0.4s ease both; }
.kw-stat { text-align: center; }
.kw-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.kw-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
@keyframes kwFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* ── SECTIONS ── */
.kw-section { padding: 6rem 1.5rem; }
.kw-section-inner { max-width: 1100px; margin: 0 auto; }
.kw-section-alt { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.kw-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.kw-title { font-family: var(--font-head); font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.kw-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }

/* ── GENERATOR ── */
.kw-gen { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.kw-gen-header { text-align: center; margin-bottom: 3rem; }
.kw-gen-layout { display: grid; grid-template-columns: 360px 1fr; gap: 1.5rem; align-items: start; }
@media(max-width:900px) { .kw-gen-layout { grid-template-columns: 1fr; } }

/* ── CONTROLS CARD ── */
.kw-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 1.25rem; }
.kw-ctrl-label { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; color: var(--text-dim); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
.kw-input { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.7rem 1rem; font-family: var(--font-mono); font-size: 0.87rem; color: var(--text); outline: none; transition: border-color var(--tr); }
.kw-input:focus { border-color: var(--accent); }
.kw-input.err { border-color: var(--error); }
.kw-input::placeholder { color: var(--text-muted); }
.kw-char-count { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-align: right; margin-top: 0.25rem; }
.kw-select { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; outline: none; transition: border-color var(--tr); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a7065' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.7rem center; background-size: 0.9rem; padding-right: 2.2rem; }
.kw-select:focus { border-color: var(--accent); }
.kw-select option { background: #0e1812; }
.kw-selects-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.kw-tries { text-align: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; padding: 0.6rem 0.9rem; border-radius: var(--radius-xs); background: var(--bg2); border: 1px solid var(--border); }
.kw-tries.green { color: #34D399; border-color: rgba(52,211,153,0.2); background: rgba(52,211,153,0.05); }
.kw-tries.yellow { color: #fbbf24; border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.05); }
.kw-tries.red { color: var(--error); border-color: rgba(255,107,122,0.2); background: rgba(255,107,122,0.05); }
.kw-usage-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:0.55rem; }
.kw-usage-stat { background: var(--bg2); border:1px solid var(--border); border-radius: var(--radius-xs); padding:0.65rem 0.75rem; }
.kw-usage-k { font-family: var(--font-mono); font-size:0.64rem; letter-spacing:0.08em; text-transform:uppercase; color: var(--text-muted); }
.kw-usage-v { margin-top:0.25rem; font-family: var(--font-head); font-size:1rem; font-weight:700; letter-spacing:-0.03em; color: var(--text); }
.kw-btn-gen { width: 100%; padding: 0.9rem 1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.95rem; transition: all var(--tr); display: flex; align-items: center; justify-content: center; gap: 0.6rem; box-shadow: 0 4px 20px var(--accent-glow); }
.kw-btn-gen:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 6px 28px var(--accent-glow); }
.kw-btn-gen:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.kw-spin { animation: kwSpin 0.7s linear infinite; display: inline-block; }
@keyframes kwSpin { to{transform:rotate(360deg)} }
.kw-error-box { display: flex; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(255,107,122,0.08); border: 1px solid rgba(255,107,122,0.22); border-radius: var(--radius-xs); font-size: 0.83rem; color: #fca5a5; font-family: var(--font-mono); }
.kw-history-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; }
.kw-history-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.5rem; }
.kw-hist-chip { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.28rem 0.65rem; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); cursor: pointer; transition: all var(--tr); max-width: 150px; overflow: hidden; }
.kw-hist-chip:hover { border-color: var(--accent); color: var(--accent); }
.kw-hist-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ── RESULTS PANEL ── */
.kw-results-panel { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; min-height: 480px; display: flex; flex-direction: column; box-shadow: var(--shadow); }
.kw-results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
.kw-live-badge { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; }
.kw-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: kwLive 1.5s ease-in-out infinite; }
@keyframes kwLive { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 50%{box-shadow:0 0 0 5px rgba(52,211,153,0)} }
.kw-filter-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.kw-filter-btn { padding: 0.25rem 0.65rem; border: 1px solid var(--border); border-radius: 99px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); transition: all var(--tr); }
.kw-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.kw-filter-btn.active { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

/* Placeholder */
.kw-placeholder { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 320px; position: relative; overflow: hidden; }
.kw-placeholder .dot-bg { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--border-hi) 1px, transparent 1px); background-size: 18px 18px; opacity: 0.5; }
.kw-placeholder-inner { text-align: center; position: relative; z-index: 1; }
.kw-placeholder-icon { font-size: 2.8rem; opacity: 0.15; margin-bottom: 0.75rem; animation: kwFloat 3s ease-in-out infinite; }
@keyframes kwFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.kw-placeholder-text { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }

/* Skeleton */
.kw-skeleton { display: none; flex-direction: column; gap: 0.5rem; }
.kw-skeleton.show { display: flex; }
.kw-skel-title { height: 14px; width: 120px; background: rgba(255,255,255,0.07); border-radius: 99px; animation: kwShimmer 1.5s ease-in-out infinite; margin-bottom: 0.5rem; }
.kw-skel-row { display: flex; gap: 0.5rem; align-items: center; height: 38px; background: rgba(255,255,255,0.04); border-radius: var(--radius-xs); padding: 0 0.75rem; animation: kwShimmer 1.5s ease-in-out infinite; }
.kw-skel-cell { height: 10px; background: rgba(255,255,255,0.07); border-radius: 99px; animation: kwShimmer 1.5s ease-in-out infinite; }
@keyframes kwShimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
.kw-loading-msg { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); text-align: center; padding: 0.75rem; opacity: 0.85; }

/* Results */
.kw-results-body { display: none; flex-direction: column; gap: 1.5rem; animation: kwFadeUp 0.4s ease both; }
.kw-results-body.show { display: flex; }

/* Best opportunities */
.kw-best { background: linear-gradient(135deg, rgba(52,211,153,0.08), rgba(52,211,153,0.04)); border: 1px solid rgba(52,211,153,0.2); border-radius: var(--radius-sm); padding: 1rem 1.25rem; }
.kw-best-title { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: var(--accent); margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.4rem; }
.kw-best-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.kw-best-chip { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.75rem; background: var(--accent-dim); border: 1px solid rgba(52,211,153,0.25); border-radius: 99px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); cursor: pointer; transition: all var(--tr); }
.kw-best-chip:hover { background: rgba(52,211,153,0.2); transform: translateY(-1px); }

/* Section group */
.kw-group { display: flex; flex-direction: column; gap: 0.4rem; }
.kw-group-header { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; color: var(--text-dim); padding: 0.1rem 0; }
.kw-group-count { font-size: 0.68rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.45rem; border-radius: 99px; color: var(--text-muted); }

/* Table */
.kw-table-wrap { overflow-x: auto; }
.kw-table { width: 100%; border-collapse: collapse; }
.kw-table th { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; padding: 0.4rem 0.75rem; text-align: left; background: var(--bg2); border-bottom: 1px solid var(--border); white-space: nowrap; cursor: pointer; transition: color var(--tr); }
.kw-table th:hover { color: var(--accent); }
.kw-table th.sorted { color: var(--accent); }
.kw-table td { padding: 0.55rem 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 0.85rem; vertical-align: middle; }
.kw-table tr:last-child td { border-bottom: none; }
.kw-table tr:hover td { background: rgba(255,255,255,0.02); }
.kw-table tr.best-row td { background: rgba(52,211,153,0.04); }
.kw-kw-cell { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text); cursor: pointer; display: flex; align-items: center; gap: 0.4rem; min-width: 160px; transition: color var(--tr); }
.kw-kw-cell:hover { color: var(--accent); }
.kw-kw-cell .copy-icon { opacity: 0; font-size: 0.7rem; transition: opacity var(--tr); }
.kw-kw-cell:hover .copy-icon { opacity: 1; }
.kw-star { color: var(--accent); font-size: 0.7rem; }

/* Badges */
.kw-badge-v { display: inline-flex; align-items: center; padding: 0.18rem 0.55rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; white-space: nowrap; }
.v-high { background: rgba(52,211,153,0.15); color: #34D399; }
.v-medium { background: rgba(251,191,36,0.15); color: #fbbf24; }
.v-low { background: rgba(255,255,255,0.07); color: var(--text-muted); }
.d-easy { background: rgba(52,211,153,0.15); color: #34D399; }
.d-medium { background: rgba(251,191,36,0.15); color: #fb923c; }
.d-hard { background: rgba(248,113,113,0.15); color: #f87171; }
.i-info { background: var(--blue-dim); color: var(--blue); }
.i-comm { background: var(--purple-dim); color: var(--purple); }
.i-trans { background: var(--accent-dim); color: var(--accent); }
.i-nav { background: rgba(251,191,36,0.12); color: #fbbf24; }

/* Sort icons */
.sort-icon { font-size: 0.6rem; opacity: 0.4; }
.sorted .sort-icon { opacity: 1; }

/* Related topics */
.kw-related { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1rem 1.25rem; }
.kw-related-title { font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.6rem; letter-spacing: 0.04em; }
.kw-related-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.kw-related-chip { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.28rem 0.7rem; background: var(--card); border: 1px solid var(--border); border-radius: 99px; font-family: var(--font-mono); font-size: 0.73rem; color: var(--text-dim); cursor: pointer; transition: all var(--tr); }
.kw-related-chip:hover { border-color: var(--accent); color: var(--accent); }

/* Export row */
.kw-export-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.5rem; }
.kw-exp-btn { display: flex; align-items: center; gap: 0.4rem; padding: 0.55rem 1rem; border-radius: var(--radius-sm); font-size: 0.83rem; font-weight: 600; transition: all var(--tr); white-space: nowrap; }
.kw-exp-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 3px 14px var(--accent-glow); }
.kw-exp-primary:hover { opacity: 0.85; transform: translateY(-1px); }
.kw-exp-ghost { background: var(--bg2); border: 1px solid var(--border-hi); color: var(--text-dim); }
.kw-exp-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* Search filter */
.kw-search-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.kw-search-input { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.45rem 0.75rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text); outline: none; transition: border-color var(--tr); }
.kw-search-input:focus { border-color: var(--accent); }
.kw-search-input::placeholder { color: var(--text-muted); }
.kw-total-badge { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; }

/* ── FEATURES ── */
.kw-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.kw-feat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--tr); position: relative; overflow: hidden; }
.kw-feat-card::before { content:''; position:absolute; inset:0; background: var(--accent-dim2); opacity:0; transition: opacity var(--tr); }
.kw-feat-card:hover::before { opacity:1; }
.kw-feat-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.kw-feat-icon { width:44px; height:44px; background: var(--accent-dim); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:1.1rem; }
.kw-feat-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.kw-feat-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* ── HOW IT WORKS ── */
.kw-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.kw-hiw-steps::before { content:''; position:absolute; top:2.4rem; left:10%; right:10%; height:1px; background: linear-gradient(90deg,transparent,var(--border-hi),transparent); }
.kw-step { text-align: center; }
.kw-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--accent); opacity:0.13; line-height:1; margin-bottom:0.75rem; }
.kw-step-icon { width:52px; height:52px; background: var(--card); border: 1px solid var(--border-hi); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin:0 auto 1rem; }
.kw-step h3 { font-family: var(--font-head); font-size:1rem; font-weight:700; margin-bottom:0.4rem; }
.kw-step p { font-size:0.85rem; color:var(--text-dim); line-height:1.6; }

/* ── USE CASES ── */
.kw-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1.25rem; margin-top: 3rem; }
.kw-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--tr); }
.kw-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.kw-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.65rem; border-radius: 99px; margin-bottom: 0.9rem; }
.kw-tag-g { background: var(--accent-dim); color: var(--accent); }
.kw-tag-b { background: var(--blue-dim); color: var(--blue); }
.kw-tag-p { background: var(--purple-dim); color: var(--purple); }
.kw-case-card h3 { font-family: var(--font-head); font-size:1.05rem; font-weight:700; margin-bottom:0.4rem; letter-spacing:-0.02em; }
.kw-case-card p { font-size:0.85rem; color:var(--text-dim); line-height:1.6; }

/* ── FAQ ── */
.kw-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.kw-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--tr); }
.kw-faq-item.open { border-color: var(--border-hi); }
.kw-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--tr); gap: 1rem; }
.kw-faq-q:hover { color: var(--accent); }
.kw-faq-arrow { font-size:1rem; color:var(--text-muted); flex-shrink:0; transition:transform 0.25s ease; }
.kw-faq-item.open .kw-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.kw-faq-a { max-height:0; overflow:hidden; transition:max-height 0.3s ease, padding 0.3s ease; font-size:0.9rem; color:var(--text-dim); line-height:1.75; }
.kw-faq-item.open .kw-faq-a { max-height:300px; padding:0 1.25rem 1.1rem; }

/* ── FOOTER ── */
.kw-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.kw-footer-inner { max-width: 1100px; margin: 0 auto; }
.kw-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.kw-footer-logo-icon { width:28px; height:28px; background: linear-gradient(135deg,var(--accent),var(--accent2)); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; }
.kw-footer-sub { color:var(--text-muted); font-size:0.85rem; margin-bottom:2rem; }
.kw-footer-links { display:flex; justify-content:center; flex-wrap:wrap; gap:2rem; margin-bottom:2rem; list-style:none; }
.kw-footer-links a { font-size:0.85rem; color:var(--text-muted); transition:color var(--tr); }
.kw-footer-links a:hover { color:var(--accent); }
.kw-footer-copy { font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono); }

/* ── MODAL ── */
.kw-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); z-index:200; display:flex; align-items:center; justify-content:center; padding:1.5rem; animation:kwFadeIn 0.2s ease; }
@keyframes kwFadeIn { from{opacity:0} to{opacity:1} }
.kw-modal { background:var(--card); border:1px solid var(--border-hi); border-radius:var(--radius); padding:2.25rem; max-width:380px; width:100%; text-align:center; box-shadow:var(--shadow-lg); animation:kwSlideUp 0.25s ease; }
@keyframes kwSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.kw-modal-icon { width:64px; height:64px; background:var(--accent-dim); border:1px solid rgba(52,211,153,0.25); border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; font-size:1.8rem; }
.kw-modal h3 { font-family:var(--font-head); font-size:1.25rem; font-weight:800; margin-bottom:0.5rem; }
.kw-modal p { font-size:0.9rem; color:var(--text-dim); margin-bottom:0.35rem; }
.kw-modal-reset { font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:1.75rem; }
.kw-modal-btns { display:flex; flex-direction:column; gap:0.75rem; }
.kw-modal-upgrade { padding:0.85rem; background:linear-gradient(135deg,var(--accent),var(--accent2)); color:#fff; border-radius:var(--radius-sm); font-weight:700; font-size:0.92rem; transition:all var(--tr); }
.kw-modal-upgrade:hover { opacity:0.85; transform:translateY(-1px); }
.kw-modal-cancel { padding:0.85rem; background:var(--bg2); border:1px solid var(--border-hi); color:var(--text-dim); border-radius:var(--radius-sm); font-weight:500; font-size:0.88rem; transition:all var(--tr); }
.kw-modal-cancel:hover { border-color:var(--accent); color:var(--text); }

/* ── TOAST ── */
.kw-toast { position:fixed; bottom:2rem; right:2rem; z-index:999; background:var(--card); border:1px solid var(--border-hi); padding:0.7rem 1.2rem; border-radius:var(--radius-sm); font-family:var(--font-mono); font-size:0.82rem; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:0.5rem; pointer-events:none; transform:translateY(80px); opacity:0; transition:all 0.28s cubic-bezier(0.4,0,0.2,1); }
.kw-toast.show { transform:translateY(0); opacity:1; }
.kw-toast-icon { color:var(--accent); }

/* ── RESPONSIVE ── */
@media(max-width:640px) {
  .kw-nav-links { display:none; }
  .kw-hero-stats { gap:1.5rem; }
  .kw-stat-num { font-size:1.4rem; }
  .kw-selects-2 { grid-template-columns:1fr; }
  .kw-hiw-steps::before { display:none; }
  .kw-export-row { flex-direction:column; }
  .kw-filter-row { display:none; }
}
`;

const CONTENT_TYPES = ['Blog Post','YouTube Video','Product Page','Instagram/Social Media','News Article','Landing Page'];
const AUDIENCES     = ['General Public','Beginners','Professionals/Experts','Students','Business Owners','Parents','Teenagers'];
const COUNTRIES     = ['India','USA','UK','Canada','Australia','Global'];
const LOAD_MSGS     = ['🔍 Analyzing your niche…','📊 Finding search volumes…','🎯 Identifying opportunities…','✨ Almost ready…'];
const HIST_KEY      = 'kw_history_v1';
const TRIES_KEY     = 'kw_tries_v1';

export default function KeywordPage() {
  useEffect(() => {
    const root = document.getElementById('kw-root');
    if (!root) return;

    const G = id => document.getElementById(id);
    const todayPT = () => new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' });

    // ─── localStorage helpers ────────────────────────────────────────────────
    function getTries() {
      try { const d = JSON.parse(localStorage.getItem(TRIES_KEY)||'{}'); return d.date===todayPT()?d:{used:0,date:todayPT()}; }
      catch { return {used:0,date:todayPT()}; }
    }
    function saveTry(cur) {
      const n={used:(cur.used||0)+1,date:todayPT()};
      localStorage.setItem(TRIES_KEY,JSON.stringify(n)); return n;
    }
    function getHistory() { try { return JSON.parse(localStorage.getItem(HIST_KEY)||'[]'); } catch { return []; } }
    function saveHistory(topic) {
      try {
        const h = getHistory().filter(x=>x!==topic);
        localStorage.setItem(HIST_KEY, JSON.stringify([topic,...h].slice(0,5)));
      } catch {}
    }

    // ─── State ───────────────────────────────────────────────────────────────
    let state = {
      topic:'', contentType:'Blog Post', audience:'General Public',
      country:'India', seed:'', loading:false,
      results:null, filteredResults:null,
      sortKey:'', sortDir:1, activeFilter:'all', searchQuery:'',
      authenticated:false, quota:{ used:0, remaining:null, limit:10, reset:'Loading…' },
      resetTime:'', msgIdx:0, msgTimer:null,
    };

    // ─── DOM refs ────────────────────────────────────────────────────────────
    const topicInput   = G('kw-topic');
    const charCount    = G('kw-charcount');
    const ctSel        = G('kw-ct');
    const audSel       = G('kw-aud');
    const countrySel   = G('kw-country');
    const seedInput    = G('kw-seed');
    const triesBadge   = G('kw-tries');
    const usageGrid    = G('kw-usage');
    const genBtn       = G('kw-genbtn');
    const errorBox     = G('kw-error');
    const placeholder  = G('kw-placeholder');
    const skeletonEl   = G('kw-skeleton');
    const loadMsgEl    = G('kw-loadmsg');
    const resultsBody  = G('kw-results-body');
    const histWrap     = G('kw-hist-wrap');
    const histChips    = G('kw-hist-chips');
    const modal        = G('kw-modal');
    const modalReset   = G('kw-modal-reset');
    const toast        = G('kw-toast');
    const toastMsg     = G('kw-toast-msg');
    const searchInput  = G('kw-search');
    const totalBadge   = G('kw-total');

    if (!topicInput) return;
    const controller = new AbortController();
    const { signal } = controller;

    refreshQuota();
    renderHistory();

    async function refreshQuota() {
      try {
        const res = await fetch('/api/ai-quota?tool=keyword-generator', { cache: 'no-store' });
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

    // ─── Inputs ──────────────────────────────────────────────────────────────
    topicInput.addEventListener('input', () => {
      state.topic = topicInput.value.slice(0,200);
      if (topicInput.value.length>200) topicInput.value=state.topic;
      charCount.textContent = `${state.topic.length}/200`;
      charCount.style.color = state.topic.length>=180?'#f97316':'';
    });
    ctSel.addEventListener('change',      ()=>{ state.contentType=ctSel.value; });
    audSel.addEventListener('change',     ()=>{ state.audience=audSel.value; });
    countrySel.addEventListener('change', ()=>{ state.country=countrySel.value; });
    if (seedInput) seedInput.addEventListener('input', ()=>{ state.seed=seedInput.value; });


    // ─── FAQ ─────────────────────────────────────────────────────────────────
    root.querySelectorAll('.kw-faq-q').forEach(q=>{
      q.addEventListener('click',()=>{
        const item=q.closest('.kw-faq-item'), open=item.classList.contains('open');
        root.querySelectorAll('.kw-faq-item').forEach(i=>i.classList.remove('open'));
        if(!open) item.classList.add('open');
      });
      q.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();} });
    });

    // ─── Modal ───────────────────────────────────────────────────────────────
    G('kw-modal-cancel').addEventListener('click',  ()=>modal.style.display='none');
    G('kw-modal-upgrade').addEventListener('click', ()=>modal.style.display='none');
    modal.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal.style.display='none'; });

    // ─── Search filter ────────────────────────────────────────────────────────
    searchInput.addEventListener('input', ()=>{
      state.searchQuery = searchInput.value.toLowerCase();
      applyFilters();
    });

    // ─── Intent filter buttons ────────────────────────────────────────────────
    root.querySelectorAll('.kw-filter-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        root.querySelectorAll('.kw-filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.dataset.filter;
        applyFilters();
      });
    });

    // ─── Sort columns ─────────────────────────────────────────────────────────
    root.querySelectorAll('.kw-table th[data-sort]').forEach(th=>{
      th.addEventListener('click',()=>{
        const key = th.dataset.sort;
        if (state.sortKey===key) state.sortDir *= -1;
        else { state.sortKey=key; state.sortDir=1; }
        root.querySelectorAll('.kw-table th').forEach(t=>t.classList.remove('sorted'));
        th.classList.add('sorted');
        applyFilters();
      });
    });

    // ─── GENERATE ────────────────────────────────────────────────────────────
    genBtn.addEventListener('click', generate, { signal });

    async function generate() {
      if (!state.topic.trim()) { showError('Please enter a topic first'); return; }
      if (!state.authenticated) { showError('Connect your account to use Keyword Generator'); return; }
      if (state.quota.remaining <= 0) { showModal(); return; }

      clearError();
      setLoading(true);
      startMsgCycle();

      try {
        const res = await fetch('/api/generate-keywords', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            topic: state.topic.trim(),
            contentType: state.contentType,
            audience: state.audience,
            country: state.country,
            seed: state.seed.trim(),
          }),
        });

        const data = await res.json();

        if (res.status===401 || data.requiresAuth) {
          state.authenticated = false;
          await refreshQuota();
          throw new Error(data.error || 'Connect your account to use this tool');
        }
        if (res.status===429||data.error==='rate_limit') {
          if (data.quota) state.quota = data.quota;
          state.resetTime=data.reset||''; showModal(); return;
        }
        if (res.status===503) {
          alert('Server is busy right now. Please try again in a moment.');
          return;
        }
        if (!res.ok) throw new Error(data.error||'Generation failed');

        state.results = data.keywords;
        if (data.quota) {
          state.quota = data.quota;
          state.resetTime = data.quota.reset;
        }
        updateTries();
        saveHistory(state.topic.trim());
        renderHistory();
        applyFilters();
        renderResults();

      } catch(err) {
        showError(err.message||'Connection failed, please retry');
      } finally {
        stopMsgCycle(); setLoading(false);
      }
    }

    // ─── Loading ──────────────────────────────────────────────────────────────
    function setLoading(on) {
      state.loading=on;
      genBtn.disabled=on;
      topicInput.disabled=on;
      ctSel.disabled=on;
      audSel.disabled=on;
      countrySel.disabled=on;
      if(on){
        genBtn.innerHTML='<span class="kw-spin">◌</span><span>Researching…</span>';
        placeholder.style.display='none';
        resultsBody.classList.remove('show');
        skeletonEl.classList.add('show');
      } else {
        genBtn.innerHTML='<span>🔍</span><span>Generate Keywords</span>';
        skeletonEl.classList.remove('show');
        topicInput.disabled=false; ctSel.disabled=false;
        audSel.disabled=false; countrySel.disabled=false;
      }
    }
    function startMsgCycle() {
      state.msgIdx=0;
      if(loadMsgEl) loadMsgEl.textContent=LOAD_MSGS[0];
      state.msgTimer=setInterval(()=>{
        state.msgIdx=(state.msgIdx+1)%LOAD_MSGS.length;
        if(loadMsgEl) loadMsgEl.textContent=LOAD_MSGS[state.msgIdx];
      },1800);
    }
    function stopMsgCycle() { if(state.msgTimer){clearInterval(state.msgTimer);state.msgTimer=null;} }

    // ─── Filters & Sort ───────────────────────────────────────────────────────
    function applyFilters() {
      if (!state.results) return;
      const all = getAllKeywords();
      let filtered = [...all];

      if (state.activeFilter!=='all') {
        filtered = filtered.filter(k=>k.intent?.toLowerCase()===state.activeFilter.toLowerCase());
      }
      if (state.searchQuery) {
        filtered = filtered.filter(k=>k.keyword.toLowerCase().includes(state.searchQuery));
      }
      if (state.sortKey) {
        const order = {'High':3,'Medium':2,'Low':1,'Easy':3,'Medium':2,'Hard':1};
        filtered.sort((a,b)=>{
          const av = state.sortKey==='volume'?order[a.volume]||0:state.sortKey==='difficulty'?order[a.difficulty]||0:0;
          const bv = state.sortKey==='volume'?order[b.volume]||0:state.sortKey==='difficulty'?order[b.difficulty]||0:0;
          return (bv-av)*state.sortDir;
        });
      }
      state.filteredResults = filtered;
      if (totalBadge) totalBadge.textContent = `${filtered.length} keywords`;
      if (state.results) renderResults();
    }

    function getAllKeywords() {
      if (!state.results) return [];
      return [
        ...(state.results.short_tail||[]).map(k=>({...k,type:'Short-tail'})),
        ...(state.results.long_tail||[]).map(k=>({...k,type:'Long-tail'})),
        ...(state.results.lsi_keywords||[]).map(k=>({...k,type:'LSI'})),
        ...(state.results.questions||[]).map(k=>({...k,type:'Question'})),
      ];
    }

    // ─── Render results ───────────────────────────────────────────────────────
    function renderResults() {
      if (!state.results) return;
      const r = state.results;
      placeholder.style.display='none';
      skeletonEl.classList.remove('show');

      const isBest = k => k.volume==='High' && k.difficulty==='Easy';
      const allKws = getAllKeywords();
      const bestKws = allKws.filter(isBest).slice(0,5);

      // Best opportunities
      const bestEl = G('kw-best-section');
      if (bestEl) {
        if (bestKws.length) {
          bestEl.style.display='';
          const chipsEl = G('kw-best-chips');
          if(chipsEl) chipsEl.innerHTML = bestKws.map(k=>`<button class="kw-best-chip" data-kw="${escHtml(k.keyword)}">⭐ ${escHtml(k.keyword)}</button>`).join('');
          chipsEl && chipsEl.querySelectorAll('.kw-best-chip').forEach(b=>{
            b.addEventListener('click',()=>copyText(b.dataset.kw));
          });
        } else bestEl.style.display='none';
      }

      // Groups
      const groups = [
        { key:'short_tail',   label:'📊 Short-tail',      emoji:'📊', color:'#34D399' },
        { key:'long_tail',    label:'🎯 Long-tail',        emoji:'🎯', color:'#60a5fa' },
        { key:'lsi_keywords', label:'💡 LSI Keywords',     emoji:'💡', color:'#a78bfa' },
        { key:'questions',    label:'❓ Question Keywords', emoji:'❓', color:'#fbbf24' },
      ];

      const tableBody = G('kw-table-body');
      if (!tableBody) { resultsBody.classList.add('show'); return; }

      let rowsHtml = '';
      groups.forEach(g=>{
        const kws = (r[g.key]||[]);
        const displayKws = state.filteredResults
          ? state.filteredResults.filter(k=>k.type===g.label.replace(/^.+? /,''))
          : kws;

        if (!displayKws.length && state.filteredResults) return;

        rowsHtml += `<tr class="kw-group-row"><td colspan="5" style="padding:0.6rem 0.75rem 0.2rem;"><span style="font-family:var(--font-mono);font-size:0.72rem;color:${g.color};font-weight:600;">${g.label}</span><span style="font-family:var(--font-mono);font-size:0.66rem;color:var(--text-muted);margin-left:0.4rem;">${(state.filteredResults?displayKws:kws).length}</span></td></tr>`;

        (state.filteredResults ? displayKws : kws).forEach(k=>{
          const best = isBest(k);
          rowsHtml += `<tr class="${best?'best-row':''}">
            <td><div class="kw-kw-cell" data-kw="${escHtml(k.keyword)}">${best?'<span class="kw-star">⭐</span>':''}${escHtml(k.keyword)}<span class="copy-icon">⧉</span></div></td>
            <td><span class="kw-badge-v ${volClass(k.volume)}">${k.volume||'—'}</span></td>
            <td><span class="kw-badge-v ${diffClass(k.difficulty)}" title="${diffTip(k.difficulty)}">${k.difficulty||'—'}</span></td>
            <td><span class="kw-badge-v ${intentClass(k.intent)}">${k.intent||'—'}</span></td>
          </tr>`;
        });
      });

      tableBody.innerHTML = rowsHtml;

      // Click to copy
      tableBody.querySelectorAll('.kw-kw-cell').forEach(cell=>{
        cell.addEventListener('click',()=>copyText(cell.dataset.kw));
      });

      // Related topics
      const relEl = G('kw-related-chips');
      if (relEl && r.related_topics) {
        relEl.innerHTML = r.related_topics.map(t=>`<button class="kw-related-chip" data-t="${escHtml(t)}">🔗 ${escHtml(t)}</button>`).join('');
        relEl.querySelectorAll('.kw-related-chip').forEach(b=>{
          b.addEventListener('click',()=>{
            topicInput.value=b.dataset.t; state.topic=b.dataset.t;
            charCount.textContent=`${state.topic.length}/200`;
            topicInput.scrollIntoView({behavior:'smooth',block:'center'});
          });
        });
        G('kw-related-section').style.display='';
      }

      // Export buttons
      G('kw-export-row').style.display='flex';
      resultsBody.classList.add('show');
    }

    // ─── Badge helpers ────────────────────────────────────────────────────────
    function volClass(v) { return v==='High'?'v-high':v==='Medium'?'v-medium':'v-low'; }
    function diffClass(d) { return d==='Easy'?'d-easy':d==='Hard'?'d-hard':'d-medium'; }
    function diffTip(d) {
      if(d==='Easy') return 'Easy: Low competition, good chance to rank quickly';
      if(d==='Hard') return 'Hard: High competition, needs strong authority & backlinks';
      return 'Medium: Moderate competition, possible with quality content';
    }
    function intentClass(i='') {
      const l=i.toLowerCase();
      if(l.includes('info')) return 'i-info';
      if(l.includes('comm')) return 'i-comm';
      if(l.includes('trans')) return 'i-trans';
      return 'i-nav';
    }

    // ─── Export ───────────────────────────────────────────────────────────────
    G('kw-btn-copy-all').addEventListener('click',()=>{
      const kws = getAllKeywords().map(k=>k.keyword).join('\n');
      copyText(kws); showToast('✓ All keywords copied!');
    });
    G('kw-btn-csv').addEventListener('click',()=>{
      const rows = getAllKeywords();
      const csv = ['keyword,volume,difficulty,intent,type', ...rows.map(k=>`"${k.keyword}","${k.volume}","${k.difficulty}","${k.intent}","${k.type}"`)].join('\n');
      const blob = new Blob([csv],{type:'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=`keywords-${Date.now()}.csv`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      showToast('✓ CSV downloaded!');
    });
    G('kw-btn-ads').addEventListener('click',()=>{
      const kws = getAllKeywords().map(k=>k.keyword).join(', ');
      copyText(kws); showToast('✓ Copied for Google Ads!');
    });

    // ─── Tries ───────────────────────────────────────────────────────────────
    function updateTries() {
      const { used, remaining: rem, limit, reset } = state.quota;
      triesBadge.className='kw-tries';
      if (rem === null) {
        triesBadge.textContent = 'Loading quota...';
        genBtn.disabled = state.loading;
      } else if (!state.authenticated) {
        triesBadge.textContent = '🔐 Connect your account to start';
        genBtn.disabled = true;
      } else if(rem<=0){ triesBadge.className+=' red'; triesBadge.textContent=`🔴 Daily limit reached · resets in ${reset}`; genBtn.disabled=false; }
      else if(rem===1){ triesBadge.className+=' yellow'; triesBadge.textContent=`⚠️ ${rem}/${limit} tries remaining today`; genBtn.disabled=false; }
      else { triesBadge.className+=' green'; triesBadge.textContent=`✅ ${rem}/${limit} tries remaining today`; genBtn.disabled=false; }
      if (usageGrid) {
        usageGrid.innerHTML = `
          <div class="kw-usage-stat"><div class="kw-usage-k">Used Today</div><div class="kw-usage-v">${state.authenticated ? used : '-'}</div></div>
          <div class="kw-usage-stat"><div class="kw-usage-k">Remaining</div><div class="kw-usage-v">${rem}</div></div>
          <div class="kw-usage-stat"><div class="kw-usage-k">Total Daily</div><div class="kw-usage-v">${limit}</div></div>
        `;
      }
    }

    // ─── History ──────────────────────────────────────────────────────────────
    function renderHistory() {
      const h=getHistory();
      if(!h.length){ histWrap.style.display='none'; return; }
      histWrap.style.display='';
      histChips.innerHTML=h.map((t,i)=>`<button class="kw-hist-chip" data-i="${i}"><span>🕐</span><span>${escHtml(t)}</span></button>`).join('');
      histChips.querySelectorAll('.kw-hist-chip').forEach(b=>{
        b.addEventListener('click',()=>{
          const t=getHistory()[parseInt(b.dataset.i)];
          topicInput.value=t; state.topic=t;
          charCount.textContent=`${t.length}/200`;
        });
      });
    }

    // ─── Error / Toast ────────────────────────────────────────────────────────
    function showError(msg) { errorBox.innerHTML=`<span>⚠</span><span>${msg}</span>`; errorBox.style.display='flex'; topicInput.classList.add('err'); }
    function clearError() { errorBox.style.display='none'; topicInput.classList.remove('err'); }
    let toastTimer=null;
    function showToast(msg) {
      toastMsg.textContent=msg; toast.classList.add('show');
      if(toastTimer) clearTimeout(toastTimer);
      toastTimer=setTimeout(()=>toast.classList.remove('show'),2500);
    }
    function showModal() { if(state.resetTime) modalReset.textContent=`Resets in ${state.resetTime}`; modal.style.display='flex'; }

    // ─── Copy util ────────────────────────────────────────────────────────────
    function copyText(text) {
      navigator.clipboard.writeText(text).catch(()=>{
        const el=document.createElement('textarea'); el.value=text;
        document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
      });
      showToast('✓ Copied!');
    }
    function escHtml(s='') { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    return () => controller.abort();
  }, []);

  return (
    <div id="kw-root" className="kw-root">
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
      <section className="kw-hero">
        <div className="kw-hero-grid" aria-hidden="true" />
        <div className="kw-hero-glow" aria-hidden="true" />
        <div className="kw-hero-glow2" aria-hidden="true" />
        <div className="kw-hero-content">
          <div className="kw-badge">AI-Powered SEO Keyword Engine Active</div>
          <h1>Find Perfect<br /><span className="grad">SEO Keywords. Fast.</span></h1>
          <p className="kw-hero-sub">Generate short-tail, long-tail, LSI, and question keywords with volume, difficulty, and intent data — powered by Groq AI.</p>
          <div className="kw-hero-actions">
            <a href="#kw-generator" className="kw-btn-primary"><span>🔍 Start Researching</span></a>
            <a href="#kw-features" className="kw-btn-ghost"><span>See Features ↓</span></a>
          </div>
          <div className="kw-hero-stats">
            <div className="kw-stat"><div className="kw-stat-num">30</div><div className="kw-stat-label">Keywords / Run</div></div>
            <div className="kw-stat"><div className="kw-stat-num">4</div><div className="kw-stat-label">Keyword Types</div></div>
            <div className="kw-stat"><div className="kw-stat-num">10</div><div className="kw-stat-label">Free / Day</div></div>
          </div>
        </div>
      </section>

      {/* ── GENERATOR ── */}
      <section className="kw-section kw-gen" id="kw-generator">
        <div className="kw-section-inner">
          <div className="kw-gen-header">
            <div className="kw-label">🔑 Live Generator</div>
            <h2 className="kw-title">Generate Your Keywords</h2>
            <p className="kw-sub">Enter your topic, choose your context — get 30 targeted SEO keywords with intent data.</p>
          </div>

          <div className="kw-gen-layout">
            {/* Controls */}
            <div className="kw-card">
              <div>
                <label className="kw-ctrl-label" htmlFor="kw-topic">Topic / Niche</label>
                <input id="kw-topic" className="kw-input" type="text" placeholder="Enter your topic or niche…" maxLength={200} />
                <div className="kw-char-count" id="kw-charcount">0/200</div>
              </div>

              <div>
                <label className="kw-ctrl-label">Content Type</label>
                <select id="kw-ct" className="kw-select">
                  {CONTENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="kw-selects-2">
                <div>
                  <label className="kw-ctrl-label">Audience</label>
                  <select id="kw-aud" className="kw-select">
                    {AUDIENCES.map(a=><option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="kw-ctrl-label">Country</label>
                  <select id="kw-country" className="kw-select" defaultValue="India">
                    {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="kw-ctrl-label">Seed Keyword <span style={{opacity:0.5,fontSize:'0.65rem'}}>(optional)</span></label>
                <input id="kw-seed" className="kw-input" type="text" placeholder="Specific keyword to build around…" />
              </div>

              <div id="kw-error" className="kw-error-box" style={{display:'none'}} />

              <div id="kw-tries" className="kw-tries green">Loading quota...</div>
              <div id="kw-usage" className="kw-usage-grid" aria-live="polite">
                <div className="kw-usage-stat"><div className="kw-usage-k">Used Today</div><div className="kw-usage-v">0</div></div>
                <div className="kw-usage-stat"><div className="kw-usage-k">Remaining</div><div className="kw-usage-v">...</div></div>
                <div className="kw-usage-stat"><div className="kw-usage-k">Total Daily</div><div className="kw-usage-v">10</div></div>
              </div>

              <button id="kw-genbtn" className="kw-btn-gen">
                <span>🔍</span><span>Generate Keywords</span>
              </button>

              {/* History */}
              <div id="kw-hist-wrap" style={{display:'none'}}>
                <div className="kw-history-label">Recent Searches</div>
                <div id="kw-hist-chips" className="kw-history-chips" />
              </div>
            </div>

            {/* Results Panel */}
            <div className="kw-results-panel">
              <div className="kw-results-header">
                <div className="kw-live-badge">
                  <span className="kw-live-dot" />
                  LIVE RESULTS
                </div>
                <div className="kw-filter-row">
                  {['all','Informational','Commercial','Transactional'].map(f=>(
                    <button key={f} className={`kw-filter-btn${f==='all'?' active':''}`} data-filter={f}>
                      {f==='all'?'All':f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Placeholder */}
              <div id="kw-placeholder" className="kw-placeholder">
                <div className="dot-bg" aria-hidden="true" />
                <div className="kw-placeholder-inner">
                  <div className="kw-placeholder-icon">🔑</div>
                  <div className="kw-placeholder-text">Your keywords will appear here</div>
                </div>
              </div>

              {/* Skeleton */}
              <div id="kw-skeleton" className="kw-skeleton">
                <div id="kw-loadmsg" className="kw-loading-msg">🔍 Analyzing your niche…</div>
                {[...Array(3)].map((_,i)=>(
                  <div key={i}>
                    <div className="kw-skel-title" style={{animationDelay:`${i*100}ms`}} />
                    {[...Array(4)].map((_,j)=>(
                      <div key={j} className="kw-skel-row" style={{animationDelay:`${j*80}ms`}}>
                        <div className="kw-skel-cell" style={{width:'45%',animationDelay:`${j*80}ms`}} />
                        <div className="kw-skel-cell" style={{width:'12%'}} />
                        <div className="kw-skel-cell" style={{width:'12%'}} />
                        <div className="kw-skel-cell" style={{width:'18%'}} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Results body */}
              <div id="kw-results-body" className="kw-results-body">
                {/* Best Opportunities */}
                <div id="kw-best-section" className="kw-best" style={{display:'none'}}>
                  <div className="kw-best-title">⭐ Best Opportunities — High Volume + Easy Difficulty</div>
                  <div id="kw-best-chips" className="kw-best-chips" />
                </div>

                {/* Search + total */}
                <div className="kw-search-row">
                  <input id="kw-search" className="kw-search-input" type="text" placeholder="Filter keywords…" />
                  <span id="kw-total" className="kw-total-badge">0 keywords</span>
                </div>

                {/* Table */}
                <div className="kw-table-wrap">
                  <table className="kw-table">
                    <thead>
                      <tr>
                        <th>Keyword</th>
                        <th data-sort="volume">Volume <span className="sort-icon">↕</span></th>
                        <th data-sort="difficulty">Difficulty <span className="sort-icon">↕</span></th>
                        <th>Intent</th>
                      </tr>
                    </thead>
                    <tbody id="kw-table-body" />
                  </table>
                </div>

                {/* Related topics */}
                <div id="kw-related-section" style={{display:'none'}} className="kw-related">
                  <div className="kw-related-title">🔗 Related Topics to Explore</div>
                  <div id="kw-related-chips" className="kw-related-chips" />
                </div>

                {/* Export */}
                <div id="kw-export-row" className="kw-export-row" style={{display:'none'}}>
                  <button id="kw-btn-csv" className="kw-exp-btn kw-exp-primary">📥 Export CSV</button>
                  <button id="kw-btn-copy-all" className="kw-exp-btn kw-exp-ghost">📋 Copy All</button>
                  <button id="kw-btn-ads" className="kw-exp-btn kw-exp-ghost">📢 Copy for Ads</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="kw-section" id="kw-features">
        <div className="kw-section-inner">
          <div className="kw-label">✦ Why Choose Us</div>
          <h2 className="kw-title">Built for SEO & Content Teams</h2>
          <p className="kw-sub">Everything you need to research and target the right keywords — fast.</p>
          <div className="kw-features-grid">
            {[
              { icon:'🤖', title:'Groq Llama AI',        desc:'Uses Llama 3.3 70B via Groq\'s ultra-fast inference to generate accurate, niche-specific keyword data in seconds.' },
              { icon:'📊', title:'4 Keyword Types',       desc:'Short-tail, long-tail, LSI, and question keywords in one run — the complete keyword research package.' },
              { icon:'⭐', title:'Best Opportunities',    desc:'Automatically highlights high-volume, easy-difficulty keywords — your fastest path to ranking on page one.' },
              { icon:'📥', title:'CSV Export',            desc:'Download all keywords as a CSV with volume, difficulty, intent, and type columns — ready for your SEO tools.' },
              { icon:'🎯', title:'Intent Classification', desc:'Every keyword is labeled Informational, Commercial, or Transactional — so you create content that converts.' },
              { icon:'🔗', title:'Related Topics',        desc:'Discover adjacent niches and topics to expand your content strategy beyond your initial search.' },
            ].map((f,i)=>(
              <article className="kw-feat-card" key={i}>
                <div className="kw-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="kw-section kw-section-alt" id="kw-how">
        <div className="kw-section-inner">
          <div className="kw-label">◎ Process</div>
          <h2 className="kw-title">How It Works</h2>
          <p className="kw-sub">From topic to full keyword list in under 15 seconds.</p>
          <div className="kw-hiw-steps">
            {[
              { n:'01', icon:'✍️', title:'Enter Your Topic',    desc:'Type your niche, product, or content topic — up to 200 characters.' },
              { n:'02', icon:'⚙️', title:'Set Your Context',    desc:'Choose content type, target audience, and country for localized keyword results.' },
              { n:'03', icon:'🤖', title:'AI Researches',       desc:'Groq AI generates 30 keywords across 4 categories with volume, difficulty, and intent data.' },
              { n:'04', icon:'📥', title:'Export & Optimize',  desc:'Filter by intent, sort by difficulty, highlight best opportunities, and export as CSV.' },
            ].map((s,i)=>(
              <div className="kw-step" key={i}>
                <div className="kw-step-num">{s.n}</div>
                <div className="kw-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="kw-section" id="kw-cases">
        <div className="kw-section-inner">
          <div className="kw-label">◻ Applications</div>
          <h2 className="kw-title">Who Uses This Tool</h2>
          <p className="kw-sub">From solo bloggers to marketing agencies — keyword research for everyone.</p>
          <div className="kw-cases-grid">
            {[
              { tag:'kw-tag-g', label:'Bloggers',     title:'Blog Content Strategy',   desc:'Find low-competition keywords to rank new articles quickly and build organic traffic from day one.' },
              { tag:'kw-tag-b', label:'YouTubers',    title:'Video SEO',               desc:'Discover question-format keywords that people search for, then create videos that answer them directly.' },
              { tag:'kw-tag-p', label:'E-commerce',   title:'Product Page Optimization',desc:'Target commercial and transactional keywords to attract buyers who are ready to purchase.' },
              { tag:'kw-tag-g', label:'Agencies',     title:'Client SEO Campaigns',    desc:'Rapidly generate keyword lists for multiple client niches — export as CSV and import directly to tools.' },
              { tag:'kw-tag-b', label:'Freelancers',  title:'Content Writing Briefs',  desc:'Build comprehensive briefs with LSI keywords and related topics to ensure full topical coverage.' },
              { tag:'kw-tag-p', label:'Startups',     title:'Landing Page Copy',       desc:'Identify high-intent commercial keywords for landing pages that convert visitors into customers.' },
            ].map((c,i)=>(
              <article className="kw-case-card" key={i}>
                <div className={`kw-case-tag ${c.tag}`}>{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="kw-section kw-section-alt" id="kw-faq">
        <div className="kw-section-inner">
          <div style={{textAlign:'center'}}>
            <div className="kw-label">❓ Questions</div>
            <h2 className="kw-title">Frequently Asked</h2>
            <p className="kw-sub" style={{margin:'0 auto'}}>Everything about the SEO Keyword Generator.</p>
          </div>
          <div className="kw-faq-list">
            {[
              { q:'Is this keyword data from real search engines?',    a:'The data is AI-estimated using Llama 3.3 70B\'s knowledge of SEO patterns. Volume is High/Medium/Low and difficulty is Easy/Medium/Hard. For exact search volume numbers, verify in Google Search Console or Ahrefs.' },
              { q:'What is the difference between the keyword types?', a:'Short-tail are 1-2 word broad terms. Long-tail are specific 3-6 word phrases with clearer intent. LSI (Latent Semantic Indexing) are related terms that help search engines understand your topic context. Questions are how/what/why queries great for FAQ and featured snippet targeting.' },
              { q:'What does keyword difficulty mean?',                a:'Easy means low competition — you can likely rank with good content alone. Medium requires quality content and some backlinks. Hard means you\'ll need strong domain authority and a solid link-building strategy.' },
              { q:'Can I use the CSV with paid SEO tools?',            a:'Yes. The CSV format is compatible with most SEO tools. For Google Ads specifically, use the "Copy for Ads" button which formats keywords as a comma-separated list.' },
              { q:'How accurate are the volume estimates?',            a:'Volume is estimated as High (10K+ monthly searches), Medium (1K–10K), or Low (under 1K). These are directional signals. For precise data, cross-reference with Google Keyword Planner or Ahrefs.' },
              { q:'What is a seed keyword?',                           a:'A seed keyword is a specific term you want the AI to focus around. For example, if your topic is "fitness" and your seed is "home workout", all generated keywords will be closely related to home workouts specifically.' },
            ].map((f,i)=>(
              <div className="kw-faq-item" key={i}>
                <div className="kw-faq-q" role="button" tabIndex={0} aria-expanded="false">
                  {f.q}<span className="kw-faq-arrow">⌄</span>
                </div>
                <div className="kw-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="kw-footer">
        <div className="kw-footer-inner">
          <div className="kw-footer-logo">
            <div className="kw-footer-logo-icon">🔑</div>
            Keyword Generator
          </div>
          <p className="kw-footer-sub">AI-powered SEO keyword research. Fast, free, and actionable.</p>
          <ul className="kw-footer-links">
            <li><a href="#kw-generator">Generator</a></li>
            <li><a href="#kw-features">Features</a></li>
            <li><a href="#kw-cases">Use Cases</a></li>
            <li><a href="#kw-faq">FAQ</a></li>
          </ul>
          <p className="kw-footer-copy">Daily free credits · No tracking · Data never stored</p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <div id="kw-modal" className="kw-modal-bg" style={{display:'none'}}>
        <div className="kw-modal" onClick={e=>e.stopPropagation()}>
          <div className="kw-modal-icon">🔒</div>
          <h3>Daily Limit Reached</h3>
          <p>You have used all 10 free uses for today. Come back tomorrow for more!</p>
          <p className="kw-modal-reset" id="kw-modal-reset" />
          <div className="kw-modal-btns">
            <button id="kw-modal-upgrade" className="kw-modal-cancel">Got it</button>
            <button id="kw-modal-cancel" className="kw-modal-cancel">Close</button>
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      <div id="kw-toast" className="kw-toast">
        <span className="kw-toast-icon">✓</span>
        <span id="kw-toast-msg">Done!</span>
      </div>
    </div>
  );
}
