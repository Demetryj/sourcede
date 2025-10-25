'use client';

import Link from 'next/link';

import './MarketInsightsCard.scss';

export default function MarketInsightsCard({
  cardData: { id, topic, subtopic, title, dateAt, image },
}) {
  return (
    <Link href={`/market-insights/${id.toString()}`} className="market-insights-card">
      <div className="market-insights-card__image" style={{ backgroundImage: `url(${image})` }} />

      <div className="market-insights-card__bages-wrapper">
        {topic && <div className="market-insights-card__bage">{topic}</div>}
        {subtopic && <div className="market-insights-card__bage">{subtopic}</div>}
      </div>

      <div className="market-insights-card__title-wrapper">
        <h6>{title}</h6>
      </div>

      <span className="market-insights-card__date">{dateAt}</span>
    </Link>
  );
}
