'use client';

import { useLayoutEffect, useRef } from 'react';

import { CountUpOnView } from '@/components/common';

import './SureCedeImpactSection.scss';

const metricsData = [
  { value: 95, suffics: '%', description: 'Close deals faster than traditional workflows.' },
  { value: 80, suffics: '%', description: 'Save up on customer acquisition costs.' },
  { value: 15, suffics: '+', description: 'Support for lines of business.' },
];

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

export default function SureCedeImpactSection({ hash }) {
  return (
    <section id={hash ? hash : undefined} className="scis">
      <div className="container-general">
        <div className="inner-container inner-container-with-borders">
          <div className="scis__header">
            <h3>SureCede Impact Across MENA</h3>
            <p>A data-driven view of how we improve processes and outcomes across the region.</p>
          </div>

          <ul className="scis__card-list">
            {metricsData.map(({ value, suffics, description }, index) => {
              return (
                <li key={index} className="scis__card-item">
                  <CountUpOnView to={value} suffix={suffics} />
                  <p>{description}</p>
                </li>
              );
            })}

            <li className="">
              <div className="snake-card">
                <div className="snake-card__content scis__card-item">
                  <CountUpOnView to={100} suffix="%" additionalClass="" />

                  <p>Real-time placement updates for seamless operations.</p>
                </div>

                <SnakeCardFrame />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
