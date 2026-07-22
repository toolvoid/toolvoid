'use client';

import { useState } from 'react';

const starter = '<div style="padding:16px;font-family:system-ui;animation:float 2.5s ease-in-out infinite">\n  Your custom block\n</div>\n<style>@keyframes float{50%{transform:translateY(-8px)}}</style>';

export default function CodeElement({ element, editable, editorMode = false, onChange }) {
  const html = element.content || starter;
  const previewDocument = `<style>html,body{width:100%;height:100%;margin:0;padding:0;overflow:hidden;background:transparent}*{box-sizing:border-box}</style>${html}`;
  const [draft, setDraft] = useState(html);
  const update = (next) => { setDraft(next); onChange(next); };
  const addMedia = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const source = URL.createObjectURL(file);
    const tag = type === 'image' ? `<img src="${source}" alt="" style="max-width:100%;height:auto">` : `<video src="${source}" controls style="width:100%;height:auto"></video>`;
    update(`${draft}\n${tag}`);
    event.target.value = '';
  };
  if (!editable) return <iframe title="Custom HTML block" sandbox="allow-scripts" srcDoc={previewDocument} style={{ width: '100%', height: '100%', border: 0, borderRadius: element.style?.borderRadius || 10, background: 'transparent', pointerEvents: editorMode ? 'none' : 'auto' }} />;
  return <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 7, padding: 9, borderRadius: element.style?.borderRadius || 10, background: '#111827' }}>
    <div className="sm-custom-drag-handle" title="Drag this handle to move the custom block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 7px', borderRadius: 6, background: 'rgba(167,139,250,.2)', color: '#ede9fe', fontSize: 10, fontWeight: 800, cursor: 'grab', userSelect: 'none' }}><span>⋮⋮ Drag custom block</span><span>HTML</span></div>
    <textarea aria-label="Custom HTML" value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={(event) => onChange(event.target.value)} spellCheck="false" style={{ minHeight: 0, width: '100%', resize: 'none', border: 0, outline: 0, background: 'transparent', color: '#e9d5ff', fontFamily: 'DM Mono, monospace', fontSize: element.style?.fontSize || 13, lineHeight: 1.55 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c4b5fd', fontSize: 10 }}><span>Custom HTML · click outside to run preview</span><label style={{ cursor: 'pointer' }}>+ image<input type="file" accept="image/*" hidden onChange={(event) => addMedia(event, 'image')} /></label><label style={{ cursor: 'pointer' }}>+ video<input type="file" accept="video/*" hidden onChange={(event) => addMedia(event, 'video')} /></label></div>
  </div>;
}
