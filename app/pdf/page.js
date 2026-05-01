'use client';
import { useEffect } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap');

.pdf-root *, .pdf-root *::before, .pdf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pdf-root {
  --bg: #07070D; --bg2: #0C0C15; --bg3: #11111C; --card: #0f0f1a;
  --border: rgba(255,255,255,0.06); --border-hi: rgba(255,255,255,0.12);
  --text: #EEE8E0; --text-muted: #5a556a; --text-dim: #8a8499;
  --accent: #FF9A3C; --accent-dim: rgba(255,154,60,0.1); --accent-dim2: rgba(255,154,60,0.05);
  --yellow: #FFD93D; --yellow-dim: rgba(255,217,61,0.1);
  --green: #4fffb0; --green-dim: rgba(79,255,176,0.1);
  --red: #ff6b7a; --red-dim: rgba(255,107,122,0.1);
  --blue: #4D96FF; --blue-dim: rgba(77,150,255,0.1);
  --purple: #a78bfa; --purple-dim: rgba(167,139,250,0.1);
  --shadow: 0 4px 32px rgba(0,0,0,0.6); --shadow-lg: 0 16px 64px rgba(0,0,0,0.8);
  --radius: 16px; --radius-sm: 10px; --radius-xs: 6px;
  --tr: 0.18s cubic-bezier(0.4,0,0.2,1);
  --font: 'Cabinet Grotesk', sans-serif; --mono: 'JetBrains Mono', monospace;
  font-family: var(--font); background: var(--bg); color: var(--text);
  line-height: 1.6; overflow-x: hidden; min-height: 100vh;
}
.pdf-root.light {
  --bg: #f5f1ea; --bg2: #efe7dd; --bg3: #e6dbcf; --card: #ffffff;
  --border: rgba(26,19,10,0.08); --border-hi: rgba(26,19,10,0.16);
  --text: #18120b; --text-muted: #8a7967; --text-dim: #625547;
  --accent: #e67e22; --accent-dim: rgba(230,126,34,0.12); --accent-dim2: rgba(230,126,34,0.06);
  --yellow: #c79211; --yellow-dim: rgba(199,146,17,0.1);
  --green: #0f9f6e; --green-dim: rgba(15,159,110,0.12);
  --red: #d9485f; --red-dim: rgba(217,72,95,0.1);
  --blue: #2563eb; --blue-dim: rgba(37,99,235,0.1);
  --purple: #7c3aed; --purple-dim: rgba(124,58,237,0.08);
  --shadow: 0 8px 28px rgba(25,18,11,0.08); --shadow-lg: 0 18px 60px rgba(25,18,11,0.14);
}
.pdf-root.light .p-nav { background: rgba(245,241,234,0.84); }
.pdf-root.light .p-docx-kicker { color: #2563eb; }
.pdf-root.light .p-docx-mode.active .p-docx-mode-name { color: #17336d; }
.pdf-root.light .p-docx-mode.active .p-docx-mode-copy { color: #34538e; }
.pdf-root.light .p-docx-mode.active .p-docx-list-item { color: #45608d; }
.pdf-root.light .p-docx-mode.active .p-docx-list-item b { color: #12284d; }
.pdf-root.light .p-tool-card.active .tc-name { color: #7c3b00; }
.pdf-root.light .p-tool-card.active .tc-desc { color: #9a5a20; }
.pdf-root.light .p-proc-btn { color: #2f1600; text-shadow: none; }
.pdf-root.light .p-proc-btn .spinner { border-color: rgba(47,22,0,.22); border-top-color: #2f1600; }
.pdf-root a { color: inherit; text-decoration: none; }
.pdf-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
.pdf-root ::-webkit-scrollbar { width: 5px; height: 5px; }
.pdf-root ::-webkit-scrollbar-track { background: transparent; }
.pdf-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* NAV */
.p-nav { position: sticky; top:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 2.5rem; height:60px; background:rgba(7,7,13,0.85); backdrop-filter:blur(24px) saturate(1.8); border-bottom:1px solid var(--border); }
.p-nav-logo { font-weight:900; font-size:1.1rem; letter-spacing:-0.04em; display:flex; align-items:center; gap:0.5rem; }
.p-nav-logo .li { width:28px; height:28px; background:linear-gradient(135deg,var(--accent),var(--yellow)); border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:0.8rem; }
.p-nav-links { display:flex; gap:1.5rem; list-style:none; }
.p-nav-links a { font-size:0.83rem; font-weight:500; color:var(--text-dim); transition:color var(--tr); }
.p-nav-links a:hover { color:var(--text); }
.p-nav-cta { padding:0.45rem 1.2rem; background:var(--accent); color:var(--bg); border-radius:99px; font-size:0.82rem; font-weight:700; transition:all var(--tr); }
.p-nav-cta:hover { opacity:.88; transform:translateY(-1px); box-shadow:0 0 20px rgba(255,154,60,.35); }

/* HERO */
.p-hero { position:relative; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:6rem 1.5rem 4rem; overflow:hidden; }
.p-hero-noise { position:absolute; inset:0; opacity:.025; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:200px; pointer-events:none; }
.p-hero-grid { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:48px 48px; mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%); }
.p-hero-orb { position:absolute; top:25%; left:62%; width:480px; height:480px; background:radial-gradient(circle,rgba(255,154,60,.07) 0%,transparent 70%); pointer-events:none; transform:translate(-50%,-50%); }
.p-hero-orb2 { position:absolute; top:65%; left:28%; width:320px; height:320px; background:radial-gradient(circle,rgba(255,217,61,.04) 0%,transparent 70%); pointer-events:none; }
.p-hero-c { position:relative; z-index:1; max-width:880px; }
.p-badge { display:inline-flex; align-items:center; gap:.5rem; padding:.38rem 1rem; background:var(--accent-dim); border:1px solid rgba(255,154,60,.25); border-radius:99px; font-family:var(--mono); font-size:.7rem; color:var(--accent); letter-spacing:.06em; margin-bottom:2.5rem; animation:pFU .6s ease both; }
.p-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pPulse 2s ease-in-out infinite; }
@keyframes pPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.p-hero h1 { font-size:clamp(3rem,8vw,6rem); font-weight:900; letter-spacing:-.05em; line-height:.95; margin-bottom:1.75rem; animation:pFU .7s .1s ease both; }
.p-hero h1 .hm { display:block; }
.p-hero h1 .ha { display:block; background:linear-gradient(90deg,var(--accent),var(--yellow)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.p-hero-sub { font-size:1.1rem; color:var(--text-dim); max-width:540px; margin:0 auto 3rem; line-height:1.75; animation:pFU .7s .2s ease both; }
.p-hero-acts { display:flex; align-items:center; justify-content:center; gap:1rem; flex-wrap:wrap; animation:pFU .7s .3s ease both; }
.p-btn-pri { padding:.85rem 2rem; background:linear-gradient(135deg,var(--accent),#ff7b00); color:#050200; border-radius:12px; font-weight:800; font-size:.95rem; letter-spacing:-.02em; transition:all .2s; display:inline-flex; align-items:center; gap:.5rem; box-shadow:0 0 40px rgba(255,154,60,.3); }
.p-btn-pri:hover { transform:translateY(-2px); box-shadow:0 0 60px rgba(255,154,60,.45); }
.p-btn-ghost { padding:.85rem 1.75rem; border:1px solid var(--border-hi); color:var(--text-dim); border-radius:12px; font-weight:600; font-size:.95rem; transition:all .2s; display:inline-flex; align-items:center; gap:.5rem; }
.p-btn-ghost:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }
.p-hero-stats { display:flex; justify-content:center; margin-top:5rem; animation:pFU .7s .4s ease both; border:1px solid var(--border); border-radius:16px; overflow:hidden; background:var(--card); }
.p-hstat { padding:1.4rem 2.2rem; text-align:center; border-right:1px solid var(--border); }
.p-hstat:last-child { border-right:none; }
.p-hstat-n { font-size:1.75rem; font-weight:900; color:var(--accent); letter-spacing:-.05em; line-height:1; margin-bottom:.2rem; }
.p-hstat-l { font-family:var(--mono); font-size:.65rem; color:var(--text-muted); letter-spacing:.08em; text-transform:uppercase; }
@keyframes pFU { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

/* LAYOUT */
.p-sec { padding:5rem 1.5rem; }
.p-sec-inner { max-width:1240px; margin:0 auto; }
.p-label { font-family:var(--mono); font-size:.68rem; font-weight:500; color:var(--accent); letter-spacing:.12em; text-transform:uppercase; margin-bottom:.5rem; }
.p-title { font-size:clamp(1.7rem,4vw,2.5rem); font-weight:900; letter-spacing:-.05em; line-height:1.05; margin-bottom:.65rem; }
.p-sub { font-size:.95rem; color:var(--text-dim); max-width:480px; line-height:1.7; }

/* APP SECTION */
.p-app-bg { background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }

/* TOOL CATEGORY TABS */
.p-cat-tabs { display:flex; gap:.4rem; overflow-x:auto; padding-bottom:.25rem; margin-bottom:1.5rem; scrollbar-width:none; }
.p-cat-tabs::-webkit-scrollbar { display:none; }
.p-cat-tab { display:flex; align-items:center; gap:.4rem; padding:.5rem 1.1rem; border:1px solid var(--border); border-radius:99px; font-size:.78rem; font-weight:700; color:var(--text-muted); white-space:nowrap; transition:all var(--tr); flex-shrink:0; }
.p-cat-tab:hover { border-color:var(--border-hi); color:var(--text-dim); }
.p-cat-tab.active { border-color:var(--accent); color:var(--accent); background:var(--accent-dim); }

/* TOOL GRID */
.p-tool-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:.75rem; margin-bottom:2rem; }
.p-tool-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-sm); padding:1rem; transition:all var(--tr); cursor:pointer; display:flex; flex-direction:column; gap:.45rem; color:var(--text); }
.p-tool-card:hover { border-color:rgba(255,154,60,.3); transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,.4); }
.p-tool-card.active { border-color:var(--accent); background:var(--accent-dim); }
.p-tool-card .tc-icon { font-size:1.3rem; width:36px; height:36px; background:var(--bg3); border-radius:8px; display:flex; align-items:center; justify-content:center; transition:background var(--tr); }
.p-tool-card:hover .tc-icon, .p-tool-card.active .tc-icon { background:var(--accent-dim); }
.p-tool-card .tc-name { font-size:.82rem; font-weight:700; letter-spacing:-.02em; color:var(--text); }
.p-tool-card .tc-desc { font-size:.72rem; color:var(--text-dim); line-height:1.4; }
.p-tool-card.active .tc-name { color:#fff4e8; }
.p-tool-card.active .tc-desc { color:#ffd7b0; }

/* DROP ZONE */
.p-drop { border:2px dashed var(--border-hi); border-radius:var(--radius); padding:3rem 2rem; text-align:center; transition:all var(--tr); cursor:pointer; position:relative; background:var(--accent-dim2); }
.p-drop:hover, .p-drop.drag-over { border-color:var(--accent); background:var(--accent-dim); }
.p-drop-icon { font-size:2.8rem; margin-bottom:.85rem; opacity:.5; }
.p-drop-title { font-size:1.1rem; font-weight:800; letter-spacing:-.03em; margin-bottom:.4rem; }
.p-drop-sub { font-size:.82rem; color:var(--text-muted); margin-bottom:1.25rem; }
.p-drop-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.6rem 1.4rem; background:var(--accent); color:var(--bg); border-radius:99px; font-weight:700; font-size:.83rem; transition:all var(--tr); }
.p-drop-btn:hover { opacity:.88; transform:translateY(-1px); }
.p-drop-info { margin-top:.85rem; font-family:var(--mono); font-size:.68rem; color:var(--text-muted); }
.p-drop input[type=file] { position:absolute; inset:0; opacity:0; cursor:pointer; }

/* FILE BAR */
.p-file-bar { display:flex; align-items:center; gap:1rem; padding:.85rem 1.1rem; background:var(--card); border:1px solid var(--border-hi); border-radius:var(--radius-sm); margin-bottom:1.5rem; }
.p-file-bar-icon { font-size:1.4rem; }
.p-file-bar-info { flex:1; min-width:0; }
.p-file-bar-name { font-weight:700; font-size:.9rem; letter-spacing:-.02em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.p-file-bar-meta { font-family:var(--mono); font-size:.7rem; color:var(--text-muted); margin-top:.15rem; }
.p-file-bar-change { padding:.4rem .9rem; border:1px solid var(--border-hi); border-radius:7px; font-size:.78rem; font-weight:600; color:var(--text-dim); transition:all var(--tr); }
.p-file-bar-change:hover { border-color:var(--accent); color:var(--accent); }

/* PDF PREVIEW PANEL */
.p-preview-panel { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; margin-bottom:1.5rem; }
.p-preview-header { display:flex; align-items:center; justify-content:space-between; padding:.85rem 1.1rem; border-bottom:1px solid var(--border); }
.p-preview-title { font-family:var(--mono); font-size:.7rem; font-weight:500; color:var(--text-muted); letter-spacing:.08em; text-transform:uppercase; display:flex; align-items:center; gap:.5rem; }
.p-preview-live-dot { width:7px; height:7px; border-radius:50%; background:var(--green); animation:pLive 1.5s ease-in-out infinite; }
@keyframes pLive { 0%,100%{box-shadow:0 0 0 0 rgba(79,255,176,.5)} 50%{box-shadow:0 0 0 5px rgba(79,255,176,0)} }
.p-preview-actions { display:flex; gap:.5rem; align-items:center; }
.p-preview-act-btn { padding:.3rem .75rem; border:1px solid var(--border); border-radius:5px; font-family:var(--mono); font-size:.7rem; color:var(--text-muted); transition:all var(--tr); }
.p-preview-act-btn:hover { border-color:var(--border-hi); color:var(--text-dim); }
.p-preview-act-btn.active { border-color:var(--accent); color:var(--accent); background:var(--accent-dim); }
.p-pages-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(110px,1fr)); gap:.75rem; padding:1.1rem; max-height:380px; overflow-y:auto; }
.p-page-thumb { position:relative; cursor:pointer; border-radius:8px; overflow:hidden; border:2px solid var(--border); transition:all var(--tr); background:var(--bg3); }
.p-page-thumb:hover { border-color:var(--accent); transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,0,0,.5); }
.p-page-thumb.selected { border-color:var(--accent); }
.p-page-thumb.marked-remove { border-color:var(--red); opacity:.6; }
.p-page-thumb.marked-remove::after { content:'✕'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(255,107,122,.35); font-size:2rem; font-weight:900; color:var(--red); }
.p-page-thumb canvas { width:100%; height:auto; display:block; }
.p-page-thumb .p-pg-num { position:absolute; bottom:0; left:0; right:0; text-align:center; padding:.2rem; background:rgba(0,0,0,.65); font-family:var(--mono); font-size:.62rem; color:#fff; }
.p-page-thumb .p-pg-check { position:absolute; top:4px; right:4px; width:18px; height:18px; background:var(--accent); border-radius:50%; display:none; align-items:center; justify-content:center; font-size:.6rem; color:var(--bg); font-weight:900; }
.p-page-thumb.selected .p-pg-check { display:flex; }
.p-pages-loading { padding:2rem; text-align:center; font-family:var(--mono); font-size:.78rem; color:var(--text-muted); }
.p-pages-loading .spinner { width:24px; height:24px; border:2px solid var(--border-hi); border-top-color:var(--accent); border-radius:50%; animation:pSpin .6s linear infinite; margin:0 auto .75rem; }

/* TOOL OPTIONS */
.p-opts { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:1.5rem; margin-bottom:1.5rem; }
.p-opts-title { font-family:var(--mono); font-size:.68rem; font-weight:500; color:var(--text-muted); letter-spacing:.08em; text-transform:uppercase; margin-bottom:1.1rem; }
.p-opts-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:.85rem; }
.p-opt-group { display:flex; flex-direction:column; gap:.35rem; }
.p-opt-label { font-size:.76rem; font-weight:600; color:var(--text-dim); }
.p-opt-select { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-xs); padding:.5rem .75rem; color:var(--text); font-family:var(--mono); font-size:.8rem; outline:none; transition:border-color var(--tr); width:100%; }
.p-opt-select:focus { border-color:var(--accent); }
.p-opt-input { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-xs); padding:.5rem .75rem; color:var(--text); font-family:var(--mono); font-size:.8rem; outline:none; transition:border-color var(--tr); width:100%; }
.p-opt-input:focus { border-color:var(--accent); }
.p-opt-range { accent-color:var(--accent); width:100%; }
.p-docx-shell { display:flex; flex-direction:column; gap:1rem; }
.p-docx-hero { padding:1rem 1.1rem; border:1px solid rgba(77,150,255,.18); border-radius:14px; background:linear-gradient(135deg,rgba(77,150,255,.12),rgba(255,154,60,.08)); }
.p-docx-kicker { font-family:var(--mono); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:#8ec1ff; margin-bottom:.45rem; }
.p-docx-title { font-size:1rem; font-weight:800; letter-spacing:-.03em; margin-bottom:.35rem; }
.p-docx-copy { font-size:.82rem; color:var(--text-dim); line-height:1.65; }
.p-docx-modes { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:.8rem; }
.p-docx-mode { padding:1rem; border:1px solid var(--border); border-radius:14px; background:var(--card); transition:all var(--tr); cursor:pointer; text-align:left; color:var(--text); }
.p-docx-mode:hover { border-color:rgba(77,150,255,.3); transform:translateY(-2px); }
.p-docx-mode.active { border-color:var(--blue); background:var(--blue-dim); box-shadow:0 10px 30px rgba(77,150,255,.12); }
.p-docx-mode-top { display:flex; align-items:center; justify-content:space-between; gap:.75rem; margin-bottom:.55rem; }
.p-docx-mode-name { font-size:.88rem; font-weight:800; letter-spacing:-.02em; color:var(--text); }
.p-docx-badge { padding:.26rem .55rem; border-radius:999px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); font-family:var(--mono); font-size:.62rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:.08em; }
.p-docx-mode.active .p-docx-badge { background:rgba(77,150,255,.16); border-color:rgba(77,150,255,.28); color:#a9d1ff; }
.p-docx-mode-copy { font-size:.77rem; color:var(--text-dim); line-height:1.6; margin-bottom:.7rem; }
.p-docx-list { display:flex; flex-direction:column; gap:.35rem; }
.p-docx-list-item { font-family:var(--mono); font-size:.68rem; color:var(--text-muted); display:flex; align-items:flex-start; gap:.45rem; }
.p-docx-list-item b { color:var(--text); }
.p-docx-mode.active .p-docx-mode-name { color:#edf6ff; }
.p-docx-mode.active .p-docx-mode-copy { color:#c8e0ff; }
.p-docx-mode.active .p-docx-list-item { color:#a9c7ea; }
.p-docx-mode.active .p-docx-list-item b { color:#ffffff; }
.p-docx-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:.85rem; }
.p-docx-note { padding:.85rem 1rem; border-radius:12px; background:rgba(255,255,255,.03); border:1px solid var(--border); font-size:.76rem; color:var(--text-dim); line-height:1.65; }
.p-docx-note strong { color:var(--text); }
.p-docx-note.accent { border-color:rgba(255,154,60,.24); background:rgba(255,154,60,.08); }
.p-chips { display:flex; flex-wrap:wrap; gap:.35rem; }
.p-chip { padding:.32rem .75rem; border:1px solid var(--border); border-radius:99px; font-family:var(--mono); font-size:.72rem; font-weight:500; color:var(--text-muted); transition:all var(--tr); cursor:pointer; }
.p-chip:hover { border-color:var(--border-hi); color:var(--text-dim); }
.p-chip.active { border-color:var(--accent); color:var(--accent); background:var(--accent-dim); }
.p-toggle-row { display:flex; align-items:center; gap:.55rem; }
.p-toggle { position:relative; width:34px; height:19px; }
.p-toggle input { opacity:0; width:0; height:0; }
.p-toggle-slider { position:absolute; inset:0; background:var(--bg3); border:1px solid var(--border); border-radius:99px; transition:all var(--tr); cursor:pointer; }
.p-toggle-slider::before { content:''; position:absolute; width:13px; height:13px; left:2px; top:50%; transform:translateY(-50%); background:var(--text-muted); border-radius:50%; transition:all var(--tr); }
.p-toggle input:checked+.p-toggle-slider { background:var(--accent-dim); border-color:var(--accent); }
.p-toggle input:checked+.p-toggle-slider::before { left:17px; background:var(--accent); }
.p-toggle-label { font-size:.8rem; color:var(--text-dim); }

/* REMOVE PAGES HINT */
.p-remove-hint { padding:.75rem 1rem; background:var(--red-dim); border:1px solid rgba(255,107,122,.25); border-radius:var(--radius-xs); font-family:var(--mono); font-size:.72rem; color:var(--red); margin-bottom:1rem; display:flex; align-items:center; gap:.5rem; }
.p-page-sel-info { display:flex; align-items:center; justify-content:space-between; padding:.5rem 1.1rem; border-top:1px solid var(--border); background:var(--bg3); }
.p-sel-count { font-family:var(--mono); font-size:.72rem; color:var(--text-dim); }
.p-sel-actions { display:flex; gap:.5rem; }
.p-sel-act { padding:.28rem .65rem; border:1px solid var(--border); border-radius:4px; font-family:var(--mono); font-size:.68rem; color:var(--text-muted); transition:all var(--tr); }
.p-sel-act:hover { border-color:var(--border-hi); color:var(--text-dim); }

/* PROCESS */
.p-proc { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
.p-proc-btn { padding:.85rem 1.85rem; background:linear-gradient(135deg,#ffb15f,#ff7b00); color:#2b1200; border-radius:12px; font-weight:800; font-size:.92rem; letter-spacing:-.02em; transition:all var(--tr); display:flex; align-items:center; gap:.6rem; text-shadow:none; }
.p-proc-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 0 40px rgba(255,154,60,.35); }
.p-proc-btn:disabled { opacity:.45; cursor:not-allowed; }
.p-proc-btn .spinner { width:15px; height:15px; border:2px solid rgba(43,18,0,.22); border-top-color:#2b1200; border-radius:50%; animation:pSpin .6s linear infinite; }
.p-proc-btn-label.docx { color:#8a3f00; }
.pdf-root.light .p-proc-btn-label.docx { color:#8a3f00; }
@keyframes pSpin { to{transform:rotate(360deg)} }
.p-prog-wrap { flex:1; min-width:200px; }
.p-prog-text { font-family:var(--mono); font-size:.72rem; color:var(--text-dim); margin-bottom:.35rem; }
.p-prog-bar { height:5px; background:var(--bg3); border-radius:99px; overflow:hidden; }
.p-prog-fill { height:100%; background:linear-gradient(90deg,var(--accent),var(--yellow)); border-radius:99px; transition:width .25s ease; }

/* RESULTS */
.p-results { margin-top:1.25rem; }
.p-results-title { font-family:var(--mono); font-size:.68rem; color:var(--text-muted); letter-spacing:.08em; text-transform:uppercase; margin-bottom:.85rem; }
.p-result-item { display:flex; align-items:center; gap:1rem; padding:.9rem 1.1rem; background:var(--card); border:1px solid var(--green-dim); border-radius:var(--radius-sm); margin-bottom:.5rem; }
.p-ri-icon { font-size:1.4rem; }
.p-ri-info { flex:1; min-width:0; }
.p-ri-name { font-weight:700; font-size:.88rem; letter-spacing:-.02em; }
.p-ri-meta { font-family:var(--mono); font-size:.7rem; color:var(--text-muted); margin-top:.12rem; }
.p-dl-btn { padding:.5rem 1.1rem; background:var(--accent); color:var(--bg); border-radius:8px; font-weight:700; font-size:.8rem; transition:all var(--tr); display:flex; align-items:center; gap:.4rem; white-space:nowrap; }
.p-dl-btn:hover { opacity:.88; transform:translateY(-1px); }
.p-dl-all { width:100%; padding:.8rem; background:var(--bg3); border:1px solid var(--border-hi); color:var(--text); border-radius:10px; font-weight:700; font-size:.88rem; transition:all var(--tr); display:flex; align-items:center; justify-content:center; gap:.5rem; margin-top:.6rem; }
.p-dl-all:hover { background:var(--accent-dim); border-color:var(--accent); color:var(--accent); }

/* COMPRESS STATS */
.p-cs { display:flex; gap:1rem; align-items:center; padding:1rem 1.25rem; background:var(--bg3); border-radius:var(--radius-sm); margin-top:.75rem; flex-wrap:wrap; }
.p-cs-item { text-align:center; }
.p-cs-label { font-family:var(--mono); font-size:.65rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }
.p-cs-val { font-size:1.15rem; font-weight:900; letter-spacing:-.04em; }
.p-cs-arrow { font-size:1.3rem; color:var(--text-muted); }
.p-cs-saved { background:var(--green-dim); border:1px solid rgba(79,255,176,.25); padding:.3rem .8rem; border-radius:99px; font-weight:700; font-size:.82rem; color:var(--green); }

/* ERROR */
.p-err { padding:.85rem 1rem; background:var(--red-dim); border:1px solid rgba(255,107,122,.3); border-radius:var(--radius-xs); font-family:var(--mono); font-size:.78rem; color:var(--red); margin-top:.75rem; display:flex; align-items:flex-start; gap:.5rem; }
.p-err-close { margin-left:auto; cursor:pointer; opacity:.6; }
.p-err-close:hover { opacity:1; }

/* WM PREVIEW */
.p-wm-preview { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-xs); height:180px; display:flex; align-items:center; justify-content:center; margin-top:.75rem; overflow:hidden; position:relative; }
.p-wm-text { font-size:2rem; font-weight:900; opacity:.3; pointer-events:none; user-select:none; transform:rotate(-30deg); color:var(--accent); letter-spacing:-.04em; }

/* INFO GRID */
.p-info-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:.5rem; }
.p-info-row { display:flex; justify-content:space-between; align-items:center; padding:.6rem .85rem; background:var(--bg2); border-radius:var(--radius-xs); }
.p-info-key { font-family:var(--mono); font-size:.72rem; color:var(--text-muted); }
.p-info-val { font-family:var(--mono); font-size:.75rem; color:var(--text); font-weight:500; max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* TEXT PREVIEW */
.p-text-prev { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-xs); padding:.85rem; max-height:240px; overflow-y:auto; font-family:var(--mono); font-size:.75rem; line-height:1.7; color:var(--text-dim); white-space:pre-wrap; margin-top:.75rem; }

/* REORDER */
.p-reorder-list { display:flex; flex-direction:column; gap:.4rem; max-height:320px; overflow-y:auto; }
.p-ri { display:flex; align-items:center; gap:.65rem; padding:.6rem .85rem; background:var(--card); border:1px solid var(--border); border-radius:var(--radius-xs); cursor:grab; transition:all var(--tr); }
.p-ri:hover { border-color:var(--border-hi); }
.p-ri.dragging { opacity:.35; border-color:var(--accent); }
.p-ri-handle { color:var(--text-muted); font-size:.9rem; flex-shrink:0; }
.p-ri-thumb2 { width:28px; height:36px; background:var(--bg3); border-radius:4px; overflow:hidden; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.75rem; }
.p-ri-lbl { flex:1; font-size:.8rem; font-weight:600; }
.p-ri-del { width:24px; height:24px; border-radius:4px; border:1px solid var(--border); color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-size:.7rem; transition:all var(--tr); }
.p-ri-del:hover { border-color:var(--red); color:var(--red); background:var(--red-dim); }

/* FEATURES */
.p-feat-bg { background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.p-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(245px,1fr)); gap:1.1rem; margin-top:2.5rem; }
.p-feat-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:1.6rem; transition:all var(--tr); }
.p-feat-card:hover { border-color:rgba(255,154,60,.22); transform:translateY(-3px); box-shadow:var(--shadow-lg); }
.p-feat-card h3 { font-weight:800; font-size:.95rem; letter-spacing:-.03em; margin:.85rem 0 .4rem; }
.p-feat-card p { font-size:.84rem; color:var(--text-dim); line-height:1.6; }

/* FAQ */
.p-faq-bg { background:var(--bg2); border-top:1px solid var(--border); }
.p-faq-list { max-width:700px; margin:2.5rem auto 0; display:flex; flex-direction:column; gap:.55rem; }
.p-faq-item { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-sm); overflow:hidden; transition:border-color var(--tr); }
.p-faq-item.open { border-color:rgba(255,154,60,.28); }
.p-faq-q { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.2rem; cursor:pointer; font-weight:700; font-size:.88rem; letter-spacing:-.02em; gap:1rem; }
.p-faq-q:hover { color:var(--accent); }
.p-faq-arrow { transition:transform .25s ease; font-size:.85rem; color:var(--text-muted); flex-shrink:0; }
.p-faq-item.open .p-faq-arrow { transform:rotate(180deg); color:var(--accent); }
.p-faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease,padding .3s ease; font-size:.86rem; color:var(--text-dim); line-height:1.7; }
.p-faq-item.open .p-faq-a { max-height:300px; padding:0 1.2rem 1rem; }

/* FOOTER */
.p-foot { border-top:1px solid var(--border); padding:3rem 1.5rem; text-align:center; }
.p-foot-logo { font-size:1.3rem; font-weight:900; letter-spacing:-.05em; display:inline-flex; align-items:center; gap:.5rem; margin-bottom:.5rem; }
.p-foot-logo .fli { width:26px; height:26px; background:linear-gradient(135deg,var(--accent),var(--yellow)); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:.75rem; }
.p-foot-sub { color:var(--text-muted); font-size:.83rem; margin-bottom:1.75rem; }
.p-foot-links { display:flex; justify-content:center; flex-wrap:wrap; gap:1.5rem; margin-bottom:1.75rem; list-style:none; }
.p-foot-links a { font-size:.82rem; color:var(--text-muted); transition:color var(--tr); }
.p-foot-links a:hover { color:var(--accent); }
.p-foot-copy { font-family:var(--mono); font-size:.72rem; color:var(--text-muted); }

/* TOAST */
.p-toast { position:fixed; bottom:2rem; right:2rem; z-index:999; background:var(--card); border:1px solid var(--border-hi); padding:.75rem 1.2rem; border-radius:10px; font-size:.82rem; font-family:var(--mono); box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:.55rem; transform:translateY(80px); opacity:0; transition:all .3s cubic-bezier(.4,0,.2,1); pointer-events:none; }
.p-toast.show { transform:translateY(0); opacity:1; }

/* MERGE FILE LIST */
.p-merge-list { display:flex; flex-direction:column; gap:.45rem; margin-top:.75rem; }
.p-mfile { display:flex; align-items:center; gap:.75rem; padding:.65rem .9rem; background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius-xs); }
.p-mfile-name { flex:1; font-size:.82rem; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.p-mfile-size { font-family:var(--mono); font-size:.7rem; color:var(--text-muted); flex-shrink:0; }
.p-mfile-rm { width:22px; height:22px; border-radius:4px; border:1px solid var(--border); color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-size:.7rem; transition:all var(--tr); }
.p-mfile-rm:hover { border-color:var(--red); color:var(--red); }
.p-add-more { display:flex; align-items:center; justify-content:center; gap:.5rem; padding:.65rem; border:1px dashed var(--border-hi); border-radius:var(--radius-xs); font-size:.8rem; font-weight:600; color:var(--text-muted); transition:all var(--tr); cursor:pointer; position:relative; }
.p-add-more:hover { border-color:var(--accent); color:var(--accent); }
.p-add-more input { position:absolute; inset:0; opacity:0; cursor:pointer; }

@media(max-width:768px) {
  .p-nav-links { display:none; }
  .p-sec { padding:3.5rem 1rem; }
  .p-tool-grid { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }
  .p-opts-grid { grid-template-columns:1fr 1fr; }
  .p-hero-stats { flex-direction:column; }
  .p-hstat { border-right:none; border-bottom:1px solid var(--border); }
  .p-hstat:last-child { border-bottom:none; }
  .p-pages-grid { grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); }
}
@media(max-width:480px) {
  .p-opts-grid { grid-template-columns:1fr; }
  .p-proc { flex-direction:column; align-items:stretch; }
  .p-tool-grid { grid-template-columns:repeat(3,1fr); }
}
`;

// ─── Tool definitions ───────────────────────────────────────────────────────
const TOOL_CATEGORIES = [
  {
    id: 'convert', label: '🔄 Convert', tools: [
      { id: 'to-images',  icon: '🖼️', name: 'PDF → Images',  desc: 'JPG / PNG / WEBP' },
      { id: 'to-text',    icon: '📝', name: 'PDF → Text',    desc: 'Extract all text' },
      { id: 'to-docx',    icon: '📄', name: 'PDF → Word',    desc: 'DOCX document' },
      { id: 'to-excel',   icon: '📊', name: 'PDF → Excel',   desc: 'XLSX / CSV' },
      { id: 'to-pptx',    icon: '📽️', name: 'PDF → PPT',    desc: 'PowerPoint slides' },
      { id: 'to-html',    icon: '🌐', name: 'PDF → HTML',    desc: 'Web page' },
    ]
  },
  {
    id: 'organize', label: '📋 Organize', tools: [
      { id: 'merge',        icon: '🔗', name: 'Merge PDFs',     desc: 'Combine multiple' },
      { id: 'split',        icon: '✂️', name: 'Split PDF',      desc: 'Divide into parts' },
      { id: 'remove-pages', icon: '🗑️', name: 'Remove Pages',  desc: 'Delete specific pages' },
      { id: 'extract-pages',icon: '📌', name: 'Extract Pages',  desc: 'Keep selected pages' },
      { id: 'reorder',      icon: '↕️', name: 'Reorder Pages',  desc: 'Drag to rearrange' },
    ]
  },
  {
    id: 'edit', label: '✏️ Edit', tools: [
      { id: 'compress',    icon: '🗜️', name: 'Compress',      desc: 'Reduce file size' },
      { id: 'rotate',      icon: '🔄', name: 'Rotate Pages',  desc: '90° / 180° rotation' },
      { id: 'watermark',   icon: '💧', name: 'Watermark',     desc: 'Text overlay' },
      { id: 'page-numbers',icon: '🔢', name: 'Page Numbers',  desc: 'Add numbering' },
      { id: 'metadata',    icon: '✏️', name: 'Edit Metadata', desc: 'Title, author, etc.' },
    ]
  },
  {
    id: 'security', label: '🔒 Security', tools: [
      { id: 'unlock',  icon: '🔓', name: 'Unlock PDF',  desc: 'Remove password' },
      { id: 'info',    icon: 'ℹ️', name: 'PDF Info',    desc: 'File details' },
      { id: 'img-pdf', icon: '📸', name: 'Images → PDF', desc: 'Combine images' },
    ]
  },
];

export default function PDFToolsSuite() {
  useEffect(() => {
    const root = document.getElementById('pdf-root');
    if (!root) return;
    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const G = (id) => root.querySelector('#' + id);
    // ─── State ──────────────────────────────────
    const S = {
      activeTool: 'to-images',
      file: null,        // primary single-file
      mergeFiles: [],    // for merge tool
      pdfDoc: null,      // loaded pdfjsLib doc
      pageCanvases: [],  // rendered page canvases (thumbnails)
      pagesLoaded: false,
      selectedPages: new Set(),
      markedForRemoval: new Set(),
      reorderPages: [],
      // options
      outputFormat: 'jpg', dpi: 150, quality: 85, colorMode: 'color',
      docxMode: 'replica', docxImageDpi: 144, docxImageQuality: 88,
      pageRange: 'all', customRange: '',
      splitMode: 'every', splitEvery: 1, splitRange: '',
      compressLevel: 'medium',
      rotateDeg: 90, rotateTarget: 'all',
      wmText: 'CONFIDENTIAL', wmOpacity: 0.3, wmFontSize: 48, wmColor: '#FF9A3C',
      pnPosition: 'bottom-center', pnFormat: 'Page {n}', pnStart: 1, pnFontSize: 12,
      metaTitle: '', metaAuthor: '', metaSubject: '',
      openPassword: '', currentPassword: '',
      imgPageSize: 'a4', imgFit: 'fit',
      blankBetween: false,
      // process
      processing: false, progress: 0, progressText: '',
      results: [], error: null,
    };

    // ─── Load libraries ──────────────────────────
    const loadScript = (src, globalName) => new Promise(res => {
      if (globalName && window[globalName]) { res(window[globalName]); return; }
      const existing = document.querySelector(`script[data-ps="${src}"]`);
      if (existing) {
        const w = () => { if (!globalName || window[globalName]) res(window[globalName]); else setTimeout(w, 60); };
        w(); return;
      }
      const s = document.createElement('script');
      s.src = src; s.setAttribute('data-ps', src);
      s.onload = () => res(globalName ? window[globalName] : true);
      s.onerror = () => res(null);
      document.head.appendChild(s);
    });

    let libsReady = false;
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'pdfjsLib'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', 'JSZip'),
      loadScript('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js', 'PDFLib'),
    ]).then(() => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      libsReady = true;
      renderOptions();
    });

    // ─── Helpers ─────────────────────────────────
    const fmt = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(2) + ' MB';
    function escapeXML(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;'); }

    // ─── Category Tabs ────────────────────────────
    root.querySelectorAll('.p-cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.p-cat-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderToolGrid(btn.dataset.cat);
      });
    });

    function renderToolGrid(catId) {
      const cat = TOOL_CATEGORIES.find(c => c.id === catId);
      if (!cat) return;
      const container = G('p-tool-grid');
      if (!container) return;
      container.innerHTML = cat.tools.map(t => `
        <div class="p-tool-card${S.activeTool === t.id ? ' active' : ''}" data-tool="${t.id}">
          <div class="tc-icon">${t.icon}</div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-desc">${t.desc}</div>
        </div>
      `).join('');
      container.querySelectorAll('.p-tool-card').forEach(card => {
        card.addEventListener('click', () => {
          S.activeTool = card.dataset.tool;
          container.querySelectorAll('.p-tool-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          S.results = []; S.error = null;
          renderOptions(); renderResults();
          clearError();
          G('p-app')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    // Init first category
    renderToolGrid('convert');

    // ─── Drop Zone ────────────────────────────────
    const dropZone = G('p-drop');
    const fileInput = G('p-file-input');

    dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone?.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('drag-over'); handleFiles(Array.from(e.dataTransfer.files)); });
    fileInput?.addEventListener('change', () => { handleFiles(Array.from(fileInput.files)); fileInput.value = ''; });

    // "Change file" button
    G('p-change-file')?.addEventListener('click', () => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = S.activeTool === 'img-pdf' ? 'image/*' : '.pdf,application/pdf';
      inp.multiple = (S.activeTool === 'merge' || S.activeTool === 'img-pdf');
      inp.addEventListener('change', () => handleFiles(Array.from(inp.files)));
      inp.click();
    });

    async function handleFiles(files) {
      const isMerge = S.activeTool === 'merge';
      const isImgPdf = S.activeTool === 'img-pdf';
      const pdfs = files.filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
      const imgs = files.filter(f => f.type.startsWith('image/'));

      if (isMerge) {
        if (!pdfs.length) { showError('Please upload PDF files.'); return; }
        S.mergeFiles = [...S.mergeFiles, ...pdfs];
        clearError(); renderFileMeta(); renderOptions();
        return;
      }
      if (isImgPdf) {
        if (!imgs.length) { showError('Please upload image files (JPG, PNG, WEBP).'); return; }
        S.mergeFiles = imgs;
        S.file = imgs[0];
        clearError(); renderFileMeta(); renderOptions();
        return;
      }
      if (!pdfs.length) { showError('Please upload a PDF file.'); return; }
      clearError();
      S.file = pdfs[0];
      S.pageCanvases = []; S.pagesLoaded = false;
      S.selectedPages = new Set(); S.markedForRemoval = new Set();
      S.reorderPages = [];
      S.results = []; S.error = null;
      renderFileMeta();
      showDrop(false);
      renderOptions();
      renderResults();
      await loadAndPreviewPDF(S.file);
    }

    function showDrop(show) {
      const dz = G('p-drop-wrap');
      const fb = G('p-file-bar-wrap');
      if (dz) dz.style.display = show ? 'block' : 'none';
      if (fb) fb.style.display = show ? 'none' : 'block';
    }

    function renderFileMeta() {
      const wrap = G('p-file-bar-wrap');
      if (!wrap) return;
      const isMerge = S.activeTool === 'merge';
      if (isMerge) {
        showDrop(S.mergeFiles.length === 0);
        if (!S.mergeFiles.length) return;
        wrap.innerHTML = `
          <div class="p-file-bar">
            <div class="p-file-bar-icon">📄</div>
            <div class="p-file-bar-info">
              <div class="p-file-bar-name">${S.mergeFiles.length} PDF file${S.mergeFiles.length > 1 ? 's' : ''} ready to merge</div>
              <div class="p-file-bar-meta">${S.mergeFiles.map(f => f.name).join(', ')}</div>
            </div>
            <button class="p-file-bar-change" id="p-change-file">Change</button>
          </div>
        `;
        G('p-change-file')?.addEventListener('click', () => {
          const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.pdf,application/pdf'; inp.multiple = true;
          inp.addEventListener('change', () => { S.mergeFiles = Array.from(inp.files); renderFileMeta(); renderOptions(); });
          inp.click();
        });
        return;
      }
      if (!S.file) { showDrop(true); return; }
      showDrop(false);
      wrap.innerHTML = `
        <div class="p-file-bar">
          <div class="p-file-bar-icon">📄</div>
          <div class="p-file-bar-info">
            <div class="p-file-bar-name">${S.file.name}</div>
            <div class="p-file-bar-meta">${fmt(S.file.size)} · ${S.pdfDoc ? S.pdfDoc.numPages + ' pages' : 'Loading...'}</div>
          </div>
          <button class="p-file-bar-change" id="p-change-file">Change file</button>
        </div>
      `;
      G('p-change-file')?.addEventListener('click', () => {
        const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.pdf,application/pdf';
        inp.addEventListener('change', () => handleFiles(Array.from(inp.files)));
        inp.click();
      });
    }

    // ─── Load PDF & Render Preview ────────────────
    async function loadAndPreviewPDF(file) {
      const previewPanel = G('p-preview-panel');
      if (!previewPanel) return;
      showPreviewPanel(true);
      setPreviewLoading(true);
      try {
        const ab = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: ab }).promise;
        S.pdfDoc = pdf;
        S.reorderPages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
        renderFileMeta();

        // Render all pages as thumbnails
        S.pageCanvases = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const canvas = await renderPageThumb(pdf, i, 0.35);
          S.pageCanvases.push(canvas);
        }
        S.pagesLoaded = true;
        setPreviewLoading(false);
        renderPageGrid();
        renderOptions();
      } catch (e) {
        setPreviewLoading(false);
        showPreviewPanel(false);
        showError('Could not read this PDF. It may be corrupt or heavily encrypted.');
      }
    }

    async function renderPageThumb(pdf, pageNum, scale) {
      const page = await pdf.getPage(pageNum);
      const vp = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      return canvas;
    }

    async function renderPageFull(pdf, pageNum, dpi) {
      const page = await pdf.getPage(pageNum);
      const vp = page.getViewport({ scale: dpi / 72 });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      return canvas;
    }

    function showPreviewPanel(show) {
      const panel = G('p-preview-panel');
      if (panel) panel.style.display = show ? 'block' : 'none';
    }

    function setPreviewLoading(loading) {
      const grid = G('p-pages-grid');
      if (!grid) return;
      if (loading) {
        grid.innerHTML = '<div class="p-pages-loading"><div class="spinner"></div>Rendering pages…</div>';
      }
    }

    function renderPageGrid() {
      const grid = G('p-pages-grid');
      if (!grid) return;
      const isRemove = S.activeTool === 'remove-pages';
      const isExtract = S.activeTool === 'extract-pages';
      const isReorder = S.activeTool === 'reorder';
      const isSelectable = isRemove || isExtract;

      grid.innerHTML = S.pageCanvases.map((canvas, i) => {
        const pg = i + 1;
        const isMarked = S.markedForRemoval.has(pg);
        const isSelected = S.selectedPages.has(pg);
        const cls = isMarked ? 'marked-remove' : isSelected ? 'selected' : '';
        return `
          <div class="p-page-thumb ${cls}" data-pg="${pg}">
            <div id="pthumb-${pg}"></div>
            <div class="p-pg-num">Page ${pg}</div>
            ${isSelectable ? `<div class="p-pg-check">✓</div>` : ''}
          </div>
        `;
      }).join('');

      // Inject canvases
      S.pageCanvases.forEach((canvas, i) => {
        const pg = i + 1;
        const slot = G(`pthumb-${pg}`);
        if (slot) {
          const c = canvas.cloneNode(true);
          c.style.width = '100%'; c.style.height = 'auto'; c.style.display = 'block';
          slot.appendChild(c);
        }
      });

      // Click handlers
      grid.querySelectorAll('.p-page-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const pg = parseInt(thumb.dataset.pg);
          if (isRemove) {
            if (S.markedForRemoval.has(pg)) S.markedForRemoval.delete(pg);
            else S.markedForRemoval.add(pg);
          } else if (isExtract) {
            if (S.selectedPages.has(pg)) S.selectedPages.delete(pg);
            else S.selectedPages.add(pg);
          }
          renderPageGrid();
          updateSelInfo();
        });
      });
      updateSelInfo();
    }

    function updateSelInfo() {
      const info = G('p-sel-info');
      if (!info) return;
      const isRemove = S.activeTool === 'remove-pages';
      const isExtract = S.activeTool === 'extract-pages';
      if (isRemove) {
        info.innerHTML = `<span class="p-sel-count">${S.markedForRemoval.size} pages marked for removal</span><div class="p-sel-actions"><button class="p-sel-act" id="psel-clear">Clear all</button></div>`;
        G('psel-clear')?.addEventListener('click', () => { S.markedForRemoval.clear(); renderPageGrid(); });
      } else if (isExtract) {
        info.innerHTML = `<span class="p-sel-count">${S.selectedPages.size} pages selected</span><div class="p-sel-actions"><button class="p-sel-act" id="psel-all">Select all</button><button class="p-sel-act" id="psel-clear">Clear</button></div>`;
        G('psel-all')?.addEventListener('click', () => { S.pageCanvases.forEach((_, i) => S.selectedPages.add(i + 1)); renderPageGrid(); });
        G('psel-clear')?.addEventListener('click', () => { S.selectedPages.clear(); renderPageGrid(); });
      }
    }

    // Preview action buttons
    root.querySelectorAll('.p-preview-act-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.p-preview-act-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // (Could add zoom modes here)
      });
    });

    // ─── Options Renderer ─────────────────────────
    function renderOptions() {
      const container = G('p-opts-body');
      if (!container) return;
      const t = S.activeTool;

      if (!S.file && t !== 'merge' && t !== 'img-pdf') {
        container.innerHTML = '<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-muted)">Upload a PDF above to get started.</div>';
        renderProcBtn(); return;
      }
      if (t === 'merge' && !S.mergeFiles.length) {
        container.innerHTML = renderMergeOpts();
      } else {
        container.innerHTML = renderOptsForTool(t);
      }
      attachOptListeners();
      renderProcBtn();
    }

    function renderOptsForTool(t) {
      switch (t) {
        case 'to-images': return renderConvertOpts();
        case 'to-text': return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-dim)">Extracts all text content from each page. Download as a .txt file.</div>`;
        case 'to-docx': return renderDocxOpts();
        case 'to-excel': return renderExcelOpts();
        case 'to-pptx': return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-dim)">Creates a PowerPoint presentation with one slide per PDF page containing extracted text.</div>`;
        case 'to-html': return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-dim)">Converts PDF text content to a styled HTML file you can open in any browser.</div>`;
        case 'merge': return renderMergeOpts();
        case 'split': return renderSplitOpts();
        case 'remove-pages': return renderRemoveOpts();
        case 'extract-pages': return renderExtractOpts();
        case 'reorder': return renderReorderOpts();
        case 'compress': return renderCompressOpts();
        case 'rotate': return renderRotateOpts();
        case 'watermark': return renderWmOpts();
        case 'page-numbers': return renderPNOpts();
        case 'metadata': return renderMetaOpts();
        case 'unlock': return `<div class="p-opt-group" style="max-width:280px"><label class="p-opt-label">Current Password (if any)</label><input type="password" class="p-opt-input" id="popt-pass" placeholder="Enter PDF password" value="${S.currentPassword}"></div>`;
        case 'info': return S.pdfDoc ? renderInfoOpts() : `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-muted)">Loading PDF info…</div>`;
        case 'img-pdf': return renderImgPdfOpts();
        default: return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-muted)">Options coming soon.</div>`;
      }
    }

    function renderConvertOpts() {
      return `
        <div class="p-opts-grid">
          <div class="p-opt-group"><label class="p-opt-label">Output Format</label>
            <div class="p-chips" id="pchip-fmt">
              ${['jpg','png','webp'].map(f=>`<button class="p-chip${S.outputFormat===f?' active':''}" data-fmt="${f}">${f.toUpperCase()}</button>`).join('')}
            </div></div>
          <div class="p-opt-group"><label class="p-opt-label">DPI: <span id="pdpi-val">${S.dpi}</span></label>
            <input type="range" class="p-opt-range" id="popt-dpi" min="72" max="300" step="6" value="${S.dpi}"></div>
          <div class="p-opt-group"><label class="p-opt-label">Quality: <span id="pq-val">${S.quality}</span>%</label>
            <input type="range" class="p-opt-range" id="popt-quality" min="10" max="100" step="5" value="${S.quality}"></div>
          <div class="p-opt-group"><label class="p-opt-label">Color Mode</label>
            <select class="p-opt-select" id="popt-color">
              <option value="color"${S.colorMode==='color'?' selected':''}>Color</option>
              <option value="grayscale"${S.colorMode==='grayscale'?' selected':''}>Grayscale</option>
            </select></div>
          <div class="p-opt-group"><label class="p-opt-label">Page Range</label>
            <select class="p-opt-select" id="popt-prange">
              <option value="all">All Pages</option>
              <option value="first">First Page Only</option>
              <option value="last">Last Page Only</option>
              <option value="custom">Custom (e.g. 1,3,5-8)</option>
            </select></div>
          ${S.pageRange==='custom'?`<div class="p-opt-group"><label class="p-opt-label">Range</label><input type="text" class="p-opt-input" id="popt-customrange" placeholder="1,3,5-8" value="${S.customRange}"></div>`:''}
        </div>`;
    }

    function renderDocxOpts() {
      return `
        <div class="p-docx-shell">
          <div class="p-docx-hero">
            <div class="p-docx-kicker">PDF to Word</div>
            <div class="p-docx-title">Choose the kind of Word output you want</div>
            <div class="p-docx-copy">` +
              (S.docxMode === 'replica'
                ? `Best for keeping the PDF looking almost identical inside Word, including images, spacing, and visual layout.`
                : `Best for getting editable text with paragraph flow, font-size hints, and basic alignment reconstructed from the PDF.`) +
            `</div>
          </div>

          <div class="p-docx-modes">
            <button class="p-docx-mode${S.docxMode==='replica'?' active':''}" data-docxmode="replica">
              <div class="p-docx-mode-top">
                <div class="p-docx-mode-name">Visual Match</div>
                <div class="p-docx-badge">Best quality</div>
              </div>
              <div class="p-docx-mode-copy">Creates a DOCX with high-fidelity page visuals so fonts, pictures, spacing, and page composition stay very close to the original PDF.</div>
              <div class="p-docx-list">
                <div class="p-docx-list-item">✓ <b>Preserves:</b> layout, images, font appearance, spacing</div>
                <div class="p-docx-list-item">✓ <b>Great for:</b> resumes, brochures, invoices, designed PDFs</div>
                <div class="p-docx-list-item">• <b>Tradeoff:</b> content looks excellent but behaves more like placed pages than fully reflowed text</div>
              </div>
            </button>

            <button class="p-docx-mode${S.docxMode==='editable'?' active':''}" data-docxmode="editable">
              <div class="p-docx-mode-top">
                <div class="p-docx-mode-name">Editable Text</div>
                <div class="p-docx-badge">Smart rebuild</div>
              </div>
              <div class="p-docx-mode-copy">Reconstructs lines, paragraphs, rough alignment, and font-size cues into an editable Word document for easier content updates.</div>
              <div class="p-docx-list">
                <div class="p-docx-list-item">✓ <b>Preserves:</b> text, paragraph flow, size hierarchy, some emphasis</div>
                <div class="p-docx-list-item">✓ <b>Great for:</b> articles, contracts, reports, text-heavy PDFs</div>
                <div class="p-docx-list-item">• <b>Tradeoff:</b> complex multi-column or design-heavy pages may shift</div>
              </div>
            </button>
          </div>

          <div class="p-docx-grid">
            <div class="p-opt-group">
              <label class="p-opt-label">Render DPI: <span id="pdocx-dpi-val">${S.docxImageDpi}</span></label>
              <input type="range" class="p-opt-range" id="popt-docxdpi" min="96" max="220" step="4" value="${S.docxImageDpi}">
            </div>
            <div class="p-opt-group">
              <label class="p-opt-label">Image Quality: <span id="pdocx-q-val">${S.docxImageQuality}</span>%</label>
              <input type="range" class="p-opt-range" id="popt-docxquality" min="55" max="98" step="1" value="${S.docxImageQuality}">
            </div>
          </div>

          <div class="p-docx-note accent"><strong>Pro tip:</strong> For "same to same" looking output, use <strong>Visual Match</strong>. For a document you want to edit line-by-line in Word, switch to <strong>Editable Text</strong>.</div>
          <div class="p-docx-note"><strong>Reality check:</strong> Browser-only conversion can get very close, but Adobe/iLovePDF-grade fully editable layout reconstruction is still a server-side problem. This tool now prioritizes either near-original appearance or strong editability, depending on the mode you choose.</div>
        </div>`;
    }

    function renderExcelOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Output Format</label>
          <div class="p-chips" id="pchip-excelfmt">
            ${['csv','xlsx'].map(f=>`<button class="p-chip${S.outputFormat===f?' active':''}" data-excelfmt="${f}">${f.toUpperCase()}</button>`).join('')}
          </div></div>
        <div class="p-opt-group"><label class="p-opt-label">Note</label>
          <div style="font-family:var(--mono);font-size:.72rem;color:var(--text-muted);line-height:1.6">Extracts text lines into rows. Works best on PDFs with tabular data.</div></div>
      </div>`;
    }

    function renderMergeOpts() {
      return `
        <div style="font-family:var(--mono);font-size:.72rem;color:var(--text-muted);margin-bottom:.75rem">Upload multiple PDFs below. They will be merged in order.</div>
        <div class="p-merge-list" id="p-merge-list">
          ${S.mergeFiles.map((f,i)=>`
            <div class="p-mfile" data-mi="${i}">
              <span style="font-size:.9rem">📄</span>
              <span class="p-mfile-name">${f.name}</span>
              <span class="p-mfile-size">${fmt(f.size)}</span>
              <button class="p-mfile-rm" data-mi="${i}">✕</button>
            </div>`).join('')}
        </div>
        <div class="p-add-more" style="margin-top:.5rem">
          <input type="file" accept=".pdf,application/pdf" multiple id="p-merge-add">
          <span>+ Add more PDFs</span>
        </div>
        <div style="margin-top:.75rem" class="p-toggle-row">
          <label class="p-toggle"><input type="checkbox" id="popt-blank"${S.blankBetween?' checked':''}><span class="p-toggle-slider"></span></label>
          <span class="p-toggle-label">Add blank page between PDFs</span>
        </div>`;
    }

    function renderSplitOpts() {
      return `
        <div class="p-chips" id="pchip-splitmode" style="margin-bottom:.85rem">
          ${[['every','Every N Pages'],['each','Each Page Separately'],['range','Custom Ranges'],['extract','Extract Range']].map(([v,l])=>
            `<button class="p-chip${S.splitMode===v?' active':''}" data-splitmode="${v}">${l}</button>`).join('')}
        </div>
        ${S.splitMode==='every'?`<div class="p-opt-group" style="max-width:180px"><label class="p-opt-label">Split every N pages</label><input type="number" class="p-opt-input" id="popt-splitn" min="1" value="${S.splitEvery}" placeholder="1"></div>`:''}
        ${(S.splitMode==='range'||S.splitMode==='extract')?`<div class="p-opt-group" style="max-width:300px"><label class="p-opt-label">${S.splitMode==='extract'?'Keep pages':'Ranges (e.g. 1-5,6-10)'}</label><input type="text" class="p-opt-input" id="popt-splitrange" placeholder="${S.splitMode==='extract'?'2-6':'1-5,6-10'}" value="${S.splitRange}"></div>`:''}`;
    }

    function renderRemoveOpts() {
      return `<div class="p-remove-hint">⚠ Click pages in the preview above to mark them for removal.</div>
        <div style="font-family:var(--mono);font-size:.75rem;color:var(--text-dim)">
          ${S.pdfDoc?`${S.pdfDoc.numPages} total pages · ${S.markedForRemoval.size} marked for removal`:'Upload a PDF to begin.'}
        </div>`;
    }

    function renderExtractOpts() {
      return `<div style="font-family:var(--mono);font-size:.75rem;color:var(--text-dim)">
        Click pages in the preview above to select which pages to keep.<br>
        A new PDF will be created with only the selected pages.<br>
        ${S.selectedPages.size?`<span style="color:var(--green)">${S.selectedPages.size} pages selected.</span>`:''}
      </div>`;
    }

    function renderReorderOpts() {
      if (!S.pagesLoaded) return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--text-muted)">Loading pages…</div>`;
      return `
        <div style="font-family:var(--mono);font-size:.72rem;color:var(--text-muted);margin-bottom:.65rem">Drag rows to reorder. Click ✕ to delete a page.</div>
        <div class="p-reorder-list" id="p-reorder-list">
          ${S.reorderPages.map((pg,idx)=>`
            <div class="p-ri" draggable="true" data-idx="${idx}" data-pg="${pg}">
              <span class="p-ri-handle">⠿</span>
              <div class="p-ri-thumb2" id="prithumb-${idx}"></div>
              <span class="p-ri-lbl">Page ${pg}</span>
              <button class="p-ri-del" data-idx="${idx}">✕</button>
            </div>`).join('')}
        </div>`;
    }

    function renderCompressOpts() {
      return `
        <div class="p-opts-grid">
          <div class="p-opt-group"><label class="p-opt-label">Compression Level</label>
            <div class="p-chips" id="pchip-compress">
              ${[['low','Low (Best Quality)'],['medium','Medium'],['high','High (Smallest)']].map(([v,l])=>
                `<button class="p-chip${S.compressLevel===v?' active':''}" data-compress="${v}">${l}</button>`).join('')}
            </div></div>
          <div class="p-opt-group">
            <label class="p-opt-label">Image Quality: <span id="pcq-val">${S.quality}</span>%</label>
            <input type="range" class="p-opt-range" id="popt-cquality" min="10" max="100" step="5" value="${S.quality}">
          </div>
        </div>`;
    }

    function renderRotateOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Rotation</label>
          <div class="p-chips" id="pchip-rotate">
            ${[['90','↻ 90° Right'],['-90','↺ 90° Left'],['180','↕ 180°']].map(([v,l])=>
              `<button class="p-chip${S.rotateDeg==v?' active':''}" data-rotate="${v}">${l}</button>`).join('')}
          </div></div>
        <div class="p-opt-group"><label class="p-opt-label">Apply To</label>
          <div class="p-chips" id="pchip-rotatetgt">
            ${[['all','All Pages'],['odd','Odd Pages'],['even','Even Pages']].map(([v,l])=>
              `<button class="p-chip${S.rotateTarget===v?' active':''}" data-rotatetgt="${v}">${l}</button>`).join('')}
          </div></div>
      </div>`;
    }

    function renderWmOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Watermark Text</label>
          <input type="text" class="p-opt-input" id="popt-wmtext" value="${S.wmText}" placeholder="CONFIDENTIAL"></div>
        <div class="p-opt-group"><label class="p-opt-label">Font Size: <span id="pwms-val">${S.wmFontSize}</span>px</label>
          <input type="range" class="p-opt-range" id="popt-wmsize" min="12" max="120" step="4" value="${S.wmFontSize}"></div>
        <div class="p-opt-group"><label class="p-opt-label">Opacity: <span id="pwmo-val">${Math.round(S.wmOpacity*100)}</span>%</label>
          <input type="range" class="p-opt-range" id="popt-wmopacity" min="5" max="80" step="5" value="${Math.round(S.wmOpacity*100)}"></div>
        <div class="p-opt-group"><label class="p-opt-label">Color</label>
          <input type="color" id="popt-wmcolor" value="${S.wmColor}" style="height:36px;width:80px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;padding:2px;"></div>
      </div>
      <div class="p-wm-preview">
        <div class="p-wm-text" id="pwm-prev" style="opacity:${S.wmOpacity};font-size:${S.wmFontSize*.5}px;color:${S.wmColor}">${S.wmText}</div>
      </div>`;
    }

    function renderPNOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Position</label>
          <select class="p-opt-select" id="popt-pnpos">
            ${[['bottom-center','Bottom Center'],['bottom-right','Bottom Right'],['bottom-left','Bottom Left'],['top-center','Top Center'],['top-right','Top Right']].map(([v,l])=>
              `<option value="${v}"${S.pnPosition===v?' selected':''}>${l}</option>`).join('')}
          </select></div>
        <div class="p-opt-group"><label class="p-opt-label">Format</label>
          <select class="p-opt-select" id="popt-pnfmt">
            ${[['{n}','1, 2, 3…'],['Page {n}','Page 1, Page 2…'],['- {n} -','- 1 -, - 2 -…']].map(([v,l])=>
              `<option value="${v}"${S.pnFormat===v?' selected':''}>${l}</option>`).join('')}
          </select></div>
        <div class="p-opt-group"><label class="p-opt-label">Starting #</label>
          <input type="number" class="p-opt-input" id="popt-pnstart" min="1" value="${S.pnStart}"></div>
        <div class="p-opt-group"><label class="p-opt-label">Font Size: <span id="ppnfs-val">${S.pnFontSize}</span>px</label>
          <input type="range" class="p-opt-range" id="popt-pnfontsize" min="8" max="24" step="2" value="${S.pnFontSize}"></div>
      </div>`;
    }

    function renderMetaOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Title</label>
          <input type="text" class="p-opt-input" id="popt-mtitle" placeholder="Document title" value="${S.metaTitle}"></div>
        <div class="p-opt-group"><label class="p-opt-label">Author</label>
          <input type="text" class="p-opt-input" id="popt-mauthor" placeholder="Author name" value="${S.metaAuthor}"></div>
        <div class="p-opt-group"><label class="p-opt-label">Subject</label>
          <input type="text" class="p-opt-input" id="popt-msubj" placeholder="Subject" value="${S.metaSubject}"></div>
      </div>`;
    }

    function renderInfoOpts() {
      const pdf = S.pdfDoc;
      return `<div class="p-info-grid">
        <div class="p-info-row"><span class="p-info-key">File Name</span><span class="p-info-val">${S.file?.name||'—'}</span></div>
        <div class="p-info-row"><span class="p-info-key">File Size</span><span class="p-info-val">${S.file?fmt(S.file.size):'—'}</span></div>
        <div class="p-info-row"><span class="p-info-key">Total Pages</span><span class="p-info-val">${pdf.numPages}</span></div>
        <div class="p-info-row"><span class="p-info-key">PDF Version</span><span class="p-info-val">${pdf._pdfInfo?.PDFFormatVersion||'N/A'}</span></div>
        <div class="p-info-row"><span class="p-info-key">Encrypted</span><span class="p-info-val">${pdf._pdfInfo?.IsACroForm?'Yes':'No'}</span></div>
      </div>`;
    }

    function renderImgPdfOpts() {
      return `<div class="p-opts-grid">
        <div class="p-opt-group"><label class="p-opt-label">Page Size</label>
          <select class="p-opt-select" id="popt-imgsize">
            <option value="a4">A4</option><option value="letter">Letter</option><option value="fit">Fit to Image</option>
          </select></div>
        <div class="p-opt-group"><label class="p-opt-label">Image Fit</label>
          <select class="p-opt-select" id="popt-imgfit">
            <option value="fit">Fit (keep ratio)</option><option value="fill">Fill Page</option><option value="center">Center (original)</option>
          </select></div>
      </div>
      ${S.mergeFiles.length?`<div style="margin-top:.75rem;font-family:var(--mono);font-size:.72rem;color:var(--text-muted)">${S.mergeFiles.length} image${S.mergeFiles.length>1?'s':''} ready: ${S.mergeFiles.map(f=>f.name).join(', ')}</div>`:''}`;
    }

    function renderProcBtn() {
      const container = G('p-proc-wrap');
      if (!container) return;
      const t = S.activeTool;
      const disabled = S.processing ||
        (t === 'merge' && S.mergeFiles.length < 2) ||
        (t === 'img-pdf' && !S.mergeFiles.length) ||
        (!S.file && t !== 'merge' && t !== 'img-pdf') ||
        (t === 'info');

      const labels = {
        'to-images':'🖼️ Convert to Images','to-text':'📝 Extract Text','to-docx':'📄 Convert to DOCX',
        'to-excel':'📊 Convert to Excel','to-pptx':'📽️ Convert to PPT','to-html':'🌐 Convert to HTML',
        'merge':'🔗 Merge PDFs','split':'✂️ Split PDF','remove-pages':'🗑️ Remove Pages',
        'extract-pages':'📌 Extract Pages','reorder':'↕️ Apply Reorder',
        'compress':'🗜️ Compress PDF','rotate':'🔄 Rotate Pages','watermark':'💧 Add Watermark',
        'page-numbers':'🔢 Add Page Numbers','metadata':'✏️ Update Metadata',
        'unlock':'🔓 Unlock PDF','img-pdf':'📄 Create PDF',
      };
      const idleLabel = labels[t] || '⚡ Process';
      const idleLabelMarkup = t === 'to-docx'
        ? `<span class="p-proc-btn-label docx">${idleLabel}</span>`
        : idleLabel;

      if (t === 'info') { container.innerHTML = ''; return; }

      container.innerHTML = `
        <div class="p-proc">
          <button class="p-proc-btn" id="p-proc-btn" ${disabled?'disabled':''}>
            ${S.processing?'<span class="spinner"></span> Processing…':idleLabelMarkup}
          </button>
          <div class="p-prog-wrap" id="p-prog-wrap" style="display:${S.processing?'block':'none'}">
            <div class="p-prog-text" id="p-prog-text">${S.progressText}</div>
            <div class="p-prog-bar"><div class="p-prog-fill" id="p-prog-fill" style="width:${S.progress}%"></div></div>
          </div>
        </div>
      `;
      G('p-proc-btn')?.addEventListener('click', handleProcess);
    }

    function attachOptListeners() {
      const on = (id, ev, fn) => { const el = G(id); if (el) el.addEventListener(ev, fn); };
      // Format chips
      root.querySelectorAll('[data-fmt]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-fmt]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.outputFormat=btn.dataset.fmt;}));
      root.querySelectorAll('[data-excelfmt]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-excelfmt]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.outputFormat=btn.dataset.excelfmt;}));
      root.querySelectorAll('[data-docxmode]').forEach(btn=>btn.addEventListener('click',()=>{S.docxMode=btn.dataset.docxmode;renderOptions();}));
      on('popt-docxdpi','input',e=>{S.docxImageDpi=parseInt(e.target.value);const v=G('pdocx-dpi-val');if(v)v.textContent=S.docxImageDpi;});
      on('popt-docxquality','input',e=>{S.docxImageQuality=parseInt(e.target.value);const v=G('pdocx-q-val');if(v)v.textContent=S.docxImageQuality;});
      on('popt-dpi','input',e=>{S.dpi=parseInt(e.target.value);const v=G('pdpi-val');if(v)v.textContent=S.dpi;});
      on('popt-quality','input',e=>{S.quality=parseInt(e.target.value);const v=G('pq-val');if(v)v.textContent=S.quality;});
      on('popt-color','change',e=>S.colorMode=e.target.value);
      on('popt-prange','change',e=>{S.pageRange=e.target.value;renderOptions();});
      on('popt-customrange','input',e=>S.customRange=e.target.value);
      // Compress
      root.querySelectorAll('[data-compress]').forEach(btn=>btn.addEventListener('click',()=>{
        root.querySelectorAll('[data-compress]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.compressLevel=btn.dataset.compress;
        const qMap={low:85,medium:60,high:30};S.quality=qMap[S.compressLevel];
        const r=G('popt-cquality');if(r)r.value=S.quality;const v=G('pcq-val');if(v)v.textContent=S.quality;
      }));
      on('popt-cquality','input',e=>{S.quality=parseInt(e.target.value);const v=G('pcq-val');if(v)v.textContent=S.quality;});
      // Split
      root.querySelectorAll('[data-splitmode]').forEach(btn=>btn.addEventListener('click',()=>{
        root.querySelectorAll('[data-splitmode]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.splitMode=btn.dataset.splitmode;renderOptions();
      }));
      on('popt-splitn','input',e=>S.splitEvery=parseInt(e.target.value)||1);
      on('popt-splitrange','input',e=>S.splitRange=e.target.value);
      // Rotate
      root.querySelectorAll('[data-rotate]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-rotate]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.rotateDeg=parseInt(btn.dataset.rotate);}));
      root.querySelectorAll('[data-rotatetgt]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-rotatetgt]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');S.rotateTarget=btn.dataset.rotatetgt;}));
      // Watermark
      on('popt-wmtext','input',e=>{S.wmText=e.target.value;const p=G('pwm-prev');if(p)p.textContent=S.wmText;});
      on('popt-wmsize','input',e=>{S.wmFontSize=parseInt(e.target.value);const v=G('pwms-val');if(v)v.textContent=S.wmFontSize;const p=G('pwm-prev');if(p)p.style.fontSize=(S.wmFontSize*.5)+'px';});
      on('popt-wmopacity','input',e=>{S.wmOpacity=parseInt(e.target.value)/100;const v=G('pwmo-val');if(v)v.textContent=parseInt(e.target.value);const p=G('pwm-prev');if(p)p.style.opacity=S.wmOpacity;});
      on('popt-wmcolor','input',e=>{S.wmColor=e.target.value;const p=G('pwm-prev');if(p)p.style.color=S.wmColor;});
      // Page numbers
      on('popt-pnpos','change',e=>S.pnPosition=e.target.value);
      on('popt-pnfmt','change',e=>S.pnFormat=e.target.value);
      on('popt-pnstart','input',e=>S.pnStart=parseInt(e.target.value)||1);
      on('popt-pnfontsize','input',e=>{S.pnFontSize=parseInt(e.target.value);const v=G('ppnfs-val');if(v)v.textContent=S.pnFontSize;});
      // Meta
      on('popt-mtitle','input',e=>S.metaTitle=e.target.value);
      on('popt-mauthor','input',e=>S.metaAuthor=e.target.value);
      on('popt-msubj','input',e=>S.metaSubject=e.target.value);
      // Unlock
      on('popt-pass','input',e=>S.currentPassword=e.target.value);
      // Merge add more
      on('p-merge-add','change',e=>{
        const files = Array.from(e.target.files).filter(f=>f.type==='application/pdf'||f.name.endsWith('.pdf'));
        S.mergeFiles=[...S.mergeFiles,...files];renderOptions();
      });
      // Merge remove buttons
      root.querySelectorAll('.p-mfile-rm').forEach(btn=>btn.addEventListener('click',()=>{
        S.mergeFiles.splice(parseInt(btn.dataset.mi),1);renderOptions();
      }));
      on('popt-blank','change',e=>S.blankBetween=e.target.checked);
      // Img-pdf
      on('popt-imgsize','change',e=>S.imgPageSize=e.target.value);
      on('popt-imgfit','change',e=>S.imgFit=e.target.value);
      // Reorder drag
      const rlist = G('p-reorder-list');
      if (rlist) {
        // Inject thumbnails
        S.reorderPages.forEach((pg, idx) => {
          const slot = G(`prithumb-${idx}`);
          const canvas = S.pageCanvases[pg-1];
          if (slot && canvas) {
            const c = canvas.cloneNode(true);
            c.style.width='100%'; c.style.height='100%'; c.style.objectFit='cover';
            slot.appendChild(c);
          }
        });
        let dragIdx = null;
        rlist.querySelectorAll('.p-ri').forEach(item=>{
          item.addEventListener('dragstart',()=>{dragIdx=parseInt(item.dataset.idx);item.classList.add('dragging');});
          item.addEventListener('dragend',()=>item.classList.remove('dragging'));
          item.addEventListener('dragover',e=>e.preventDefault());
          item.addEventListener('drop',()=>{
            const di=parseInt(item.dataset.idx);
            if(dragIdx===null||dragIdx===di)return;
            const p=[...S.reorderPages];const[mv]=p.splice(dragIdx,1);p.splice(di,0,mv);
            S.reorderPages=p;renderOptions();
          });
        });
        rlist.querySelectorAll('.p-ri-del').forEach(btn=>btn.addEventListener('click',()=>{
          S.reorderPages.splice(parseInt(btn.dataset.idx),1);renderOptions();
        }));
      }
    }

    // ─── Process Handler ──────────────────────────
    async function handleProcess() {
      clearError(); S.results = []; renderResults();
      S.processing = true; S.progress = 0; S.progressText = '';
      renderProcBtn();
      try {
        switch (S.activeTool) {
          case 'to-images':      await processToImages(); break;
          case 'to-text':        await processToText(); break;
          case 'to-docx':        await processToDocx(); break;
          case 'to-excel':       await processToExcel(); break;
          case 'to-pptx':        await processToPPTX(); break;
          case 'to-html':        await processToHTML(); break;
          case 'merge':          await processMerge(); break;
          case 'split':          await processSplit(); break;
          case 'remove-pages':   await processRemovePages(); break;
          case 'extract-pages':  await processExtractPages(); break;
          case 'reorder':        await processReorder(); break;
          case 'compress':       await processCompress(); break;
          case 'rotate':         await processRotate(); break;
          case 'watermark':      await processWatermark(); break;
          case 'page-numbers':   await processPageNumbers(); break;
          case 'metadata':       await processMetadata(); break;
          case 'unlock':         await processUnlock(); break;
          case 'img-pdf':        await processImgToPDF(); break;
          default: showError('Tool not yet implemented.');
        }
      } catch(e) {
        showError(e.message || 'Processing failed. Please try again.');
      }
      S.processing = false; S.progress = 100;
      renderProcBtn(); renderResults();
    }

    // ─── Utility functions ────────────────────────
    async function loadPDFLib(file) {
      if (!window.PDFLib) throw new Error('pdf-lib not loaded. Please wait a moment and retry.');
      const bytes = await file.arrayBuffer();
      return PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
    }

    function parseRange(str, maxN) {
      const pages = new Set();
      str.split(',').forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
          const [a,b] = part.split('-').map(Number);
          for (let i = Math.max(1,a); i <= Math.min(maxN,b); i++) pages.add(i);
        } else { const n = parseInt(part); if (n>=1&&n<=maxN) pages.add(n); }
      });
      return [...pages].sort((a,b)=>a-b);
    }

    function getPageList() {
      const n = S.pdfDoc.numPages;
      if (S.pageRange==='all') return Array.from({length:n},(_,i)=>i+1);
      if (S.pageRange==='first') return [1];
      if (S.pageRange==='last') return [n];
      if (S.pageRange==='custom') return parseRange(S.customRange, n);
      return Array.from({length:n},(_,i)=>i+1);
    }

    function applyGrayscale(canvas) {
      const ctx = canvas.getContext('2d');
      const id = ctx.getImageData(0,0,canvas.width,canvas.height);
      for (let i=0;i<id.data.length;i+=4) { const g=.299*id.data[i]+.587*id.data[i+1]+.114*id.data[i+2]; id.data[i]=id.data[i+1]=id.data[i+2]=g; }
      ctx.putImageData(id,0,0);
    }

    function canvasToBlob(canvas, fmt, quality) {
      return new Promise(res => canvas.toBlob(res, fmt==='png'?'image/png':fmt==='webp'?'image/webp':'image/jpeg', quality/100));
    }

    function setProgress(p, t) {
      S.progress=p; S.progressText=t;
      const fill=G('p-prog-fill'); if(fill) fill.style.width=p+'%';
      const txt=G('p-prog-text'); if(txt) txt.textContent=t;
      const wrap=G('p-prog-wrap'); if(wrap) wrap.style.display='block';
    }

    function addResult(url, name, size, icon, extra) {
      S.results.push({url, name, size, icon, extra});
    }

    async function zipAndResult(items, zipName, icon) {
      const JSZip = window.JSZip;
      if (!JSZip) { items.forEach(r=>addResult(r.url,r.name,r.size,icon)); return; }
      setProgress(92,'Creating ZIP…');
      const zip = new JSZip();
      for (const r of items) {
        const resp = await fetch(r.url); const blob = await resp.blob();
        zip.file(r.name, blob); URL.revokeObjectURL(r.url);
      }
      const zipBlob = await zip.generateAsync({type:'blob',compression:'DEFLATE'});
      addResult(URL.createObjectURL(zipBlob), zipName, zipBlob.size, '📦');
    }

    function blobURL(data, type) { return URL.createObjectURL(new Blob([data],{type})); }

    function pxToEmu(px) { return Math.round(px * 9525); }
    function ptToTwips(pt) { return Math.round(pt * 20); }
    function twipsToEmu(twips) { return Math.round(twips * 635); }
    function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
    function escapeAttr(s) { return escapeXML(s).replace(/"/g, '&quot;'); }

    function buildDocxPackage({ documentXml, documentRels, extraFiles = [], contentTypesExtra = '', title = 'Converted Document' }) {
      const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
${contentTypesExtra}
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

      const relsMain = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

      const appXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
<Application>TooL Void PDF Suite</Application>
<DocSecurity>0</DocSecurity>
<ScaleCrop>false</ScaleCrop>
<Company>TooL Void</Company>
<LinksUpToDate>false</LinksUpToDate>
<SharedDoc>false</SharedDoc>
<HyperlinksChanged>false</HyperlinksChanged>
<AppVersion>1.0</AppVersion>
</Properties>`;

      const now = new Date().toISOString();
      const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${escapeXML(title)}</dc:title>
<dc:creator>TooL Void PDF Suite</dc:creator>
<cp:lastModifiedBy>TooL Void PDF Suite</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
<dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;

      const zip = new window.JSZip();
      zip.file('[Content_Types].xml', contentTypes);
      zip.file('_rels/.rels', relsMain);
      zip.file('docProps/app.xml', appXml);
      zip.file('docProps/core.xml', coreXml);
      zip.file('word/document.xml', documentXml);
      zip.file('word/_rels/document.xml.rels', documentRels);
      for (const file of extraFiles) zip.file(file.path, file.data);
      return zip;
    }

    async function extractDocxPageData(page) {
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const styles = content.styles || {};
      const items = content.items
        .filter(item => typeof item.str === 'string' && (item.str.trim() || item.hasEOL))
        .map(item => {
          const style = styles[item.fontName] || {};
          const fontMeta = `${item.fontName || ''} ${style.fontFamily || ''}`;
          const fontSize = Math.max(
            8,
            Math.hypot(item.transform[2], item.transform[3]) ||
            Math.hypot(item.transform[0], item.transform[1]) ||
            12
          );
          return {
            text: item.str || '',
            x: item.transform[4],
            y: item.transform[5],
            width: item.width || Math.max(fontSize * 0.45 * Math.max((item.str || '').length, 1), fontSize * 0.6),
            fontSize,
            fontFamily: style.fontFamily || item.fontName || 'Calibri',
            bold: /bold|black|heavy|semibold|demi/i.test(fontMeta),
            italic: /italic|oblique/i.test(fontMeta),
          };
        })
        .sort((a, b) => Math.abs(a.y - b.y) > 2 ? b.y - a.y : a.x - b.x);

      const lines = [];
      for (const item of items) {
        const threshold = Math.max(3, item.fontSize * 0.35);
        let line = lines.find(entry => Math.abs(entry.y - item.y) <= threshold);
        if (!line) {
          line = { y: item.y, items: [] };
          lines.push(line);
        }
        line.items.push(item);
      }

      const structuredLines = lines
        .sort((a, b) => b.y - a.y)
        .map(line => {
          const ordered = line.items.sort((a, b) => a.x - b.x);
          const left = ordered[0]?.x || 0;
          const right = ordered.reduce((max, item) => Math.max(max, item.x + item.width), 0);
          const center = (left + right) / 2;
          let align = 'left';
          if (Math.abs(center - viewport.width / 2) < viewport.width * 0.12 && left > viewport.width * 0.08 && right < viewport.width * 0.92) align = 'center';
          else if ((viewport.width - right) < viewport.width * 0.08 && left > viewport.width * 0.32) align = 'right';

          const runs = [];
          let cursor = ordered[0]?.x || 0;
          for (const item of ordered) {
            const gap = item.x - cursor;
            const pad = gap > Math.max(item.fontSize * 0.55, 8)
              ? ' '.repeat(Math.min(8, Math.round(gap / Math.max(item.fontSize * 0.28, 3))))
              : '';
            const text = (pad + item.text).replace(/\s+/g, ' ');
            cursor = item.x + item.width;
            if (!text.trim() && !pad) continue;
            const prev = runs[runs.length - 1];
            if (prev && prev.bold === item.bold && prev.italic === item.italic && Math.abs(prev.fontSize - item.fontSize) < 0.4 && prev.fontFamily === item.fontFamily) {
              prev.text += text;
            } else {
              runs.push({
                text,
                bold: item.bold,
                italic: item.italic,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
              });
            }
          }

          return {
            align,
            runs,
            top: line.y,
            left,
            right,
            maxFontSize: ordered.reduce((max, item) => Math.max(max, item.fontSize), 12),
          };
        })
        .filter(line => line.runs.some(run => run.text.trim()));

      return { widthPt: viewport.width, heightPt: viewport.height, lines: structuredLines };
    }

    function buildEditableDocXml(pageData) {
      const maxWidth = Math.max(...pageData.map(page => page.widthPt), 612);
      const maxHeight = Math.max(...pageData.map(page => page.heightPt), 792);
      const body = pageData.map((page, pageIndex) => {
        const paragraphs = page.lines.map((line, lineIndex) => {
          const prevTop = page.lines[lineIndex - 1]?.top;
          const before = prevTop !== undefined
            ? clamp(Math.round(Math.max(0, (prevTop - line.top - line.maxFontSize * 1.1) * 12)), 0, 240)
            : 0;
          const runs = line.runs.map(run => {
            const props = [
              `<w:rFonts w:ascii="${escapeAttr(run.fontFamily)}" w:hAnsi="${escapeAttr(run.fontFamily)}"/>`,
              `<w:sz w:val="${Math.round(clamp(run.fontSize, 8, 36) * 2)}"/>`,
              run.bold ? '<w:b/>' : '',
              run.italic ? '<w:i/>' : '',
            ].join('');
            return `<w:r><w:rPr>${props}</w:rPr><w:t xml:space="preserve">${escapeXML(run.text)}</w:t></w:r>`;
          }).join('');
          return `<w:p><w:pPr>${line.align !== 'left' ? `<w:jc w:val="${line.align}"/>` : ''}<w:spacing w:before="${before}" w:after="0" w:line="${Math.round(clamp(line.maxFontSize * 1.25, 12, 40) * 20)}" w:lineRule="auto"/></w:pPr>${runs}</w:p>`;
        }).join('');
        const pageBreak = pageIndex < pageData.length - 1 ? '<w:p><w:r><w:br w:type="page"/></w:r></w:p>' : '';
        return paragraphs + pageBreak;
      }).join('');

      return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>${body}<w:sectPr><w:pgSz w:w="${ptToTwips(maxWidth)}" w:h="${ptToTwips(maxHeight)}"/><w:pgMar w:top="900" w:right="900" w:bottom="900" w:left="900"/></w:sectPr></w:body></w:document>`;
    }

    function buildImageParagraphXml({ relId, name, widthTwips, heightTwips, index }) {
      const cx = twipsToEmu(widthTwips);
      const cy = twipsToEmu(heightTwips);
      return `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${index}" name="${escapeAttr(name)}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${index}" name="${escapeAttr(name)}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
    }

    // ─── Tool Implementations ─────────────────────

    async function processToImages() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      const pages = getPageList();
      const items = [];
      for (let i=0;i<pages.length;i++) {
        setProgress(Math.round((i/pages.length)*88), `Rendering page ${pages[i]} of ${pdf.numPages}…`);
        const canvas = await renderPageFull(pdf, pages[i], S.dpi);
        if (S.colorMode==='grayscale') applyGrayscale(canvas);
        const blob = await canvasToBlob(canvas, S.outputFormat, S.quality);
        const base = S.file.name.replace(/\.pdf$/i,'');
        items.push({url:URL.createObjectURL(blob), name:`${base}_page_${String(pages[i]).padStart(3,'0')}.${S.outputFormat}`, size:blob.size});
      }
      if (items.length===1) addResult(items[0].url, items[0].name, items[0].size, '🖼️');
      else await zipAndResult(items, S.file.name.replace(/\.pdf$/i,'')+'_images.zip', '🖼️');
      setProgress(100,'Done!'); showToast(`✓ Converted ${pages.length} pages`);
    }

    async function processToText() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      let text = '';
      for (let i=1;i<=pdf.numPages;i++) {
        setProgress(Math.round((i/pdf.numPages)*90),`Extracting page ${i}…`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item=>item.str).join(' ');
        text += `\n═══ Page ${i} ═══\n${pageText}\n`;
      }
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(text,'text/plain'), `${base}_text.txt`, new Blob([text]).size, '📝', text.slice(0,600));
      setProgress(100,'Done!'); showToast('✓ Text extracted');
    }

    // DOCX — manual XML construction via JSZip
    async function processToDocx() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      if (!window.JSZip) throw new Error('JSZip not loaded.');
      let zip;

      if (S.docxMode === 'editable') {
        const pageData = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          setProgress(Math.round((i / pdf.numPages) * 82), `Rebuilding editable page ${i}…`);
          const page = await pdf.getPage(i);
          pageData.push(await extractDocxPageData(page));
        }

        if (!pageData.some(page => page.lines.length)) {
          throw new Error('This PDF does not expose selectable text. Try Visual Match mode for a much better result.');
        }

        setProgress(90, 'Building editable DOCX…');
        const docXml = buildEditableDocXml(pageData);
        zip = buildDocxPackage({
          documentXml: docXml,
          documentRels: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`,
          title: S.file.name.replace(/\.pdf$/i, ''),
        });
      } else {
        const mediaFiles = [];
        const relationships = [];
        const paragraphs = [];
        const pageMetrics = [];
        const marginTwips = 540;

        for (let i = 1; i <= pdf.numPages; i++) {
          setProgress(Math.round((i / pdf.numPages) * 84), `Rendering visual page ${i}…`);
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1 });
          pageMetrics.push({ widthPt: viewport.width, heightPt: viewport.height });

          const canvas = await renderPageFull(pdf, i, S.docxImageDpi);
          const blob = await canvasToBlob(canvas, 'jpg', S.docxImageQuality);
          const fileName = `page-${i}.jpg`;
          const relId = `rId${i}`;
          relationships.push(`<Relationship Id="${relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${fileName}"/>`);
          mediaFiles.push({ path: `word/media/${fileName}`, data: await blob.arrayBuffer() });

          const availableWidth = ptToTwips(viewport.width);
          const availableHeight = ptToTwips(viewport.height);
          const aspect = canvas.width / canvas.height;
          let widthTwips = availableWidth;
          let heightTwips = Math.round(widthTwips / aspect);
          if (heightTwips > availableHeight) {
            heightTwips = availableHeight;
            widthTwips = Math.round(heightTwips * aspect);
          }

          paragraphs.push(buildImageParagraphXml({
            relId,
            name: `PDF Page ${i}`,
            widthTwips,
            heightTwips,
            index: i,
          }));

          if (i < pdf.numPages) paragraphs.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
        }

        const maxWidthTwips = ptToTwips(Math.max(...pageMetrics.map(page => page.widthPt), 612)) + marginTwips * 2;
        const maxHeightTwips = ptToTwips(Math.max(...pageMetrics.map(page => page.heightPt), 792)) + marginTwips * 2;
        const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
<w:body>${paragraphs.join('')}<w:sectPr><w:pgSz w:w="${maxWidthTwips}" w:h="${maxHeightTwips}"/><w:pgMar w:top="${marginTwips}" w:right="${marginTwips}" w:bottom="${marginTwips}" w:left="${marginTwips}"/></w:sectPr></w:body></w:document>`;

        zip = buildDocxPackage({
          documentXml: docXml,
          documentRels: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationships.join('')}</Relationships>`,
          extraFiles: mediaFiles,
          contentTypesExtra: '<Default Extension="jpg" ContentType="image/jpeg"/>',
          title: S.file.name.replace(/\.pdf$/i, '') + ' visual match',
        });
      }

      setProgress(96,'Packing DOCX…');
      const blob = await zip.generateAsync({type:'blob', mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(await blob.arrayBuffer(),'application/vnd.openxmlformats-officedocument.wordprocessingml.document'), `${base}.docx`, blob.size, '📄');
      setProgress(100,'Done!');
      showToast(S.docxMode === 'replica' ? '✓ DOCX visual match ready' : '✓ Editable DOCX ready');
    }

    // Excel / CSV
    async function processToExcel() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      const rows = [['Page','Line','Content']];
      for (let i=1;i<=pdf.numPages;i++) {
        setProgress(Math.round((i/pdf.numPages)*85),`Extracting page ${i}…`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let lastY = null, lineText='', lineNum=1;
        for (const item of content.items) {
          if (lastY!==null && Math.abs(item.transform[5]-lastY)>5) {
            if (lineText.trim()) rows.push([i, lineNum++, lineText.trim()]);
            lineText = '';
          }
          lineText += item.str + ' ';
          lastY = item.transform[5];
        }
        if (lineText.trim()) rows.push([i, lineNum, lineText.trim()]);
      }
      const base = S.file.name.replace(/\.pdf$/i,'');
      if (S.outputFormat==='xlsx') {
        // Create minimal XLSX via JSZip
        const JSZip = window.JSZip; if (!JSZip) throw new Error('JSZip not loaded.');
        setProgress(90,'Building XLSX…');
        const sheetXml = buildXLSXSheet(rows);
        const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="PDF Data" sheetId="1" r:id="rId1"/></sheets></workbook>`;
        const ctXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`;
        const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
        const wbRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`;
        const zip = new JSZip();
        zip.file('[Content_Types].xml',ctXml); zip.file('_rels/.rels',relsXml);
        zip.file('xl/workbook.xml',workbookXml); zip.file('xl/_rels/workbook.xml.rels',wbRels);
        zip.file('xl/worksheets/sheet1.xml',sheetXml);
        const blob = await zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        addResult(blobURL(await blob.arrayBuffer(),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), `${base}.xlsx`, blob.size, '📊');
      } else {
        const csv = rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
        addResult(blobURL(csv,'text/csv'), `${base}.csv`, new Blob([csv]).size, '📊');
      }
      setProgress(100,'Done!'); showToast(`✓ Excel/${S.outputFormat.toUpperCase()} created`);
    }

    function buildXLSXSheet(rows) {
      const cols = rows[0]?.length || 1;
      const colNames = Array.from({length:cols},(_,i)=>String.fromCharCode(65+i));
      const rowsXml = rows.map((row,ri)=>{
        const cells = row.map((cell,ci)=>{
          const ref = colNames[ci]+(ri+1);
          const val = escapeXML(String(cell));
          const isNum = typeof cell==='number';
          return isNum ? `<c r="${ref}"><v>${val}</v></c>` : `<c r="${ref}" t="inlineStr"><is><t>${val}</t></is></c>`;
        }).join('');
        return `<row r="${ri+1}">${cells}</row>`;
      }).join('');
      return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`;
    }

    // PPTX — manual XML
    async function processToPPTX() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      const JSZip = window.JSZip; if (!JSZip) throw new Error('JSZip not loaded.');
      const slides = [];
      for (let i=1;i<=pdf.numPages;i++) {
        setProgress(Math.round((i/pdf.numPages)*80),`Extracting page ${i}…`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map(item=>item.str).join(' ').trim();
        slides.push({ num:i, text: text.slice(0,500) });
      }
      setProgress(88,'Building PPTX…');
      const zip = new JSZip();

      const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
${slides.map(s=>`<Override PartName="/ppt/slides/slide${s.num}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('')}
</Types>`;

      const relsMain = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`;

      const slideList = slides.map(s=>`<p:sldId id="${255+s.num}" r:id="rId${s.num}"/>`).join('');
      const pptXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:sldMasterIdLst/><p:sldSz cx="9144000" cy="5143500"/><p:notesSz cx="6858000" cy="9144000"/>
<p:sldIdLst>${slideList}</p:sldIdLst></p:presentation>`;

      const pptRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${slides.map(s=>`<Relationship Id="rId${s.num}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${s.num}.xml"/>`).join('')}
</Relationships>`;

      const makeSlide = (s) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="0C0C15"/></a:solidFill></p:bgPr></p:bg>
<p:spTree>
<p:sp><p:nvSpPr><p:cNvPr id="1" name="Title"/><p:cNvSpPr><a:spLocks/></p:cNvSpPr><p:nvPr/></p:nvSpPr>
<p:spPr><a:xfrm><a:off x="457200" y="274638"/><a:ext cx="8229600" cy="914400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="2800" b="1"><a:solidFill><a:srgbClr val="FF9A3C"/></a:solidFill></a:rPr><a:t>Page ${s.num}</a:t></a:r></a:p></p:txBody></p:sp>
<p:sp><p:nvSpPr><p:cNvPr id="2" name="Content"/><p:cNvSpPr><a:spLocks/></p:cNvSpPr><p:nvPr/></p:nvSpPr>
<p:spPr><a:xfrm><a:off x="457200" y="1371600"/><a:ext cx="8229600" cy="3200400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
<p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="1400"><a:solidFill><a:srgbClr val="EEE8E0"/></a:solidFill></a:rPr><a:t>${escapeXML(s.text||'(No text extracted)')}</a:t></a:r></a:p></p:txBody></p:sp>
</p:spTree></p:cSld></p:sld>`;

      const slideRel = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;

      zip.file('[Content_Types].xml',contentTypes);
      zip.file('_rels/.rels',relsMain);
      zip.file('ppt/presentation.xml',pptXml);
      zip.file('ppt/_rels/presentation.xml.rels',pptRels);
      slides.forEach(s => {
        zip.file(`ppt/slides/slide${s.num}.xml`, makeSlide(s));
        zip.file(`ppt/slides/_rels/slide${s.num}.xml.rels`, slideRel);
      });

      const blob = await zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(await blob.arrayBuffer(),'application/vnd.openxmlformats-officedocument.presentationml.presentation'), `${base}.pptx`, blob.size, '📽️');
      setProgress(100,'Done!'); showToast(`✓ PPTX created with ${slides.length} slides`);
    }

    async function processToHTML() {
      const pdf = S.pdfDoc; if (!pdf) throw new Error('No PDF loaded.');
      let pagesHtml = '';
      for (let i=1;i<=pdf.numPages;i++) {
        setProgress(Math.round((i/pdf.numPages)*85),`Processing page ${i}…`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map(item=>item.str).join(' ');
        pagesHtml += `<section class="page"><h2>Page ${i}</h2><p>${escapeXML(text)}</p></section>`;
      }
      const base = S.file.name.replace(/\.pdf$/i,'');
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeXML(base)}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;max-width:800px;margin:2rem auto;padding:0 1.5rem;line-height:1.8;color:#222;background:#fafafa}.page{margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid #ddd}.page h2{font-size:1rem;font-weight:600;color:#888;margin-bottom:1rem;font-family:monospace}.page p{font-size:1rem;white-space:pre-wrap}</style></head><body><h1 style="font-size:1.5rem;margin-bottom:2rem;font-family:system-ui">${escapeXML(base)}</h1>${pagesHtml}</body></html>`;
      addResult(blobURL(html,'text/html'), `${base}.html`, new Blob([html]).size, '🌐');
      setProgress(100,'Done!'); showToast('✓ HTML created');
    }

    async function processMerge() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      if (S.mergeFiles.length < 2) throw new Error('Upload at least 2 PDFs to merge.');
      const merged = await PDFLib.PDFDocument.create();
      for (let fi=0;fi<S.mergeFiles.length;fi++) {
        setProgress(Math.round((fi/S.mergeFiles.length)*88), `Merging ${S.mergeFiles[fi].name}…`);
        const bytes = await S.mergeFiles[fi].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes, {ignoreEncryption:true});
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => merged.addPage(p));
        if (S.blankBetween && fi < S.mergeFiles.length-1) {
          const blank = merged.addPage(); blank.setSize(595,842);
        }
      }
      setProgress(94,'Saving…');
      const saved = await merged.save();
      addResult(blobURL(saved,'application/pdf'),'merged.pdf',saved.length,'🔗');
      setProgress(100,'Done!'); showToast(`✓ Merged ${S.mergeFiles.length} PDFs`);
    }

    async function processSplit() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const src = await loadPDFLib(S.file);
      const n = src.getPageCount();
      const base = S.file.name.replace(/\.pdf$/i,'');
      let chunks = [];
      if (S.splitMode==='each') chunks = Array.from({length:n},(_,i)=>[i]);
      else if (S.splitMode==='every') {
        for (let i=0;i<n;i+=S.splitEvery) chunks.push(Array.from({length:Math.min(S.splitEvery,n-i)},(_,j)=>i+j));
      } else if (S.splitMode==='extract') {
        chunks = [parseRange(S.splitRange,n).map(p=>p-1)];
      } else {
        const parts = S.splitRange.split(',');
        chunks = parts.map(part=>parseRange(part,n).map(p=>p-1));
      }
      const items = [];
      for (let ci=0;ci<chunks.length;ci++) {
        setProgress(Math.round((ci/chunks.length)*88),`Creating part ${ci+1}…`);
        const doc = await PDFLib.PDFDocument.create();
        const pages = await doc.copyPages(src, chunks[ci]);
        pages.forEach(p=>doc.addPage(p));
        const saved = await doc.save();
        items.push({url:blobURL(saved,'application/pdf'), name:`${base}_part_${ci+1}.pdf`, size:saved.length});
      }
      if (items.length===1) addResult(items[0].url,items[0].name,items[0].size,'📄');
      else await zipAndResult(items, `${base}_split.zip`,'📄');
      setProgress(100,'Done!'); showToast(`✓ Split into ${chunks.length} files`);
    }

    async function processRemovePages() {
      if (!S.markedForRemoval.size) throw new Error('No pages marked for removal. Click pages in the preview to mark them.');
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const src = await loadPDFLib(S.file);
      const n = src.getPageCount();
      const keep = Array.from({length:n},(_,i)=>i+1).filter(p=>!S.markedForRemoval.has(p)).map(p=>p-1);
      if (!keep.length) throw new Error('Cannot remove all pages. Keep at least one page.');
      setProgress(60,'Creating new PDF…');
      const doc = await PDFLib.PDFDocument.create();
      const pages = await doc.copyPages(src, keep);
      pages.forEach(p=>doc.addPage(p));
      setProgress(88,'Saving…');
      const saved = await doc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_removed.pdf`, saved.length, '🗑️');
      setProgress(100,'Done!'); showToast(`✓ Removed ${S.markedForRemoval.size} pages`);
      S.markedForRemoval.clear(); renderPageGrid();
    }

    async function processExtractPages() {
      if (!S.selectedPages.size) throw new Error('No pages selected. Click pages in the preview to select them.');
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const src = await loadPDFLib(S.file);
      const indices = [...S.selectedPages].sort((a,b)=>a-b).map(p=>p-1);
      setProgress(60,'Extracting pages…');
      const doc = await PDFLib.PDFDocument.create();
      const pages = await doc.copyPages(src, indices);
      pages.forEach(p=>doc.addPage(p));
      setProgress(88,'Saving…');
      const saved = await doc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_extracted.pdf`, saved.length, '📌');
      setProgress(100,'Done!'); showToast(`✓ Extracted ${S.selectedPages.size} pages`);
    }

    async function processReorder() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const src = await loadPDFLib(S.file);
      setProgress(50,'Reordering…');
      const doc = await PDFLib.PDFDocument.create();
      const indices = S.reorderPages.map(p=>p-1);
      const pages = await doc.copyPages(src, indices);
      pages.forEach(p=>doc.addPage(p));
      setProgress(88,'Saving…');
      const saved = await doc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_reordered.pdf`, saved.length, '↕️');
      setProgress(100,'Done!'); showToast('✓ Pages reordered');
    }

    async function processCompress() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const origSize = S.file.size;
      setProgress(30,'Loading…');
      const pdfDoc = await loadPDFLib(S.file);
      pdfDoc.setTitle(''); pdfDoc.setAuthor(''); pdfDoc.setSubject(''); pdfDoc.setKeywords([]);
      pdfDoc.setProducer('PDF Tools Suite'); pdfDoc.setCreator('PDF Tools Suite');
      setProgress(75,'Optimizing…');
      const saved = await pdfDoc.save({useObjectStreams:true, addDefaultPage:false, objectsPerTick:50});
      const blob = new Blob([saved],{type:'application/pdf'});
      const savedPct = Math.round((1-blob.size/origSize)*100);
      const base = S.file.name.replace(/\.pdf$/i,'');
      const extra = {type:'compress', origSize, newSize:blob.size, savedPct};
      addResult(blobURL(saved,'application/pdf'), `${base}_compressed.pdf`, saved.length, '🗜️', extra);
      setProgress(100,'Done!'); showToast(`✓ Compressed${savedPct>0?' (saved '+savedPct+'%)':''}`);
    }

    async function processRotate() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const pdfDoc = await loadPDFLib(S.file);
      const pages = pdfDoc.getPages();
      pages.forEach((page,idx)=>{
        const apply = S.rotateTarget==='all'||(S.rotateTarget==='odd'&&(idx+1)%2===1)||(S.rotateTarget==='even'&&(idx+1)%2===0);
        if (apply) page.setRotation(PDFLib.degrees((page.getRotation().angle+S.rotateDeg+360)%360));
      });
      setProgress(80,'Saving…');
      const saved = await pdfDoc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_rotated.pdf`, saved.length, '🔄');
      setProgress(100,'Done!'); showToast('✓ Pages rotated');
    }

    async function processWatermark() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const pdfDoc = await loadPDFLib(S.file);
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      const hex = S.wmColor.replace('#','');
      const r=parseInt(hex.slice(0,2),16)/255, g=parseInt(hex.slice(2,4),16)/255, b=parseInt(hex.slice(4,6),16)/255;
      const pages = pdfDoc.getPages();
      for (let i=0;i<pages.length;i++) {
        setProgress(Math.round((i/pages.length)*88),`Watermarking page ${i+1}…`);
        const page = pages[i];
        const {width,height} = page.getSize();
        const tw = font.widthOfTextAtSize(S.wmText, S.wmFontSize);
        page.drawText(S.wmText, {x:width/2-tw/2, y:height/2, size:S.wmFontSize, font, color:PDFLib.rgb(r,g,b), opacity:S.wmOpacity, rotate:PDFLib.degrees(-30)});
      }
      const saved = await pdfDoc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_watermarked.pdf`, saved.length, '💧');
      setProgress(100,'Done!'); showToast('✓ Watermark added');
    }

    async function processPageNumbers() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const pdfDoc = await loadPDFLib(S.file);
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      pdfDoc.getPages().forEach((page,idx)=>{
        const {width,height} = page.getSize();
        const label = S.pnFormat.replace('{n}', idx+S.pnStart);
        const tw = font.widthOfTextAtSize(label, S.pnFontSize);
        const margin = 24;
        let x = width/2-tw/2, y = margin;
        if (S.pnPosition.includes('top')) y = height-margin-S.pnFontSize;
        if (S.pnPosition.includes('right')) x = width-tw-margin;
        if (S.pnPosition.includes('left')) x = margin;
        page.drawText(label, {x, y, size:S.pnFontSize, font, color:PDFLib.rgb(.4,.4,.4)});
      });
      const saved = await pdfDoc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_numbered.pdf`, saved.length, '🔢');
      setProgress(100,'Done!'); showToast('✓ Page numbers added');
    }

    async function processMetadata() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      const pdfDoc = await loadPDFLib(S.file);
      if (S.metaTitle) pdfDoc.setTitle(S.metaTitle);
      if (S.metaAuthor) pdfDoc.setAuthor(S.metaAuthor);
      if (S.metaSubject) pdfDoc.setSubject(S.metaSubject);
      const saved = await pdfDoc.save();
      const base = S.file.name.replace(/\.pdf$/i,'');
      addResult(blobURL(saved,'application/pdf'), `${base}_metadata.pdf`, saved.length, '✏️');
      setProgress(100,'Done!'); showToast('✓ Metadata updated');
    }

    async function processUnlock() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      try {
        const bytes = await S.file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes, {ignoreEncryption:true});
        const saved = await pdfDoc.save();
        const base = S.file.name.replace(/\.pdf$/i,'');
        addResult(blobURL(saved,'application/pdf'), `${base}_unlocked.pdf`, saved.length, '🔓');
        setProgress(100,'Done!'); showToast('✓ PDF unlocked');
      } catch(e) { throw new Error('Could not unlock. The PDF may use unsupported encryption.'); }
    }

    async function processImgToPDF() {
      const PDFLib = window.PDFLib; if (!PDFLib) throw new Error('pdf-lib not loaded.');
      if (!S.mergeFiles.length) throw new Error('Upload image files first.');
      const pdfDoc = await PDFLib.PDFDocument.create();
      const sizes = {a4:[595.28,841.89], letter:[612,792]};
      for (let i=0;i<S.mergeFiles.length;i++) {
        setProgress(Math.round((i/S.mergeFiles.length)*88),`Embedding image ${i+1}…`);
        const file = S.mergeFiles[i];
        const ab = await file.arrayBuffer();
        let img;
        try { if (file.type==='image/png') img=await pdfDoc.embedPng(ab); else img=await pdfDoc.embedJpg(ab); }
        catch { img=await pdfDoc.embedJpg(ab); }
        let pw,ph;
        if (S.imgPageSize==='fit') { pw=img.width; ph=img.height; }
        else { [pw,ph]=sizes[S.imgPageSize]||sizes.a4; }
        const page = pdfDoc.addPage([pw,ph]);
        const m=20; let iw=img.width, ih=img.height;
        if (S.imgFit==='fit') { const r=Math.min((pw-m*2)/iw,(ph-m*2)/ih); iw*=r; ih*=r; }
        else if (S.imgFit==='fill') { iw=pw-m*2; ih=ph-m*2; }
        page.drawImage(img, {x:(pw-iw)/2, y:(ph-ih)/2, width:iw, height:ih});
      }
      setProgress(94,'Saving…');
      const saved = await pdfDoc.save();
      addResult(blobURL(saved,'application/pdf'), 'images_combined.pdf', saved.length, '📸');
      setProgress(100,'Done!'); showToast(`✓ PDF created from ${S.mergeFiles.length} images`);
    }

    // ─── Results Renderer ─────────────────────────
    function renderResults() {
      const container = G('p-results');
      if (!container) return;
      if (!S.results.length) { container.innerHTML=''; return; }
      container.innerHTML = `
        <div class="p-results-title">✓ Ready to Download</div>
        ${S.results.map((r,i)=>`
          <div class="p-result-item">
            <div class="p-ri-icon">${r.icon}</div>
            <div class="p-ri-info">
              <div class="p-ri-name">${r.name}</div>
              <div class="p-ri-meta">${fmt(r.size)}</div>
            </div>
            <a href="${r.url}" download="${r.name}" class="p-dl-btn">⬇ Download</a>
          </div>
          ${r.extra?.type==='compress'?`
          <div class="p-cs">
            <div class="p-cs-item"><div class="p-cs-label">Before</div><div class="p-cs-val">${fmt(r.extra.origSize)}</div></div>
            <div class="p-cs-arrow">→</div>
            <div class="p-cs-item"><div class="p-cs-label">After</div><div class="p-cs-val">${fmt(r.extra.newSize)}</div></div>
            <div class="p-cs-saved">${r.extra.savedPct>0?'-'+r.extra.savedPct+'% 🎉':'Optimized'}</div>
          </div>`:''}
          ${r.extra&&typeof r.extra==='string'?`<div class="p-text-prev">${r.extra}</div>`:''}
        `).join('')}
        ${S.results.length>1?`<button class="p-dl-all" id="p-dl-all">📦 Download All as ZIP</button>`:''}
      `;
      G('p-dl-all')?.addEventListener('click', async ()=>{
        const JSZip = window.JSZip; if (!JSZip) return;
        const zip = new JSZip();
        for (const r of S.results) { const resp=await fetch(r.url); zip.file(r.name, await resp.blob()); }
        const zb = await zip.generateAsync({type:'blob'});
        const a=document.createElement('a'); a.href=URL.createObjectURL(zb); a.download='pdf_results.zip'; a.click();
      });
    }

    // ─── Error helpers ────────────────────────────
    function showError(msg) {
      S.error = msg;
      const el = G('p-err'); if (!el) return;
      el.innerHTML = `<span>⚠</span> ${msg} <span class="p-err-close" id="p-err-close">✕</span>`;
      el.style.display = 'flex';
      G('p-err-close')?.addEventListener('click', clearError);
    }
    function clearError() {
      S.error = null;
      const el = G('p-err'); if (el) el.style.display = 'none';
    }

    // ─── Toast ────────────────────────────────────
    let toastTimer = null;
    function showToast(msg) {
      const t=G('p-toast'); const m=G('p-toast-msg'); if (!t) return;
      m.textContent = msg; t.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = T(()=>t.classList.remove('show'), 2400);
    }

    // ─── FAQ ──────────────────────────────────────
    root.querySelectorAll('.p-faq-q').forEach(q=>{
      q.addEventListener('click',()=>{
        const item=q.closest('.p-faq-item'); const isOpen=item.classList.contains('open');
        root.querySelectorAll('.p-faq-item').forEach(i=>i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // Tool cards in "all tools" section
    root.querySelectorAll('[data-goto-tool]').forEach(card=>{
      card.addEventListener('click',()=>{
        const tool = card.dataset.gotoTool;
        // Find which category
        const cat = TOOL_CATEGORIES.find(c=>c.tools.some(t=>t.id===tool));
        if (cat) {
          root.querySelectorAll('.p-cat-tab').forEach(b=>b.classList.remove('active'));
          root.querySelector(`.p-cat-tab[data-cat="${cat.id}"]`)?.classList.add('active');
          renderToolGrid(cat.id);
          S.activeTool = tool;
          renderOptions();
          G('p-app')?.scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });

    // Initial render
    renderOptions();
    showPreviewPanel(false);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const ALL_TOOLS_FLAT = [
    {id:'to-images',icon:'🖼️',name:'PDF → Images',desc:'Convert pages to JPG, PNG, WEBP'},
    {id:'to-text',icon:'📝',name:'PDF → Text',desc:'Extract all text content'},
    {id:'to-docx',icon:'📄',name:'PDF → Word',desc:'Create a .docx document'},
    {id:'to-excel',icon:'📊',name:'PDF → Excel',desc:'Export to .xlsx or .csv'},
    {id:'to-pptx',icon:'📽️',name:'PDF → PowerPoint',desc:'Create .pptx presentation'},
    {id:'to-html',icon:'🌐',name:'PDF → HTML',desc:'Convert to web page'},
    {id:'merge',icon:'🔗',name:'Merge PDFs',desc:'Combine multiple PDFs'},
    {id:'split',icon:'✂️',name:'Split PDF',desc:'Divide into parts'},
    {id:'remove-pages',icon:'🗑️',name:'Remove Pages',desc:'Delete specific pages visually'},
    {id:'extract-pages',icon:'📌',name:'Extract Pages',desc:'Keep only selected pages'},
    {id:'reorder',icon:'↕️',name:'Reorder Pages',desc:'Drag to rearrange pages'},
    {id:'compress',icon:'🗜️',name:'Compress PDF',desc:'Reduce file size'},
    {id:'rotate',icon:'🔄',name:'Rotate Pages',desc:'90°, 180° rotation'},
    {id:'watermark',icon:'💧',name:'Watermark',desc:'Add text watermark'},
    {id:'page-numbers',icon:'🔢',name:'Page Numbers',desc:'Add page numbering'},
    {id:'metadata',icon:'✏️',name:'Edit Metadata',desc:'Title, author, subject'},
    {id:'unlock',icon:'🔓',name:'Unlock PDF',desc:'Remove password'},
    {id:'info',icon:'ℹ️',name:'PDF Info',desc:'File details & stats'},
    {id:'img-pdf',icon:'📸',name:'Images → PDF',desc:'Combine images into PDF'},
  ];

  return (
    <div id="pdf-root" className="pdf-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="p-nav">
        <div className="p-nav-logo"><div className="li">📄</div><span>PDF Tools Suite</span></div>
        <ul className="p-nav-links">
          <li><a href="#p-app">Tools</a></li>
          <li><a href="#p-all-tools">All Tools</a></li>
          <li><a href="#p-features">Features</a></li>
          <li><a href="#p-faq">FAQ</a></li>
        </ul>
        <a href="#p-app" className="p-nav-cta">Open Suite →</a>
      </nav>

      {/* HERO */}
      <section className="p-hero">
        <div className="p-hero-noise" aria-hidden="true" />
        <div className="p-hero-grid" aria-hidden="true" />
        <div className="p-hero-orb" aria-hidden="true" />
        <div className="p-hero-orb2" aria-hidden="true" />
        <div className="p-hero-c">
          <div className="p-badge"><span className="p-badge-dot" />19 Tools · Browser-Only · Zero Upload · Free Forever</div>
          <h1><span className="hm">Everything PDF.</span><span className="ha">All Free.</span></h1>
          <p className="p-hero-sub">Convert to Word, Excel, PowerPoint, images. Merge, split, remove pages, watermark — all processed locally in your browser. Files never leave your device.</p>
          <div className="p-hero-acts">
            <a href="#p-app" className="p-btn-pri"><span>Open PDF Suite</span><span>→</span></a>
            <a href="#p-all-tools" className="p-btn-ghost"><span>See All 19 Tools</span></a>
          </div>
          <div className="p-hero-stats">
            {[['19','PDF Tools'],['0','Files Uploaded'],['100%','Client-Side'],['Free','No Limits']].map(([n,l])=>(
              <div key={l} className="p-hstat"><div className="p-hstat-n">{n}</div><div className="p-hstat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* APP SECTION */}
      <section className="p-sec p-app-bg" id="p-app">
        <div className="p-sec-inner">
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <div className="p-label">⚡ Live Suite</div>
            <h2 className="p-title">PDF Tools</h2>
            <p className="p-sub" style={{margin:'0 auto'}}>Upload a PDF — see its full preview instantly. Pick a tool, configure, and download.</p>
          </div>

          {/* Category Tabs */}
          <div className="p-cat-tabs">
            {[{id:'convert',label:'🔄 Convert'},{id:'organize',label:'📋 Organize'},{id:'edit',label:'✏️ Edit'},{id:'security',label:'🔒 More'}].map((c,i)=>(
              <button key={c.id} className={`p-cat-tab${i===0?' active':''}`} data-cat={c.id}>{c.label}</button>
            ))}
          </div>

          {/* Tool Grid */}
          <div className="p-tool-grid" id="p-tool-grid" />

          {/* Drop Zone */}
          <div id="p-drop-wrap">
            <div className="p-drop" id="p-drop">
              <input type="file" id="p-file-input" accept=".pdf,application/pdf,image/*" multiple />
              <div className="p-drop-icon">📄</div>
              <div className="p-drop-title">Drop your file here</div>
              <div className="p-drop-sub">PDF for most tools · Images for "Images → PDF"</div>
              <div className="p-drop-btn">Browse Files</div>
              <div className="p-drop-info">All processing is local · Files never leave your device</div>
            </div>
          </div>

          {/* File Bar */}
          <div id="p-file-bar-wrap" style={{display:'none'}} />

          {/* PDF Preview Panel */}
          <div className="p-preview-panel" id="p-preview-panel" style={{display:'none'}}>
            <div className="p-preview-header">
              <div className="p-preview-title">
                <span className="p-preview-live-dot" />
                PDF PREVIEW
              </div>
              <div className="p-preview-actions">
                <button className="p-preview-act-btn active">Grid</button>
              </div>
            </div>
            <div className="p-pages-grid" id="p-pages-grid">
              <div className="p-pages-loading"><div className="spinner" /><span>Rendering pages…</span></div>
            </div>
            <div className="p-page-sel-info" id="p-sel-info" />
          </div>

          {/* Error */}
          <div className="p-err" id="p-err" style={{display:'none'}} role="alert" />

          {/* Tool Options */}
          <div className="p-opts" id="p-opts">
            <div className="p-opts-title" id="p-opts-title">Tool Options</div>
            <div id="p-opts-body" />
          </div>

          {/* Process Button */}
          <div id="p-proc-wrap" />

          {/* Results */}
          <div id="p-results" className="p-results" />
        </div>
      </section>

      {/* ALL TOOLS */}
      <section className="p-sec" id="p-all-tools">
        <div className="p-sec-inner">
          <div className="p-label">◈ Complete Suite</div>
          <h2 className="p-title">All 19 PDF Tools</h2>
          <p className="p-sub">Everything for PDF work — no subscription, no watermarks.</p>
          <div className="p-tool-grid" style={{marginTop:'2rem'}}>
            {ALL_TOOLS_FLAT.map(t=>(
              <div key={t.id} className="p-tool-card" data-goto-tool={t.id}>
                <div className="tc-icon">{t.icon}</div>
                <div className="tc-name">{t.name}</div>
                <div className="tc-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="p-sec p-feat-bg" id="p-features">
        <div className="p-sec-inner">
          <div className="p-label">✦ Why This Suite</div>
          <h2 className="p-title">Built Different</h2>
          <p className="p-sub">No accounts. No watermarks. No server. Just tools that work.</p>
          <div className="p-feat-grid">
            {[
              {icon:'👁️',title:'Live Page Preview',desc:'When you upload a PDF, every page renders instantly as a visual thumbnail — exactly like a real PDF viewer.'},
              {icon:'📄',title:'PDF → Word / Excel / PPT',desc:'Convert PDFs to DOCX, XLSX, CSV, and PPTX — all built manually with ZIP+XML, no external APIs needed.'},
              {icon:'🗑️',title:'Visual Page Removal',desc:'Click on actual page thumbnails to mark pages for removal or extraction. See exactly what you\'re deleting.'},
              {icon:'🔒',title:'100% Private',desc:'Everything runs in your browser. PDF.js, pdf-lib, and JSZip are loaded from CDN. Your files never touch a server.'},
              {icon:'⚡',title:'Instant Processing',desc:'No upload queue, no server wait. Your PDF is processed in milliseconds using browser-native JavaScript engines.'},
              {icon:'🆓',title:'Truly Free',desc:'All 19 tools, unlimited files, no daily caps, no watermarks on output. No account needed. Ever.'},
            ].map((f,i)=>(
              <article key={i} className="p-feat-card">
                <div style={{fontSize:'1.75rem'}}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-sec p-faq-bg" id="p-faq">
        <div className="p-sec-inner">
          <div style={{textAlign:'center'}}>
            <div className="p-label">❓ FAQ</div>
            <h2 className="p-title">Frequently Asked</h2>
          </div>
          <div className="p-faq-list">
            {[
              {q:'Are my PDF files safe?',a:'Completely. PDF.js renders pages in your browser, pdf-lib manipulates bytes locally, and JSZip creates ZIP files on your device. Nothing is ever sent to a server. You can disconnect Wi-Fi after loading the page and every tool still works.'},
              {q:'How does PDF → DOCX work without a backend?',a:'The tool now offers two DOCX modes. Visual Match renders each PDF page and places it into Word for near-original appearance, while Editable Text rebuilds paragraphs, size hierarchy, and some emphasis from PDF.js text data. Everything is packaged locally into a valid .docx using JSZip.'},
              {q:'Why can some Word conversions still differ from Adobe/iLovePDF?',a:'Complex PDFs with tables, floating objects, scans, or multi-column magazine layouts are extremely hard to reconstruct as perfectly editable Word content in the browser. Visual Match mode keeps the look much closer, while Editable Text mode focuses on making the content easier to edit.'},
              {q:'What does "Remove Pages" do exactly?',a:'After uploading, all PDF pages are rendered as visual thumbnails. You click the pages you want to delete — they get a red overlay. Then click "Remove Pages" and a new PDF is created without those pages using pdf-lib.'},
              {q:'Is there a file size limit?',a:'There\'s no enforced limit, but very large PDFs (50MB+) may slow down rendering since everything runs in the browser\'s JavaScript engine. For best performance, keep files under 50MB.'},
            ].map((f,i)=>(
              <div key={i} className="p-faq-item">
                <div className="p-faq-q" role="button" tabIndex={0}>{f.q}<span className="p-faq-arrow">⌄</span></div>
                <div className="p-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-foot">
        <div style={{maxWidth:'1240px',margin:'0 auto'}}>
          <div className="p-foot-logo"><div className="fli">📄</div>PDF Tools Suite</div>
          <p className="p-foot-sub">Everything PDF — all free, all private, all in your browser.</p>
          <ul className="p-foot-links">
            {['Tools::#p-app','All Tools::#p-all-tools','Features::#p-features','FAQ::#p-faq'].map(l=>{
              const [label,href]=l.split('::');
              return <li key={label}><a href={href}>{label}</a></li>;
            })}
          </ul>
          <p className="p-foot-copy">PDF.js · pdf-lib · JSZip · Manual DOCX/XLSX/PPTX · 100% client-side · No tracking</p>
        </div>
      </footer>

      {/* Toast */}
      <div className="p-toast" id="p-toast" role="status">
        <span style={{color:'var(--green)'}}>✓</span>
        <span id="p-toast-msg">Done!</span>
      </div>
    </div>
  );
}
