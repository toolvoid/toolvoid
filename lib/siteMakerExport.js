import JSZip from 'jszip';

const escape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const safeName = (value, fallback) => (value || fallback).replace(/[^a-z0-9._-]+/gi, '-').toLowerCase();

export async function buildSiteMakerZip(name, sections) {
  const zip = new JSZip(); const assets = zip.folder('assets'); const assetUrls = new Map(); let assetCount = 0;
  const localAssetUrl = (element) => {
    if (!element.media?.file) return element.content || '';
    if (assetUrls.has(element.id)) return assetUrls.get(element.id);
    const extension = element.media.name?.split('.').pop() || (element.type === 'video' ? 'mp4' : 'png');
    const fileName = safeName(`${element.type}-${++assetCount}-${element.media.name || `media.${extension}`}`, `asset-${assetCount}.${extension}`);
    assets.file(fileName, element.media.file);
    const path = `assets/${fileName}`; assetUrls.set(element.id, path); return path;
  };
  const markup = sections.filter((section) => !section.hidden).map((section) => {
    const colors = section.backgroundColors?.length ? section.backgroundColors : [section.background || '#172554'];
    const background = section.backgroundType === 'linear' ? `linear-gradient(${section.backgroundAngle ?? 135}deg, ${colors.join(', ')})` : section.backgroundType === 'radial' ? `radial-gradient(circle, ${colors.join(', ')})` : colors[0];
    const elements = (section.elements || []).sort((a, b) => a.y - b.y);
    return `<section class="site-section" style="background:${escape(background)}">${elements.map((element) => {
      const style = element.style || {}; const css = `left:${element.x}px;top:${element.y}px;width:${element.width}px;height:${element.height}px;color:${escape(style.color || '#fff')};font-family:${escape(style.fontFamily || 'system-ui')};font-size:${style.fontSize || 18}px;font-weight:${style.fontWeight || 400};text-align:${style.textAlign || 'left'};background-color:${escape(style.backgroundColor || 'transparent')};border-radius:${style.borderRadius || 0}px;`;
      const source = localAssetUrl(element);
      if (element.type === 'image') return `<img class="site-element" style="${css}" src="${escape(source)}" alt="">`;
      if (element.type === 'video') return source ? `<video class="site-element" style="${css}" src="${escape(source)}" controls></video>` : '';
      if (element.type === 'button') return `<a class="site-element button" style="${css}" href="#">${escape(element.content)}</a>`;
      return `<${element.type === 'heading' ? 'h2' : 'p'} class="site-element" style="${css}">${escape(element.content)}</${element.type === 'heading' ? 'h2' : 'p'}>`;
    }).join('')}</section>`;
  }).join('\n');
  zip.file('index.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(name)}</title><link rel="stylesheet" href="styles.css"></head><body>${markup}<footer>Made with ToolVoid Site Maker</footer></body></html>`);
  zip.file('styles.css', `.site-section{position:relative;min-height:440px;width:1200px;padding:0;overflow:hidden;background-size:cover}.site-element{position:absolute;box-sizing:border-box;margin:0;object-fit:cover}.site-element.button{display:grid;place-items:center;padding:0 18px;border-radius:999px;background:#fff;color:#172554;text-decoration:none;font-weight:700}footer{padding:24px;text-align:center;color:#64748b}@media(max-width:768px){.site-section{width:100%;min-height:0;padding:40px 24px;display:flex;flex-direction:column;gap:16px}.site-element{position:static!important;width:100%!important;height:auto!important;min-height:44px}}`);
  zip.file('README.txt', 'This is a local Site Maker export.\n\nImages and uploaded videos are included inside assets/. Keep that folder next to index.html when hosting.\n\nHost it by dragging the exported folder to Netlify, running `vercel deploy`, or publishing it with GitHub Pages.');
  return zip.generateAsync({ type: 'blob' });
}
