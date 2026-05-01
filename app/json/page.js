'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Instrument+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

.json-root, .json-root * { box-sizing: border-box; }
.json-root {
  --bg: #090910;
  --bg-2: #10111d;
  --bg-3: #151726;
  --card: rgba(15, 16, 28, 0.92);
  --line: rgba(255,255,255,0.08);
  --line-strong: rgba(255,255,255,0.14);
  --text: #eef1ff;
  --muted: #8e94b5;
  --soft: #697091;
  --accent: #4fffb0;
  --accent-soft: rgba(79,255,176,0.12);
  --violet: #a78bfa;
  --violet-soft: rgba(167,139,250,0.12);
  --danger: #ff7285;
  --danger-soft: rgba(255,114,133,0.12);
  --warn: #ffcc66;
  --shadow: 0 24px 80px rgba(0,0,0,0.42);
  min-height: 100vh;
  color: var(--text);
  background:
    radial-gradient(circle at 12% 12%, rgba(79,255,176,0.10), transparent 22%),
    radial-gradient(circle at 88% 14%, rgba(167,139,250,0.12), transparent 24%),
    radial-gradient(circle at 50% 100%, rgba(96,165,250,0.08), transparent 28%),
    linear-gradient(180deg, #08080d 0%, #090910 38%, #0f1220 100%);
  font-family: 'Instrument Sans', sans-serif;
}
.json-root button, .json-root input, .json-root select, .json-root textarea { font: inherit; }
.json-root a { color: inherit; text-decoration: none; }
.json-shell { width: min(1320px, calc(100% - 28px)); margin: 0 auto; }
.json-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  backdrop-filter: blur(18px);
}
.json-brand { display: flex; align-items: center; gap: 12px; }
.json-logo {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(79,255,176,0.26);
  background:
    linear-gradient(135deg, rgba(79,255,176,0.18), rgba(167,139,250,0.12)),
    rgba(255,255,255,0.03);
  position: relative;
  overflow: hidden;
}
.json-logo::before {
  content: '{}';
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: 'DM Mono', monospace;
  color: var(--accent);
  font-size: 14px;
  font-weight: 500;
}
.json-brand small {
  display: block;
  color: var(--soft);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
}
.json-brand strong {
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
}
.json-actions, .json-pills, .json-toolbar { display: flex; flex-wrap: wrap; gap: 10px; }
.json-btn, .json-pill {
  min-height: 42px;
  padding: 10px 15px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  transition: 0.2s ease;
}
.json-btn:hover, .json-pill:hover {
  border-color: var(--line-strong);
  transform: translateY(-1px);
}
.json-btn.primary {
  background: linear-gradient(135deg, var(--accent), #93ffd3);
  color: #062518;
  border-color: rgba(79,255,176,0.28);
  box-shadow: 0 14px 40px rgba(79,255,176,0.16);
  font-weight: 700;
}
.json-btn.secondary {
  border-color: rgba(167,139,250,0.22);
  color: #d9d0ff;
  background: rgba(167,139,250,0.10);
}
.json-pill.active {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: rgba(79,255,176,0.3);
}
.json-hero {
  padding: 42px 0 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.94fr);
  gap: 20px;
  align-items: end;
}
.json-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(79,255,176,0.08);
  border: 1px solid rgba(79,255,176,0.2);
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'DM Mono', monospace;
}
.json-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 6px rgba(79,255,176,0.1);
}
.json-title {
  margin: 18px 0 14px;
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 7vw, 5.3rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
}
.json-title span {
  background: linear-gradient(135deg, var(--accent), var(--violet));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.json-sub {
  max-width: 720px;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.75;
}
.json-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.json-panel {
  border-radius: 24px;
  padding: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}
.json-stat small, .json-label, .json-field label {
  display: block;
  color: var(--soft);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
}
.json-stat strong {
  display: block;
  margin-top: 12px;
  font-size: 1.7rem;
  letter-spacing: -0.05em;
}
.json-stat p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.6;
}
.json-main {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 20px;
  align-items: start;
  padding-bottom: 50px;
}
.json-stack { display: grid; gap: 18px; }
.json-card {
  border-radius: 26px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}
.json-card-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.json-card-head h2, .json-card-head h3 {
  margin: 0;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
}
.json-card-head p {
  margin-top: 7px;
  color: var(--muted);
  line-height: 1.65;
  font-size: 0.92rem;
  max-width: 680px;
}
.json-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-family: 'DM Mono', monospace;
  border: 1px solid var(--line);
}
.json-status.valid {
  color: var(--accent);
  background: rgba(79,255,176,0.10);
  border-color: rgba(79,255,176,0.22);
}
.json-status.invalid {
  color: var(--danger);
  background: var(--danger-soft);
  border-color: rgba(255,114,133,0.22);
}
.json-status.idle {
  color: var(--warn);
  background: rgba(255,204,102,0.10);
  border-color: rgba(255,204,102,0.18);
}
.json-grid-2, .json-grid-3, .json-grid-4 {
  display: grid;
  gap: 12px;
}
.json-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.json-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.json-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.json-field {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.json-input, .json-select, .json-textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(0,0,0,0.20);
  color: var(--text);
  outline: none;
  transition: 0.2s ease;
}
.json-input, .json-select { min-height: 46px; padding: 0 14px; }
.json-textarea {
  min-height: 420px;
  resize: vertical;
  padding: 16px;
  font-family: 'DM Mono', monospace;
  line-height: 1.65;
  font-size: 0.9rem;
}
.json-textarea.compact { min-height: 220px; }
.json-input:focus, .json-select:focus, .json-textarea:focus {
  border-color: rgba(79,255,176,0.36);
  box-shadow: 0 0 0 4px rgba(79,255,176,0.10);
}
.json-textarea.invalid, .json-input.invalid {
  border-color: rgba(255,114,133,0.36);
  box-shadow: 0 0 0 4px rgba(255,114,133,0.08);
}
.json-note, .json-error, .json-output, .json-tree, .json-list-box {
  border-radius: 18px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.json-note {
  color: var(--muted);
  line-height: 1.65;
  font-size: 0.9rem;
}
.json-error {
  color: #ffd4dc;
  background: var(--danger-soft);
  border-color: rgba(255,114,133,0.22);
  font-family: 'DM Mono', monospace;
  font-size: 0.84rem;
  line-height: 1.7;
}
.json-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.82rem;
}
.json-output {
  min-height: 220px;
  overflow: auto;
  font-family: 'DM Mono', monospace;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.7;
  font-size: 0.84rem;
}
.json-output.empty { color: var(--soft); }
.json-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.json-box {
  padding: 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.json-box small {
  display: block;
  color: var(--soft);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
}
.json-box strong {
  display: block;
  margin-top: 8px;
  font-size: 1.2rem;
  letter-spacing: -0.04em;
}
.json-box span {
  display: block;
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.55;
}
.json-side {
  position: sticky;
  top: 82px;
  display: grid;
  gap: 18px;
}
.json-tree {
  max-height: 520px;
  overflow: auto;
  font-family: 'DM Mono', monospace;
  font-size: 0.83rem;
  line-height: 1.75;
}
.json-tree-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.json-tree-row:last-child { border-bottom: none; }
.json-tree-key { color: #b7bdf0; min-width: 90px; }
.json-tree-type { color: var(--accent); }
.json-tree-value { color: var(--muted); word-break: break-word; }
.json-tree-nested { padding-left: 16px; border-left: 1px dashed rgba(255,255,255,0.08); margin-left: 5px; }
.json-mini-list {
  display: grid;
  gap: 10px;
}
.json-mini-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}
.json-mini-item strong {
  display: block;
  font-size: 0.94rem;
}
.json-mini-item span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.82rem;
}
.json-inline-code {
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  color: var(--text);
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
}
.json-foot {
  padding: 8px 0 42px;
  text-align: center;
  color: var(--soft);
  font-size: 0.84rem;
}
@media (max-width: 1080px) {
  .json-main, .json-hero { grid-template-columns: 1fr; }
  .json-side { position: static; }
}
@media (max-width: 760px) {
  .json-grid-4, .json-grid-3, .json-grid-2, .json-summary, .json-hero-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .json-shell { width: min(100% - 18px, 1320px); }
  .json-nav { flex-direction: column; align-items: flex-start; }
  .json-actions { width: 100%; }
  .json-card, .json-panel { padding: 16px; }
  .json-title { font-size: 2.5rem; }
}
`;

const STORAGE_KEY = 'toolsite-json-workbench-v1';

const SAMPLE_JSON = `{
  "project": "toolsite",
  "owner": {
    "name": "Sparsh",
    "active": true
  },
  "tools": [
    "json formatter",
    "qr generator",
    "loan analyzer"
  ],
  "metrics": {
    "users": 18420,
    "growth": 12.4,
    "regions": ["IN", "US", "AE"]
  }
}`;

function safeJsonParse(value) {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return { ok: false, error };
  }
}

function formatError(error) {
  if (!error) return '';
  const message = error.message || 'Invalid JSON';
  const match = message.match(/position (\d+)/i);
  if (!match) return message;
  return `${message}.`;
}

function detectLineColumn(source, error) {
  if (!error?.message) return null;
  const match = error.message.match(/position (\d+)/i);
  if (!match) return null;
  const pos = Number(match[1]);
  const sliced = source.slice(0, pos);
  const lines = sliced.split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortKeysDeep(value[key]);
      return acc;
    }, {});
  }
  return value;
}

function collectStats(value) {
  const stats = { keys: 0, arrays: 0, objects: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, depth: 0 };

  function walk(node, depth) {
    stats.depth = Math.max(stats.depth, depth);
    if (Array.isArray(node)) {
      stats.arrays += 1;
      node.forEach((item) => walk(item, depth + 1));
      return;
    }
    if (node === null) {
      stats.nulls += 1;
      return;
    }
    if (typeof node === 'object') {
      stats.objects += 1;
      Object.entries(node).forEach(([key, child]) => {
        stats.keys += 1;
        walk(child, depth + 1);
      });
      return;
    }
    if (typeof node === 'string') stats.strings += 1;
    else if (typeof node === 'number') stats.numbers += 1;
    else if (typeof node === 'boolean') stats.booleans += 1;
  }

  walk(value, 1);
  return stats;
}

function flattenJson(value) {
  const rows = [];

  function walk(node, path) {
    if (Array.isArray(node)) {
      if (!node.length) rows.push(`${path || '$'} = []`);
      node.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }
    if (node && typeof node === 'object') {
      const entries = Object.entries(node);
      if (!entries.length) rows.push(`${path || '$'} = {}`);
      entries.forEach(([key, child]) => walk(child, path ? `${path}.${key}` : key));
      return;
    }
    rows.push(`${path || '$'} = ${JSON.stringify(node)}`);
  }

  walk(value, '');
  return rows.join('\n');
}

function getValueAtPath(value, path) {
  if (!path.trim()) return value;
  const normalized = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  let current = value;
  for (const part of normalized) {
    if (current === null || current === undefined) return undefined;
    current = current[part];
  }
  return current;
}

function toTypeScript(value, rootName = 'Root') {
  const seen = new Map();
  const blocks = [];

  function pascalize(key) {
    return String(key)
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join('') || 'Item';
  }

  function buildType(node, nameHint) {
    if (Array.isArray(node)) {
      if (!node.length) return 'unknown[]';
      const first = node[0];
      return `${buildType(first, `${nameHint}Item`)}[]`;
    }
    if (node === null) return 'null';
    if (typeof node === 'string') return 'string';
    if (typeof node === 'number') return 'number';
    if (typeof node === 'boolean') return 'boolean';
    if (typeof node === 'object') {
      const signature = JSON.stringify(Object.keys(node).sort());
      if (seen.has(signature)) return seen.get(signature);

      const interfaceName = pascalize(nameHint);
      seen.set(signature, interfaceName);
      const fields = Object.entries(node).map(([key, child]) => `  ${JSON.stringify(key)}: ${buildType(child, key)};`);
      blocks.push(`interface ${interfaceName} {\n${fields.join('\n')}\n}`);
      return interfaceName;
    }
    return 'unknown';
  }

  const rootType = buildType(value, rootName);
  return [...blocks.reverse(), `type ${pascalize(rootName)}Document = ${rootType};`].join('\n\n');
}

function previewValue(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === 'object') return `Object(${Object.keys(value).length})`;
  return JSON.stringify(value);
}

function TreeNode({ label, value, depth = 0, limit = 4 }) {
  const isLeaf = value === null || typeof value !== 'object';
  if (depth > limit) {
    return (
      <div className="json-tree-row">
        <span className="json-tree-key">{label}</span>
        <span className="json-tree-type">truncated</span>
      </div>
    );
  }

  if (isLeaf) {
    return (
      <div className="json-tree-row">
        <span className="json-tree-key">{label}</span>
        <span className="json-tree-type">{typeof value === 'object' ? 'null' : typeof value}</span>
        <span className="json-tree-value">{previewValue(value)}</span>
      </div>
    );
  }

  const entries = Array.isArray(value)
    ? value.map((item, index) => [index, item])
    : Object.entries(value);

  return (
    <div>
      <div className="json-tree-row">
        <span className="json-tree-key">{label}</span>
        <span className="json-tree-type">{Array.isArray(value) ? 'array' : 'object'}</span>
        <span className="json-tree-value">{previewValue(value)}</span>
      </div>
      <div className="json-tree-nested">
        {entries.slice(0, 14).map(([key, child]) => (
          <TreeNode key={`${label}-${key}`} label={String(key)} value={child} depth={depth + 1} limit={limit} />
        ))}
        {entries.length > 14 ? (
          <div className="json-tree-row">
            <span className="json-tree-key">more</span>
            <span className="json-tree-value">{entries.length - 14} hidden nodes</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function JsonWorkbenchPage() {
  const fileRef = useRef(null);
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indentSize, setIndentSize] = useState('2');
  const [queryPath, setQueryPath] = useState('');
  const [copied, setCopied] = useState('');
  const [outputTab, setOutputTab] = useState('viewer');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed.input === 'string') setInput(parsed.input);
      if (typeof parsed.indentSize === 'string') setIndentSize(parsed.indentSize);
      if (typeof parsed.queryPath === 'string') setQueryPath(parsed.queryPath);
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, indentSize, queryPath }));
  }, [input, indentSize, queryPath]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(''), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const parsed = useMemo(() => safeJsonParse(input), [input]);
  const lineColumn = useMemo(() => (parsed.ok ? null : detectLineColumn(input, parsed.error)), [input, parsed]);
  const stats = useMemo(() => (parsed.ok ? collectStats(parsed.value) : null), [parsed]);
  const queryResult = useMemo(() => {
    if (!parsed.ok) return '';
    const found = getValueAtPath(parsed.value, queryPath);
    return found === undefined ? 'Path not found.' : JSON.stringify(found, null, 2);
  }, [parsed, queryPath]);
  const flattened = useMemo(() => (parsed.ok ? flattenJson(parsed.value) : ''), [parsed]);
  const typescript = useMemo(() => (parsed.ok ? toTypeScript(parsed.value) : ''), [parsed]);

  const charCount = input.length;
  const lineCount = input ? input.split('\n').length : 0;
  const statusClass = !input.trim() ? 'idle' : parsed.ok ? 'valid' : 'invalid';
  const statusLabel = !input.trim() ? 'Waiting for JSON' : parsed.ok ? 'Valid JSON' : 'Broken JSON';

  function parseAndTransform(transformer) {
    const result = safeJsonParse(input);
    if (!result.ok) return;
    setInput(JSON.stringify(transformer(result.value), null, Number(indentSize)));
  }

  function handleFormat() {
    parseAndTransform((value) => value);
  }

  function handleMinify() {
    const result = safeJsonParse(input);
    if (!result.ok) return;
    setInput(JSON.stringify(result.value));
  }

  function handleSort() {
    parseAndTransform(sortKeysDeep);
  }

  function handleClear() {
    setInput('');
    setQueryPath('');
    setOutputTab('viewer');
  }

  function handleSample() {
    setInput(SAMPLE_JSON);
    setOutputTab('viewer');
  }

  async function handleCopy(text, type) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
    } catch {
      setCopied('');
    }
  }

  function handleDownload() {
    if (!parsed.ok) return;
    const blob = new Blob([JSON.stringify(parsed.value, null, Number(indentSize))], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handleFileImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ''));
    reader.readAsText(file);
    event.target.value = '';
  }

  return (
    <div className="json-root">
      <style>{CSS}</style>
      <div className="json-shell">
        <nav className="json-nav">
          <div className="json-brand">
            <div className="json-logo" />
            <div>
              <small>Structured data lab</small>
              <strong>JSON Workbench</strong>
            </div>
          </div>
          <div className="json-actions">
            <button className="json-btn" onClick={handleSample}>Load Sample</button>
            <button className="json-btn" onClick={() => fileRef.current?.click()}>Import File</button>
            <button className="json-btn primary" onClick={handleDownload} disabled={!parsed.ok}>Download JSON</button>
            <input ref={fileRef} type="file" accept=".json,application/json,text/plain" hidden onChange={handleFileImport} />
          </div>
        </nav>

        <section className="json-hero">
          <div>
            <div className="json-badge">Validator + formatter + inspector</div>
            <h1 className="json-title">
              Shape messy JSON into <span>clean, usable data.</span>
            </h1>
            <p className="json-sub">
              Validate payloads, pretty-print responses, flatten nested keys, inspect deep paths, and generate instant TypeScript shapes from a single live workspace.
            </p>
          </div>
          <div className="json-hero-grid">
            <div className="json-panel json-stat">
              <small>Status</small>
              <strong>{statusLabel}</strong>
              <p>{parsed.ok ? 'Your data is parseable and ready for transforms.' : 'Syntax issues are surfaced live with line guidance.'}</p>
            </div>
            <div className="json-panel json-stat">
              <small>Characters</small>
              <strong>{charCount}</strong>
              <p>Track payload size while formatting or minifying.</p>
            </div>
            <div className="json-panel json-stat">
              <small>Depth</small>
              <strong>{stats ? stats.depth : 0}</strong>
              <p>Quick signal for how nested and tricky the structure is.</p>
            </div>
            <div className="json-panel json-stat">
              <small>Total keys</small>
              <strong>{stats ? stats.keys : 0}</strong>
              <p>Useful for payload audits and mapping work.</p>
            </div>
          </div>
        </section>

        <section className="json-main">
          <div className="json-stack">
            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h2>Editor and transforms</h2>
                  <p>Paste raw API responses, local config blobs, or exported data files. Format, minify, sort keys, and copy cleaned output without leaving the page.</p>
                </div>
                <div className={`json-status ${statusClass}`}>{statusLabel}</div>
              </div>

              <div className="json-grid-3" style={{ marginBottom: 14 }}>
                <div className="json-field">
                  <label htmlFor="indent-size">Indent size</label>
                  <select id="indent-size" className="json-select" value={indentSize} onChange={(event) => setIndentSize(event.target.value)}>
                    <option value="2">2 spaces</option>
                    <option value="4">4 spaces</option>
                  </select>
                </div>
                <div className="json-field">
                  <label>Quick actions</label>
                  <div className="json-toolbar">
                    <button className="json-btn primary" onClick={handleFormat} disabled={!parsed.ok}>Format</button>
                    <button className="json-btn" onClick={handleMinify} disabled={!parsed.ok}>Minify</button>
                    <button className="json-btn secondary" onClick={handleSort} disabled={!parsed.ok}>Sort Keys</button>
                  </div>
                </div>
                <div className="json-field">
                  <label>Clipboard</label>
                  <div className="json-toolbar">
                    <button className="json-btn" onClick={() => handleCopy(input, 'raw')} disabled={!input}>{copied === 'raw' ? 'Copied Raw' : 'Copy Raw'}</button>
                    <button className="json-btn" onClick={handleClear}>Clear</button>
                  </div>
                </div>
              </div>

              <textarea
                className={`json-textarea${!parsed.ok && input.trim() ? ' invalid' : ''}`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder='Paste JSON here. Example: {"name":"Sparsh","tools":["json","qr"]}'
                spellCheck={false}
              />

              <div className="json-meta" style={{ marginTop: 12 }}>
                <span>{lineCount} lines</span>
                <span>{charCount} chars</span>
                <span>{parsed.ok ? 'Live parse ready' : 'Fix syntax to unlock all tools'}</span>
              </div>

              {!parsed.ok && input.trim() ? (
                <div className="json-error" style={{ marginTop: 14 }}>
                  <div>{formatError(parsed.error)}</div>
                  {lineColumn ? <div>Line {lineColumn.line}, Column {lineColumn.column}</div> : null}
                </div>
              ) : null}
            </div>

            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h3>Stats and path explorer</h3>
                  <p>Understand the shape fast, then extract exact nested values using dot notation like <span className="json-inline-code">owner.name</span> or <span className="json-inline-code">tools[0]</span>.</p>
                </div>
              </div>

              <div className="json-summary">
                <div className="json-box">
                  <small>Objects / Arrays</small>
                  <strong>{stats ? `${stats.objects} / ${stats.arrays}` : '0 / 0'}</strong>
                  <span>Helpful for spotting dense nested payloads or list-heavy responses.</span>
                </div>
                <div className="json-box">
                  <small>Primitive values</small>
                  <strong>{stats ? stats.strings + stats.numbers + stats.booleans + stats.nulls : 0}</strong>
                  <span>Count of strings, numbers, booleans, and nulls in the document.</span>
                </div>
              </div>

              <div className="json-grid-2" style={{ marginTop: 14 }}>
                <div className="json-field">
                  <label htmlFor="json-path">JSON path lookup</label>
                  <input
                    id="json-path"
                    className="json-input"
                    value={queryPath}
                    onChange={(event) => setQueryPath(event.target.value)}
                    placeholder="metrics.regions[1]"
                  />
                </div>
                <div className="json-field">
                  <label>Path actions</label>
                  <div className="json-toolbar">
                    <button className="json-btn" onClick={() => setQueryPath('owner.name')}>Try owner.name</button>
                    <button className="json-btn" onClick={() => handleCopy(queryResult, 'path')} disabled={!parsed.ok}>{copied === 'path' ? 'Copied Result' : 'Copy Result'}</button>
                  </div>
                </div>
              </div>

              <div className={`json-output${queryResult ? '' : ' empty'}`} style={{ marginTop: 14 }}>
                {queryResult || 'Path results will appear here.'}
              </div>
            </div>

            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h3>Derived outputs</h3>
                  <p>Switch between a compact viewer, flattened path map, and auto-generated TypeScript so the same payload can serve debugging, documentation, and development workflows.</p>
                </div>
                <div className="json-pills">
                  <button className={`json-pill${outputTab === 'viewer' ? ' active' : ''}`} onClick={() => setOutputTab('viewer')}>Viewer</button>
                  <button className={`json-pill${outputTab === 'flatten' ? ' active' : ''}`} onClick={() => setOutputTab('flatten')}>Flatten</button>
                  <button className={`json-pill${outputTab === 'types' ? ' active' : ''}`} onClick={() => setOutputTab('types')}>TS Types</button>
                </div>
              </div>

              {outputTab === 'viewer' ? (
                <div className={`json-output${parsed.ok ? '' : ' empty'}`}>
                  {parsed.ok ? JSON.stringify(parsed.value, null, Number(indentSize)) : 'Valid JSON preview will appear here.'}
                </div>
              ) : null}

              {outputTab === 'flatten' ? (
                <div className={`json-output${flattened ? '' : ' empty'}`}>
                  {flattened || 'Flattened key paths will appear here.'}
                </div>
              ) : null}

              {outputTab === 'types' ? (
                <div className={`json-output${typescript ? '' : ' empty'}`}>
                  {typescript || 'TypeScript output will appear here.'}
                </div>
              ) : null}

              <div className="json-toolbar" style={{ marginTop: 14 }}>
                <button
                  className="json-btn"
                  onClick={() => handleCopy(outputTab === 'flatten' ? flattened : outputTab === 'types' ? typescript : (parsed.ok ? JSON.stringify(parsed.value, null, Number(indentSize)) : ''), 'derived')}
                  disabled={outputTab === 'flatten' ? !flattened : outputTab === 'types' ? !typescript : !parsed.ok}
                >
                  {copied === 'derived' ? 'Copied Output' : 'Copy Output'}
                </button>
              </div>
            </div>
          </div>

          <aside className="json-side">
            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h3>Structure preview</h3>
                  <p>Fast glance at the top of the document without scanning the entire raw blob.</p>
                </div>
              </div>
              <div className="json-tree">
                {parsed.ok ? <TreeNode label="root" value={parsed.value} /> : 'Fix the JSON syntax to inspect the tree.'}
              </div>
            </div>

            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h3>Feature deck</h3>
                  <p>The page is designed as a real daily-driver utility, not a basic formatter.</p>
                </div>
              </div>
              <div className="json-mini-list">
                <div className="json-mini-item">
                  <div>
                    <strong>Live syntax validation</strong>
                    <span>Errors show instantly with line and column guidance.</span>
                  </div>
                </div>
                <div className="json-mini-item">
                  <div>
                    <strong>Flatten and path search</strong>
                    <span>Pull exact nested fields for debugging and mapping.</span>
                  </div>
                </div>
                <div className="json-mini-item">
                  <div>
                    <strong>TypeScript scaffolding</strong>
                    <span>Turn payload shape into interface-like types in one click.</span>
                  </div>
                </div>
                <div className="json-mini-item">
                  <div>
                    <strong>Import, export, persistence</strong>
                    <span>Open files, download cleaned JSON, and keep your last draft.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="json-card">
              <div className="json-card-head">
                <div>
                  <h3>Quick usage ideas</h3>
                  <p>Useful when you are bouncing between APIs, config files, and frontend typing work.</p>
                </div>
              </div>
              <div className="json-note">
                Clean API responses before logging them into docs. Flatten payloads to map fields into forms. Generate quick TS types while wiring components. Use path lookup to test whether a nested field exists before writing frontend code around it.
              </div>
            </div>
          </aside>
        </section>

        <div className="json-foot">
          Single-page JSON workbench with formatting, validation, inspection, flattening, TypeScript generation, local draft persistence, and QR-inspired visual styling.
        </div>
      </div>
    </div>
  );
}
