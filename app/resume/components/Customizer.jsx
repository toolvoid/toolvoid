'use client'

import { useState } from 'react'
import { COLOR_PRESETS } from '../lib/constants'

const TOKEN_INPUT = 'w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-white/22 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.07] transition-all'
const TOKEN_LABEL = 'mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/75'

function Seg({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`flex-1 rounded-lg py-2 text-xs font-medium capitalize transition-all ${value === opt ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md' : 'text-white/40 hover:bg-white/[0.05] hover:text-white/65'}`}>
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function Customizer({ custom, setCustom }) {
  const [tab, setTab] = useState('colors')
  const upd = (k, v) => setCustom(prev => ({ ...prev, [k]: v }))

  return (
    <div className="space-y-7">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-1">
        {[['colors', '🎨 Colors'], ['fonts', '✏️ Fonts'], ['style', '✨ Style']].map(([t, label]) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${tab === t ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md' : 'text-white/35 hover:bg-white/[0.05] hover:text-white/65'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'colors' && (
        <div className="space-y-6">
          <div>
            <p className={TOKEN_LABEL}>Color Presets</p>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map(p => (
                <button key={p.name} type="button"
                  onClick={() => setCustom(prev => ({ ...prev, primaryColor: p.primary, secondaryColor: p.secondary, accentColor: p.accent }))}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-left transition-all hover:border-white/18 hover:bg-white/[0.06]">
                  <div className="flex gap-1 flex-shrink-0">
                    {[p.primary, p.secondary, p.accent].map((c, i) => (
                      <div key={i} style={{ background: c }} className="h-4 w-4 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-white/55 truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[['primaryColor', 'Header / Primary'], ['secondaryColor', 'Accent / Links'], ['accentColor', 'Highlight / Tags']].map(([k, label]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/45">{label}</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={custom[k]} onChange={e => upd(k, e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent" />
                  <span className="w-16 font-mono text-[10.5px] text-white/28">{custom[k]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'fonts' && (
        <div className="space-y-6">
          <div>
            <label className={TOKEN_LABEL}>Heading Font</label>
            <select className={`${TOKEN_INPUT} bg-[#0c1825]`} value={custom.headingFont} onChange={e => upd('headingFont', e.target.value)}>
              {['Georgia', 'Garamond', 'Times New Roman', 'Playfair Display', 'Montserrat', 'Oswald', 'Raleway'].map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={TOKEN_LABEL}>Body Font</label>
            <select className={`${TOKEN_INPUT} bg-[#0c1825]`} value={custom.bodyFont} onChange={e => upd('bodyFont', e.target.value)}>
              {['Arial', 'Helvetica', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'Calibri'].map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={TOKEN_LABEL}>Section Spacing</label>
            <Seg options={['compact', 'normal', 'spacious']} value={custom.sectionSpacing} onChange={v => upd('sectionSpacing', v)} />
          </div>
        </div>
      )}

      {tab === 'style' && (
        <div className="space-y-7">
          <div>
            <label className={TOKEN_LABEL}>Section Headers</label>
            <div className="grid grid-cols-2 gap-1.5">
              {['underline', 'box', 'badge', 'colored-bar', 'plain'].map(s => (
                <button key={s} type="button" onClick={() => upd('sectionHeaderStyle', s)}
                  className={`rounded-xl py-2 text-xs font-medium capitalize transition-all ${custom.sectionHeaderStyle === s ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'bg-white/[0.04] text-white/38 hover:bg-white/[0.07]'}`}>
                  {s.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={TOKEN_LABEL}>Skill Display</label>
            <Seg options={['dots', 'bars', 'tags', 'text']} value={custom.skillStyle} onChange={v => upd('skillStyle', v)} />
          </div>
          <div>
            <label className={TOKEN_LABEL}>Bullet Style</label>
            <div className="flex gap-2">
              {['•', '▪', '→', '◦', '-', '✓', '▶'].map(s => (
                <button key={s} type="button" onClick={() => upd('bulletStyle', s)}
                  className={`h-9 w-9 rounded-xl text-base transition-all ${custom.bulletStyle === s ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'bg-white/[0.04] text-white/38 hover:bg-white/[0.07]'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={TOKEN_LABEL}>Photo Shape</label>
            <Seg options={['circle', 'square', 'rounded']} value={custom.photoShape} onChange={v => upd('photoShape', v)} />
          </div>
          <div>
            <label className={TOKEN_LABEL}>Profile Photo</label>
            <Seg options={['on', 'off']} value={custom.showPhoto ? 'on' : 'off'} onChange={v => upd('showPhoto', v === 'on')} />
          </div>
        </div>
      )}
    </div>
  )
}