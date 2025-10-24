import './ResultsCard.scss';

export default function ResultsCard({ data: { logo: Logo, label, text } }) {
  return (
    <div className="result-card">
      <div className="result-card__name-wrapper">
        <Logo />
        <h6>{label}</h6>
      </div>

      <p className="result-card__text">{text}</p>
    </div>
  );
}
