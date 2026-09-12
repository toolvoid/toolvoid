import JSZip from 'jszip';

const escape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const safeName = (value, fallback) => (value || fallback).replace(/[^a-z0-9._-]+/gi, '-').toLowerCase();
const safeHref = (value = '') => {
  const href = String(value).trim();
  return /^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(href) ? href : '#';
};
const sectionBackground = (section, colors) => {
  const type = section.backgroundType || 'solid';
  const pattern = type === 'dots' ? 'radial-gradient(rgba(255,255,255,.24) 1px, transparent 1px)' : type === 'grid' ? 'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)' : type === 'stripes' ? 'repeating-linear-gradient(135deg,rgba(255,255,255,.16) 0 1px,transparent 1px 12px)' : '';
  const image = type === 'image' ? `linear-gradient(${section.backgroundOverlay || 'rgba(0,0,0,0)'},${section.backgroundOverlay || 'rgba(0,0,0,0)'}),url("${section.backgroundImage || ''}")` : '';
  const gradient = type === 'linear' ? `linear-gradient(${section.backgroundAngle ?? 135}deg, ${colors.join(', ')})` : type === 'radial' ? `radial-gradient(circle at center, ${colors.join(', ')})` : '';
  return { image: image || pattern || gradient, size: type === 'image' ? section.backgroundFit || 'cover' : type === 'dots' ? '18px 18px' : type === 'grid' ? '24px 24px' : 'auto', position: section.backgroundPosition || 'center', repeat: type === 'image' ? 'no-repeat' : pattern ? 'repeat' : 'no-repeat' };
};
const objectSpot = (scatter, index) => {
  const random = [[12,18],[74,14],[48,32],[82,62],[18,72],[60,82],[36,56],[90,36]];
  const corners = [[5,8],[82,8],[7,74],[80,72]];
  const edges = [[8,18],[38,5],[76,12],[91,42],[68,87],[28,90],[4,58]];
  const points = scatter === 'corners' ? corners : scatter === 'edges' ? edges : random;
  return points[index % points.length];
};
const backgroundObjectsMarkup = (objects = []) => objects.length ? `<div class="bg-objects" aria-hidden="true">${objects.flatMap((object) => Array.from({ length: Math.max(1, Number(object.quantity) || 1) }, (_, index) => {
  const [left, top] = objectSpot(object.scatter, index); const dot = ['starfield', 'dotgrid'].includes(object.type); const size = Math.max(2, Number(object.size) || 100); const speed = { slow: 18, medium: 10, fast: 5 }[object.speed] || 10;
  const animation = object.animation === 'rotate' ? `rotate-${['cube', 'pyramid'].includes(object.type) ? object.axis || 'y' : 'z'}` : object.animation || 'none';
  const fill = object.gradient ? `linear-gradient(135deg,${object.color},${object.color2 || '#38bdf8'})` : object.color || '#c4b5fd';
  return `<i class="bg-object bg-${escape(object.type)} bg-${escape(animation)}" style="left:${left + (dot ? (index % 5) * 3 : 0)}%;top:${top + (dot ? Math.floor(index / 5) * 4 : 0)}%;width:${dot ? size : size}px;height:${dot ? size : size}px;opacity:${Number(object.opacity ?? .45)};color:${escape(object.color || '#c4b5fd')};background:${escape(fill)};animation-duration:${speed}s;animation-direction:${object.direction === 'counter' ? 'reverse' : 'normal'}"></i>`;
}))}</div>` : '';

export async function buildSiteMakerZip(name, pagesOrSections) {
  const zip = new JSZip(); const assets = zip.folder('assets'); const assetUrls = new Map(); let assetCount = 0;
  const pages = Array.isArray(pagesOrSections) && pagesOrSections.length && pagesOrSections[0]?.sections
    ? pagesOrSections
    : [{ id: 'home', name: 'Home', slug: '/', sections: pagesOrSections || [] }];
  const pageFiles = new Map(); const usedFiles = new Set();
  pages.forEach((page, index) => {
    const base = page.slug === '/' ? 'index' : safeName(String(page.slug || page.name || `page-${index + 1}`).replace(/^\/+/, ''), `page-${index + 1}`).replace(/\.html$/i, '') || `page-${index + 1}`;
    let file = `${base}.html`, suffix = 2;
    while (usedFiles.has(file)) file = `${base}-${suffix++}.html`;
    usedFiles.add(file); pageFiles.set(page.id, file);
  });
  const localAssetUrl = (element) => {
    if (!element.media?.file) return element.content || '';
    if (assetUrls.has(element.id)) return assetUrls.get(element.id);
    const extension = element.media.name?.split('.').pop() || (element.type === 'video' ? 'mp4' : 'png');
    const fileName = safeName(`${element.type}-${++assetCount}-${element.media.name || `media.${extension}`}`, `asset-${assetCount}.${extension}`);
    assets.file(fileName, element.media.file);
    const path = `assets/${fileName}`; assetUrls.set(element.id, path); return path;
  };
  const pageMarkup = (page) => (page.sections || []).filter((section) => !section.hidden).map((section) => {
    const colors = section.backgroundColors?.length ? section.backgroundColors : [section.background || '#172554'];
    const background = sectionBackground(section, colors);
    const elements = (section.elements || []).sort((a, b) => a.y - b.y);
    return `<section class="site-section" style="background-color:${escape(colors[0])};background-image:${escape(background.image || 'none')};background-size:${escape(background.size)};background-position:${escape(background.position)};background-repeat:${escape(background.repeat)}">${backgroundObjectsMarkup(section.backgroundObjects)}${elements.map((element) => {
      const style = element.style || {}; const css = `left:${element.x}px;top:${element.y}px;width:${element.width}px;height:${element.height}px;color:${escape(style.color || '#fff')};font-family:${escape(style.fontFamily || 'system-ui')};font-size:${style.fontSize || 18}px;font-weight:${style.fontWeight || 400};text-align:${style.textAlign || 'left'};background-color:${escape(style.backgroundColor || 'transparent')};border-radius:${style.borderRadius || 0}px;`;
      const source = localAssetUrl(element);
      if (element.type === 'image') return `<img class="site-element" style="${css}" src="${escape(source)}" alt="">`;
      if (element.type === 'video') return source ? `<video class="site-element" style="${css}" src="${escape(source)}" controls></video>` : '';
      if (element.type === 'button') {
        const href = element.linkType === 'page' ? pageFiles.get(element.pageId) || '#' : safeHref(element.href);
        return `<a class="site-element button" style="${css}" href="${escape(href)}"${element.openInNewTab ? ' target="_blank" rel="noreferrer"' : ''}>${escape(element.content)}</a>`;
      }
      if (element.type === 'social') return `<nav class="site-element social" style="${css}" aria-label="Social links">${(element.links || ['instagram', 'twitter', 'linkedin']).map((platform) => `<a href="${escape(safeHref(element.urls?.[platform]))}"${element.openInNewTab ? ' target="_blank" rel="noreferrer"' : ''}>${escape(platform)}</a>`).join('')}</nav>`;
      if (element.type === 'carousel') return `<div class="site-element carousel" style="${css}" data-autoplay="${element.autoplay !== false}" data-delay="${Math.max(1, Number(element.transitionSpeed) || 4) * 1000}" data-dots="${element.showDots !== false}" data-arrows="${element.showArrows !== false}"><div class="carousel-slides">${(element.images || []).map((src, index) => `<img class="${index === 0 ? 'active' : ''}" src="${escape(src)}" alt="Slide ${index + 1}">`).join('')}</div></div>`;
      return `<${element.type === 'heading' ? 'h2' : 'p'} class="site-element" style="${css}">${escape(element.content)}</${element.type === 'heading' ? 'h2' : 'p'}>`;
    }).join('')}</section>`;
  }).join('\n');
  pages.forEach((page) => {
    const title = page.name && page.name !== 'Home' ? `${name} — ${page.name}` : name;
    zip.file(pageFiles.get(page.id), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><link rel="stylesheet" href="styles.css"></head><body>${pageMarkup(page)}<footer>Made with ToolVoid Site Maker</footer><script src="carousel.js"></script></body></html>`);
  });
  zip.file('styles.css', `.site-section{position:relative;min-height:440px;width:1200px;padding:0;overflow:hidden}.bg-objects{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}.bg-object{position:absolute;display:block;transform-style:preserve-3d;will-change:transform}.bg-ring{background:transparent!important;border:calc(min(10px,10%)) solid currentColor;border-radius:99px}.bg-circle,.bg-orbs{border-radius:99px}.bg-triangle{clip-path:polygon(50% 0,100% 100%,0 100%)}.bg-hexagon{clip-path:polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0 50%)}.bg-star{clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 93%,50% 72%,21% 93%,32% 57%,2% 35%,39% 35%)}.bg-blob{border-radius:62% 38% 55% 45%/45% 58% 42% 55%}.bg-cube{clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);box-shadow:inset -20px -20px 25px #0005,inset 20px 20px 25px #fff4}.bg-pyramid{clip-path:polygon(50% 0,100% 100%,0 100%);box-shadow:inset 0 -24px 25px #0005}.bg-orbs{filter:blur(1px);box-shadow:0 0 32px currentColor}.bg-starfield,.bg-dotgrid{border-radius:99px}.bg-starfield{box-shadow:0 0 8px currentColor}.bg-mesh{width:330px!important;height:260px!important;border-radius:55%;filter:blur(32px)}.bg-rotate-z{animation-name:bg-rotate-z;animation-timing-function:linear;animation-iteration-count:infinite}.bg-rotate-x{animation-name:bg-rotate-x;animation-timing-function:linear;animation-iteration-count:infinite}.bg-rotate-y{animation-name:bg-rotate-y;animation-timing-function:linear;animation-iteration-count:infinite}.bg-float{animation:bg-float 10s ease-in-out infinite}.bg-orbit{animation:bg-orbit 10s linear infinite}.bg-pulse{animation:bg-pulse 10s ease-in-out infinite}.bg-drift{animation:bg-drift 10s linear infinite}.bg-parallax{animation:bg-parallax 1s linear both;animation-timeline:scroll()}@keyframes bg-rotate-z{to{transform:rotate(360deg)}}@keyframes bg-rotate-x{to{transform:perspective(800px) rotateX(360deg)}}@keyframes bg-rotate-y{to{transform:perspective(800px) rotateY(360deg)}}@keyframes bg-float{0%,100%{transform:translateY(-12px)}50%{transform:translateY(14px)}}@keyframes bg-orbit{to{transform:rotate(360deg) translateX(42px) rotate(-360deg)}}@keyframes bg-pulse{0%,100%{transform:scale(.82)}50%{transform:scale(1.12)}}@keyframes bg-drift{0%{transform:translate(-20px,-12px)}50%{transform:translate(30px,24px)}100%{transform:translate(-20px,-12px)}}@keyframes bg-parallax{from{transform:translateY(-38px)}to{transform:translateY(38px)}}.site-element{position:absolute;z-index:1;box-sizing:border-box;margin:0;object-fit:cover}.site-element.button{display:grid;place-items:center;padding:0 18px;border-radius:999px;background:#fff;color:#172554;text-decoration:none;font-weight:700}.social{display:flex;align-items:center;gap:10px}.social a{display:grid;place-items:center;width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.14);color:inherit;text-decoration:none;font-size:11px}.carousel{overflow:hidden;background:#111827}.carousel-slides,.carousel img{width:100%;height:100%}.carousel img{position:absolute;inset:0;object-fit:cover;opacity:0;transition:opacity .45s ease}.carousel img.active{opacity:1}.carousel button{position:absolute;top:50%;z-index:2;width:30px;height:30px;border:0;border-radius:99px;background:rgba(10,10,20,.58);color:#fff;cursor:pointer;translate:0 -50%}.carousel .carousel-prev{left:10px}.carousel .carousel-next{right:10px}.carousel-dots{position:absolute;z-index:2;bottom:10px;left:0;right:0;display:flex;justify-content:center;gap:6px}.carousel-dots button{position:static;translate:none;width:7px;height:7px;padding:0;background:rgba(255,255,255,.55)}.carousel-dots button.active{background:#fff}footer{padding:24px;text-align:center;color:#64748b}@media(max-width:768px){.site-section{width:100%;min-height:0;padding:40px 24px;display:flex;flex-direction:column;gap:16px}.site-element{position:static!important;width:100%!important;height:auto!important;min-height:44px}.carousel{height:220px!important}.carousel img{position:absolute!important}}`);
  zip.file('carousel.js', `document.querySelectorAll('.carousel').forEach((carousel)=>{const slides=[...carousel.querySelectorAll('img')];if(slides.length<2)return;let active=0;const show=(next)=>{active=(next+slides.length)%slides.length;slides.forEach((slide,index)=>slide.classList.toggle('active',index===active));dots?.querySelectorAll('button').forEach((dot,index)=>dot.classList.toggle('active',index===active))};if(carousel.dataset.arrows==='true'){[['‹','carousel-prev',-1],['›','carousel-next',1]].forEach(([label,className,direction])=>{const button=document.createElement('button');button.className=className;button.textContent=label;button.setAttribute('aria-label',direction<0?'Previous slide':'Next slide');button.onclick=()=>show(active+direction);carousel.append(button)})}let dots;if(carousel.dataset.dots==='true'){dots=document.createElement('div');dots.className='carousel-dots';slides.forEach((_,index)=>{const dot=document.createElement('button');dot.className=index===0?'active':'';dot.setAttribute('aria-label','Show slide '+(index+1));dot.onclick=()=>show(index);dots.append(dot)});carousel.append(dots)}if(carousel.dataset.autoplay==='true')setInterval(()=>show(active+1),Number(carousel.dataset.delay)||4000)})`);
  zip.file('README.txt', 'This is a local Site Maker export.\n\nEach Site Maker page is exported as its own HTML file. The Home page is index.html, and internal page buttons point to the matching file.\n\nImages and uploaded videos are included inside assets/. Keep that folder next to the HTML files when hosting.\n\nHost it by dragging the exported folder to Netlify, running `vercel deploy`, or publishing it with GitHub Pages.');
  return zip.generateAsync({ type: 'blob' });
}
