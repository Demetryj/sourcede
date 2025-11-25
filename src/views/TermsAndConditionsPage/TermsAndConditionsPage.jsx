'use client';

import { normalizeList, renderRichParagraph } from '@/utils';

import { termsAndConditionsData } from '@/data/termsAndConditions';

import './TermsAndConditionsPage.scss';

export default function TermsAndConditionsPage() {
  return (
    <section className="section-general">
      <div className="container-general">
        <h2 className="tac-page__title">
          Terms And Conditions <br /> For Accessing This Website
        </h2>

        <ul className="reluse__list">
          {termsAndConditionsData.map((itemData, index) => {
            const { title, paragraf, list, deepList } = itemData;
            const normalizedList = normalizeList(list);

            return (
              <li key={index} className="tac-page__list-item">
                <h5>{title}</h5>

                {paragraf && <p dangerouslySetInnerHTML={{ __html: paragraf }} />}

                {normalizedList.length > 0 && (
                  <ul className="tac-page__sublist">
                    {normalizedList.map((listItem, idx) => {
                      return <li key={idx}>{renderRichParagraph(listItem)}</li>;
                    })}
                  </ul>
                )}

                {deepList && (
                  <ul className="tac-page__deep-list">
                    {deepList.map(({ subtitle, text, subList }, i) => {
                      const normalizedSubList = normalizeList(subList);

                      return (
                        <li key={i} className="tac-page__deep-list-item">
                          {subtitle && <p dangerouslySetInnerHTML={{ __html: subtitle }} />}

                          {text && <p dangerouslySetInnerHTML={{ __html: text }} />}

                          {normalizedSubList.length > 0 && (
                            <ol className="tac-page__deep-list__sublist">
                              {normalizedSubList.map((itemOl, indexOl) => {
                                return (
                                  <li key={indexOl} className="tac-page__deep-list__sublist-item">
                                    {renderRichParagraph(itemOl)}
                                  </li>
                                );
                              })}
                            </ol>
                          )}
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
