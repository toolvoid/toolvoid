'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Copy, ImagePlus, Layers3, Trash2, Type } from 'lucide-react';
import IconElement from '../elements/IconElement';
import ShapeElement from '../elements/ShapeElement';
import DividerElement from '../elements/DividerElement';
import VideoElement from '../elements/VideoElement';
import FormElement from '../elements/FormElement';
import SocialLinksElement from '../elements/SocialLinksElement';
import CodeElement from '../elements/CodeElement';
import ImageUploader from '../media/ImageUploader';
import VideoUploader from '../media/VideoUploader';

const FRAME_WIDTH = 1200;
const elementStyle = { position: 'absolute', boxSizing: 'border-box' };
function PlusGlyph({ type }) { return <span style={{ fontSize: 11, fontWeight: 800 }}>{type === 'video' ? '▶' : type === 'form' ? '▤' : type === 'social' ? '●' : type === 'divider' ? '—' : type === 'shape' ? '◇' : '✦'}</span>; }
const TOOL_LABELS = { heading: 'Heading', text: 'Custom text', image: 'Image', button: 'Button', icon: 'Icon', shape: 'Shape', divider: 'Divider', video: 'Video', form: 'Form', social: 'Social', code: 'Custom HTML' };

function ElementContent({ element, editable, selected, onChange, onMediaChange, onSettingsChange = () => {} }) {
  const style = element.style || {};
  const visual = { fontFamily: style.fontFamily || undefined, fontSize: style.fontSize ? `${style.fontSize}px` : undefined, fontWeight: style.fontWeight || undefined, fontStyle: style.fontStyle || undefined, textAlign: style.textAlign || undefined, color: style.color || undefined, backgroundColor: style.backgroundColor && style.backgroundColor !== 'transparent' ? style.backgroundColor : undefined, border: style.borderWidth ? `${style.borderWidth}px ${style.borderStyle || 'solid'} ${style.borderColor || '#fff'}` : undefined, borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined, boxShadow: style.boxShadow || undefined, opacity: style.opacity ?? 1, padding: style.padding || undefined, whiteSpace: style.whiteSpace || undefined };
  if (element.type === 'icon') return <IconElement element={element} editable={editable && selected} onChange={onChange} />;
  if (element.type === 'shape') return <ShapeElement element={element} editable={editable && selected} onChange={onChange} />;
  if (element.type === 'divider') return <DividerElement element={element} />;
  if (element.type === 'video') return <><VideoElement element={element} editable={editable} showSettings={editable && selected} onSettingsChange={onSettingsChange} />{editable && selected && <VideoUploader onChange={onMediaChange} />}</>;
  if (element.type === 'form') return <FormElement element={element} />;
  if (element.type === 'social') return <SocialLinksElement element={element} />;
  if (element.type === 'code') return <CodeElement element={element} editable={editable && selected} editorMode={editable} onChange={onChange} />;
  if (element.type === 'image') return <>{element.content ? <Image unoptimized src={element.content} alt="" width={320} height={220} className="sm-element-image" style={visual} /> : <div className="sm-image-placeholder" style={{ ...visual, background: 'linear-gradient(135deg,rgba(167,139,250,.34),rgba(56,189,248,.2))', border: '2px dashed rgba(255,255,255,.7)', borderRadius: 14 }}><ImagePlus size={30} /><strong style={{ fontSize: 14 }}>Add an image</strong><span style={{ fontSize: 11 }}>Select this block to upload</span></div>}{editable && selected && <ImageUploader value={element.content} onChange={onMediaChange} />}</>;
  if (element.type === 'button') return <div className="sm-element-button" style={visual} contentEditable={editable && selected} suppressContentEditableWarning onBlur={(event) => onChange(event.currentTarget.textContent || 'Button')}>{element.content}</div>;
  const Tag = element.type === 'heading' ? 'h2' : 'p';
  return <Tag className={`sm-element-${element.type}`} style={visual} contentEditable={editable && selected} suppressContentEditableWarning onBlur={(event) => onChange(event.currentTarget.textContent || '')}>{element.content}</Tag>;
}

function FloatingToolbar({ element, onDelete, onDuplicate, onFront, onUpdate }) {
  return <div className="sm-element-toolbar" onMouseDown={(event) => event.stopPropagation()}><button title="Duplicate element" onClick={onDuplicate}><Copy size={13} /></button><button title="Bring to front" onClick={onFront}><Layers3 size={13} /></button><button title="Delete element" onClick={onDelete}><Trash2 size={13} /></button>{element.type === 'image' && <label title="Change image URL"><ImagePlus size={13} /><input placeholder="Image URL" defaultValue={element.content} onBlur={(event) => event.target.value && onUpdate({ content: event.target.value, media: null })} /></label>}</div>;
}

export function createSectionRenderer(label, icon, type = label.toLowerCase()) {
  return function SectionRenderer({ section, editable = false, mobileMode = false, breakpoint = 'desktop', selectedElementId, selectedElementIds = [], onSelectElement, onUpdateElement, onDeleteElement, onDuplicateElement, onBringToFront, onAddElement, scale = 1 }) {
    // Normalize older saved projects so a partially migrated section never crashes the editor.
    const elements = [...(Array.isArray(section.elements) ? section.elements : [])].sort((a, b) => a.y - b.y || a.zIndex - b.zIndex);
    const height = section.height || 440;
    const sectionRef = useRef(null); const [revealed, setRevealed] = useState(false); const [guides, setGuides] = useState({});
    const isScrollAnimation = String(section.animation || '').startsWith('scroll-');
    useEffect(() => { if (!isScrollAnimation) { setRevealed(true); return undefined; } const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); } }, { threshold: .14 }); if (sectionRef.current) observer.observe(sectionRef.current); return () => observer.disconnect(); }, [isScrollAnimation]);
    const colors = section.backgroundColors?.length ? section.backgroundColors : [section.background || '#172554'];
    const isGradient = section.backgroundType === 'linear' || section.backgroundType === 'radial';
    const backgroundImage = section.backgroundType === 'linear' ? `linear-gradient(${section.backgroundAngle ?? 135}deg, ${colors.join(', ')})` : section.backgroundType === 'radial' ? `radial-gradient(circle at center, ${colors.join(', ')})` : 'none';
    const motionDuration = Math.max(2, Number(section.motionDuration) || 8); const rawIntensity = Number(section.motionIntensity); const motionIntensity = Number.isFinite(rawIntensity) ? Math.max(0, Math.min(100, rawIntensity)) : 55;
    const backgroundAnimation = section.animation === 'aurora' ? `smSiteAurora ${motionDuration}s ease-in-out infinite alternate` : section.animation === 'fade-in' ? `smSiteFade ${motionDuration}s ease-in-out infinite alternate` : section.animation === 'slide-up' ? `smSiteSlide ${motionDuration}s ease-in-out infinite alternate` : section.animation === 'shimmer' ? `smSiteShimmer ${motionDuration}s ease-in-out infinite alternate` : section.animation === 'depth' ? `smSiteDepth ${motionDuration}s ease-in-out infinite alternate` : section.animation === 'glow' ? `smSiteGlow ${motionDuration}s ease-in-out infinite alternate` : undefined;
    const revealAnimation = isScrollAnimation && revealed ? ({ 'scroll-zoom': 'smRevealZoom .7s cubic-bezier(.2,.8,.2,1) both', 'scroll-up': 'smRevealUp .65s cubic-bezier(.2,.8,.2,1) both', 'scroll-left': 'smRevealLeft .65s cubic-bezier(.2,.8,.2,1) both', 'scroll-right': 'smRevealRight .65s cubic-bezier(.2,.8,.2,1) both', 'scroll-bounce': 'smRevealBounce .8s cubic-bezier(.2,.8,.2,1) both' }[section.animation] || 'smRevealFade .55s ease both') : undefined;
    const hiddenTranslate = section.animation === 'scroll-up' ? '0 24px' : section.animation === 'scroll-left' ? '-32px 0' : section.animation === 'scroll-right' ? '32px 0' : '0 0';
    const sectionStyle = { width: FRAME_WIDTH, height, backgroundColor: colors[0], backgroundImage, backgroundSize: ['slide-up','shimmer'].includes(section.animation) && isGradient ? '160% 160%' : undefined, backgroundRepeat: 'no-repeat', position: 'relative', overflow: 'hidden', color: '#fff', fontFamily: 'system-ui, sans-serif', '--sm-hue': `${Math.round(motionIntensity * .55)}deg`, '--sm-bright': `${(1 + motionIntensity / 250).toFixed(2)}`, '--sm-saturation': `${(1 + motionIntensity / 180).toFixed(2)}`, '--sm-shift': `${Math.round(motionIntensity * 1.4)}px`, animation: [backgroundAnimation, revealAnimation].filter(Boolean).join(', ') || undefined, opacity: isScrollAnimation && !revealed ? 0 : 1, translate: isScrollAnimation && !revealed ? hiddenTranslate : '0 0' };
    const animationStyles = <style>{'@keyframes smSiteFade{0%,100%{filter:saturate(.9) brightness(.94)}50%{filter:saturate(var(--sm-saturation)) brightness(var(--sm-bright))}}@keyframes smSiteSlide{0%{background-position:0 0}100%{background-position:var(--sm-shift) calc(var(--sm-shift) * .4)}}@keyframes smSiteAurora{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(var(--sm-hue)) saturate(var(--sm-saturation))}100%{filter:hue-rotate(calc(var(--sm-hue) * -.7))}}@keyframes smSiteShimmer{0%,100%{background-position:0 0;filter:brightness(.98)}50%{background-position:var(--sm-shift) calc(var(--sm-shift) * -.25);filter:brightness(var(--sm-bright))}}@keyframes smSiteDepth{0%,100%{filter:contrast(1) saturate(.95)}50%{filter:contrast(var(--sm-bright)) saturate(var(--sm-saturation))}}@keyframes smSiteGlow{0%,100%{filter:brightness(.94) saturate(.95)}50%{filter:brightness(var(--sm-bright)) saturate(var(--sm-saturation))}}@keyframes smRevealFade{from{opacity:0}to{opacity:1}}@keyframes smRevealUp{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}@keyframes smRevealLeft{from{opacity:0;translate:-36px 0}to{opacity:1;translate:0 0}}@keyframes smRevealRight{from{opacity:0;translate:36px 0}to{opacity:1;translate:0 0}}@keyframes smRevealZoom{from{opacity:0;scale:.96}to{opacity:1;scale:1}}@keyframes smRevealBounce{0%{opacity:0;scale:.86}65%{opacity:1;scale:1.025}100%{opacity:1;scale:1}}'}</style>;
    const hasOverride = breakpoint !== 'desktop' && elements.some((element) => element.responsive?.[breakpoint]);
    const autoStack = mobileMode && !hasOverride;

    if (autoStack) {
      const reorderMobile = (event, target) => { const draggedId = event.dataTransfer.getData('application/x-toolvoid-mobile-element'); if (!editable || !draggedId || draggedId === target.id) return; event.preventDefault(); const bounds = event.currentTarget.getBoundingClientRect(); const after = event.clientY > bounds.top + bounds.height / 2; onUpdateElement?.(section.id, draggedId, { y: target.y + (after ? 1 : -1) }); };
      return <>{animationStyles}<section className="sm-mobile-section" style={{ backgroundColor: colors[0], backgroundImage, backgroundRepeat: 'no-repeat', animation: backgroundAnimation }} onClick={() => editable && onSelectElement?.(null)}>{editable && <div style={{ position: 'sticky', top: 8, zIndex: 30, display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18, padding: 7, borderRadius: 9, background: '#191727', boxShadow: '0 7px 20px rgba(0,0,0,.28)' }} onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => onSelectElement?.(null)} style={{ border: 0, borderRadius: 6, padding: '6px 8px', background: 'rgba(167,139,250,.25)', color: '#ede9fe', fontWeight: 700, fontSize: 10 }}>✦ Background & animation</button>{['heading','text','image','button','shape','video'].map((elementType) => <button type="button" key={elementType} onClick={() => onAddElement?.(section.id, elementType)} style={{ border: 0, borderRadius: 6, padding: '6px 7px', background: 'rgba(255,255,255,.08)', color: '#ede9fe', fontSize: 10 }}>{TOOL_LABELS[elementType]}</button>)}</div>}<div className="sm-mobile-kicker">{icon} {label} {editable && '· drag blocks to reorder'}</div>{elements.map((element) => { const selected = selectedElementIds.length ? selectedElementIds.includes(element.id) : element.id === selectedElementId; const contentChange = (content) => onUpdateElement?.(section.id, element.id, { content }); const mediaChange = (media) => onUpdateElement?.(section.id, element.id, { content: media.url, media }); const minHeight = ['image','video'].includes(element.type) ? 220 : element.type === 'shape' ? 170 : element.type === 'form' ? 220 : element.type === 'code' ? 160 : element.type === 'button' ? 48 : undefined; return <div draggable={editable} key={element.id} className={`sm-mobile-element ${element.type}`} onDragStart={(event) => { if (editable) event.dataTransfer.setData('application/x-toolvoid-mobile-element', element.id); }} onDragOver={(event) => editable && event.preventDefault()} onDrop={(event) => reorderMobile(event, element)} onClick={(event) => { if (!editable) return; event.stopPropagation(); onSelectElement?.(element.id, event.shiftKey); }} style={{ minHeight, outline: selected && editable ? '2px solid #a78bfa' : '2px solid transparent', outlineOffset: 5, borderRadius: 6, cursor: editable ? 'grab' : 'default' }}><span style={{ display: editable ? 'block' : 'none', marginBottom: 6, color: '#c4b5fd', font: '700 10px DM Mono, monospace' }}>⋮⋮ Drag to reorder</span><ElementContent element={element} editable={editable} selected={selected} onChange={contentChange} onMediaChange={mediaChange} /></div>; })}</section></>;
    }

    const dropElement = (event) => {
      const elementType = event.dataTransfer.getData('application/x-toolvoid-element');
      if (!editable || !elementType) return;
      event.preventDefault();
      const bounds = event.currentTarget.getBoundingClientRect();
      onAddElement?.(section.id, elementType, { x: Math.round((event.clientX - bounds.left) / scale), y: Math.round((event.clientY - bounds.top) / scale) });
    };
    const snapPosition = (elementId, rawPosition) => {
      const moving = elements.find((element) => element.id === elementId);
      if (!moving) return { ...rawPosition, guides: {} };
      const movingPosition = moving.responsive?.[breakpoint] || moving;
      const point = { x: rawPosition.x, y: rawPosition.y };
      const guide = {};
      const snap = 8;
      elements.filter((element) => element.id !== elementId).forEach((element) => {
        const other = element.responsive?.[breakpoint] || element;
        const movingX = [point.x, point.x + movingPosition.width / 2, point.x + movingPosition.width];
        const movingY = [point.y, point.y + movingPosition.height / 2, point.y + movingPosition.height];
        const otherX = [other.x, other.x + other.width / 2, other.x + other.width];
        const otherY = [other.y, other.y + other.height / 2, other.y + other.height];
        movingX.forEach((value, index) => otherX.forEach((target) => { if (Math.abs(value - target) <= snap) { point.x += target - value; guide.x = target; } }));
        movingY.forEach((value, index) => otherY.forEach((target) => { if (Math.abs(value - target) <= snap) { point.y += target - value; guide.y = target; } }));
      });
      return { x: Math.round(point.x), y: Math.round(point.y), guides: guide };
    };
    return <div style={{ height: height * scale, position: 'relative' }}>{animationStyles}<section ref={sectionRef} style={{ ...sectionStyle, transform: `scale(${scale})`, transformOrigin: 'top left' }} onClick={() => onSelectElement?.(null)} onDragOver={(event) => editable && event.preventDefault()} onDrop={dropElement}>{editable && <div className="sm-section-add-elements" style={{ right: 12, bottom: 12, maxWidth: 720, flexWrap: 'wrap', padding: 8 }} onClick={(event) => event.stopPropagation()}><span className="sm-add-title" style={{ width: '100%', marginBottom: 3 }}>Add & drop anywhere</span><button type="button" style={{ width: 'auto', height: 28, padding: '0 8px', gap: 4, fontSize: 10, background: 'rgba(167,139,250,.22)' }} onClick={() => onSelectElement?.(null)}>✦ Background & animation</button>{['heading','text','image','button','icon','shape','divider','video','form','social','code'].map((elementType) => <button draggable style={{ width: 'auto', height: 28, padding: '0 7px', gap: 4, fontSize: 10 }} key={elementType} title={`Drag ${elementType} onto the canvas`} onDragStart={(event) => event.dataTransfer.setData('application/x-toolvoid-element', elementType)} onClick={() => onAddElement?.(section.id, elementType)}><span className="sm-add-icon">{elementType === 'image' ? <ImagePlus size={13} /> : elementType === 'icon' ? <Layers3 size={13} /> : elementType === 'text' ? <Type size={13} /> : elementType === 'button' ? <Copy size={13} /> : <PlusGlyph type={elementType} />}</span><span>{TOOL_LABELS[elementType]}</span></button>)}</div>}{guides.x !== undefined && <i style={{ position: 'absolute', left: guides.x, top: 0, bottom: 0, width: 1, background: '#38bdf8', boxShadow: '0 0 7px #38bdf8', zIndex: 90, pointerEvents: 'none' }} />}{guides.y !== undefined && <i style={{ position: 'absolute', top: guides.y, left: 0, right: 0, height: 1, background: '#38bdf8', boxShadow: '0 0 7px #38bdf8', zIndex: 90, pointerEvents: 'none' }} />}{elements.map((element) => {
      const selected = selectedElementIds.length ? selectedElementIds.includes(element.id) : element.id === selectedElementId;
      const position = element.responsive?.[breakpoint] || element;
      const update = (patch) => onUpdateElement?.(section.id, element.id, patch);
      const contentChange = (content) => update({ content });
      const body = <div className={`sm-element ${selected ? 'selected' : ''}`} style={{ ...elementStyle, width: '100%', height: '100%', zIndex: element.zIndex }} onClick={(event) => { event.stopPropagation(); onSelectElement?.(element.id, event.shiftKey); }}><ElementContent element={element} editable={editable} selected={selected} onChange={contentChange} onMediaChange={(media) => update({ content: media.url, media })} onSettingsChange={update} />{selected && editable && <FloatingToolbar element={element} onDelete={() => onDeleteElement?.(section.id, element.id)} onDuplicate={() => onDuplicateElement?.(section.id, element.id)} onFront={() => onBringToFront?.(section.id, element.id)} onUpdate={update} />}</div>;
      if (!editable) return <div key={element.id} style={{ position: 'absolute', left: position.x, top: position.y, width: position.width, height: position.height, zIndex: element.zIndex }}>{body}</div>;
      const savePosition = (patch) => breakpoint === 'desktop' ? update(patch) : update({ responsive: { ...(element.responsive || {}), [breakpoint]: { x: patch.x ?? position.x, y: patch.y ?? position.y, width: patch.width ?? position.width, height: patch.height ?? position.height } } });
      return <Rnd key={element.id} bounds="parent" dragHandleClassName={element.type === 'code' ? 'sm-custom-drag-handle' : undefined} size={{ width: position.width, height: position.height }} position={{ x: position.x, y: position.y }} style={{ zIndex: element.zIndex }} disableDragging={Boolean(element.locked)} enableResizing={selected && !element.locked} onDrag={(_, data) => { const snapped = snapPosition(element.id, data); setGuides(snapped.guides); }} onDragStop={(_, data) => { setGuides({}); savePosition({ x: Math.round(data.x), y: Math.round(data.y) }); }} onResizeStop={(_, __, ref, ___, nextPosition) => savePosition({ width: Math.round(ref.offsetWidth), height: Math.round(ref.offsetHeight), x: Math.round(nextPosition.x), y: Math.round(nextPosition.y) })}>{body}</Rnd>;
    })}</section></div>;
  };
}
