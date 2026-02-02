'use client';

import { BookDemoButton, AuroraBackground } from '@/components/common';

import './SectionCommon.scss';

export default function SectionCommon({ bgImage, title, subtitle, withButton, hash, children }) {
  return (
    <section id={hash ? hash : undefined} className="section-common">
      <AuroraBackground>
        <div className="section-common__bg-gradient" />
        <div className="container-general">
          <div className="inner-container inner-container-with-borders section-common__inner-container">
            <div className="section-common__bg-image" style={{ '--bg-url': `url(${bgImage})` }}>
              <div className="section-common__card">
                <h2 className="section-common__title">{title}</h2>

                <p className="section-common__subtitle">{subtitle}</p>

                {withButton && <BookDemoButton positionTop />}

                {children && children}
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
