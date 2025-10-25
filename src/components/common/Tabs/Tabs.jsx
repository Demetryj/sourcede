'use client';

import clsx from 'clsx';

import './Tabs.scss';

export default function Tabs({ tabList, selectedTab, handleSelectTab, additionalClass }) {
  return (
    <div className={clsx('tabs', additionalClass && additionalClass)}>
      <ul className="tabs__list">
        {tabList.map(({ id, title }) => {
          return (
            <li
              key={id}
              onClick={() => handleSelectTab(id)}
              role="button"
              className={clsx('tabs__item', selectedTab?.id === id && 'active')}
            >
              <h6>{title}</h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
