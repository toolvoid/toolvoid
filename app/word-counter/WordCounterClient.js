'use client';
import { useEffect } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=Lora:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

.wc-root *, .wc-root *::before, .wc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.wc-root {
  --bg: #07090F; --bg2: #0B0D16; --bg3: #10121C;
  --card: #0d0f1a; --border: rgba(255,255,255,0.06);
  --border-hi: rgba(255,255,255,0.11);
  --text: #DDE4F0; --text-muted: #4a5270; --text-dim: #7a85a8;
  --accent: #4D96FF; --accent-dim: rgba(77,150,255,0.1); --accent-dim2: rgba(77,150,255,0.05);
  --green: #00FFB2; --green-dim: rgba(0,255,178,0.1);
  --yellow: #FFD93D; --yellow-dim: rgba(255,217,61,0.1);
  --red: #ff6b7a; --red-dim: rgba(255,107,122,0.08);
  --purple: #a78bfa; --purple-dim: rgba(167,139,250,0.1);
  --shadow: 0 4px 32px rgba(0,0,0,0.6); --shadow-lg: 0 16px 64px rgba(0,0,0,0.8);
  --radius: 16px; --radius-sm: 10px; --radius-xs: 6px;
  --transition: 0.18s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Bricolage Grotesque', sans-serif;
  --font-serif: 'Lora', serif;
  --font-mono: 'IBM Plex Mono', monospace;
  font-family: var(--font-body); background: var(--bg); color: var(--text);
  line-height: 1.6; overflow-x: hidden; min-height: 100vh;
}
.wc-root a { color: inherit; text-decoration: none; }
.wc-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.wc-root ::selection { background: var(--accent-dim); color: var(--accent); }
.wc-root ::-webkit-scrollbar { width: 5px; }
.wc-root ::-webkit-scrollbar-track { background: transparent; }
.wc-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* NAV */
.wc-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2.5rem; height: 62px; background: rgba(7,9,15,0.82); backdrop-filter: blur(24px) saturate(1.8); border-bottom: 1px solid var(--border); }
.wc-nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.15rem; letter-spacing: -0.04em; display: flex; align-items: center; gap: 0.5rem; }
.wc-nav-logo .logo-icon { width: 28px; height: 28px; background: linear-gradient(135deg, var(--accent), var(--green)); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
.wc-nav-links { display: flex; gap: 1.75rem; list-style: none; }
.wc-nav-links a { font-size: 0.85rem; font-weight: 500; color: var(--text-dim); transition: color var(--transition); }
.wc-nav-links a:hover { color: var(--text); }
.wc-nav-cta { padding: 0.5rem 1.2rem; background: var(--accent); color: var(--bg); border-radius: 99px; font-size: 0.83rem; font-weight: 700; transition: all var(--transition); }
.wc-nav-cta:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 0 24px rgba(77,150,255,0.35); }

/* HERO */
.wc-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 7rem 1.5rem 5rem; overflow: hidden; }
.wc-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(77,150,255,0.06), transparent 70%); pointer-events: none; }
.wc-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%); pointer-events: none; }
.wc-hero-orb { position: absolute; bottom: 10%; right: 10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(0,255,178,0.04) 0%, transparent 70%); pointer-events: none; }
.wc-hero-content { position: relative; z-index: 1; max-width: 840px; }
.wc-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.38rem 1rem; background: var(--accent-dim); border: 1px solid rgba(77,150,255,0.25); border-radius: 99px; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 400; color: var(--accent); letter-spacing: 0.06em; margin-bottom: 2.5rem; animation: wcFadeUp 0.6s ease both; }
.wc-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: wcBlink 2s ease-in-out infinite; }
@keyframes wcBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
.wc-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem, 7.5vw, 5.5rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; margin-bottom: 1.75rem; animation: wcFadeUp 0.7s 0.1s ease both; }
.wc-hero h1 .h1-light { font-weight: 300; color: var(--text-dim); }
.wc-hero h1 .h1-blue { background: linear-gradient(90deg, var(--accent), #7db8ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.wc-hero h1 .h1-green { background: linear-gradient(90deg, var(--green), #7dffd4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.wc-hero-sub { font-size: 1.1rem; color: var(--text-dim); max-width: 540px; margin: 0 auto 3rem; line-height: 1.75; font-weight: 400; animation: wcFadeUp 0.7s 0.2s ease both; }
.wc-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: wcFadeUp 0.7s 0.3s ease both; }
.wc-btn-primary { padding: 0.85rem 2rem; background: var(--accent); color: var(--bg); border-radius: 12px; font-weight: 700; font-size: 0.95rem; letter-spacing: -0.02em; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 40px rgba(77,150,255,0.3); }
.wc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(77,150,255,0.45); }
.wc-btn-ghost { padding: 0.85rem 1.75rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 12px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.wc-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.wc-hero-pills { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.5rem; margin-top: 3rem; animation: wcFadeUp 0.7s 0.4s ease both; }
.wc-hero-pill { padding: 0.35rem 0.85rem; border: 1px solid var(--border-hi); border-radius: 99px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
@keyframes wcFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* SECTION */
.wc-section { padding: 6rem 1.5rem; }
.wc-section-inner { max-width: 1200px; margin: 0 auto; }
.wc-section-label { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 400; color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
.wc-section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 0.75rem; }
.wc-section-sub { font-size: 1rem; color: var(--text-dim); max-width: 480px; line-height: 1.7; }

/* APP LAYOUT */
.wc-app-bg { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.wc-app-layout { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; align-items: start; }
@media(max-width: 960px) { .wc-app-layout { grid-template-columns: 1fr; } }

/* EDITOR */
.wc-editor-wrap { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; }
.wc-editor-toolbar { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.wc-toolbar-btn { padding: 0.3rem 0.65rem; border: 1px solid var(--border); border-radius: 5px; font-size: 0.78rem; font-weight: 600; color: var(--text-dim); transition: all var(--transition); font-family: var(--font-mono); }
.wc-toolbar-btn:hover { border-color: var(--border-hi); color: var(--text); }
.wc-toolbar-sep { width: 1px; height: 20px; background: var(--border-hi); flex-shrink: 0; }
.wc-toolbar-end { margin-left: auto; display: flex; align-items: center; gap: 0.5rem; }
.wc-font-size-btns { display: flex; align-items: center; gap: 0.3rem; }
.wc-fs-btn { width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--border); font-size: 0.8rem; color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--transition); }
.wc-fs-btn:hover { border-color: var(--border-hi); color: var(--text); }
.wc-fs-val { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); width: 28px; text-align: center; }
.wc-editor-main { display: flex; flex: 1; }
.wc-line-numbers { padding: 1rem 0.75rem; background: var(--bg3); border-right: 1px solid var(--border); font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); line-height: 1; text-align: right; user-select: none; min-width: 42px; display: flex; flex-direction: column; gap: 0; overflow: hidden; }
.wc-line-num { line-height: var(--editor-lh, 1.8); }
.wc-textarea { flex: 1; padding: 1rem; background: transparent; border: none; outline: none; color: var(--text); font-family: var(--font-serif); font-size: 16px; line-height: 1.8; resize: none; min-height: 480px; width: 100%; }
.wc-textarea::placeholder { color: var(--text-muted); font-style: italic; }

/* TARGET BAR */
.wc-target-bar { padding: 0.75rem 1rem; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.wc-target-input { background: var(--bg2); border: 1px solid var(--border); border-radius: 5px; padding: 0.3rem 0.6rem; color: var(--text); font-family: var(--font-mono); font-size: 0.78rem; outline: none; width: 80px; transition: border-color var(--transition); }
.wc-target-input:focus { border-color: var(--accent); }
.wc-target-label { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); }
.wc-target-progress { flex: 1; height: 4px; background: var(--bg3); border-radius: 99px; overflow: hidden; min-width: 80px; }
.wc-target-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--green)); border-radius: 99px; transition: width 0.3s ease; }
.wc-target-pct { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); white-space: nowrap; }

/* STATS PANEL */
.wc-stats-panel { display: flex; flex-direction: column; gap: 1rem; }

.wc-stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; }
.wc-stat-card-header { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.1rem; border-bottom: 1px solid var(--border); }
.wc-stat-card-title { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; }
.wc-stat-card-badge { font-family: var(--font-mono); font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 99px; background: var(--accent-dim); color: var(--accent); }
.wc-stat-card-body { padding: 1.1rem; }

.wc-big-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.wc-big-stat { text-align: center; padding: 0.75rem 0.5rem; background: var(--bg2); border-radius: 8px; }
.wc-big-stat-num { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; color: var(--accent); }
.wc-big-stat-label { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); margin-top: 0.2rem; text-transform: uppercase; letter-spacing: 0.05em; }

.wc-stat-rows { display: flex; flex-direction: column; gap: 0.5rem; }
.wc-stat-row { display: flex; justify-content: space-between; align-items: center; }
.wc-sr-label { font-size: 0.82rem; color: var(--text-dim); }
.wc-sr-val { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text); font-weight: 500; }

/* ANALYSIS TABS */
.wc-tab-nav { display: flex; gap: 0; overflow-x: auto; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem; scrollbar-width: none; }
.wc-tab-nav::-webkit-scrollbar { display: none; }
.wc-tab-btn { padding: 0.65rem 1rem; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); border-bottom: 2px solid transparent; transition: all var(--transition); white-space: nowrap; font-family: var(--font-mono); }
.wc-tab-btn:hover { color: var(--text-dim); }
.wc-tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

.wc-tab-content { display: none; }
.wc-tab-content.active { display: block; }

/* READABILITY */
.wc-readability-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.wc-read-score { padding: 0.75rem 1rem; background: var(--bg3); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
.wc-rs-name { font-size: 0.8rem; color: var(--text-dim); }
.wc-rs-val { font-family: var(--font-mono); font-size: 0.9rem; font-weight: 500; color: var(--accent); }
.wc-rs-label { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.15rem; }
.wc-grade-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; background: var(--green-dim); border: 1px solid rgba(0,255,178,0.2); border-radius: 8px; font-size: 0.85rem; font-weight: 700; color: var(--green); margin-top: 1rem; }

/* KEYWORDS */
.wc-keyword-list { display: flex; flex-direction: column; gap: 0.4rem; max-height: 320px; overflow-y: auto; }
.wc-kw-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; background: var(--bg3); border-radius: 6px; cursor: pointer; transition: all var(--transition); }
.wc-kw-item:hover { background: var(--accent-dim); }
.wc-kw-word { font-family: var(--font-mono); font-size: 0.82rem; font-weight: 500; flex: 1; }
.wc-kw-bar-wrap { flex: 2; height: 4px; background: var(--bg2); border-radius: 99px; overflow: hidden; }
.wc-kw-bar { height: 100%; background: var(--accent); border-radius: 99px; }
.wc-kw-count { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
.wc-kw-density { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); padding: 0.15rem 0.4rem; background: var(--bg2); border-radius: 3px; }

/* SENTIMENT */
.wc-sentiment-big { text-align: center; padding: 1.25rem; background: var(--bg3); border-radius: 10px; margin-bottom: 1rem; }
.wc-sentiment-emoji { font-size: 2.5rem; margin-bottom: 0.5rem; }
.wc-sentiment-label { font-family: var(--font-head); font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.25rem; }
.wc-sentiment-score { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); }
.wc-sentiment-bars { display: flex; flex-direction: column; gap: 0.6rem; }
.wc-sent-bar { display: flex; align-items: center; gap: 0.75rem; }
.wc-sent-label { font-size: 0.78rem; color: var(--text-dim); width: 70px; }
.wc-sent-track { flex: 1; height: 6px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
.wc-sent-fill { height: 100%; border-radius: 99px; }
.wc-sent-count { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); width: 28px; text-align: right; }

/* AI DETECT */
.wc-ai-score-wrap { text-align: center; padding: 1.5rem; background: var(--bg3); border-radius: 10px; margin-bottom: 1rem; }
.wc-ai-meter { width: 100px; height: 100px; position: relative; margin: 0 auto 0.75rem; }
.wc-ai-meter svg { transform: rotate(-90deg); }
.wc-ai-meter-val { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; }
.wc-ai-verdict { font-weight: 800; font-size: 1rem; letter-spacing: -0.02em; font-family: var(--font-head); }
.wc-ai-note { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); margin-top: 0.4rem; }
.wc-signal-list { display: flex; flex-direction: column; gap: 0.5rem; }
.wc-signal { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; background: var(--bg3); border-radius: 6px; }
.wc-signal-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.wc-signal-name { font-size: 0.8rem; flex: 1; }
.wc-signal-found { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
.wc-signal-impact { font-family: var(--font-mono); font-size: 0.68rem; padding: 0.12rem 0.4rem; border-radius: 3px; }
.impact-high { background: var(--red-dim); color: var(--red); }
.impact-med { background: var(--yellow-dim); color: var(--yellow); }
.impact-low { background: var(--green-dim); color: var(--green); }

/* FIND & REPLACE */
.wc-fnr-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
.wc-fnr-input-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
.wc-fnr-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
.wc-fnr-input { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 0.55rem 0.75rem; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; outline: none; width: 100%; transition: border-color var(--transition); }
.wc-fnr-input:focus { border-color: var(--accent); }
.wc-fnr-options { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
.wc-fnr-toggle { display: flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); cursor: pointer; }
.wc-fnr-toggle input { accent-color: var(--accent); }
.wc-fnr-btn { padding: 0.55rem 1.1rem; background: var(--accent); color: var(--bg); border-radius: 7px; font-weight: 700; font-size: 0.82rem; transition: all var(--transition); }
.wc-fnr-btn:hover { opacity: 0.88; }
.wc-fnr-count { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); margin-top: 0.5rem; }

/* TEXT TOOLS */
.wc-tools-section { margin-bottom: 1.25rem; }
.wc-tools-title { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; }
.wc-tools-btns { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.wc-tool-btn { padding: 0.38rem 0.85rem; border: 1px solid var(--border); border-radius: 6px; font-size: 0.78rem; font-weight: 500; color: var(--text-dim); transition: all var(--transition); font-family: var(--font-mono); }
.wc-tool-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

/* EXPORT */
.wc-export-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.wc-export-btn { padding: 0.65rem 0.85rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.82rem; font-weight: 600; color: var(--text-dim); transition: all var(--transition); display: flex; align-items: center; gap: 0.5rem; }
.wc-export-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

/* TIME CARD */
.wc-time-rows { display: flex; flex-direction: column; gap: 0.45rem; }
.wc-time-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: var(--bg3); border-radius: 6px; }
.wc-tr-label { font-size: 0.8rem; color: var(--text-dim); }
.wc-tr-val { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text); }

/* COMPARE */
.wc-compare-area { display: flex; flex-direction: column; gap: 0.75rem; }
.wc-compare-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.06em; }
.wc-compare-textarea { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem; color: var(--text); font-family: var(--font-serif); font-size: 0.9rem; line-height: 1.7; outline: none; resize: vertical; min-height: 120px; transition: border-color var(--transition); }
.wc-compare-textarea:focus { border-color: var(--accent); }
.wc-compare-result { padding: 0.75rem 1rem; background: var(--bg3); border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; }
.wc-sim-high { color: var(--green); }
.wc-sim-mid { color: var(--yellow); }
.wc-sim-low { color: var(--accent); }

/* FEATURES */
.wc-features-bg { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.wc-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.wc-feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--transition); }
.wc-feature-card:hover { border-color: rgba(77,150,255,0.2); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.wc-feature-icon { font-size: 1.75rem; margin-bottom: 1rem; }
.wc-feature-card h3 { font-family: var(--font-head); font-weight: 800; font-size: 1rem; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
.wc-feature-card p { font-size: 0.87rem; color: var(--text-dim); line-height: 1.65; }

/* FAQ */
.wc-faq-bg { background: var(--bg2); border-top: 1px solid var(--border); }
.wc-faq-list { max-width: 700px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.6rem; }
.wc-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--transition); }
.wc-faq-item.open { border-color: rgba(77,150,255,0.25); }
.wc-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; cursor: pointer; font-weight: 700; font-size: 0.9rem; letter-spacing: -0.02em; gap: 1rem; }
.wc-faq-q:hover { color: var(--accent); }
.wc-faq-arrow { transition: transform 0.25s ease; font-size: 0.9rem; color: var(--text-muted); flex-shrink: 0; }
.wc-faq-item.open .wc-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.wc-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.88rem; color: var(--text-dim); line-height: 1.7; }
.wc-faq-item.open .wc-faq-a { max-height: 300px; padding: 0 1.25rem 1rem; }

/* FOOTER */
.wc-footer { border-top: 1px solid var(--border); padding: 3.5rem 1.5rem; text-align: center; }
.wc-footer-logo { font-family: var(--font-head); font-size: 1.35rem; font-weight: 800; letter-spacing: -0.04em; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
.wc-footer-logo .flogo-icon { width: 26px; height: 26px; background: linear-gradient(135deg, var(--accent), var(--green)); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; }
.wc-footer-sub { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; }
.wc-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.75rem; margin-bottom: 2rem; list-style: none; }
.wc-footer-links a { font-size: 0.83rem; color: var(--text-muted); transition: color var(--transition); }
.wc-footer-links a:hover { color: var(--accent); }
.wc-footer-copy { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); }

/* TOAST */
.wc-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.75rem 1.25rem; border-radius: 10px; font-size: 0.83rem; font-family: var(--font-mono); box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.6rem; transform: translateY(80px); opacity: 0; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); pointer-events: none; }
.wc-toast.show { transform: translateY(0); opacity: 1; }

@media(max-width: 768px) {
  .wc-nav-links { display: none; }
  .wc-section { padding: 4rem 1rem; }
  .wc-readability-grid { grid-template-columns: 1fr; }
  .wc-fnr-inputs { grid-template-columns: 1fr; }
  .wc-export-grid { grid-template-columns: 1fr; }
  .wc-big-stats { grid-template-columns: repeat(2, 1fr); }
}
`;

const STOP_WORDS = new Set(['the','be','to','of','and','a','in','that','have','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us','i','am','was','were','been','has','had','did','said','are','is','each','much','more','very','too','every','those','such','how','let','put','both','before','while','between','great','old','still','three','down','since','thing','place','through','where','long','here','re','off','under','last','never','thought','left','found','bring','might','need','another','thing']);

export default function WordCounterAnalyzer() {
  useEffect(() => {
    const root = document.getElementById('wc-root');
    if (!root) return;

    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const G = (id) => root.querySelector(`#${id}`);

    // ─── State ───────────────────────────────────
    const state = {
      text: '',
      activeTab: 'readability',
      targetWords: 0,
      fontSize: 16,
      findWord: '',
      replaceWord: '',
      fnrCaseSensitive: false,
      fnrWholeWord: false,
      compareText: '',
    };

    const textarea = G('wc-textarea');
    if (!textarea) return;

    // ─── Live update ──────────────────────────────
    let updateTimer = null;
    textarea.addEventListener('input', () => {
      state.text = textarea.value;
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = T(updateAll, 120);
      updateLineNumbers();
    });

    function updateAll() {
      updateBasicStats();
      updateTimings();
      updateActiveTab();
    }

    // ─── Line Numbers ─────────────────────────────
    function updateLineNumbers() {
      const lines = textarea.value.split('\n').length;
      const ln = G('wc-line-numbers');
      if (!ln) return;
      ln.innerHTML = Array.from({ length: lines }, (_, i) =>
        `<div class="wc-line-num">${i + 1}</div>`).join('');
    }

    // ─── Basic Stats ──────────────────────────────
    function getStats() {
      const text = state.text;
      const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
      const wordCount = words.length;
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, '').length;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
      const lines = text.split('\n').length;
      const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''))).size;
      const avgWordLen = wordCount ? (words.reduce((s, w) => s + w.replace(/[^a-zA-Z]/g, '').length, 0) / wordCount).toFixed(1) : 0;
      const sortedByLen = [...words].sort((a, b) => b.length - a.length);
      const longestWord = sortedByLen[0] ? sortedByLen[0].replace(/[^a-zA-Z]/g, '') : '—';
      return { wordCount, chars, charsNoSpaces, sentences, paragraphs, lines, uniqueWords, avgWordLen, longestWord };
    }

    function updateBasicStats() {
      const s = getStats();
      const set = (id, val) => { const el = G(id); if (el) el.textContent = val; };
      set('wc-words', s.wordCount.toLocaleString());
      set('wc-chars', s.chars.toLocaleString());
      set('wc-chars-ns', s.charsNoSpaces.toLocaleString());
      set('wc-sentences', s.sentences.toLocaleString());
      set('wc-paragraphs', s.paragraphs.toLocaleString());
      set('wc-lines', s.lines.toLocaleString());
      set('wc-unique', s.uniqueWords.toLocaleString());
      set('wc-avg-word-len', s.avgWordLen);
      set('wc-longest-word', s.longestWord);

      // Target progress
      const targetInput = G('wc-target-input');
      const targetWords = parseInt(targetInput ? targetInput.value : '0') || 0;
      if (targetWords > 0) {
        const pct = Math.min(100, Math.round((s.wordCount / targetWords) * 100));
        const fill = G('wc-target-fill');
        const pctEl = G('wc-target-pct');
        if (fill) fill.style.width = pct + '%';
        if (pctEl) pctEl.textContent = `${s.wordCount}/${targetWords} (${pct}%)`;
      }
    }

    // ─── Time Estimates ───────────────────────────
    function updateTimings() {
      const { wordCount } = getStats();
      const fmtTime = (mins) => {
        if (!mins) return '0 sec';
        const m = Math.floor(mins);
        const s = Math.round((mins - m) * 60);
        if (m === 0) return `${s} sec`;
        if (s === 0) return `${m} min`;
        return `${m} min ${s} sec`;
      };
      const set = (id, val) => { const el = G(id); if (el) el.textContent = val; };
      set('wc-time-read', fmtTime(wordCount / 200));
      set('wc-time-speak', fmtTime(wordCount / 130));
      set('wc-time-slow', fmtTime(wordCount / 130));
      set('wc-time-fast', fmtTime(wordCount / 300));
    }

    // ─── Syllable Counter ─────────────────────────
    function countSyllables(word) {
      word = word.toLowerCase().replace(/[^a-z]/g, '');
      if (!word.length) return 0;
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const matches = word.match(/[aeiouy]{1,2}/g);
      return matches ? matches.length : 1;
    }

    // ─── Readability ──────────────────────────────
    function getReadability() {
      const text = state.text;
      const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
      const wordCount = words.length;
      if (wordCount < 10) return null;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
      const chars = text.replace(/\s/g, '').replace(/[^a-zA-Z]/g, '').length;
      const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
      const complexWords = words.filter(w => countSyllables(w) >= 3).length;

      const fleschEase = Math.max(0, Math.min(100, 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount)));
      const fkGrade = Math.max(0, 0.39 * (wordCount / sentences) + 11.8 * (syllables / wordCount) - 15.59);
      const fogIndex = 0.4 * ((wordCount / sentences) + 100 * (complexWords / wordCount));
      const L = (chars / wordCount) * 100;
      const S = (sentences / wordCount) * 100;
      const cli = 0.0588 * L - 0.296 * S - 15.8;
      const ari = 4.71 * (chars / wordCount) + 0.5 * (wordCount / sentences) - 21.43;

      const grade = Math.round((fkGrade + fogIndex + cli + ari) / 4);
      const gradeLabel = grade <= 5 ? 'Elementary' : grade <= 8 ? 'Middle School' : grade <= 12 ? 'High School' : grade <= 16 ? 'College' : 'Professional';
      const easeLabel = fleschEase >= 80 ? 'Easy' : fleschEase >= 60 ? 'Standard' : fleschEase >= 40 ? 'Difficult' : 'Very Difficult';

      return { fleschEase: fleschEase.toFixed(1), fkGrade: fkGrade.toFixed(1), fogIndex: fogIndex.toFixed(1), cli: cli.toFixed(1), ari: ari.toFixed(1), grade, gradeLabel, easeLabel };
    }

    function renderReadability() {
      const container = G('wc-readability-content');
      if (!container) return;
      const r = getReadability();
      if (!r) { container.innerHTML = '<div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted);text-align:center;padding:1.5rem">Enter at least 10 words to see readability scores.</div>'; return; }
      container.innerHTML = `
        <div class="wc-readability-grid">
          <div class="wc-read-score">
            <div><div class="wc-rs-name">Flesch Ease</div><div class="wc-rs-label">${r.easeLabel}</div></div>
            <div class="wc-rs-val">${r.fleschEase}</div>
          </div>
          <div class="wc-read-score">
            <div><div class="wc-rs-name">F-K Grade</div><div class="wc-rs-label">Grade ${Math.round(r.fkGrade)}</div></div>
            <div class="wc-rs-val">${r.fkGrade}</div>
          </div>
          <div class="wc-read-score">
            <div><div class="wc-rs-name">Gunning Fog</div><div class="wc-rs-label">Grade ${Math.round(r.fogIndex)}</div></div>
            <div class="wc-rs-val">${r.fogIndex}</div>
          </div>
          <div class="wc-read-score">
            <div><div class="wc-rs-name">Coleman-Liau</div><div class="wc-rs-label">Grade ${Math.round(r.cli)}</div></div>
            <div class="wc-rs-val">${r.cli}</div>
          </div>
          <div class="wc-read-score">
            <div><div class="wc-rs-name">ARI</div><div class="wc-rs-label">Grade ${Math.round(r.ari)}</div></div>
            <div class="wc-rs-val">${r.ari}</div>
          </div>
        </div>
        <div class="wc-grade-badge">🎯 Overall: Grade ${r.grade} — ${r.gradeLabel}</div>
      `;
    }

    // ─── Keywords ─────────────────────────────────
    function getKeywords() {
      const words = state.text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
      const freq = {};
      words.forEach(w => freq[w] = (freq[w] || 0) + 1);
      const total = words.length || 1;
      return Object.entries(freq).sort(([, a], [, b]) => b - a).slice(0, 20).map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(1) }));
    }

    function renderKeywords() {
      const container = G('wc-keywords-content');
      if (!container) return;
      const kws = getKeywords();
      if (!kws.length) { container.innerHTML = '<div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted);text-align:center;padding:1.5rem">Enter text to see top keywords.</div>'; return; }
      const maxCount = kws[0].count;
      container.innerHTML = `
        <div class="wc-keyword-list">
          ${kws.map(k => `
            <div class="wc-kw-item">
              <span class="wc-kw-word">${k.word}</span>
              <div class="wc-kw-bar-wrap"><div class="wc-kw-bar" style="width:${(k.count/maxCount)*100}%"></div></div>
              <span class="wc-kw-count">${k.count}×</span>
              <span class="wc-kw-density">${k.density}%</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ─── Sentiment ────────────────────────────────
    const POSITIVE_WORDS = new Set(['good','great','excellent','amazing','wonderful','fantastic','best','love','happy','joy','positive','beautiful','perfect','brilliant','outstanding','superb','awesome','incredible','nice','better','success','win','benefit','free','easy','clear','strong','healthy','safe','right','true','hope','enjoy','glad','pleased','delightful','valuable','helpful','powerful','effective','efficient','smart','innovative']);
    const NEGATIVE_WORDS = new Set(['bad','terrible','horrible','awful','worst','hate','sad','angry','negative','ugly','wrong','fail','problem','issue','difficult','hard','poor','weak','dangerous','risky','harmful','broken','error','bug','crash','slow','boring','annoying','frustrating','disappointing','useless','stupid','ridiculous','absurd','waste','loss','death','pain','suffer','trouble','difficult','unable','impossible','never','nothing','nobody','without','lack','miss','lost','fail','down','low','false','lie','fake','scam']);

    function getSentiment() {
      const words = state.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
      const posWords = [], negWords = [];
      words.forEach(w => {
        if (POSITIVE_WORDS.has(w)) posWords.push(w);
        else if (NEGATIVE_WORDS.has(w)) negWords.push(w);
      });
      const score = posWords.length - negWords.length;
      const total = words.length || 1;
      return { score, posCount: posWords.length, negCount: negWords.length, neutralCount: total - posWords.length - negWords.length, label: score > 2 ? 'Positive' : score < -2 ? 'Negative' : 'Neutral', emoji: score > 2 ? '😊' : score < -2 ? '😞' : '😐', color: score > 2 ? 'var(--green)' : score < -2 ? 'var(--red)' : 'var(--yellow)', total };
    }

    function renderSentiment() {
      const container = G('wc-sentiment-content');
      if (!container) return;
      const s = getSentiment();
      const posW = Math.round((s.posCount / s.total) * 100);
      const negW = Math.round((s.negCount / s.total) * 100);
      container.innerHTML = `
        <div class="wc-sentiment-big">
          <div class="wc-sentiment-emoji">${s.emoji}</div>
          <div class="wc-sentiment-label" style="color:${s.color}">${s.label}</div>
          <div class="wc-sentiment-score">Score: ${s.score > 0 ? '+' : ''}${s.score}</div>
        </div>
        <div class="wc-sentiment-bars">
          <div class="wc-sent-bar">
            <span class="wc-sent-label">😊 Positive</span>
            <div class="wc-sent-track"><div class="wc-sent-fill" style="width:${posW}%;background:var(--green)"></div></div>
            <span class="wc-sent-count">${s.posCount}</span>
          </div>
          <div class="wc-sent-bar">
            <span class="wc-sent-label">😞 Negative</span>
            <div class="wc-sent-track"><div class="wc-sent-fill" style="width:${negW}%;background:var(--red)"></div></div>
            <span class="wc-sent-count">${s.negCount}</span>
          </div>
          <div class="wc-sent-bar">
            <span class="wc-sent-label">😐 Neutral</span>
            <div class="wc-sent-track"><div class="wc-sent-fill" style="width:${100-posW-negW}%;background:var(--text-muted)"></div></div>
            <span class="wc-sent-count">${s.neutralCount}</span>
          </div>
        </div>
      `;
    }

    // ─── AI Detection ─────────────────────────────
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    function countPhraseMatches(text, phrase) {
      const regex = new RegExp(`\\b${escapeRegex(phrase).replace(/\s+/g, '\\s+')}\\b`, 'gi');
      return (text.match(regex) || []).length;
    }

    function detectAI() {
      const text = state.text.trim();
      const signals = [];
      let score = 0;
      const lower = text.toLowerCase();
      const words = text.match(/\b[\w'-]+\b/g) || [];
      const wordCount = words.length;
      if (wordCount < 40) {
        return {
          score: 0,
          signals: [{ name: 'Sample size', found: `${wordCount} words`, impact: 'Low', color: 'var(--text-muted)' }],
          verdict: 'Need more text',
          color: 'var(--text-muted)',
        };
      }

      const cleanWords = words.map(w => w.toLowerCase().replace(/(^[^a-z0-9]+|[^a-z0-9]+$)/g, '')).filter(Boolean);
      const sentenceTexts = text
        .split(/(?<=[.!?])\s+|\n+/)
        .map(s => s.trim())
        .filter(Boolean);
      const sentenceCount = sentenceTexts.length || 1;
      const sentenceLengths = sentenceTexts
        .map(s => (s.match(/\b[\w'-]+\b/g) || []).length)
        .filter(Boolean);
      const uniqueRatio = new Set(cleanWords).size / Math.max(cleanWords.length, 1);

      // Transition phrases
      const transitions = ['furthermore','moreover','additionally','in conclusion','it is worth noting','it should be noted','in summary','to summarize','in essence','ultimately','importantly','notably','significantly','consequently'];
      const transCount = transitions.reduce((sum, phrase) => sum + countPhraseMatches(lower, phrase), 0);
      if (transCount >= 4) { score += 18; signals.push({ name: 'AI-style transitions', found: `${transCount} matches`, impact: 'High', color: 'var(--red)' }); }
      else if (transCount >= 2) { score += 8; signals.push({ name: 'Transition stacking', found: `${transCount} matches`, impact: 'Medium', color: 'var(--yellow)' }); }
      else { signals.push({ name: 'Transition usage', found: `${transCount} matches`, impact: 'Low', color: 'var(--green)' }); }

      // Passive voice
      const passiveCount = (text.match(/\b(is|are|was|were|be|been|being)\s+\w+(ed|en)\b/gi) || []).length;
      const passiveRatio = passiveCount / sentenceCount;
      if (passiveRatio > 0.35) { score += 14; signals.push({ name: 'High passive voice', found: `${Math.round(passiveRatio * 100)}%`, impact: 'High', color: 'var(--red)' }); }
      else if (passiveRatio > 0.18) { score += 6; signals.push({ name: 'Passive voice', found: `${Math.round(passiveRatio * 100)}%`, impact: 'Medium', color: 'var(--yellow)' }); }
      else { signals.push({ name: 'Passive voice', found: `${Math.round(passiveRatio * 100)}%`, impact: 'Low', color: 'var(--green)' }); }

      // Sentence length variance
      if (sentenceLengths.length > 3) {
        const avg = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
        const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avg, 2), 0) / sentenceLengths.length;
        const stdev = Math.sqrt(variance);
        const burstiness = avg ? stdev / avg : 0;
        if (burstiness < 0.28) { score += 18; signals.push({ name: 'Uniform sentence rhythm', found: `Burstiness ${burstiness.toFixed(2)}`, impact: 'High', color: 'var(--red)' }); }
        else if (burstiness < 0.4) { score += 7; signals.push({ name: 'Moderate sentence variance', found: `Burstiness ${burstiness.toFixed(2)}`, impact: 'Medium', color: 'var(--yellow)' }); }
        else { signals.push({ name: 'Sentence variation', found: `Burstiness ${burstiness.toFixed(2)}`, impact: 'Low', color: 'var(--green)' }); }
      }

      // Hedge words
      const hedges = ['might','could','perhaps','possibly','potentially','generally','typically','often','sometimes','usually','may','can be','tend to'];
      const hedgeCount = hedges.reduce((sum, phrase) => sum + countPhraseMatches(lower, phrase), 0);
      if (hedgeCount >= 5) { score += 12; signals.push({ name: 'Heavy hedging', found: `${hedgeCount} matches`, impact: 'Medium', color: 'var(--yellow)' }); }
      else if (hedgeCount > 0) { signals.push({ name: 'Hedge words', found: `${hedgeCount} matches`, impact: 'Low', color: 'var(--green)' }); }

      // Vocabulary diversity
      if (uniqueRatio < 0.42) { score += 14; signals.push({ name: 'Low vocabulary diversity', found: `${Math.round(uniqueRatio * 100)}%`, impact: 'High', color: 'var(--red)' }); }
      else if (uniqueRatio < 0.52) { score += 6; signals.push({ name: 'Limited vocabulary range', found: `${Math.round(uniqueRatio * 100)}%`, impact: 'Medium', color: 'var(--yellow)' }); }
      else { signals.push({ name: 'Vocabulary diversity', found: `${Math.round(uniqueRatio * 100)}%`, impact: 'Low', color: 'var(--green)' }); }

      // Repeated openings and phrase reuse
      const openers = sentenceTexts
        .map(s => (s.toLowerCase().match(/\b[a-z']+\b(?:\s+\b[a-z']+\b){0,2}/) || [''])[0].trim())
        .filter(Boolean);
      const openerFreq = {};
      openers.forEach(opener => { openerFreq[opener] = (openerFreq[opener] || 0) + 1; });
      const repeatedOpeners = Object.values(openerFreq).filter(count => count >= 3).length;
      if (repeatedOpeners > 0) {
        score += 10;
        signals.push({ name: 'Repeated sentence openings', found: `${repeatedOpeners} reused`, impact: 'Medium', color: 'var(--yellow)' });
      } else {
        signals.push({ name: 'Sentence openings', found: 'Varied', impact: 'Low', color: 'var(--green)' });
      }

      // Human markers lower the score a bit to reduce false positives
      const contractions = (text.match(/\b\w+(?:'ll|'re|'ve|n't|'d|'m|'s)\b/g) || []).length;
      const questions = (text.match(/\?/g) || []).length;
      if (contractions >= 2 || questions >= 1) {
        const reduction = Math.min(12, contractions * 2 + questions * 3);
        score -= reduction;
        signals.push({ name: 'Human-style markers', found: `${contractions} contractions, ${questions} questions`, impact: 'Low', color: 'var(--green)' });
      }

      const pct = Math.max(0, Math.min(100, Math.round(score)));
      const verdict = pct >= 65 ? 'Likely AI-Generated' : pct >= 40 ? 'Mixed / Possibly AI' : 'Likely Human-Written';
      const color = pct >= 65 ? 'var(--red)' : pct >= 40 ? 'var(--yellow)' : 'var(--green)';
      return { score: pct, signals, verdict, color };
    }

    function renderAIDetect() {
      const container = G('wc-aidetect-content');
      if (!container) return;
      const ai = detectAI();
      const circ = 2 * Math.PI * 40;
      const filled = (ai.score / 100) * circ;
      container.innerHTML = `
        <div class="wc-ai-score-wrap">
          <div class="wc-ai-meter">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg2)" stroke-width="8"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="${ai.color}" stroke-width="8"
                stroke-dasharray="${filled} ${circ - filled}" stroke-linecap="round"/>
            </svg>
            <div class="wc-ai-meter-val" style="color:${ai.color}">${ai.score}%</div>
          </div>
          <div class="wc-ai-verdict" style="color:${ai.color}">${ai.verdict}</div>
          <div class="wc-ai-note">Heuristic analysis · Not 100% accurate</div>
        </div>
        <div class="wc-signal-list">
          ${ai.signals.map(s => `
            <div class="wc-signal">
              <div class="wc-signal-dot" style="background:${s.color}"></div>
              <span class="wc-signal-name">${s.name}</span>
              <span class="wc-signal-found">${s.found}</span>
              <span class="wc-signal-impact impact-${s.impact.toLowerCase().slice(0,3)}">${s.impact}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ─── Compare ──────────────────────────────────
    function jaccardSimilarity(str1, str2) {
      const set1 = new Set(str1.toLowerCase().split(/\s+/));
      const set2 = new Set(str2.toLowerCase().split(/\s+/));
      const intersection = [...set1].filter(x => set2.has(x)).length;
      const union = new Set([...set1, ...set2]).size;
      return union ? intersection / union : 0;
    }

    function renderCompare() {
      const container = G('wc-compare-result-wrap');
      if (!container || !state.compareText.trim() || !state.text.trim()) return;
      const sim = Math.round(jaccardSimilarity(state.text, state.compareText) * 100);
      const cls = sim > 70 ? 'wc-sim-high' : sim > 40 ? 'wc-sim-mid' : 'wc-sim-low';
      const label = sim > 70 ? '⚠ High similarity' : sim > 40 ? '~ Moderate similarity' : '✓ Low similarity';
      container.innerHTML = `
        <div class="wc-compare-result">
          <span class="${cls}">Similarity: ${sim}% — ${label}</span>
        </div>
      `;
    }

    // ─── Tab System ───────────────────────────────
    root.querySelectorAll('.wc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.wc-tab-btn').forEach(b => b.classList.remove('active'));
        root.querySelectorAll('.wc-tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        state.activeTab = btn.dataset.tab;
        const content = G(`wc-tab-${state.activeTab}`);
        if (content) content.classList.add('active');
        updateActiveTab();
      });
    });

    function updateActiveTab() {
      switch (state.activeTab) {
        case 'readability': renderReadability(); break;
        case 'keywords': renderKeywords(); break;
        case 'sentiment': renderSentiment(); break;
        case 'aidetect': renderAIDetect(); break;
        case 'compare': renderCompare(); break;
      }
    }

    // ─── Text Toolbar ─────────────────────────────
    const caseMap = {
      uppercase: t => t.toUpperCase(),
      lowercase: t => t.toLowerCase(),
      titlecase: t => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      sentencecase: t => t.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
      camelcase: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      snakecase: t => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
      kebabcase: t => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };
    const cleanMap = {
      removeextraspaces: t => t.replace(/  +/g, ' ').trim(),
      removeemptylines: t => t.split('\n').filter(l => l.trim()).join('\n'),
      removelinebreaks: t => t.replace(/\n/g, ' ').replace(/  +/g, ' '),
      trimlines: t => t.split('\n').map(l => l.trim()).join('\n'),
      removeduplicatelines: t => [...new Set(t.split('\n'))].join('\n'),
      sortlines: t => t.split('\n').sort().join('\n'),
      reverselines: t => t.split('\n').reverse().join('\n'),
      reversetext: t => t.split('').reverse().join(''),
      reversewords: t => t.split(/\s+/).reverse().join(' '),
      rot13: t => t.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13))),
      addlinenumbers: t => t.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n'),
      removelinenumbers: t => t.split('\n').map(l => l.replace(/^\d+\.\s*/, '')).join('\n'),
    };

    root.querySelectorAll('[data-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fn = caseMap[btn.dataset.case];
        if (fn) { textarea.value = fn(textarea.value); state.text = textarea.value; updateAll(); showToast('✓ Applied'); }
      });
    });
    root.querySelectorAll('[data-clean]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fn = cleanMap[btn.dataset.clean];
        if (fn) { textarea.value = fn(textarea.value); state.text = textarea.value; updateAll(); showToast('✓ Applied'); }
      });
    });

    // ─── Find & Replace ───────────────────────────
    const fnrInput = G('wc-find-input');
    const fnrReplace = G('wc-replace-input');
    if (fnrInput) fnrInput.addEventListener('input', () => { state.findWord = fnrInput.value; });
    if (fnrReplace) fnrReplace.addEventListener('input', () => { state.replaceWord = fnrReplace.value; });

    const fnrCsToggle = G('wc-fnr-cs');
    if (fnrCsToggle) fnrCsToggle.addEventListener('change', () => { state.fnrCaseSensitive = fnrCsToggle.checked; });
    const fnrWwToggle = G('wc-fnr-ww');
    if (fnrWwToggle) fnrWwToggle.addEventListener('change', () => { state.fnrWholeWord = fnrWwToggle.checked; });

    const fnrBtn = G('wc-fnr-btn');
    if (fnrBtn) fnrBtn.addEventListener('click', () => {
      if (!state.findWord) return;
      const flags = state.fnrCaseSensitive ? 'g' : 'gi';
      const escaped = state.findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = state.fnrWholeWord ? `\\b${escaped}\\b` : escaped;
      const regex = new RegExp(pattern, flags);
      const matches = (textarea.value.match(regex) || []).length;
      textarea.value = textarea.value.replace(regex, state.replaceWord);
      state.text = textarea.value;
      updateAll();
      const countEl = G('wc-fnr-result');
      if (countEl) countEl.textContent = `Replaced ${matches} occurrence${matches !== 1 ? 's' : ''}`;
      showToast(`✓ Replaced ${matches} match${matches !== 1 ? 'es' : ''}`);
    });

    // ─── Font size ────────────────────────────────
    const fsInc = G('wc-fs-inc'), fsDec = G('wc-fs-dec');
    if (fsInc) fsInc.addEventListener('click', () => {
      state.fontSize = Math.min(24, state.fontSize + 1);
      textarea.style.fontSize = state.fontSize + 'px';
      const fsVal = G('wc-fs-val'); if (fsVal) fsVal.textContent = state.fontSize;
    });
    if (fsDec) fsDec.addEventListener('click', () => {
      state.fontSize = Math.max(12, state.fontSize - 1);
      textarea.style.fontSize = state.fontSize + 'px';
      const fsVal = G('wc-fs-val'); if (fsVal) fsVal.textContent = state.fontSize;
    });

    // ─── Export ───────────────────────────────────
    const exportHandlers = {
      'wc-export-txt': () => { download(state.text, 'text.txt', 'text/plain'); },
      'wc-export-md': () => { download(state.text, 'text.md', 'text/markdown'); },
      'wc-export-html': () => {
        const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Exported Text</title><style>body{font-family:Georgia,serif;max-width:700px;margin:2rem auto;line-height:1.8;color:#222}</style></head><body><p>${state.text.replace(/\n/g, '</p><p>')}</p></body></html>`;
        download(html, 'text.html', 'text/html');
      },
      'wc-export-copy': () => { navigator.clipboard.writeText(state.text).then(() => showToast('✓ Copied to clipboard')); },
      'wc-export-stats': () => {
        const s = getStats();
        const r = getReadability();
        const sent = getSentiment();
        const report = `Word Count Analysis Report\nGenerated: ${new Date().toLocaleString()}\n\n---\nWords: ${s.wordCount}\nCharacters: ${s.chars}\nSentences: ${s.sentences}\nParagraphs: ${s.paragraphs}\n---\nReadability: ${r ? 'Grade ' + r.grade + ' (' + r.gradeLabel + ')' : 'N/A'}\nFlesch Ease: ${r ? r.fleschEase : 'N/A'}\n---\nSentiment: ${sent.label} (Score: ${sent.score})\n`;
        download(report, 'analysis-report.txt', 'text/plain');
      },
    };
    Object.entries(exportHandlers).forEach(([id, fn]) => {
      const btn = G(id);
      if (btn) btn.addEventListener('click', fn);
    });

    function download(content, filename, type) {
      const blob = new Blob([content], { type });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      showToast(`✓ Downloaded ${filename}`);
    }

    // ─── Compare text area ────────────────────────
    const compareArea = G('wc-compare-textarea');
    if (compareArea) compareArea.addEventListener('input', () => {
      state.compareText = compareArea.value;
      renderCompare();
    });

    // ─── Target ───────────────────────────────────
    const targetInput = G('wc-target-input');
    if (targetInput) targetInput.addEventListener('input', updateBasicStats);

    // ─── FAQ ──────────────────────────────────────
    root.querySelectorAll('.wc-faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.wc-faq-item');
        const isOpen = item.classList.contains('open');
        root.querySelectorAll('.wc-faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // ─── Copy text button ─────────────────────────
    const copyAllBtn = G('wc-copy-all');
    if (copyAllBtn) copyAllBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(state.text).then(() => showToast('✓ Text copied'));
    });
    const clearBtn = G('wc-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      textarea.value = ''; state.text = '';
      updateAll(); updateLineNumbers(); showToast('✓ Cleared');
    });

    // ─── Toast ────────────────────────────────────
    let toastTimer = null;
    function showToast(msg) {
      const toast = G('wc-toast');
      const toastMsg = G('wc-toast-msg');
      if (!toast) return;
      toastMsg.textContent = msg;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = T(() => toast.classList.remove('show'), 2200);
    }

    // ─── Init ─────────────────────────────────────
    updateAll();
    updateLineNumbers();
    renderReadability();

    return () => { timers.forEach(clearTimeout); };
  }, []);

  return (
    <div id="wc-root" className="wc-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="wc-nav">
        <div className="wc-nav-logo">
          <div className="logo-icon">📝</div>
          <span>Word Counter</span>
        </div>
        <ul className="wc-nav-links">
          <li><a href="#wc-app">Analyzer</a></li>
          <li><a href="#wc-features">Features</a></li>
          <li><a href="#wc-faq">FAQ</a></li>
        </ul>
        <a href="#wc-app" className="wc-nav-cta">Start Writing →</a>
      </nav>

      {/* HERO */}
      <section className="wc-hero">
        <div className="wc-hero-bg" aria-hidden="true" />
        <div className="wc-hero-dots" aria-hidden="true" />
        <div className="wc-hero-orb" aria-hidden="true" />
        <div className="wc-hero-content">
          <div className="wc-hero-badge">Live Analysis · Pure JS · No API · Free Forever</div>
          <h1>
            <span className="h1-light">Count words.</span><br />
            <span className="h1-blue">Analyze deeply.</span><br />
            <span className="h1-green">Write better.</span>
          </h1>
          <p className="wc-hero-sub">
            Real-time word count, readability scores, keyword extraction, sentiment analysis, AI detection, and 20 text tools — all in your browser.
          </p>
          <div className="wc-hero-actions">
            <a href="#wc-app" className="wc-btn-primary">
              <span>Open Analyzer</span>
              <span>→</span>
            </a>
            <a href="#wc-features" className="wc-btn-ghost">
              <span>See All Features</span>
            </a>
          </div>
          <div className="wc-hero-pills">
            {['Word Count','Characters','Readability','Flesch Score','Gunning Fog','Sentiment','AI Detection','Keywords','Find & Replace','Case Converter','Export'].map(p => (
              <div key={p} className="wc-hero-pill">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="wc-section wc-app-bg" id="wc-app">
        <div className="wc-section-inner">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="wc-section-label">⚡ Live Analyzer</div>
            <h2 className="wc-section-title">Start Typing or Paste Text</h2>
            <p className="wc-section-sub" style={{ margin: '0 auto' }}>Every metric updates as you type — zero delay, zero uploads.</p>
          </div>

          <div className="wc-app-layout">
            {/* EDITOR */}
            <div>
              <div className="wc-editor-wrap">
                <div className="wc-editor-toolbar">
                  <button className="wc-toolbar-btn" data-case="uppercase">AA</button>
                  <button className="wc-toolbar-btn" data-case="lowercase">aa</button>
                  <button className="wc-toolbar-btn" data-case="titlecase">Aa</button>
                  <button className="wc-toolbar-btn" data-case="sentencecase">A.</button>
                  <button className="wc-toolbar-btn" data-case="camelcase">aA</button>
                  <div className="wc-toolbar-sep" />
                  <button className="wc-toolbar-btn" data-clean="removeextraspaces" title="Remove extra spaces">⎵⎵</button>
                  <button className="wc-toolbar-btn" data-clean="removeemptylines" title="Remove empty lines">¶</button>
                  <button className="wc-toolbar-btn" data-clean="sortlines" title="Sort lines A-Z">A↑</button>
                  <button className="wc-toolbar-btn" data-clean="reversetext" title="Reverse text">↩</button>
                  <button className="wc-toolbar-btn" data-clean="rot13" title="ROT13 encode">🔐</button>
                  <div className="wc-toolbar-sep" />
                  <button className="wc-toolbar-btn" id="wc-copy-all" title="Copy all text">Copy</button>
                  <button className="wc-toolbar-btn" id="wc-clear-btn" title="Clear text">Clear</button>
                  <div className="wc-toolbar-end">
                    <div className="wc-font-size-btns">
                      <button className="wc-fs-btn" id="wc-fs-dec">−</button>
                      <span className="wc-fs-val" id="wc-fs-val">16</span>
                      <button className="wc-fs-btn" id="wc-fs-inc">+</button>
                    </div>
                  </div>
                </div>

                <div className="wc-editor-main">
                  <div className="wc-line-numbers" id="wc-line-numbers">
                    <div className="wc-line-num">1</div>
                  </div>
                  <textarea
                    id="wc-textarea"
                    className="wc-textarea"
                    placeholder="Start typing or paste your text here…&#10;&#10;Word count, readability, sentiment, and more update instantly."
                    spellCheck={true}
                  />
                </div>

                <div className="wc-target-bar">
                  <span className="wc-target-label">Target:</span>
                  <input type="number" className="wc-target-input" id="wc-target-input" min="0" placeholder="500" />
                  <span className="wc-target-label">words</span>
                  <div className="wc-target-progress">
                    <div className="wc-target-fill" id="wc-target-fill" style={{ width: '0%' }} />
                  </div>
                  <span className="wc-target-pct" id="wc-target-pct">0/0 (0%)</span>
                </div>
              </div>

              {/* ANALYSIS SECTION */}
              <div style={{ marginTop: '1.5rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                <div className="wc-tab-nav">
                  {[
                    { id: 'readability', label: '📚 Readability' },
                    { id: 'keywords', label: '🔑 Keywords' },
                    { id: 'sentiment', label: '😊 Sentiment' },
                    { id: 'aidetect', label: '🤖 AI Detect' },
                    { id: 'findreplace', label: '🔍 Find & Replace' },
                    { id: 'tools', label: '🛠 Tools' },
                    { id: 'compare', label: '⇌ Compare' },
                    { id: 'export', label: '⬇ Export' },
                  ].map((t, i) => (
                    <button key={t.id} className={`wc-tab-btn${i === 0 ? ' active' : ''}`} data-tab={t.id}>{t.label}</button>
                  ))}
                </div>

                {/* Readability */}
                <div id="wc-tab-readability" className="wc-tab-content active">
                  <div id="wc-readability-content" />
                </div>

                {/* Keywords */}
                <div id="wc-tab-keywords" className="wc-tab-content">
                  <div id="wc-keywords-content" />
                </div>

                {/* Sentiment */}
                <div id="wc-tab-sentiment" className="wc-tab-content">
                  <div id="wc-sentiment-content" />
                </div>

                {/* AI Detect */}
                <div id="wc-tab-aidetect" className="wc-tab-content">
                  <div id="wc-aidetect-content" />
                </div>

                {/* Find & Replace */}
                <div id="wc-tab-findreplace" className="wc-tab-content">
                  <div className="wc-fnr-inputs">
                    <div className="wc-fnr-input-wrap">
                      <label className="wc-fnr-label">Find</label>
                      <input type="text" className="wc-fnr-input" id="wc-find-input" placeholder="Search term..." />
                    </div>
                    <div className="wc-fnr-input-wrap">
                      <label className="wc-fnr-label">Replace with</label>
                      <input type="text" className="wc-fnr-input" id="wc-replace-input" placeholder="Replacement..." />
                    </div>
                  </div>
                  <div className="wc-fnr-options">
                    <label className="wc-fnr-toggle"><input type="checkbox" id="wc-fnr-cs" /> Case sensitive</label>
                    <label className="wc-fnr-toggle"><input type="checkbox" id="wc-fnr-ww" /> Whole word only</label>
                  </div>
                  <button className="wc-fnr-btn" id="wc-fnr-btn">Replace All</button>
                  <div className="wc-fnr-count" id="wc-fnr-result"></div>
                </div>

                {/* Tools */}
                <div id="wc-tab-tools" className="wc-tab-content">
                  <div className="wc-tools-section">
                    <div className="wc-tools-title">Case Converter</div>
                    <div className="wc-tools-btns">
                      {[['uppercase','UPPERCASE'],['lowercase','lowercase'],['titlecase','Title Case'],['sentencecase','Sentence case'],['camelcase','camelCase'],['snakecase','snake_case'],['kebabcase','kebab-case']].map(([k,l]) =>
                        <button key={k} className="wc-tool-btn" data-case={k}>{l}</button>)}
                    </div>
                  </div>
                  <div className="wc-tools-section">
                    <div className="wc-tools-title">Text Cleaner</div>
                    <div className="wc-tools-btns">
                      {[['removeextraspaces','Remove Extra Spaces'],['removeemptylines','Remove Empty Lines'],['removelinebreaks','Remove Line Breaks'],['trimlines','Trim Each Line'],['removeduplicatelines','Remove Duplicate Lines'],['sortlines','Sort Lines A-Z'],['reverselines','Reverse Line Order']].map(([k,l]) =>
                        <button key={k} className="wc-tool-btn" data-clean={k}>{l}</button>)}
                    </div>
                  </div>
                  <div className="wc-tools-section">
                    <div className="wc-tools-title">Text Transform</div>
                    <div className="wc-tools-btns">
                      {[['reversetext','Reverse Text'],['reversewords','Reverse Words'],['rot13','ROT13 Encode'],['addlinenumbers','Add Line Numbers'],['removelinenumbers','Remove Line Numbers']].map(([k,l]) =>
                        <button key={k} className="wc-tool-btn" data-clean={k}>{l}</button>)}
                    </div>
                  </div>
                </div>

                {/* Compare */}
                <div id="wc-tab-compare" className="wc-tab-content">
                  <div className="wc-compare-area">
                    <div className="wc-compare-label">PASTE COMPARISON TEXT</div>
                    <textarea id="wc-compare-textarea" className="wc-compare-textarea" placeholder="Paste text to compare similarity with your main text above..." />
                    <div id="wc-compare-result-wrap" />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      Uses Jaccard similarity — compares word overlap between texts.
                    </div>
                  </div>
                </div>

                {/* Export */}
                <div id="wc-tab-export" className="wc-tab-content">
                  <div className="wc-export-grid">
                    <button className="wc-export-btn" id="wc-export-copy">📋 Copy All Text</button>
                    <button className="wc-export-btn" id="wc-export-txt">⬇ Download .txt</button>
                    <button className="wc-export-btn" id="wc-export-md">⬇ Download .md</button>
                    <button className="wc-export-btn" id="wc-export-html">⬇ Download .html</button>
                    <button className="wc-export-btn" id="wc-export-stats">📊 Download Stats Report</button>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS PANEL */}
            <aside className="wc-stats-panel">
              {/* Big Stats */}
              <div className="wc-stat-card">
                <div className="wc-stat-card-header">
                  <span className="wc-stat-card-title">Live Stats</span>
                  <span className="wc-stat-card-badge">●&thinsp;Live</span>
                </div>
                <div className="wc-stat-card-body">
                  <div className="wc-big-stats">
                    <div className="wc-big-stat">
                      <div className="wc-big-stat-num" id="wc-words">0</div>
                      <div className="wc-big-stat-label">Words</div>
                    </div>
                    <div className="wc-big-stat">
                      <div className="wc-big-stat-num" id="wc-chars">0</div>
                      <div className="wc-big-stat-label">Chars</div>
                    </div>
                    <div className="wc-big-stat">
                      <div className="wc-big-stat-num" id="wc-sentences">0</div>
                      <div className="wc-big-stat-label">Sentences</div>
                    </div>
                    <div className="wc-big-stat">
                      <div className="wc-big-stat-num" id="wc-paragraphs">0</div>
                      <div className="wc-big-stat-label">Paragraphs</div>
                    </div>
                  </div>
                  <div style={{ height: '0.75rem' }} />
                  <div className="wc-stat-rows">
                    <div className="wc-stat-row"><span className="wc-sr-label">Chars (no spaces)</span><span className="wc-sr-val" id="wc-chars-ns">0</span></div>
                    <div className="wc-stat-row"><span className="wc-sr-label">Lines</span><span className="wc-sr-val" id="wc-lines">1</span></div>
                    <div className="wc-stat-row"><span className="wc-sr-label">Unique words</span><span className="wc-sr-val" id="wc-unique">0</span></div>
                    <div className="wc-stat-row"><span className="wc-sr-label">Avg word length</span><span className="wc-sr-val"><span id="wc-avg-word-len">0</span> chars</span></div>
                    <div className="wc-stat-row"><span className="wc-sr-label">Longest word</span><span className="wc-sr-val" id="wc-longest-word" style={{ fontSize: '0.72rem' }}>—</span></div>
                  </div>
                </div>
              </div>

              {/* Time Estimates */}
              <div className="wc-stat-card">
                <div className="wc-stat-card-header">
                  <span className="wc-stat-card-title">⏱ Time Estimates</span>
                </div>
                <div className="wc-stat-card-body">
                  <div className="wc-time-rows">
                    <div className="wc-time-row"><span className="wc-tr-label">📖 Reading (avg)</span><span className="wc-tr-val" id="wc-time-read">0 sec</span></div>
                    <div className="wc-time-row"><span className="wc-tr-label">🐢 Reading (slow)</span><span className="wc-tr-val" id="wc-time-slow">0 sec</span></div>
                    <div className="wc-time-row"><span className="wc-tr-label">⚡ Reading (fast)</span><span className="wc-tr-val" id="wc-time-fast">0 sec</span></div>
                    <div className="wc-time-row"><span className="wc-tr-label">🎙 Speaking</span><span className="wc-tr-val" id="wc-time-speak">0 sec</span></div>
                  </div>
                </div>
              </div>

              {/* Keyboard shortcuts */}
              <div className="wc-stat-card">
                <div className="wc-stat-card-header">
                  <span className="wc-stat-card-title">⌨ Shortcuts</span>
                </div>
                <div className="wc-stat-card-body">
                  <div className="wc-stat-rows">
                    {[['Ctrl+A','Select all'],['Ctrl+Z','Undo'],['Ctrl+Y','Redo']].map(([k, l]) => (
                      <div key={k} className="wc-stat-row">
                        <span className="wc-sr-label">{l}</span>
                        <span className="wc-sr-val" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--bg3)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="wc-section wc-features-bg" id="wc-features">
        <div className="wc-section-inner">
          <div className="wc-section-label">✦ What's Inside</div>
          <h2 className="wc-section-title">Every Writing Metric</h2>
          <p className="wc-section-sub">From basic word counts to AI detection — all pure JavaScript, all private.</p>
          <div className="wc-features-grid">
            {[
              { icon: '📊', title: 'Real-Time Counting', desc: 'Words, characters, sentences, paragraphs, lines, unique words, and average word length — all live.' },
              { icon: '📚', title: 'Readability Scores', desc: 'Flesch Reading Ease, F-K Grade, Gunning Fog, Coleman-Liau, ARI — five industry-standard scores.' },
              { icon: '🔑', title: 'Keyword Extraction', desc: 'Top 20 keywords by frequency, with density percentages and visual frequency bars. Stop words excluded.' },
              { icon: '😊', title: 'Sentiment Analysis', desc: 'Pure JS positive/negative/neutral word detection with score and percentage breakdown.' },
              { icon: '🤖', title: 'AI Content Detection', desc: 'Heuristic analysis using transition phrase frequency, sentence variance, passive voice ratio, and hedge words.' },
              { icon: '🛠', title: '20 Text Tools', desc: 'Case converter, text cleaner, reverse text, ROT13, line sorter, duplicate remover, find & replace.' },
              { icon: '⇌', title: 'Similarity Checker', desc: 'Jaccard similarity comparison between two texts. Find how closely related two pieces of writing are.' },
              { icon: '⬇', title: 'Export Options', desc: 'Download as .txt, .md, or .html. Export a full analysis report with all stats in one file.' },
            ].map((f, i) => (
              <article key={i} className="wc-feature-card">
                <div className="wc-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wc-section wc-faq-bg" id="wc-faq">
        <div className="wc-section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="wc-section-label">❓ FAQ</div>
            <h2 className="wc-section-title">Frequently Asked</h2>
            <p className="wc-section-sub" style={{ margin: '0 auto' }}>Common questions about the analyzer.</p>
          </div>
          <div className="wc-faq-list">
            {[
              { q: 'Does it save my text anywhere?', a: 'No. All analysis happens in your browser using pure JavaScript. Your text never touches any server. Close the tab and it\'s gone. We strongly recommend not pasting confidential material into any online tool, but for this one, it\'s genuinely safe — there is no backend.' },
              { q: 'How accurate is the AI detection?', a: 'It\'s heuristic-based — it looks for patterns common in AI writing (overuse of transition phrases, uniform sentence lengths, passive voice, hedge words). It gives a probability score, not a definitive answer. For accurate AI detection, use dedicated APIs like Winston AI or Originality.ai.' },
              { q: 'Why are my readability scores different from other tools?', a: 'Syllable counting in JavaScript is an approximation — it uses rule-based patterns, not a full dictionary. Results may differ slightly from tools that use linguistic databases. The relative comparison between scores on the same text is accurate.' },
              { q: 'Is this useful for SEO content?', a: 'Yes. Keyword density, readability grade level, sentence length, and word count are all key SEO metrics. Most SEO best practices recommend a Flesch Reading Ease score above 60 and keyword density between 1–3%.' },
              { q: 'Can I use this for academic writing?', a: 'Definitely. The readability scores, word count targets, and AI detection are especially useful for academic contexts. The "Export Stats Report" generates a document you can include as a writing log.' },
            ].map((f, i) => (
              <div key={i} className="wc-faq-item">
                <div className="wc-faq-q" role="button" tabIndex={0}>
                  {f.q}
                  <span className="wc-faq-arrow">⌄</span>
                </div>
                <div className="wc-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wc-footer">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="wc-footer-logo">
            <div className="flogo-icon">📝</div>
            Word Counter &amp; Analyzer
          </div>
          <p className="wc-footer-sub">Count words. Analyze deeply. Write better.</p>
          <ul className="wc-footer-links">
            <li><a href="#wc-app">Analyzer</a></li>
            <li><a href="#wc-features">Features</a></li>
            <li><a href="#wc-faq">FAQ</a></li>
          </ul>
          <p className="wc-footer-copy">100% client-side · No API calls · No tracking · No data stored</p>
        </div>
      </footer>

      {/* Toast */}
      <div className="wc-toast" id="wc-toast" role="status">
        <span>✓</span>
        <span id="wc-toast-msg">Done!</span>
      </div>
    </div>
  );
}
