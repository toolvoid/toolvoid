'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

.loan-root, .loan-root * { box-sizing: border-box; }
.loan-root {
  --bg: #0a0a0f;
  --bg-soft: #12131c;
  --panel: rgba(18, 19, 29, 0.82);
  --panel-strong: rgba(15, 16, 24, 0.94);
  --text: #f5f7ff;
  --muted: #a9adc6;
  --soft: #727796;
  --line: rgba(255,255,255,0.08);
  --line-strong: rgba(255,255,255,0.16);
  --primary: #4d96ff;
  --secondary: #00e5a8;
  --accent: #ffb800;
  --theme: #e879f9;
  --danger: #ff7272;
  --danger-soft: rgba(255,114,114,0.12);
  --safe-soft: rgba(0,229,168,0.12);
  --shadow: 0 24px 70px rgba(0,0,0,0.35);
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(232,121,249,0.18), transparent 24%),
    radial-gradient(circle at 82% 12%, rgba(77,150,255,0.16), transparent 24%),
    radial-gradient(circle at 56% 100%, rgba(255,184,0,0.08), transparent 28%),
    linear-gradient(180deg, #090910 0%, #0a0a0f 45%, #10121b 100%);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}
.loan-root a { color: inherit; text-decoration: none; }
.loan-shell { width: min(1380px, calc(100% - 32px)); margin: 0 auto; }
.loan-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 0;
  backdrop-filter: blur(18px);
}
.loan-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
}
.loan-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(232,121,249,0.35);
  background:
    linear-gradient(135deg, rgba(232,121,249,0.2), rgba(77,150,255,0.1)),
    rgba(255,255,255,0.03);
  position: relative;
  overflow: hidden;
}
.loan-mark::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 10px;
  border: 1px solid rgba(232,121,249,0.24);
}
.loan-mark::after {
  content: '';
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 10px;
  height: 10px;
  border-radius: 4px;
  background: var(--theme);
  box-shadow: -13px -2px 0 0 rgba(77,150,255,0.85), -2px -13px 0 0 rgba(0,229,168,0.85);
}
.loan-logo small {
  display: block;
  color: var(--soft);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 11px;
}
.loan-logo strong { display: block; font-size: 1.1rem; }
.loan-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.loan-btn, .loan-pill, .loan-tab {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 11px 16px;
  min-height: 44px;
  color: var(--text);
  background: rgba(255,255,255,0.03);
  transition: 0.2s ease;
}
.loan-btn:hover, .loan-pill:hover, .loan-tab:hover { border-color: rgba(232,121,249,0.42); transform: translateY(-1px); }
.loan-btn.primary {
  background: linear-gradient(135deg, var(--theme), #f4a3ff);
  color: #290733;
  border-color: rgba(232,121,249,0.36);
  box-shadow: 0 10px 32px rgba(232,121,249,0.22);
  font-weight: 700;
}
.loan-hero {
  padding: 46px 0 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.14fr) minmax(360px, 0.86fr);
  gap: 22px;
  align-items: end;
}
.loan-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(232,121,249,0.25);
  background: rgba(232,121,249,0.08);
  color: #f7cbfd;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}
.loan-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--theme);
}
.loan-title {
  margin: 18px 0 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 7vw, 5.8rem);
  line-height: 0.93;
  letter-spacing: -0.06em;
}
.loan-title span {
  background: linear-gradient(135deg, var(--theme), var(--primary) 62%, var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.loan-sub {
  max-width: 760px;
  color: var(--muted);
  font-size: clamp(1rem, 1.8vw, 1.12rem);
  line-height: 1.7;
}
.loan-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.loan-panel {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
  border: 1px solid var(--line);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow);
}
.loan-stat {
  border-radius: 22px;
  padding: 18px;
}
.loan-stat small {
  display: block;
  color: var(--soft);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.loan-stat strong {
  display: block;
  margin-top: 12px;
  font-size: clamp(1.4rem, 2vw, 2.05rem);
  letter-spacing: -0.04em;
}
.loan-stat p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.55;
}
.loan-main {
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(330px, 0.64fr);
  gap: 22px;
  align-items: start;
  padding-bottom: 48px;
}
.loan-stack { display: grid; gap: 18px; }
.loan-card {
  border-radius: 26px;
  padding: 22px;
}
.loan-card-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.loan-card-head h2, .loan-card-head h3 {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.loan-card-head p {
  margin-top: 7px;
  color: var(--muted);
  line-height: 1.6;
  max-width: 660px;
  font-size: 0.92rem;
}
.loan-grid-2, .loan-grid-3, .loan-grid-4 {
  display: grid;
  gap: 14px;
}
.loan-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.loan-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.loan-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.loan-field {
  display: grid;
  gap: 10px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}
.loan-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--soft);
  font-family: 'JetBrains Mono', monospace;
}
.loan-field input {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(0,0,0,0.18);
  color: var(--text);
  outline: none;
}
.loan-field input:focus {
  border-color: rgba(232,121,249,0.45);
  box-shadow: 0 0 0 4px rgba(232,121,249,0.12);
}
.loan-range {
  appearance: none;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(232,121,249,0.55), rgba(77,150,255,0.42));
}
.loan-range::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 0;
  background: var(--theme);
  box-shadow: 0 0 0 4px rgba(232,121,249,0.16);
}
.loan-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.82rem;
}
.loan-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.loan-box {
  padding: 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
}
.loan-box small {
  display: block;
  color: var(--soft);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.loan-box strong {
  display: block;
  margin-top: 8px;
  font-size: 1.45rem;
  letter-spacing: -0.04em;
}
.loan-box span {
  display: block;
  margin-top: 7px;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.88rem;
}
.loan-chart-wrap {
  padding: 16px;
  border-radius: 20px;
  background: rgba(0,0,0,0.16);
  border: 1px solid rgba(255,255,255,0.05);
}
.loan-chart {
  width: 100%;
  height: auto;
  display: block;
}
.loan-print-only { display: none; }
.loan-legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.loan-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 0.84rem;
}
.loan-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.loan-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.loan-pill.active, .loan-tab.active {
  background: linear-gradient(135deg, rgba(232,121,249,0.16), rgba(77,150,255,0.1));
  border-color: rgba(232,121,249,0.34);
}
.loan-risk {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-family: 'JetBrains Mono', monospace;
}
.loan-risk.safe { background: var(--safe-soft); color: #b9ffe9; border: 1px solid rgba(0,229,168,0.22); }
.loan-risk.moderate { background: rgba(255,184,0,0.12); color: #ffe4a3; border: 1px solid rgba(255,184,0,0.22); }
.loan-risk.risky { background: var(--danger-soft); color: #ffd0d0; border: 1px solid rgba(255,114,114,0.22); }
.loan-note {
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  color: var(--muted);
  line-height: 1.6;
  font-size: 0.9rem;
}
.loan-side {
  position: sticky;
  top: 86px;
  display: grid;
  gap: 18px;
}
.loan-result {
  border-radius: 28px;
  padding: 24px;
  background:
    radial-gradient(circle at top right, rgba(232,121,249,0.18), transparent 28%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
}
.loan-kicker {
  color: #f6cbff;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}
.loan-big {
  display: block;
  margin-top: 12px;
  font-size: clamp(2.15rem, 4vw, 3.3rem);
  line-height: 0.96;
  letter-spacing: -0.06em;
  font-family: 'Space Grotesk', sans-serif;
}
.loan-result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}
.loan-cell {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.loan-cell small {
  display: block;
  color: var(--soft);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.loan-cell strong {
  display: block;
  margin-top: 8px;
  font-size: 1.02rem;
}
.loan-meter {
  margin-top: 14px;
  width: 100%;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255,255,255,0.06);
}
.loan-meter span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--secondary), var(--primary), var(--theme));
}
.loan-list {
  display: grid;
  gap: 10px;
}
.loan-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.loan-item-copy strong { display: block; font-size: 0.96rem; }
.loan-item-copy span {
  display: block;
  margin-top: 5px;
  color: var(--muted);
  font-size: 0.84rem;
}
.loan-item-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.loan-table-wrap {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}
.loan-table {
  width: 100%;
  border-collapse: collapse;
}
.loan-table th, .loan-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.9rem;
}
.loan-table th {
  background: rgba(10,10,15,0.92);
  color: var(--soft);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}
.loan-error {
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--danger-soft);
  border: 1px solid rgba(255,114,114,0.24);
  color: #ffd2d2;
  font-size: 0.92rem;
}
.loan-foot {
  padding: 8px 0 44px;
  text-align: center;
  color: var(--soft);
  font-size: 0.84rem;
}
@media (max-width: 1180px) {
  .loan-hero, .loan-main { grid-template-columns: 1fr; }
  .loan-side { position: static; }
}
@media (max-width: 860px) {
  .loan-grid-4, .loan-grid-3, .loan-grid-2, .loan-summary, .loan-result-grid { grid-template-columns: 1fr; }
  .loan-hero-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .loan-shell { width: min(100% - 20px, 1380px); }
  .loan-nav { flex-direction: column; align-items: flex-start; }
  .loan-actions { width: 100%; justify-content: flex-start; }
  .loan-card, .loan-result { padding: 18px; }
  .loan-hero { padding-top: 28px; }
  .loan-hero-grid { grid-template-columns: 1fr; }
}
@media print {
  .loan-nav, .loan-actions, .loan-pills { display: none !important; }
  .loan-root { background: #fff; color: #111; }
  .loan-main, .loan-hero { grid-template-columns: 1fr; }
  .loan-card, .loan-result, .loan-panel { box-shadow: none; background: #fff; border-color: #ddd; }
  .loan-main, .loan-stack, .loan-side, .loan-grid-2, .loan-grid-3, .loan-grid-4, .loan-summary, .loan-hero-grid, .loan-list {
    display: block !important;
  }
  .loan-hero-copy { display: none !important; }
  .loan-hero { padding-top: 0; }
  .loan-range { display: none !important; }
  .loan-field {
    background: #fff;
    border-color: #ddd;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .loan-field input {
    min-height: 40px;
    border-color: #d6d6d6;
    background: #fff;
    color: #111;
    box-shadow: none !important;
  }
  .loan-meta {
    color: #444 !important;
  }
  .loan-card,
  .loan-result,
  .loan-panel,
  .loan-box,
  .loan-item,
  .loan-table-wrap,
  .loan-chart-wrap {
    break-inside: avoid-page;
    page-break-inside: avoid;
    break-before: auto;
    page-break-before: auto;
    margin-bottom: 16px;
  }
  .loan-card-head,
  .loan-note,
  .loan-result-grid,
  .loan-summary,
  .loan-list,
  .loan-table,
  .loan-table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .loan-side {
    margin-top: 16px;
  }
  .loan-chart-wrap .loan-chart,
  .loan-chart-wrap .loan-legend { display: none !important; }
  .loan-print-only { display: block; }
  .loan-note, .loan-box span, .loan-card-head p, .loan-sub, .loan-foot, .loan-item-copy span {
    color: #444 !important;
  }
  .loan-table th { background: #f4f4f4; color: #333; }
}
`;

const STORAGE_KEY = 'toolsite-loan-eligibility-v1';
const HISTORY_LIMIT = 20;

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const numberFmt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

function safeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '∞';
  return currency.format(Math.max(0, value));
}

function formatCompact(value) {
  if (!Number.isFinite(value)) return '∞';
  return numberFmt.format(value);
}

function calcEMI(principal, annualRate, years) {
  const P = Math.max(0, safeNumber(principal));
  const n = Math.max(0, Math.round(safeNumber(years) * 12));
  const r = Math.max(0, safeNumber(annualRate)) / 12 / 100;
  if (P <= 0 || n <= 0) return 0;
  if (r === 0) return P / n;
  const pow = (1 + r) ** n;
  return (P * r * pow) / (pow - 1);
}

function calcLoanFromEMI(targetEMI, annualRate, years) {
  const emi = Math.max(0, safeNumber(targetEMI));
  const n = Math.max(0, Math.round(safeNumber(years) * 12));
  const r = Math.max(0, safeNumber(annualRate)) / 12 / 100;
  if (emi <= 0 || n <= 0) return 0;
  if (r === 0) return emi * n;
  const pow = (1 + r) ** n;
  return emi * ((pow - 1) / (r * pow));
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function PieChart({ expenses, emiLoad, savings }) {
  const total = Math.max(1, expenses + emiLoad + savings);
  const expenseAngle = (expenses / total) * 360;
  const emiAngle = (emiLoad / total) * 360;
  return (
    <svg viewBox="0 0 220 220" className="loan-chart" role="img" aria-label="Budget breakdown">
      <circle cx="110" cy="110" r="84" fill="rgba(255,255,255,0.04)" />
      <path d={arcPath(110, 110, 84, 0, expenseAngle)} fill="#4D96FF" />
      <path d={arcPath(110, 110, 84, expenseAngle, expenseAngle + emiAngle)} fill="#E879F9" />
      <path d={arcPath(110, 110, 84, expenseAngle + emiAngle, 360)} fill="#00E5A8" />
      <circle cx="110" cy="110" r="50" fill="#0f1018" />
      <text x="110" y="104" textAnchor="middle" fill="#f5f7ff" fontSize="13" fontFamily="JetBrains Mono">Budget</text>
      <text x="110" y="124" textAnchor="middle" fill="#e879f9" fontSize="18" fontWeight="700">Mix</text>
    </svg>
  );
}

function BarsChart({ income, expenses, existingEMI, maxEMI, savings }) {
  const values = [income, expenses, existingEMI, maxEMI, savings];
  const labels = ['Income', 'Expense', 'Current EMI', 'New EMI', 'Savings'];
  const colors = ['#4D96FF', '#FFB800', '#E879F9', '#00E5A8', '#9AE6B4'];
  const width = 520;
  const height = 220;
  const max = Math.max(...values, 1);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="loan-chart" role="img" aria-label="Income and spending chart">
      {values.map((value, index) => {
        const x = 28 + index * 96;
        const barHeight = (value / max) * 150;
        return (
          <g key={labels[index]}>
            <rect x={x} y={182 - barHeight} width="48" height={barHeight} rx="10" fill={colors[index]} opacity="0.9" />
            <text x={x + 24} y="205" textAnchor="middle" fill="#8e8aa2" fontSize="10" fontFamily="JetBrains Mono">{labels[index]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ points }) {
  if (!points.length) return null;
  const width = 520;
  const height = 220;
  const pad = 22;
  const max = Math.max(...points.map((point) => point.value), 1);
  const min = Math.min(...points.map((point) => point.value), 0);
  const range = max - min || 1;
  const path = points.map((point, index) => {
    const x = pad + (index / Math.max(points.length - 1, 1)) * (width - pad * 2);
    const y = height - pad - ((point.value - min) / range) * (height - pad * 2);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="loan-chart" role="img" aria-label="Future burden projection">
      {[0, 1, 2, 3].map((tick) => {
        const y = pad + (tick / 3) * (height - pad * 2);
        return <line key={tick} x1={pad} x2={width - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />;
      })}
      <path d={path} fill="none" stroke="#E879F9" strokeWidth="4" strokeLinecap="round" />
      {points.map((point, index) => {
        const x = pad + (index / Math.max(points.length - 1, 1)) * (width - pad * 2);
        const y = height - pad - ((point.value - min) / range) * (height - pad * 2);
        return (
          <g key={point.label}>
            <circle cx={x} cy={y} r="4.5" fill="#E879F9" />
            <text x={x} y={height - 4} textAnchor="middle" fill="#8e8aa2" fontSize="10" fontFamily="JetBrains Mono">{point.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function NumberInput({ value, onValueChange, ...props }) {
  const [draft, setDraft] = useState(String(value));

  const previousValueRef = useRef(value);
  useEffect(() => {
    if (previousValueRef.current !== value) {
      setDraft(String(value));
      previousValueRef.current = value;
    }
  }, [value]);

  function handleChange(event) {
    const nextValue = event.target.value;
    setDraft(nextValue);

    if (nextValue === '' || nextValue === '-' || nextValue === '.' || nextValue === '-.') {
      return;
    }

    const parsed = Number(nextValue);
    if (Number.isFinite(parsed)) {
      onValueChange(parsed);
    }
  }

  function handleBlur() {
    const parsed = Number(draft);
    const normalized = Number.isFinite(parsed) ? parsed : value;
    setDraft(String(normalized));
    onValueChange(normalized);
  }

  return (
    <input
      {...props}
      type="number"
      value={draft}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default function LoanEligibilityPage() {
  const [income, setIncome] = useState(50000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [expenses, setExpenses] = useState(15000);
  const [existingEMI, setExistingEMI] = useState(0);

  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      return Array.isArray(stored.history) ? stored.history : [];
    } catch {
      return [];
    }
  });

  const [growthRate, setGrowthRate] = useState(8);
  const [targetLoan, setTargetLoan] = useState(5000000);
  const [chartType, setChartType] = useState('budget');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ history }));
  }, [history]);

  const derived = useMemo(() => {
    const grossIncome = Math.max(0, safeNumber(income) + safeNumber(otherIncome));
    const fixedExpenses = Math.max(0, safeNumber(expenses));
    const currentEMI = Math.max(0, safeNumber(existingEMI));
    const rawRate = safeNumber(interestRate);
    const rawYears = safeNumber(tenure);
    const rate = Math.max(0, rawRate);
    const years = Math.max(0, rawYears);

    const disposable = Math.max(0, grossIncome - fixedExpenses - currentEMI);
    const affordabilityCap = grossIncome * 0.45;
    const maxAffordableEMI = Math.max(0, Math.min(disposable, affordabilityCap - currentEMI));
    const loan = calcLoanFromEMI(maxAffordableEMI, rate, years);
    const dtiRatio = grossIncome > 0 ? ((currentEMI + maxAffordableEMI) / grossIncome) * 100 : 0;
    const emiLoad = grossIncome > 0 ? (maxAffordableEMI / grossIncome) * 100 : 0;
    const savings = Math.max(0, grossIncome - fixedExpenses - currentEMI);
    const savingsRatio = grossIncome > 0 ? (savings / grossIncome) * 100 : 0;

    let riskLevel = 'safe';
    if (dtiRatio > 50 || emiLoad > 35) riskLevel = 'risky';
    else if (dtiRatio > 38 || emiLoad > 25) riskLevel = 'moderate';

    const rawScore = Math.max(
      0,
      Math.min(
        100,
        100 - dtiRatio * 1.1 - Math.max(0, fixedExpenses / Math.max(grossIncome, 1)) * 24 + savingsRatio * 0.7,
      ),
    );

    const monthlyBurdenAfterLoan = currentEMI + maxAffordableEMI;
    const requiredIncomeForTarget = targetLoan > 0
      ? (calcEMI(targetLoan, rate, years) / 0.45)
      : 0;

    const comparisons = [10, 15, 20, 25, 30].map((term) => ({
      tenure: term,
      emiCap: maxAffordableEMI,
      eligible: calcLoanFromEMI(maxAffordableEMI, rate, term),
      emiForTarget: calcEMI(targetLoan, rate, term),
    }));

    const projections = Array.from({ length: 5 }, (_, index) => {
      const year = index + 1;
      const projectedIncome = grossIncome * ((100 + growthRate) / 100) ** year;
      const burden = projectedIncome > 0 ? (monthlyBurdenAfterLoan / projectedIncome) * 100 : 0;
      return {
        label: `Y${year}`,
        value: burden,
        projectedIncome,
      };
    });

    const suggestions = [];
    if (fixedExpenses > grossIncome * 0.4) suggestions.push('Your expenses are eating a large part of income. Trim recurring subscriptions, rent overhead, or lifestyle leaks first.');
    if (currentEMI > grossIncome * 0.2) suggestions.push('Existing EMI load is already high. Closing a small current loan can quickly improve eligibility.');
    if (riskLevel === 'risky') suggestions.push('You are in the risky zone. Aim to keep total EMI below 40% of household income for safer approval odds.');
    if (maxAffordableEMI < grossIncome * 0.2) suggestions.push('Your affordability is tight. Even a modest salary raise or side income can create a sharp jump in eligible loan size.');
    if (suggestions.length === 0) suggestions.push('Your current profile looks healthy. Negotiate for a lower rate to stretch eligibility without increasing stress.');

    const viralChecks = [
      {
        label: 'Can you afford a ₹1Cr home?',
        affordable: loan >= 10000000,
        detail: loan >= 10000000 ? 'On current assumptions, yes.' : `Not yet. You are short by ${formatCurrency(10000000 - loan)}.`,
      },
      {
        label: 'Salary needed for ₹50L loan',
        affordable: false,
        detail: `${formatCurrency(calcEMI(5000000, rate, years) / 0.45)} per month estimated.`,
      },
    ];

    const error = grossIncome <= 0
      ? 'Income should be greater than zero.'
      : rawYears <= 0
        ? 'Tenure should be greater than zero.'
        : rawRate < 0
          ? 'Interest rate cannot be negative.'
          : '';

    return {
      grossIncome,
      fixedExpenses,
      currentEMI,
      rate,
      years,
      disposable,
      maxAffordableEMI,
      loan,
      dtiRatio,
      emiLoad,
      riskLevel,
      rawScore: Math.round(rawScore),
      monthlyBurdenAfterLoan,
      requiredIncomeForTarget,
      comparisons,
      projections,
      suggestions,
      savings,
      error,
      viralChecks,
    };
  }, [income, otherIncome, expenses, existingEMI, interestRate, tenure, growthRate, targetLoan]);

  const riskLabelClass = derived.riskLevel === 'safe' ? 'safe' : derived.riskLevel === 'moderate' ? 'moderate' : 'risky';
  const shareText = `Eligible loan ${formatCurrency(derived.loan)} | Max EMI ${formatCurrency(derived.maxAffordableEMI)} | DTI ${formatCompact(derived.dtiRatio)}% | Risk ${derived.riskLevel.toUpperCase()} | Score ${derived.rawScore}/100`;

  function saveHistory() {
    const entry = {
      id: `${Date.now()}`,
      label: `${formatCurrency(derived.loan)} eligibility`,
      income,
      otherIncome,
      expenses: derived.fixedExpenses,
      existingEMI: derived.currentEMI,
      tenure,
      rate: interestRate,
      growthRate,
      targetLoan,
      eligibleLoan: derived.loan,
      maxEMI: derived.maxAffordableEMI,
      score: derived.rawScore,
      risk: derived.riskLevel,
      createdAt: new Date().toLocaleString('en-IN'),
    };
    setHistory((current) => [entry, ...current].slice(0, HISTORY_LIMIT));
  }

  function restoreEntry(entry) {
    setIncome(safeNumber(entry.income));
    setOtherIncome(safeNumber(entry.otherIncome));
    setExpenses(entry.expenses);
    setExistingEMI(entry.existingEMI);
    setTenure(entry.tenure);
    setInterestRate(entry.rate);
    setGrowthRate(safeNumber(entry.growthRate, growthRate));
    setTargetLoan(safeNumber(entry.targetLoan, targetLoan));
  }

  function copyText(type, text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      window.setTimeout(() => setCopied(''), 1800);
    }).catch(() => setCopied(''));
  }

  function exportJSON() {
    downloadFile(
      'loan-eligibility.json',
      JSON.stringify({
        income,
        otherIncome,
        expenses,
        existingEMI,
        interestRate,
        tenure,
        growthRate,
        targetLoan,
        eligibleLoan: derived.loan,
        maxEMI: derived.maxAffordableEMI,
        dti: derived.dtiRatio,
        risk: derived.riskLevel,
        score: derived.rawScore,
      }, null, 2),
      'application/json',
    );
  }

  const chartProjectionData = derived.projections.map((point) => ({
    label: point.label,
    value: point.value,
  }));

  return (
    <div className="loan-root">
      <style>{CSS}</style>
      <div className="loan-shell">
        <nav className="loan-nav">
          <div className="loan-logo">
            <div className="loan-mark" />
            <div>
              <small>Banking dashboard style</small>
              <strong>Eligibility IQ</strong>
            </div>
          </div>
          <div className="loan-actions">
            <button className="loan-btn" onClick={() => window.print()}>Print View</button>
            <button className="loan-btn" onClick={saveHistory}>Save Result</button>
            <button className="loan-btn primary" onClick={exportJSON}>Export JSON</button>
          </div>
        </nav>

        <section className="loan-hero">
          <div className="loan-hero-copy">
            <div className="loan-badge">Loan eligibility + financial health analyzer</div>
            <h1 className="loan-title">
              Know what you can borrow <span>before the bank tells you.</span>
            </h1>
            <p className="loan-sub">
              Analyze DTI, estimate safe EMI, model salary growth, compare loan tenures, and see whether your finances support the home or personal loan you want, all in one live dashboard.
            </p>
          </div>
          <div className="loan-hero-grid">
            <div className="loan-stat loan-panel">
              <small>Max new EMI</small>
              <strong>{formatCurrency(derived.maxAffordableEMI)}</strong>
              <p>The extra EMI your current budget can safely handle.</p>
            </div>
            <div className="loan-stat loan-panel">
              <small>Eligible loan</small>
              <strong>{formatCurrency(derived.loan)}</strong>
              <p>Live estimate based on rate, tenure, DTI, and monthly surplus.</p>
            </div>
            <div className="loan-stat loan-panel">
              <small>Affordability score</small>
              <strong>{derived.rawScore}/100</strong>
              <p>Color-coded confidence signal using income, costs, and leverage.</p>
            </div>
            <div className="loan-stat loan-panel">
              <small>Risk zone</small>
              <strong style={{ textTransform: 'capitalize' }}>{derived.riskLevel}</strong>
              <p>Based on DTI and EMI burden after taking the new loan.</p>
            </div>
          </div>
        </section>

        <section className="loan-main">
          <div className="loan-stack">
            <div className="loan-card loan-panel">
                <div className="loan-card-head">
                  <div>
                    <h2>Advanced eligibility engine</h2>
                    <p>Set income, obligations, rate, and tenure. The tool calculates safe EMI capacity, dynamic eligibility, financial health, and risk band in real time.</p>
                  </div>
                <div className={`loan-risk ${riskLabelClass}`}>{derived.riskLevel}</div>
              </div>

              <div className="loan-grid-3">
                <div className="loan-field">
                  <label htmlFor="income">Monthly income</label>
                  <NumberInput id="income" min="0" value={income} onValueChange={setIncome} />
                  <input className="loan-range" type="range" min="0" max="500000" step="5000" value={Math.min(Math.max(income, 0), 500000)} onChange={(e) => setIncome(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCurrency(income)}</span><span>Main salary</span></div>
                </div>

                <div className="loan-field">
                  <label htmlFor="other-income">Other income</label>
                  <NumberInput id="other-income" min="0" value={otherIncome} onValueChange={setOtherIncome} />
                  <input className="loan-range" type="range" min="0" max="200000" step="5000" value={Math.min(Math.max(otherIncome, 0), 200000)} onChange={(e) => setOtherIncome(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCurrency(otherIncome)}</span><span>Side income or spouse income</span></div>
                </div>

                <div className="loan-field">
                  <label htmlFor="expenses">Monthly expenses</label>
                  <NumberInput id="expenses" min="0" value={expenses} onValueChange={setExpenses} />
                  <input className="loan-range" type="range" min="0" max="300000" step="5000" value={Math.min(Math.max(expenses, 0), 300000)} onChange={(e) => setExpenses(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCurrency(expenses)}</span><span>Rent, bills, groceries, lifestyle</span></div>
                </div>

                <div className="loan-field">
                  <label htmlFor="existing-emi">Existing EMI</label>
                  <NumberInput id="existing-emi" min="0" value={existingEMI} onValueChange={setExistingEMI} />
                  <input className="loan-range" type="range" min="0" max="150000" step="2500" value={Math.min(Math.max(existingEMI, 0), 150000)} onChange={(e) => setExistingEMI(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCurrency(existingEMI)}</span><span>Current debt obligation</span></div>
                </div>

                <div className="loan-field">
                  <label htmlFor="rate">Interest rate</label>
                  <NumberInput id="rate" min="0" step="0.1" value={interestRate} onValueChange={setInterestRate} />
                  <input className="loan-range" type="range" min="0" max="18" step="0.1" value={interestRate} onChange={(e) => setInterestRate(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCompact(interestRate)}%</span><span>Annual rate</span></div>
                </div>

                <div className="loan-field">
                  <label htmlFor="tenure">Tenure in years</label>
                  <NumberInput id="tenure" min="1" step="1" value={tenure} onValueChange={setTenure} />
                  <input className="loan-range" type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCompact(tenure)} years</span><span>{Math.round(tenure * 12)} months</span></div>
                </div>
              </div>

              {derived.error ? <div className="loan-error" style={{ marginTop: 14 }}>{derived.error}</div> : null}
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>Financial health dashboard</h3>
                  <p>See where your income goes today, what EMI load you can add, and how your leftover savings position looks after debt.</p>
                </div>
                <div className="loan-pills">
                  <button className={`loan-pill${chartType === 'budget' ? ' active' : ''}`} onClick={() => setChartType('budget')}>Budget</button>
                  <button className={`loan-pill${chartType === 'bars' ? ' active' : ''}`} onClick={() => setChartType('bars')}>Health</button>
                  <button className={`loan-pill${chartType === 'future' ? ' active' : ''}`} onClick={() => setChartType('future')}>Future</button>
                </div>
              </div>

              <div className="loan-summary">
                <div className="loan-box">
                  <small>Gross monthly income</small>
                  <strong>{formatCurrency(derived.grossIncome)}</strong>
                  <span>Combined income available for this calculation.</span>
                </div>
                <div className="loan-box">
                  <small>Estimated free cash</small>
                  <strong>{formatCurrency(derived.savings)}</strong>
                  <span>Monthly room left after expenses and current EMI.</span>
                </div>
              </div>

              <div className="loan-chart-wrap" style={{ marginTop: 16 }}>
                {chartType === 'budget' ? <PieChart expenses={derived.fixedExpenses} emiLoad={derived.maxAffordableEMI} savings={derived.savings} /> : null}
                {chartType === 'bars' ? <BarsChart income={derived.grossIncome} expenses={derived.fixedExpenses} existingEMI={derived.currentEMI} maxEMI={derived.maxAffordableEMI} savings={derived.savings} /> : null}
                {chartType === 'future' ? <LineChart points={chartProjectionData} /> : null}
                <div className="loan-legend">
                  <span><i style={{ background: '#4D96FF' }} />Expenses</span>
                  <span><i style={{ background: '#E879F9' }} />EMI load</span>
                  <span><i style={{ background: '#00E5A8' }} />Savings space</span>
                </div>
                <div className="loan-print-only">
                  <div className="loan-summary">
                    <div className="loan-box">
                      <small>Expenses</small>
                      <strong>{formatCurrency(derived.fixedExpenses)}</strong>
                      <span>Current monthly non-EMI outflow.</span>
                    </div>
                    <div className="loan-box">
                      <small>New EMI room</small>
                      <strong>{formatCurrency(derived.maxAffordableEMI)}</strong>
                      <span>Additional EMI this profile can safely support.</span>
                    </div>
                    <div className="loan-box">
                      <small>Savings buffer</small>
                      <strong>{formatCurrency(derived.savings)}</strong>
                      <span>Residual cash after expenses and existing EMI.</span>
                    </div>
                    <div className="loan-box">
                      <small>Future burden</small>
                      <strong>{formatCompact(chartProjectionData[0]?.value || 0)}%</strong>
                      <span>First-year EMI burden estimate in the growth model.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>What-if simulator and future projection</h3>
                  <p>Stress-test the loan by simulating salary growth and checking how EMI burden relaxes over the next five years.</p>
                </div>
              </div>

              <div className="loan-grid-2">
                <div className="loan-field">
                  <label htmlFor="growth-rate">Salary growth %</label>
                  <NumberInput id="growth-rate" min="0" step="0.5" value={growthRate} onValueChange={setGrowthRate} />
                  <input className="loan-range" type="range" min="0" max="25" step="0.5" value={growthRate} onChange={(e) => setGrowthRate(safeNumber(e.target.value))} />
                  <div className="loan-meta"><span>{formatCompact(growthRate)}%</span><span>Annual growth assumption</span></div>
                </div>
                <div className="loan-field">
                  <label htmlFor="target-loan">Target loan goal</label>
                  <NumberInput id="target-loan" min="0" value={targetLoan} onValueChange={setTargetLoan} />
                  <div className="loan-meta"><span>{formatCurrency(targetLoan)}</span><span>Shows salary needed below</span></div>
                </div>
              </div>

              <div className="loan-grid-2" style={{ marginTop: 14 }}>
                <div className="loan-box">
                  <small>Required income for target</small>
                  <strong>{formatCurrency(derived.requiredIncomeForTarget)}</strong>
                  <span>Estimated monthly income needed to keep EMI near the 45% ceiling.</span>
                </div>
                <div className="loan-box">
                  <small>Monthly burden after loan</small>
                  <strong>{formatCurrency(derived.monthlyBurdenAfterLoan)}</strong>
                  <span>Existing EMI plus the maximum new EMI this profile can safely carry.</span>
                </div>
              </div>

              <div className="loan-note">
                Viral check: {derived.viralChecks[0].label} {derived.viralChecks[0].detail} {derived.viralChecks[1].label}: {derived.viralChecks[1].detail}
              </div>
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>Loan comparison by tenure</h3>
                  <p>See how the same affordability cap behaves across different loan durations, and what EMI a target loan would require.</p>
                </div>
              </div>
              <div className="loan-table-wrap">
                <table className="loan-table">
                  <thead>
                    <tr>
                      <th>Tenure</th>
                      <th>Eligible loan</th>
                      <th>Target EMI</th>
                      <th>Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derived.comparisons.map((row) => (
                      <tr key={row.tenure}>
                        <td>{row.tenure} years</td>
                        <td>{formatCurrency(row.eligible)}</td>
                        <td>{formatCurrency(row.emiForTarget)}</td>
                        <td>{row.eligible >= targetLoan ? 'Target covered' : 'Below goal'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>Suggestion engine and history</h3>
                  <p>Save scenarios, restore them later, and use the built-in tips to improve eligibility before applying.</p>
                </div>
              </div>

              <div className="loan-grid-2">
                <div className="loan-list">
                  {derived.suggestions.map((tip, index) => (
                    <div key={index} className="loan-item">
                      <div className="loan-item-copy">
                        <strong>Improvement tip {index + 1}</strong>
                        <span>{tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="loan-list">
                  {(history.length ? history : [{ id: 'empty', label: 'No saved scenarios', createdAt: 'Use Save Result to keep the current snapshot.' }]).map((item) => (
                    <div key={item.id} className="loan-item">
                      <div className="loan-item-copy">
                        <strong>{item.label}</strong>
                        <span>{item.createdAt}</span>
                      </div>
                      {item.id !== 'empty' ? (
                        <div className="loan-item-actions">
                          <button className="loan-pill" onClick={() => restoreEntry(item)}>Restore</button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="loan-side">
            <div className="loan-result loan-panel">
              <span className="loan-kicker">Sticky eligibility panel</span>
              <strong className="loan-big">{formatCurrency(derived.loan)}</strong>
              <div className="loan-note">Estimated eligible loan amount from your safe EMI ceiling, current obligations, rate, and tenure assumptions.</div>
              <div className="loan-result-grid">
                <div className="loan-cell">
                  <small>Max EMI</small>
                  <strong>{formatCurrency(derived.maxAffordableEMI)}</strong>
                </div>
                <div className="loan-cell">
                  <small>DTI ratio</small>
                  <strong>{formatCompact(derived.dtiRatio)}%</strong>
                </div>
                <div className="loan-cell">
                  <small>Risk</small>
                  <strong style={{ textTransform: 'capitalize' }}>{derived.riskLevel}</strong>
                </div>
                <div className="loan-cell">
                  <small>Score</small>
                  <strong>{derived.rawScore}/100</strong>
                </div>
              </div>
              <div className="loan-meter" aria-label="Affordability score">
                <span style={{ width: `${derived.rawScore}%` }} />
              </div>
              <div className="loan-note">A stronger score usually means better breathing room, smoother approvals, and less repayment stress.</div>
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>EMI impact preview</h3>
                  <p>How the new loan changes your monthly load and remaining budget.</p>
                </div>
              </div>
              <div className="loan-summary">
                <div className="loan-box">
                  <small>Total EMI after loan</small>
                  <strong>{formatCurrency(derived.monthlyBurdenAfterLoan)}</strong>
                  <span>Current EMI plus the new safe EMI capacity.</span>
                </div>
                <div className="loan-box">
                  <small>Leftover after all EMI</small>
                  <strong>{formatCurrency(Math.max(0, derived.grossIncome - derived.fixedExpenses - derived.monthlyBurdenAfterLoan))}</strong>
                  <span>Cash cushion left each month if you borrow to the limit.</span>
                </div>
              </div>
            </div>

            <div className="loan-card loan-panel">
              <div className="loan-card-head">
                <div>
                  <h3>Share and export</h3>
                  <p>Copy a clean summary or export the current profile for review.</p>
                </div>
              </div>
              <div className="loan-pills">
                <button className={`loan-pill${copied === 'summary' ? ' active' : ''}`} onClick={() => copyText('summary', shareText)}>
                  {copied === 'summary' ? 'Copied' : 'Copy Summary'}
                </button>
                <button className={`loan-pill${copied === 'goal' ? ' active' : ''}`} onClick={() => copyText('goal', `Target ${formatCurrency(targetLoan)} needs about ${formatCurrency(derived.requiredIncomeForTarget)} monthly income.`)}>
                  {copied === 'goal' ? 'Copied' : 'Copy Goal Insight'}
                </button>
              </div>
              <div className="loan-note">{shareText}</div>
            </div>
          </aside>
        </section>

        <div className="loan-foot">
          Single-file client route with inline financial logic, local history, responsive dashboard layout, and the `#E879F9` theme.
        </div>
      </div>
    </div>
  );
}
