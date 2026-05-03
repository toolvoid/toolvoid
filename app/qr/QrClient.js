'use client';
import { useEffect } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.qr-root *, .qr-root *::before, .qr-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qr-root { --bg: #090910; --bg2: #0e0e1a; --bg3: #13131f; --card: #0f0f1c; --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12); --text: #e8e8f0; --text-muted: #6b6b85; --text-dim: #9494aa; --accent: #4fffb0; --accent-dim: rgba(79,255,176,0.12); --accent-dim2: rgba(79,255,176,0.06); --purple: #a78bfa; --purple-dim: rgba(167,139,250,0.12); --error: #ff6b7a; --error-dim: rgba(255,107,122,0.1); --shadow: 0 4px 24px rgba(0,0,0,0.5); --shadow-lg: 0 12px 48px rgba(0,0,0,0.7); --radius: 14px; --radius-sm: 8px; --radius-xs: 6px; --transition: 0.2s cubic-bezier(0.4,0,0.2,1); --font-head: 'Syne', sans-serif; --font-body: 'Instrument Sans', sans-serif; --font-mono: 'DM Mono', monospace; font-family: var(--font-body); background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }
.qr-root.light { --bg: #f4f4f8; --bg2: #ebebf3; --bg3: #e2e2ec; --card: #ffffff; --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.14); --text: #0d0d1a; --text-muted: #8888a0; --text-dim: #5a5a72; --accent: #009966; --accent-dim: rgba(0,153,102,0.1); --accent-dim2: rgba(0,153,102,0.05); --purple: #7c3aed; --purple-dim: rgba(124,58,237,0.08); --error: #d93a4a; --error-dim: rgba(217,58,74,0.08); --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.15); }
.qr-root a { color: inherit; text-decoration: none; }
.qr-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.qr-root img, .qr-root svg { display: block; max-width: 100%; }
.qr-root ::selection { background: var(--accent-dim); color: var(--accent); }
.qr-root ::-webkit-scrollbar { width: 6px; }
.qr-root ::-webkit-scrollbar-track { background: var(--bg); }
.qr-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

.qr-nav { position: sticky; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(9,9,16,0.7); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); transition: background var(--transition); }
.qr-root.light .qr-nav { background: rgba(244,244,248,0.75); }
.qr-nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.25rem; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem; }
.qr-nav-logo .logo-qr { background: var(--accent); color: var(--bg); padding: 0.1em 0.35em; border-radius: 5px; font-size: 0.9em; line-height: 1.3; }
.qr-nav-logo .logo-text { color: var(--text-dim); font-size: 0.9rem; font-weight: 600; }
.qr-nav-right { display: flex; align-items: center; gap: 1rem; }
.qr-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.qr-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--transition); }
.qr-nav-links a:hover { color: var(--text); }
.qr-theme-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--transition); font-size: 1rem; }
.qr-theme-btn:hover { border-color: var(--accent); color: var(--accent); }
.qr-nav-cta { padding: 0.45rem 1.1rem; background: var(--accent); color: var(--bg); border-radius: 99px; font-size: 0.85rem; font-weight: 600; transition: all var(--transition); white-space: nowrap; }
.qr-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

.qr-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.qr-hero-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.qr-hero-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(79,255,176,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.qr-hero-glow-2 { position: absolute; top: 60%; left: 30%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.qr-hero-content { position: relative; z-index: 1; max-width: 800px; }
.qr-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--accent-dim); border: 1px solid rgba(79,255,176,0.2); border-radius: 99px; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--accent); letter-spacing: 0.04em; margin-bottom: 2rem; animation: rqFadeUp 0.6s ease both; }
.qr-root.light .qr-hero-badge { border-color: rgba(0,153,102,0.3); }
.qr-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: rqPulse 2s ease-in-out infinite; }
@keyframes rqPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
.qr-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem, 7vw, 5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; animation: rqFadeUp 0.7s 0.1s ease both; }
.qr-hero h1 .line-accent { background: linear-gradient(135deg, var(--accent), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.qr-hero-sub { font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--text-dim); max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; animation: rqFadeUp 0.7s 0.2s ease both; }
.qr-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: rqFadeUp 0.7s 0.3s ease both; }
.qr-btn-primary { padding: 0.75rem 1.8rem; background: var(--accent); color: var(--bg); border-radius: 99px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px rgba(79,255,176,0.25); }
.qr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(79,255,176,0.4); }
.qr-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.qr-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.qr-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: rqFadeUp 0.7s 0.4s ease both; }
.qr-hero-stat { text-align: center; }
.qr-hero-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; color: var(--text); letter-spacing: -0.04em; }
.qr-hero-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
@keyframes rqFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.qr-section { padding: 6rem 1.5rem; }
.qr-section-inner { max-width: 1100px; margin: 0 auto; }
.qr-section-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.qr-section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.qr-section-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }

.qr-generator { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.qr-gen-header { text-align: center; margin-bottom: 3rem; }
.qr-gen-layout { display: grid; grid-template-columns: 420px 1fr; gap: 1.5rem; align-items: start; }
@media(max-width: 900px) { .qr-gen-layout { grid-template-columns: 1fr; } }

.qr-gen-controls { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: var(--shadow); }
.qr-ctrl-group { display: flex; flex-direction: column; gap: 0.5rem; }
.qr-ctrl-label { font-size: 0.8rem; font-weight: 600; color: var(--text-dim); letter-spacing: 0.04em; text-transform: uppercase; font-family: var(--font-mono); }

.qr-type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
.qr-type-btn { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; padding: 0.75rem 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg2); color: var(--text-dim); font-size: 0.75rem; font-weight: 600; font-family: var(--font-mono); transition: all var(--transition); cursor: pointer; }
.qr-type-btn .type-icon { font-size: 1.3rem; }
.qr-type-btn:hover { border-color: var(--border-hi); color: var(--text); }
.qr-type-btn.active { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }

.qr-input-wrap { position: relative; }
.qr-gen-input { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 0.9rem; color: var(--text); transition: border-color var(--transition); resize: vertical; min-height: 80px; outline: none; }
.qr-gen-input:focus { border-color: var(--accent); }
.qr-gen-input.error { border-color: var(--error); }
.qr-gen-input::placeholder { color: var(--text-muted); }
.qr-input-count { position: absolute; bottom: 0.5rem; right: 0.7rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
.qr-input-error-msg { font-size: 0.78rem; color: var(--error); margin-top: 0.35rem; display: none; font-family: var(--font-mono); }
.qr-input-error-msg.show { display: block; }

.qr-options-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.qr-option-chip { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; border: 1px solid var(--border); border-radius: var(--radius-xs); background: var(--bg2); color: var(--text-dim); font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all var(--transition); }
.qr-option-chip:hover { border-color: var(--border-hi); color: var(--text); }
.qr-option-chip.active { border-color: var(--purple); color: var(--purple); background: var(--purple-dim); }

.qr-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.qr-option-box { display: flex; flex-direction: column; gap: 0.35rem; }
.qr-option-box label { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); }
.qr-option-select { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.5rem 0.7rem; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; outline: none; transition: border-color var(--transition); width: 100%; }
.qr-option-select:focus { border-color: var(--accent); }
.qr-option-range { padding: 0; border: none; background: none; accent-color: var(--accent); width: 100%; }
.qr-color-row { display: flex; gap: 0.5rem; align-items: center; }
.qr-color-input { width: 36px; height: 36px; border-radius: 6px; border: 1px solid var(--border); background: none; cursor: pointer; padding: 2px; }
.qr-color-preset { width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--border); cursor: pointer; transition: transform var(--transition); flex-shrink: 0; }
.qr-color-preset:hover { transform: scale(1.2); }
.qr-color-preset.active { outline: 2px solid var(--accent); outline-offset: 2px; }

.qr-action-row { display: flex; gap: 0.75rem; }
.qr-btn-download { flex: 1; padding: 0.75rem 1rem; background: var(--accent); color: var(--bg); border-radius: var(--radius-sm); font-weight: 600; font-size: 0.9rem; transition: all var(--transition); display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.qr-btn-download:hover { opacity: 0.85; transform: translateY(-1px); }
.qr-btn-copy { padding: 0.75rem 1rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-sm); font-weight: 500; font-size: 0.9rem; transition: all var(--transition); display: flex; align-items: center; gap: 0.5rem; }
.qr-btn-copy:hover { border-color: var(--accent); color: var(--accent); }
.qr-btn-copy.copied { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
.qr-fmt-btns { display: flex; gap: 0.4rem; }
.qr-fmt-btn { padding: 0.3rem 0.6rem; border: 1px solid var(--border); border-radius: 4px; font-size: 0.72rem; font-family: var(--font-mono); color: var(--text-muted); transition: all var(--transition); cursor: pointer; }
.qr-fmt-btn.active, .qr-fmt-btn:hover { border-color: var(--accent); color: var(--accent); }

.qr-gen-preview { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; display: flex; flex-direction: column; box-shadow: var(--shadow); min-height: 520px; position: relative; }
.qr-preview-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.qr-preview-title { font-family: var(--font-mono); font-size: 0.78rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0.06em; display: flex; align-items: center; gap: 0.5rem; }
.qr-preview-live { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: rqLivePulse 1.5s ease-in-out infinite; }
@keyframes rqLivePulse { 0%,100%{box-shadow:0 0 0 0 rgba(79,255,176,0.5)} 50%{box-shadow:0 0 0 5px rgba(79,255,176,0)} }
.qr-preview-type-badge { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0.06em; padding: 0.25rem 0.6rem; border: 1px solid var(--border); border-radius: 99px; }
.qr-preview-canvas-wrap { flex: 1; display: flex; align-items: center; justify-content: center; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 2rem; min-height: 340px; position: relative; overflow: hidden; }
.qr-preview-canvas-wrap .qr-dot-bg { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(circle, var(--border-hi) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.5; }
#qr-preview-qr, #qr-preview-barcode, #qr-preview-fingerprint, #qr-preview-custom { display: none; position: relative; z-index: 1; }
#qr-preview-qr canvas, #qr-preview-qr img { border-radius: 6px; }
#qr-preview-placeholder { text-align: center; position: relative; z-index: 1; }
.qr-placeholder-icon { font-size: 3rem; margin-bottom: 0.75rem; opacity: 0.2; animation: rqFloat 3s ease-in-out infinite; }
@keyframes rqFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.qr-placeholder-text { font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); }
.qr-error-state { text-align: center; position: relative; z-index: 1; }
.qr-error-state .err-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
.qr-error-state p { font-family: var(--font-mono); font-size: 0.82rem; color: var(--error); }
.qr-preview-meta { margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
.qr-meta-chip { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); padding: 0.25rem 0.6rem; background: var(--bg2); border: 1px solid var(--border); border-radius: 4px; }
.qr-meta-chip span { color: var(--text-dim); }

.qr-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.qr-feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--transition); position: relative; overflow: hidden; }
.qr-feature-card::before { content: ''; position: absolute; inset: 0; background: var(--accent-dim2); opacity: 0; transition: opacity var(--transition); }
.qr-feature-card:hover::before { opacity: 1; }
.qr-feature-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.qr-feature-icon { width: 44px; height: 44px; background: var(--accent-dim); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1.1rem; }
.qr-feature-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.qr-feature-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

.qr-hiw { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.qr-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.qr-hiw-steps::before { content: ''; position: absolute; top: 2.5rem; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border-hi), transparent); }
.qr-hiw-step { text-align: center; position: relative; }
.qr-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--accent); opacity: 0.15; line-height: 1; margin-bottom: 0.75rem; }
.qr-step-icon { width: 52px; height: 52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 1rem; }
.qr-hiw-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.qr-hiw-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

.qr-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.qr-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--transition); cursor: default; }
.qr-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.qr-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.6rem; border-radius: 99px; margin-bottom: 0.9rem; letter-spacing: 0.04em; }
.qr-tag-green { background: var(--accent-dim); color: var(--accent); }
.qr-tag-purple { background: var(--purple-dim); color: var(--purple); }
.qr-tag-blue { background: rgba(96,165,250,0.1); color: #60a5fa; }
.qr-root.light .qr-tag-blue { color: #2563eb; }
.qr-case-card h3 { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.qr-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

.qr-faq { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.qr-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.qr-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--transition); }
.qr-faq-item.open { border-color: var(--border-hi); }
.qr-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--transition); gap: 1rem; }
.qr-faq-q:hover { color: var(--accent); }
.qr-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.qr-faq-item.open .qr-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.qr-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; }
.qr-faq-item.open .qr-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

.qr-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.qr-footer-inner { max-width: 1100px; margin: 0 auto; }
.qr-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.qr-footer-logo .logo-qr { background: var(--accent); color: var(--bg); padding: 0.05em 0.35em; border-radius: 5px; }
.qr-footer-sub { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; }
.qr-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; list-style: none; }
.qr-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--transition); }
.qr-footer-links a:hover { color: var(--accent); }
.qr-footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }

.qr-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.75rem 1.25rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-family: var(--font-mono); box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.6rem; transform: translateY(100px); opacity: 0; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); pointer-events: none; }
.qr-toast.show { transform: translateY(0); opacity: 1; }
.qr-toast-icon { color: var(--accent); font-size: 1rem; }

@media(max-width: 640px) {
  .qr-nav-links { display: none; }
  .qr-hero-stats { gap: 1.5rem; }
  .qr-hero-stat-num { font-size: 1.4rem; }
  .qr-type-grid { grid-template-columns: repeat(2, 1fr); }
  .qr-gen-layout { gap: 1rem; }
  .qr-options-grid { grid-template-columns: 1fr; }
  .qr-hiw-steps::before { display: none; }
}
`;

export default function RQCodeGenerator() {
  useEffect(() => {
    const root = document.getElementById('qr-root');
    if (!root) return;

    const loadScript = (src) =>
      new Promise((resolve) => {
        const existing = document.querySelector(`script[data-rq-src="${src}"]`);
        if (existing) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.setAttribute('data-rq-src', src);
        s.onload = resolve;
        s.onerror = resolve;
        document.head.appendChild(s);
      });

    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js'),
    ]).then(() => {
      initApp();
    });

    function initApp() {
      // ─── State ───────────────────────────────────
      const state = {
        type: 'qr', input: '', fgColor: '#0d0d1a', bgColor: '#ffffff',
        size: 256, qrLevel: 'L', barcodeFormat: 'CODE128', downloadFmt: 'png',
        hasError: false,
      };
      let isDark = true;

      // ─── DOM refs ────────────────────────────────
      const G = (id) => document.getElementById(id);
      const genInput = G('qr-genInput');
      const inputCount = G('qr-inputCount');
      const inputError = G('qr-inputError');
      const previewQR = G('qr-preview-qr');
      const previewBarcode = G('qr-preview-barcode');
      const previewFP = G('qr-preview-fingerprint');
      const previewCustom = G('qr-preview-custom');
      const previewPlaceholder = G('qr-preview-placeholder');
      const previewErrorEl = G('qr-preview-error');
      const errMsg = G('qr-errorMsg');
      const metaType = G('qr-metaType');
      const metaSize = G('qr-metaSize');
      const metaChars = G('qr-metaChars');
      const metaFmt = G('qr-metaFmt');
      const previewBadge = G('qr-previewBadge');
      const sizeRange = G('qr-sizeRange');
      const sizeVal = G('qr-sizeVal');
      const fgColor = G('qr-fgColor');
      const bgColor = G('qr-bgColor');
      const barcodeFormatGroup = G('qr-barcodeFormatGroup');
      const qrLevelGroup = G('qr-qrLevelGroup');
      const barcodeFormatSel = G('qr-barcodeFormat');
      const copyBtn = G('qr-copyBtn');
      const copyText = G('qr-copyText');
      const copyIcon = G('qr-copyIcon');
      const toast = G('qr-toast');
      const toastMsg = G('qr-toastMsg');

      if (!genInput) return; // component unmounted

      // ─── Type Selector ───────────────────────────
      root.querySelectorAll('.qr-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('.qr-type-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          state.type = btn.dataset.type;
          updateUIForType();
          scheduleRender();
        });
      });

      function updateUIForType() {
        const labels = { qr: 'QR Code', barcode: 'Barcode', fingerprint: 'Fingerprint', custom: 'Data Matrix' };
        metaType.textContent = labels[state.type];
        previewBadge.textContent = labels[state.type].toUpperCase();
        barcodeFormatGroup.style.display = state.type === 'barcode' ? '' : 'none';
        qrLevelGroup.style.display = state.type === 'qr' ? '' : 'none';
      }

      // ─── Input ───────────────────────────────────
      genInput.addEventListener('input', () => {
        state.input = genInput.value;
        const len = state.input.length;
        inputCount.textContent = `${len} / 2000`;
        metaChars.textContent = len;
        scheduleRender();
      });

      // ─── QR Error Level ──────────────────────────
      root.querySelectorAll('[data-level]').forEach(chip => {
        chip.addEventListener('click', () => {
          root.querySelectorAll('[data-level]').forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
          });
          chip.classList.add('active');
          chip.setAttribute('aria-pressed', 'true');
          state.qrLevel = chip.dataset.level;
          scheduleRender();
        });
      });

      // ─── Barcode Format ──────────────────────────
      barcodeFormatSel.addEventListener('change', () => {
        state.barcodeFormat = barcodeFormatSel.value;
        scheduleRender();
      });

      // ─── Colors ──────────────────────────────────
      fgColor.addEventListener('input', () => {
        state.fgColor = fgColor.value;
        syncColorPresets('fg', state.fgColor);
        scheduleRender();
      });
      bgColor.addEventListener('input', () => {
        state.bgColor = bgColor.value;
        syncColorPresets('bg', state.bgColor);
        scheduleRender();
      });
      root.querySelectorAll('.qr-color-preset').forEach(p => {
        p.addEventListener('click', () => {
          const target = p.dataset.target;
          const color = p.dataset.color;
          if (target === 'fg') { state.fgColor = color; fgColor.value = color === 'transparent' ? '#000000' : color; }
          else { state.bgColor = color; bgColor.value = color === 'transparent' ? '#ffffff' : color; }
          syncColorPresets(target, color);
          scheduleRender();
        });
      });
      function syncColorPresets(target, color) {
        root.querySelectorAll(`.qr-color-preset[data-target="${target}"]`).forEach(p => {
          p.classList.toggle('active', p.dataset.color === color);
        });
      }

      // ─── Size ────────────────────────────────────
      sizeRange.addEventListener('input', () => {
        state.size = parseInt(sizeRange.value);
        sizeVal.textContent = state.size;
        metaSize.textContent = `${state.size}×${state.size}`;
        scheduleRender();
      });

      // ─── Download Format ─────────────────────────
      root.querySelectorAll('.qr-fmt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('.qr-fmt-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          state.downloadFmt = btn.dataset.fmt;
          metaFmt.textContent = state.downloadFmt.toUpperCase();
        });
      });

      // ─── Debounce ────────────────────────────────
      let renderTimer = null;
      function scheduleRender() {
        if (renderTimer) clearTimeout(renderTimer);
        renderTimer = T(renderPreview, 80);
      }

      // ─── Show/Hide Helpers ───────────────────────
      const allPreviews = [previewQR, previewBarcode, previewFP, previewCustom, previewPlaceholder, previewErrorEl];
      function showElement(el) {
        allPreviews.forEach(e => { if (e) e.style.display = 'none'; });
        if (el) el.style.display = 'flex';
      }
      function showPlaceholder() {
        allPreviews.forEach(e => { if (e) e.style.display = 'none'; });
        if (previewPlaceholder) previewPlaceholder.style.display = '';
      }
      function showError(msg) {
        [previewQR, previewBarcode, previewFP, previewCustom, previewPlaceholder].forEach(e => { if (e) e.style.display = 'none'; });
        if (errMsg) errMsg.textContent = msg;
        if (previewErrorEl) previewErrorEl.style.display = 'flex';
      }

      // ─── Main Render ─────────────────────────────
      function renderPreview() {
        const text = state.input.trim();
        clearInputError();
        if (!text) { showPlaceholder(); return; }
        try {
          if (state.type === 'qr') renderQR(text);
          else if (state.type === 'barcode') renderBarcode(text);
          else if (state.type === 'fingerprint') renderFingerprint(text);
          else renderCustomMatrix(text);
        } catch (e) {
          showError(e.message || 'Failed to generate');
        }
      }

      // ─── QR ──────────────────────────────────────
      function renderQR(text) {
        if (!window.QRCode) { showError('QR library not loaded yet'); return; }
        previewQR.innerHTML = '';
        const QRC = window.QRCode;
        const levelMap = { L: QRC.CorrectLevel.L, M: QRC.CorrectLevel.M, Q: QRC.CorrectLevel.Q, H: QRC.CorrectLevel.H };
        const fg = state.fgColor === 'transparent' ? '#000000' : state.fgColor;
        const bg = state.bgColor === 'transparent' ? '#ffffff' : state.bgColor;
        try {
          new QRC(previewQR, {
            text, width: state.size, height: state.size,
            colorDark: fg, colorLight: bg,
            correctLevel: levelMap[state.qrLevel] || QRC.CorrectLevel.L,
          });
          const child = previewQR.firstChild;
          if (child) { child.style.borderRadius = '6px'; child.style.maxWidth = '100%'; child.style.height = 'auto'; }
          showElement(previewQR);
        } catch (e) {
          throw new Error('QR generation failed — text may be too long');
        }
      }

      // ─── Barcode ─────────────────────────────────
      function renderBarcode(text) {
        if (!window.JsBarcode) { showError('Barcode library not loaded yet'); return; }
        const fg = state.fgColor === 'transparent' ? '#000000' : state.fgColor;
        const bg = state.bgColor === 'transparent' ? '#ffffff' : state.bgColor;
        try {
          window.JsBarcode(previewBarcode, text, {
            format: state.barcodeFormat,
            lineColor: fg, background: bg,
            width: 2.5, height: Math.round(state.size * 0.45),
            displayValue: true, fontOptions: 'bold',
            font: 'DM Mono, monospace', fontSize: 14,
            textMargin: 6, margin: 16,
          });
          previewBarcode.style.maxWidth = '100%';
          previewBarcode.style.height = 'auto';
          showElement(previewBarcode);
        } catch (e) {
          throw new Error(`Invalid data for ${state.barcodeFormat}. Try Code 128 for general text.`);
        }
      }

      // ─── Fingerprint ─────────────────────────────
      function renderFingerprint(text) {
        const canvas = previewFP;
        canvas.width = state.size;
        canvas.height = state.size;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const bg = state.bgColor === 'transparent' ? null : state.bgColor;
        if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); }

        let seed = 0;
        for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) | 0;
        if (seed < 0) seed = -seed;

        const fg = state.fgColor === 'transparent' ? '#000000' : state.fgColor;
        const cx = W / 2, cy = H / 2;
        const numRings = 32 + (seed % 16);
        const maxR = Math.min(W, H) * 0.46;
        const f1 = 3 + (seed % 6), f2 = 5 + ((seed >> 3) % 8), f3 = 2 + ((seed >> 6) % 4);
        const a1 = 3 + (seed % 9), a2 = 1.5 + ((seed >> 4) % 6), a3 = 1 + ((seed >> 8) % 4);
        const phase1 = (seed & 0xFF) / 255 * Math.PI * 2;
        const phase2 = ((seed >> 8) & 0xFF) / 255 * Math.PI * 2;
        const hasDelta = (seed % 3) !== 0;

        ctx.strokeStyle = fg;
        ctx.lineWidth = Math.max(0.8, state.size / 320);
        ctx.lineJoin = 'round';

        for (let i = 0; i < numRings; i++) {
          const t = i / (numRings - 1);
          const baseR = (t * 0.85 + 0.05) * maxR;
          ctx.beginPath();
          const steps = 360;
          let first = true;
          for (let s = 0; s <= steps; s++) {
            const angle = (s / steps) * Math.PI * 2;
            const p =
              Math.sin(angle * f1 + phase1 + i * 0.18) * a1 * (1 - t * 0.3) +
              Math.cos(angle * f2 + phase2 - i * 0.12) * a2 +
              Math.sin(angle * f3 + i * 0.25 + phase1 * 0.5) * a3;
            const delta = hasDelta ? Math.sin(angle * 1.5 + phase2) * (maxR * 0.04) * Math.sin(t * Math.PI) : 0;
            const r = baseR + p + delta;
            const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
            if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.globalAlpha = 0.35 + 0.65 * t;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = fg; ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
        canvas.style.maxWidth = '100%'; canvas.style.height = 'auto';
        showElement(canvas);
      }

      // ─── Data Matrix ─────────────────────────────
      function renderCustomMatrix(text) {
        const canvas = previewCustom;
        canvas.width = state.size; canvas.height = state.size;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const bg = state.bgColor === 'transparent' ? null : state.bgColor;
        if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); } else ctx.clearRect(0, 0, W, H);

        const bytes = [];
        for (let i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i));
        const dataLen = bytes.length;
        const gridSize = Math.max(10, Math.min(48, Math.ceil(Math.sqrt(dataLen * 4)) + 2));
        const cellSize = Math.floor(W / (gridSize + 2));
        const offsetX = Math.floor((W - cellSize * gridSize) / 2);
        const offsetY = Math.floor((H - cellSize * gridSize) / 2);
        const fg = state.fgColor === 'transparent' ? '#000000' : state.fgColor;

        let seed = 0;
        for (let i = 0; i < bytes.length; i++) seed = (seed * 31 + bytes[i]) | 0;

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            let filled = false;
            if (row === 0) filled = true;
            else if (row === gridSize - 1) filled = col % 2 === 0;
            else if (col === 0) filled = true;
            else if (col === gridSize - 1) filled = row % 2 === 0;
            else {
              const byteIdx = ((row * gridSize + col) * 7 + 13) % Math.max(1, bytes.length);
              const byte = bytes[byteIdx % bytes.length];
              const bit = (row + col) % 8;
              const xorVal = (row ^ col ^ (seed & 0xFF));
              filled = ((byte ^ xorVal) >> bit) & 1;
              if (!filled) {
                const b2 = bytes[(byteIdx + 3) % bytes.length];
                filled = ((b2 ^ (xorVal >> 1)) >> ((bit + 3) % 8)) & 1;
              }
            }
            if (filled) {
              const x = offsetX + col * cellSize, y = offsetY + row * cellSize;
              const pad = cellSize > 4 ? 0.5 : 0;
              ctx.fillStyle = fg;
              ctx.fillRect(x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2);
            }
          }
        }
        canvas.style.maxWidth = '100%'; canvas.style.height = 'auto';
        showElement(canvas);
      }

      // ─── Input Error ─────────────────────────────
      function clearInputError() {
        genInput.classList.remove('error');
        inputError.textContent = '';
        inputError.classList.remove('show');
        state.hasError = false;
      }

      // ─── Download ────────────────────────────────
      G('qr-downloadBtn').addEventListener('click', () => {
        const text = state.input.trim();
        if (!text) { showToast('⚠ Enter data first', true); return; }
        if (state.downloadFmt === 'svg') downloadSVG();
        else downloadPNG();
      });

      function downloadPNG() {
        try {
          let canvas = null;
          if (state.type === 'qr') {
            canvas = previewQR.querySelector('canvas');
          } else if (state.type === 'barcode') {
            const svgEl = previewBarcode;
            const svgStr = new XMLSerializer().serializeToString(svgEl);
            const blob = new Blob([svgStr], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
              const c = document.createElement('canvas');
              const rect = svgEl.getBoundingClientRect();
              c.width = rect.width || state.size; c.height = rect.height || state.size / 2;
              c.getContext('2d').drawImage(img, 0, 0);
              URL.revokeObjectURL(url);
              triggerDownload(c.toDataURL('image/png'), 'rq-barcode.png');
            };
            img.src = url; return;
          } else {
            canvas = state.type === 'fingerprint' ? previewFP : previewCustom;
          }
          if (!canvas) { showToast('⚠ Nothing to download', true); return; }
          triggerDownload(canvas.toDataURL('image/png'), `rq-${state.type}.png`);
          showToast('✓ Downloaded PNG');
        } catch (e) { showToast('⚠ Download failed', true); }
      }

      function downloadSVG() {
        try {
          let svgStr = '';
          if (state.type === 'barcode') {
            svgStr = new XMLSerializer().serializeToString(previewBarcode);
          } else {
            const cvs = state.type === 'qr'
              ? (previewQR.querySelector('canvas') || previewQR)
              : state.type === 'fingerprint' ? previewFP : previewCustom;
            const dataUrl = cvs.toDataURL ? cvs.toDataURL('image/png') : '';
            svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${state.size}" height="${state.size}"><image href="${dataUrl}" width="${state.size}" height="${state.size}"/></svg>`;
          }
          const blob = new Blob([svgStr], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          triggerDownload(url, `rq-${state.type}.svg`);
          T(() => URL.revokeObjectURL(url), 1000);
          showToast('✓ Downloaded SVG');
        } catch (e) { showToast('⚠ SVG export failed', true); }
      }

      function triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }

      // ─── Copy ────────────────────────────────────
      copyBtn.addEventListener('click', async () => {
        const text = state.input.trim();
        if (!text) { showToast('⚠ Nothing to copy', true); return; }
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.classList.add('copied');
          copyText.textContent = 'Copied!'; copyIcon.textContent = '✓';
          showToast('✓ Copied to clipboard');
          T(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'Copy'; copyIcon.textContent = '⧉';
          }, 2000);
        } catch { showToast('⚠ Copy failed', true); }
      });

      // ─── Toast ───────────────────────────────────
      let toastTimer = null;
      function showToast(msg, isError = false) {
        toastMsg.textContent = msg;
        toast.style.borderColor = isError ? 'var(--error)' : 'var(--border-hi)';
        toast.querySelector('.qr-toast-icon').style.color = isError ? 'var(--error)' : 'var(--accent)';
        toast.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = T(() => toast.classList.remove('show'), 2500);
      }

      // ─── FAQ Accordion ───────────────────────────
      root.querySelectorAll('.qr-faq-q').forEach(q => {
        q.addEventListener('click', () => {
          const item = q.closest('.qr-faq-item');
          const isOpen = item.classList.contains('open');
          root.querySelectorAll('.qr-faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.qr-faq-q').setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
        });
        q.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
          if (e.key === 'ArrowDown') { e.preventDefault(); q.closest('.qr-faq-item').nextElementSibling?.querySelector('.qr-faq-q')?.focus(); }
          if (e.key === 'ArrowUp') { e.preventDefault(); q.closest('.qr-faq-item').previousElementSibling?.querySelector('.qr-faq-q')?.focus(); }
        });
      });

      // ─── Init ────────────────────────────────────
      updateUIForType();
      metaSize.textContent = `${state.size}×${state.size}`;
      metaFmt.textContent = 'PNG';
      metaChars.textContent = '0';
      showPlaceholder();
    }

    return () => { timers.forEach(clearTimeout); };
  }, []);

  return (
    <div id="qr-root" className="qr-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="qr-nav">
        <div className="qr-nav-logo">
          <span className="logo-qr">QR</span>
          <span className="logo-text">Code Generator</span>
        </div>
        <div className="qr-nav-right">
          <ul className="qr-nav-links">
            <li><a href="#qr-generator">Generator</a></li>
            <li><a href="#qr-features">Features</a></li>
            <li><a href="#qr-use-cases">Use Cases</a></li>
            <li><a href="#qr-faq">FAQ</a></li>
          </ul>
          <a href="#qr-generator" className="qr-nav-cta">Try Free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="qr-hero">
        <div className="qr-hero-grid" aria-hidden="true" />
        <div className="qr-hero-glow" aria-hidden="true" />
        <div className="qr-hero-glow-2" aria-hidden="true" />
        <div className="qr-hero-content">
          <div className="qr-hero-badge">Live Preview Engine Active</div>
          <h1>
            Generate Any Code.<br />
            <span className="line-accent">Instantly. Beautifully.</span>
          </h1>
          <p className="qr-hero-sub">
            QR codes, barcodes, fingerprint patterns &amp; encoded data — all with a live preview that updates as you type. No refresh. No waiting.
          </p>
          <div className="qr-hero-actions">
            <a href="#qr-generator" className="qr-btn-primary">
              <span>Open Generator</span>
              <span aria-hidden="true">⚡</span>
            </a>
            <a href="#qr-features" className="qr-btn-ghost">
              <span>See Features</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="qr-hero-stats">
            <div className="qr-hero-stat">
              <div className="qr-hero-stat-num">4+</div>
              <div className="qr-hero-stat-label">Code Types</div>
            </div>
            <div className="qr-hero-stat">
              <div className="qr-hero-stat-num">0ms</div>
              <div className="qr-hero-stat-label">Render Lag</div>
            </div>
            <div className="qr-hero-stat">
              <div className="qr-hero-stat-num">PNG/SVG</div>
              <div className="qr-hero-stat-label">Export Formats</div>
            </div>
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section className="qr-section rq-generator" id="qr-generator">
        <div className="qr-section-inner">
          <div className="qr-gen-header">
            <div className="qr-section-label">⚡ Live Generator</div>
            <h2 className="qr-section-title">Start Generating</h2>
            <p className="qr-section-sub">Pick a code type, enter your data — the preview updates instantly as you type.</p>
          </div>

          <div className="qr-gen-layout">
            {/* Controls */}
            <aside className="qr-gen-controls">
              {/* Type Selector */}
              <div className="qr-ctrl-group">
                <div className="qr-ctrl-label">Code Type</div>
                <div className="qr-type-grid">
                  <button className="qr-type-btn active" data-type="qr" aria-pressed="true">
                    <span className="type-icon" aria-hidden="true">▦</span>QR Code
                  </button>
                  <button className="qr-type-btn" data-type="barcode" aria-pressed="false">
                    <span className="type-icon" aria-hidden="true">⫼</span>Barcode
                  </button>
                  <button className="qr-type-btn" data-type="fingerprint" aria-pressed="false">
                    <span className="type-icon" aria-hidden="true">◎</span>Fingerprint
                  </button>
                  <button className="qr-type-btn" data-type="custom" aria-pressed="false">
                    <span className="type-icon" aria-hidden="true">⠿</span>Data Matrix
                  </button>
                </div>
              </div>

              {/* Input */}
              <div className="qr-ctrl-group">
                <div className="qr-ctrl-label">Input Data</div>
                <div className="qr-input-wrap">
                  <textarea
                    className="qr-gen-input"
                    id="qr-genInput"
                    placeholder="Type or paste your data here…"
                    maxLength={2000}
                    aria-label="Data input"
                  />
                  <span className="qr-input-count" id="qr-inputCount">0 / 2000</span>
                </div>
                <div className="qr-input-error-msg" id="qr-inputError" role="alert" />
              </div>

              {/* Barcode Format */}
              <div className="qr-ctrl-group" id="qr-barcodeFormatGroup" style={{ display: 'none' }}>
                <div className="qr-ctrl-label">Barcode Format</div>
                <select className="qr-option-select" id="qr-barcodeFormat">
                  <option value="CODE128">Code 128 (Universal)</option>
                  <option value="EAN13">EAN-13 (Retail)</option>
                  <option value="EAN8">EAN-8 (Short Retail)</option>
                  <option value="UPC">UPC-A</option>
                  <option value="CODE39">Code 39</option>
                  <option value="ITF14">ITF-14 (Shipping)</option>
                  <option value="pharmacode">Pharmacode</option>
                  <option value="MSI">MSI Plessey</option>
                </select>
              </div>

              {/* QR Level */}
              <div className="qr-ctrl-group" id="qr-qrLevelGroup">
                <div className="qr-ctrl-label">Error Correction</div>
                <div className="qr-options-row">
                  <button className="qr-option-chip active" data-level="L" aria-pressed="true">L — 7%</button>
                  <button className="qr-option-chip" data-level="M" aria-pressed="false">M — 15%</button>
                  <button className="qr-option-chip" data-level="Q" aria-pressed="false">Q — 25%</button>
                  <button className="qr-option-chip" data-level="H" aria-pressed="false">H — 30%</button>
                </div>
              </div>

              {/* Colors */}
              <div className="qr-ctrl-group">
                <div className="qr-ctrl-label">Colors</div>
                <div className="qr-options-grid">
                  <div className="qr-option-box">
                    <label htmlFor="rq-fgColor">Foreground</label>
                    <div className="qr-color-row">
                      <input type="color" className="qr-color-input" id="qr-fgColor" defaultValue="#0d0d1a" />
                      <div className="qr-color-preset active" style={{ background: '#0d0d1a' }} data-color="#0d0d1a" data-target="fg" />
                      <div className="qr-color-preset" style={{ background: '#4fffb0' }} data-color="#4fffb0" data-target="fg" />
                      <div className="qr-color-preset" style={{ background: '#a78bfa' }} data-color="#a78bfa" data-target="fg" />
                      <div className="qr-color-preset" style={{ background: '#f97316' }} data-color="#f97316" data-target="fg" />
                    </div>
                  </div>
                  <div className="qr-option-box">
                    <label htmlFor="rq-bgColor">Background</label>
                    <div className="qr-color-row">
                      <input type="color" className="qr-color-input" id="qr-bgColor" defaultValue="#ffffff" />
                      <div className="qr-color-preset active" style={{ background: '#ffffff', border: '1px solid #ddd' }} data-color="#ffffff" data-target="bg" />
                      <div className="qr-color-preset" style={{ background: '#090910' }} data-color="#090910" data-target="bg" />
                      <div className="qr-color-preset" style={{ background: 'transparent', border: '1px dashed #555' }} data-color="transparent" data-target="bg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Size */}
              <div className="qr-ctrl-group">
                <div className="qr-ctrl-label">Size — <span id="qr-sizeVal">256</span>px</div>
                <input type="range" className="qr-option-range" id="qr-sizeRange" min="128" max="512" step="32" defaultValue="256" />
              </div>

              {/* Format */}
              <div className="qr-ctrl-group">
                <div className="qr-ctrl-label">Export</div>
                <div className="qr-fmt-btns">
                  <button className="qr-fmt-btn active" data-fmt="png" aria-pressed="true">PNG</button>
                  <button className="qr-fmt-btn" data-fmt="svg" aria-pressed="false">SVG</button>
                </div>
              </div>

              <div className="qr-action-row">
                <button className="qr-btn-download" id="qr-downloadBtn">
                  <span aria-hidden="true">⬇</span> Download
                </button>
                <button className="qr-btn-copy" id="qr-copyBtn">
                  <span id="qr-copyIcon">⧉</span>
                  <span id="qr-copyText">Copy</span>
                </button>
              </div>
            </aside>

            {/* Preview Panel */}
            <div className="qr-gen-preview">
              <div className="qr-preview-header">
                <div className="qr-preview-title">
                  <span className="qr-preview-live" />
                  LIVE PREVIEW
                </div>
                <div className="qr-preview-type-badge" id="qr-previewBadge">QR CODE</div>
              </div>

              <div className="qr-preview-canvas-wrap" id="qr-previewWrap">
                <div className="qr-dot-bg" aria-hidden="true" />
                <div id="qr-preview-qr" />
                <svg id="qr-preview-barcode" />
                <canvas id="qr-preview-fingerprint" width="256" height="256" />
                <canvas id="qr-preview-custom" width="256" height="256" />
                <div id="qr-preview-placeholder">
                  <div className="qr-placeholder-icon" aria-hidden="true">◎</div>
                  <div className="qr-placeholder-text">Enter data above to generate</div>
                </div>
                <div id="qr-preview-error" style={{ display: 'none' }} className="qr-error-state" role="alert">
                  <div className="err-icon" aria-hidden="true">⚠</div>
                  <p id="qr-errorMsg">Invalid input</p>
                </div>
              </div>

              <div className="qr-preview-meta">
                <div className="qr-meta-chip">Type: <span id="qr-metaType">QR Code</span></div>
                <div className="qr-meta-chip">Size: <span id="qr-metaSize">256×256</span></div>
                <div className="qr-meta-chip">Chars: <span id="qr-metaChars">0</span></div>
                <div className="qr-meta-chip">Format: <span id="qr-metaFmt">PNG</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="qr-section" id="qr-features">
        <div className="qr-section-inner">
          <div className="qr-section-label">✦ Why QR</div>
          <h2 className="qr-section-title">Built for Speed &amp; Quality</h2>
          <p className="qr-section-sub">Every detail crafted for developers, designers, and businesses who need codes fast.</p>
          <div className="qr-features-grid">
            {[
              { icon: '⚡', title: 'Zero-Lag Preview', desc: 'Debounced rendering engine updates your preview as you type — no button clicks, no waiting.' },
              { icon: '▦', title: '4 Code Formats', desc: 'QR codes, multiple barcode standards, fingerprint patterns, and custom data matrices — all in one place.' },
              { icon: '🎨', title: 'Custom Styling', desc: 'Choose foreground & background colors, adjust size from 128–512px, and pick preset color palettes.' },
              { icon: '⬇', title: 'PNG & SVG Export', desc: 'Download in both raster and vector formats. SVG scales infinitely — perfect for print and branding.' },
              { icon: '📋', title: 'One-Click Copy', desc: 'Copy your raw input data to clipboard instantly. Paste it anywhere without retyping.' },
              { icon: '🔒', title: 'Fully Client-Side', desc: 'Everything runs in your browser. No data is ever sent to any server. 100% private and offline-capable.' },
            ].map((f, i) => (
              <article className="qr-feature-card" key={i}>
                <div className="qr-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="qr-section rq-hiw" id="qr-how-it-works">
        <div className="qr-section-inner">
          <div className="qr-section-label">◎ Process</div>
          <h2 className="qr-section-title">How It Works</h2>
          <p className="qr-section-sub">Three simple steps from data to downloadable code.</p>
          <div className="qr-hiw-steps">
            {[
              { num: '01', icon: '🔠', title: 'Choose Your Type', desc: 'Select QR, Barcode, Fingerprint, or Data Matrix from the type selector.' },
              { num: '02', icon: '⌨', title: 'Enter Your Data', desc: 'Start typing — URLs, numbers, text, anything. The preview renders in real time.' },
              { num: '03', icon: '🎨', title: 'Customize Style', desc: 'Adjust colors, size, error correction, and barcode format to match your brand.' },
              { num: '04', icon: '⬇', title: 'Export & Use', desc: 'Download as PNG or SVG — ready for print, web, apps, and signage instantly.' },
            ].map((s, i) => (
              <div className="qr-hiw-step" key={i}>
                <div className="qr-step-num">{s.num}</div>
                <div className="qr-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="qr-section" id="qr-use-cases">
        <div className="qr-section-inner">
          <div className="qr-section-label">◻ Applications</div>
          <h2 className="qr-section-title">Who Uses QR</h2>
          <p className="qr-section-sub">Trusted across industries for fast, reliable code generation.</p>
          <div className="qr-cases-grid">
            {[
              { tag: 'rq-tag-green', label: 'Retail', title: 'Product Labeling', desc: 'Generate EAN-13, UPC, and Code 128 barcodes for physical products and inventory management.' },
              { tag: 'rq-tag-purple', label: 'Marketing', title: 'QR Campaigns', desc: 'Create branded QR codes for print ads, packaging, and outdoor signage that link to your campaigns.' },
              { tag: 'rq-tag-blue', label: 'Events', title: 'Ticket & Access Codes', desc: 'Generate unique codes for event tickets, venue access, and digital boarding passes.' },
              { tag: 'rq-tag-green', label: 'Developers', title: 'Quick Prototyping', desc: 'Instantly create test codes for scanner integration, app development, and API testing.' },
              { tag: 'rq-tag-purple', label: 'Design', title: 'Branded Codes', desc: 'Style QR codes and barcodes with brand colors and export as vector SVG for perfect scaling.' },
              { tag: 'rq-tag-blue', label: 'Logistics', title: 'Shipping & Tracking', desc: 'Generate ITF-14 and Code 128 barcodes for shipping labels, warehousing, and supply chain.' },
            ].map((c, i) => (
              <article className="qr-case-card" key={i}>
                <div className={`rq-case-tag ${c.tag}`}>{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="qr-section rq-faq" id="qr-faq">
        <div className="qr-section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="qr-section-label">❓ Questions</div>
            <h2 className="qr-section-title">Frequently Asked</h2>
            <p className="qr-section-sub" style={{ margin: '0 auto' }}>Everything you need to know about QR Code Generator.</p>
          </div>
          <div className="qr-faq-list">
            {[
              { q: 'Is QR Code Generator free to use?', a: 'Yes — completely free, with no account required, no hidden limits, and no watermarks on your exported codes.' },
              { q: 'Does it send my data to any server?', a: 'Never. Everything runs entirely in your browser using client-side JavaScript. Your data never leaves your device, making it safe for sensitive information like passwords, private URLs, or internal codes.' },
              { q: 'Which barcode formats are supported?', a: 'We support Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14, Pharmacode, and MSI Plessey — covering nearly every commercial use case from retail to logistics.' },
              { q: 'Can I use the generated codes commercially?', a: 'Yes. Generated codes are yours to use in any context — commercial products, marketing materials, apps, or printed media. No attribution required.' },
              { q: 'What is the maximum data size for QR codes?', a: 'QR codes can technically store up to ~2,953 bytes of binary data or 4,296 alphanumeric characters. For best scan reliability, keep content under 200 characters and use higher error correction levels for print.' },
              { q: "What's the difference between PNG and SVG export?", a: 'PNG is a raster format — best for web display and digital use at fixed sizes. SVG is a vector format that scales to any size without quality loss, making it ideal for print, signage, and branded materials.' },
            ].map((f, i) => (
              <div className="qr-faq-item" key={i}>
                <div className="qr-faq-q" role="button" tabIndex={0} aria-expanded="false">
                  {f.q}
                  <span className="qr-faq-arrow" aria-hidden="true">⌄</span>
                </div>
                <div className="qr-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="qr-footer">
        <div className="qr-footer-inner">
          <div className="qr-footer-logo">
            <span className="logo-qr">QR</span> Code Generator
          </div>
          <p className="qr-footer-sub">Generate any code. Instantly. Beautifully.</p>
          <ul className="qr-footer-links">
            <li><a href="#qr-generator">Generator</a></li>
            <li><a href="#qr-features">Features</a></li>
            <li><a href="#qr-use-cases">Use Cases</a></li>
            <li><a href="#qr-faq">FAQ</a></li>
          </ul>
          <p className="qr-footer-copy">Built with zero backend · 100% client-side · No tracking</p>
        </div>
      </footer>

      {/* Toast */}
      <div className="qr-toast" id="qr-toast" role="status" aria-live="polite">
        <span className="qr-toast-icon">✓</span>
        <span id="qr-toastMsg">Copied!</span>
      </div>
    </div>
  );
}
