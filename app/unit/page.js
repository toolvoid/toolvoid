'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.uc-root *, .uc-root *::before, .uc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.uc-root {
  --bg: #07070F; --bg2: #0B0B18; --bg3: #0F0F1E; --card: #0D0D1B;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12);
  --text: #E8E8F4; --text-muted: #5C5C78; --text-dim: #8888A8;
  --green: #6BCB77; --green-dim: rgba(107,203,119,0.1); --green-border: rgba(107,203,119,0.2);
  --blue: #4D96FF; --blue-dim: rgba(77,150,255,0.1); --blue-border: rgba(77,150,255,0.2);
  --purple: #A78BFA; --purple-dim: rgba(167,139,250,0.1);
  --shadow: 0 4px 24px rgba(0,0,0,0.5); --shadow-lg: 0 12px 48px rgba(0,0,0,0.7);
  --radius: 14px; --radius-sm: 8px; --radius-xs: 6px;
  --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Syne', sans-serif; --font-body: 'Instrument Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  font-family: var(--font-body); background: var(--bg); color: var(--text);
  line-height: 1.6; overflow-x: hidden;
}
.uc-root.light {
  --bg: #F2F4F8; --bg2: #E9ECF3; --bg3: #DEE2EC; --card: #FFFFFF;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.14);
  --text: #0A0A1A; --text-muted: #8888A0; --text-dim: #5A5A72;
  --green: #1E9E3A; --green-dim: rgba(30,158,58,0.08); --green-border: rgba(30,158,58,0.2);
  --blue: #1A6FE0; --blue-dim: rgba(26,111,224,0.08); --blue-border: rgba(26,111,224,0.2);
  --purple: #7C3AED; --purple-dim: rgba(124,58,237,0.08);
  --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.15);
}
.uc-root a { color: inherit; text-decoration: none; }
.uc-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.uc-root ::selection { background: var(--green-dim); color: var(--green); }
.uc-root ::-webkit-scrollbar { width: 5px; }
.uc-root ::-webkit-scrollbar-track { background: var(--bg); }
.uc-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* NAV */
.uc-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(7,7,15,0.75); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); }
.uc-root.light .uc-nav { background: rgba(242,244,248,0.8); }
.uc-nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.uc-logo-mark { background: var(--green); color: #07070F; padding: 0.1em 0.4em; border-radius: 5px; font-size: 0.85em; }
.uc-root.light .uc-logo-mark { color: #fff; background: var(--green); }
.uc-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.uc-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--transition); }
.uc-nav-links a:hover { color: var(--text); }
.uc-nav-right { display: flex; align-items: center; gap: 1rem; }
.uc-theme-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all var(--transition); }
.uc-theme-btn:hover { border-color: var(--green); color: var(--green); }
.uc-nav-cta { padding: 0.45rem 1.1rem; background: var(--green); color: #07070F; border-radius: 99px; font-size: 0.85rem; font-weight: 700; transition: all var(--transition); }
.uc-root.light .uc-nav-cta { color: #fff; }
.uc-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

/* HERO */
.uc-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.uc-hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.uc-hero-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(107,203,119,0.07) 0%, transparent 70%); pointer-events: none; }
.uc-hero-glow-2 { position: absolute; top: 60%; left: 30%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(77,150,255,0.05) 0%, transparent 70%); pointer-events: none; }
.uc-hero-content { position: relative; z-index: 1; max-width: 800px; }
.uc-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--green-dim); border: 1px solid var(--green-border); border-radius: 99px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--green); letter-spacing: 0.04em; margin-bottom: 2rem; animation: ucFadeUp 0.6s ease both; }
.uc-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: ucPulse 2s ease-in-out infinite; }
@keyframes ucPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
@keyframes ucFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.uc-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem, 7vw, 5.2rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: ucFadeUp 0.7s 0.1s ease both; }
.uc-hero h1 .accent { background: linear-gradient(135deg, var(--green), var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.uc-hero-sub { font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--text-dim); max-width: 540px; margin: 0 auto 2.5rem; line-height: 1.7; animation: ucFadeUp 0.7s 0.2s ease both; }
.uc-hero-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: ucFadeUp 0.7s 0.3s ease both; }
.uc-btn-primary { padding: 0.75rem 1.8rem; background: var(--green); color: #07070F; border-radius: 99px; font-weight: 700; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px rgba(107,203,119,0.2); }
.uc-root.light .uc-btn-primary { color: #fff; }
.uc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(107,203,119,0.35); }
.uc-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.uc-btn-ghost:hover { border-color: var(--green); color: var(--green); transform: translateY(-2px); }
.uc-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: ucFadeUp 0.7s 0.4s ease both; }
.uc-hero-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; }
.uc-hero-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

/* SECTION BASE */
.uc-section { padding: 6rem 1.5rem; }
.uc-section-inner { max-width: 1100px; margin: 0 auto; }
.uc-section-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--green); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.uc-section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.uc-section-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }
.uc-divider { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

/* CATEGORY TABS */
.uc-cat-wrap { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.25rem; scrollbar-width: none; margin-bottom: 1.5rem; }
.uc-cat-wrap::-webkit-scrollbar { display: none; }
.uc-cat-btn { display: flex; align-items: center; gap: 0.35rem; padding: 0.45rem 0.9rem; border: 1px solid var(--border); border-radius: 99px; background: var(--bg2); color: var(--text-dim); font-size: 0.82rem; font-weight: 500; white-space: nowrap; transition: all var(--transition); font-family: var(--font-body); }
.uc-cat-btn .cat-emoji { font-size: 0.95rem; }
.uc-cat-btn:hover { border-color: var(--border-hi); color: var(--text); }
.uc-cat-btn.active { border-color: var(--green-border); background: var(--green-dim); color: var(--green); }

/* CONVERTER CARD */
.uc-gen-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
@media(max-width: 860px) { .uc-gen-layout { grid-template-columns: 1fr; } }
.uc-converter-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); }
.uc-card-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
.uc-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: ucLive 1.5s ease-in-out infinite; }
@keyframes ucLive { 0%,100%{box-shadow:0 0 0 0 rgba(107,203,119,0.5)} 50%{box-shadow:0 0 0 5px rgba(107,203,119,0)} }

/* FROM / TO rows */
.uc-row { display: grid; grid-template-columns: 1fr auto; gap: 0.65rem; align-items: center; margin-bottom: 0.75rem; }
.uc-num-input { background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 1.1rem; font-weight: 500; color: var(--text); outline: none; width: 100%; transition: border-color var(--transition); }
.uc-num-input:focus { border-color: var(--green); }
.uc-num-input::placeholder { color: var(--text-muted); font-weight: 400; }
.uc-unit-sel { background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius-sm); padding: 0.85rem 0.75rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); outline: none; cursor: pointer; min-width: 150px; transition: border-color var(--transition); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; padding-right: 2rem; }
.uc-unit-sel:focus { border-color: var(--green); }
.uc-unit-sel option { background: var(--card); color: var(--text); }

.uc-swap-row { display: flex; align-items: center; justify-content: center; margin: 0.25rem 0; }
.uc-swap-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--bg3); color: var(--text-dim); display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all var(--transition); }
.uc-swap-btn:hover { border-color: var(--green); color: var(--green); transform: rotate(180deg); }

/* FORMULA */
.uc-formula { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); margin-top: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); }
.uc-formula span { color: var(--green); font-weight: 500; }

/* PRECISION */
.uc-precision-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
.uc-prec-btn { padding: 0.3rem 0.65rem; border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); transition: all var(--transition); }
.uc-prec-btn:hover, .uc-prec-btn.active { border-color: var(--blue-border); color: var(--blue); background: var(--blue-dim); }
.uc-sci-toggle { padding: 0.3rem 0.7rem; border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); transition: all var(--transition); margin-left: auto; }
.uc-sci-toggle.active { border-color: var(--purple-dim); color: var(--purple); background: rgba(167,139,250,0.1); }

/* ALL RESULTS */
.uc-results-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; box-shadow: var(--shadow); }
.uc-result-item { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0; border-bottom: 1px solid var(--border); gap: 0.75rem; transition: background var(--transition); cursor: default; }
.uc-result-item:last-child { border-bottom: none; }
.uc-result-item:hover { background: rgba(255,255,255,0.02); border-radius: var(--radius-xs); padding-left: 0.4rem; padding-right: 0.4rem; }
.uc-result-label { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); white-space: nowrap; }
.uc-result-symbol { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); padding: 0.15rem 0.45rem; background: var(--bg2); border-radius: 4px; border: 1px solid var(--border); flex-shrink: 0; }
.uc-result-val { font-family: var(--font-mono); font-size: 0.92rem; font-weight: 500; color: var(--text); text-align: right; flex: 1; overflow: hidden; text-overflow: ellipsis; }
.uc-result-val.highlight { color: var(--green); }
.uc-copy-result { opacity: 0; padding: 0.2rem 0.5rem; border: 1px solid var(--border); border-radius: 4px; font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted); transition: all var(--transition); }
.uc-result-item:hover .uc-copy-result { opacity: 1; }
.uc-copy-result:hover { border-color: var(--green-border); color: var(--green); }
.uc-empty { text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.85rem; }

/* SEARCH */
.uc-search-wrap { position: relative; margin-bottom: 1.5rem; }
.uc-search-input { width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.75rem 1rem 0.75rem 2.5rem; font-family: var(--font-body); font-size: 0.9rem; color: var(--text); outline: none; transition: border-color var(--transition); }
.uc-search-input:focus { border-color: var(--green); }
.uc-search-input::placeholder { color: var(--text-muted); }
.uc-search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); font-size: 0.95rem; opacity: 0.4; pointer-events: none; }

/* HISTORY */
.uc-hist-item { display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg2); margin-bottom: 0.4rem; font-family: var(--font-mono); font-size: 0.82rem; cursor: pointer; transition: all var(--transition); }
.uc-hist-item:hover { border-color: var(--green-border); color: var(--green); }

/* FEATURES */
.uc-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.uc-feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--transition); position: relative; overflow: hidden; }
.uc-feature-card::before { content: ''; position: absolute; inset: 0; background: var(--green-dim); opacity: 0; transition: opacity var(--transition); }
.uc-feature-card:hover::before { opacity: 1; }
.uc-feature-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.uc-feature-icon { width: 44px; height: 44px; background: var(--green-dim); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1.1rem; }
.uc-feature-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.uc-feature-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* HOW IT WORKS */
.uc-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.uc-hiw-steps::before { content: ''; position: absolute; top: 2.5rem; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border-hi), transparent); }
.uc-hiw-step { text-align: center; }
.uc-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--green); opacity: 0.15; line-height: 1; margin-bottom: 0.75rem; }
.uc-step-icon { width: 52px; height: 52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 1rem; }
.uc-hiw-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.uc-hiw-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* USE CASES */
.uc-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.uc-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--transition); }
.uc-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.uc-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.6rem; border-radius: 99px; margin-bottom: 0.9rem; letter-spacing: 0.04em; }
.uc-tag-green { background: var(--green-dim); color: var(--green); }
.uc-tag-blue { background: var(--blue-dim); color: var(--blue); }
.uc-tag-purple { background: var(--purple-dim); color: var(--purple); }
.uc-case-card h3 { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.uc-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* FAQ */
.uc-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.uc-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--transition); }
.uc-faq-item.open { border-color: var(--border-hi); }
.uc-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--transition); gap: 1rem; }
.uc-faq-q:hover { color: var(--green); }
.uc-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.uc-faq-item.open .uc-faq-arrow { transform: rotate(180deg); color: var(--green); }
.uc-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; }
.uc-faq-item.open .uc-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

/* FOOTER */
.uc-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.uc-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.uc-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin: 1.5rem 0; list-style: none; }
.uc-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--transition); }
.uc-footer-links a:hover { color: var(--green); }
.uc-footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }

/* TOAST */
.uc-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.75rem 1.25rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.6rem; transform: translateY(100px); opacity: 0; transition: all 0.3s ease; pointer-events: none; }
.uc-toast.show { transform: translateY(0); opacity: 1; }
.uc-toast-icon { color: var(--green); }

@media(max-width: 640px) {
  .uc-nav-links { display: none; }
  .uc-hero-stats { gap: 1.5rem; }
  .uc-hero-stat-num { font-size: 1.4rem; }
  .uc-hiw-steps::before { display: none; }
}
`;

/* ─── Conversion Data ─────────────────────────────────────────────────── */
const UNITS = {
  length: {
    name: 'Length', emoji: '📏', base: 'meter',
    units: {
      nanometer:   { factor: 1e-9,     label: 'Nanometer',        symbol: 'nm'  },
      micrometer:  { factor: 1e-6,     label: 'Micrometer',       symbol: 'μm'  },
      millimeter:  { factor: 0.001,    label: 'Millimeter',       symbol: 'mm'  },
      centimeter:  { factor: 0.01,     label: 'Centimeter',       symbol: 'cm'  },
      meter:       { factor: 1,        label: 'Meter',            symbol: 'm'   },
      kilometer:   { factor: 1000,     label: 'Kilometer',        symbol: 'km'  },
      inch:        { factor: 0.0254,   label: 'Inch',             symbol: 'in'  },
      foot:        { factor: 0.3048,   label: 'Foot',             symbol: 'ft'  },
      yard:        { factor: 0.9144,   label: 'Yard',             symbol: 'yd'  },
      mile:        { factor: 1609.344, label: 'Mile',             symbol: 'mi'  },
      nautical_mile:{ factor: 1852,    label: 'Nautical Mile',    symbol: 'nmi' },
      light_year:  { factor: 9.461e15, label: 'Light Year',       symbol: 'ly'  },
    }
  },
  weight: {
    name: 'Weight', emoji: '⚖️', base: 'kilogram',
    units: {
      microgram:   { factor: 1e-9,     label: 'Microgram',     symbol: 'μg'     },
      milligram:   { factor: 1e-6,     label: 'Milligram',     symbol: 'mg'     },
      gram:        { factor: 0.001,    label: 'Gram',          symbol: 'g'      },
      kilogram:    { factor: 1,        label: 'Kilogram',      symbol: 'kg'     },
      metric_ton:  { factor: 1000,     label: 'Metric Ton',    symbol: 't'      },
      ounce:       { factor: 0.028350, label: 'Ounce',         symbol: 'oz'     },
      pound:       { factor: 0.453592, label: 'Pound',         symbol: 'lb'     },
      stone:       { factor: 6.35029,  label: 'Stone',         symbol: 'st'     },
      carat:       { factor: 0.0002,   label: 'Carat',         symbol: 'ct'     },
    }
  },
  temperature: {
    name: 'Temperature', emoji: '🌡️', special: true,
    units: {
      celsius:    { label: 'Celsius',    symbol: '°C'  },
      fahrenheit: { label: 'Fahrenheit', symbol: '°F'  },
      kelvin:     { label: 'Kelvin',     symbol: 'K'   },
      rankine:    { label: 'Rankine',    symbol: '°R'  },
      delisle:    { label: 'Delisle',    symbol: '°De' },
      newton:     { label: 'Newton',     symbol: '°N'  },
      reaumur:    { label: 'Réaumur',    symbol: '°Ré' },
      romer:      { label: 'Rømer',      symbol: '°Rø' },
    }
  },
  volume: {
    name: 'Volume', emoji: '🧪', base: 'liter',
    units: {
      milliliter:  { factor: 0.001,    label: 'Milliliter',     symbol: 'mL'    },
      liter:       { factor: 1,        label: 'Liter',          symbol: 'L'     },
      cubic_meter: { factor: 1000,     label: 'Cubic Meter',    symbol: 'm³'    },
      teaspoon:    { factor: 0.004929, label: 'Teaspoon (US)',  symbol: 'tsp'   },
      tablespoon:  { factor: 0.014787, label: 'Tablespoon (US)',symbol: 'tbsp'  },
      cup_us:      { factor: 0.236588, label: 'Cup (US)',       symbol: 'cup'   },
      pint_us:     { factor: 0.473176, label: 'Pint (US)',      symbol: 'pt'    },
      quart_us:    { factor: 0.946353, label: 'Quart (US)',     symbol: 'qt'    },
      gallon_us:   { factor: 3.785411, label: 'Gallon (US)',    symbol: 'gal'   },
      gallon_uk:   { factor: 4.546092, label: 'Gallon (UK)',    symbol: 'gal UK'},
      fluid_oz:    { factor: 0.029574, label: 'Fluid Ounce',    symbol: 'fl oz' },
      cubic_foot:  { factor: 28.31685, label: 'Cubic Foot',     symbol: 'ft³'   },
    }
  },
  speed: {
    name: 'Speed', emoji: '🚀', base: 'mps',
    units: {
      mps:         { factor: 1,        label: 'Meters/Second',     symbol: 'm/s'  },
      kmh:         { factor: 0.277778, label: 'Kilometers/Hour',   symbol: 'km/h' },
      mph:         { factor: 0.447040, label: 'Miles/Hour',        symbol: 'mph'  },
      knot:        { factor: 0.514444, label: 'Knot',              symbol: 'kn'   },
      fps:         { factor: 0.3048,   label: 'Feet/Second',       symbol: 'ft/s' },
      mach:        { factor: 343,      label: 'Mach',              symbol: 'Ma'   },
      light_speed: { factor: 2.998e8,  label: 'Speed of Light',    symbol: 'c'    },
    }
  },
  time: {
    name: 'Time', emoji: '⏱️', base: 'second',
    units: {
      nanosecond:  { factor: 1e-9,        label: 'Nanosecond',  symbol: 'ns'   },
      microsecond: { factor: 1e-6,        label: 'Microsecond', symbol: 'μs'   },
      millisecond: { factor: 0.001,       label: 'Millisecond', symbol: 'ms'   },
      second:      { factor: 1,           label: 'Second',      symbol: 's'    },
      minute:      { factor: 60,          label: 'Minute',      symbol: 'min'  },
      hour:        { factor: 3600,        label: 'Hour',        symbol: 'hr'   },
      day:         { factor: 86400,       label: 'Day',         symbol: 'd'    },
      week:        { factor: 604800,      label: 'Week',        symbol: 'wk'   },
      month:       { factor: 2629800,     label: 'Month (avg)', symbol: 'mo'   },
      year:        { factor: 31557600,    label: 'Year',        symbol: 'yr'   },
      decade:      { factor: 315576000,   label: 'Decade',      symbol: 'dec'  },
      century:     { factor: 3155760000,  label: 'Century',     symbol: 'cent' },
    }
  },
  digital: {
    name: 'Digital Storage', emoji: '💾', base: 'byte',
    units: {
      bit:      { factor: 0.125,    label: 'Bit',      symbol: 'b'   },
      byte:     { factor: 1,        label: 'Byte',     symbol: 'B'   },
      kilobyte: { factor: 1024,     label: 'Kilobyte', symbol: 'KB'  },
      megabyte: { factor: 1048576,  label: 'Megabyte', symbol: 'MB'  },
      gigabyte: { factor: 1.074e9,  label: 'Gigabyte', symbol: 'GB'  },
      terabyte: { factor: 1.1e12,   label: 'Terabyte', symbol: 'TB'  },
      petabyte: { factor: 1.126e15, label: 'Petabyte', symbol: 'PB'  },
    }
  },
  area: {
    name: 'Area', emoji: '🗺️', base: 'sqmeter',
    units: {
      sqmm:    { factor: 1e-6,     label: 'Square Millimeter', symbol: 'mm²' },
      sqcm:    { factor: 0.0001,   label: 'Square Centimeter', symbol: 'cm²' },
      sqmeter: { factor: 1,        label: 'Square Meter',      symbol: 'm²'  },
      sqkm:    { factor: 1e6,      label: 'Square Kilometer',  symbol: 'km²' },
      sqfoot:  { factor: 0.092903, label: 'Square Foot',       symbol: 'ft²' },
      sqyard:  { factor: 0.836127, label: 'Square Yard',       symbol: 'yd²' },
      sqmile:  { factor: 2.59e6,   label: 'Square Mile',       symbol: 'mi²' },
      acre:    { factor: 4046.856, label: 'Acre',              symbol: 'ac'  },
      hectare: { factor: 10000,    label: 'Hectare',           symbol: 'ha'  },
    }
  },
  pressure: {
    name: 'Pressure', emoji: '💨', base: 'pascal',
    units: {
      pascal:     { factor: 1,       label: 'Pascal',     symbol: 'Pa'   },
      kilopascal: { factor: 1000,    label: 'Kilopascal', symbol: 'kPa'  },
      megapascal: { factor: 1e6,     label: 'Megapascal', symbol: 'MPa'  },
      bar:        { factor: 100000,  label: 'Bar',        symbol: 'bar'  },
      atmosphere: { factor: 101325,  label: 'Atmosphere', symbol: 'atm'  },
      psi:        { factor: 6894.76, label: 'PSI',        symbol: 'psi'  },
      torr:       { factor: 133.322, label: 'Torr',       symbol: 'Torr' },
      mmhg:       { factor: 133.322, label: 'mmHg',       symbol: 'mmHg' },
    }
  },
  energy: {
    name: 'Energy', emoji: '⚡', base: 'joule',
    units: {
      joule:        { factor: 1,        label: 'Joule',         symbol: 'J'   },
      kilojoule:    { factor: 1000,     label: 'Kilojoule',     symbol: 'kJ'  },
      megajoule:    { factor: 1e6,      label: 'Megajoule',     symbol: 'MJ'  },
      calorie:      { factor: 4.184,    label: 'Calorie',       symbol: 'cal' },
      kilocalorie:  { factor: 4184,     label: 'Kilocalorie',   symbol: 'kcal'},
      watt_hour:    { factor: 3600,     label: 'Watt-hour',     symbol: 'Wh'  },
      kilowatt_hour:{ factor: 3.6e6,    label: 'Kilowatt-hour', symbol: 'kWh' },
      btu:          { factor: 1055.06,  label: 'BTU',           symbol: 'BTU' },
      electronvolt: { factor: 1.602e-19,label: 'Electronvolt',  symbol: 'eV'  },
    }
  },
  angle: {
    name: 'Angle', emoji: '📐', base: 'degree',
    units: {
      degree:    { factor: 1,        label: 'Degree',     symbol: '°'   },
      radian:    { factor: 57.2958,  label: 'Radian',     symbol: 'rad' },
      gradian:   { factor: 0.9,      label: 'Gradian',    symbol: 'gon' },
      arcminute: { factor: 0.016667, label: 'Arcminute',  symbol: "'"   },
      arcsecond: { factor: 0.000278, label: 'Arcsecond',  symbol: '"'   },
      turn:      { factor: 360,      label: 'Turn',       symbol: 'tr'  },
    }
  },
  fuel: {
    name: 'Fuel Economy', emoji: '⛽', base: 'kml',
    units: {
      kml:    { factor: 1,       label: 'km/L',       symbol: 'km/L'   },
      mpg_us: { factor: 0.4251,  label: 'MPG (US)',   symbol: 'mpg'    },
      mpg_uk: { factor: 0.3540,  label: 'MPG (UK)',   symbol: 'mpg UK' },
      mpl:    { factor: 1.60934, label: 'Miles/Liter', symbol: 'mi/L'  },
    }
  },
};

/* ─── Temperature Conversion ─────────────────────────────────────────── */
function convertTemp(value, from, to) {
  let c;
  switch (from) {
    case 'celsius':    c = value; break;
    case 'fahrenheit': c = (value - 32) * 5 / 9; break;
    case 'kelvin':     c = value - 273.15; break;
    case 'rankine':    c = (value - 491.67) * 5 / 9; break;
    case 'delisle':    c = 100 - value * 2 / 3; break;
    case 'newton':     c = value * 100 / 33; break;
    case 'reaumur':    c = value * 5 / 4; break;
    case 'romer':      c = (value - 7.5) * 40 / 21; break;
    default: c = value;
  }
  switch (to) {
    case 'celsius':    return c;
    case 'fahrenheit': return c * 9 / 5 + 32;
    case 'kelvin':     return c + 273.15;
    case 'rankine':    return (c + 273.15) * 9 / 5;
    case 'delisle':    return (100 - c) * 3 / 2;
    case 'newton':     return c * 33 / 100;
    case 'reaumur':    return c * 4 / 5;
    case 'romer':      return c * 21 / 40 + 7.5;
    default: return c;
  }
}

/* ─── Convert ────────────────────────────────────────────────────────── */
function convert(value, from, to, category) {
  if (value === '' || isNaN(parseFloat(value))) return '';
  const num = parseFloat(value);
  if (category === 'temperature') return convertTemp(num, from, to);
  const u = UNITS[category]?.units;
  if (!u) return '';
  const ff = u[from]?.factor;
  const tf = u[to]?.factor;
  if (!ff || !tf) return '';
  return (num * ff) / tf;
}

/* ─── Format ─────────────────────────────────────────────────────────── */
function formatNum(num, precision, scientific) {
  if (num === '' || num === null || isNaN(num)) return '';
  if (!isFinite(num)) return '∞';
  if (scientific) return Number(num).toExponential(precision);
  const abs = Math.abs(num);
  if (abs !== 0 && (abs < 0.0001 || abs > 1e12)) return Number(num).toExponential(precision);
  const fixed = parseFloat(num.toFixed(precision));
  return fixed.toLocaleString('en-US', { maximumFractionDigits: precision });
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function UnitConverter() {
  const isDark = true;
  const [category,   setCategory]  = useState('length');
  const [fromUnit,   setFromUnit]  = useState('kilometer');
  const [toUnit,     setToUnit]    = useState('mile');
  const [fromValue,  setFromValue] = useState('1');
  const [toValue,    setToValue]   = useState('');
  const [precision,  setPrecision] = useState(4);
  const [scientific, setScientific]= useState(false);
  const [search,     setSearch]    = useState('');
  const [history,    setHistory]   = useState([]);
  const [copiedKey,  setCopiedKey] = useState('');
  const [toast,      setToast]     = useState('');
  const [openFaq,    setOpenFaq]   = useState(null);

  /* Default units per category */
  const DEFAULTS = {
    length: ['kilometer','mile'], weight: ['kilogram','pound'],
    temperature: ['celsius','fahrenheit'], volume: ['liter','gallon_us'],
    speed: ['kmh','mph'], time: ['hour','minute'], digital: ['gigabyte','megabyte'],
    area: ['sqmeter','sqfoot'], pressure: ['atmosphere','psi'], energy: ['kilocalorie','joule'],
    angle: ['degree','radian'], fuel: ['kml','mpg_us'],
  };

  /* Load history */
  useEffect(() => {
    try { const h = localStorage.getItem('uc_history'); if (h) setHistory(JSON.parse(h)); } catch {}
  }, []);

  /* Change category → reset units */
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const [f, t] = DEFAULTS[cat] || Object.keys(UNITS[cat].units).slice(0, 2);
    setFromUnit(f); setToUnit(t);
    setFromValue('1'); setToValue('');
  };

  /* Compute toValue whenever inputs change */
  useEffect(() => {
    const result = convert(fromValue, fromUnit, toUnit, category);
    setToValue(result === '' ? '' : formatNum(result, precision, scientific));
  }, [fromValue, fromUnit, toUnit, category, precision, scientific]);

  /* Reverse: typing in "to" box */
  const handleToChange = (val) => {
    setToValue(val);
    const result = convert(val, toUnit, fromUnit, category);
    setFromValue(result === '' ? '' : formatNum(result, precision, scientific));
  };

  /* Swap */
  const swap = () => {
    setFromUnit(toUnit); setToUnit(fromUnit);
    setFromValue(toValue); setToValue(fromValue);
  };

  /* All results */
  const allResults = useMemo(() => {
    if (fromValue === '' || isNaN(parseFloat(fromValue))) return [];
    const catUnits = UNITS[category]?.units || {};
    return Object.entries(catUnits).map(([key, info]) => {
      const val = convert(fromValue, fromUnit, key, category);
      return { key, label: info.label, symbol: info.symbol, value: formatNum(val, precision, scientific) };
    });
  }, [fromValue, fromUnit, category, precision, scientific]);

  /* Formula text */
  const formulaText = useMemo(() => {
    if (category === 'temperature') {
      const map = { celsius:'°C', fahrenheit:'°F', kelvin:'K', rankine:'°R', delisle:'°De', newton:'°N', reaumur:'°Ré', romer:'°Rø' };
      return `${map[fromUnit] || fromUnit} → ${map[toUnit] || toUnit} (special formula)`;
    }
    const u = UNITS[category]?.units;
    if (!u) return '';
    const ff = u[fromUnit]?.factor, tf = u[toUnit]?.factor;
    if (!ff || !tf) return '';
    const ratio = ff / tf;
    const ratioStr = ratio >= 1 ? `× ${formatNum(ratio, 6, false)}` : `÷ ${formatNum(1 / ratio, 6, false)}`;
    return `1 ${u[fromUnit]?.symbol} = ${ratioStr} ${u[toUnit]?.symbol}`;
  }, [category, fromUnit, toUnit]);

  /* Save history */
  const saveHistory = useCallback((entry) => {
    const newH = [entry, ...history].slice(0, 15);
    setHistory(newH);
    try { localStorage.setItem('uc_history', JSON.stringify(newH)); } catch {}
  }, [history]);

  useEffect(() => {
    if (fromValue && toValue && fromUnit && toUnit) {
      const entry = `${fromValue} ${UNITS[category]?.units[fromUnit]?.symbol || fromUnit} = ${toValue} ${UNITS[category]?.units[toUnit]?.symbol || toUnit}`;
      const t = setTimeout(() => saveHistory(entry), 1500);
      return () => clearTimeout(t);
    }
  }, [fromValue, toValue, fromUnit, toUnit, category]);

  /* Copy */
  const copyVal = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast('Copied to clipboard');
      setTimeout(() => setCopiedKey(''), 2000);
    } catch {}
  };

  /* Toast */
  let toastTimer;
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(''), 2500);
  };

  /* Search across all units */
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const results = [];
    Object.entries(UNITS).forEach(([cat, catData]) => {
      Object.entries(catData.units).forEach(([key, info]) => {
        if (info.label.toLowerCase().includes(q) || info.symbol.toLowerCase().includes(q)) {
          results.push({ cat, key, ...info, catName: catData.name, catEmoji: catData.emoji });
        }
      });
    });
    return results.slice(0, 8);
  }, [search]);

  const catList = Object.entries(UNITS).map(([id, d]) => ({ id, name: d.name, emoji: d.emoji }));
  const currentUnits = Object.entries(UNITS[category]?.units || {}).map(([k, v]) => ({ value: k, label: `${v.label} (${v.symbol})` }));

  const FAQS = [
    { q: 'Are all conversions accurate?', a: 'Yes. All conversions use precise multiplication factors stored directly in the source code. Temperature uses exact formulas (no rounding in the math). Results are formatted to your selected decimal precision.' },
    { q: 'Does it work offline?', a: 'Completely. Unit Converter is 100% client-side JavaScript — no API calls, no server requests. It works entirely in your browser, even without an internet connection.' },
    { q: 'Why are some temperature results different from other converters?', a: 'Scales like Delisle, Newton, Réaumur, and Rømer are historically accurate but rarely used today. Our formulas match the original definitions. Celsius, Fahrenheit, and Kelvin follow standard scientific conventions.' },
    { q: 'How do I convert multiple units at once?', a: 'The "All Conversions" panel on the right shows your input value converted into every unit in the current category simultaneously — no extra clicks needed.' },
    { q: 'What is scientific notation mode?', a: 'Toggle "Sci" to display results in scientific notation (e.g., 1.5 × 10⁶). Useful for very large or very small values like nanometers, light years, or electronvolts.' },
    { q: 'Is my conversion history saved?', a: 'Yes — your last 15 conversions are saved to localStorage and persist across sessions. You can see them in the history section below the converter.' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div id="uc-root" className="uc-root">

        {/* NAV */}
        <nav className="uc-nav">
          <div className="uc-nav-logo">
            <span className="uc-logo-mark">📏</span>
            Unit<span style={{ color: 'var(--green)' }}>Converter</span>
          </div>
          <div className="uc-nav-right">
            <ul className="uc-nav-links">
              <li><a href="#uc-converter">Converter</a></li>
              <li><a href="#uc-features">Features</a></li>
              <li><a href="#uc-use-cases">Use Cases</a></li>
              <li><a href="#uc-faq">FAQ</a></li>
            </ul>
            <a href="#uc-converter" className="uc-nav-cta">Convert Now →</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="uc-hero">
          <div className="uc-hero-grid" aria-hidden="true" />
          <div className="uc-hero-glow" aria-hidden="true" />
          <div className="uc-hero-glow-2" aria-hidden="true" />
          <div className="uc-hero-content">
            <div className="uc-hero-badge">Zero API · Pure JavaScript Math</div>
            <h1>Convert Anything.<br /><span className="accent">Instantly. Precisely.</span></h1>
            <p className="uc-hero-sub">
              12 categories, 100+ units — all with live results as you type. Temperature, length, weight, speed, data, and more.
            </p>
            <div className="uc-hero-actions">
              <a href="#uc-converter" className="uc-btn-primary"><span>Open Converter</span><span>⚡</span></a>
              <a href="#uc-features" className="uc-btn-ghost"><span>See Features</span><span>↓</span></a>
            </div>
            <div className="uc-hero-stats">
              {[['12+', 'Categories'],['100+','Units'],['0ms','Lag']].map(([n, l]) => (
                <div key={l} className="uc-hero-stat">
                  <div className="uc-hero-stat-num">{n}</div>
                  <div className="uc-hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONVERTER */}
        <section className="uc-section uc-divider" id="uc-converter">
          <div className="uc-section-inner">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="uc-section-label">⚡ Live Converter</div>
              <h2 className="uc-section-title">Start Converting</h2>
              <p className="uc-section-sub" style={{ margin: '0 auto' }}>Select a category, enter a value — all units update instantly.</p>
            </div>

            {/* Search */}
            <div className="uc-search-wrap">
              <span className="uc-search-icon">🔍</span>
              <input className="uc-search-input" placeholder="Search any unit across all categories…"
                value={search} onChange={e => setSearch(e.target.value)} />
              {searchResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'var(--card)', border: '1px solid var(--border-hi)', borderRadius: 'var(--radius-sm)', marginTop: 4, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  {searchResults.map(r => (
                    <div key={`${r.cat}-${r.key}`} onClick={() => { handleCategoryChange(r.cat); setFromUnit(r.key); setSearch(''); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'background var(--transition)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}>
                      <span>{r.catEmoji}</span>
                      <span style={{ color: 'var(--text-dim)' }}>{r.catName}</span>
                      <span style={{ color: 'var(--green)', marginLeft: 'auto' }}>{r.label}</span>
                      <span style={{ background: 'var(--bg2)', padding: '0.1rem 0.4rem', borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{r.symbol}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category tabs */}
            <div className="uc-cat-wrap">
              {catList.map(c => (
                <button key={c.id} className={`uc-cat-btn ${category === c.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(c.id)}>
                  <span className="cat-emoji">{c.emoji}</span>{c.name}
                </button>
              ))}
            </div>

            {/* Main layout */}
            <div className="uc-gen-layout">
              {/* Converter panel */}
              <div className="uc-converter-card">
                <div className="uc-card-label"><span className="uc-live-dot" />LIVE CONVERTER</div>

                <div className="uc-row">
                  <input className="uc-num-input" type="number" placeholder="Enter value…"
                    value={fromValue} onChange={e => setFromValue(e.target.value)} />
                  <select className="uc-unit-sel" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
                    {currentUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                <div className="uc-swap-row">
                  <button className="uc-swap-btn" onClick={swap} title="Swap units">⇅</button>
                </div>

                <div className="uc-row">
                  <input className="uc-num-input" type="number" placeholder="Result…"
                    value={toValue} onChange={e => handleToChange(e.target.value)} />
                  <select className="uc-unit-sel" value={toUnit} onChange={e => setToUnit(e.target.value)}>
                    {currentUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                {formulaText && (
                  <div className="uc-formula">
                    <span style={{ opacity: 0.5 }}>📐</span>
                    <span>{formulaText}</span>
                    <button style={{ marginLeft: 'auto', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '0.15rem 0.5rem' }}
                      onClick={() => copyVal(formulaText, 'formula')}>
                      {copiedKey === 'formula' ? '✓' : 'copy'}
                    </button>
                  </div>
                )}

                <div className="uc-precision-row">
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Precision:</span>
                  {[2, 4, 6, 10].map(p => (
                    <button key={p} className={`uc-prec-btn ${precision === p ? 'active' : ''}`} onClick={() => setPrecision(p)}>{p}</button>
                  ))}
                  <button className={`uc-sci-toggle ${scientific ? 'active' : ''}`} onClick={() => setScientific(!scientific)}>Sci</button>
                </div>

                {/* History */}
                {history.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>RECENT</div>
                      <button style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                        onClick={() => { setHistory([]); localStorage.removeItem('uc_history'); }}>clear</button>
                    </div>
                    {history.slice(0, 5).map((h, i) => (
                      <div key={i} className="uc-hist-item" onClick={() => copyVal(h, `hist-${i}`)}>
                        <span>{h}</span>
                        <span style={{ color: copiedKey === `hist-${i}` ? 'var(--green)' : 'var(--text-muted)', fontSize: '0.7rem' }}>
                          {copiedKey === `hist-${i}` ? '✓' : '⧉'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* All results panel */}
              <div className="uc-results-card">
                <div className="uc-card-label">📊 ALL {UNITS[category]?.name?.toUpperCase()} UNITS</div>
                {allResults.length === 0
                  ? <div className="uc-empty">Enter a value to see all conversions</div>
                  : allResults.map(r => (
                    <div key={r.key} className="uc-result-item">
                      <span className="uc-result-label">{r.label}</span>
                      <span className={`uc-result-val ${r.key === toUnit ? 'highlight' : ''}`}>{r.value}</span>
                      <span className="uc-result-symbol">{r.symbol}</span>
                      <button className="uc-copy-result" onClick={() => copyVal(`${r.value} ${r.symbol}`, r.key)}>
                        {copiedKey === r.key ? '✓' : 'copy'}
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="uc-section" id="uc-features">
          <div className="uc-section-inner">
            <div className="uc-section-label">✦ Why Unit Converter</div>
            <h2 className="uc-section-title">Built for Precision</h2>
            <p className="uc-section-sub">Every detail engineered for accuracy, speed, and ease of use.</p>
            <div className="uc-features-grid">
              {[
                { icon: '⚡', title: 'Instant Results', desc: 'Every keystroke triggers a live recalculation. No buttons, no delays — values update as you type.' },
                { icon: '🌡️', title: '12 Categories', desc: 'Length, weight, temperature, speed, volume, area, energy, angle, fuel economy, digital storage, pressure, and time.' },
                { icon: '🔢', title: 'All Units at Once', desc: 'See your input converted into every unit of the category simultaneously in the "All Conversions" panel.' },
                { icon: '🔍', title: 'Universal Search', desc: 'Search any unit by name or symbol across all 12 categories — click a result to jump directly to it.' },
                { icon: '🎯', title: 'Precision Control', desc: 'Choose 2, 4, 6, or 10 decimal places. Toggle scientific notation for very large or very small numbers.' },
                { icon: '📋', title: 'Copy Anywhere', desc: 'One-click copy for any result — individual values, formulas, or full conversion strings from history.' },
              ].map((f, i) => (
                <article className="uc-feature-card" key={i}>
                  <div className="uc-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="uc-section uc-divider" id="uc-how">
          <div className="uc-section-inner">
            <div className="uc-section-label">◎ Process</div>
            <h2 className="uc-section-title">How It Works</h2>
            <p className="uc-section-sub">From input to accurate result in one step.</p>
            <div className="uc-hiw-steps">
              {[
                { num: '01', icon: '📏', title: 'Choose Category', desc: 'Select from 12 categories — length, weight, temperature, and more — using the tab bar.' },
                { num: '02', icon: '⌨', title: 'Type Your Value', desc: 'Enter any number. The converter updates all unit results in real time as you type.' },
                { num: '03', icon: '🔀', title: 'Pick Your Units', desc: 'Choose any from/to unit pair from the dropdowns. Swap them with one click.' },
                { num: '04', icon: '📋', title: 'Copy & Use', desc: 'Copy the result, formula, or any value from the all-conversions panel instantly.' },
              ].map((s, i) => (
                <div className="uc-hiw-step" key={i}>
                  <div className="uc-step-num">{s.num}</div>
                  <div className="uc-step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="uc-section" id="uc-use-cases">
          <div className="uc-section-inner">
            <div className="uc-section-label">◻ Applications</div>
            <h2 className="uc-section-title">Who Uses It</h2>
            <p className="uc-section-sub">Used daily across education, engineering, cooking, travel, and tech.</p>
            <div className="uc-cases-grid">
              {[
                { tag: 'uc-tag-green', label: 'Students', title: 'Science & Math', desc: 'Convert SI units, scientific notation, and physics quantities for homework and exams.' },
                { tag: 'uc-tag-blue', label: 'Engineers', title: 'Technical Specs', desc: 'Switch between metric and imperial for pressure, energy, speed, and dimensional specs.' },
                { tag: 'uc-tag-purple', label: 'Developers', title: 'Data Sizes', desc: 'Convert bits, bytes, KB, MB, GB, TB instantly when working with storage and bandwidth.' },
                { tag: 'uc-tag-green', label: 'Cooks', title: 'Recipe Scaling', desc: 'Convert teaspoons, tablespoons, cups, liters, and milliliters for any recipe or serving size.' },
                { tag: 'uc-tag-blue', label: 'Travelers', title: 'On the Road', desc: 'Convert km to miles, Celsius to Fahrenheit, liters to gallons — all offline, instantly.' },
                { tag: 'uc-tag-purple', label: 'Scientists', title: 'Precision Work', desc: 'Handle nanometers, electronvolts, light years, and pascals with full scientific notation support.' },
              ].map((c, i) => (
                <article className="uc-case-card" key={i}>
                  <div className={`uc-case-tag ${c.tag}`}>{c.label}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="uc-section uc-divider" id="uc-faq">
          <div className="uc-section-inner" style={{ textAlign: 'center' }}>
            <div className="uc-section-label">❓ Questions</div>
            <h2 className="uc-section-title">Frequently Asked</h2>
            <p className="uc-section-sub" style={{ margin: '0 auto' }}>Everything about Unit Converter.</p>
            <div className="uc-faq-list" style={{ textAlign: 'left' }}>
              {FAQS.map((f, i) => (
                <div key={i} className={`uc-faq-item${openFaq === i ? ' open' : ''}`}>
                  <div className="uc-faq-q" role="button" tabIndex={0}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}<span className="uc-faq-arrow">⌄</span>
                  </div>
                  <div className="uc-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="uc-footer">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uc-footer-logo">
              <span className="uc-logo-mark">📏</span>UnitConverter
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Convert anything. Instantly. Precisely.</p>
            <ul className="uc-footer-links">
              {['Converter','Features','Use Cases','FAQ'].map(l => (
                <li key={l}><a href={`#uc-${l.toLowerCase().replace(' ','-')}`}>{l}</a></li>
              ))}
            </ul>
            <p className="uc-footer-copy">Zero API · Pure JavaScript · No tracking · Fully offline</p>
          </div>
        </footer>

        {/* TOAST */}
        <div className={`uc-toast${toast ? ' show' : ''}`}>
          <span className="uc-toast-icon">✓</span>
          <span>{toast}</span>
        </div>

      </div>
    </>
  );
}
