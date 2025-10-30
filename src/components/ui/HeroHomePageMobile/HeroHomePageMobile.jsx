'ues client';

import clsx from 'clsx';

import { BookDemoButton, SnakeCard } from '@/components/common';

import { useBreakpoint } from '@/hooks';

import { heroCardListData } from '@/data/homePageData';

import './HeroHomePageMobile.scss';

export default function HeroHomePageMobile() {
  const { isTablet } = useBreakpoint();

  return (
    <section className="hero-home-page-mobile">
      <div className="hero-home-page-mobile__container">
        <div className="container-general hero-home-page-mobile__header">
          <h1 className="hero-home-page-mobile__title">
            An Aggregated Tool for Your <br /> Insurance and Reinsurance Needs
          </h1>

          <p className="hero-home-page-mobile__subtitle">
            Connecting cedants and reinsurers across MENA to streamline submissions, reduce <br />
            costs, and optimize access to capacity.
          </p>

          <BookDemoButton />
        </div>

        <div className="hero-home-page-mobile__bg-image-wrapper">
          <div className="hero-home-page-mobile__bg-image" />
        </div>

        <div className="container-general hero-home-page-mobile__cards-container">
          {isTablet && (
            <ul className="hero-home-page-mobile__grid-card">
              {heroCardListData.map((IconComponent, index) => {
                return (
                  <li
                    key={index}
                    className={clsx('hero-home-page-mobile__grid-card-item', `ig--${index + 1}`)}
                  >
                    <SnakeCard>
                      <div className="hero-home-page-mobile__card-item">
                        <div className="hero-home-page-mobile__card">
                          <IconComponent />
                        </div>
                      </div>
                    </SnakeCard>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
