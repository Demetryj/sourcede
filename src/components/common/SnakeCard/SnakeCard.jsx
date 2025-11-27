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
        {/* Gradient along the X axis bbox + smooth ping-pong */}
        <linearGradient
          id="snakeGrad"
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0.5"
          x2="1"
          y2="0.5"
        >
          <stop offset="0%" stopColor="#1AA47B" />
          <stop offset="45%" stopColor="#E4FFCE" />
          <stop offset="75%" stopColor="#3CE661" />
          <stop offset="95%" stopColor="#1AA47B" />
          <stop offset="100%" stopColor="#1AA47B" stopOpacity="0.5" />
          {/* the movement of the gradient itself within the bbox */}
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-0.35 0; 0.35 0; -0.35 0"
            keyTimes="0; 0.5; 1"
            dur="5000ms"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines=".25 .1 .25 1; .25 .1 .25 1"
          />
        </linearGradient>
      </defs>

      <rect className="snake-base" x="0" y="0" width="100" height="100" rx="0" ry="0" />

      <rect
        ref={runRef}
        className="snake-run"
        x="0"
        y="0.5"
        width="100"
        height="99.5"
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
