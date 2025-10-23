'use client';

import { useLayoutEffect, useRef } from 'react';

import './SnakeCard.scss';

function SnakeCardFrame() {
  const runRef = useRef(null);

  useLayoutEffect(() => {
    const el = runRef.current;
    if (!el) return;

    const L = el.getTotalLength();

    const card = el.closest('.snake-card');
    const segPercent = parseFloat(getComputedStyle(card).getPropertyValue('--seg'));

    const segPx = L * (isNaN(segPercent) ? 0.3 : segPercent / 100);

    el.style.setProperty('--Lpx', `${L}px`);
    el.style.setProperty('--segPx', `${segPx}px`);
  }, []);

  return (
    <svg
      className="snake-card__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="snakeGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
          <stop offset="0%" stopColor="#1AA47B" />
          <stop offset="50%" stopColor="#E4FFCE" />
          <stop offset="100%" stopColor="#3CE661" />
        </linearGradient>
      </defs>

      <rect className="snake-base" x="0.5" y="0" width="99.5" height="99.5" rx="0" ry="0" />

      <rect
        ref={runRef}
        className="snake-run"
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="0"
        ry="0"
      />
    </svg>
  );
}

export default function SnakeCard({ children }) {
  return (
    <div className="snake-card">
      <div className="snake-card__content">{children}</div>

      <SnakeCardFrame />
    </div>
  );
}
