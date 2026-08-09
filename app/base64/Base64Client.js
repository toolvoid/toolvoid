'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.b64-root *, .b64-root *::before, .b64-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.b64-root {
  --bg: #07070F; --bg2: #0B0B18; --bg3: #0F0F1E; --card: #0D0D1B;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12);
  --text: #E8E8F4; --text-muted: #5C5C78; --text-dim: #8888A8;
  --purple: #C77DFF; --purple-dim: rgba(199,125,255,0.1); --purple-border: rgba(199,125,255,0.2);
  --green: #86EFAC; --green-dim: rgba(134,239,172,0.1); --green-border: rgba(134,239,172,0.2);
  --blue: #60A5FA; --blue-dim: rgba(96,165,250,0.08); --blue-border: rgba(96,165,250,0.2);
  --amber: #F59E0B; --amber-dim: rgba(245,158,11,0.1);
  --red: #FF6B7A; --red-dim: rgba(255,107,122,0.1);
  --shadow: 0 4px 24px rgba(0,0,0,0.5); --shadow-lg: 0 12px 48px rgba(0,0,0,0.7);
  --radius: 14px; --radius-sm: 8px; --radius-xs: 6px;
  --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Syne', sans-serif; --font-body: 'Instrument Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  font-family: var(--font-body); background: var(--bg); color: var(--text);
  line-height: 1.6; overflow-x: hidden;
}
.b64-root.light {
  --bg: #F2F4F8; --bg2: #E9ECF3; --bg3: #DEE2EC; --card: #FFFFFF;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.14);
  --text: #0A0A1A; --text-muted: #8888A0; --text-dim: #5A5A72;
  --purple: #9333EA; --purple-dim: rgba(147,51,234,0.08); --purple-border: rgba(147,51,234,0.2);
  --green: #16A34A; --green-dim: rgba(22,163,74,0.08); --green-border: rgba(22,163,74,0.2);
  --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.15);
}
.b64-root a { color: inherit; text-decoration: none; }
.b64-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.b64-root ::selection { background: var(--purple-dim); color: var(--purple); }
.b64-root ::-webkit-scrollbar { width: 5px; }
.b64-root ::-webkit-scrollbar-track { background: var(--bg); }
.b64-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* NAV */
.b64-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(7,7,15,0.75); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); }
.b64-root.light .b64-nav { background: rgba(242,244,248,0.8); }
.b64-nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.15rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.b64-logo-mark { background: linear-gradient(135deg, var(--purple), var(--green)); color: #07070F; padding: 0.1em 0.4em; border-radius: 5px; font-size: 0.82em; }
.b64-root.light .b64-logo-mark { color: #fff; }
.b64-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.b64-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--transition); }
.b64-nav-links a:hover { color: var(--text); }
.b64-nav-right { display: flex; align-items: center; gap: 1rem; }
.b64-theme-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all var(--transition); }
.b64-theme-btn:hover { border-color: var(--purple); color: var(--purple); }
.b64-nav-cta { padding: 0.45rem 1.1rem; background: var(--purple); color: #07070F; border-radius: 99px; font-size: 0.85rem; font-weight: 700; transition: all var(--transition); }
.b64-root.light .b64-nav-cta { color: #fff; }
.b64-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

/* HERO */
.b64-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.b64-hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.b64-hero-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(199,125,255,0.07) 0%, transparent 70%); pointer-events: none; }
.b64-hero-glow-2 { position: absolute; top: 60%; left: 65%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(134,239,172,0.05) 0%, transparent 70%); pointer-events: none; }
.b64-hero-content { position: relative; z-index: 1; max-width: 800px; }
.b64-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--purple-dim); border: 1px solid var(--purple-border); border-radius: 99px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--purple); letter-spacing: 0.04em; margin-bottom: 2rem; animation: b64FadeUp 0.6s ease both; }
.b64-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: b64Pulse 2s ease-in-out infinite; }
@keyframes b64Pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
@keyframes b64FadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.b64-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem, 7vw, 5.2rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: b64FadeUp 0.7s 0.1s ease both; }
.b64-hero h1 .accent { background: linear-gradient(135deg, var(--purple), var(--green)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.b64-hero-sub { font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--text-dim); max-width: 540px; margin: 0 auto 2.5rem; line-height: 1.7; animation: b64FadeUp 0.7s 0.2s ease both; }
.b64-hero-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: b64FadeUp 0.7s 0.3s ease both; }
.b64-btn-primary { padding: 0.75rem 1.8rem; background: var(--purple); color: #07070F; border-radius: 99px; font-weight: 700; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px rgba(199,125,255,0.2); }
.b64-root.light .b64-btn-primary { color: #fff; }
.b64-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(199,125,255,0.35); }
.b64-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.b64-btn-ghost:hover { border-color: var(--purple); color: var(--purple); transform: translateY(-2px); }
.b64-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: b64FadeUp 0.7s 0.4s ease both; }
.b64-hero-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; }
.b64-hero-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

/* SECTION */
.b64-section { padding: 6rem 1.5rem; }
.b64-section-inner { max-width: 1100px; margin: 0 auto; }
.b64-section-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--purple); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.b64-section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.b64-section-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }
.b64-divider { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

/* TABS */
.b64-tabs { display: flex; gap: 0.35rem; border-bottom: 1px solid var(--border); margin-bottom: 1.75rem; overflow-x: auto; scrollbar-width: none; }
.b64-tabs::-webkit-scrollbar { display: none; }
.b64-tab { padding: 0.65rem 1.1rem; font-size: 0.88rem; font-weight: 600; color: var(--text-dim); border-bottom: 2px solid transparent; transition: all var(--transition); white-space: nowrap; }
.b64-tab:hover { color: var(--text); }
.b64-tab.active { color: var(--purple); border-bottom-color: var(--purple); }

/* TOOL CARD */
.b64-tool-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); }
.b64-tool-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.b64-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: b64Live 1.5s ease-in-out infinite; }
@keyframes b64Live { 0%,100%{box-shadow:0 0 0 0 rgba(199,125,255,0.5)} 50%{box-shadow:0 0 0 5px rgba(199,125,255,0)} }

/* MODE TOGGLE */
.b64-mode-row { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; flex-wrap: wrap; align-items: center; }
.b64-mode-btn { padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: 99px; font-size: 0.82rem; font-weight: 600; color: var(--text-dim); transition: all var(--transition); }
.b64-mode-btn.active { border-color: var(--purple-border); background: var(--purple-dim); color: var(--purple); }
.b64-auto-badge { margin-left: auto; padding: 0.3rem 0.75rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.72rem; border: 1px solid; transition: all var(--transition); }
.b64-auto-badge.encode { border-color: var(--purple-border); color: var(--purple); background: var(--purple-dim); }
.b64-auto-badge.decode { border-color: var(--green-border); color: var(--green); background: var(--green-dim); }

/* TEXTAREA */
.b64-textarea { width: 100%; background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius-sm); padding: 0.9rem 1rem; font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); outline: none; resize: vertical; min-height: 110px; transition: border-color var(--transition); }
.b64-textarea:focus { border-color: var(--purple); }
.b64-textarea.invalid { border-color: var(--red); }
.b64-textarea::placeholder { color: var(--text-muted); }

/* OPTIONS */
.b64-opts-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.75rem 0; }
.b64-opt-chip { display: flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.75rem; border: 1px solid var(--border); border-radius: 99px; font-size: 0.78rem; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all var(--transition); }
.b64-opt-chip:hover { border-color: var(--border-hi); color: var(--text); }
.b64-opt-chip.active { border-color: var(--purple-border); color: var(--purple); background: var(--purple-dim); }
.b64-opt-chip .check { font-size: 0.7rem; color: var(--purple); }

/* ARROW */
.b64-arrow-row { display: flex; justify-content: center; align-items: center; gap: 0.75rem; margin: 0.75rem 0; }
.b64-arrow-btn { padding: 0.4rem 1rem; border: 1px solid var(--border-hi); border-radius: 99px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); transition: all var(--transition); }
.b64-arrow-btn:hover { border-color: var(--purple-border); color: var(--purple); }
.b64-arrow { color: var(--text-muted); font-size: 1.1rem; }

/* STATS BAR */
.b64-stats-bar { display: flex; gap: 1rem; flex-wrap: wrap; padding: 0.75rem 1rem; background: var(--bg2); border-radius: var(--radius-xs); border: 1px solid var(--border); font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-top: 0.75rem; }
.b64-stats-bar span { color: var(--text-dim); }
.b64-stats-bar strong { color: var(--text); }

/* SIZE BAR */
.b64-size-bars { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.75rem; }
.b64-size-bar-row { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem; }
.b64-size-bar-label { width: 50px; color: var(--text-muted); flex-shrink: 0; }
.b64-size-bar-track { flex: 1; height: 6px; background: var(--bg2); border-radius: 99px; overflow: hidden; }
.b64-size-bar-fill { height: 100%; border-radius: 99px; transition: width 0.3s ease; }
.b64-size-bar-val { width: 50px; text-align: right; color: var(--text-dim); flex-shrink: 0; }

/* ACTION BUTTONS */
.b64-action-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
.b64-action-btn { display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border: 1px solid var(--border-hi); border-radius: var(--radius-sm); font-size: 0.83rem; font-weight: 500; color: var(--text-dim); transition: all var(--transition); }
.b64-action-btn:hover { border-color: var(--purple-border); color: var(--purple); }
.b64-action-btn.primary { background: var(--purple); border-color: var(--purple); color: #07070F; font-weight: 700; }
.b64-root.light .b64-action-btn.primary { color: #fff; }
.b64-action-btn.primary:hover { opacity: 0.85; transform: translateY(-1px); }
.b64-action-btn.success { border-color: var(--green-border); color: var(--green); background: var(--green-dim); }

/* VALIDATION */
.b64-valid-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-family: var(--font-mono); font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 99px; }
.b64-valid-badge.ok { background: var(--green-dim); color: var(--green); border: 1px solid var(--green-border); }
.b64-valid-badge.bad { background: var(--red-dim); color: var(--red); border: 1px solid rgba(255,107,122,0.2); }

/* DROP ZONE */
.b64-drop-zone { border: 2px dashed var(--border-hi); border-radius: var(--radius); padding: 3rem 2rem; text-align: center; cursor: pointer; transition: all var(--transition); }
.b64-drop-zone:hover, .b64-drop-zone.dragover { border-color: var(--purple); background: var(--purple-dim); }
.b64-drop-zone-icon { font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.4; }
.b64-drop-zone p { font-size: 0.9rem; color: var(--text-dim); }
.b64-drop-zone span { color: var(--purple); font-weight: 600; }

/* IMAGE PREVIEW */
.b64-img-preview { border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1rem; background: var(--bg2); margin-bottom: 1rem; }
.b64-img-preview img { max-width: 100%; max-height: 200px; object-fit: contain; border-radius: 4px; display: block; margin: 0 auto; }
.b64-img-meta { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); }

/* EXTRA TOOLS SUB TABS */
.b64-sub-tabs { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.b64-sub-tab { padding: 0.35rem 0.85rem; border: 1px solid var(--border); border-radius: 99px; font-size: 0.8rem; font-family: var(--font-mono); font-weight: 500; color: var(--text-muted); transition: all var(--transition); }
.b64-sub-tab.active { border-color: var(--purple-border); color: var(--purple); background: var(--purple-dim); }

/* HASH OUTPUT */
.b64-hash-out { background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--green); word-break: break-all; line-height: 1.6; min-height: 48px; }

/* HISTORY */
.b64-hist-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg2); margin-bottom: 0.4rem; font-family: var(--font-mono); font-size: 0.8rem; cursor: pointer; transition: all var(--transition); }
.b64-hist-item:hover { border-color: var(--purple-border); }
.b64-hist-type { font-size: 0.7rem; padding: 0.15rem 0.45rem; border-radius: 4px; background: var(--purple-dim); color: var(--purple); flex-shrink: 0; }
.b64-hist-preview { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-dim); }

/* FEATURES */
.b64-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.b64-feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--transition); position: relative; overflow: hidden; }
.b64-feature-card::before { content: ''; position: absolute; inset: 0; background: var(--purple-dim); opacity: 0; transition: opacity var(--transition); }
.b64-feature-card:hover::before { opacity: 1; }
.b64-feature-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.b64-feature-icon { width: 44px; height: 44px; background: var(--purple-dim); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1.1rem; }
.b64-feature-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.b64-feature-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* HOW IT WORKS */
.b64-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.b64-hiw-steps::before { content: ''; position: absolute; top: 2.5rem; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border-hi), transparent); }
.b64-hiw-step { text-align: center; }
.b64-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--purple); opacity: 0.15; line-height: 1; margin-bottom: 0.75rem; }
.b64-step-icon { width: 52px; height: 52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 1rem; }
.b64-hiw-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.b64-hiw-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* USE CASES */
.b64-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.b64-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--transition); }
.b64-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.b64-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.6rem; border-radius: 99px; margin-bottom: 0.9rem; letter-spacing: 0.04em; }
.b64-tag-purple { background: var(--purple-dim); color: var(--purple); }
.b64-tag-green { background: var(--green-dim); color: var(--green); }
.b64-tag-blue { background: var(--blue-dim); color: var(--blue); }
.b64-case-card h3 { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.b64-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* FAQ */
.b64-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.b64-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; }
.b64-faq-item.open { border-color: var(--border-hi); }
.b64-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--transition); gap: 1rem; }
.b64-faq-q:hover { color: var(--purple); }
.b64-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.b64-faq-item.open .b64-faq-arrow { transform: rotate(180deg); color: var(--purple); }
.b64-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; }
.b64-faq-item.open .b64-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

/* FOOTER */
.b64-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.b64-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.b64-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin: 1.5rem 0; list-style: none; }
.b64-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--transition); }
.b64-footer-links a:hover { color: var(--purple); }
.b64-footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }

/* TOAST */
.b64-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.75rem 1.25rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.6rem; transform: translateY(100px); opacity: 0; transition: all 0.3s ease; pointer-events: none; }
.b64-toast.show { transform: translateY(0); opacity: 1; }
.b64-toast-icon { color: var(--purple); }

@media(max-width: 640px) {
  .b64-nav-links { display: none; }
  .b64-hero-stats { gap: 1.5rem; }
  .b64-hiw-steps::before { display: none; }
}
`;

/* ─── Pure JS MD5 ─────────────────────────────────────────────────────── */
function md5(str) {
  function safeAdd(x, y) { const lsw = (x & 0xFFFF) + (y & 0xFFFF); return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xFFFF); }
  function bitRotateLeft(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function md5cmn(q, a, b, x, s, t) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function md5ff(a,b,c,d,x,s,t){ return md5cmn((b&c)|((~b)&d),a,b,x,s,t); }
  function md5gg(a,b,c,d,x,s,t){ return md5cmn((b&d)|(c&(~d)),a,b,x,s,t); }
  function md5hh(a,b,c,d,x,s,t){ return md5cmn(b^c^d,a,b,x,s,t); }
  function md5ii(a,b,c,d,x,s,t){ return md5cmn(c^(b|(~d)),a,b,x,s,t); }
  const m = unescape(encodeURIComponent(str));
  const l = m.length;
  const w = Array(l >> 2).fill(0);
  for (let i = 0; i < l * 8; i += 8) w[i >> 5] |= (m.charCodeAt(i / 8) & 0xFF) << (i % 32);
  w[l * 8 / 32] |= 0x80 << (l * 8) % 32;
  w[(((l * 8 + 64) >>> 9) << 4) + 14] = l * 8;
  let a=1732584193, b=-271733879, c=-1732584194, d=271733878;
  for (let i = 0; i < w.length; i += 16) {
    const [oa,ob,oc,od]=[a,b,c,d];
    a=md5ff(a,b,c,d,w[i+0],7,-680876936); d=md5ff(d,a,b,c,w[i+1],12,-389564586); c=md5ff(c,d,a,b,w[i+2],17,606105819); b=md5ff(b,c,d,a,w[i+3],22,-1044525330);
    a=md5ff(a,b,c,d,w[i+4],7,-176418897); d=md5ff(d,a,b,c,w[i+5],12,1200080426); c=md5ff(c,d,a,b,w[i+6],17,-1473231341); b=md5ff(b,c,d,a,w[i+7],22,-45705983);
    a=md5ff(a,b,c,d,w[i+8],7,1770035416); d=md5ff(d,a,b,c,w[i+9],12,-1958414417); c=md5ff(c,d,a,b,w[i+10],17,-42063); b=md5ff(b,c,d,a,w[i+11],22,-1990404162);
    a=md5ff(a,b,c,d,w[i+12],7,1804603682); d=md5ff(d,a,b,c,w[i+13],12,-40341101); c=md5ff(c,d,a,b,w[i+14],17,-1502002290); b=md5ff(b,c,d,a,w[i+15],22,1236535329);
    a=md5gg(a,b,c,d,w[i+1],5,-165796510); d=md5gg(d,a,b,c,w[i+6],9,-1069501632); c=md5gg(c,d,a,b,w[i+11],14,643717713); b=md5gg(b,c,d,a,w[i+0],20,-373897302);
    a=md5gg(a,b,c,d,w[i+5],5,-701558691); d=md5gg(d,a,b,c,w[i+10],9,38016083); c=md5gg(c,d,a,b,w[i+15],14,-660478335); b=md5gg(b,c,d,a,w[i+4],20,-405537848);
    a=md5gg(a,b,c,d,w[i+9],5,568446438); d=md5gg(d,a,b,c,w[i+14],9,-1019803690); c=md5gg(c,d,a,b,w[i+3],14,-187363961); b=md5gg(b,c,d,a,w[i+8],20,1163531501);
    a=md5gg(a,b,c,d,w[i+13],5,-1444681467); d=md5gg(d,a,b,c,w[i+2],9,-51403784); c=md5gg(c,d,a,b,w[i+7],14,1735328473); b=md5gg(b,c,d,a,w[i+12],20,-1926607734);
    a=md5hh(a,b,c,d,w[i+5],4,-378558); d=md5hh(d,a,b,c,w[i+8],11,-2022574463); c=md5hh(c,d,a,b,w[i+11],16,1839030562); b=md5hh(b,c,d,a,w[i+14],23,-35309556);
    a=md5hh(a,b,c,d,w[i+1],4,-1530992060); d=md5hh(d,a,b,c,w[i+4],11,1272893353); c=md5hh(c,d,a,b,w[i+7],16,-155497632); b=md5hh(b,c,d,a,w[i+10],23,-1094730640);
    a=md5hh(a,b,c,d,w[i+13],4,681279174); d=md5hh(d,a,b,c,w[i+0],11,-358537222); c=md5hh(c,d,a,b,w[i+3],16,-722521979); b=md5hh(b,c,d,a,w[i+6],23,76029189);
    a=md5hh(a,b,c,d,w[i+9],4,-640364487); d=md5hh(d,a,b,c,w[i+12],11,-421815835); c=md5hh(c,d,a,b,w[i+15],16,530742520); b=md5hh(b,c,d,a,w[i+2],23,-995338651);
    a=md5ii(a,b,c,d,w[i+0],6,-198630844); d=md5ii(d,a,b,c,w[i+7],10,1126891415); c=md5ii(c,d,a,b,w[i+14],15,-1416354905); b=md5ii(b,c,d,a,w[i+5],21,-57434055);
    a=md5ii(a,b,c,d,w[i+12],6,1700485571); d=md5ii(d,a,b,c,w[i+3],10,-1894986606); c=md5ii(c,d,a,b,w[i+10],15,-1051523); b=md5ii(b,c,d,a,w[i+1],21,-2054922799);
    a=md5ii(a,b,c,d,w[i+8],6,1873313359); d=md5ii(d,a,b,c,w[i+15],10,-30611744); c=md5ii(c,d,a,b,w[i+6],15,-1560198380); b=md5ii(b,c,d,a,w[i+13],21,1309151649);
    a=md5ii(a,b,c,d,w[i+4],6,-145523070); d=md5ii(d,a,b,c,w[i+11],10,-1120210379); c=md5ii(c,d,a,b,w[i+2],15,718787259); b=md5ii(b,c,d,a,w[i+9],21,-343485551);
    a=safeAdd(a,oa); b=safeAdd(b,ob); c=safeAdd(c,oc); d=safeAdd(d,od);
  }
  const hex = (n) => ('0000000' + ((n < 0 ? n + 0x100000000 : n) >>> 0).toString(16)).slice(-8);
  return [a,b,c,d].map(n => hex(n).match(/../g).reverse().join('')).join('');
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function encodeB64(text, urlSafe, noPad, wrapLines, upper) {
  try {
    const bytes = new TextEncoder().encode(text);
    let bin = '';
    bytes.forEach(b => bin += String.fromCharCode(b));
    let r = btoa(bin);
    if (urlSafe) r = r.replace(/\+/g, '-').replace(/\//g, '_');
    if (noPad) r = r.replace(/=/g, '');
    if (wrapLines) r = r.match(/.{1,76}/g)?.join('\n') || r;
    if (upper) r = r.toUpperCase();
    return r;
  } catch (e) { return 'Encoding error: ' + e.message; }
}
function decodeB64(b64) {
  try {
    const clean = b64.replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(clean);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch { return 'Invalid Base64 string'; }
}
function isValidB64(str) {
  try { const c = str.replace(/\s/g,'').replace(/-/g,'+').replace(/_/g,'/'); return /^[A-Za-z0-9+/]*={0,2}$/.test(c); } catch { return false; }
}
function urlEncode(s){ try{ return encodeURIComponent(s); } catch{ return s; } }
function urlDecode(s){ try{ return decodeURIComponent(s); } catch{ return 'Decode error'; } }
function htmlEncode(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function htmlDecode(s){ return s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'"); }
function textToHex(s){ return Array.from(s).map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(' '); }
function hexToText(h){ try{ return h.replace(/0x/gi,'').split(/[\s,]+/).map(x=>x.trim()).filter(Boolean).map(x=>String.fromCharCode(parseInt(x,16))).join(''); } catch{ return 'Invalid hex'; } }
function textToBin(s){ return Array.from(s).map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '); }
function binToText(b){ try{ return b.split(/\s+/).filter(Boolean).map(x=>String.fromCharCode(parseInt(x,2))).join(''); } catch{ return 'Invalid binary'; } }
async function hashText(text, algo) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function fmtSize(b){ if(b<1024)return b+'B'; if(b<1048576)return (b/1024).toFixed(1)+'KB'; return (b/1048576).toFixed(2)+'MB'; }

/* ─── Component ──────────────────────────────────────────────────────── */
export default function Base64Encoder() {
  const isDark = true;
  const [tab, setTab] = useState('text');
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);
  const [noPad, setNoPad] = useState(false);
  const [upper, setUpper] = useState(false);
  const output = useMemo(() => {
    if (!input.trim()) return '';
    if (mode === 'encode') {
      return encodeB64(input, urlSafe, noPad, wrapLines, upper);
    }
    const ok = isValidB64(input);
    return ok ? decodeB64(input) : 'Invalid Base64 — check for invalid characters';
  }, [input, mode, noPad, upper, urlSafe, wrapLines]);
  const isValid = useMemo(() => {
    if (!input.trim() || mode === 'encode') return null;
    return isValidB64(input);
  }, [input, mode]);
  const [imagePreview, setImagePreview] = useState('');
  const [imageB64, setImageB64] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [fileB64, setFileB64] = useState('');
  const [imgDecodeInput, setImgDecodeInput] = useState('');
  const [imgDecodePreviewInput, setImgDecodePreviewInput] = useState('');
  const [extraTool, setExtraTool] = useState('url');
  const [extraIn, setExtraIn] = useState('');
  const extraOut = useMemo(() => {
    if (!extraIn) return '';
    if (extraTool === 'url') return urlEncode(extraIn);
    if (extraTool === 'urlDec') return urlDecode(extraIn);
    if (extraTool === 'html') return htmlEncode(extraIn);
    if (extraTool === 'htmlDec') return htmlDecode(extraIn);
    if (extraTool === 'hex') return textToHex(extraIn);
    if (extraTool === 'hexDec') return hexToText(extraIn);
    if (extraTool === 'bin') return textToBin(extraIn);
    if (extraTool === 'binDec') return binToText(extraIn);
    return '';
  }, [extraIn, extraTool]);
  const [hashAlgo, setHashAlgo] = useState('SHA-256');
  const hashOut = useMemo(() => {
    if (!extraIn || !['SHA-1','SHA-256','SHA-384','SHA-512'].includes(hashAlgo)) {
      return hashAlgo === 'MD5' && extraIn ? md5(extraIn) : '';
    }
    return '';
  }, [extraIn, hashAlgo]);
  const [copiedKey, setCopiedKey] = useState('');
  const [toast, setToast] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const h = localStorage.getItem('b64_history');
      return h ? JSON.parse(h) : [];
    } catch {
      return [];
    }
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(id);
  }, []);

  /* Auto-detect */
  const autoMode = input.trim() ? (isValidB64(input.trim()) ? 'decode' : 'encode') : null;

  /* Copy */
  const toastTimerRef = useRef(null);
  const showToast = (msg) => { setToast(msg); clearTimeout(toastTimerRef.current); toastTimerRef.current = setTimeout(() => setToast(''), 2500); };
  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); setCopiedKey(key); showToast('Copied!'); setTimeout(() => setCopiedKey(''), 2000); } catch {}
  };

  /* Download text */
  const downloadTxt = (content, name) => {
    const b = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; a.click();
  };

  /* Image upload */
  const handleImageFile = async (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { showToast('File too large — max 10MB'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const full = e.target.result;
      const b64only = full.split(',')[1];
      setImagePreview(full);
      setImageB64(b64only);
      const img = new Image();
      img.onload = () => setFileInfo({ name: file.name, type: file.type, size: fmtSize(file.size), w: img.width, h: img.height });
      img.src = full;
    };
    reader.readAsDataURL(file);
  };

  /* File upload */
  const handleAnyFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { showToast('File too large — max 10MB'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const full = e.target.result;
      const b64 = full.split(',')[1];
      setFileB64(b64);
      setFileInfo({ name: file.name, type: file.type, size: fmtSize(file.size) });
    };
    reader.readAsDataURL(file);
  };

  /* B64 → image decode */
  const imgDecodePreview = useMemo(() => {
    if (!imgDecodeInput.trim()) return '';
    const clean = imgDecodeInput.trim();
    const isDataUri = clean.startsWith('data:');
    return isDataUri ? clean : `data:image/png;base64,${clean}`;
  }, [imgDecodeInput]);

  /* Save history */
  const pushHistory = useCallback((type, preview) => {
    const entry = { type, preview, ts: Date.now() };
    setHistory((prev) => {
      const h = [entry, ...prev].slice(0, 10);
      try { localStorage.setItem('b64_history', JSON.stringify(h)); } catch {}
      return h;
    });
  }, []);

  /* Stats */
  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;
  const sizeDelta = input ? ((outputBytes - inputBytes) / Math.max(1, inputBytes) * 100).toFixed(0) : 0;
  const maxBar = Math.max(inputBytes, outputBytes, 1);

  const FAQS = [
    { q: 'What is Base64 encoding?', a: 'Base64 is an encoding scheme that converts binary data into ASCII text using 64 printable characters. It\'s commonly used to embed binary data (images, files) inside text formats like HTML, CSS, JSON, and email.' },
    { q: 'Does this tool send my data anywhere?', a: 'Never. All encoding, decoding, and hashing happens entirely in your browser using native JavaScript APIs (btoa, atob, TextEncoder, SubtleCrypto). Nothing is sent to any server.' },
    { q: 'What\'s the difference between URL-safe and standard Base64?', a: 'Standard Base64 uses + and / which are special characters in URLs. URL-safe Base64 replaces + with - and / with _ so the output can be used in URLs, query strings, and filenames without percent-encoding.' },
    { q: 'What hash algorithms are supported?', a: 'MD5 (pure JavaScript), SHA-1, SHA-256, SHA-384, and SHA-512 (all via the browser\'s built-in SubtleCrypto API). SHA-256 is recommended for most use cases.' },
    { q: 'Can I encode images and files?', a: 'Yes. The Image and File tabs let you drag-and-drop or select any file up to 10MB. You get the raw Base64 output or a complete data URI that can be embedded directly in HTML or CSS.' },
    { q: 'What are the extra encoding tools?', a: 'Beyond Base64, you can URL-encode/decode, HTML-entity encode/decode, convert text to hexadecimal, convert text to binary, and generate cryptographic hashes — all zero-API, browser-native.' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="b64-root">

        {/* NAV */}
        <nav className="b64-nav">
          <div className="b64-nav-logo">
            <span className="b64-logo-mark">B64</span>
            Encoder<span style={{ color: 'var(--purple)' }}> & Dev Tools</span>
          </div>
          <div className="b64-nav-right">
            <ul className="b64-nav-links">
              <li><a href="#b64-tool">Encoder</a></li>
              <li><a href="#b64-features">Features</a></li>
              <li><a href="#b64-use-cases">Use Cases</a></li>
              <li><a href="#b64-faq">FAQ</a></li>
            </ul>
            <a href="#b64-tool" className="b64-nav-cta">Try Free →</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="b64-hero">
          <div className="b64-hero-grid" aria-hidden="true" />
          <div className="b64-hero-glow" aria-hidden="true" />
          <div className="b64-hero-glow-2" aria-hidden="true" />
          <div className="b64-hero-content">
            <div className="b64-hero-badge">Zero API · Browser Native · 100% Private</div>
            <h1>Encode. Decode. Hash.<br /><span className="accent">All in One Place.</span></h1>
            <p className="b64-hero-sub">Base64, URL encoding, HTML entities, hex, binary, and SHA hashes — all running entirely in your browser. Instant results, zero privacy risk.</p>
            <div className="b64-hero-actions">
              <a href="#b64-tool" className="b64-btn-primary"><span>Open Encoder</span><span>🔐</span></a>
              <a href="#b64-features" className="b64-btn-ghost"><span>See Features</span><span>↓</span></a>
            </div>
            <div className="b64-hero-stats">
              {[['6+','Tools'],['5','Hash Algos'],['0','Server Calls']].map(([n,l]) => (
                <div key={l}>
                  <div className="b64-hero-stat-num">{n}</div>
                  <div className="b64-hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOL */}
        <section className="b64-section b64-divider" id="b64-tool">
          <div className="b64-section-inner">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="b64-section-label">🔐 Live Encoder</div>
              <h2 className="b64-section-title">Start Encoding</h2>
              <p className="b64-section-sub" style={{ margin: '0 auto' }}>Pick a tab, type or paste — results appear instantly.</p>
            </div>

            {/* TABS */}
            <div className="b64-tabs">
              {[['text','🔤 Text'],['image','🖼️ Image'],['file','📄 File'],['extras','🛠️ Extra Tools']].map(([id,label]) => (
                <button key={id} className={`b64-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
              ))}
            </div>

            {/* TEXT TAB */}
            {tab === 'text' && (
              <div className="b64-tool-card">
                <div className="b64-tool-label"><span className="b64-live-dot" />LIVE TEXT ENCODER / DECODER</div>
                <div className="b64-mode-row">
                  <button className={`b64-mode-btn ${mode==='encode'?'active':''}`} onClick={() => setMode('encode')}>Encode →</button>
                  <button className={`b64-mode-btn ${mode==='decode'?'active':''}`} onClick={() => setMode('decode')}>← Decode</button>
                  {autoMode && (
                    <span className={`b64-auto-badge ${autoMode}`}>Auto: {autoMode}</span>
                  )}
                  {isValid !== null && (
                    <span className={`b64-valid-badge ${isValid ? 'ok' : 'bad'}`}>{isValid ? '✓ Valid B64' : '✗ Invalid'}</span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ position: 'relative' }}>
                    <textarea className="b64-textarea" placeholder={mode==='encode' ? 'Paste text to encode…' : 'Paste Base64 to decode…'}
                      value={input} onChange={e => setInput(e.target.value)} rows={5} />
                    <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {input.length} chars
                    </span>
                  </div>

                  <div className="b64-opts-row">
                    {[['urlSafe','URL Safe',urlSafe,()=>setUrlSafe(!urlSafe)],
                      ['noPad','No Padding',noPad,()=>setNoPad(!noPad)],
                      ['wrap','Wrap 76',wrapLines,()=>setWrapLines(!wrapLines)],
                      ['upper','Uppercase',upper,()=>setUpper(!upper)]].map(([k,l,v,fn]) => (
                      <button key={k} className={`b64-opt-chip ${v?'active':''}`} onClick={fn}>
                        {v && <span className="check">✓</span>}{l}
                      </button>
                    ))}
                    <button className="b64-opt-chip" onClick={() => { setInput(output); setMode(mode==='encode'?'decode':'encode'); }}>
                      ⇅ Swap
                    </button>
                    <button className="b64-opt-chip" onClick={() => { setInput(''); }}>✕ Clear</button>
                  </div>

                  <div className="b64-arrow-row">
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {mode === 'encode' ? '↓ Encoded Base64' : '↓ Decoded text'}
                    </span>
                  </div>

                  <textarea className="b64-textarea" placeholder="Output appears here…"
                    value={output} readOnly rows={5} />
                </div>

                {/* Stats */}
                {input && (
                  <>
                    <div className="b64-size-bars">
                      <div className="b64-size-bar-row">
                        <span className="b64-size-bar-label">Input</span>
                        <div className="b64-size-bar-track"><div className="b64-size-bar-fill" style={{ width: `${(inputBytes/maxBar)*100}%`, background: 'var(--blue)' }} /></div>
                        <span className="b64-size-bar-val">{fmtSize(inputBytes)}</span>
                      </div>
                      <div className="b64-size-bar-row">
                        <span className="b64-size-bar-label">Output</span>
                        <div className="b64-size-bar-track"><div className="b64-size-bar-fill" style={{ width: `${(outputBytes/maxBar)*100}%`, background: 'var(--purple)' }} /></div>
                        <span className="b64-size-bar-val">{fmtSize(outputBytes)}</span>
                      </div>
                    </div>
                    <div className="b64-stats-bar">
                      <span>Input: <strong>{input.length} chars / {fmtSize(inputBytes)}</strong></span>
                      <span>Output: <strong>{output.length} chars / {fmtSize(outputBytes)}</strong></span>
                      {sizeDelta !== '0' && <span>Size: <strong style={{ color: sizeDelta > 0 ? 'var(--amber)' : 'var(--green)' }}>{sizeDelta > 0 ? '+' : ''}{sizeDelta}%</strong></span>}
                    </div>
                  </>
                )}

                <div className="b64-action-row">
                  <button className="b64-action-btn primary" onClick={() => { copy(output, 'out'); pushHistory(mode, input.slice(0,40)); }}>
                    {copiedKey==='out' ? '✓ Copied!' : '📋 Copy Output'}
                  </button>
                  <button className="b64-action-btn" onClick={() => downloadTxt(output, `${mode}d.txt`)}>⬇ Download .txt</button>
                  <button className="b64-action-btn" onClick={() => { const s = `data:text/plain;base64,${mode==='encode'?output:encodeB64(output,false,false,false,false)}`; copy(s, 'uri'); }}>
                    {copiedKey==='uri' ? '✓' : '🔗 Data URI'}
                  </button>
                </div>
              </div>
            )}

            {/* IMAGE TAB */}
            {tab === 'image' && (
              <div className="b64-tool-card">
                <div className="b64-tool-label">🖼️ IMAGE → BASE64</div>
                {!imagePreview ? (
                  <div className={`b64-drop-zone ${isDragOver ? 'dragover' : ''}`}
                    onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={e => { e.preventDefault(); setIsDragOver(false); handleImageFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileRef.current?.click()}>
                    <div className="b64-drop-zone-icon">🖼️</div>
                    <p>Drag & drop an image, or <span>click to upload</span></p>
                    <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>JPG, PNG, WebP, GIF, SVG · Max 10MB</p>
                  </div>
                ) : (
                  <>
                    <div className="b64-img-preview">
                      <Image src={imagePreview} alt="preview" width={480} height={320} unoptimized />
                      <div className="b64-img-meta">
                        {fileInfo && <>
                          <span>📄 {fileInfo.name}</span>
                          <span>📐 {fileInfo.w}×{fileInfo.h}</span>
                          <span>📦 {fileInfo.size}</span>
                          <span>🏷️ {fileInfo.type}</span>
                        </>}
                      </div>
                    </div>
                    <textarea className="b64-textarea" readOnly value={imageB64.slice(0, 500) + (imageB64.length > 500 ? '…(truncated)' : '')} rows={4} />
                    <div className="b64-action-row">
                      <button className="b64-action-btn primary" onClick={() => copy(imageB64, 'imgb64')}>
                        {copiedKey==='imgb64' ? '✓' : '📋 Copy Raw B64'}
                      </button>
                      <button className="b64-action-btn" onClick={() => copy(imagePreview, 'imguri')}>
                        {copiedKey==='imguri' ? '✓' : '🔗 Copy Data URI'}
                      </button>
                      <button className="b64-action-btn" onClick={() => downloadTxt(imageB64, 'image-base64.txt')}>⬇ .txt</button>
                      <button className="b64-action-btn" onClick={() => { setImagePreview(''); setImageB64(''); setFileInfo(null); }}>✕ Clear</button>
                    </div>
                  </>
                )}
                <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={e => handleImageFile(e.target.files[0])} />

                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  <div className="b64-tool-label">← BASE64 → IMAGE</div>
                  <textarea className="b64-textarea" placeholder="Paste Base64 or data URI here…" value={imgDecodeInput}
                    onChange={e => setImgDecodeInput(e.target.value)} rows={3} />
                  {imgDecodePreview && (
                    <div className="b64-img-preview" style={{ marginTop: '0.75rem' }}>
                      <Image src={imgDecodePreview} alt="decoded" width={500} height={320} unoptimized onError={() => setImgDecodeInput('')} />
                      <div className="b64-action-row">
                        <a className="b64-action-btn" href={imgDecodePreview} download="decoded-image.png">⬇ Download Image</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FILE TAB */}
            {tab === 'file' && (
              <div className="b64-tool-card">
                <div className="b64-tool-label">📄 FILE → BASE64</div>
                <div className={`b64-drop-zone ${isDragOver ? 'dragover' : ''}`}
                  onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={e => { e.preventDefault(); setIsDragOver(false); handleAnyFile(e.dataTransfer.files[0]); }}
                  onClick={() => document.getElementById('b64-file-inp')?.click()}>
                  <div className="b64-drop-zone-icon">📄</div>
                  <p>Drag & drop any file, or <span>click to upload</span></p>
                  <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>Any file type · Max 10MB</p>
                </div>
                <input id="b64-file-inp" type="file" style={{ display: 'none' }} onChange={e => handleAnyFile(e.target.files[0])} />
                {fileB64 && fileInfo && (
                  <>
                    <div className="b64-stats-bar" style={{ marginTop: '0.75rem' }}>
                      <span>📄 <strong>{fileInfo.name}</strong></span>
                      <span>🏷️ {fileInfo.type}</span>
                      <span>📦 {fileInfo.size}</span>
                    </div>
                    <textarea className="b64-textarea" style={{ marginTop: '0.75rem' }} readOnly value={fileB64.slice(0, 500) + (fileB64.length > 500 ? '…' : '')} rows={4} />
                    <div className="b64-action-row">
                      <button className="b64-action-btn primary" onClick={() => copy(fileB64, 'fileb64')}>
                        {copiedKey==='fileb64' ? '✓ Copied!' : '📋 Copy B64'}
                      </button>
                      <button className="b64-action-btn" onClick={() => downloadTxt(fileB64, `${fileInfo.name}.b64.txt`)}>⬇ Download .txt</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* EXTRAS TAB */}
            {tab === 'extras' && (
              <div className="b64-tool-card">
                <div className="b64-tool-label">🛠️ EXTRA DEVELOPER TOOLS</div>
                <div className="b64-sub-tabs">
                  {[['url','URL ↑'],['urlDec','URL ↓'],['html','HTML ↑'],['htmlDec','HTML ↓'],['hex','Hex ↑'],['hexDec','Hex ↓'],['bin','Binary ↑'],['binDec','Binary ↓'],['hash','Hash']].map(([id,label]) => (
                    <button key={id} className={`b64-sub-tab ${extraTool===id?'active':''}`} onClick={() => { setExtraTool(id); setExtraIn(''); }}>{label}</button>
                  ))}
                </div>

                <textarea className="b64-textarea"
                  placeholder={extraTool.includes('Dec') ? 'Paste encoded text to decode…' : extraTool==='hash' ? 'Enter text to hash…' : 'Enter text to encode…'}
                  value={extraIn} onChange={e => setExtraIn(e.target.value)} rows={4} />

                {extraTool === 'hash' ? (
                  <>
                    <div className="b64-opts-row">
                      {['MD5','SHA-1','SHA-256','SHA-384','SHA-512'].map(a => (
                        <button key={a} className={`b64-opt-chip ${hashAlgo===a?'active':''}`} onClick={() => setHashAlgo(a)}>{a}</button>
                      ))}
                    </div>
                    {hashOut && <div className="b64-hash-out">{hashOut}</div>}
                    {hashOut && (
                      <div className="b64-stats-bar">
                        <span>{hashAlgo}: <strong>{hashOut.length} hex chars ({hashOut.length * 4} bits)</strong></span>
                      </div>
                    )}
                  </>
                ) : (
                  extraOut && <textarea className="b64-textarea" style={{ marginTop: '0.5rem' }} readOnly value={extraOut} rows={4} />
                )}

                <div className="b64-action-row">
                  <button className="b64-action-btn primary" onClick={() => copy(extraTool==='hash' ? hashOut : extraOut, 'extra')}>
                    {copiedKey==='extra' ? '✓ Copied!' : '📋 Copy Output'}
                  </button>
                  {(extraOut || hashOut) && <button className="b64-action-btn" onClick={() => { setExtraIn(extraOut || hashOut); }}>⇅ Use as input</button>}
                </div>
              </div>
            )}

            {/* HISTORY */}
            {history.length > 0 && (
              <div className="b64-tool-card" style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div className="b64-tool-label" style={{ margin: 0 }}>📚 HISTORY</div>
                  <button style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                    onClick={() => { setHistory([]); localStorage.removeItem('b64_history'); }}>clear all</button>
                </div>
                {history.slice(0, 6).map((h, i) => (
                  <div key={i} className="b64-hist-item">
                    <span className="b64-hist-type">{h.type}</span>
                    <span className="b64-hist-preview">{h.preview}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                      {Math.round((now - h.ts) / 60000)}m ago
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FEATURES */}
        <section className="b64-section" id="b64-features">
          <div className="b64-section-inner">
            <div className="b64-section-label">✦ Why Use This</div>
            <h2 className="b64-section-title">Everything in One Tool</h2>
            <p className="b64-section-sub">No installs, no accounts, no data leaving your browser.</p>
            <div className="b64-features-grid">
              {[
                { icon: '⚡', title: 'Instant Results', desc: 'Every character you type triggers an immediate encode/decode. No buttons, no debounce — pure live feedback.' },
                { icon: '🔐', title: '100% Private', desc: 'All operations run entirely in your browser. No data is ever transmitted. Safe for passwords, tokens, and sensitive content.' },
                { icon: '🖼️', title: 'Image & File Support', desc: 'Drag-and-drop any image or file to get its Base64 representation with a full data URI — ready to embed in HTML or CSS.' },
                { icon: '#️⃣', title: '5 Hash Algorithms', desc: 'MD5 (pure JS), SHA-1, SHA-256, SHA-384, SHA-512. Generate cryptographic hashes instantly without any backend.' },
                { icon: '🛠️', title: '8 Encoding Modes', desc: 'URL encode/decode, HTML entities, hex, and binary — all in the Extra Tools tab. One tool for every encoding need.' },
                { icon: '📊', title: 'Live Size Stats', desc: 'See input vs output byte sizes with animated progress bars. Understand the encoding overhead at a glance.' },
              ].map((f, i) => (
                <article className="b64-feature-card" key={i}>
                  <div className="b64-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="b64-section b64-divider" id="b64-how">
          <div className="b64-section-inner">
            <div className="b64-section-label">◎ Process</div>
            <h2 className="b64-section-title">How It Works</h2>
            <p className="b64-section-sub">Encode or decode in three simple steps.</p>
            <div className="b64-hiw-steps">
              {[
                { num:'01', icon:'🖱️', title:'Choose a Tab', desc:'Select Text, Image, File, or Extra Tools from the tab bar above the encoder.' },
                { num:'02', icon:'⌨', title:'Enter Your Data', desc:'Paste text, drop a file, or type anything. The result appears instantly as you input.' },
                { num:'03', icon:'⚙️', title:'Customize Options', desc:'Toggle URL-safe, no-padding, line-wrap, or uppercase for the exact output you need.' },
                { num:'04', icon:'📋', title:'Copy or Download', desc:'One click to copy the output, download as .txt, or generate a data URI for embedding.' },
              ].map((s, i) => (
                <div className="b64-hiw-step" key={i}>
                  <div className="b64-step-num">{s.num}</div>
                  <div className="b64-step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="b64-section" id="b64-use-cases">
          <div className="b64-section-inner">
            <div className="b64-section-label">◻ Applications</div>
            <h2 className="b64-section-title">Who Uses It</h2>
            <p className="b64-section-sub">Used by developers, designers, and security engineers daily.</p>
            <div className="b64-cases-grid">
              {[
                { tag:'b64-tag-purple', label:'Frontend', title:'Inline Assets', desc:'Convert images to Base64 data URIs to embed directly in HTML/CSS without separate HTTP requests.' },
                { tag:'b64-tag-green', label:'Backend', title:'API Payloads', desc:'Encode binary data for safe transmission in JSON, XML, or any text-based protocol.' },
                { tag:'b64-tag-blue', label:'Security', title:'Token Inspection', desc:'Decode JWT tokens, OAuth credentials, and auth headers to inspect their payload instantly.' },
                { tag:'b64-tag-purple', label:'DevOps', title:'Config & Secrets', desc:'Encode/decode secrets stored in environment variables, Kubernetes secrets, or .env files.' },
                { tag:'b64-tag-green', label:'QA', title:'Hash Verification', desc:'Generate SHA-256 checksums to verify file integrity or compare content without running code locally.' },
                { tag:'b64-tag-blue', label:'Email', title:'MIME Encoding', desc:'Encode attachments and non-ASCII content for safe transmission in email systems using standard Base64.' },
              ].map((c, i) => (
                <article className="b64-case-card" key={i}>
                  <div className={`b64-case-tag ${c.tag}`}>{c.label}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="b64-section b64-divider" id="b64-faq">
          <div className="b64-section-inner" style={{ textAlign: 'center' }}>
            <div className="b64-section-label">❓ Questions</div>
            <h2 className="b64-section-title">Frequently Asked</h2>
            <p className="b64-section-sub" style={{ margin: '0 auto' }}>Everything about Base64 Encoder & Dev Tools.</p>
            <div className="b64-faq-list" style={{ textAlign: 'left' }}>
              {FAQS.map((f, i) => (
                <div key={i} className={`b64-faq-item${openFaq===i?' open':''}`}>
                  <div className="b64-faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)} tabIndex={0}>
                    {f.q}<span className="b64-faq-arrow">⌄</span>
                  </div>
                  <div className="b64-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="b64-footer">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="b64-footer-logo">
              <span className="b64-logo-mark">B64</span>Encoder
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Encode. Decode. Hash. All in one place.</p>
            <ul className="b64-footer-links">
              {['Encoder','Features','Use Cases','FAQ'].map(l => (
                <li key={l}><a href={`#b64-${l.toLowerCase().replace(' ','-')}`}>{l}</a></li>
              ))}
            </ul>
            <p className="b64-footer-copy">Zero API · 100% Browser · No tracking · All free forever</p>
          </div>
        </footer>

        {/* TOAST */}
        <div className={`b64-toast${toast ? ' show' : ''}`}>
          <span className="b64-toast-icon">✓</span>
          <span>{toast}</span>
        </div>

      </div>
    </>
  );
}
