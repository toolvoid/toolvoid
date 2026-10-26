'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function OneBrainLightbox({ images, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const current = useRef({ index, onClose, onChange });

  useEffect(() => { current.current = { index, onClose, onChange }; }, [index, onClose, onChange]);

  useEffect(() => {
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') current.current.onClose();
      if (event.key === 'ArrowRight') current.current.onChange((current.current.index + 1) % images.length);
      if (event.key === 'ArrowLeft') current.current.onChange((current.current.index + images.length - 1) % images.length);
      if (event.key === 'Tab') {
        const controls = document.querySelectorAll('.ob-lightbox button');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus?.();
    };
  }, [images.length]);

  const image = images[index];
  return (
    <div className="ob-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="ob-lightbox-panel" role="dialog" aria-modal="true" aria-label={`${image.tab} screenshot`}>
        <div className="ob-lightbox-controls">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close screenshot">Close</button>
          <div>
            <button type="button" onClick={() => onChange((index + images.length - 1) % images.length)} aria-label="Previous screenshot">←</button>{' '}
            <button type="button" onClick={() => onChange((index + 1) % images.length)} aria-label="Next screenshot">→</button>
          </div>
        </div>
        <Image src={image.src} alt={image.alt} width={1440} height={810} priority />
        <div className="ob-lightbox-caption">{image.caption}</div>
      </section>
    </div>
  );
}
