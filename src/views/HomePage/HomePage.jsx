'use client';

import {
  FAQSection,
  StreamlinedReinsuranceSection,
  SureCedeImpactSection,
  SliderCommon,
  BenefitCardList,
  BookDemoButton,
} from '@/components/common';
import { CoverageCard, ResultsCard, HeroHomePageMobile, HeroFlow } from '@/components/ui';

import { useBreakpoint } from '@/hooks';

import {
  coverageDataCardList,
  advantagesCardListData,
  resultsCardListData,
} from '@/data/homePageData';

import './HomePage.scss';

export default function HomePage() {
  const { isMobile, isTablet, isLaptop } = useBreakpoint();

  let sliderPeek;

  switch (true) {
    case isMobile:
      sliderPeek = 310;
      break;
    case isTablet:
      sliderPeek = 300;
      break;
    case isLaptop:
      sliderPeek = 230;
      break;

    default:
      sliderPeek = 163;

      break;
  }

  return (
    <>
      <HeroHomePageMobile />
      <HeroFlow />

      <SureCedeImpactSection />
      <section className="section-general coverage-section">
        <div className="container-general coverage-section__container">
          <h3>Coverage Across Multiple Classes</h3>
        </div>

        <SliderCommon
          cardComponent={CoverageCard}
          dataList={coverageDataCardList}
          spaceBetween={16}
          peek={sliderPeek}
        />
      </section>
      <section className="section-advantages">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders">
            <div className="section-advantages__header">
              <h3>Why Choose SureCede</h3>

              <p>
                In the MENA reinsurance market, high intermediary fees up to 25%, fragmented
                workflows, and lack of transparency slow deal-making. SureCede replaces these
                inefficiencies with a fully digital, cost-effective, and transparent platform.
              </p>
            </div>

            <BenefitCardList
              cardListData={advantagesCardListData}
              additionalClass="section-advantages__card-list"
            />
          </div>
        </div>
      </section>

      <StreamlinedReinsuranceSection />

      <section className="section-general home-page__results-section">
        <div className="container-general">
          <h3>Real Results from Leading Cedants and Reinsurers</h3>
        </div>

        <SliderCommon
          cardComponent={ResultsCard}
          dataList={resultsCardListData}
          spaceBetween={16}
          width={isMobile ? '343px' : '540px'}
        />
      </section>

      <FAQSection />

      <section className="home-page__bottom-section">
        <div className="container-general">
          <div className="inner-container-bottom inner-container-with-borders home-page__bottom-section__container">
            <div className="home-page__bottom-section__header">
              <h2>
                Trusted by Cedants and <br /> Reinsurers Across MENA
              </h2>

              <p>
                Join industry professionals streamlining reinsurance placement, <br /> accessing
                capacity, and gaining market transparency.
              </p>
            </div>

            <BookDemoButton />
          </div>
        </div>
      </section>
    </>
  );
}
