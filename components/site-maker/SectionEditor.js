export default function SectionEditor({ section, onChange, onDelete }) {
  const update = (field, value) => onChange({ ...section, content: { ...section.content, [field]: value } });

  return (
    <div style={{ display: 'grid', gap: '.7rem', padding: '1rem', background: '#171721', border: '1px solid rgba(255,255,255,.1)', borderTop: 0, borderRadius: '0 0 12px 12px' }}>
      <label style={labelStyle}>Title<input value={section.content.title} onChange={(event) => update('title', event.target.value)} style={inputStyle} /></label>
      <label style={labelStyle}>Description<textarea value={section.content.description} onChange={(event) => update('description', event.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></label>
      <label style={labelStyle}>Image URL <span style={{ color: '#8b8b9d', textTransform: 'none' }}>(Supabase upload comes next)</span><input placeholder="https://…" value={section.content.imageUrl} onChange={(event) => update('imageUrl', event.target.value)} style={inputStyle} /></label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '.7rem', alignItems: 'end' }}>
        <label style={labelStyle}>Background color<input type="color" value={section.content.color} onChange={(event) => update('color', event.target.value)} style={{ ...inputStyle, height: 38, padding: 3 }} /></label>
        <label style={labelStyle}>Section size<select value={section.size} onChange={(event) => onChange({ ...section, size: event.target.value })} style={inputStyle}>{['small', 'medium', 'large', 'full'].map((size) => <option key={size}>{size}</option>)}</select></label>
        <button type="button" onClick={onDelete} style={{ ...buttonStyle, background: '#3a1923', color: '#fda4af' }}>Delete</button>
      </div>
    </div>
  );
}

const labelStyle = { display: 'grid', gap: '.35rem', color: '#b6b6c6', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' };
const inputStyle = { width: '100%', border: '1px solid rgba(255,255,255,.13)', borderRadius: 8, background: '#0e0e16', color: '#f4f4f8', padding: '.65rem .7rem', font: 'inherit' };
const buttonStyle = { border: 0, borderRadius: 8, padding: '.7rem .85rem', cursor: 'pointer', fontWeight: 700 };
