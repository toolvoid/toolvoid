'use client';
import { useEffect, useState } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.it-root *, .it-root *::before, .it-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.it-root {
  --bg: #07080f; --bg2: #0d0e18; --bg3: #111320; --card: #0e0f1c;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12);
  --text: #e8e8f0; --text-muted: #6b6b85; --text-dim: #9494aa;
  --accent: #FFD93D; --accent-dim: rgba(255,217,61,0.12); --accent-dim2: rgba(255,217,61,0.05);
  --accent-glow: rgba(255,217,61,0.3); --accent-txt: #0b0c1a;
  --cta-yellow: #ffd93d; --cta-yellow-hover: #ffe268; --cta-yellow-glow: rgba(255,217,61,0.38);
  --orange: #f59e0b; --orange-dim: rgba(245,158,11,0.12);
  --green: #4fffb0; --green-dim: rgba(79,255,176,0.1);
  --error: #ff6b7a; --error-dim: rgba(255,107,122,0.1);
  --shadow: 0 4px 24px rgba(0,0,0,0.5); --shadow-lg: 0 12px 48px rgba(0,0,0,0.7);
  --radius: 14px; --radius-sm: 8px; --radius-xs: 6px;
  --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Syne', sans-serif; --font-body: 'Instrument Sans', sans-serif; --font-mono: 'DM Mono', monospace;
  font-family: var(--font-body); background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden;
}
.it-root.light {
  --bg: #f4f4f8; --bg2: #ebebf3; --bg3: #e2e2ec; --card: #ffffff;
  --border: rgba(0,0,0,0.07); --border-hi: rgba(0,0,0,0.14);
  --text: #0d0d1a; --text-muted: #8888a0; --text-dim: #5a5a72;
  --accent: #c49b00; --accent-dim: rgba(196,155,0,0.12); --accent-dim2: rgba(196,155,0,0.05);
  --accent-glow: rgba(196,155,0,0.2); --accent-txt: #0b0c1a;
  --cta-yellow: #ffd93d; --cta-yellow-hover: #ffe268; --cta-yellow-glow: rgba(255,217,61,0.32);
  --error: #d93a4a; --error-dim: rgba(217,58,74,0.08);
  --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.15);
}
.it-root a { color: inherit; text-decoration: none; }
.it-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.it-root img, .it-root svg { display: block; max-width: 100%; }
.it-root ::selection { background: var(--accent-dim); color: var(--accent); }
.it-root ::-webkit-scrollbar { width: 5px; }
.it-root ::-webkit-scrollbar-track { background: var(--bg); }
.it-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* NAV */
.it-nav { position: sticky; top: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; background: rgba(7,8,15,0.72); backdrop-filter: blur(20px) saturate(1.5); border-bottom: 1px solid var(--border); transition: background var(--transition); }
.it-root.light .it-nav { background: rgba(244,244,248,0.78); }
.it-nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.04em; display: flex; align-items: center; gap: 0.5rem; }
.it-nav-logo .logo-icon { background: var(--accent); color: var(--accent-txt); padding: 0.1em 0.4em; border-radius: 6px; font-size: 0.85em; line-height: 1.3; }
.it-nav-logo .logo-sub { color: var(--text-dim); font-size: 0.85rem; font-weight: 500; }
.it-nav-right { display: flex; align-items: center; gap: 1rem; }
.it-nav-links { display: flex; gap: 1.5rem; list-style: none; }
.it-nav-links a { font-size: 0.875rem; color: var(--text-dim); font-weight: 500; transition: color var(--transition); }
.it-nav-links a:hover { color: var(--text); }
.it-theme-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-hi); background: var(--card); color: var(--text-dim); display: flex; align-items: center; justify-content: center; transition: all var(--transition); font-size: 1rem; }
.it-theme-btn:hover { border-color: var(--accent); color: var(--accent); }
.it-nav-cta { padding: 0.44rem 1.1rem; background: var(--accent); color: var(--accent-txt); border-radius: 99px; font-size: 0.85rem; font-weight: 700; transition: all var(--transition); }
.it-nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

/* HERO */
.it-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.5rem 4rem; position: relative; overflow: hidden; }
.it-hero-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
.it-hero-glow { position: absolute; top: 45%; left: 50%; transform: translate(-50%,-60%); width: 700px; height: 600px; background: radial-gradient(circle, rgba(255,217,61,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.it-hero-glow2 { position: absolute; top: 60%; left: 25%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.it-hero-content { position: relative; z-index: 1; max-width: 820px; }
.it-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; background: var(--accent-dim); border: 1px solid rgba(255,217,61,0.25); border-radius: 99px; font-family: var(--font-mono); font-size: 0.73rem; color: var(--accent); letter-spacing: 0.05em; margin-bottom: 2rem; animation: itFadeUp 0.6s ease both; }
.it-root.light .it-hero-badge { border-color: rgba(196,155,0,0.3); }
.it-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: itPulse 2s ease-in-out infinite; }
@keyframes itPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
.it-hero h1 { font-family: var(--font-head); font-size: clamp(2.8rem, 7vw, 5.2rem); font-weight: 800; letter-spacing: -0.045em; line-height: 1.05; margin-bottom: 1.5rem; animation: itFadeUp 0.7s 0.1s ease both; }
.it-hero h1 .ha { background: linear-gradient(120deg, var(--accent) 0%, var(--orange) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.it-hero-sub { font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--text-dim); max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; animation: itFadeUp 0.7s 0.2s ease both; }
.it-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; animation: itFadeUp 0.7s 0.3s ease both; }
.it-btn-primary { padding: 0.75rem 1.8rem; background: var(--accent); color: var(--accent-txt); border-radius: 99px; font-weight: 700; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 0 30px var(--accent-glow); }
.it-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px var(--accent-glow); opacity: 0.9; }
.it-btn-ghost { padding: 0.75rem 1.5rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
.it-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.it-hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; animation: itFadeUp 0.7s 0.4s ease both; }
.it-hero-stat { text-align: center; }
.it-hero-stat-num { font-family: var(--font-head); font-size: 1.8rem; font-weight: 800; color: var(--text); letter-spacing: -0.04em; }
.it-hero-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
@keyframes itFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* SECTION SHARED */
.it-section { padding: 6rem 1.5rem; }
.it-section-inner { max-width: 1140px; margin: 0 auto; }
.it-section-label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
.it-section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
.it-section-sub { font-size: 1.05rem; color: var(--text-dim); max-width: 520px; line-height: 1.7; }

/* TOOL SECTION */
.it-tool-section { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.it-tool-header { text-align: center; margin-bottom: 3rem; }
.it-tool-header .it-section-sub { margin: 0 auto; }

/* UPLOAD ZONE */
.it-upload-zone { background: var(--card); border: 2px dashed var(--border-hi); border-radius: var(--radius); padding: 4rem 2rem; text-align: center; cursor: pointer; transition: all var(--transition); display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
.it-upload-zone:hover, .it-upload-zone.drag { border-color: var(--accent); background: var(--accent-dim2); }
.it-upload-icon { font-size: 3.5rem; opacity: 0.3; transition: all var(--transition); }
.it-upload-zone:hover .it-upload-icon, .it-upload-zone.drag .it-upload-icon { opacity: 0.6; transform: scale(1.1); }
.it-upload-title { font-family: var(--font-head); font-size: 1.4rem; font-weight: 700; }
.it-upload-sub { font-size: 0.9rem; color: var(--text-dim); }
.it-upload-formats { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-top: 0.25rem; }
.it-fmt-pill { padding: 0.2rem 0.75rem; background: var(--bg2); border: 1px solid var(--border-hi); border-radius: 99px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); }
.it-upload-hint { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }

/* WORKSPACE */
.it-workspace { display: none; grid-template-columns: 300px 1fr; gap: 1.25rem; align-items: start; }
.it-workspace.visible { display: grid; }
@media(max-width:900px) { .it-workspace { grid-template-columns: 1fr; } }

/* SIDEBAR */
.it-sidebar { display: flex; flex-direction: column; gap: 0.85rem; }

.it-file-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; box-shadow: var(--shadow); }
.it-file-thumb { width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border); background: var(--bg2); display: block; }
.it-file-info { flex: 1; min-width: 0; }
.it-file-dim { font-weight: 700; font-size: 0.85rem; }
.it-file-size { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
.it-file-savings { font-family: var(--font-mono); font-size: 0.68rem; color: var(--green); font-weight: 600; }
.it-change-btn { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent); background: none; border: none; cursor: pointer; flex-shrink: 0; }

/* TOOL NAV */
.it-tool-nav { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; box-shadow: var(--shadow); }
.it-tool-nav-btn { display: flex; align-items: center; gap: 0.65rem; padding: 0.7rem 1rem; cursor: pointer; font-size: 0.85rem; font-weight: 500; color: var(--text-dim); border: none; background: none; width: 100%; text-align: left; border-bottom: 1px solid var(--border); transition: all var(--transition); font-family: var(--font-body); }
.it-tool-nav-btn:last-child { border-bottom: none; }
.it-tool-nav-btn .tnav-icon { font-size: 1rem; opacity: 0.6; }
.it-tool-nav-btn:hover { background: var(--accent-dim2); color: var(--text); }
.it-tool-nav-btn.active { background: linear-gradient(135deg, var(--accent), var(--orange)); color: var(--accent-txt); font-weight: 700; }
.it-tool-nav-btn.active .tnav-icon { opacity: 1; }

/* TOOL PANEL */
.it-tool-panel-wrap { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; box-shadow: var(--shadow); }
.it-panel-title { font-family: var(--font-head); font-weight: 700; font-size: 0.95rem; margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.5rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border); }
.it-tool-panel { display: none; }
.it-tool-panel.active { display: block; }

/* CONTROLS */
.it-ctrl-label { font-family: var(--font-mono); font-size: 0.69rem; font-weight: 500; color: var(--text-dim); letter-spacing: 0.07em; text-transform: uppercase; display: block; margin-bottom: 0.45rem; }
.it-input { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.6rem 0.85rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text); outline: none; transition: border-color var(--transition); }
.it-input:focus { border-color: var(--accent); }
.it-select { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.58rem 0.8rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text); outline: none; cursor: pointer; transition: border-color var(--transition); }
.it-select:focus { border-color: var(--accent); }
.it-range { width: 100%; accent-color: var(--accent); cursor: pointer; }
.it-ctrl-row { display: flex; gap: 0.6rem; margin-bottom: 0.85rem; }
.it-ctrl-col { flex: 1; }
.it-ctrl-group { margin-bottom: 0.85rem; }

.it-chip-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.it-chip { padding: 0.28rem 0.65rem; border: 1px solid var(--border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); cursor: pointer; transition: all var(--transition); background: var(--bg2); }
.it-chip:hover { border-color: var(--border-hi); color: var(--text); }
.it-chip.active { border-color: var(--accent); color: var(--accent-txt); background: var(--accent); font-weight: 600; }

.it-btn-apply { width: 100%; padding: 0.72rem; background: var(--bg2); color: var(--accent); border-radius: var(--radius-xs); font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all var(--transition); border: none; cursor: pointer; font-family: var(--font-body); box-shadow: none; }
.it-btn-apply:hover { background: var(--bg3); color: var(--cta-yellow-hover); transform: translateY(-1px); }
.it-btn-apply:disabled { opacity: 0.5; color: var(--accent); cursor: not-allowed; transform: none; }
.it-btn-sec { padding: 0.6rem 0.9rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-xs); font-size: 0.8rem; transition: all var(--transition); background: none; cursor: pointer; font-family: var(--font-body); display: flex; align-items: center; gap: 0.4rem; }
.it-btn-sec:hover { border-color: var(--accent); color: var(--accent); }

.it-range-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem; }
.it-range-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
.it-range-val { font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); font-weight: 600; }
.it-slider-group { margin-bottom: 1rem; }

.it-divider { height: 1px; background: var(--border); margin: 1rem 0; }
.it-color-swatch { width: 36px; height: 36px; border-radius: 6px; border: 1px solid var(--border); cursor: pointer; padding: 2px; background: none; flex-shrink: 0; }

/* STATS BOX */
.it-stats-box { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.85rem 1rem; margin-bottom: 1rem; }
.it-stats-row { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.3rem; }
.it-stats-key { color: var(--text-muted); }
.it-stats-val { color: var(--text); font-weight: 600; font-family: var(--font-mono); }
.it-savings-badge { margin-top: 0.6rem; text-align: center; padding: 0.3rem; background: rgba(79,255,176,0.12); border-radius: 5px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--green); font-weight: 700; display: none; }
.it-savings-badge.show { display: block; }

/* PRESETS */
.it-preset-grid { max-height: 380px; overflow-y: auto; padding-right: 2px; }
.it-preset-cat { font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin: 0.75rem 0 0.4rem; }
.it-preset-item { display: flex; justify-content: space-between; align-items: center; padding: 0.45rem 0.65rem; border-radius: 6px; cursor: pointer; transition: background var(--transition); border: 1px solid transparent; }
.it-preset-item:hover { background: var(--accent-dim); border-color: var(--accent); }
.it-preset-name { font-size: 0.78rem; color: var(--text); font-weight: 500; }
.it-preset-size { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); }

/* EXTRAS */
.it-extras-wrap { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1rem; box-shadow: var(--shadow); }
.it-extras-title { font-family: var(--font-mono); font-size: 0.65rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.85rem; }
.it-quick-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
.it-quick-btn { padding: 0.4rem 0.5rem; border: 1px solid var(--border); background: var(--bg2); border-radius: 6px; font-size: 0.72rem; color: var(--text-dim); cursor: pointer; transition: all var(--transition); font-family: var(--font-body); text-align: center; }
.it-quick-btn:hover { border-color: var(--accent); color: var(--accent); }

/* PREVIEW PANEL */
.it-preview-panel { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.it-preview-topbar { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--border); background: var(--bg2); gap: 0.75rem; flex-wrap: wrap; }
.it-preview-live { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: itLive 1.5s ease-in-out infinite; display: inline-block; margin-right: 0.4rem; }
@keyframes itLive { 0%,100%{box-shadow:0 0 0 0 var(--accent-glow)} 50%{box-shadow:0 0 0 5px rgba(255,217,61,0)} }
.it-preview-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; }
.it-preview-btns { display: flex; gap: 0.4rem; align-items: center; }
.it-pill-btn { padding: 0.28rem 0.75rem; border: 1px solid var(--border-hi); border-radius: 99px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); cursor: pointer; background: var(--bg3); transition: all var(--transition); }
.it-pill-btn:hover { border-color: var(--accent); color: var(--accent); }
.it-pill-btn.active { border-color: var(--accent); color: var(--accent-txt); background: var(--accent); font-weight: 700; }
.it-pill-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.it-preview-img-wrap { padding: 1.25rem; }
.it-preview-canvas { display: flex; align-items: center; justify-content: center; min-height: 340px; max-height: 62vh; border-radius: var(--radius-sm); overflow: hidden; position: relative; background-color: var(--bg3); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23888' opacity='0.08'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23888' opacity='0.08'/%3E%3C/svg%3E"); }
#it-preview-img { max-width: 100%; max-height: 62vh; object-fit: contain; border-radius: 4px; display: none; position: relative; z-index: 1; }
#it-preview-placeholder { text-align: center; position: relative; z-index: 1; }
.it-ph-icon { font-size: 3rem; opacity: 0.15; margin-bottom: 0.6rem; animation: itFloat 3s ease-in-out infinite; }
@keyframes itFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.it-ph-text { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }

/* COMPARE */
.it-compare-wrap { position: absolute; inset: 0; display: none; overflow: hidden; cursor: ew-resize; z-index: 5; }
.it-compare-wrap.active { display: block; }
.it-compare-before { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.it-compare-before img { max-width: 100%; max-height: 62vh; object-fit: contain; }
.it-compare-after { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.it-compare-after img { max-width: 100%; max-height: 62vh; object-fit: contain; }
.it-compare-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: #fff; pointer-events: none; }
.it-compare-handle { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 34px; height: 34px; background: var(--accent); border-radius: 50%; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; color: var(--accent-txt); font-size: 0.85rem; box-shadow: 0 2px 14px rgba(0,0,0,0.5); }
.it-compare-lbl { position: absolute; top: 10px; font-family: var(--font-mono); font-size: 0.65rem; padding: 0.2rem 0.7rem; border-radius: 99px; font-weight: 700; }
.it-compare-lbl-l { left: 10px; background: rgba(0,0,0,0.7); color: #fff; }
.it-compare-lbl-r { right: 10px; background: var(--accent); color: var(--accent-txt); }

/* PROC OVERLAY */
.it-proc-overlay { position: absolute; inset: 0; background: rgba(7,8,15,0.82); z-index: 20; display: none; align-items: center; justify-content: center; flex-direction: column; gap: 0.85rem; border-radius: var(--radius-sm); }
.it-proc-overlay.active { display: flex; }
.it-proc-spinner { width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.15); border-top: 3px solid var(--accent); border-radius: 50%; animation: itSpin 0.75s linear infinite; }
@keyframes itSpin { to { transform: rotate(360deg); } }
.it-proc-msg { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); }
.it-bg-progress { width: 160px; background: var(--border); border-radius: 99px; height: 5px; overflow: hidden; }
.it-bg-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--orange)); border-radius: 99px; width: 0%; transition: width 0.4s ease; }

/* PREVIEW META + DL */
.it-preview-meta { padding: 0.7rem 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 0.6rem; flex-wrap: wrap; background: var(--bg2); }
.it-meta-chip { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); padding: 0.2rem 0.55rem; background: var(--bg3); border: 1px solid var(--border); border-radius: 4px; }
.it-meta-chip span { color: var(--text-dim); }
.it-meta-savings { font-family: var(--font-mono); font-size: 0.68rem; padding: 0.2rem 0.55rem; background: rgba(79,255,176,0.1); border: 1px solid rgba(79,255,176,0.2); border-radius: 4px; color: var(--green); font-weight: 700; display: none; }
.it-meta-savings.show { display: inline-block; }
.it-preview-dl { padding: 0.85rem 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 0.6rem; }
.it-dl-btn { flex: 1; padding: 0.68rem; background: var(--bg2); color: var(--accent); border-radius: var(--radius-xs); font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; justify-content: center; gap: 0.45rem; transition: all var(--transition); border: none; cursor: pointer; font-family: var(--font-body); box-shadow: none; }
.it-dl-btn:hover { background: var(--bg3); color: var(--cta-yellow-hover); transform: translateY(-1px); }
.it-dl-btn:disabled { opacity: 0.5; color: var(--accent); cursor: not-allowed; transform: none; }
.it-reset-btn { padding: 0.68rem 1rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-xs); font-size: 0.82rem; display: flex; align-items: center; gap: 0.35rem; transition: all var(--transition); background: none; cursor: pointer; font-family: var(--font-body); }
.it-reset-btn:hover { border-color: var(--error); color: var(--error); }
.it-undo-btn { padding: 0.68rem 0.85rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-xs); font-size: 0.82rem; transition: all var(--transition); background: none; cursor: pointer; }
.it-undo-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.it-undo-btn:disabled { opacity: 0.28; cursor: not-allowed; }
.it-preview-shortcuts { padding: 0.55rem 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 1.4rem; flex-wrap: wrap; background: var(--bg2); }
.it-shortcut { display: flex; align-items: center; gap: 0.35rem; font-size: 0.68rem; color: var(--text-muted); }
.it-shortcut kbd { background: var(--bg3); border: 1px solid var(--border-hi); border-radius: 3px; padding: 0.1rem 0.4rem; font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-dim); }

/* FEATURES */
.it-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.it-feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; transition: all var(--transition); position: relative; overflow: hidden; }
.it-feature-card::before { content: ''; position: absolute; inset: 0; background: var(--accent-dim2); opacity: 0; transition: opacity var(--transition); }
.it-feature-card:hover::before { opacity: 1; }
.it-feature-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.it-feature-icon { width: 44px; height: 44px; background: var(--accent-dim); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1.1rem; }
.it-feature-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.it-feature-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.6; }

/* HIW */
.it-hiw { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.it-hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; position: relative; }
.it-hiw-steps::before { content: ''; position: absolute; top: 2.5rem; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border-hi), transparent); }
.it-hiw-step { text-align: center; }
.it-step-num { font-family: var(--font-head); font-size: 2.5rem; font-weight: 800; color: var(--accent); opacity: 0.15; line-height: 1; margin-bottom: 0.75rem; }
.it-step-icon { width: 52px; height: 52px; background: var(--card); border: 1px solid var(--border-hi); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 1rem; }
.it-hiw-step h3 { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.it-hiw-step p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* CASES */
.it-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.it-case-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all var(--transition); }
.it-case-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.it-case-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; padding: 0.2rem 0.6rem; border-radius: 99px; margin-bottom: 0.9rem; letter-spacing: 0.04em; }
.it-tag-yellow { background: var(--accent-dim); color: var(--accent); }
.it-tag-orange { background: var(--orange-dim); color: var(--orange); }
.it-tag-green { background: var(--green-dim); color: var(--green); }
.it-case-card h3 { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.it-case-card p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }

/* FAQ */
.it-faq { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.it-faq-list { max-width: 680px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
.it-faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; transition: border-color var(--transition); }
.it-faq-item.open { border-color: var(--border-hi); }
.it-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: color var(--transition); gap: 1rem; border: none; background: none; width: 100%; text-align: left; color: var(--text); font-family: var(--font-body); }
.it-faq-q:hover { color: var(--accent); }
.it-faq-arrow { font-size: 1rem; color: var(--text-muted); flex-shrink: 0; transition: transform 0.25s ease; }
.it-faq-item.open .it-faq-arrow { transform: rotate(180deg); color: var(--accent); }
.it-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; }
.it-faq-item.open .it-faq-a { max-height: 300px; padding: 0 1.25rem 1.1rem; }

/* FOOTER */
.it-footer { border-top: 1px solid var(--border); padding: 3rem 1.5rem; text-align: center; }
.it-footer-inner { max-width: 1140px; margin: 0 auto; }
.it-footer-logo { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.it-footer-logo .logo-icon { background: var(--accent); color: var(--accent-txt); padding: 0.05em 0.35em; border-radius: 6px; }
.it-footer-sub { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; }
.it-footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; list-style: none; }
.it-footer-links a { font-size: 0.85rem; color: var(--text-muted); transition: color var(--transition); }
.it-footer-links a:hover { color: var(--accent); }
.it-footer-copy { font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono); }

/* DOWNLOAD CARD (sidebar) */
.it-dl-card { background: var(--card); border: none; border-radius: var(--radius-sm); padding: 1rem; box-shadow: none; }
.it-dl-card-info { margin-bottom: 12px; background: var(--bg2); border-radius: var(--radius-xs); padding: 0.65rem 0.85rem; }
.it-dl-card-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.it-dl-card-key { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); }
.it-dl-card-val { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text); font-weight: 600; }
.it-dl-card-savings { margin-top: 6px; text-align: center; padding: 3px 8px; background: rgba(79,255,176,0.12); border: 1px solid rgba(79,255,176,0.2); border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--green); font-weight: 700; }
.it-dl-card-btn { width: 100%; padding: 0.72rem; background: var(--bg2); color: var(--accent); border: none; border-radius: var(--radius-xs); font-weight: 800; font-size: 0.95rem; cursor: pointer; font-family: var(--font-body); display: flex; align-items: center; justify-content: center; gap: 0.4rem; transition: all var(--transition); letter-spacing: -0.01em; box-shadow: none; }
.it-dl-card-btn:hover { background: var(--bg3); color: var(--cta-yellow-hover); transform: translateY(-1px); }
.it-dl-card-btn:disabled { opacity: 0.5; color: var(--accent); cursor: not-allowed; transform: none; }
.it-dl-card .it-select, .it-dl-card .it-input { border: none; box-shadow: none; }
.it-dl-card .it-select:focus, .it-dl-card .it-input:focus { border: none; box-shadow: none; }
.it-dl-card-sec { flex: 1; padding: 0.5rem 0.4rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: var(--radius-xs); font-size: 0.75rem; background: none; cursor: pointer; font-family: var(--font-body); transition: all var(--transition); text-align: center; }
.it-dl-card-sec:hover { border-color: var(--accent); color: var(--accent); }

/* STICKY DOWNLOAD BAR */
.it-dl-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 300; background: rgba(14,15,28,0.96); border-top: 1px solid var(--border-hi); padding: 0.75rem 1.5rem; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: 0 -4px 32px rgba(0,0,0,0.6); backdrop-filter: blur(16px); }
.it-root.light .it-dl-bar { background: rgba(244,244,248,0.96); }
.it-dl-bar-info { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.it-dl-bar-info strong { color: var(--text); }
.it-dl-bar-actions { display: flex; gap: 0.6rem; align-items: center; flex-shrink: 0; }
.it-dl-bar-main { padding: 0.6rem 1.4rem; background: var(--bg2); color: var(--accent); border-radius: 99px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 0.4rem; transition: all var(--transition); border: none; cursor: pointer; font-family: var(--font-body); box-shadow: none; }
.it-dl-bar-main:hover { background: var(--bg3); color: var(--cta-yellow-hover); transform: translateY(-1px); }
.it-dl-bar-sec { padding: 0.6rem 0.9rem; border: 1px solid var(--border-hi); color: var(--text-dim); border-radius: 99px; font-size: 0.82rem; transition: all var(--transition); background: none; cursor: pointer; font-family: var(--font-body); }
.it-dl-bar-sec:hover { border-color: var(--accent); color: var(--accent); }
.it-dl-bar-savings { font-family: var(--font-mono); font-size: 0.7rem; padding: 0.18rem 0.65rem; background: rgba(79,255,176,0.12); border: 1px solid rgba(79,255,176,0.2); border-radius: 99px; color: var(--green); font-weight: 700; }

/* TOAST */
.it-toast { position: fixed; bottom: 4.5rem; right: 2rem; z-index: 999; background: var(--card); border: 1px solid var(--border-hi); padding: 0.7rem 1.2rem; border-radius: var(--radius-sm); font-size: 0.82rem; font-family: var(--font-mono); box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.55rem; transform: translateY(110px); opacity: 0; transition: all 0.28s cubic-bezier(0.4,0,0.2,1); pointer-events: none; }
.it-toast.show { transform: translateY(0); opacity: 1; }
.it-toast-icon { color: var(--accent); }

@media(max-width: 640px) {
  .it-nav-links { display: none; }
  .it-hero-stats { gap: 1.5rem; }
  .it-hiw-steps::before { display: none; }
  .it-workspace { grid-template-columns: 1fr; }
}
`;

const PRESETS_DATA = {
  'Social Media': [
    {n:'Instagram Post',w:1080,h:1080},{n:'Instagram Story',w:1080,h:1920},{n:'Instagram Profile',w:320,h:320},
    {n:'Twitter/X Post',w:1200,h:675},{n:'Twitter Header',w:1500,h:500},
    {n:'Facebook Post',w:1200,h:630},{n:'Facebook Cover',w:851,h:315},
    {n:'LinkedIn Post',w:1200,h:627},{n:'LinkedIn Cover',w:1584,h:396},
    {n:'YouTube Thumbnail',w:1280,h:720},{n:'YouTube Banner',w:2560,h:1440},
    {n:'TikTok Video',w:1080,h:1920},{n:'Pinterest Pin',w:1000,h:1500},{n:'WhatsApp DP',w:500,h:500},
  ],
  'General': [{n:'HD',w:1280,h:720},{n:'Full HD',w:1920,h:1080},{n:'2K',w:2560,h:1440},{n:'4K',w:3840,h:2160}],
  'Documents': [{n:'A4 72dpi',w:595,h:842},{n:'A4 150dpi',w:1240,h:1754},{n:'A4 300dpi',w:2480,h:3508}],
  'ID & Passport': [{n:'Passport Photo',w:413,h:531},{n:'Visa Photo',w:354,h:472},{n:'Pan Card',w:375,h:240}],
  'Wallpapers': [{n:'iPhone 15 Pro',w:1179,h:2556},{n:'Samsung S24',w:1080,h:2340},{n:'iPad Pro',w:2048,h:2732},{n:'Desktop FHD',w:1920,h:1080}],
  'Ecommerce': [{n:'Amazon Product',w:2000,h:2000},{n:'Flipkart',w:1000,h:1000},{n:'Shopify',w:2048,h:2048}],
};

export default function ImageToolkitPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.getElementById('it-root');
    if (!root) return;

    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const G = (id) => document.getElementById(id);

    // ─── State ────────────────────────────────────────────
    const state = {
      image: null, origImage: null,
      origW: 0, origH: 0, origSize: 0,
      curW: 0, curH: 0, curSize: 0,
      resizeW: 0, resizeH: 0,
      quality: 82, fmt: 'jpeg',
      aspectLocked: true,
      history: [], histIdx: -1,
      activeTool: 'resize',
      compareMode: false, comparePos: 50,
      fileName: 'image-toolkit',
      brightness: 0, contrast: 0, saturation: 0, blur: 0, hue: 0,
      wmType: 'text', wmText: '', wmSize: 32, wmColor: '#ffffff', wmOpacity: 60, wmPos: 'BR', wmImgSrc: null,
      cropX: 0, cropY: 0, cropW: 0, cropH: 0, cropRatio: 'free',
      padSize: 20, padColor: '#ffffff',
      compMode: 'custom',
      bgAfterColor: 'transparent',
      bgProgress: 0,
      isProcessing: false,
      isDark: true,
    };

    // ─── Helpers ─────────────────────────────────────────
    const fmtSize = (b) => {
      if (!b) return '—';
      if (b < 1024) return `${b}B`;
      if (b < 1048576) return `${(b/1024).toFixed(1)}KB`;
      return `${(b/1048576).toFixed(2)}MB`;
    };
    const getMime = (f) => f==='png'?'image/png':f==='webp'?'image/webp':'image/jpeg';
    const getExt  = (f) => f==='jpeg'?'jpg':f;
    const loadImg = (src) => new Promise(res => { const i = new Image(); i.onload=()=>res(i); i.src=src; });

    // ─── Toast ───────────────────────────────────────────
    const toast = G('it-toast');
    const toastMsg = G('it-toastMsg');
    const toastIcon = G('it-toastIcon');
    let toastTimer = null;
    function showToast(msg, isErr=false) {
      toastMsg.textContent = msg;
      toastIcon.style.color = isErr ? 'var(--error)' : 'var(--accent)';
      toast.style.borderColor = isErr ? 'var(--error)' : 'var(--border-hi)';
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = T(() => toast.classList.remove('show'), 2600);
    }

    // ─── History ─────────────────────────────────────────
    function saveHistory(dataURL) {
      state.history = [...state.history.slice(0, state.histIdx + 1), dataURL];
      state.histIdx = state.history.length - 1;
      updateHistoryBtns();
    }
    function updateHistoryBtns() {
      const ub = G('it-undoBtn'), rb = G('it-redoBtn');
      ub.disabled = state.histIdx <= 0;
      rb.disabled = state.histIdx >= state.history.length - 1;
    }
    G('it-undoBtn').addEventListener('click', () => {
      if (state.histIdx <= 0) return;
      state.histIdx--;
      applyHistoryFrame(state.history[state.histIdx]);
      showToast('↩ Undone');
    });
    G('it-redoBtn').addEventListener('click', () => {
      if (state.histIdx >= state.history.length - 1) return;
      state.histIdx++;
      applyHistoryFrame(state.history[state.histIdx]);
      showToast('↪ Redone');
    });
    function applyHistoryFrame(dataURL) {
      state.image = dataURL;
      setPreviewImg(dataURL);
      const img = new Image();
      img.onload = () => { state.curW = img.width; state.curH = img.height; updateMeta(); };
      img.src = dataURL;
      const b64 = dataURL.split(',')[1] || '';
      state.curSize = Math.round(b64.length * 0.75);
      updateMeta();
    }

    // ─── Finalize canvas ─────────────────────────────────
    function finalize(canvas, fmt=state.fmt, q=state.quality) {
      const url = canvas.toDataURL(getMime(fmt), q / 100);
      state.image = url;
      state.curW = canvas.width; state.curH = canvas.height;
      const b64 = url.split(',')[1] || '';
      state.curSize = Math.round(b64.length * 0.75);
      setPreviewImg(url);
      saveHistory(url);
      updateMeta();
      return url;
    }

    // ─── Preview helpers ──────────────────────────────────
    function setPreviewImg(src) {
      const img = G('it-preview-img');
      const ph  = G('it-preview-placeholder');
      img.src = src; img.style.display = 'block';
      ph.style.display = 'none';
      if (state.compareMode && state.origImage) {
        G('it-cmp-after-img').src = src;
        updateCompare(state.comparePos);
      }
    }
    function showWorkspace() {
      G('it-upload-zone').style.display = 'none';
      G('it-workspace').classList.add('visible');
    }
    function updateMeta() {
      G('it-meta-dim').textContent = `${state.curW}×${state.curH}`;
      G('it-meta-size').textContent = fmtSize(state.curSize);
      G('it-meta-orig').textContent = fmtSize(state.origSize);
      G('it-file-dim').textContent = `${state.curW}×${state.curH}`;
      G('it-file-size').textContent = fmtSize(state.curSize);
      // update stats box elements
      const so = G('it-stats-orig'), sa = G('it-stats-after');
      if (so) so.textContent = fmtSize(state.origSize);
      if (sa) sa.textContent = fmtSize(state.curSize);
      const savings = state.origSize > 0 && state.curSize < state.origSize
        ? Math.round(((state.origSize - state.curSize) / state.origSize) * 100) : 0;
      const sb = G('it-meta-savings');
      const fs = G('it-file-savings');
      const ssb = G('it-stats-savings');
      const stb = G('it-stats-box');
      if (savings > 0) {
        if (sb) { sb.textContent = `💾 ${savings}% saved 🎉`; sb.classList.add('show'); }
        if (fs) { fs.textContent = `-${savings}%`; fs.style.display = 'block'; }
        if (ssb) { ssb.textContent = `${savings}% saved 🎉`; ssb.classList.add('show'); }
        if (stb) stb.style.display = 'block';
      } else {
        if (sb) sb.classList.remove('show');
        if (fs) fs.style.display = 'none';
        if (ssb) ssb.classList.remove('show');
      }
      if (G('it-file-thumb')) G('it-file-thumb').src = state.image || '';
      // update download card info
      if (G('it-dc-dim'))  G('it-dc-dim').textContent  = state.image ? `${state.curW}×${state.curH}` : 'Upload image first';
      if (G('it-dc-size')) G('it-dc-size').textContent = state.image ? fmtSize(state.curSize) : '—';
      if (G('it-dc-orig')) G('it-dc-orig').textContent = state.image ? fmtSize(state.origSize) : '—';
      const dlCardBtn = G('it-dl-card-btn');
      if (dlCardBtn) dlCardBtn.disabled = !state.image;
      const dcSav = G('it-dc-savings');
      if (dcSav) {
        if (savings > 0) { dcSav.textContent = `💾 Saved ${savings}% — ${fmtSize(state.origSize - state.curSize)} smaller`; dcSav.style.display = 'block'; }
        else dcSav.style.display = 'none';
      }
      // update sticky bar
      const dlBar = G('it-dl-bar');
      if (dlBar) dlBar.style.display = state.image ? 'flex' : 'none';
      const barDim = G('it-bar-dim'), barSize = G('it-bar-size'), barSav = G('it-bar-savings');
      if (barDim) barDim.textContent = `${state.curW}×${state.curH}`;
      if (barSize) barSize.textContent = fmtSize(state.curSize);
      if (barSav) {
        if (savings > 0) { barSav.textContent = `💾 ${savings}% saved`; barSav.style.display='inline-block'; }
        else barSav.style.display = 'none';
      }
      // sync filename input
      if (G('it-dl-filename') && !G('it-dl-filename').value) G('it-dl-filename').value = state.fileName;
    }

    // ─── Processing overlay ───────────────────────────────
    function showProc(msg='Processing…') {
      state.isProcessing = true;
      G('it-proc-msg').textContent = msg;
      G('it-proc-overlay').classList.add('active');
      root.querySelectorAll('.it-btn-apply').forEach(b => b.disabled = true);
    }
    function hideProc() {
      state.isProcessing = false;
      G('it-proc-overlay').classList.remove('active');
      root.querySelectorAll('.it-btn-apply').forEach(b => b.disabled = false);
    }

    // ─── Upload ──────────────────────────────────────────
    function loadFile(file) {
      if (!file) return;
      if (file.size > 52428800) { showToast('Max 50MB allowed', true); return; }
      const ok = ['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'];
      if (!ok.includes(file.type)) { showToast('Unsupported format', true); return; }
      state.fileName = file.name.replace(/\.[^.]+$/, '') || 'image-toolkit';
      state.origSize = file.size;
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target.result;
        const img = new Image();
        img.onload = () => {
          state.origW = img.width; state.origH = img.height;
          state.curW = img.width; state.curH = img.height;
          state.resizeW = img.width; state.resizeH = img.height;
          state.cropW = img.width; state.cropH = img.height;
          state.cropX = 0; state.cropY = 0;
          state.curSize = file.size;
          state.origImage = url; state.image = url;
          state.history = [url]; state.histIdx = 0;
          state.compareMode = false;
          G('it-resize-w').value = img.width;
          G('it-resize-h').value = img.height;
          G('it-crop-w').value = img.width; G('it-crop-h').value = img.height;
          G('it-crop-x').value = 0; G('it-crop-y').value = 0;
          G('it-cmp-before-img').src = url;
          updateHistoryBtns();
          showWorkspace();
          setPreviewImg(url);
          updateMeta();
          showToast('✓ Image loaded!');
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    }

    const uploadZone = G('it-upload-zone');
    const fileInput  = G('it-file-input');
    uploadZone.addEventListener('click', () => fileInput.click());
    G('it-change-btn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => loadFile(e.target.files[0]));
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag'));
    uploadZone.addEventListener('drop', e => { e.preventDefault(); uploadZone.classList.remove('drag'); loadFile(e.dataTransfer.files[0]); });
    document.addEventListener('paste', e => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) { if (item.type.startsWith('image/')) { loadFile(item.getAsFile()); break; } }
    });

    // ─── Tool Nav ─────────────────────────────────────────
    root.querySelectorAll('.it-tool-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.it-tool-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeTool = btn.dataset.tool;
        root.querySelectorAll('.it-tool-panel').forEach(p => p.classList.remove('active'));
        G(`it-panel-${state.activeTool}`)?.classList.add('active');
        G('it-panel-title-text').textContent = btn.querySelector('.tnav-label').textContent;
        G('it-panel-title-icon').textContent = btn.querySelector('.tnav-icon').textContent;
      });
    });

    // ─── RESIZE ──────────────────────────────────────────
    G('it-resize-w').addEventListener('input', e => {
      const w = parseInt(e.target.value) || 0;
      state.resizeW = w;
      if (state.aspectLocked && state.origW) {
        state.resizeH = Math.round((w / state.origW) * state.origH);
        G('it-resize-h').value = state.resizeH;
      }
    });
    G('it-resize-h').addEventListener('input', e => {
      const h = parseInt(e.target.value) || 0;
      state.resizeH = h;
      if (state.aspectLocked && state.origH) {
        state.resizeW = Math.round((h / state.origH) * state.origW);
        G('it-resize-w').value = state.resizeW;
      }
    });
    G('it-aspect-btn').addEventListener('click', () => {
      state.aspectLocked = !state.aspectLocked;
      G('it-aspect-btn').textContent = state.aspectLocked ? '🔒 Locked' : '🔓 Free';
      G('it-aspect-btn').classList.toggle('it-chip', true);
      G('it-aspect-btn').classList.toggle('active', state.aspectLocked);
    });
    root.querySelectorAll('[data-pct]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.dataset.pct);
        state.resizeW = Math.round(state.origW * p / 100);
        state.resizeH = Math.round(state.origH * p / 100);
        G('it-resize-w').value = state.resizeW;
        G('it-resize-h').value = state.resizeH;
      });
    });
    G('it-apply-resize').addEventListener('click', async () => {
      if (!state.image || !state.resizeW || !state.resizeH) return;
      showProc('Resizing…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = state.resizeW; c.height = state.resizeH;
        c.getContext('2d').drawImage(img, 0, 0, state.resizeW, state.resizeH);
        finalize(c); showToast(`✓ Resized to ${state.resizeW}×${state.resizeH}`);
      } finally { hideProc(); }
    });

    // ─── COMPRESS ────────────────────────────────────────
    const qualitySlider = G('it-quality-slider');
    qualitySlider.addEventListener('input', () => {
      state.quality = parseInt(qualitySlider.value);
      G('it-quality-val').textContent = state.quality + '%';
    });
    root.querySelectorAll('[data-cmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-cmode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.compMode = btn.dataset.cmode;
        G('it-quality-group').style.display = state.compMode === 'custom' ? 'block' : 'none';
      });
    });
    G('it-apply-compress').addEventListener('click', async () => {
      if (!state.image) return;
      const q = state.compMode === 'auto' ? 80 : state.compMode === 'lossless' ? 100 : state.quality;
      const f = state.compMode === 'lossless' ? 'png' : state.fmt;
      showProc('Compressing…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        finalize(c, f, q); showToast('✓ Compression applied!');
      } finally { hideProc(); }
    });
    G('it-apply-target').addEventListener('click', async () => {
      const kb = parseInt(G('it-target-kb').value);
      if (!state.image || !kb) return;
      const target = kb * 1024;
      showProc('Finding optimal quality…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        let lo = 1, hi = 100, best = 80;
        for (let i = 0; i < 12; i++) {
          const mid = Math.round((lo + hi) / 2);
          const url = c.toDataURL(getMime(state.fmt), mid / 100);
          const size = Math.round((url.split(',')[1] || '').length * 0.75);
          if (size <= target) { best = mid; lo = mid + 1; } else hi = mid - 1;
        }
        finalize(c, state.fmt, best); showToast(`✓ Compressed to ~${kb}KB (q${best})`);
      } finally { hideProc(); }
    });

    // ─── CONVERT ─────────────────────────────────────────
    root.querySelectorAll('[data-fmt]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-fmt]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.fmt = btn.dataset.fmt;
      });
    });
    G('it-apply-convert').addEventListener('click', async () => {
      if (!state.image) return;
      showProc('Converting…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        finalize(c, state.fmt, state.quality); showToast(`✓ Converted to ${state.fmt.toUpperCase()}`);
      } finally { hideProc(); }
    });

    // ─── CROP ────────────────────────────────────────────
    root.querySelectorAll('[data-ratio]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-ratio]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const ratio = btn.dataset.ratio;
        state.cropRatio = ratio;
        if (ratio !== 'free' && state.curW && state.curH) {
          const [rw, rh] = ratio.split(':').map(Number);
          let cw = state.curW, ch = Math.round(cw / (rw / rh));
          if (ch > state.curH) { ch = state.curH; cw = Math.round(ch * (rw / rh)); }
          state.cropW = cw; state.cropH = ch;
          state.cropX = Math.round((state.curW - cw) / 2);
          state.cropY = Math.round((state.curH - ch) / 2);
          G('it-crop-w').value = cw; G('it-crop-h').value = ch;
          G('it-crop-x').value = state.cropX; G('it-crop-y').value = state.cropY;
        }
      });
    });
    ['it-crop-x','it-crop-y','it-crop-w','it-crop-h'].forEach((id, i) => {
      G(id).addEventListener('input', e => {
        const keys = ['cropX','cropY','cropW','cropH'];
        state[keys[i]] = parseInt(e.target.value) || 0;
      });
    });
    G('it-apply-crop').addEventListener('click', async () => {
      if (!state.image) return;
      showProc('Cropping…');
      try {
        const img = await loadImg(state.image);
        const cx = Math.max(0, state.cropX), cy = Math.max(0, state.cropY);
        const cw = Math.min(state.cropW, img.width - cx);
        const ch = Math.min(state.cropH, img.height - cy);
        const c = document.createElement('canvas'); c.width = cw; c.height = ch;
        c.getContext('2d').drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
        finalize(c); showToast(`✓ Cropped to ${cw}×${ch}`);
      } finally { hideProc(); }
    });

    // ─── ROTATE ──────────────────────────────────────────
    async function doRotate(deg) {
      if (!state.image) return;
      showProc(`Rotating ${deg}°…`);
      try {
        const img = await loadImg(state.image);
        const rad = (deg * Math.PI) / 180;
        const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
        const nw = Math.round(img.width * cos + img.height * sin);
        const nh = Math.round(img.width * sin + img.height * cos);
        const c = document.createElement('canvas'); c.width = nw; c.height = nh;
        const ctx = c.getContext('2d');
        ctx.translate(nw/2, nh/2); ctx.rotate(rad);
        ctx.drawImage(img, -img.width/2, -img.height/2);
        finalize(c); showToast(`✓ Rotated ${deg}°`);
      } finally { hideProc(); }
    }
    [90, 180, 270].forEach(d => {
      G(`it-rot-${d}`).addEventListener('click', () => doRotate(d));
    });
    G('it-rot-neg').addEventListener('click', () => doRotate(-90));
    G('it-rot-custom-btn').addEventListener('click', () => doRotate(parseInt(G('it-rot-angle').value) || 0));
    G('it-flip-h').addEventListener('click', async () => {
      if (!state.image) return; showProc('Flipping…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.translate(img.width, 0); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0);
        finalize(c); showToast('✓ Flipped horizontally');
      } finally { hideProc(); }
    });
    G('it-flip-v').addEventListener('click', async () => {
      if (!state.image) return; showProc('Flipping…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.translate(0, img.height); ctx.scale(1, -1); ctx.drawImage(img, 0, 0);
        finalize(c); showToast('✓ Flipped vertically');
      } finally { hideProc(); }
    });

    // ─── ADJUSTMENTS ─────────────────────────────────────
    const adjSliders = [
      ['it-brightness','brightness',0],['it-contrast','contrast',0],
      ['it-saturation','saturation',0],['it-blur','blur',0],['it-hue','hue',0],
    ];
    adjSliders.forEach(([id, key]) => {
      G(id).addEventListener('input', e => {
        state[key] = parseFloat(e.target.value);
        G(`${id}-val`).textContent = e.target.value + (key === 'blur' ? 'px' : key === 'hue' ? '°' : '');
      });
    });
    G('it-apply-adj').addEventListener('click', async () => {
      if (!state.image) return; showProc('Applying…');
      try {
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        const filters = [
          state.brightness !== 0 && `brightness(${1 + state.brightness/100})`,
          state.contrast !== 0   && `contrast(${1 + state.contrast/100})`,
          state.saturation !== 0 && `saturate(${1 + state.saturation/100})`,
          state.blur > 0         && `blur(${state.blur}px)`,
          state.hue !== 0        && `hue-rotate(${state.hue}deg)`,
        ].filter(Boolean).join(' ');
        ctx.filter = filters || 'none'; ctx.drawImage(img, 0, 0);
        finalize(c); showToast('✓ Adjustments applied!');
      } finally { hideProc(); }
    });
    G('it-reset-adj').addEventListener('click', () => {
      adjSliders.forEach(([id, key, def]) => {
        state[key] = def; G(id).value = def;
        G(`${id}-val`).textContent = def + (key==='blur'?'px':key==='hue'?'°':'');
      });
      showToast('✓ Sliders reset');
    });

    // ─── WATERMARK ───────────────────────────────────────
    root.querySelectorAll('[data-wmtype]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-wmtype]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.wmType = btn.dataset.wmtype;
        G('it-wm-text-group').style.display = state.wmType === 'text' ? 'block' : 'none';
        G('it-wm-img-group').style.display  = state.wmType === 'image' ? 'block' : 'none';
      });
    });
    root.querySelectorAll('[data-wmpos]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-wmpos]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.wmPos = btn.dataset.wmpos;
      });
    });
    const wmImgInput = G('it-wm-img-input');
    G('it-wm-img-btn').addEventListener('click', () => wmImgInput.click());
    wmImgInput.addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader(); r.onload = ev => { state.wmImgSrc = ev.target.result; G('it-wm-img-btn').textContent = '✅ Logo Loaded'; };
      r.readAsDataURL(f);
    });
    G('it-apply-wm').addEventListener('click', async () => {
      if (!state.image) return; showProc('Applying watermark…');
      try {
        const wmText = G('it-wm-text').value.trim();
        const wmColor = G('it-wm-color').value;
        const wmSize  = parseInt(G('it-wm-size').value) || 32;
        const wmOp    = (parseInt(G('it-wm-opacity').value) || 60) / 100;
        const img = await loadImg(state.image);
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const pad = 24;
        if (state.wmType === 'text' && wmText) {
          ctx.save(); ctx.globalAlpha = wmOp;
          ctx.font = `bold ${wmSize}px sans-serif`; ctx.fillStyle = wmColor;
          ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 5;
          const tw = ctx.measureText(wmText).width;
          const x = state.wmPos.includes('L') ? pad : state.wmPos.includes('R') ? img.width - tw - pad : (img.width - tw) / 2;
          const y = state.wmPos.includes('T') ? wmSize + pad : state.wmPos.includes('B') ? img.height - pad : img.height / 2 + wmSize / 3;
          ctx.fillText(wmText, x, y); ctx.restore();
        }
        if (state.wmType === 'image' && state.wmImgSrc) {
          const wi = await loadImg(state.wmImgSrc);
          const ww = Math.min(img.width * 0.25, 200), wh = (wi.height / wi.width) * ww;
          const x = state.wmPos.includes('L') ? pad : state.wmPos.includes('R') ? img.width - ww - pad : (img.width - ww) / 2;
          const y = state.wmPos.includes('T') ? pad : state.wmPos.includes('B') ? img.height - wh - pad : (img.height - wh) / 2;
          ctx.save(); ctx.globalAlpha = wmOp; ctx.drawImage(wi, x, y, ww, wh); ctx.restore();
        }
        finalize(c); showToast('✓ Watermark applied!');
      } finally { hideProc(); }
    });

    // ─── BG REMOVE ───────────────────────────────────────
    root.querySelectorAll('[data-bgcol]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-bgcol]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.bgAfterColor = btn.dataset.bgcol;
      });
    });
    // custom color chip
    G('it-bg-custom-btn').addEventListener('click', () => {
      const col = G('it-bg-custom-color').value;
      root.querySelectorAll('[data-bgcol]').forEach(b => b.classList.remove('active'));
      G('it-bg-custom-btn').classList.add('active');
      state.bgAfterColor = col;
    });
    G('it-bg-custom-color').addEventListener('input', e => {
      if (G('it-bg-custom-btn').classList.contains('active')) state.bgAfterColor = e.target.value;
    });

    function bgSetStatus(msg, pct) {
      const wrap = G('it-bg-status-wrap');
      const msgEl = G('it-bg-status-msg');
      const bar   = G('it-bg-status-bar');
      const pctEl = G('it-bg-status-pct');
      if (!wrap) return;
      wrap.style.display = 'block';
      if (msgEl) msgEl.textContent = msg;
      if (bar)   bar.style.width   = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
    }
    function bgHideStatus() {
      T(() => { const w = G('it-bg-status-wrap'); if (w) w.style.display = 'none'; }, 1200);
    }

    G('it-apply-bgremove').addEventListener('click', async () => {
      if (!state.image) { showToast('Upload an image first', true); return; }
      const applyBtn = G('it-apply-bgremove');
      applyBtn.disabled = true; applyBtn.textContent = '⏳ Processing…';
      bgSetStatus('Loading AI model (~40MB first time)…', 5);
      // also show proc overlay on the preview
      G('it-proc-msg').textContent = 'Loading AI model…';
      G('it-proc-overlay').classList.add('active');
      G('it-bg-bar').style.width = '5%';
      try {
        const { removeBackground } = await import('@imgly/background-removal');
        const blob = await fetch(state.image).then(r => r.blob());
        bgSetStatus('AI model ready — removing background…', 30);
        const result = await removeBackground(blob, {
          progress: (k, cur, tot) => {
            if (tot > 0) {
              const pct = Math.round((cur / tot) * 55) + 30;
              const dlPct = Math.round((cur / tot) * 100);
              bgSetStatus(`Downloading model… ${dlPct}%`, pct);
              G('it-proc-msg').textContent = `Downloading model… ${dlPct}%`;
              G('it-bg-bar').style.width = pct + '%';
            }
          }
        });
        bgSetStatus('Cleaning edges…', 92);
        G('it-bg-bar').style.width = '92%';
        G('it-proc-msg').textContent = 'Cleaning edges…';
        const dataURL = await new Promise(res => { const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(result); });
        if (state.bgAfterColor && state.bgAfterColor !== 'transparent') {
          const img2 = await loadImg(dataURL);
          const c = document.createElement('canvas'); c.width = img2.width; c.height = img2.height;
          const ctx = c.getContext('2d');
          ctx.fillStyle = state.bgAfterColor; ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img2, 0, 0); finalize(c, 'png');
        } else {
          state.image = dataURL; state.fmt = 'png';
          const img2 = new Image(); img2.onload = () => { state.curW = img2.width; state.curH = img2.height; updateMeta(); };
          img2.src = dataURL;
          const b64 = dataURL.split(',')[1] || '';
          state.curSize = Math.round(b64.length * 0.75);
          setPreviewImg(dataURL); saveHistory(dataURL); updateMeta();
        }
        bgSetStatus('✓ Done! Background removed!', 100);
        G('it-bg-bar').style.width = '100%';
        showToast('✓ Background removed!');
        // update dl fmt to png
        if (G('it-dl-fmt')) G('it-dl-fmt').value = 'png';
      } catch (e) {
        bgSetStatus('❌ Failed: ' + e.message, 0);
        showToast('BG removal failed: ' + e.message, true);
      } finally {
        T(() => { G('it-bg-bar').style.width = '0%'; }, 800);
        G('it-proc-overlay').classList.remove('active');
        applyBtn.disabled = false; applyBtn.textContent = '✦ Remove Background';
        bgHideStatus();
      }
    });

    // ─── PRESETS ─────────────────────────────────────────
    const presetSearch = G('it-preset-search');
    presetSearch.addEventListener('input', () => renderPresets(presetSearch.value));
    function renderPresets(q = '') {
      const grid = G('it-preset-grid');
      grid.innerHTML = '';
      Object.entries(PRESETS_DATA).forEach(([cat, items]) => {
        const filtered = items.filter(p => p.n.toLowerCase().includes(q.toLowerCase()) || `${p.w}x${p.h}`.includes(q));
        if (!filtered.length) return;
        const catEl = document.createElement('div'); catEl.className = 'it-preset-cat'; catEl.textContent = cat; grid.appendChild(catEl);
        filtered.forEach(p => {
          const el = document.createElement('div'); el.className = 'it-preset-item';
          el.innerHTML = `<span class="it-preset-name">${p.n}</span><span class="it-preset-size">${p.w}×${p.h}</span>`;
          el.addEventListener('click', async () => {
            if (!state.image) return;
            showProc(`Applying ${p.n}…`);
            try {
              const img = await loadImg(state.image);
              const c = document.createElement('canvas'); c.width = p.w; c.height = p.h;
              c.getContext('2d').drawImage(img, 0, 0, p.w, p.h);
              G('it-resize-w').value = p.w; G('it-resize-h').value = p.h;
              state.resizeW = p.w; state.resizeH = p.h;
              finalize(c); showToast(`✓ ${p.n} (${p.w}×${p.h})`);
            } finally { hideProc(); }
          });
          grid.appendChild(el);
        });
      });
    }
    renderPresets();

    // ─── DOWNLOAD / COPY ─────────────────────────────────
    G('it-dl-btn').addEventListener('click', () => {
      if (!state.image) return;
      const a = document.createElement('a');
      a.href = state.image; a.download = `${state.fileName}.${getExt(state.fmt)}`; a.click();
      showToast('✓ Downloaded!');
    });
    // sticky bar download buttons
    G('it-dl-bar-main').addEventListener('click', () => {
      if (!state.image) return;
      const a = document.createElement('a');
      a.href = state.image; a.download = `${state.fileName}.${getExt(state.fmt)}`; a.click();
      showToast('✓ Downloaded!');
    });
    G('it-dl-bar-copy').addEventListener('click', async () => {
      if (!state.image) return;
      try {
        const res = await fetch(state.image); const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        showToast('✓ Copied to clipboard!');
      } catch { showToast('Copy failed — use download', true); }
    });
    G('it-dl-bar-reset').addEventListener('click', () => {
      if (!state.origImage) return;
      state.image = state.origImage; state.curW = state.origW; state.curH = state.origH; state.curSize = state.origSize;
      state.history = [state.origImage]; state.histIdx = 0;
      setPreviewImg(state.origImage); updateMeta(); updateHistoryBtns();
      showToast('🔄 Reset to original');
    });
    G('it-copy-btn').addEventListener('click', async () => {
      if (!state.image) return;
      try {
        const res = await fetch(state.image); const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        showToast('✓ Copied to clipboard!');
      } catch { showToast('Copy failed — use download', true); }
    });

    // ─── RESET ───────────────────────────────────────────
    G('it-reset-btn').addEventListener('click', () => {
      if (!state.origImage) return;
      state.image = state.origImage; state.curW = state.origW; state.curH = state.origH; state.curSize = state.origSize;
      state.history = [state.origImage]; state.histIdx = 0;
      setPreviewImg(state.origImage); updateMeta(); updateHistoryBtns();
      showToast('🔄 Reset to original');
    });

    // ─── Download Card ────────────────────────────────────
    G('it-dl-card-btn').addEventListener('click', () => {
      if (!state.image) return;
      const fmt = G('it-dl-fmt').value;
      const name = G('it-dl-filename').value.trim() || state.fileName || 'image-toolkit';
      const ext  = fmt === 'jpeg' ? 'jpg' : fmt;
      const a = document.createElement('a');
      // re-encode in chosen format
      const img2 = new Image();
      img2.onload = () => {
        const c = document.createElement('canvas'); c.width = img2.width; c.height = img2.height;
        c.getContext('2d').drawImage(img2, 0, 0);
        a.href = c.toDataURL(getMime(fmt), state.quality / 100);
        a.download = `${name}.${ext}`; a.click();
        showToast(`✓ Downloaded as ${ext.toUpperCase()}!`);
      };
      img2.src = state.image;
    });
    G('it-dl-fmt').addEventListener('change', e => { state.fmt = e.target.value; });
    G('it-dl-filename').addEventListener('input', e => { state.fileName = e.target.value.trim() || 'image-toolkit'; });
    G('it-dl-card-copy').addEventListener('click', async () => {
      if (!state.image) return;
      try {
        const res = await fetch(state.image); const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        showToast('✓ Copied to clipboard!');
      } catch { showToast('Copy failed — use download', true); }
    });
    G('it-dl-card-reset').addEventListener('click', () => {
      if (!state.origImage) return;
      state.image = state.origImage; state.curW = state.origW; state.curH = state.origH; state.curSize = state.origSize;
      state.history = [state.origImage]; state.histIdx = 0;
      setPreviewImg(state.origImage); updateMeta(); updateHistoryBtns();
      showToast('🔄 Reset to original');
    });
    G('it-dl-card-compare').addEventListener('click', () => {
      G('it-compare-btn').click();
    });

    // ─── COMPARE ─────────────────────────────────────────
    G('it-compare-btn').addEventListener('click', () => {
      if (!state.origImage || !state.image) return;
      state.compareMode = !state.compareMode;
      const cw = G('it-compare-wrap');
      const pi = G('it-preview-img');
      cw.classList.toggle('active', state.compareMode);
      pi.style.display = state.compareMode ? 'none' : 'block';
      G('it-compare-btn').classList.toggle('active', state.compareMode);
      G('it-compare-btn').textContent = state.compareMode ? '⚖ ON' : '⚖ Compare';
      if (state.compareMode) {
        G('it-cmp-before-img').src = state.origImage;
        G('it-cmp-after-img').src = state.image;
        updateCompare(state.comparePos);
      }
    });
    const compareWrap = G('it-compare-wrap');
    let draggingCmp = false;
    compareWrap.addEventListener('mousedown', () => { draggingCmp = true; });
    compareWrap.addEventListener('mouseup', () => { draggingCmp = false; });
    compareWrap.addEventListener('mouseleave', () => { draggingCmp = false; });
    compareWrap.addEventListener('mousemove', e => {
      if (!draggingCmp) return;
      const rect = compareWrap.getBoundingClientRect();
      state.comparePos = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
      updateCompare(state.comparePos);
    });
    compareWrap.addEventListener('touchmove', e => {
      const rect = compareWrap.getBoundingClientRect();
      state.comparePos = Math.min(100, Math.max(0, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
      updateCompare(state.comparePos);
    });
    function updateCompare(pos) {
      G('it-cmp-divider').style.left = pos + '%';
      G('it-cmp-after').style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    }

    // ─── QUICK OPTIMIZE ──────────────────────────────────
    const quickMap = {
      instagram: {w:1080,h:1080,q:85,fmt:'jpeg'},
      whatsapp:  {w:1600,h:1600,q:80,fmt:'jpeg'},
      twitter:   {w:1200,h:675,q:85,fmt:'jpeg'},
      linkedin:  {w:1200,h:627,q:85,fmt:'jpeg'},
    };
    root.querySelectorAll('[data-quick]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!state.image) return;
        const p = quickMap[btn.dataset.quick]; if (!p) return;
        showProc(`Optimizing for ${btn.dataset.quick}…`);
        try {
          const img = await loadImg(state.image);
          const c = document.createElement('canvas'); c.width = p.w; c.height = p.h;
          c.getContext('2d').drawImage(img, 0, 0, p.w, p.h);
          state.fmt = p.fmt; state.quality = p.q;
          finalize(c, p.fmt, p.q); showToast(`✓ Optimized for ${btn.dataset.quick}!`);
        } finally { hideProc(); }
      });
    });

    // ─── KEYBOARD ────────────────────────────────────────
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); G('it-undoBtn').click(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); G('it-redoBtn').click(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') { e.preventDefault(); G('it-dl-btn').click(); }
    });

    // ─── FAQ ─────────────────────────────────────────────
    root.querySelectorAll('.it-faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.it-faq-item');
        const isOpen = item.classList.contains('open');
        root.querySelectorAll('.it-faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    return () => { timers.forEach(clearTimeout); };
  }, [mounted]);

  // ─── JSX ─────────────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div id="it-root" className="it-root">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <section className="it-hero" style={{ minHeight: '100vh', padding: '6rem 1.5rem' }}>
          <div className="it-hero-content">
            <div className="it-hero-badge">100% Browser-Based · Zero Upload · Zero Cost</div>
            <h1>
              Resize. Compress.<br />
              <span className="ha">Edit. Free.</span>
            </h1>
            <p className="it-hero-sub">Loading editor…</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="it-root" className="it-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="it-nav">
        <div className="it-nav-logo">
          <span className="logo-icon">🖼</span>
          <span>Image Toolkit</span>
          <span className="logo-sub">by TooL Void</span>
        </div>
        <div className="it-nav-right">
          <ul className="it-nav-links">
            <li><a href="#it-tool">Editor</a></li>
            <li><a href="#it-features">Features</a></li>
            <li><a href="#it-use-cases">Use Cases</a></li>
            <li><a href="#it-faq">FAQ</a></li>
          </ul>
          <a href="#it-tool" className="it-nav-cta">Try Free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="it-hero">
        <div className="it-hero-grid" aria-hidden="true" />
        <div className="it-hero-glow" aria-hidden="true" />
        <div className="it-hero-glow2" aria-hidden="true" />
        <div className="it-hero-content">
          <div className="it-hero-badge">100% Browser-Based · Zero Upload · Zero Cost</div>
          <h1>
            Resize. Compress.<br />
            <span className="ha">Edit. Free.</span>
          </h1>
          <p className="it-hero-sub">
            A full-featured image editor that runs entirely in your browser. Resize, compress, crop, adjust, watermark, remove backgrounds — no sign-up, no limits, no watermarks.
          </p>
          <div className="it-hero-actions">
            <a href="#it-tool" className="it-btn-primary"><span>Open Editor</span><span>⤡</span></a>
            <a href="#it-features" className="it-btn-ghost"><span>See Features</span><span>↓</span></a>
          </div>
          <div className="it-hero-stats">
            <div className="it-hero-stat">
              <div className="it-hero-stat-num">9+</div>
              <div className="it-hero-stat-label">Edit Tools</div>
            </div>
            <div className="it-hero-stat">
              <div className="it-hero-stat-num">50+</div>
              <div className="it-hero-stat-label">Size Presets</div>
            </div>
            <div className="it-hero-stat">
              <div className="it-hero-stat-num">0KB</div>
              <div className="it-hero-stat-label">Uploaded to Server</div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section className="it-section it-tool-section" id="it-tool">
        <div className="it-section-inner">
          <div className="it-tool-header">
            <div className="it-section-label">⤡ Live Editor</div>
            <h2 className="it-section-title">Start Editing</h2>
            <p className="it-section-sub">Upload, drag & drop, or paste (Ctrl+V) — all processing happens right in your browser.</p>
          </div>

          {/* UPLOAD ZONE */}
          <div className="it-upload-zone" id="it-upload-zone">
            <div className="it-upload-icon" aria-hidden="true">📁</div>
            <div className="it-upload-title">Drop your image here</div>
            <div className="it-upload-sub">or click to browse files</div>
            <div className="it-upload-formats">
              {['JPG','PNG','WEBP','GIF','SVG'].map(f => <span key={f} className="it-fmt-pill">{f}</span>)}
            </div>
            <div className="it-upload-hint">Max 50MB · Ctrl+V to paste · 100% private</div>
          </div>
          <input type="file" id="it-file-input" accept="image/*" style={{display:'none'}} />

          {/* WORKSPACE */}
          <div className="it-workspace" id="it-workspace">

            {/* SIDEBAR */}
            <aside className="it-sidebar">

              {/* File Card */}
              <div className="it-file-card">
                <img className="it-file-thumb" id="it-file-thumb" src={null} alt="" />
                <div className="it-file-info">
                  <div className="it-file-dim" id="it-file-dim">—</div>
                  <div className="it-file-size" id="it-file-size">—</div>
                  <div className="it-file-savings" id="it-file-savings" style={{display:'none'}} />
                </div>
                <button className="it-change-btn" id="it-change-btn">Change ↑</button>
              </div>

              {/* Tool Nav */}
              <nav className="it-tool-nav">
                {[
                  {id:'resize',icon:'⤡',label:'Resize'},
                  {id:'compress',icon:'▼',label:'Compress'},
                  {id:'convert',icon:'⇄',label:'Convert'},
                  {id:'crop',icon:'✂',label:'Crop'},
                  {id:'rotate',icon:'↻',label:'Rotate & Flip'},
                  {id:'adjust',icon:'◑',label:'Adjustments'},
                  {id:'watermark',icon:'©',label:'Watermark'},
                  {id:'bgremove',icon:'✦',label:'BG Remover'},
                  {id:'presets',icon:'▦',label:'Presets'},
                ].map((t,i) => (
                  <button key={t.id} className={`it-tool-nav-btn${i===0?' active':''}`} data-tool={t.id}>
                    <span className="tnav-icon">{t.icon}</span>
                    <span className="tnav-label">{t.label}</span>
                  </button>
                ))}
              </nav>

              {/* Tool Panel */}
              <div className="it-tool-panel-wrap">
                <div className="it-panel-title">
                  <span id="it-panel-title-icon">⤡</span>
                  <span id="it-panel-title-text">Resize</span>
                </div>

                {/* RESIZE */}
                <div className="it-tool-panel active" id="it-panel-resize">
                  <div className="it-ctrl-row">
                    <div className="it-ctrl-col">
                      <span className="it-ctrl-label">Width px</span>
                      <input type="number" className="it-input" id="it-resize-w" min={1} defaultValue={0} />
                    </div>
                    <div className="it-ctrl-col">
                      <span className="it-ctrl-label">Height px</span>
                      <input type="number" className="it-input" id="it-resize-h" min={1} defaultValue={0} />
                    </div>
                  </div>
                  <div className="it-ctrl-group">
                    <button className="it-chip active" id="it-aspect-btn" style={{marginBottom:8}}>🔒 Locked</button>
                    <div className="it-chip-row">
                      {[25,50,75,100].map(p => <button key={p} className="it-chip" data-pct={p}>{p}%</button>)}
                    </div>
                  </div>
                  <button className="it-btn-apply" id="it-apply-resize">⤡ Apply Resize</button>
                </div>

                {/* COMPRESS */}
                <div className="it-tool-panel" id="it-panel-compress">
                  <div className="it-chip-row" style={{marginBottom:12}}>
                    <button className="it-chip active" data-cmode="custom">🎛 Custom</button>
                    <button className="it-chip" data-cmode="auto">🤖 Auto</button>
                    <button className="it-chip" data-cmode="lossless">🔒 Lossless</button>
                  </div>
                  <div id="it-quality-group" style={{marginBottom:12}}>
                    <div className="it-range-row">
                      <span className="it-range-label">Quality</span>
                      <span className="it-range-val" id="it-quality-val">82%</span>
                    </div>
                    <input type="range" className="it-range" id="it-quality-slider" min={1} max={100} defaultValue={82} />
                  </div>
                  <div id="it-stats-box" style={{display:'none',marginBottom:12}}>
                    <div className="it-stats-box">
                      <div className="it-stats-row"><span className="it-stats-key">Original</span><span className="it-stats-val" id="it-stats-orig">—</span></div>
                      <div className="it-stats-row"><span className="it-stats-key">After</span><span className="it-stats-val" id="it-stats-after">—</span></div>
                      <div className="it-savings-badge" id="it-stats-savings" />
                    </div>
                  </div>
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Target File Size</span>
                    <div style={{display:'flex',gap:6}}>
                      <input type="number" className="it-input" id="it-target-kb" placeholder="KB" style={{flex:1}} />
                      <button className="it-btn-sec" id="it-apply-target">Go</button>
                    </div>
                  </div>
                  <button className="it-btn-apply" id="it-apply-compress">▼ Apply Compression</button>
                </div>

                {/* CONVERT */}
                <div className="it-tool-panel" id="it-panel-convert">
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Output Format</span>
                    <div className="it-chip-row" style={{marginBottom:12}}>
                      <button className="it-chip active" data-fmt="jpeg" style={{flex:1,textAlign:'center'}}>JPG</button>
                      <button className="it-chip" data-fmt="png" style={{flex:1,textAlign:'center'}}>PNG</button>
                      <button className="it-chip" data-fmt="webp" style={{flex:1,textAlign:'center'}}>WEBP ⭐</button>
                    </div>
                  </div>
                  <div className="it-ctrl-group">
                    <div className="it-range-row">
                      <span className="it-range-label">Quality</span>
                      <span className="it-range-val">82%</span>
                    </div>
                    <input type="range" className="it-range" min={1} max={100} defaultValue={82} />
                  </div>
                  <button className="it-btn-apply" id="it-apply-convert">⇄ Convert & Apply</button>
                </div>

                {/* CROP */}
                <div className="it-tool-panel" id="it-panel-crop">
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Ratio Presets</span>
                    <div className="it-chip-row">
                      {['free','1:1','16:9','9:16','4:3','3:2'].map(r => (
                        <button key={r} className={`it-chip${r==='free'?' active':''}`} data-ratio={r}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <span className="it-ctrl-label">Crop Area (px)</span>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:12}}>
                    {[['X','it-crop-x'],['Y','it-crop-y'],['W','it-crop-w'],['H','it-crop-h']].map(([l,id]) => (
                      <div key={id}>
                        <span style={{fontSize:'0.65rem',color:'var(--text-muted)',display:'block',marginBottom:3,fontFamily:'var(--font-mono)'}}>{l}</span>
                        <input type="number" className="it-input" id={id} defaultValue={0} min={0} />
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',gap:6}}>
                    <button className="it-btn-apply" id="it-apply-crop" style={{flex:1}}>✂ Apply Crop</button>
                    <button className="it-btn-sec" onClick={() => {}}>↺ Reset</button>
                  </div>
                </div>

                {/* ROTATE */}
                <div className="it-tool-panel" id="it-panel-rotate">
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Quick Rotate</span>
                    <div className="it-chip-row">
                      <button className="it-chip" id="it-rot-neg">↺ -90°</button>
                      <button className="it-chip" id="it-rot-90">↻ 90°</button>
                      <button className="it-chip" id="it-rot-180">180°</button>
                      <button className="it-chip" id="it-rot-270">270°</button>
                    </div>
                  </div>
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Custom Angle</span>
                    <div style={{display:'flex',gap:6}}>
                      <input type="number" className="it-input" id="it-rot-angle" placeholder="-360 to 360" defaultValue={0} style={{flex:1}} />
                      <button className="it-btn-sec" id="it-rot-custom-btn">Apply</button>
                    </div>
                  </div>
                  <div className="it-ctrl-group">
                    <span className="it-ctrl-label">Flip</span>
                    <div style={{display:'flex',gap:6}}>
                      <button className="it-btn-sec" id="it-flip-h" style={{flex:1,justifyContent:'center'}}>↔ Horizontal</button>
                      <button className="it-btn-sec" id="it-flip-v" style={{flex:1,justifyContent:'center'}}>↕ Vertical</button>
                    </div>
                  </div>
                </div>

                {/* ADJUST */}
                <div className="it-tool-panel" id="it-panel-adjust">
                  {[
                    {id:'it-brightness',lbl:'☀️ Brightness',min:-100,max:100,def:0,unit:''},
                    {id:'it-contrast',  lbl:'🔲 Contrast',  min:-100,max:100,def:0,unit:''},
                    {id:'it-saturation',lbl:'🎨 Saturation',min:-100,max:100,def:0,unit:''},
                    {id:'it-blur',      lbl:'💧 Blur',       min:0,   max:20, def:0,unit:'px'},
                    {id:'it-hue',       lbl:'🌈 Hue Rotate', min:0,   max:360,def:0,unit:'°'},
                  ].map(s => (
                    <div className="it-slider-group" key={s.id}>
                      <div className="it-range-row">
                        <span className="it-range-label">{s.lbl}</span>
                        <span className="it-range-val" id={`${s.id}-val`}>{s.def}{s.unit}</span>
                      </div>
                      <input type="range" className="it-range" id={s.id} min={s.min} max={s.max} defaultValue={s.def} />
                    </div>
                  ))}
                  <div style={{display:'flex',gap:6}}>
                    <button className="it-btn-apply" id="it-apply-adj" style={{flex:1}}>◑ Apply All</button>
                    <button className="it-btn-sec" id="it-reset-adj">Reset</button>
                  </div>
                </div>

                {/* WATERMARK */}
                <div className="it-tool-panel" id="it-panel-watermark">
                  <div className="it-chip-row" style={{marginBottom:12}}>
                    <button className="it-chip active" data-wmtype="text" style={{flex:1,textAlign:'center'}}>✏ Text</button>
                    <button className="it-chip" data-wmtype="image" style={{flex:1,textAlign:'center'}}>🖼 Logo</button>
                  </div>
                  <div id="it-wm-text-group">
                    <span className="it-ctrl-label">Text</span>
                    <input type="text" className="it-input" id="it-wm-text" placeholder="© YourBrand" style={{marginBottom:10}} />
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:10}}>
                      <div><span style={{fontSize:'0.62rem',color:'var(--text-muted)',display:'block',marginBottom:3,fontFamily:'var(--font-mono)'}}>Color</span>
                        <input type="color" className="it-color-swatch" id="it-wm-color" defaultValue="#ffffff" style={{width:'100%',height:36}} /></div>
                      <div><span style={{fontSize:'0.62rem',color:'var(--text-muted)',display:'block',marginBottom:3,fontFamily:'var(--font-mono)'}}>Size px</span>
                        <input type="number" className="it-input" id="it-wm-size" defaultValue={32} min={8} max={200} /></div>
                      <div><span style={{fontSize:'0.62rem',color:'var(--text-muted)',display:'block',marginBottom:3,fontFamily:'var(--font-mono)'}}>Opacity %</span>
                        <input type="number" className="it-input" id="it-wm-opacity" defaultValue={60} min={0} max={100} /></div>
                    </div>
                  </div>
                  <div id="it-wm-img-group" style={{display:'none'}}>
                    <input type="file" id="it-wm-img-input" accept="image/*" style={{display:'none'}} />
                    <button className="it-btn-sec" id="it-wm-img-btn" style={{width:'100%',justifyContent:'center',marginBottom:10}}>📁 Upload Logo Image</button>
                  </div>
                  <span className="it-ctrl-label">Position</span>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4,marginBottom:12}}>
                    {['TL','TC','TR','ML','MC','MR','BL','BC','BR'].map((p,i) => (
                      <button key={p} className={`it-chip${p==='BR'?' active':''}`} data-wmpos={p} style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{p}</button>
                    ))}
                  </div>
                  <button className="it-btn-apply" id="it-apply-wm">© Apply Watermark</button>
                </div>

                {/* BG REMOVE */}
                <div className="it-tool-panel" id="it-panel-bgremove">
                  <div style={{background:'var(--accent-dim)',border:'1px solid rgba(255,217,61,0.2)',borderRadius:'var(--radius-xs)',padding:'0.8rem',marginBottom:12,fontSize:'0.78rem',color:'var(--text-dim)',lineHeight:1.7,fontFamily:'var(--font-mono)'}}>
                    🤖 AI-powered, runs 100% in browser.<br/>
                    ⬇ First run downloads ~40MB model — stored locally, instant after!
                  </div>
                  <span className="it-ctrl-label">Background After Removal</span>
                  <div className="it-chip-row" style={{marginBottom:12}}>
                    <button className="it-chip active" data-bgcol="transparent" style={{flex:1,textAlign:'center'}}>Transparent</button>
                    <button className="it-chip" data-bgcol="#ffffff" style={{flex:1,textAlign:'center'}}>White</button>
                    <button className="it-chip" data-bgcol="#000000" style={{flex:1,textAlign:'center'}}>Black</button>
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
                    <input type="color" defaultValue="#00ff00" id="it-bg-custom-color"
                      style={{width:34,height:34,borderRadius:6,border:'1px solid var(--border)',cursor:'pointer',padding:2,background:'none'}} />
                    <button className="it-chip" id="it-bg-custom-btn" style={{flex:1,textAlign:'center'}}>Custom Color</button>
                  </div>
                  {/* BG Progress — visible in panel */}
                  <div id="it-bg-status-wrap" style={{display:'none',marginBottom:12,background:'var(--bg2)',borderRadius:'var(--radius-xs)',padding:'0.75rem',border:'1px solid var(--border)'}}>
                    <div id="it-bg-status-msg" style={{fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-dim)',marginBottom:6}}>Initializing…</div>
                    <div style={{background:'var(--border)',borderRadius:99,height:7,overflow:'hidden'}}>
                      <div id="it-bg-status-bar" style={{height:'100%',background:'linear-gradient(90deg,var(--accent),var(--orange))',borderRadius:99,width:'0%',transition:'width 0.4s ease'}} />
                    </div>
                    <div id="it-bg-status-pct" style={{fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--text-muted)',marginTop:4,textAlign:'right'}}>0%</div>
                  </div>
                  <button className="it-btn-apply" id="it-apply-bgremove" style={{padding:'0.9rem',fontSize:'0.95rem'}}>✦ Remove Background</button>
                </div>

                {/* PRESETS */}
                <div className="it-tool-panel" id="it-panel-presets">
                  <input type="text" className="it-input" id="it-preset-search" placeholder="🔍 Search presets…" style={{marginBottom:10}} />
                  <div className="it-preset-grid" id="it-preset-grid" />
                </div>

              </div>

              {/* EXTRAS */}
              <div className="it-extras-wrap">
                <div className="it-extras-title">Quick Optimize</div>
                <div className="it-quick-btns">
                  {[['instagram','📸 Instagram'],['whatsapp','💬 WhatsApp'],['twitter','🐦 Twitter'],['linkedin','💼 LinkedIn']].map(([k,l]) => (
                    <button key={k} className="it-quick-btn" data-quick={k}>{l}</button>
                  ))}
                </div>
              </div>

              {/* DOWNLOAD CARD - always visible */}
              <div className="it-dl-card" id="it-dl-card">
                <button
                  className="it-dl-card-btn"
                  id="it-dl-card-btn"
                  style={{marginBottom:10,fontSize:'0.78rem',letterSpacing:'0.05em',fontFamily:'var(--font-mono)'}}
                >
                  ⬇ DOWNLOAD
                </button>
                <div className="it-dl-card-info" id="it-dl-card-info">
                  <div className="it-dl-card-row">
                    <span className="it-dl-card-key">Dimensions</span>
                    <span className="it-dl-card-val" id="it-dc-dim">Upload image first</span>
                  </div>
                  <div className="it-dl-card-row">
                    <span className="it-dl-card-key">File Size</span>
                    <span className="it-dl-card-val" id="it-dc-size">—</span>
                  </div>
                  <div className="it-dl-card-row">
                    <span className="it-dl-card-key">Original</span>
                    <span className="it-dl-card-val" id="it-dc-orig">—</span>
                  </div>
                  <div className="it-dl-card-savings" id="it-dc-savings" style={{display:'none'}} />
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <div style={{display:'flex',gap:6}}>
                    <select className="it-select" id="it-dl-fmt" style={{flex:1,fontSize:'0.78rem'}}>
                      <option value="jpeg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                    </select>
                    <input type="text" className="it-input" id="it-dl-filename" placeholder="filename" style={{flex:2,fontSize:'0.75rem'}} />
                  </div>
                  <div style={{display:'flex',gap:6}}>
                    <button className="it-dl-card-sec" id="it-dl-card-copy">📋 Copy</button>
                    <button className="it-dl-card-sec" id="it-dl-card-reset">🔄 Reset</button>
                    <button className="it-dl-card-sec" id="it-dl-card-compare">⚖ Compare</button>
                  </div>
                </div>
              </div>

            </aside>

            {/* PREVIEW PANEL */}
            <div className="it-preview-panel">

              {/* Topbar */}
              <div className="it-preview-topbar">
                <div className="it-preview-label">
                  <span className="it-preview-live" />LIVE PREVIEW
                </div>
                <div className="it-preview-btns">
                  <button className="it-undo-btn" id="it-undoBtn" disabled title="Ctrl+Z">↩</button>
                  <button className="it-undo-btn" id="it-redoBtn" disabled title="Ctrl+Y">↪</button>
                  <button className="it-pill-btn" id="it-compare-btn">⚖ Compare</button>
                </div>
              </div>

              {/* Image Canvas */}
              <div className="it-preview-img-wrap">
                <div className="it-preview-canvas" id="it-preview-canvas">
                  <img id="it-preview-img" alt="Preview" />
                  <div id="it-preview-placeholder">
                    <div className="it-ph-icon" aria-hidden="true">⤡</div>
                    <div className="it-ph-text">Upload an image to begin</div>
                  </div>
                  {/* Compare overlay */}
                  <div className="it-compare-wrap" id="it-compare-wrap">
                    <div className="it-compare-before"><img id="it-cmp-before-img" alt="Original" draggable={false} style={{maxWidth:'100%',maxHeight:'62vh',objectFit:'contain'}} /></div>
                    <div className="it-compare-after" id="it-cmp-after" style={{clipPath:'inset(0 50% 0 0)'}}>
                      <img id="it-cmp-after-img" alt="Edited" draggable={false} style={{maxWidth:'100%',maxHeight:'62vh',objectFit:'contain'}} />
                    </div>
                    <div className="it-compare-divider" id="it-cmp-divider" style={{left:'50%'}}>
                      <div className="it-compare-handle">⟺</div>
                    </div>
                    <div className="it-compare-lbl it-compare-lbl-l">ORIGINAL</div>
                    <div className="it-compare-lbl it-compare-lbl-r">EDITED</div>
                  </div>
                  {/* Processing overlay */}
                  <div className="it-proc-overlay" id="it-proc-overlay">
                    <div className="it-proc-spinner" />
                    <div className="it-proc-msg" id="it-proc-msg">Processing…</div>
                    <div className="it-bg-progress" style={{width:160}}><div className="it-bg-bar" id="it-bg-bar" /></div>
                  </div>
                </div>
              </div>

              {/* Meta chips */}
              <div className="it-preview-meta">
                <div className="it-meta-chip">Dim: <span id="it-meta-dim">—</span></div>
                <div className="it-meta-chip">Size: <span id="it-meta-size">—</span></div>
                <div className="it-meta-chip">Orig: <span id="it-meta-orig">—</span></div>
                <div className="it-meta-savings" id="it-meta-savings" />
              </div>

              {/* Shortcuts */}
              <div className="it-preview-shortcuts">
                {[['Ctrl+Z','Undo'],['Ctrl+Y','Redo'],['Ctrl+D','Download'],['Ctrl+V','Paste']].map(([k,v]) => (
                  <div key={k} className="it-shortcut"><kbd>{k}</kbd><span>{v}</span></div>
                ))}
              </div>

              {/* Download */}
              <div className="it-preview-dl">
                <button className="it-dl-btn" id="it-dl-btn">⬇ Download</button>
                <button className="it-btn-sec" id="it-copy-btn">📋 Copy</button>
                <button className="it-reset-btn" id="it-reset-btn">🔄 Reset</button>
              </div>

            </div>
          </div>{/* end workspace */}
        </div>
      </section>

      {/* FEATURES */}
      <section className="it-section" id="it-features">
        <div className="it-section-inner">
          <div className="it-section-label">✦ Capabilities</div>
          <h2 className="it-section-title">Everything You Need</h2>
          <p className="it-section-sub">Professional-grade image tools, zero cost, all running locally in your browser.</p>
          <div className="it-features-grid">
            {[
              {icon:'⤡',title:'Precision Resize',desc:'Enter exact pixel dimensions or use quick percentage shortcuts. Lock aspect ratio to prevent distortion.'},
              {icon:'▼',title:'Smart Compress',desc:'Auto, custom, or lossless modes. Target a specific file size using binary-search quality detection.'},
              {icon:'⇄',title:'Format Convert',desc:'Convert between JPEG, PNG, and WebP. WebP typically delivers 25–35% smaller files than JPEG.'},
              {icon:'✂',title:'Crop Tool',desc:'Freeform crop or snap to standard ratios — 1:1, 16:9, 9:16, 4:3. Set exact pixel coordinates.'},
              {icon:'↻',title:'Rotate & Flip',desc:'Quick 90/180/270° presets, any custom angle, and horizontal or vertical flip — all non-destructive.'},
              {icon:'◑',title:'Adjustments',desc:'Tune brightness, contrast, saturation, hue, and blur. Preview changes live, apply all at once.'},
              {icon:'©',title:'Watermark',desc:'Text or logo watermarks at any of 9 positions. Control size, color, and opacity to match your brand.'},
              {icon:'✦',title:'AI Background Remover',desc:'One-click background removal using ONNX AI, running entirely offline after one-time model download.'},
              {icon:'↩',title:'Undo & Redo',desc:'Full edit history with Ctrl+Z / Ctrl+Y. Step back to any previous state without starting over.'},
            ].map((f,i) => (
              <article className="it-feature-card" key={i}>
                <div className="it-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="it-section it-hiw" id="it-how-it-works">
        <div className="it-section-inner">
          <div className="it-section-label">◎ Process</div>
          <h2 className="it-section-title">How It Works</h2>
          <p className="it-section-sub">Four steps from raw image to polished, perfectly-sized result.</p>
          <div className="it-hiw-steps">
            {[
              {num:'01',icon:'📁',title:'Upload',desc:'Drag & drop, click to browse, or paste with Ctrl+V. JPEG, PNG, WebP, GIF, SVG up to 50MB.'},
              {num:'02',icon:'⤡',title:'Choose a Tool',desc:'Pick from 9 tools in the sidebar — Resize, Compress, Crop, BG Remove, and more.'},
              {num:'03',icon:'◑',title:'Edit & Preview',desc:'Tweak settings and click Apply. The live preview updates instantly. Undo anything with Ctrl+Z.'},
              {num:'04',icon:'⬇',title:'Download',desc:'Hit Download to get your file in JPEG, PNG, or WebP. Everything stays on your device.'},
            ].map((s,i) => (
              <div className="it-hiw-step" key={i}>
                <div className="it-step-num">{s.num}</div>
                <div className="it-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="it-section" id="it-use-cases">
        <div className="it-section-inner">
          <div className="it-section-label">◻ Applications</div>
          <h2 className="it-section-title">Who Uses Image Toolkit</h2>
          <p className="it-section-sub">From solo creators to dev teams — anyone who needs clean image output, fast.</p>
          <div className="it-cases-grid">
            {[
              {tag:'it-tag-yellow',label:'Social Media',title:'Content Creators',desc:'Hit exact platform specs every time — Instagram, YouTube, Twitter, LinkedIn — using built-in presets.'},
              {tag:'it-tag-orange',label:'E-Commerce',title:'Product Photography',desc:'Compress product images without visible loss. Remove backgrounds for clean white-bg shots instantly.'},
              {tag:'it-tag-green', label:'Design',title:'UI/UX Designers',desc:'Crop screenshots to spec, resize mockups, and watermark assets before sharing with stakeholders.'},
              {tag:'it-tag-yellow',label:'ID & Docs',title:'Passport & Visa Photos',desc:'Use ID presets (413×531 for Passport) to get correctly sized photos for official documents in seconds.'},
              {tag:'it-tag-orange',label:'Developer',title:'Web Performance',desc:'Convert PNG to WebP, dial in compression quality, and measure exact output file size before deploying.'},
              {tag:'it-tag-green', label:'Education',title:'Students & Teachers',desc:'Prepare images for presentations and reports — no software installation or account needed, ever.'},
            ].map((c,i) => (
              <article className="it-case-card" key={i}>
                <div className={`it-case-tag ${c.tag}`}>{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="it-section it-faq" id="it-faq">
        <div className="it-section-inner">
          <div style={{textAlign:'center'}}>
            <div className="it-section-label">❓ Questions</div>
            <h2 className="it-section-title">Frequently Asked</h2>
            <p className="it-section-sub" style={{margin:'0 auto'}}>Everything you need to know about Image Toolkit.</p>
          </div>
          <div className="it-faq-list">
            {[
              {q:'Is Image Toolkit completely free?',a:'Yes — free forever with no account required, no watermarks on output, and no hidden feature limits. All tools including AI background removal are available without paying anything.'},
              {q:'Does my image get uploaded to any server?',a:"Never. All processing happens inside your browser using the Canvas API and, for background removal, an ONNX model running locally. Your files never leave your device — there's no backend at all."},
              {q:'What formats can I upload and export?',a:'You can upload JPEG, PNG, WebP, GIF, and SVG files up to 50MB. You can export your edited image as JPEG, PNG, or WebP. For background removal, the output is always a transparent PNG.'},
              {q:'How does the AI background remover work?',a:'It uses the @imgly/background-removal library, which runs an AI segmentation model (ONNX format) entirely in your browser. The first time you use it, it downloads ~40MB — after that, it runs instantly on any image.'},
              {q:'Can I undo a change I made?',a:'Yes. Every edit (resize, crop, adjust, rotate, etc.) is saved to a full history stack. Press Ctrl+Z to undo and Ctrl+Y to redo. You can step back through unlimited edits without losing your work.'},
              {q:'Will resizing damage my image quality?',a:'Resizing always involves resampling, but the browser Canvas API produces clean results. For compression, use 80–90% quality for JPEG — this typically reduces file size by 40–60% with no visible quality loss.'},
            ].map((f,i) => (
              <div className="it-faq-item" key={i}>
                <button className="it-faq-q">{f.q}<span className="it-faq-arrow">⌄</span></button>
                <div className="it-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="it-footer">
        <div className="it-footer-inner">
          <div className="it-footer-logo"><span className="logo-icon">🖼</span> Image Toolkit</div>
          <p className="it-footer-sub">Resize. Compress. Edit. Free. All in your browser.</p>
          <ul className="it-footer-links">
            <li><a href="#it-tool">Editor</a></li>
            <li><a href="#it-features">Features</a></li>
            <li><a href="#it-use-cases">Use Cases</a></li>
            <li><a href="#it-faq">FAQ</a></li>
          </ul>
          <p className="it-footer-copy">Built with zero backend · 100% client-side · No tracking · Part of TooL Void</p>
        </div>
      </footer>

      {/* STICKY DOWNLOAD BAR - always visible when image loaded */}
      <div className="it-dl-bar" id="it-dl-bar">
        <div className="it-dl-bar-info">
          <span>🖼 <strong id="it-bar-dim">—</strong></span>
          <span><strong id="it-bar-size">—</strong></span>
          <span className="it-dl-bar-savings" id="it-bar-savings" style={{display:'none'}} />
        </div>
        <div className="it-dl-bar-actions">
          <button className="it-dl-bar-sec" id="it-dl-bar-reset">🔄 Reset</button>
          <button className="it-dl-bar-sec" id="it-dl-bar-copy">📋 Copy</button>
          <button className="it-dl-bar-main" id="it-dl-bar-main">⬇ Download Image</button>
        </div>
      </div>

      {/* TOAST */}
      <div className="it-toast" id="it-toast" role="status" aria-live="polite">
        <span className="it-toast-icon" id="it-toastIcon">✓</span>
        <span id="it-toastMsg">Done!</span>
      </div>
    </div>
  );
}
