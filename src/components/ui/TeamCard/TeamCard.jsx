import { SecondaryButton } from '@/components/common';

import './TeamCard.scss';

export default function TeamCard({ data: { name, position, linkToProfile, image } }) {
  return (
    <div className="team-card">
      <div className="team-card__avatar" style={{ backgroundImage: `url(${image})` }} />

      <div className="team-card__name__wrapper">
        <h5>{name}</h5>
      </div>

      <p className="team-card__position">{position}</p>

      <SecondaryButton href={linkToProfile} additionalClass="team-card__profile-link">
        LinkedIn
      </SecondaryButton>
    </div>
  );
}
