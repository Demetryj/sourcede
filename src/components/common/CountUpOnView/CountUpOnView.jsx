'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import './CountUpOnView.scss';

export default function CountUpOnView({
  to, // final value (e.g. 95)
  durationMs = 1500, // animation duration
  from = 0, // starting value
  suffix = '', // suffix: %, k, etc.
  once = false, // once or every time when entering the viewport
  threshold = 0.4, // visibility fraction for start
  decimals = 0, // number of decimal places
  additionalClass = '',
}) {
  const ref = useRef(null);
  const rafId = useRef(null);
  const [value, setValue] = useState(from);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      if (ran.current && once) return;

      if (reduceMotion || durationMs <= 0) {
        setValue(to);
        ran.current = true;
        return;
      }

      const startTime = performance.now();
      const diff = to - from;

      const tick = now => {
        const t = Math.min(1, (now - startTime) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = from + diff * eased;
        const rounded = decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current);
        setValue(rounded);

        if (t < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          ran.current = true;
        }
      };

      rafId.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animate();
            if (once) io.unobserve(e.target);
          } else if (!once) {
            cancelAnimationFrame(rafId.current);
            setValue(from);
            ran.current = false;
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [to, durationMs, from, once, threshold, decimals]);

  return (
    <span ref={ref} className={clsx('coutn-up-on-view', additionalClass && additionalClass)}>
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
}
