'use client';

import {
  NumberedCardList,
  SectionCommon,
  BenefitCard,
  FAQSection,
  SliderCommon,
} from '@/components/common';
import { TeamCard } from '@/components/ui';

import {
  numberedCardsDataAboutUsPage,
  advantagesCardListData,
  teamListData,
} from '@/data/aboutUsPage';

import './AboutUsPage.scss';

export default function AboutUsPage() {
  return (
    <>
      <SectionCommon
        hash="hero"
        bgImage="/images/about-us-bg.webp"
        title="Solving MENA Reinsurance Challenges"
        subtitle="The MENA reinsurance market is fragmented, labor-intensive, and costly, with intermediary fees up to 25%, manual workflows, and limited data-driven decision-making. Surecede addresses these challenges by connecting cedants and reinsurers, providing extensive capacity, and offering analytics, risk modeling, and AI insights in a single secure digital platform."
      />

      <section id="mission" className="about-us__mission-section">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders">
            <div className="about-us__mission-section__header">
              <h3>Our Mission</h3>

              <div className="about-us__mission-section__header__text-wrapper">
                <p>
                  We created Surecede to simplify reinsurance. We help cedants and reinsurers save
                  time, reduce costs, and gain actionable market insights all through a secure
                  digital platform. <br />
                  Our goal is to replace manual, fragmented workflows with a seamless, fully digital
                  experience, making reinsurance faster, more transparent, and efficient across the
                  MENA region.
                </p>

                <p>
                  Our core values are reflected in everything we do, from platform design to client
                  interactions.
                </p>
              </div>
            </div>

            <NumberedCardList cardListData={numberedCardsDataAboutUsPage} />
          </div>
        </div>
      </section>

      <section id="team" className="section-general about-us__team-section">
        <div className="container-general">
          <div className="about-us__team-section__header">
            <h3>
              Meet the Experts <br /> Behind Surecede
            </h3>

            <p>
              Founded by industry veterans with decades of experience in insurance, reinsurance, and
              technology, our team combines deep market knowledge with digital innovation. Every
              feature and workflow is designed to reflect real-world needs and support me.
            </p>
          </div>
        </div>

        <div
          className="
      
        about-us__team-section__container"
        >
          <SliderCommon cardComponent={TeamCard} dataList={teamListData} />
        </div>
      </section>

      <section id="advantages" className="about-us__advantages-section">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders">
            <h3 className="about-us__advantages-section__title">
              Expertise You Trust. Simplified Solutions.
            </h3>

            <ul className="about-us__advantages-section__card-list">
              {advantagesCardListData.map((item, index) => {
                return (
                  <li key={index} className="about-us__advantages-section__card-item">
                    <BenefitCard cardData={item} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
