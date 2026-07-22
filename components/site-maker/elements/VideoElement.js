'use client';

export default function VideoElement({ element, editable = false, showSettings = false, onSettingsChange = () => {} }) {
  const url = element.content || '';
  const muted = element.videoMuted !== false;
  const frameStyle = { width: '100%', height: '100%', border: 0, borderRadius: element.style?.borderRadius || 14, objectFit: 'cover', pointerEvents: editable ? 'none' : 'auto' };
  let embed = '';
  try { embed = url.includes('youtu.be') ? `https://www.youtube.com/embed/${url.split('/').pop().split('?')[0]}` : url.includes('youtube.com/watch') ? `https://www.youtube.com/embed/${new URL(url).searchParams.get('v')}` : url.includes('vimeo.com') ? `https://player.vimeo.com/video/${url.split('/').pop()}` : ''; } catch { embed = ''; }
  const source = embed ? `${embed}${embed.includes('?') ? '&' : '?'}mute=${muted ? '1' : '0'}` : '';
  return <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    {url.startsWith('blob:') ? <video className="sm-video-element" style={frameStyle} src={url} controls muted={muted} /> : source ? <iframe className="sm-video-element" style={frameStyle} src={source} title="Embedded video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="sm-video-placeholder" style={{ ...frameStyle, display: 'grid', placeItems: 'center', gap: 7, textAlign: 'center', background: 'linear-gradient(135deg,rgba(167,139,250,.38),rgba(56,189,248,.25))', border: '2px dashed rgba(255,255,255,.7)', color: '#fff' }}><b style={{ width: 43, height: 43, display: 'grid', placeItems: 'center', borderRadius: '50%', background: 'rgba(18,16,44,.65)', fontSize: 18 }}>▶</b><strong style={{ fontSize: 14 }}>Add a video</strong><span style={{ fontSize: 11 }}>Select this block to upload or paste a URL</span></div>}
    {showSettings && <label onClick={(event) => event.stopPropagation()} style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 9px', borderRadius: 7, background: 'rgba(16,15,31,.92)', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 14px rgba(0,0,0,.25)' }}><input type="checkbox" checked={!muted} onChange={(event) => onSettingsChange({ videoMuted: !event.target.checked })} /> Sound on</label>}
  </div>;
}
