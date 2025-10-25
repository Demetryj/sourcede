'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { MarketInsightsCard } from '@/components/ui';
import { SectionCommon, SubscriptionForm, Tabs, Pagination } from '@/components/common';

import { usePagination } from '@/hooks';

import {
  tabListMarketungInsights,
  marketungInsightsCardListData,
} from '@/data/marketInsightsPageData';

import './MarketInsightsPage.scss';

const PER_PAGE = 9;

export default function MarketInsightsPage() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [filteredCardList, setFilteredCardList] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get('tab');

  const { currentPage, totalPages, pageItems, setPage } = usePagination({
    items: filteredCardList,
    perPage: PER_PAGE,
    hash: 'market-insights',
  });

  useEffect(() => {
    if (tabFromUrl) {
      setSelectedTab(tabListMarketungInsights.find(card => card.topicValue === tabFromUrl));
    } else {
      setSelectedTab(tabListMarketungInsights[0]);
    }
  }, []);

  useEffect(() => {
    if (!selectedTab) return;

    if (selectedTab?.topicValue === 'all') {
      setFilteredCardList(marketungInsightsCardListData);
    } else {
      setFilteredCardList(
        marketungInsightsCardListData.filter(card => card.topicValue === selectedTab?.topicValue)
      );
    }
  }, [selectedTab]);

  const handleSelectTab = id => {
    const selectedItem = tabListMarketungInsights.find(item => item.id === id);
    setSelectedTab(selectedItem);

    const params = new URLSearchParams(searchParams);
    params.set('tab', selectedItem.topicValue);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  console.log(totalPages);
  return (
    <>
      <SectionCommon
        title={
          <>
            Stay Ahead <br />
            of the Market
          </>
        }
        subtitle="Sign up for information and updates from Surecede about the latest reinsurance trends, market insights, and community discussions."
        bgImage="/images/market-insights-bg.png"
      >
        <SubscriptionForm primary />
      </SectionCommon>

      <section id="market-insights" className="section-general market-insights-page__section">
        <div className="container-general">
          <h3>The latest reinsurance trends and updates</h3>
        </div>

        <div className="market-insights-page__tabs-wrapper">
          <Tabs
            tabList={tabListMarketungInsights}
            selectedTab={selectedTab}
            handleSelectTab={handleSelectTab}
            additionalClass="market-insights-page__tabs"
          />
        </div>

        <div className="container-general">
          <ul className="market-insights-page__card-list">
            {pageItems?.map(item => {
              return (
                <li key={item.id}>
                  <MarketInsightsCard cardData={item} />
                </li>
              );
            })}
          </ul>
        </div>

        {totalPages > 1 && (
          <Pagination totalPages={totalPages} handlePageClick={setPage} currentPage={currentPage} />
        )}
      </section>
    </>
  );
}
