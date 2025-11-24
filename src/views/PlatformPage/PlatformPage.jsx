'use client';

import { useState } from 'react';
import {
  FAQSection,
  SectionCommon,
  Tabs,
  NumberedCardList,
  BenefitCardList,
  StreamlinedReinsuranceSection,
  SureCedeImpactSection,
  BookDemoButton,
  SecondaryButton,
} from '@/components/common';

import {
  cardListCedantData,
  cardListReinsurerData,
  benefitCardListData,
} from '@/data/platformPageData';
import { tabList } from '@/data/tabsData';

import './PlatformPage.scss';

const solutionsItems = [
  'Reliance on email and spreadsheets;',
  'Manual data entry from submission documents;',
  'Lack of real-time portfolio analytics;',
  'Slow communication between ceding insurers, and reinsurers.',
];

export default function PlatformPage() {
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const handleSelectTab = id => {
    const selectedItem = tabList.find(item => item.id === id);
    setSelectedTab(selectedItem);
  };

  return (
    <>
      <SectionCommon
        bgImage="/images/platform-bg.webp"
        title="Smarter Way to Close Deals"
        subtitle="SureCede is a next-generation, web-based platform designed to modernize and streamline the reinsurance placement lifecycle. Its core mission is to replace fragmented, manual workflows with a single, data-centric, and intelligent system that enhances efficiency, transparency, and decision-making for all stakeholders involved. "
      />
      {''}
      <section id="benefits" className="plarform-page__benefit-section">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders plarform-page__section__inner-container">
            <div className="plarform-page__section__title-wrapper">
              <h3>
                Creating Value <br />
                for Cedants and Reinsurers
              </h3>
            </div>

            <Tabs tabList={tabList} selectedTab={selectedTab} handleSelectTab={handleSelectTab} />

            <NumberedCardList
              cardListData={selectedTab?.id === 1 ? cardListCedantData : cardListReinsurerData}
            />
          </div>
        </div>
      </section>
      {''}
      <section id="features" className="plarform-page__features-section">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders plarform-page__section__inner-container">
            <div className="plarform-page__section__title-wrapper">
              <h3>Key Platform Capabilities</h3>
            </div>

            <BenefitCardList cardListData={benefitCardListData} />
          </div>
        </div>
      </section>
      {''}
      <StreamlinedReinsuranceSection hash="how-it-works" />
      {''}
      <section id="solutions" className="plarform-page__solutions-section">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders plarform-page__solutions-section__inner-container">
            <div className="plarform-page__solutions-section__card">
              <h2>Surecede Solves Market Problems</h2>

              <p>
                The Platform uses AI and other cutting-edge technologies to directly address key
                inefficiencies in the current reinsurance market, including:
              </p>
              <ul className="plarform-page__solutions-section__card__list">
                {solutionsItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {''}
      <SureCedeImpactSection hash="metrics" />
      {''}
      <section className="plarform-page__sbottom-section">
        <div className="container-general">
          <div className="inner-container-bottom inner-container-with-borders">
            <div className="plarform-page__bottom-section__inner-container">
              <div className="plarform-page__bottom-section__content first">
                <h4 className="title">
                  Join Reinsurance Professionals <br className="br" />
                  Across MENA
                </h4>
                <p className="text">
                  Streamline placements, access capacity, and gain market transparency, all in one
                  platform.
                </p>

                <BookDemoButton />
              </div>

              <div className="plarform-page__bottom-section__content">
                <h4 className="title">
                  Need Guidance? <br />
                  We’re Here to Help
                </h4>
                <p className="text">
                  Streamline placements, access capacity, and gain market transparency, all in one
                  platform.
                </p>

                <SecondaryButton href="contact-us" withoutNewPage>
                  Contact Us
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      {''}
      <FAQSection />
    </>
  );
}
