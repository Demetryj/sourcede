'use client';

import clsx from 'clsx';

import { BookDemoButton, AnimatedBorderBox } from '@/components/common';

import './BenefitCard.scss';

export default function BenefitCard({ cardData: { icon: Icon, title, text, isAnimatedCard } }) {
  if (isAnimatedCard) {
    return (
      <AnimatedBorderBox>
        <div className={clsx('benefit-card', 'animated-card')}>
          <h5>{title}</h5>

          <BookDemoButton />
        </div>
      </AnimatedBorderBox>
    );
  }
  return (
    <div className="benefit-card">
      {Icon && (
        <div className="benefit-card__icon-wrapper">
          <Icon />
        </div>
      )}

      <div className="benefit-card__content">
        <h5>{title}</h5>

        {text && <p className="benefit-card__text">{text}</p>}
      </div>
    </div>
  );
}
