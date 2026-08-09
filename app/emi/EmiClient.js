'use client';

import { useEffect, useMemo, useState } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

.emi-root, .emi-root * { box-sizing: border-box; }
.emi-root {
  --bg: #0a0a0f;
  --bg-soft: #12121a;
  --panel: rgba(20, 20, 30, 0.78);
  --panel-strong: rgba(18, 18, 28, 0.95);
  --line: rgba(255,255,255,0.08);
  --line-strong: rgba(255,255,255,0.16);
  --text: #f7f4ee;
  --muted: #aaa6bb;
  --soft: #706c84;
  --brand: #fb923c;
  --brand-soft: rgba(251,146,60,0.16);
  --brand-2: #ffd166;
  --blue: #4d96ff;
  --green: #00e5a8;
  --danger: #ff6b6b;
  --danger-soft: rgba(255,107,107,0.14);
  --radius: 24px;
  --radius-sm: 16px;
  --shadow: 0 20px 70px rgba(0,0,0,0.35);
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(251,146,60,0.18), transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(77,150,255,0.15), transparent 22%),
    radial-gradient(circle at 50% 100%, rgba(255,184,0,0.08), transparent 30%),
    linear-gradient(180deg, #09090e 0%, #0a0a0f 45%, #0f1018 100%);
  min-height: 100vh;
  font-family: 'Instrument Sans', sans-serif;
}
.emi-root.high-contrast {
  --panel: rgba(10, 10, 16, 0.98);
  --panel-strong: rgba(5, 5, 10, 1);
  --line: rgba(255,255,255,0.18);
  --line-strong: rgba(255,255,255,0.34);
  --text: #ffffff;
  --muted: #ddd8ef;
}
.emi-root a { color: inherit; text-decoration: none; }
.emi-root button, .emi-root input, .emi-root select { font: inherit; }
.emi-root button { cursor: pointer; }
.emi-style { display: block; }
.emi-shell { width: min(1380px, calc(100% - 32px)); margin: 0 auto; position: relative; z-index: 1; }
.emi-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  backdrop-filter: blur(18px);
}
.emi-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.emi-logo-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgba(251,146,60,0.2), rgba(77,150,255,0.12)),
    linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0));
  border: 1px solid rgba(251,146,60,0.32);
  position: relative;
  overflow: hidden;
}
.emi-logo-mark::before,
.emi-logo-mark::after {
  content: '';
  position: absolute;
  inset: 7px;
  border-radius: 10px;
  border: 1px solid rgba(251,146,60,0.25);
}
.emi-logo-mark::after {
  inset: auto 8px 8px auto;
  width: 10px;
  height: 10px;
  border-radius: 4px;
  background: var(--brand);
  border: 0;
  box-shadow: -14px -2px 0 0 rgba(255,209,102,0.8), -2px -14px 0 0 rgba(77,150,255,0.8);
}
.emi-logo-copy small {
  display: block;
  color: var(--soft);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
.emi-logo-copy strong { display: block; font-size: 1.1rem; }
.emi-nav-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.emi-ghost, .emi-solid, .emi-chip, .emi-tab, .emi-mini-btn {
  border-radius: 999px;
  border: 1px solid var(--line);
  transition: 0.2s ease;
}
.emi-ghost, .emi-solid {
  padding: 11px 16px;
  min-height: 44px;
  background: rgba(255,255,255,0.03);
  color: var(--text);
}
.emi-ghost:hover, .emi-tab:hover, .emi-chip:hover, .emi-mini-btn:hover {
  border-color: rgba(251,146,60,0.45);
  transform: translateY(-1px);
}
.emi-solid {
  background: linear-gradient(135deg, var(--brand), #ffb55e);
  color: #2a1400;
  border-color: rgba(255,184,0,0.3);
  box-shadow: 0 10px 30px rgba(251,146,60,0.22);
  font-weight: 700;
}
.emi-hero {
  padding: 52px 0 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
  gap: 22px;
  align-items: end;
}
.emi-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(251,146,60,0.22);
  background: rgba(251,146,60,0.08);
  color: #ffd9ba;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}
.emi-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--brand);
  box-shadow: 0 0 0 6px rgba(251,146,60,0.12);
}
.emi-title {
  margin: 18px 0 16px;
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.94;
  letter-spacing: -0.06em;
}
.emi-title span {
  background: linear-gradient(135deg, var(--brand), #ffd166 62%, var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.emi-sub {
  max-width: 740px;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.7;
  color: var(--muted);
}
.emi-hero-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.emi-glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}
.emi-stat-card {
  border-radius: 22px;
  padding: 18px;
  min-height: 136px;
}
.emi-stat-card small {
  color: var(--soft);
  display: block;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
}
.emi-stat-card strong {
  display: block;
  margin-top: 14px;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  letter-spacing: -0.04em;
}
.emi-stat-card p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.6;
}
.emi-main {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(330px, 0.62fr);
  gap: 22px;
  align-items: start;
  padding-bottom: 48px;
}
.emi-stack { display: grid; gap: 18px; }
.emi-card {
  border-radius: var(--radius);
  padding: 22px;
}
.emi-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}
.emi-card-head h2, .emi-card-head h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.emi-card-head p {
  margin-top: 7px;
  color: var(--muted);
  max-width: 620px;
  line-height: 1.6;
  font-size: 0.93rem;
}
.emi-grid-2, .emi-grid-3, .emi-grid-4 {
  display: grid;
  gap: 14px;
}
.emi-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.emi-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.emi-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.emi-field {
  display: grid;
  gap: 10px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--soft);
  font-family: 'JetBrains Mono', monospace;
}
.emi-field input,
.emi-field select {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(0,0,0,0.18);
  color: var(--text);
  min-height: 48px;
  padding: 0 14px;
  outline: none;
}
.emi-field input:focus,
.emi-field select:focus {
  border-color: rgba(251,146,60,0.5);
  box-shadow: 0 0 0 4px rgba(251,146,60,0.12);
}
.emi-field-range {
  appearance: none;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(251,146,60,0.55), rgba(77,150,255,0.3));
}
.emi-field-range::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--brand);
  border: 0;
  box-shadow: 0 0 0 4px rgba(251,146,60,0.18);
}
.emi-field-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.82rem;
}
.emi-tabs, .emi-chip-row, .emi-mini-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.emi-tab, .emi-chip, .emi-mini-btn {
  background: rgba(255,255,255,0.03);
  color: var(--muted);
  padding: 10px 14px;
}
.emi-tab.active, .emi-chip.active, .emi-mini-btn.active {
  color: var(--text);
  border-color: rgba(251,146,60,0.34);
  background: linear-gradient(135deg, rgba(251,146,60,0.16), rgba(77,150,255,0.09));
}
.emi-error {
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--danger-soft);
  border: 1px solid rgba(255,107,107,0.25);
  color: #ffd4d4;
  font-size: 0.93rem;
}
.emi-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.emi-summary-card {
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.025);
}
.emi-summary-card small {
  display: block;
  color: var(--soft);
  font-size: 11px;
  letter-spacing: 0.1em;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
}
.emi-summary-card strong {
  display: block;
  font-size: 1.5rem;
  margin-top: 8px;
  letter-spacing: -0.04em;
}
.emi-summary-card span {
  display: block;
  margin-top: 8px;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.88rem;
}
.emi-chart-wrap {
  border-radius: 20px;
  padding: 16px;
  background: rgba(0,0,0,0.16);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-chart-svg { width: 100%; height: auto; display: block; }
.emi-legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;
}
.emi-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 0.84rem;
}
.emi-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.emi-side {
  position: sticky;
  top: 86px;
  display: grid;
  gap: 18px;
}
.emi-result {
  border-radius: 28px;
  padding: 24px;
  background:
    radial-gradient(circle at top right, rgba(251,146,60,0.16), transparent 28%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
}
.emi-kicker {
  color: #ffd9ba;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-family: 'JetBrains Mono', monospace;
}
.emi-big {
  display: block;
  margin-top: 12px;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 0.96;
  letter-spacing: -0.06em;
  font-family: 'Syne', sans-serif;
}
.emi-result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}
.emi-result-cell {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-result-cell small {
  display: block;
  font-size: 11px;
  color: var(--soft);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.emi-result-cell strong {
  display: block;
  margin-top: 8px;
  font-size: 1.05rem;
}
.emi-note {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.05);
  color: var(--muted);
  line-height: 1.65;
  font-size: 0.9rem;
}
.emi-tips {
  display: grid;
  gap: 10px;
}
.emi-tip {
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-tip strong {
  display: block;
  font-size: 0.97rem;
}
.emi-tip p {
  margin-top: 6px;
  color: var(--muted);
  line-height: 1.55;
  font-size: 0.88rem;
}
.emi-meter {
  margin-top: 14px;
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.emi-meter > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--green), var(--brand), var(--brand-2));
}
.emi-table-wrap {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}
.emi-table-scroll {
  overflow: auto;
  max-height: 460px;
}
.emi-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}
.emi-table th, .emi-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.9rem;
}
.emi-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(10,10,15,0.92);
  font-size: 11px;
  color: var(--soft);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}
.emi-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.08);
}
.emi-tag.hot {
  background: rgba(255,107,107,0.12);
  color: #ffc0c0;
}
.emi-tag.cool {
  background: rgba(0,229,168,0.12);
  color: #b8ffea;
}
.emi-calendar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.emi-calendar-card {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-calendar-card.hot {
  border-color: rgba(255,107,107,0.26);
  background: linear-gradient(180deg, rgba(255,107,107,0.1), rgba(255,255,255,0.02));
}
.emi-calendar-card strong {
  display: block;
  margin-bottom: 8px;
}
.emi-calendar-card span {
  display: block;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.5;
}
.emi-compare-list {
  display: grid;
  gap: 12px;
}
.emi-compare-card {
  padding: 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
}
.emi-compare-card.best {
  border-color: rgba(0,229,168,0.32);
  box-shadow: inset 0 0 0 1px rgba(0,229,168,0.18);
}
.emi-compare-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.emi-compare-top strong { font-size: 1rem; }
.emi-compare-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.emi-compare-metrics span {
  display: block;
  color: var(--muted);
  font-size: 0.82rem;
  margin-top: 4px;
}
.emi-history {
  display: grid;
  gap: 10px;
}
.emi-history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.emi-history-copy strong {
  display: block;
  font-size: 0.96rem;
}
.emi-history-copy span {
  display: block;
  margin-top: 5px;
  color: var(--muted);
  font-size: 0.84rem;
}
.emi-history-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.emi-foot {
  padding: 10px 0 44px;
  color: var(--soft);
  font-size: 0.84rem;
  text-align: center;
}
@media (max-width: 1180px) {
  .emi-hero, .emi-main { grid-template-columns: 1fr; }
  .emi-side { position: static; }
}
@media (max-width: 860px) {
  .emi-grid-4, .emi-grid-3, .emi-grid-2, .emi-summary, .emi-result-grid, .emi-compare-metrics { grid-template-columns: 1fr; }
  .emi-hero-cards, .emi-calendar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .emi-shell { width: min(100% - 20px, 1380px); }
  .emi-nav { align-items: flex-start; flex-direction: column; }
  .emi-nav-actions { width: 100%; justify-content: flex-start; }
  .emi-card, .emi-result { padding: 18px; }
  .emi-hero { padding-top: 28px; }
  .emi-hero-cards, .emi-calendar { grid-template-columns: 1fr; }
}
@media print {
  .emi-nav, .emi-nav-actions, .emi-chip-row, .emi-mini-actions, .emi-tabs { display: none !important; }
  .emi-root { background: #fff; color: #111; }
  .emi-glass, .emi-result, .emi-card { box-shadow: none; background: #fff; border-color: #ddd; }
  .emi-main, .emi-hero { grid-template-columns: 1fr; }
}
`;

const STORAGE_KEY = 'toolsite-emi-calculator-v1';
const HISTORY_LIMIT = 8;

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const numberFmt = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
});

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

function monthLabel(index) {
  const base = new Date();
  return new Date(base.getFullYear(), base.getMonth() + index, 1).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
}

function calcEMI(principal, annualRate, years) {
  const P = safeNumber(principal);
  const n = Math.max(0, Math.round(safeNumber(years) * 12));
  const r = safeNumber(annualRate) / 12 / 100;
  if (P <= 0 || n <= 0) return 0;
  if (r === 0) return P / n;
  const pow = (1 + r) ** n;
  return (P * r * pow) / (pow - 1);
}

function calcLoanFromEMI(targetEMI, annualRate, years) {
  const emiValue = safeNumber(targetEMI);
  const n = Math.max(0, Math.round(safeNumber(years) * 12));
  const r = safeNumber(annualRate) / 12 / 100;
  if (emiValue <= 0 || n <= 0) return 0;
  if (r === 0) return emiValue * n;
  const pow = (1 + r) ** n;
  return emiValue * ((pow - 1) / (r * pow));
}

function calcTenureFromEMI(principal, annualRate, targetEMI) {
  const P = safeNumber(principal);
  const E = safeNumber(targetEMI);
  const r = safeNumber(annualRate) / 12 / 100;
  if (P <= 0 || E <= 0) return 0;
  if (r === 0) return P / E / 12;
  if (E <= P * r) return Infinity;
  const months = Math.log(E / (E - P * r)) / Math.log(1 + r);
  return months / 12;
}

function buildSchedule({
  principal,
  annualRate,
  years,
  baseEMI,
  extraEMI = 0,
  lumpSum = 0,
}) {
  const P = safeNumber(principal);
  const n = Math.max(0, Math.round(safeNumber(years) * 12));
  const r = safeNumber(annualRate) / 12 / 100;
  const emiValue = Math.max(0, safeNumber(baseEMI));
  if (P <= 0 || n <= 0 || emiValue <= 0) {
    return {
      schedule: [],
      totalInterest: 0,
      totalPayment: 0,
      paidMonths: 0,
      closureDate: 'N/A',
      interestSaved: 0,
      principalPaid: 0,
    };
  }

  const extra = Math.max(0, safeNumber(extraEMI));
  const oneTime = Math.max(0, safeNumber(lumpSum));
  let balance = P;
  let totalInterest = 0;
  let totalPayment = 0;
  const rows = [];
  const lumpMonth = oneTime > 0 ? Math.min(12, n) : -1;

  for (let month = 1; month <= n + 240 && balance > 0.01; month += 1) {
    const interest = r === 0 ? 0 : balance * r;
    const desired = emiValue + extra;
    if (r > 0 && desired <= interest) {
      return {
        schedule: [],
        totalInterest: Infinity,
        totalPayment: Infinity,
        paidMonths: Infinity,
        closureDate: 'Unreachable',
        interestSaved: 0,
        principalPaid: 0,
      };
    }

    let payment = r === 0 ? Math.min(desired, balance) : Math.min(desired, balance + interest);
    let principalPaid = Math.max(0, payment - interest);

    let lumpPaid = 0;
    if (month === lumpMonth) {
      lumpPaid = Math.min(oneTime, Math.max(0, balance - principalPaid));
      principalPaid += lumpPaid;
      payment += lumpPaid;
    }

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    totalPayment += payment;

    rows.push({
      month,
      label: monthLabel(month - 1),
      payment,
      interest,
      principal: principalPaid,
      lumpSum: lumpPaid,
      balance,
      year: Math.ceil(month / 12),
      interestRatio: payment > 0 ? interest / payment : 0,
    });
  }

  const paidMonths = rows.length;
  const closureDate = paidMonths ? rows[rows.length - 1].label : 'N/A';
  const principalPaid = rows.reduce((sum, row) => sum + row.principal, 0);

  return {
    schedule: rows,
    totalInterest,
    totalPayment,
    paidMonths,
    closureDate,
    interestSaved: 0,
    principalPaid,
  };
}

function toCSV(rows) {
  const header = ['Month', 'Payment', 'Principal', 'Interest', 'LumpSum', 'Balance'];
  const body = rows.map((row) => [
    row.label,
    row.payment.toFixed(2),
    row.principal.toFixed(2),
    row.interest.toFixed(2),
    row.lumpSum.toFixed(2),
    row.balance.toFixed(2),
  ]);
  return [header, ...body].map((line) => line.join(',')).join('\n');
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
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function PieChart({ principal, interest }) {
  const total = principal + interest || 1;
  const principalAngle = (principal / total) * 360;
  return (
    <svg viewBox="0 0 220 220" className="emi-chart-svg" role="img" aria-label="Principal and interest share">
      <circle cx="110" cy="110" r="84" fill="rgba(255,255,255,0.04)" />
      <path d={arcPath(110, 110, 84, 0, principalAngle)} fill="#FB923C" />
      <path d={arcPath(110, 110, 84, principalAngle, 360)} fill="#4D96FF" />
      <circle cx="110" cy="110" r="48" fill="#0f1018" />
      <text x="110" y="104" textAnchor="middle" fill="#f7f4ee" fontSize="13" fontFamily="JetBrains Mono">EMI Mix</text>
      <text x="110" y="124" textAnchor="middle" fill="#fb923c" fontSize="18" fontWeight="700">{Math.round((principal / total) * 100)}%</text>
    </svg>
  );
}

function LineChart({ points, color = '#FB923C', label = 'Balance' }) {
  if (!points.length) return null;
  const width = 520;
  const height = 220;
  const padding = 22;
  const values = points.map((point) => point.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = padding + (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="emi-chart-svg" role="img" aria-label={label}>
      <defs>
        <linearGradient id="emiLineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((tick) => {
        const y = padding + (tick / 3) * (height - padding * 2);
        return <line key={tick} x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />;
      })}
      <path d={`${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`} fill="url(#emiLineFill)" />
      <path d={path} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {points.filter((_, index) => index % Math.ceil(points.length / 6 || 1) === 0 || index === points.length - 1).map((point, index) => {
        const actualIndex = points.findIndex((item) => item.label === point.label);
        const x = padding + (actualIndex / Math.max(points.length - 1, 1)) * (width - padding * 2);
        const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
        return (
          <g key={`${point.label}-${index}`}>
            <circle cx={x} cy={y} r="4.5" fill={color} />
            <text x={x} y={height - 4} textAnchor="middle" fill="#8e8aa2" fontSize="10" fontFamily="JetBrains Mono">{point.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BarsChart({ rows }) {
  if (!rows.length) return null;
  const sample = rows.slice(0, 12);
  const width = 520;
  const height = 220;
  const max = Math.max(...sample.map((row) => Math.max(row.principal, row.interest)), 1);
  const barWidth = 18;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="emi-chart-svg" role="img" aria-label="Interest versus principal">
      {sample.map((row, index) => {
        const x = 30 + index * 39;
        const principalHeight = (row.principal / max) * 150;
        const interestHeight = (row.interest / max) * 150;
        return (
          <g key={row.month}>
            <rect x={x} y={180 - interestHeight} width={barWidth} height={interestHeight} rx="6" fill="#4D96FF" opacity="0.88" />
            <rect x={x + 19} y={180 - principalHeight} width={barWidth} height={principalHeight} rx="6" fill="#FB923C" opacity="0.92" />
            <text x={x + 18} y="205" textAnchor="middle" fill="#8e8aa2" fontSize="9" fontFamily="JetBrains Mono">{row.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

function saveStorage(data) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function EMIPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const [extraEMI, setExtraEMI] = useState(0);
  const [lumpSum, setLumpSum] = useState(0);
  const [inflation, setInflation] = useState(6);

  const emi = resolvedEmi;
  const totalInterest = resolvedTotalInterest;
  const totalPayment = resolvedTotalPayment;

  const schedule = resolvedSchedule;
  const [viewMode, setViewMode] = useState('standard');
  const [chartType, setChartType] = useState('pie');

  const [targetEMI, setTargetEMI] = useState(12000);
  const [scheduleMode, setScheduleMode] = useState('month');
  const [scheduleSearch, setScheduleSearch] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [copied, setCopied] = useState('');
  const [selectedFav, setSelectedFav] = useState('');
  const [compareLoans, setCompareLoans] = useState([
    { id: 'A', amount: 500000, rate: 8.5, tenure: 5 },
    { id: 'B', amount: 500000, rate: 9.2, tenure: 4 },
    { id: 'C', amount: 650000, rate: 8.1, tenure: 6 },
  ]);

  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      return Array.isArray(stored.history) ? stored.history : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      return Array.isArray(stored.favorites) ? stored.favorites : [];
    } catch {
      return [];
    }
  });
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      return typeof stored.highContrast === 'boolean' ? stored.highContrast : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    saveStorage({ history, favorites, highContrast });
  }, [history, favorites, highContrast]);

  const derived = useMemo(() => {
    const amount = Math.max(0, safeNumber(loanAmount));
    const rate = Math.max(0, safeNumber(interestRate));
    const years = Math.max(0, safeNumber(tenure));
    const extra = Math.max(0, safeNumber(extraEMI));
    const lump = Math.max(0, safeNumber(lumpSum));
    const desiredEMI = Math.max(0, safeNumber(targetEMI));

    let resolvedLoanAmount = amount;
    let resolvedTenure = years;
    let resolvedEMI = calcEMI(amount, rate, years);
    let modeError = '';

    if (viewMode === 'budget') {
      resolvedLoanAmount = calcLoanFromEMI(desiredEMI, rate, years);
      resolvedEMI = desiredEMI;
      if (desiredEMI <= 0) modeError = 'Enter a target EMI to estimate the maximum affordable loan.';
    }

    if (viewMode === 'tenure') {
      const yearsNeeded = calcTenureFromEMI(amount, rate, desiredEMI);
      resolvedTenure = yearsNeeded;
      resolvedEMI = desiredEMI;
      if (!Number.isFinite(yearsNeeded)) {
        modeError = 'The target EMI is too low to cover monthly interest, so this loan would never close.';
      }
    }

    const baseSchedule = buildSchedule({
      principal: resolvedLoanAmount,
      annualRate: rate,
      years: Number.isFinite(resolvedTenure) ? resolvedTenure : years,
      baseEMI: resolvedEMI,
      extraEMI: 0,
      lumpSum: 0,
    });

    const currentSchedule = buildSchedule({
      principal: resolvedLoanAmount,
      annualRate: rate,
      years: Number.isFinite(resolvedTenure) ? resolvedTenure : years,
      baseEMI: resolvedEMI,
      extraEMI: extra,
      lumpSum: lump,
    });

    const totalInterestValue = currentSchedule.totalInterest;
    const totalPaymentValue = currentSchedule.totalPayment;
    const savings = Number.isFinite(baseSchedule.totalInterest) && Number.isFinite(totalInterestValue)
      ? Math.max(0, baseSchedule.totalInterest - totalInterestValue)
      : 0;

    return {
      amount,
      rate,
      years,
      extra,
      lump,
      desiredEMI,
      resolvedLoanAmount,
      resolvedTenure,
      resolvedEMI,
      currentSchedule,
      baseSchedule,
      modeError,
      savings,
    };
  }, [loanAmount, interestRate, tenure, extraEMI, lumpSum, targetEMI, viewMode]);

  const derivedSummary = useMemo(() => ({
    emi: derived.resolvedEMI,
    totalInterest: derived.currentSchedule.totalInterest,
    totalPayment: derived.currentSchedule.totalPayment,
    schedule: derived.currentSchedule.schedule,
  }), [derived]);

  const resolvedEmi = derivedSummary.emi;
  const resolvedTotalInterest = derivedSummary.totalInterest;
  const resolvedTotalPayment = derivedSummary.totalPayment;
  const resolvedSchedule = derivedSummary.schedule;

  const invalidState = useMemo(() => {
    if (derived.amount <= 0 && viewMode !== 'budget') return 'Loan amount should be greater than zero.';
    if (derived.rate < 0) return 'Interest rate cannot be negative.';
    if (viewMode !== 'tenure' && derived.years <= 0) return 'Tenure should be greater than zero.';
    if (derived.modeError) return derived.modeError;
    if (!Number.isFinite(resolvedEmi) || !Number.isFinite(resolvedTotalInterest) || !Number.isFinite(resolvedTotalPayment)) return 'This setup overflows the calculator. Increase EMI or reduce the loan load.';
    return '';
  }, [derived, resolvedEmi, resolvedTotalInterest, resolvedTotalPayment, viewMode]);

  const ratio = monthlyIncome > 0 ? (resolvedEmi / monthlyIncome) * 100 : 0;
  const recommendedMin = monthlyIncome * 0.2;
  const recommendedMax = monthlyIncome * 0.35;
  const challengeScore = Math.min(100, Math.round((derived.savings / Math.max(derived.baseSchedule.totalInterest || 1, 1)) * 100));
  const inflationAdjustedCost = resolvedTotalPayment * ((100 + inflation) / 100);

  const scheduleRows = useMemo(() => {
    const rows = scheduleMode === 'year'
      ? Object.values(resolvedSchedule.reduce((acc, row) => {
        const key = `Year ${row.year}`;
        if (!acc[key]) {
          acc[key] = {
            month: row.year,
            label: key,
            payment: 0,
            principal: 0,
            interest: 0,
            lumpSum: 0,
            balance: row.balance,
            interestRatio: 0,
          };
        }
        acc[key].payment += row.payment;
        acc[key].principal += row.principal;
        acc[key].interest += row.interest;
        acc[key].lumpSum += row.lumpSum;
        acc[key].balance = row.balance;
        acc[key].interestRatio = acc[key].payment > 0 ? acc[key].interest / acc[key].payment : 0;
        return acc;
      }, {}))
      : resolvedSchedule;

    return rows.filter((row) => row.label.toLowerCase().includes(scheduleSearch.toLowerCase()));
  }, [resolvedSchedule, scheduleMode, scheduleSearch]);

  const chartPoints = useMemo(() => {
    const sample = schedule.filter((_, index) => index % Math.max(1, Math.ceil(schedule.length / 10)) === 0 || index === schedule.length - 1);
    return sample.map((row) => ({
      label: scheduleMode === 'year' ? `Y${row.year}` : `${row.month}`,
      value: row.balance,
    }));
  }, [schedule, scheduleMode]);

  const insightCards = useMemo(() => {
    const addTwoK = buildSchedule({
      principal: derived.resolvedLoanAmount,
      annualRate: derived.rate,
      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
      baseEMI: derived.resolvedEMI,
      extraEMI: 2000,
      lumpSum: 0,
    });
    const addLump = buildSchedule({
      principal: derived.resolvedLoanAmount,
      annualRate: derived.rate,
      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
      baseEMI: derived.resolvedEMI,
      extraEMI: 0,
      lumpSum: 50000,
    });
    const best = addTwoK.totalInterest < addLump.totalInterest ? 'extra' : 'lump';

    return [
      {
        title: 'Smart Insight',
        body: `Add ₹2,000 to your EMI and you could save ${formatCurrency(Math.max(0, derived.baseSchedule.totalInterest - addTwoK.totalInterest))} in interest.`,
      },
      {
        title: 'Closure Move',
        body: Number.isFinite(addTwoK.paidMonths)
          ? `That same boost can close the loan about ${Math.max(0, derived.baseSchedule.paidMonths - addTwoK.paidMonths)} months sooner.`
          : 'Increase EMI above interest accrual to unlock a valid closure date.',
      },
      {
        title: 'Rich-People Repayment Tip',
        body: best === 'extra'
          ? 'Recurring extra EMI wins here because it keeps cutting principal every month instead of waiting for a one-time move.'
          : 'A chunky prepayment wins here because the principal shock early on wipes out a large slice of future interest.',
      },
      {
        title: 'Inflation Reality',
        body: `At ${formatCompact(inflation)}% inflation, your total outflow feels like roughly ${formatCurrency(inflationAdjustedCost)} over the full horizon.`,
      },
    ];
  }, [derived, inflationAdjustedCost, inflation]);

  const plannerMessage = ratio <= 0
    ? 'Add your monthly income to unlock affordability guidance.'
    : ratio <= 35
      ? 'This EMI sits inside the usually healthy zone for most borrowers.'
      : ratio <= 50
        ? 'This is workable, but it can make savings and lifestyle flexibility tighter.'
        : 'This EMI is aggressive and may create stress during income dips or rate shocks.';

  const calendarRows = schedule.slice(0, 12);
  const heavyThreshold = calendarRows.length
    ? [...calendarRows].sort((a, b) => b.interestRatio - a.interestRatio)[Math.min(2, calendarRows.length - 1)]?.interestRatio ?? 1
    : 1;

  const comparisonData = compareLoans.map((loan) => {
    const loanEMI = calcEMI(loan.amount, loan.rate, loan.tenure);
    const loanSchedule = buildSchedule({
      principal: loan.amount,
      annualRate: loan.rate,
      years: loan.tenure,
      baseEMI: loanEMI,
    });
    return {
      ...loan,
      emi: loanEMI,
      interest: loanSchedule.totalInterest,
      total: loanSchedule.totalPayment,
    };
  });
  const cheapestLoan = comparisonData.reduce((best, loan) => (loan.total < best.total ? loan : best), comparisonData[0]);

  const favoriteSummary = favorites.find((item) => item.id === selectedFav);

  const shareText = `EMI: ${formatCurrency(emi)} | Total payment: ${formatCurrency(totalPayment)} | Interest: ${formatCurrency(totalInterest)} | Close by: ${derived.currentSchedule.closureDate}`;

  function pushHistory() {
    const entry = {
      id: `${Date.now()}`,
      label: `${formatCurrency(derived.resolvedLoanAmount)} at ${formatCompact(derived.rate)}%`,
      mode: viewMode,
      amount: derived.resolvedLoanAmount,
      rate: derived.rate,
      tenure: derived.resolvedTenure,
      emi: derived.resolvedEMI,
      extraEMI: derived.extra,
      lumpSum: derived.lump,
      createdAt: new Date().toLocaleString('en-IN'),
    };
    setHistory((current) => [entry, ...current.filter((item) => item.id !== entry.id)].slice(0, HISTORY_LIMIT));
  }

  function saveFavorite() {
    const entry = {
      id: `${Date.now()}`,
      name: `Fav ${favorites.length + 1}`,
      amount: derived.resolvedLoanAmount,
      rate: derived.rate,
      tenure: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : tenure,
      extraEMI: derived.extra,
      lumpSum: derived.lump,
      mode: viewMode,
      targetEMI: derived.desiredEMI,
    };
    setFavorites((current) => [entry, ...current].slice(0, HISTORY_LIMIT));
    setSelectedFav(entry.id);
  }

  function loadConfig(config) {
    setLoanAmount(config.amount);
    setInterestRate(config.rate);
    setTenure(Number.isFinite(config.tenure) ? config.tenure : tenure);
    setExtraEMI(config.extraEMI || 0);
    setLumpSum(config.lumpSum || 0);
    setViewMode(config.mode || 'standard');
    setTargetEMI(config.targetEMI || config.emi || targetEMI);
  }

  function handleCopy(type, text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      window.setTimeout(() => setCopied(''), 1800);
    }).catch(() => {
      setCopied('');
    });
  }

  function exportJSON() {
    downloadFile(
      'emi-schedule.json',
      JSON.stringify({
        summary: {
          emi,
          totalInterest,
          totalPayment,
          closureDate: derived.currentSchedule.closureDate,
        },
        schedule,
      }, null, 2),
      'application/json',
    );
  }

  function exportCSV() {
    downloadFile('emi-schedule.csv', toCSV(schedule), 'text/csv;charset=utf-8');
  }

  return (
    <div className={`emi-root${highContrast ? ' high-contrast' : ''}`}>
      <style>{CSS}</style>
      <div className="emi-shell">
        <nav className="emi-nav">
          <div className="emi-logo">
            <div className="emi-logo-mark" />
            <div className="emi-logo-copy">
              <small>QR-inspired finance tool</small>
              <strong>EMI Matrix</strong>
            </div>
          </div>
          <div className="emi-nav-actions">
            <button className="emi-ghost" onClick={() => setHighContrast((value) => !value)}>
              {highContrast ? 'Default View' : 'High Contrast'}
            </button>
            <button className="emi-ghost" onClick={pushHistory}>Save History</button>
            <button className="emi-solid" onClick={saveFavorite}>Add Favorite</button>
          </div>
        </nav>

        <section className="emi-hero">
          <div>
            <div className="emi-badge">Production-ready advanced EMI planner</div>
            <h1 className="emi-title">
              Borrow smarter with a <span>QR-coded fintech edge.</span>
            </h1>
            <p className="emi-sub">
              This calculator goes beyond monthly EMI. You can switch modes, simulate extra payments, compare loan offers, inspect amortization, export schedules, and use rule-based payoff insights without leaving the page.
            </p>
          </div>
          <div className="emi-hero-cards">
            <div className="emi-stat-card emi-glass">
              <small>Normal vs accelerated</small>
              <strong>{formatCurrency(derived.savings)}</strong>
              <p>Interest saved with your current extra EMI and lump sum plan.</p>
            </div>
            <div className="emi-stat-card emi-glass">
              <small>Loan closure</small>
              <strong>{derived.currentSchedule.closureDate}</strong>
              <p>Your payoff runway updates live as prepayment changes.</p>
            </div>
            <div className="emi-stat-card emi-glass">
              <small>EMI challenge</small>
              <strong>{challengeScore}%</strong>
              <p>Gamified savings meter based on how much interest you are shaving off.</p>
            </div>
            <div className="emi-stat-card emi-glass">
              <small>Affordability zone</small>
              <strong>{ratio ? `${formatCompact(ratio)}%` : 'Set income'}</strong>
              <p>Monthly EMI to income ratio for quick planner guidance.</p>
            </div>
          </div>
        </section>

        <section className="emi-main">
          <div className="emi-stack">
            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h2>Multi-mode calculator</h2>
                  <p>Use classic EMI, reverse-budget planning, or tenure finding. Extra EMI and lump sum logic stay in the same flow.</p>
                </div>
              </div>

              <div className="emi-tabs" role="tablist" aria-label="Calculator modes">
                {[
                  { id: 'standard', label: 'EMI Mode' },
                  { id: 'budget', label: 'Budget Mode' },
                  { id: 'tenure', label: 'Tenure Finder' },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`emi-tab${viewMode === item.id ? ' active' : ''}`}
                    role="tab"
                    aria-selected={viewMode === item.id}
                    onClick={() => setViewMode(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="emi-grid-3" style={{ marginTop: 16 }}>
                <div className="emi-field">
                  <label htmlFor="loan-amount">Loan amount</label>
                  <input id="loan-amount" type="number" min="0" value={loanAmount} onChange={(e) => setLoanAmount(safeNumber(e.target.value))} />
                  <input className="emi-field-range" type="range" min="50000" max="10000000" step="50000" value={Math.min(Math.max(loanAmount, 50000), 10000000)} onChange={(e) => setLoanAmount(safeNumber(e.target.value))} />
                  <div className="emi-field-meta"><span>{formatCurrency(loanAmount)}</span><span>Up to ₹1 Cr</span></div>
                </div>

                <div className="emi-field">
                  <label htmlFor="interest-rate">Interest rate %</label>
                  <input id="interest-rate" type="number" min="0" step="0.1" value={interestRate} onChange={(e) => setInterestRate(safeNumber(e.target.value))} />
                  <input className="emi-field-range" type="range" min="0" max="24" step="0.1" value={interestRate} onChange={(e) => setInterestRate(safeNumber(e.target.value))} />
                  <div className="emi-field-meta"><span>{formatCompact(interestRate)}%</span><span>Annual reducing rate</span></div>
                </div>

                <div className="emi-field">
                  <label htmlFor="tenure">Tenure in years</label>
                  <input id="tenure" type="number" min="0" step="0.1" value={tenure} onChange={(e) => setTenure(safeNumber(e.target.value))} />
                  <input className="emi-field-range" type="range" min="1" max="30" step="0.5" value={Math.min(Math.max(tenure, 1), 30)} onChange={(e) => setTenure(safeNumber(e.target.value))} />
                  <div className="emi-field-meta"><span>{formatCompact(tenure)} years</span><span>{Math.round(tenure * 12)} months</span></div>
                </div>

                {(viewMode === 'budget' || viewMode === 'tenure') && (
                  <div className="emi-field">
                    <label htmlFor="target-emi">{viewMode === 'budget' ? 'Affordable EMI' : 'Target EMI'}</label>
                    <input id="target-emi" type="number" min="0" value={targetEMI} onChange={(e) => setTargetEMI(safeNumber(e.target.value))} />
                    <div className="emi-field-meta"><span>{formatCurrency(targetEMI)}</span><span>Reverse calculation driver</span></div>
                  </div>
                )}

                <div className="emi-field">
                  <label htmlFor="extra-emi">Extra EMI / month</label>
                  <input id="extra-emi" type="number" min="0" value={extraEMI} onChange={(e) => setExtraEMI(safeNumber(e.target.value))} />
                  <div className="emi-field-meta"><span>{formatCurrency(extraEMI)}</span><span>Recurring prepayment</span></div>
                </div>

                <div className="emi-field">
                  <label htmlFor="lump-sum">Lump sum prepayment</label>
                  <input id="lump-sum" type="number" min="0" value={lumpSum} onChange={(e) => setLumpSum(safeNumber(e.target.value))} />
                  <div className="emi-field-meta"><span>{formatCurrency(lumpSum)}</span><span>Applied in month 12</span></div>
                </div>
              </div>

              {invalidState ? <div className="emi-error">{invalidState}</div> : null}
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Visual analytics</h3>
                  <p>Switch chart views for principal versus interest, balance over time, and first-year principal-interest spread.</p>
                </div>
                <div className="emi-chip-row">
                  {[
                    { id: 'pie', label: 'Pie chart' },
                    { id: 'balance', label: 'Balance graph' },
                    { id: 'split', label: 'P vs I graph' },
                  ].map((item) => (
                    <button key={item.id} className={`emi-chip${chartType === item.id ? ' active' : ''}`} onClick={() => setChartType(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="emi-summary">
                <div className="emi-summary-card">
                  <small>Loan considered</small>
                  <strong>{formatCurrency(derived.resolvedLoanAmount)}</strong>
                  <span>{viewMode === 'budget' ? 'Derived from your EMI budget.' : 'Active principal in the calculation.'}</span>
                </div>
                <div className="emi-summary-card">
                  <small>Working tenure</small>
                  <strong>{Number.isFinite(derived.resolvedTenure) ? `${formatCompact(derived.resolvedTenure)} yrs` : '∞'}</strong>
                  <span>{viewMode === 'tenure' ? 'Estimated from your target EMI.' : 'Configured repayment horizon.'}</span>
                </div>
              </div>

              <div className="emi-chart-wrap" style={{ marginTop: 16 }}>
                {chartType === 'pie' ? <PieChart principal={derived.resolvedLoanAmount} interest={totalInterest} /> : null}
                {chartType === 'balance' ? <LineChart points={chartPoints} color="#FB923C" label="Balance over time" /> : null}
                {chartType === 'split' ? <BarsChart rows={schedule} /> : null}
                <div className="emi-legend">
                  <span><i style={{ background: '#FB923C' }} />Principal</span>
                  <span><i style={{ background: '#4D96FF' }} />Interest</span>
                  <span><i style={{ background: '#00E5A8' }} />Savings meter</span>
                </div>
              </div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Interactive schedule</h3>
                  <p>Search entries, toggle monthly or yearly breakdown, and export the amortization sheet in CSV or JSON.</p>
                </div>
                <div className="emi-mini-actions">
                  <button className={`emi-mini-btn${scheduleMode === 'month' ? ' active' : ''}`} onClick={() => setScheduleMode('month')}>Monthly</button>
                  <button className={`emi-mini-btn${scheduleMode === 'year' ? ' active' : ''}`} onClick={() => setScheduleMode('year')}>Yearly</button>
                  <button className="emi-mini-btn" onClick={exportCSV}>CSV</button>
                  <button className="emi-mini-btn" onClick={exportJSON}>JSON</button>
                </div>
              </div>

              <div className="emi-grid-2" style={{ marginBottom: 14 }}>
                <div className="emi-field">
                  <label htmlFor="schedule-search">Search month / year</label>
                  <input id="schedule-search" value={scheduleSearch} onChange={(e) => setScheduleSearch(e.target.value)} placeholder="eg. Jan 2027 or Year 2" />
                </div>
                <div className="emi-field">
                  <label htmlFor="share-box">Share summary</label>
                  <input id="share-box" value={shareText} readOnly />
                </div>
              </div>

              <div className="emi-table-wrap">
                <div className="emi-table-scroll">
                  <table className="emi-table">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Lump sum</th>
                        <th>Balance</th>
                        <th>Heat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleRows.slice(0, 180).map((row) => (
                        <tr key={`${row.label}-${row.month}`}>
                          <td>{row.label}</td>
                          <td>{formatCurrency(row.payment)}</td>
                          <td>{formatCurrency(row.principal)}</td>
                          <td>{formatCurrency(row.interest)}</td>
                          <td>{row.lumpSum ? formatCurrency(row.lumpSum) : '-'}</td>
                          <td>{formatCurrency(row.balance)}</td>
                          <td>
                            <span className={`emi-tag${row.interestRatio > 0.55 ? ' hot' : ' cool'}`}>
                              {row.interestRatio > 0.55 ? 'Interest-heavy' : 'Principal-led'}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {!scheduleRows.length ? (
                        <tr>
                          <td colSpan="7">No rows match your current schedule filter.</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>EMI calendar view</h3>
                  <p>The first 12 installments are mapped like a payment calendar so high-interest months stand out instantly.</p>
                </div>
              </div>
              <div className="emi-calendar">
                {calendarRows.map((row) => (
                  <div key={row.month} className={`emi-calendar-card${row.interestRatio >= heavyThreshold ? ' hot' : ''}`}>
                    <strong>{row.label}</strong>
                    <span>EMI: {formatCurrency(row.payment)}</span>
                    <span>Interest: {formatCurrency(row.interest)}</span>
                    <span>Principal: {formatCurrency(row.principal)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Prepayment strategy and multi-loan compare</h3>
                  <p>Benchmark normal repayment against smarter strategies, then compare three loans to find the cheapest total outflow.</p>
                </div>
              </div>

              <div className="emi-compare-list">
                {[
                  {
                    label: 'Normal',
                    emi: derived.baseSchedule.schedule[0]?.payment || derived.resolvedEMI,
                    interest: derived.baseSchedule.totalInterest,
                    total: derived.baseSchedule.totalPayment,
                    best: false,
                  },
                  {
                    label: 'With extra EMI',
                    emi: derived.resolvedEMI + derived.extra,
                    interest: buildSchedule({
                      principal: derived.resolvedLoanAmount,
                      annualRate: derived.rate,
                      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
                      baseEMI: derived.resolvedEMI,
                      extraEMI: derived.extra,
                    }).totalInterest,
                    total: buildSchedule({
                      principal: derived.resolvedLoanAmount,
                      annualRate: derived.rate,
                      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
                      baseEMI: derived.resolvedEMI,
                      extraEMI: derived.extra,
                    }).totalPayment,
                    best: derived.extra > 0 && derived.lump === 0,
                  },
                  {
                    label: 'With lump sum',
                    emi: derived.resolvedEMI,
                    interest: buildSchedule({
                      principal: derived.resolvedLoanAmount,
                      annualRate: derived.rate,
                      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
                      baseEMI: derived.resolvedEMI,
                      lumpSum: derived.lump,
                    }).totalInterest,
                    total: buildSchedule({
                      principal: derived.resolvedLoanAmount,
                      annualRate: derived.rate,
                      years: Number.isFinite(derived.resolvedTenure) ? derived.resolvedTenure : derived.years,
                      baseEMI: derived.resolvedEMI,
                      lumpSum: derived.lump,
                    }).totalPayment,
                    best: derived.lump > 0 && derived.extra === 0,
                  },
                ].map((item) => (
                  <div key={item.label} className={`emi-compare-card${item.best ? ' best' : ''}`}>
                    <div className="emi-compare-top">
                      <strong>{item.label}</strong>
                      {item.best ? <span className="emi-tag cool">Best current pick</span> : null}
                    </div>
                    <div className="emi-compare-metrics">
                      <div>
                        <strong>{formatCurrency(item.emi)}</strong>
                        <span>Monthly outflow</span>
                      </div>
                      <div>
                        <strong>{formatCurrency(item.interest)}</strong>
                        <span>Total interest</span>
                      </div>
                      <div>
                        <strong>{formatCurrency(item.total)}</strong>
                        <span>Total repayment</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="emi-grid-3" style={{ marginTop: 16 }}>
                {comparisonData.map((loan, index) => (
                  <div key={loan.id} className={`emi-compare-card${cheapestLoan?.id === loan.id ? ' best' : ''}`}>
                    <div className="emi-compare-top">
                      <strong>Loan {loan.id}</strong>
                      {cheapestLoan?.id === loan.id ? <span className="emi-tag cool">Cheapest</span> : null}
                    </div>
                    <div className="emi-field" style={{ marginBottom: 10 }}>
                      <label>Amount</label>
                      <input type="number" min="0" value={compareLoans[index].amount} onChange={(e) => setCompareLoans((current) => current.map((item, inner) => inner === index ? { ...item, amount: safeNumber(e.target.value) } : item))} />
                    </div>
                    <div className="emi-field" style={{ marginBottom: 10 }}>
                      <label>Rate</label>
                      <input type="number" min="0" step="0.1" value={compareLoans[index].rate} onChange={(e) => setCompareLoans((current) => current.map((item, inner) => inner === index ? { ...item, rate: safeNumber(e.target.value) } : item))} />
                    </div>
                    <div className="emi-field">
                      <label>Tenure</label>
                      <input type="number" min="0" step="0.5" value={compareLoans[index].tenure} onChange={(e) => setCompareLoans((current) => current.map((item, inner) => inner === index ? { ...item, tenure: safeNumber(e.target.value) } : item))} />
                    </div>
                    <div className="emi-note">
                      EMI {formatCurrency(loan.emi)}. Interest {formatCurrency(loan.interest)}. Total {formatCurrency(loan.total)}.
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>History and favorites</h3>
                  <p>Configurations persist in local storage so you can bookmark options, reload them later, and compare repayment plans faster.</p>
                </div>
              </div>

              <div className="emi-grid-2">
                <div className="emi-history">
                  {(history.length ? history : [{ id: 'empty', label: 'No history yet', createdAt: 'Use Save History after adjusting the calculator.', amount: 0, rate: 0 }]).map((item) => (
                    <div key={item.id} className="emi-history-item">
                      <div className="emi-history-copy">
                        <strong>{item.label}</strong>
                        <span>{item.createdAt}</span>
                      </div>
                      {item.id !== 'empty' ? (
                        <div className="emi-history-actions">
                          <button className="emi-mini-btn" onClick={() => loadConfig(item)}>Load</button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="emi-history">
                  {(favorites.length ? favorites : [{ id: 'fav-empty', name: 'No favorites saved', amount: 0, rate: 0, tenure: 0 }]).map((item) => (
                    <div key={item.id} className="emi-history-item">
                      <div className="emi-history-copy">
                        <strong>{item.name || 'Favorite plan'}</strong>
                        <span>{item.id === 'fav-empty' ? 'Use Add Favorite to save the current setup.' : `${formatCurrency(item.amount)} • ${formatCompact(item.rate)}% • ${formatCompact(item.tenure)} yrs`}</span>
                      </div>
                      {item.id !== 'fav-empty' ? (
                        <div className="emi-history-actions">
                          <button className="emi-mini-btn" onClick={() => { setSelectedFav(item.id); loadConfig(item); }}>Load</button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {favoriteSummary ? (
                    <div className="emi-note">
                      Selected favorite: {favoriteSummary.name}. {formatCurrency(favoriteSummary.amount)} at {formatCompact(favoriteSummary.rate)}% for {formatCompact(favoriteSummary.tenure)} years.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <aside className="emi-side">
            <div className="emi-result emi-glass">
              <span className="emi-kicker">Sticky live result panel</span>
              <strong className="emi-big">{formatCurrency(emi)}</strong>
              <div className="emi-note">Monthly EMI based on your active mode. In tenure mode this stays fixed while the payoff duration changes.</div>
              <div className="emi-result-grid">
                <div className="emi-result-cell">
                  <small>Total interest</small>
                  <strong>{formatCurrency(totalInterest)}</strong>
                </div>
                <div className="emi-result-cell">
                  <small>Total payment</small>
                  <strong>{formatCurrency(totalPayment)}</strong>
                </div>
                <div className="emi-result-cell">
                  <small>Closure date</small>
                  <strong>{derived.currentSchedule.closureDate}</strong>
                </div>
                <div className="emi-result-cell">
                  <small>Interest saved</small>
                  <strong>{formatCurrency(derived.savings)}</strong>
                </div>
              </div>
              <div className="emi-meter" aria-label="Savings meter">
                <span style={{ width: `${challengeScore}%` }} />
              </div>
              <div className="emi-note">Challenge score: {challengeScore}/100. Push it higher by increasing recurring prepayment or adding a bigger lump sum.</div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Financial planner</h3>
                  <p>Gauge affordability, target range, and income stress before you commit.</p>
                </div>
              </div>
              <div className="emi-field">
                <label htmlFor="monthly-income">Monthly income</label>
                <input id="monthly-income" type="number" min="0" value={monthlyIncome} onChange={(e) => setMonthlyIncome(safeNumber(e.target.value))} />
                <div className="emi-field-meta"><span>Recommended EMI: {formatCurrency(recommendedMin)} to {formatCurrency(recommendedMax)}</span><span>{formatCompact(ratio)}% used</span></div>
              </div>
              <div className="emi-note">{plannerMessage}</div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Rule-based AI insights</h3>
                  <p>Fast heuristics that surface payoff ideas and explain where the savings are hiding.</p>
                </div>
              </div>
              <div className="emi-tips">
                {insightCards.map((item) => (
                  <div key={item.title} className="emi-tip">
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="emi-card emi-glass">
              <div className="emi-card-head">
                <div>
                  <h3>Export and share</h3>
                  <p>Print the current setup, copy a formatted summary, or export raw schedules.</p>
                </div>
              </div>
              <div className="emi-mini-actions">
                <button className="emi-mini-btn" onClick={() => window.print()}>Print View</button>
                <button className={`emi-mini-btn${copied === 'share' ? ' active' : ''}`} onClick={() => handleCopy('share', shareText)}>
                  {copied === 'share' ? 'Copied' : 'Copy Result'}
                </button>
                <button className={`emi-mini-btn${copied === 'json' ? ' active' : ''}`} onClick={() => handleCopy('json', JSON.stringify(schedule.slice(0, 24), null, 2))}>
                  {copied === 'json' ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <div className="emi-note">
                Share text: {shareText}
              </div>
            </div>
          </aside>
        </section>

        <div className="emi-foot">
          Built as a single client page with inline math, local persistence, responsive glass UI, and QR-inspired grid energy using the `#FB923C` theme.
        </div>
      </div>
    </div>
  );
}
