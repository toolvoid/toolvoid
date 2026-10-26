'use client';

import { useCallback, useRef } from 'react';

let hasLoggedDisabledReason = false;

export function applyTiltFromPointer(node, event, maxAngle) {
  const rect = node.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
  const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
  node.style.setProperty('--mx', `${x}%`);
  node.style.setProperty('--my', `${y}%`);
  node.style.setProperty('--rx', `${((50 - y) / 50) * maxAngle}deg`);
  node.style.setProperty('--ry', `${((x - 50) / 50) * maxAngle}deg`);
  return true;
}

/** Adds pointer-driven tilt and a cursor spotlight without React renders per frame. */
export default function useTilt(maxAngle = 8) {
  const ref = useRef(null);
  const frame = useRef(0);
  const latest = useRef(null);

  const onPointerMove = useCallback((event) => {
    const node = ref.current;
    if (!node) return;
    const disabledReason = event.pointerType === 'touch'
      ? 'touch pointer'
      : document.visibilityState !== 'visible'
        ? 'document is hidden'
        : window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'prefers-reduced-motion'
          : window.matchMedia('(pointer: coarse)').matches
            ? 'coarse pointer'
            : null;
    if (disabledReason) {
      if (process.env.NODE_ENV !== 'production' && !hasLoggedDisabledReason) {
        console.debug(`[useTilt] Tilt disabled: ${disabledReason}`);
        hasLoggedDisabledReason = true;
      }
      return;
    }
    latest.current = { clientX: event.clientX, clientY: event.clientY };
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      if (!node || !latest.current || document.visibilityState !== 'visible') return;
      applyTiltFromPointer(node, latest.current, maxAngle);
    });
  }, [maxAngle]);

  const onPointerLeave = useCallback(() => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    latest.current = null;
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--mx', '50%');
    node.style.setProperty('--my', '50%');
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
