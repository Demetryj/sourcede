import clsx from 'clsx';

import { BenefitCard } from '@/components/common';

import './BenefitCardList.scss';

export default function BenefitCardList({ cardListData, additionalClass }) {
  return (
    <ul className={clsx('benefit-card-list', additionalClass)}>
      {cardListData.map((card, index) => {
        return (
          <li key={index}>
            <BenefitCard cardData={card} />
          </li>
        );
      })}
    </ul>
  );
}
