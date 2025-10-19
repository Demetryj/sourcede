import Link from 'next/link';

import { SubscriptionForm } from '@/components/common';

import {
  rulesLinksData,
  productNavDataFooter,
  generalNavDataFooter,
  socialMediaData,
} from '@/data/footerData';

import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top-wrapper">
        <div className="container-general">
          <div className="footer__inner-top-wrapper">
            <div>
              <Link href="/" className="footer__logo">
                SureCede
              </Link>

              <div className="footer__subscribe-block">
                <h6 className="footer__subscribe-title">Stay up to date</h6>

                <SubscriptionForm name="footer_subscription" />

                <p className="footer__subscribe-text">
                  Coming soon! Sign up now to receive the latest market updates.
                </p>
              </div>
            </div>

            <div className="footer__nav-wrapper">
              <nav>
                <h6 className="footer__nav-title">Products</h6>

                <ul className="footer__nav-list">
                  {productNavDataFooter.map(({ title, linkTo }, index) => {
                    return (
                      <li key={index}>
                        <Link href={linkTo} className="footer__nav-link">
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <nav>
                <h6 className="footer__nav-title">General</h6>

                <ul className="footer__nav-list">
                  {generalNavDataFooter.map(({ title, linkTo }, index) => {
                    return (
                      <li key={index}>
                        <Link href={linkTo} className="footer__nav-link">
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div>
                <h6 className="footer__nav-title">Connect</h6>

                <ul className="footer__nav-list">
                  {socialMediaData.map(({ title, linkTo }, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={linkTo}
                          className="footer__nav-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-general">
        <div className="footer__inner-bottom-wrapper">
          <p className="footer__description-text">
            We follow global compliance standards, including GDPR, ISO 27001 and SOC2 Type II, and
            enforce strict data protection protocols to safeguard your information.
          </p>

          <div className="footer__rights-wrapper">
            <span className="footer__rights">SureCede @ 2025. All rights reserved.</span>

            <ul className="footer__rules-list">
              {rulesLinksData.map(({ title, linkTo }, index) => {
                return (
                  <li key={index} className="footer__rules-item">
                    <Link href={linkTo} className="footer__rules-link">
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
