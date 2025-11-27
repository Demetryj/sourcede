'use client';

import { CountUpOnView, AnimatedBorderBox } from '@/components/common';

import './SureCedeImpactSection.scss';

const metricsData = [
  { value: 95, suffics: '%', description: 'Close deals faster than traditional workflows.' },
  { value: 80, suffics: '%', description: 'Save up on customer acquisition costs.' },
  { value: 15, suffics: '+', description: 'Support for lines of business.' },
];

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
              <AnimatedBorderBox>
                <div className="scis__card-item">
                  <CountUpOnView to={100} suffix="%" additionalClass="" />

                  <p>Real-time placement updates for seamless operations.</p>
                </div>
              </AnimatedBorderBox>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
