'use client'

import { useState } from 'react'
import { MONTHS } from '../lib/constants'

// ─── TOKEN (dynamic based on dark prop) ──────────────────────────────────────
export const getTokens = (dark = true) => ({
  input: dark
    ? 'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-slate-100 placeholder:text-white/25 focus:outline-none focus:ring-2 transition-all duration-150'
    : 'w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 transition-all duration-150',
  inputStyle: dark
    ? { borderColor: 'rgba(255,255,255,0.1)', '--tw-ring-color': 'rgba(255,107,107,0.2)' }
    : { borderColor: '#E5E7EB', '--tw-ring-color': 'rgba(255,107,107,0.15)' },
  label: dark
    ? 'mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/70'
    : 'mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.12em] text-gray-600',
})

// Legacy token for compatibility
export const TOKEN = {
  input: 'w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-slate-100 placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all duration-150',
  label: 'mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40',
}

// ─── MONTH/YEAR PICKER ────────────────────────────────────────────────────────
export function MonthYearPicker({ value, onChange, dark = true }) {
  const [m, y] = value ? value.split(' ') : ['', '']
  const year = new Date().getFullYear()
  const years = Array.from({ length: 45 }, (_, i) => year - i)
  const set = (mo, yr) => (mo && yr) ? onChange(`${mo} ${yr}`) : onChange('')
  const selStyle = dark
    ? { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#F0F4FF' }
    : { background: '#FFFFFF', borderColor: '#E5E7EB', color: '#111827' }
  const selCls = 'flex-1 rounded-xl border px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all'
  return (
    <div className="flex gap-2">
      <select value={m || ''} onChange={e => set(e.target.value, y)} className={selCls} style={selStyle}>
        <option value="">Month</option>
        {MONTHS.map(mo => <option key={mo} value={mo}>{mo}</option>)}
      </select>
      <select value={y || ''} onChange={e => set(m, e.target.value)} className={selCls} style={selStyle}>
        <option value="">Year</option>
        {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
      </select>
    </div>
  )
}

// ─── ENTRY CARD ───────────────────────────────────────────────────────────────
export function EntryCard({ title, subtitle, onDelete, canDelete = true, defaultOpen = true, dark = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'
  const headerBg = dark ? 'rgba(255,255,255,0.03)' : '#F9FAFB'
  const titleColor = dark ? '#F0F4FF' : '#111827'
  const subtitleColor = dark ? 'rgba(255,255,255,0.38)' : '#6B7280'
  return (
    <div style={{ overflow: 'hidden', borderRadius: 16, border: `1px solid ${borderColor}` }}>
      <div
        role="button" tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: headerBg, cursor: 'pointer', transition: 'background 0.15s' }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: titleColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
            {title || '—'}
          </p>
          {subtitle && (
            <p style={{ fontSize: 12, color: subtitleColor, margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12, flexShrink: 0 }}
          onClick={e => e.stopPropagation()}>
          {canDelete && (
            <button type="button" onClick={e => { e.stopPropagation(); onDelete() }}
              style={{ padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#FF6B6B', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.18)', cursor: 'pointer', transition: 'all 0.15s' }}>
              Remove
            </button>
          )}
          <span style={{ fontSize: 11, color: subtitleColor, userSelect: 'none' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${borderColor}`, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── ADD BUTTON ───────────────────────────────────────────────────────────────
export function AddButton({ label, onClick, dark = true }) {
  return (
    <button type="button" onClick={onClick}
      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 14, border: '1.5px dashed rgba(255,107,107,0.3)', background: 'rgba(255,107,107,0.04)', color: '#FF6B6B', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,107,107,0.5)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,107,107,0.3)' }}>
      + {label}
    </button>
  )
}

// ─── FIELD WRAPPER ────────────────────────────────────────────────────────────
export function Field({ label, children, dark = true, hint }) {
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#4B5563'
  const hintColor = dark ? 'rgba(255,255,255,0.2)' : '#9CA3AF'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{ fontSize: 12.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: labelColor }}>{label}</label>
        {hint && <span style={{ fontSize: 10, color: hintColor }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export function Input({ dark = true, ...props }) {
  const style = dark
    ? { width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '11px 14px', fontSize: 13, color: '#F0F4FF', outline: 'none', transition: 'all 0.15s', boxSizing: 'border-box' }
    : { width: '100%', borderRadius: 12, border: '1px solid #E5E7EB', background: '#FFFFFF', padding: '11px 14px', fontSize: 13, color: '#111827', outline: 'none', transition: 'all 0.15s', boxSizing: 'border-box' }
  return (
    <input {...props} style={{ ...style, ...(props.style || {}) }}
      onFocus={e => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,107,0.12)' }}
      onBlur={e => { e.target.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
  )
}

// ─── TEXTAREA ─────────────────────────────────────────────────────────────────
export function Textarea({ dark = true, ...props }) {
  const style = dark
    ? { width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '11px 14px', fontSize: 13, color: '#F0F4FF', outline: 'none', resize: 'none', transition: 'all 0.15s', boxSizing: 'border-box', lineHeight: 1.6 }
    : { width: '100%', borderRadius: 12, border: '1px solid #E5E7EB', background: '#FFFFFF', padding: '11px 14px', fontSize: 13, color: '#111827', outline: 'none', resize: 'none', transition: 'all 0.15s', boxSizing: 'border-box', lineHeight: 1.6 }
  return (
    <textarea {...props} style={{ ...style, ...(props.style || {}) }}
      onFocus={e => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,107,0.12)' }}
      onBlur={e => { e.target.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
  )
}

// ─── SELECT ───────────────────────────────────────────────────────────────────
export function Select({ dark = true, children, ...props }) {
  const style = dark
    ? { width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '11px 14px', fontSize: 13, color: '#F0F4FF', outline: 'none', transition: 'all 0.15s', boxSizing: 'border-box' }
    : { width: '100%', borderRadius: 12, border: '1px solid #E5E7EB', background: '#FFFFFF', padding: '11px 14px', fontSize: 13, color: '#111827', outline: 'none', transition: 'all 0.15s', boxSizing: 'border-box' }
  return <select {...props} style={{ ...style, ...(props.style || {}) }}>{children}</select>
}

// ─── GRID ─────────────────────────────────────────────────────────────────────
export function Grid2({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>
}

// ─── SKILL DISPLAY (for resume preview) ──────────────────────────────────────
export function SkillDisplay({ skill, style, colors }) {
  const pct = skill.level || 0
  if (style === 'dots') {
    const filled = Math.round(pct / 20)
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {[1,2,3,4,5].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= filled ? colors.secondary : colors.borderColor, display: 'inline-block' }} />)}
      </span>
    )
  }
  if (style === 'bars') return (
    <div style={{ width: 64, height: 4, background: colors.borderColor, borderRadius: 3 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: colors.secondary, borderRadius: 3 }} />
    </div>
  )
  if (style === 'percentage') return <span style={{ fontSize: 8.5, color: colors.mutedColor, fontWeight: 600 }}>{pct}%</span>
  if (style === 'text') {
    const label = pct >= 90 ? 'Expert' : pct >= 70 ? 'Advanced' : pct >= 50 ? 'Intermediate' : 'Beginner'
    return <span style={{ fontSize: 8, padding: '1px 6px', background: colors.borderColor, borderRadius: 8, color: colors.textColor }}>{label}</span>
  }
  return null
}

// ─── RESUME SECTION HEAD ──────────────────────────────────────────────────────
export function ResumeSectionHead({ title, colors, style }) {
  const base = { fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: colors.primary, margin: '0 0 5px 0' }
  if (style === 'underline') return <h2 style={{ ...base, borderBottom: `2px solid ${colors.secondary}`, paddingBottom: 3 }}>{title}</h2>
  if (style === 'box') return <h2 style={{ ...base, background: colors.primary, color: '#fff', padding: '3px 8px', borderRadius: 2 }}>{title}</h2>
  if (style === 'badge') return <h2 style={{ ...base, background: colors.secondary + '22', color: colors.secondary, padding: '2px 8px', borderRadius: 12, display: 'inline-block' }}>{title}</h2>
  if (style === 'colored-bar') return <h2 style={{ ...base, borderLeft: `3px solid ${colors.secondary}`, paddingLeft: 6 }}>{title}</h2>
  return <h2 style={base}>{title}</h2>
}