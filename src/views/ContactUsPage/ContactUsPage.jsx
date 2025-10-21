'use client';

import { ContactUsForm } from '@/components/ui';
import { SectionCommon } from '@/components/common';

import './ContactUsPage.scss';

const contactsData = ['info@surecede.com', 'sales@surecede.com', 'DIFC, Dubai, UAE'];

export default function ContactUsPage() {
  return (
    <>
      <SectionCommon
        title={
          <>
            Have questions?
            <br />
            Let’s Talk.
          </>
        }
        subtitle="Join industry professionals streamlining reinsurance placement, accessing capacity, and gaining market transparency."
        bgImage={'/images/contact-us-bg.webp'}
      />

      <section className="cup__form-section">
        <div className="container-general">
          <div className="inner-container-with-borders cup__form-section__inner-container">
            <div className="cup__form-section__contacts-wrapper">
              <h2>Contact Us</h2>

              <p className="cup__form-section__subtitle">
                Fill out the form, and our team will respond within 24 hours or reach us out
                directly.
              </p>

              <address className="cup__form-section__contacts">
                {contactsData.map((item, index) => {
                  return (
                    <span key={index} className="cup__form-section__contacts-item">
                      {item}
                    </span>
                  );
                })}
              </address>
            </div>

            <ContactUsForm />
          </div>
        </div>
      </section>
    </>
  );
}
