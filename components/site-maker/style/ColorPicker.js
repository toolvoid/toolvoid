'use client';

const COLORS = ['#111827', '#374151', '#6b7280', '#ffffff', '#a78bfa', '#f472b6', '#38bdf8', '#34d399', '#fbbf24', '#fb7185'];

export default function ColorPicker({ label, value = '#ffffff', onChange }) {
  return <div className="sm-color-picker"><span className="sm-field-label">{label}</span><div className="sm-swatch-row">{COLORS.map((color) => <button key={color} type="button" aria-label={`Use ${color}`} className={value.toLowerCase() === color ? 'active' : ''} style={{ background: color }} onClick={() => onChange(color)} />)}<input aria-label={`${label} custom color`} type="color" value={value.startsWith('#') ? value : '#ffffff'} onChange={(event) => onChange(event.target.value)} /></div><div className="sm-hex-row"><span style={{ background: value }} /><input value={value} onChange={(event) => onChange(event.target.value)} /></div></div>;
}
