'use client';

import { BookDemoButton } from '@/components/common';

import './SectionCommon.scss';

export default function SectionCommon({ bgImage, title, subtitle, withButton }) {
  return (
    <section className="section-common">
      <div className="section-common__bg-gradient" />
      <div className="container-general">
        <div className="inner-container inner-container-with-borders section-common__inner-container">
          <div className="section-common__bg-image" style={{ '--bg-url': `url(${bgImage})` }}>
            <div className="section-common__card">
              <h2 className="section-common__title">{title}</h2>

              <p className="section-common__subtitle">{subtitle}</p>

              {withButton && <BookDemoButton />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
