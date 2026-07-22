'use client';

const FALLBACK_COLORS = ['#172554', '#7c3aed', '#ec4899'];

export default function BackgroundControls({ section, onChange }) {
  const colors = (section.backgroundColors?.length ? section.backgroundColors : [section.background || FALLBACK_COLORS[0], FALLBACK_COLORS[1]]).slice(0, 3);
  const type = section.backgroundType || 'solid';
  const updateColors = (next) => onChange({ backgroundColors: next, background: next[0] || '#172554' });
  return <div className="sm-background-controls" style={{ display: 'grid', gap: 10 }}>
    <span className="sm-field-label">Background</span>
    <div className="sm-choice sm-background-type">{[['solid', 'Solid'], ['linear', 'Gradient'], ['radial', 'Radial']].map(([value, label]) => <button type="button" key={value} className={type === value ? 'active' : ''} onClick={() => onChange({ backgroundType: value })}>{label}</button>)}</div>
    <div className="sm-gradient-preview" style={{ height: 72, borderRadius: 10, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.16)', background: type === 'solid' ? colors[0] : `${type}-gradient(${type === 'linear' ? `${section.backgroundAngle ?? 135}deg, ` : 'circle at center, '}${colors.join(', ')})` }} />
    {colors.map((color, index) => <div className="sm-color-stop" style={{ display: 'grid', gridTemplateColumns: '38px 1fr auto', gap: 7, alignItems: 'center' }} key={`${color}-${index}`}><input aria-label={`Background color ${index + 1}`} style={{ height: 32, padding: 1 }} type="color" value={color} onChange={(event) => updateColors(colors.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} /><input value={color} onChange={(event) => /^#[0-9a-fA-F]{6}$/.test(event.target.value) && updateColors(colors.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} />{index > 1 && <button type="button" style={{ border: 0, borderRadius: 6, padding: '6px 9px', cursor: 'pointer' }} aria-label="Remove color" onClick={() => updateColors(colors.filter((_, itemIndex) => itemIndex !== index))}>×</button>}</div>)}
    {type !== 'solid' && <>{colors.length < 3 && <button type="button" className="sm-add-color" style={{ border: '1px dashed rgba(167,139,250,.55)', borderRadius: 8, padding: 8, background: 'rgba(167,139,250,.08)', color: '#ddd6fe', cursor: 'pointer' }} onClick={() => updateColors([...colors, FALLBACK_COLORS[colors.length]])}>+ Add another color</button>}<label className="sm-field-label">Blend direction: {section.backgroundAngle ?? 135}°<input type="range" min="0" max="360" value={section.backgroundAngle ?? 135} onChange={(event) => onChange({ backgroundAngle: Number(event.target.value) })} /></label></>}
  </div>;
}
