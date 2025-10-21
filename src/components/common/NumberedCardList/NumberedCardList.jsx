import { NumberedCard } from '@/components/common';

import './NumberedCardList.scss';

export default function NumberedCardList({ cardListData }) {
  return (
    <ul className="numbered-card-list">
      {cardListData.map((card, index) => {
        return (
          <li key={index}>
            <NumberedCard cardData={card} />
          </li>
        );
      })}
    </ul>
  );
}
