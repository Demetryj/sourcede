import { BenefitCard } from '@/components/common';

import './BenefitCardList.scss';

export default function BenefitCardList({ cardListData }) {
  return (
    <ul className="benefit-card-list">
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
