'use client';

import { useEffect } from 'react';

/**
 * useSvgPerimeterMarquee
 * phaseDesync: 0..1 — how much the starting phases "separate" in different paths
 */
export function useSvgPerimeterMarquee(svgEl, opts = {}) {
  useEffect(() => {
    if (!svgEl) return;
    const visiblePortion = Math.min(1, Math.max(0, opts.visiblePortion ?? 0.5));
    const speedPxPerSec = opts.speedPxPerSec ?? 30;
    const phaseDesync = Math.min(1, Math.max(0, opts.phaseDesync ?? 0));

    const animations = [];
    const paths = Array.from(svgEl.querySelectorAll('[data-perimeter]'));

    paths.forEach((p, i) => {
      const len = p.getTotalLength?.() ?? 0;
      const dash = len * visiblePortion;
      p.style.strokeDasharray = `${dash} ${Math.max(0, len - dash)}`;
      p.style.strokeDashoffset = '0';

      const durationMs = speedPxPerSec > 0 ? (len / speedPxPerSec) * 1000 : 4000;

      // deterministic phase based on the index (can be replaced by random)
      const phase = phaseDesync * (i / Math.max(1, paths.length - 1)); // 0..phaseDesync
      const delay = -phase * durationMs; //negative delay = instantaneous phase shift

      const anim = p.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -len }], {
        duration: durationMs,
        iterations: Infinity,
        easing: 'linear',
        delay,
      });
      animations.push(anim);
    });

    return () => {
      animations.forEach(a => a.cancel());
    };
  }, [svgEl, opts.visiblePortion, opts.speedPxPerSec, opts.phaseDesync]);
}
