'use client';
import { useEffect } from 'react';
import Link from 'next/link';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

.pg-root *, .pg-root *::before, .pg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pg-root {
  --bg:  #0F0F13; --bg2: #141418; --bg3: #1a1a20; --card: #131317;
  --border: rgba(255,255,255,0.07); --border-hi: rgba(255,255,255,0.13);
  --text: #f0f0f8; --text-dim: #8888a0; --text-muted: #55556a;
  --pink: #F472B6; --pink-dim: rgba(244,114,182,0.12); --pink-dim2: rgba(244,114,182,0.06);
  --pink-glow: rgba(244,114,182,0.25);
  --purple: #A78BFA; --purple-dim: rgba(167,139,250,0.12);
  --red: #f87171; --red-dim: rgba(248,113,113,0.1);
  --orange: #fb923c; --yellow: #fbbf24; --green: #4ade80; --teal: #2dd4bf;
  --shadow: 0 4px 24px rgba(0,0,0,0.6); --shadow-lg: 0 16px 56px rgba(0,0,0,0.75);
  --radius: 16px; --radius-sm: 10px; --radius-xs: 7px;
  --tr: 0.18s cubic-bezier(0.4,0,0.2,1);
  --font-head: 'Syne', sans-serif; --font-body: 'Plus Jakarta Sans', sans-serif; --font-mono: 'DM Mono', monospace;
  font-family: var(--font-body); background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden;
}
.pg-root button { cursor: pointer; border: none; background: none; font-family: inherit; color: inherit; }
.pg-root input, .pg-root select, .pg-root textarea { font-family: inherit; }
.pg-root ::selection { background: var(--pink-dim); color: var(--pink); }
.pg-root ::-webkit-scrollbar { width: 5px; }
.pg-root ::-webkit-scrollbar-track { background: var(--bg); }
.pg-root ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

/* ── NAV ── */
.pg-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 60px;
  background: rgba(15,15,19,0.8); backdrop-filter: blur(24px) saturate(1.5);
  border-bottom: 1px solid var(--border);
}
.pg-nav-logo {
  font-family: var(--font-head); font-weight: 800; font-size: 1.15rem;
  letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.55rem;
}
.pg-nav-logo .logo-icon {
  width: 30px; height: 30px; background: var(--pink); color: var(--bg);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; flex-shrink: 0;
}
.pg-nav-logo .logo-sub { color: var(--text-dim); font-size: 0.82rem; font-weight: 500; }
.pg-nav-right { display: flex; align-items: center; gap: 0.75rem; }
.pg-nav-pill {
  padding: 0.35rem 0.9rem; background: var(--pink-dim);
  border: 1px solid rgba(244,114,182,0.22); border-radius: 99px;
  font-size: 0.75rem; font-family: var(--font-mono); color: var(--pink); font-weight: 500;
}
.pg-back-btn {
  padding: 0.35rem 0.85rem; border: 1px solid var(--border-hi);
  border-radius: 99px; font-size: 0.8rem; color: var(--text-dim);
  transition: all var(--tr); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;
}
.pg-back-btn:hover { border-color: var(--pink); color: var(--pink); }

/* ── HERO ── */
.pg-hero {
  min-height: 88vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 5rem 1.5rem 3rem; position: relative; overflow: hidden;
}
.pg-hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
}
.pg-hero-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%);
  width: 680px; height: 680px;
  background: radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 68%);
  pointer-events: none;
}
.pg-hero-glow2 {
  position: absolute; top: 55%; left: 35%;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.pg-hero-content { position: relative; z-index: 1; max-width: 720px; }
.pg-hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.32rem 0.85rem; background: var(--pink-dim);
  border: 1px solid rgba(244,114,182,0.22); border-radius: 99px;
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--pink);
  letter-spacing: 0.05em; margin-bottom: 1.75rem;
  animation: pgFadeUp 0.6s ease both;
}
.pg-hero-badge-dot {
  width: 5px; height: 5px; border-radius: 50%; background: var(--pink);
  animation: pgBlink 2s ease-in-out infinite;
}
@keyframes pgBlink { 0%,100%{opacity:1} 50%{opacity:0.35} }
.pg-hero h1 {
  font-family: var(--font-head); font-size: clamp(2.6rem, 6.5vw, 5rem);
  font-weight: 800; letter-spacing: -0.045em; line-height: 1.0;
  margin-bottom: 1.25rem; animation: pgFadeUp 0.7s 0.08s ease both;
}
.pg-hero h1 .accent {
  background: linear-gradient(135deg, var(--pink), var(--purple));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pg-hero-sub {
  font-size: clamp(0.95rem, 2.2vw, 1.1rem); color: var(--text-dim);
  max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.75;
  animation: pgFadeUp 0.7s 0.16s ease both;
}
.pg-hero-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.8rem; background: var(--pink); color: var(--bg);
  border-radius: 99px; font-weight: 700; font-size: 0.92rem;
  transition: all 0.2s; box-shadow: 0 0 28px var(--pink-glow);
  animation: pgFadeUp 0.7s 0.24s ease both; text-decoration: none;
}
.pg-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 0 44px var(--pink-glow); }
@keyframes pgFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

/* ── MAIN TOOL ── */
.pg-tool {
  padding: 4rem 1.5rem 5rem;
  background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.pg-tool-inner { max-width: 860px; margin: 0 auto; }
.pg-tool-header { text-align: center; margin-bottom: 2.5rem; }
.pg-tool-label {
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500;
  color: var(--pink); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.65rem;
}
.pg-tool-title {
  font-family: var(--font-head); font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem;
}
.pg-tool-sub { font-size: 0.95rem; color: var(--text-dim); }

/* ── PASSWORD DISPLAY ── */
.pg-pwd-display {
  background: var(--card); border: 1px solid var(--border-hi);
  border-radius: var(--radius); padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem; position: relative; overflow: hidden;
  box-shadow: var(--shadow);
}
.pg-pwd-display::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--pink-dim), var(--purple-dim), transparent);
}
.pg-pwd-meta {
  font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted);
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.75rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.pg-pwd-meta-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--pink);
  animation: pgLivePulse 1.8s ease-in-out infinite;
}
@keyframes pgLivePulse { 0%,100%{box-shadow:0 0 0 0 rgba(244,114,182,0.5)} 50%{box-shadow:0 0 0 6px rgba(244,114,182,0)} }
.pg-pwd-text-wrap { display: flex; align-items: center; gap: 1rem; }
.pg-pwd-text {
  flex: 1; font-family: var(--font-mono); font-size: clamp(1rem, 2.8vw, 1.45rem);
  font-weight: 500; color: var(--text); word-break: break-all; line-height: 1.4;
  min-height: 2rem; transition: opacity 0.18s, transform 0.18s;
  cursor: text; user-select: all;
}
.pg-pwd-text.flash { animation: pgFlash 0.22s ease; }
@keyframes pgFlash {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
.pg-pwd-copy-btn {
  flex-shrink: 0; padding: 0.5rem 1rem;
  border: 1px solid var(--border-hi); border-radius: var(--radius-xs);
  font-size: 0.8rem; font-weight: 600; font-family: var(--font-mono);
  color: var(--text-dim); transition: all var(--tr); white-space: nowrap;
  display: flex; align-items: center; gap: 0.4rem;
}
.pg-pwd-copy-btn:hover { border-color: var(--pink); color: var(--pink); }
.pg-pwd-copy-btn.copied { border-color: var(--pink); color: var(--pink); background: var(--pink-dim); }

/* ── STRENGTH METER ── */
.pg-strength { margin-bottom: 1.5rem; }
.pg-strength-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.72rem;
}
.pg-strength-label { color: var(--text-muted); letter-spacing: 0.06em; }
.pg-strength-val { font-weight: 600; transition: color 0.3s; }
.pg-strength-bar {
  display: flex; gap: 4px; height: 5px;
}
.pg-strength-seg {
  flex: 1; border-radius: 99px; background: var(--bg3);
  transition: background 0.35s ease, box-shadow 0.35s ease;
}
.pg-strength-seg.filled { box-shadow: 0 0 6px currentColor; }

/* ── CARD ── */
.pg-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.5rem 1.75rem;
  margin-bottom: 1.1rem; box-shadow: var(--shadow);
}
.pg-card-title {
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500;
  color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.5rem;
}
.pg-card-title-icon { color: var(--pink); }

/* ── MODE SELECTOR ── */
.pg-mode-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
.pg-mode-btn {
  flex: 1; padding: 0.6rem 0.5rem; border: 1px solid var(--border-hi);
  border-radius: var(--radius-xs); font-size: 0.82rem; font-weight: 600;
  color: var(--text-dim); transition: all var(--tr); display: flex;
  align-items: center; justify-content: center; gap: 0.4rem;
}
.pg-mode-btn:hover { border-color: var(--pink-dim); color: var(--text); }
.pg-mode-btn.active {
  border-color: var(--pink); background: var(--pink-dim);
  color: var(--pink); box-shadow: 0 0 14px rgba(244,114,182,0.12);
}

/* ── LENGTH SLIDER ── */
.pg-length-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 0.6rem;
}
.pg-length-lbl { font-size: 0.82rem; font-weight: 600; color: var(--text-dim); }
.pg-length-val {
  font-family: var(--font-mono); font-size: 1rem; font-weight: 700;
  color: var(--pink); background: var(--pink-dim); padding: 0.15rem 0.6rem;
  border-radius: var(--radius-xs);
}
.pg-slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 4px;
  border-radius: 99px; background: var(--bg3); outline: none;
  cursor: pointer; margin-bottom: 0.85rem; accent-color: var(--pink);
}
.pg-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
  background: var(--pink); cursor: pointer; box-shadow: 0 0 10px var(--pink-glow);
  transition: transform 0.15s;
}
.pg-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.pg-slider::-moz-range-thumb {
  width: 18px; height: 18px; border-radius: 50%; background: var(--pink);
  cursor: pointer; border: none; box-shadow: 0 0 10px var(--pink-glow);
}
.pg-quick-btns { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.pg-quick-btn {
  padding: 0.28rem 0.65rem; border: 1px solid var(--border-hi);
  border-radius: 5px; font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--text-muted); transition: all var(--tr);
}
.pg-quick-btn:hover { border-color: var(--pink); color: var(--pink); }
.pg-quick-btn.active { border-color: var(--pink); color: var(--pink); background: var(--pink-dim); }

/* ── PIN LENGTH ── */
.pg-pin-row { display: flex; gap: 0.5rem; }
.pg-pin-btn {
  flex: 1; padding: 0.55rem; border: 1px solid var(--border-hi);
  border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 0.9rem;
  font-weight: 600; color: var(--text-dim); transition: all var(--tr);
}
.pg-pin-btn:hover { border-color: var(--pink); color: var(--pink); }
.pg-pin-btn.active { border-color: var(--pink); background: var(--pink-dim); color: var(--pink); }

/* ── TOGGLES ── */
.pg-toggles-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem;
}
.pg-toggle {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.6rem 0.9rem; border: 1px solid var(--border);
  border-radius: var(--radius-xs); cursor: pointer; transition: all var(--tr);
  user-select: none; position: relative;
}
.pg-toggle:hover { border-color: var(--border-hi); }
.pg-toggle.active { border-color: var(--pink); background: var(--pink-dim); }
.pg-toggle-box {
  width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid var(--border-hi);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: all var(--tr); font-size: 0.65rem;
}
.pg-toggle.active .pg-toggle-box { background: var(--pink); border-color: var(--pink); color: var(--bg); }
.pg-toggle-lbl { font-size: 0.82rem; font-weight: 600; color: var(--text-dim); }
.pg-toggle.active .pg-toggle-lbl { color: var(--pink); }
.pg-toggle-chars {
  font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-muted);
  margin-left: auto;
}
.pg-warn {
  margin-top: 0.75rem; padding: 0.5rem 0.85rem;
  background: rgba(251,146,60,0.08); border: 1px solid rgba(251,146,60,0.2);
  border-radius: var(--radius-xs); font-size: 0.78rem; color: var(--orange);
  font-family: var(--font-mono); display: none;
}
.pg-warn.show { display: block; }

/* ── EXCLUDE INPUT ── */
.pg-exclude-toggle {
  display: flex; align-items: center; gap: 0.55rem;
  margin-top: 0.75rem; cursor: pointer; font-size: 0.8rem; color: var(--text-muted);
  user-select: none; transition: color var(--tr);
}
.pg-exclude-toggle:hover { color: var(--text-dim); }
.pg-exclude-toggle input[type=checkbox] { accent-color: var(--pink); }
.pg-exclude-input {
  margin-top: 0.65rem; display: none; width: 100%;
  background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius-xs);
  padding: 0.6rem 0.85rem; color: var(--text); font-family: var(--font-mono); font-size: 0.85rem;
  outline: none; transition: border-color var(--tr);
}
.pg-exclude-input:focus { border-color: var(--pink); }
.pg-exclude-input.show { display: block; }

/* ── BULK ── */
.pg-bulk-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.pg-bulk-btn {
  flex: 1; padding: 0.55rem; border: 1px solid var(--border-hi);
  border-radius: var(--radius-xs); font-family: var(--font-mono);
  font-size: 0.88rem; font-weight: 600; color: var(--text-dim); transition: all var(--tr);
}
.pg-bulk-btn:hover { border-color: var(--pink); color: var(--pink); }
.pg-bulk-btn.active { border-color: var(--pink); background: var(--pink-dim); color: var(--pink); }

/* ── BULK LIST ── */
.pg-bulk-list { display: none; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.pg-bulk-list.show { display: flex; }
.pg-bulk-item {
  display: flex; align-items: center; gap: 0.75rem;
  background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-xs);
  padding: 0.7rem 1rem;
}
.pg-bulk-item-num {
  font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted);
  min-width: 20px; text-align: right;
}
.pg-bulk-item-pwd {
  flex: 1; font-family: var(--font-mono); font-size: 0.85rem;
  color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  cursor: text; user-select: all;
}
.pg-bulk-item-copy {
  padding: 0.28rem 0.65rem; border: 1px solid var(--border-hi);
  border-radius: 5px; font-size: 0.72rem; font-family: var(--font-mono);
  color: var(--text-muted); transition: all var(--tr); flex-shrink: 0;
}
.pg-bulk-item-copy:hover { border-color: var(--pink); color: var(--pink); }
.pg-bulk-item-copy.copied { border-color: var(--pink); color: var(--pink); background: var(--pink-dim); }
.pg-bulk-actions { display: flex; gap: 0.6rem; }
.pg-bulk-copy-all {
  flex: 1; padding: 0.6rem; border: 1px solid var(--border-hi); border-radius: var(--radius-xs);
  font-size: 0.82rem; font-weight: 600; color: var(--text-dim); transition: all var(--tr);
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
}
.pg-bulk-copy-all:hover { border-color: var(--pink); color: var(--pink); }
.pg-bulk-download {
  flex: 1; padding: 0.6rem; background: var(--bg3); border: 1px solid var(--border-hi);
  border-radius: var(--radius-xs); font-size: 0.82rem; font-weight: 600;
  color: var(--text-dim); transition: all var(--tr);
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
}
.pg-bulk-download:hover { border-color: var(--purple); color: var(--purple); }

/* ── GENERATE BUTTON ── */
.pg-gen-btn {
  width: 100%; padding: 0.9rem; background: var(--pink); color: var(--bg);
  border-radius: var(--radius-sm); font-weight: 800; font-size: 1rem;
  letter-spacing: -0.01em; transition: all 0.2s; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center; gap: 0.55rem;
  box-shadow: 0 6px 24px var(--pink-glow), 0 2px 6px rgba(0,0,0,0.4);
  margin-bottom: 0.65rem;
}
.pg-gen-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px var(--pink-glow); }
.pg-gen-btn:active { transform: translateY(0); }
.pg-gen-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 60%);
  pointer-events: none;
}
.pg-kb-hint {
  text-align: center; font-family: var(--font-mono); font-size: 0.68rem;
  color: var(--text-muted); letter-spacing: 0.04em;
}
.pg-kb-hint kbd {
  padding: 0.1rem 0.35rem; background: var(--bg3); border: 1px solid var(--border-hi);
  border-radius: 4px; font-size: 0.65rem; font-family: var(--font-mono);
}

/* ── HISTORY ── */
.pg-history { padding: 4rem 1.5rem; }
.pg-history-inner { max-width: 860px; margin: 0 auto; }
.pg-history-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.25rem;
}
.pg-history-title {
  font-family: var(--font-head); font-size: 1.2rem; font-weight: 800;
  letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.5rem;
}
.pg-history-count {
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);
  background: var(--bg3); padding: 0.15rem 0.5rem; border-radius: 5px;
}
.pg-history-clear {
  font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);
  padding: 0.35rem 0.75rem; border: 1px solid var(--border); border-radius: 6px;
  transition: all var(--tr);
}
.pg-history-clear:hover { border-color: var(--red); color: var(--red); }
.pg-history-empty {
  text-align: center; padding: 3rem; font-family: var(--font-mono);
  font-size: 0.85rem; color: var(--text-muted); display: none;
}
.pg-history-empty.show { display: block; }
.pg-history-list { display: flex; flex-direction: column; gap: 0.5rem; }
.pg-history-item {
  display: flex; align-items: center; gap: 0.75rem;
  background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-xs);
  padding: 0.8rem 1.1rem; transition: all var(--tr);
}
.pg-history-item:hover { border-color: var(--border-hi); }
.pg-history-num {
  font-family: var(--font-mono); font-size: 0.65rem;
  color: var(--text-muted); min-width: 22px;
}
.pg-history-pwd {
  flex: 1; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: text; user-select: all;
}
.pg-history-date { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); flex-shrink: 0; }
.pg-history-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }
.pg-history-btn {
  padding: 0.25rem 0.55rem; border: 1px solid var(--border); border-radius: 5px;
  font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted);
  transition: all var(--tr);
}
.pg-history-btn:hover { border-color: var(--pink); color: var(--pink); }
.pg-history-btn.del:hover { border-color: var(--red); color: var(--red); }
.pg-history-btn.copied { border-color: var(--pink); color: var(--pink); background: var(--pink-dim); }

/* ── FOOTER ── */
.pg-footer {
  border-top: 1px solid var(--border); padding: 2.5rem 1.5rem;
  text-align: center;
}
.pg-footer-inner { max-width: 860px; margin: 0 auto; }
.pg-footer-logo {
  font-family: var(--font-head); font-size: 1.25rem; font-weight: 800;
  letter-spacing: -0.04em; margin-bottom: 0.5rem; color: var(--text);
}
.pg-footer-logo span { color: var(--pink); }
.pg-footer-sub { font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono); }

/* ── TOAST ── */
.pg-toast {
  position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 999;
  background: var(--card); border: 1px solid var(--border-hi);
  padding: 0.7rem 1.1rem; border-radius: var(--radius-sm);
  font-size: 0.82rem; font-family: var(--font-mono);
  box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.55rem;
  transform: translateY(80px); opacity: 0;
  transition: all 0.28s cubic-bezier(0.4,0,0.2,1); pointer-events: none;
}
.pg-toast.show { transform: translateY(0); opacity: 1; }
.pg-toast-icon { color: var(--pink); }

/* ── PASSPHRASE INFO ── */
.pg-phrase-info {
  background: var(--pink-dim2); border: 1px solid rgba(244,114,182,0.15);
  border-radius: var(--radius-xs); padding: 0.75rem 1rem;
  font-size: 0.82rem; color: var(--text-dim); line-height: 1.6;
  margin-bottom: 0.5rem; font-family: var(--font-mono);
}
.pg-phrase-example { color: var(--pink); margin-top: 0.35rem; }

/* ── RESPONSIVE ── */
@media(max-width:640px) {
  .pg-nav { padding: 0 1rem; }
  .pg-hero { min-height: 70vh; padding: 4rem 1rem 2.5rem; }
  .pg-card { padding: 1.1rem 1.25rem; }
  .pg-pwd-display { padding: 1.1rem 1.25rem; }
  .pg-toggles-grid { grid-template-columns: 1fr; }
  .pg-bulk-row { flex-wrap: wrap; }
  .pg-mode-row { flex-direction: column; }
  .pg-pwd-text { font-size: 0.95rem; }
  .pg-history { padding: 2.5rem 1rem; }
  .pg-history-date { display: none; }
}
`;

// ── Word list for passphrase ─────────────────────────────
const WORDS = [
  'apple','brave','cloud','dance','eagle','flame','grace','happy','ivory','joker',
  'karma','light','magic','noble','ocean','peace','queen','river','storm','tiger',
  'ultra','vivid','water','xenon','yacht','zebra','alpha','blaze','crisp','drift',
  'ember','frost','globe','hoist','input','jewel','knack','laser','mirth','nerve',
  'orbit','pixel','quest','relay','sharp','trend','unity','vigor','width','yield',
  'amber','bones','cable','depot','elite','forge','grant','hazel','irony','joust',
  'kneel','lemon','moose','navel','onion','prism','quilt','raven','swipe','thyme',
  'udder','vault','waltz','xerox','yodel','zones','adobe','brush','chess','dwell',
  'envy','flute','gnome','hatch','ingot','jelly','kitty','lodge','maple','ninth',
  'ozone','plumb','quirk','ranch','spoke','talon','usher','venom','wrist','zonal',
  'agile','bloom','craft','dunce','epoch','flair','glyph','hinge','infer','jinx',
  'knave','lyric','marsh','nudge','optic','plaza','quota','rivet','snare','trove',
  'umbra','verge','whirl','xeric','yearn','zippy','azure','blend','chime','drape',
  'exert','frown','glaze','hunts','imply','juggle','khaki','latch','mimic','notch',
  'oxide','pulse','quiet','rogue','scone','twirl','urban','video','woven','xylol',
  'yummy','zippo','ample','brisk','clump','depot','evoke','finch','glint','hedge',
  'irate','jaunt','knelt','llama','mynah','nifty','ovoid','perch','quaff','runic',
  'skirt','thump','unwed','valid','whelp','xeric','yeoman','zombi','adore','brood',
  'cycle','dread','exude','folly','guile','hippo','impel','judge','kapok','larva',
];

export default function PasswordGenerator() {
  useEffect(() => {
    const root = document.getElementById('pg-root');
    if (!root) return;

    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const G = (id) => document.getElementById(id);

    // ── Character Sets ──────────────────────────────────
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const NUMS  = '0123456789';
    const SYMS  = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const AMBIGUOUS = 'Il1O0o';

    // ── State ───────────────────────────────────────────
    const state = {
      mode: 'password',
      length: 16,
      pinLength: 6,
      uppercase: true, lowercase: true, numbers: true, symbols: true,
      noAmbiguous: false,
      excludeChars: '',
      showExclude: false,
      bulkCount: 1,
      currentPwd: '',
      bulkPwds: [],
      history: [],
      copiedId: null,
      strength: 0,
    };

    // ── Load from localStorage ──────────────────────────
    try {
      const saved = JSON.parse(localStorage.getItem('pg-settings') || '{}');
      if (saved.length) state.length = saved.length;
      if (saved.mode) state.mode = saved.mode;
      if (saved.pinLength) state.pinLength = saved.pinLength;
      if (typeof saved.uppercase === 'boolean') state.uppercase = saved.uppercase;
      if (typeof saved.lowercase === 'boolean') state.lowercase = saved.lowercase;
      if (typeof saved.numbers === 'boolean') state.numbers = saved.numbers;
      if (typeof saved.symbols === 'boolean') state.symbols = saved.symbols;
      if (typeof saved.noAmbiguous === 'boolean') state.noAmbiguous = saved.noAmbiguous;
      const hist = JSON.parse(localStorage.getItem('pg-history') || '[]');
      state.history = Array.isArray(hist) ? hist : [];
    } catch {}

    // ── Save settings ────────────────────────────────────
    function saveSettings() {
      try {
        localStorage.setItem('pg-settings', JSON.stringify({
          length: state.length, mode: state.mode, pinLength: state.pinLength,
          uppercase: state.uppercase, lowercase: state.lowercase,
          numbers: state.numbers, symbols: state.symbols, noAmbiguous: state.noAmbiguous,
        }));
      } catch {}
    }
    function saveHistory() {
      try { localStorage.setItem('pg-history', JSON.stringify(state.history)); } catch {}
    }

    // ── Crypto random ───────────────────────────────────
    function cryptoRand(max) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    function cryptoRandArr(len) {
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      return arr;
    }

    // ── Generate ─────────────────────────────────────────
    function generatePassword() {
      if (state.mode === 'pin') return generatePIN();
      if (state.mode === 'passphrase') return generatePassphrase();

      let chars = '';
      if (state.uppercase) chars += UPPER;
      if (state.lowercase) chars += LOWER;
      if (state.numbers)   chars += NUMS;
      if (state.symbols)   chars += SYMS;

      if (state.noAmbiguous) {
        AMBIGUOUS.split('').forEach(c => { chars = chars.split(c).join(''); });
      }
      if (state.excludeChars) {
        state.excludeChars.split('').forEach(c => { chars = chars.split(c).join(''); });
      }
      if (!chars) return 'Enable at least one option!';

      const arr = cryptoRandArr(state.length);
      return Array.from(arr).map(n => chars[n % chars.length]).join('');
    }

    function generatePIN() {
      const arr = cryptoRandArr(state.pinLength);
      return Array.from(arr).map(n => n % 10).join('');
    }

    function generatePassphrase() {
      const arr = cryptoRandArr(4);
      const words = [WORDS[arr[0] % WORDS.length], WORDS[arr[1] % WORDS.length], WORDS[arr[2] % WORDS.length]];
      const num = arr[3] % 1000;
      return words.join('-') + '-' + String(num).padStart(3, '0');
    }

    // ── Strength ─────────────────────────────────────────
    function calcStrength(pwd) {
      if (!pwd || pwd.includes('!') && pwd.length < 5) return 0;
      let score = 0;
      if (pwd.length >= 8)  score++;
      if (pwd.length >= 12) score++;
      if (pwd.length >= 16) score++;
      if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      // passphrase bonus
      if (pwd.includes('-') && pwd.split('-').length >= 3) score += 2;
      return Math.min(4, Math.floor(score / 1.5));
    }

    const STR_LABELS = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const STR_COLORS = ['#f87171', '#fb923c', '#fbbf24', '#4ade80', '#2dd4bf'];

    function renderStrength(pwd) {
      const s = calcStrength(pwd);
      state.strength = s;
      const segs = root.querySelectorAll('.pg-strength-seg');
      segs.forEach((seg, i) => {
        seg.style.background = i <= s ? STR_COLORS[s] : 'var(--bg3)';
        seg.style.boxShadow = i <= s ? `0 0 6px ${STR_COLORS[s]}` : 'none';
        seg.classList.toggle('filled', i <= s);
      });
      const valEl = G('pg-strength-val');
      if (valEl) {
        valEl.textContent = STR_LABELS[s];
        valEl.style.color = STR_COLORS[s];
      }
    }

    // ── Main generate handler ─────────────────────────────
    function doGenerate() {
      if (state.bulkCount === 1) {
        const pwd = generatePassword();
        state.currentPwd = pwd;
        state.bulkPwds = [];
        renderSinglePwd(pwd);
        renderStrength(pwd);
        addToHistory(pwd);
        renderBulkList();
        G('pg-bulk-list')?.classList.remove('show');
      } else {
        const pwds = Array.from({ length: state.bulkCount }, () => generatePassword());
        state.bulkPwds = pwds;
        state.currentPwd = pwds[0];
        renderSinglePwd(pwds[0]);
        renderStrength(pwds[0]);
        pwds.forEach(p => addToHistory(p));
        renderBulkList();
        const bl = G('pg-bulk-list');
        if (bl) bl.classList.add('show');
      }
      renderHistory();
      saveHistory();
      checkWarn();
    }

    function renderSinglePwd(pwd) {
      const el = G('pg-pwd-text');
      if (!el) return;
      el.classList.remove('flash');
      void el.offsetWidth; // reflow
      el.classList.add('flash');
      el.textContent = pwd;
    }

    function renderBulkList() {
      const list = G('pg-bulk-items');
      if (!list) return;
      list.innerHTML = '';
      state.bulkPwds.forEach((pwd, idx) => {
        const item = document.createElement('div');
        item.className = 'pg-bulk-item';
        item.innerHTML = `
          <span class="pg-bulk-item-num">${idx + 1}.</span>
          <span class="pg-bulk-item-pwd">${pwd}</span>
          <button class="pg-bulk-item-copy" data-idx="${idx}">copy</button>
        `;
        item.querySelector('.pg-bulk-item-copy').addEventListener('click', function() {
          navigator.clipboard.writeText(pwd).then(() => {
            this.textContent = '✓ copied';
            this.classList.add('copied');
            T(() => { this.textContent = 'copy'; this.classList.remove('copied'); }, 2000);
            showToast('✓ Copied to clipboard');
          });
        });
        list.appendChild(item);
      });
    }

    // ── History ──────────────────────────────────────────
    function addToHistory(pwd) {
      if (!pwd || pwd.includes('!') && pwd.length < 5) return;
      const entry = { pwd, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) };
      state.history = [entry, ...state.history].slice(0, 10);
    }

    function renderHistory() {
      const list = G('pg-history-list');
      const empty = G('pg-history-empty');
      const count = G('pg-history-count');
      if (!list) return;
      if (count) count.textContent = state.history.length;
      list.innerHTML = '';
      if (state.history.length === 0) {
        if (empty) empty.classList.add('show');
        return;
      }
      if (empty) empty.classList.remove('show');
      state.history.forEach((entry, idx) => {
        const item = document.createElement('div');
        item.className = 'pg-history-item';
        const truncated = entry.pwd.length > 30 ? entry.pwd.slice(0, 30) + '…' : entry.pwd;
        item.innerHTML = `
          <span class="pg-history-num">${idx + 1}.</span>
          <span class="pg-history-pwd" title="${entry.pwd}">${truncated}</span>
          <span class="pg-history-date">${entry.time}</span>
          <div class="pg-history-actions">
            <button class="pg-history-btn copy-btn">copy</button>
            <button class="pg-history-btn del">del</button>
          </div>
        `;
        item.querySelector('.copy-btn').addEventListener('click', function() {
          navigator.clipboard.writeText(entry.pwd).then(() => {
            this.textContent = '✓';
            this.classList.add('copied');
            T(() => { this.textContent = 'copy'; this.classList.remove('copied'); }, 2000);
            showToast('✓ Copied');
          });
        });
        item.querySelector('.del').addEventListener('click', () => {
          state.history = state.history.filter((_, i) => i !== idx);
          saveHistory();
          renderHistory();
        });
        list.appendChild(item);
      });
    }

    // ── UI sync ───────────────────────────────────────────
    function syncUI() {
      // Mode
      root.querySelectorAll('.pg-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === state.mode);
      });
      // Show/hide sections
      const pwdOpts = G('pg-pwd-options');
      const phraseInfo = G('pg-phrase-info');
      const pinOpts = G('pg-pin-opts');
      const lengthSection = G('pg-length-section');
      if (state.mode === 'password') {
        if (pwdOpts) pwdOpts.style.display = '';
        if (phraseInfo) phraseInfo.style.display = 'none';
        if (pinOpts) pinOpts.style.display = 'none';
        if (lengthSection) lengthSection.style.display = '';
      } else if (state.mode === 'passphrase') {
        if (pwdOpts) pwdOpts.style.display = 'none';
        if (phraseInfo) phraseInfo.style.display = '';
        if (pinOpts) pinOpts.style.display = 'none';
        if (lengthSection) lengthSection.style.display = 'none';
      } else {
        if (pwdOpts) pwdOpts.style.display = 'none';
        if (phraseInfo) phraseInfo.style.display = 'none';
        if (pinOpts) pinOpts.style.display = '';
        if (lengthSection) lengthSection.style.display = 'none';
      }
      // Length
      const slider = G('pg-length-slider');
      const lenVal = G('pg-length-val');
      if (slider) slider.value = state.length;
      if (lenVal) lenVal.textContent = state.length;
      // Quick btns
      root.querySelectorAll('.pg-quick-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.len) === state.length);
      });
      // PIN length
      root.querySelectorAll('.pg-pin-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.pin) === state.pinLength);
      });
      // Toggles
      ['uppercase', 'lowercase', 'numbers', 'symbols', 'noAmbiguous'].forEach(key => {
        const el = G(`pg-toggle-${key}`);
        if (el) el.classList.toggle('active', state[key]);
      });
      // Bulk
      root.querySelectorAll('.pg-bulk-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.bulk) === state.bulkCount);
      });
      // Slider gradient
      if (slider) {
        const pct = ((state.length - 8) / (128 - 8)) * 100;
        slider.style.background = `linear-gradient(to right, var(--pink) ${pct}%, var(--bg3) ${pct}%)`;
      }
    }

    function checkWarn() {
      const warn = G('pg-warn');
      if (!warn || state.mode !== 'password') { if (warn) warn.classList.remove('show'); return; }
      const count = [state.uppercase, state.lowercase, state.numbers, state.symbols].filter(Boolean).length;
      warn.classList.toggle('show', count < 2);
    }

    // ── Event bindings ────────────────────────────────────

    // Mode buttons
    root.querySelectorAll('.pg-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.mode = btn.dataset.mode;
        syncUI(); doGenerate(); saveSettings();
      });
    });

    // Length slider
    const slider = G('pg-length-slider');
    if (slider) {
      slider.value = state.length;
      slider.addEventListener('input', () => {
        state.length = parseInt(slider.value);
        const lenVal = G('pg-length-val');
        if (lenVal) lenVal.textContent = state.length;
        root.querySelectorAll('.pg-quick-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.len) === state.length);
        });
        const pct = ((state.length - 8) / (128 - 8)) * 100;
        slider.style.background = `linear-gradient(to right, var(--pink) ${pct}%, var(--bg3) ${pct}%)`;
        doGenerate(); saveSettings();
      });
    }

    // Quick length buttons
    root.querySelectorAll('.pg-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.length = parseInt(btn.dataset.len);
        syncUI(); doGenerate(); saveSettings();
      });
    });

    // PIN length buttons
    root.querySelectorAll('.pg-pin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.pinLength = parseInt(btn.dataset.pin);
        syncUI(); doGenerate(); saveSettings();
      });
    });

    // Toggles
    ['uppercase', 'lowercase', 'numbers', 'symbols', 'noAmbiguous'].forEach(key => {
      const el = G(`pg-toggle-${key}`);
      if (el) el.addEventListener('click', () => {
        state[key] = !state[key];
        syncUI(); doGenerate(); saveSettings();
      });
    });

    // Exclude chars
    const excludeChk = G('pg-exclude-check');
    const excludeInput = G('pg-exclude-input');
    if (excludeChk) excludeChk.addEventListener('change', () => {
      state.showExclude = excludeChk.checked;
      if (excludeInput) {
        excludeInput.classList.toggle('show', state.showExclude);
        if (!state.showExclude) { state.excludeChars = ''; if (excludeInput) excludeInput.value = ''; doGenerate(); }
      }
    });
    if (excludeInput) excludeInput.addEventListener('input', () => {
      state.excludeChars = excludeInput.value;
      doGenerate();
    });

    // Bulk buttons
    root.querySelectorAll('.pg-bulk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.bulkCount = parseInt(btn.dataset.bulk);
        syncUI(); doGenerate();
      });
    });

    // Generate button
    const genBtn = G('pg-gen-btn');
    if (genBtn) genBtn.addEventListener('click', doGenerate);

    // Copy main password
    const copyBtn = G('pg-copy-main');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      if (!state.currentPwd) return;
      navigator.clipboard.writeText(state.currentPwd).then(() => {
        copyBtn.classList.add('copied');
        const txt = copyBtn.querySelector('.copy-txt');
        if (txt) txt.textContent = '✓ Copied!';
        showToast('✓ Copied to clipboard');
        T(() => {
          copyBtn.classList.remove('copied');
          if (txt) txt.textContent = 'Copy';
        }, 2000);
      });
    });

    // Bulk copy all
    const copyAllBtn = G('pg-copy-all');
    if (copyAllBtn) copyAllBtn.addEventListener('click', () => {
      const all = state.bulkPwds.join('\n');
      navigator.clipboard.writeText(all).then(() => {
        copyAllBtn.textContent = '✓ All Copied!';
        showToast('✓ All passwords copied');
        T(() => { copyAllBtn.textContent = '⧉ Copy All'; }, 2000);
      });
    });

    // Bulk download
    const dlBtn = G('pg-download-btn');
    if (dlBtn) dlBtn.addEventListener('click', () => {
      const content = state.bulkPwds.length > 1 ? state.bulkPwds.join('\n') : state.currentPwd;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'passwords.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      T(() => URL.revokeObjectURL(url), 1000);
      showToast('✓ Downloaded passwords.txt');
    });

    // Clear history
    const clearBtn = G('pg-clear-history');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      state.history = [];
      saveHistory(); renderHistory();
      showToast('History cleared');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); doGenerate(); }
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyC' && state.currentPwd) {
        navigator.clipboard.writeText(state.currentPwd).then(() => showToast('✓ Copied'));
      }
    });

    // ── Toast ─────────────────────────────────────────────
    let toastTimer = null;
    function showToast(msg) {
      const toast = G('pg-toast');
      const toastMsg = G('pg-toastMsg');
      if (!toast || !toastMsg) return;
      toastMsg.textContent = msg;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = T(() => toast.classList.remove('show'), 2400);
    }

    // ── Smooth slider fill ────────────────────────────────
    if (slider) {
      const pct = ((state.length - 8) / (128 - 8)) * 100;
      slider.style.background = `linear-gradient(to right, var(--pink) ${pct}%, var(--bg3) ${pct}%)`;
    }

    // ── Init ──────────────────────────────────────────────
    syncUI();
    renderHistory();
    doGenerate();

    return () => { timers.forEach(clearTimeout); };
  }, []);

  return (
    <div id="pg-root" className="pg-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── NAV ── */}
      <nav className="pg-nav">
        <div className="pg-nav-logo">
          <div className="logo-icon">🔐</div>
          Password Generator
          <span className="logo-sub">by TooL Void</span>
        </div>
        <div className="pg-nav-right">
          <span className="pg-nav-pill">Crypto Secure</span>
          <Link href="/" className="pg-back-btn">← All Tools</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pg-hero">
        <div className="pg-hero-grid" aria-hidden="true" />
        <div className="pg-hero-glow" aria-hidden="true" />
        <div className="pg-hero-glow2" aria-hidden="true" />
        <div className="pg-hero-content">
          <div className="pg-hero-badge">
            <span className="pg-hero-badge-dot" />
            crypto.getRandomValues() — Never Math.random()
          </div>
          <h1>
            Unbreakable<br />
            <span className="accent">Passwords.</span><br />
            Instantly.
          </h1>
          <p className="pg-hero-sub">
            Cryptographically secure passwords, passphrases & PINs. All generated in your browser — nothing ever leaves your device.
          </p>
          <a href="#pg-tool" className="pg-hero-cta">
            <span>Start Generating</span>
            <span>⚡</span>
          </a>
        </div>
      </section>

      {/* ── MAIN TOOL ── */}
      <section className="pg-tool" id="pg-tool">
        <div className="pg-tool-inner">
          <div className="pg-tool-header">
            <div className="pg-tool-label">⚡ Generator</div>
            <h2 className="pg-tool-title">Generate Your Password</h2>
            <p className="pg-tool-sub">Choose your settings, hit generate — or press Space anywhere.</p>
          </div>

          {/* ── PASSWORD DISPLAY ── */}
          <div className="pg-pwd-display">
            <div className="pg-pwd-meta">
              <span className="pg-pwd-meta-dot" />
              LIVE OUTPUT
            </div>
            <div className="pg-pwd-text-wrap">
              <div className="pg-pwd-text" id="pg-pwd-text" aria-label="Generated password">
                Generating…
              </div>
              <button className="pg-pwd-copy-btn" id="pg-copy-main" aria-label="Copy password">
                <span>⧉</span>
                <span className="copy-txt">Copy</span>
              </button>
            </div>
          </div>

          {/* ── STRENGTH ── */}
          <div className="pg-strength">
            <div className="pg-strength-row">
              <span className="pg-strength-label">PASSWORD STRENGTH</span>
              <span className="pg-strength-val" id="pg-strength-val" style={{ color: '#fb923c' }}>Fair</span>
            </div>
            <div className="pg-strength-bar">
              <div className="pg-strength-seg" />
              <div className="pg-strength-seg" />
              <div className="pg-strength-seg" />
              <div className="pg-strength-seg" />
              <div className="pg-strength-seg" />
            </div>
          </div>

          {/* ── MODE ── */}
          <div className="pg-card">
            <div className="pg-card-title">
              <span className="pg-card-title-icon">◎</span>
              GENERATION MODE
            </div>
            <div className="pg-mode-row">
              <button className="pg-mode-btn active" data-mode="password">🔑 Password</button>
              <button className="pg-mode-btn" data-mode="passphrase">💬 Passphrase</button>
              <button className="pg-mode-btn" data-mode="pin">🔢 PIN</button>
            </div>

            {/* Length — hidden in passphrase/pin mode */}
            <div id="pg-length-section">
              <div className="pg-length-row">
                <span className="pg-length-lbl">Length</span>
                <span className="pg-length-val" id="pg-length-val">16</span>
              </div>
              <input
                type="range" className="pg-slider" id="pg-length-slider"
                min="8" max="128" step="1" defaultValue="16"
              />
              <div className="pg-quick-btns">
                {[8, 12, 16, 24, 32, 64].map(l => (
                  <button key={l} className={`pg-quick-btn${l === 16 ? ' active' : ''}`} data-len={l}>{l}</button>
                ))}
              </div>
            </div>

            {/* PIN length */}
            <div id="pg-pin-opts" style={{ display: 'none' }}>
              <div className="pg-length-row" style={{ marginBottom: '0.5rem' }}>
                <span className="pg-length-lbl">PIN Length</span>
              </div>
              <div className="pg-pin-row">
                <button className="pg-pin-btn" data-pin="4">4 digits</button>
                <button className="pg-pin-btn active" data-pin="6">6 digits</button>
                <button className="pg-pin-btn" data-pin="8">8 digits</button>
              </div>
            </div>

            {/* Passphrase info */}
            <div id="pg-phrase-info" className="pg-phrase-info" style={{ display: 'none' }}>
              Format: <strong>word-word-word-number</strong>
              <div className="pg-phrase-example">e.g. river-noble-flame-429</div>
            </div>
          </div>

          {/* ── CHARACTER OPTIONS ── */}
          <div className="pg-card" id="pg-pwd-options">
            <div className="pg-card-title">
              <span className="pg-card-title-icon">◈</span>
              CHARACTER SETS
            </div>
            <div className="pg-toggles-grid">
              <div className="pg-toggle active" id="pg-toggle-uppercase">
                <div className="pg-toggle-box">✓</div>
                <span className="pg-toggle-lbl">Uppercase</span>
                <span className="pg-toggle-chars">A–Z</span>
              </div>
              <div className="pg-toggle active" id="pg-toggle-lowercase">
                <div className="pg-toggle-box">✓</div>
                <span className="pg-toggle-lbl">Lowercase</span>
                <span className="pg-toggle-chars">a–z</span>
              </div>
              <div className="pg-toggle active" id="pg-toggle-numbers">
                <div className="pg-toggle-box">✓</div>
                <span className="pg-toggle-lbl">Numbers</span>
                <span className="pg-toggle-chars">0–9</span>
              </div>
              <div className="pg-toggle active" id="pg-toggle-symbols">
                <div className="pg-toggle-box">✓</div>
                <span className="pg-toggle-lbl">Symbols</span>
                <span className="pg-toggle-chars">!@#…</span>
              </div>
              <div className="pg-toggle" id="pg-toggle-noAmbiguous">
                <div className="pg-toggle-box" />
                <span className="pg-toggle-lbl">No Ambiguous</span>
                <span className="pg-toggle-chars">Il1O0</span>
              </div>
            </div>

            <label className="pg-exclude-toggle">
              <input type="checkbox" id="pg-exclude-check" />
              Exclude specific characters
            </label>
            <input
              type="text" className="pg-exclude-input" id="pg-exclude-input"
              placeholder='Characters to exclude e.g. ~`\|'
            />

            <div className="pg-warn" id="pg-warn">
              ⚠ Enable more character types for a stronger password
            </div>
          </div>

          {/* ── BULK ── */}
          <div className="pg-card">
            <div className="pg-card-title">
              <span className="pg-card-title-icon">⊞</span>
              BULK GENERATION
            </div>
            <div className="pg-bulk-row">
              {[1, 2, 5, 10].map(n => (
                <button key={n} className={`pg-bulk-btn${n === 1 ? ' active' : ''}`} data-bulk={n}>
                  {n === 1 ? '1 (single)' : `${n}`}
                </button>
              ))}
            </div>

            {/* Bulk list (shown when count > 1) */}
            <div className="pg-bulk-list" id="pg-bulk-list">
              <div id="pg-bulk-items" />
              <div className="pg-bulk-actions" style={{ marginTop: '0.5rem' }}>
                <button className="pg-bulk-copy-all" id="pg-copy-all">⧉ Copy All</button>
                <button className="pg-bulk-download" id="pg-download-btn">⬇ Download .txt</button>
              </div>
            </div>
          </div>

          {/* ── GENERATE ── */}
          <button className="pg-gen-btn" id="pg-gen-btn">
            <span>🔄</span>
            <span>Generate Password</span>
          </button>
          <p className="pg-kb-hint">
            Press <kbd>Space</kbd> or <kbd>Enter</kbd> anywhere to generate · <kbd>Ctrl+C</kbd> to copy
          </p>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section className="pg-history">
        <div className="pg-history-inner">
          <div className="pg-history-header">
            <div className="pg-history-title">
              📋 History
              <span className="pg-history-count" id="pg-history-count">0</span>
            </div>
            <button className="pg-history-clear" id="pg-clear-history">Clear All</button>
          </div>
          <div className="pg-history-empty show" id="pg-history-empty">
            No passwords generated yet — start generating above ↑
          </div>
          <div className="pg-history-list" id="pg-history-list" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pg-footer">
        <div className="pg-footer-inner">
          <div className="pg-footer-logo"><span>Tool</span>Site · Password Generator</div>
          <p className="pg-footer-sub">100% client-side · crypto.getRandomValues() · No server · No tracking</p>
        </div>
      </footer>

      {/* ── TOAST ── */}
      <div className="pg-toast" id="pg-toast" role="status">
        <span className="pg-toast-icon">✓</span>
        <span id="pg-toastMsg">Copied!</span>
      </div>
    </div>
  );
}
