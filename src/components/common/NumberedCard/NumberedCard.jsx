import './NumberedCard.scss';

export default function NumberedCard({ cardData: { number, title, text } }) {
  return (
    <div className="numbered-card">
      <span className="numbered-card__number">{number}</span>

      <div className="numbered-card__content">
        <h6>{title}</h6>

        <p className="numbered-card__text">{text}</p>
      </div>
    </div>
  );
}
