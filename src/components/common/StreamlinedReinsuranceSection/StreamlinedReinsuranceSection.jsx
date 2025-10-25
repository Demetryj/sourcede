'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Tabs } from '@/components/common';

import { useBreakpoint } from '@/hooks';

import { tabList } from '@/data/tabsData';
import { reinsuranceListCedantData, reinsuranceListReinsurerData } from '@/data/reinsuranceData';

import './StreamlinedReinsuranceSection.scss';

export default function StreamlinedReinsuranceSection({ hash }) {
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const { screenWidth } = useBreakpoint();

  const currentList =
    selectedTab?.id === 1 ? reinsuranceListCedantData : reinsuranceListReinsurerData;

  const handleSelectTab = id => {
    const selectedItem = tabList.find(item => item.id === id);
    setSelectedTab(selectedItem);
  };

  return (
    <section id={hash ? hash : undefined} className="srs-section">
      <div className="container-general">
        <div className="inner-container inner-container-with-borders srs-section__inner-container">
          <div className="srs-section__title-wrapper">
            <h3>Streamlined Reinsurance in 3 Steps</h3>
          </div>

          <Tabs tabList={tabList} selectedTab={selectedTab} handleSelectTab={handleSelectTab} />

          <ul className="srs-section__card-list">
            {currentList.map(({ id, number, title, text, image, imageTablet }) => {
              const visibleImg =
                id === 3 && screenWidth >= 768 && screenWidth < 1024 ? imageTablet : image;

              return (
                <li key={id} className="srs-section__card-item">
                  <span className="srs-section__card-item__number">{number}</span>

                  <Image
                    src={visibleImg}
                    className="srs-section__card-item__image"
                    alt="Image"
                    width={311}
                    height={560}
                  />

                  <div className="srs-section__card-item__wrapper">
                    <h6>{title}</h6>

                    <p className="srs-section__card-item__text">{text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
