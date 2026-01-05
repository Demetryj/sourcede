import { SecondaryButton } from '@/components/common';

import './TeamCard.scss';

export default function TeamCard({ data: { name, position, linkToProfile, image } }) {
  const nameParts = String(name || '')
    .trim()
    .split(/\s+/);
  const firstLine = nameParts[0] || '';
  const secondLine = nameParts.slice(1).join(' ');

  return (
    <div className="team-card">
      <div className="team-card__avatar" style={{ backgroundImage: `url(${image})` }} />

      <div className="team-card__name__wrapper">
        <h5>
          <span className="team-card__name-line">{firstLine}</span>
          {secondLine ? <span className="team-card__name-line">{secondLine}</span> : null}
        </h5>
      </div>

      <p className="team-card__position">{position}</p>

      <SecondaryButton href={linkToProfile} additionalClass="team-card__profile-link">
        LinkedIn
      </SecondaryButton>
    </div>
  );
}
