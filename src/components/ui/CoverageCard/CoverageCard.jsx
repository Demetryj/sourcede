import './CoverageCard.scss';

export default function CoverageCard({ data: { title, bage1, bage2, image } }) {
  return (
    <div className="coverage-card">
      <div className="coverage-card__image" style={{ backgroundImage: `url(${image})` }} />

      <div className="coverage-card__title__wrapper">
        <h5>{title}</h5>
      </div>

      <div className="coverage-card__bages-wrapper">
        <div className="coverage-card__bage">{bage1}</div>
        <div className="coverage-card__bage">{bage2}</div>
      </div>
    </div>
  );
}
