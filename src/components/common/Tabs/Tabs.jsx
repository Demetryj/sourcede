'use client';

import clsx from 'clsx';

import './Tabs.scss';

export default function Tabs({ tabList, selectedTabId, handleSelectTab }) {
  return (
    <div className="tabs">
      <ul className="tabs__list">
        {tabList.map(({ id, title }) => {
          return (
            <li
              key={id}
              onClick={() => handleSelectTab(id)}
              role="button"
              className={clsx('tabs__item', selectedTabId === id && 'active')}
            >
              <h6>{title}</h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
