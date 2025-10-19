import { Accordion } from '@/components/common';

import { faqData } from '@/data/faqData';

import './FAQSection.scss';

export default function FAQSection() {
  return (
    <section className="faq-section">
      <div className="container-general">
        <div className="inner-container-with-borders inner-container faq-section__wrapper">
          <h3 className="faq-section__title">Frequently Asked Questions</h3>

          <ul>
            {faqData.map(({ title, body }, index) => {
              return (
                <li key={index}>
                  <Accordion title={title}>
                    {body.length === 0 ? (
                      body[0]
                    ) : (
                      <ul className="faq-section__sub-list">
                        {body.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    )}
                  </Accordion>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
