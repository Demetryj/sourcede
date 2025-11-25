'use client';

import clsx from 'clsx';

import { normalizeList } from '@/utils';

import { privacyPolicy } from '@/data/privacyPolicy';

import './PrivacyPolicyPage.scss';

export default function PrivacyPolicyPage() {
  return (
    <section className="section-general">
      <div className="container-general">
        <div className="privacy-policy-page__header">
          <h2 className="privacy-policy-page__title">Privacy Policy</h2>
          <p>Last updated: March 28, 2023</p>
        </div>

        <ul className="privacy-policy-page__data">
          {privacyPolicy.map((data, index) => {
            const { title, paragraf, text, list, listType, sublist } = data;
            const normalizedList = normalizeList(list);
            const normalizedSublist = normalizeList(sublist);

            return (
              <li key={index} className="privacy-policy-page__data-item">
                {title && <h5>{title}</h5>}

                {paragraf && <p dangerouslySetInnerHTML={{ __html: paragraf }} />}

                {text && <p dangerouslySetInnerHTML={{ __html: text }} />}

                {normalizedList.length > 0 && (
                  <ul
                    className={clsx('privacy-policy-page__list', listType === 'dot' && 'dot-list')}
                  >
                    {normalizedList.map((itemList, idxItemList) => {
                      if (Array.isArray(itemList)) {
                        return (
                          <ol key={idxItemList} className="privacy-policy-page__sublist">
                            {itemList.map((i, idx) => {
                              return (
                                <li key={idx}>
                                  <p dangerouslySetInnerHTML={{ __html: i }} />
                                </li>
                              );
                            })}
                          </ol>
                        );
                      }

                      return (
                        <li key={idxItemList}>
                          <p dangerouslySetInnerHTML={{ __html: itemList }} />
                        </li>
                      );
                    })}
                  </ul>
                )}

                {normalizedSublist.length > 0 && (
                  <ul className="privacy-policy-page__sublist">
                    {normalizedSublist.map((sublistItem, idxSublistItem) => {
                      if (Array.isArray(sublistItem)) {
                        return (
                          <ol key={idxSublistItem} className="privacy-policy-page__sublist">
                            {sublistItem.map((innerItem, idxInnerItem) => {
                              return (
                                <li key={idxInnerItem}>
                                  <p dangerouslySetInnerHTML={{ __html: innerItem }} />
                                </li>
                              );
                            })}
                          </ol>
                        );
                      }

                      return (
                        <li key={idxSublistItem}>
                          <p dangerouslySetInnerHTML={{ __html: sublistItem }} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
