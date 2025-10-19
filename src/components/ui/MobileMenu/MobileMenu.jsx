'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { PrimaryButton, SecondaryButton, Accordion } from '@/components/common';

import {
  headerNavMenuData,
  platformPageNavMenuData,
  aboutAsPageNavMenuData,
} from '@/data/headerNavData';

import './MobileMenu.scss';

export default function MobileMenu({ isMobileMenuOpen }) {
  return (
    <div className={clsx('mobile-menu', isMobileMenuOpen && 'menu-open')}>
      <ul className="mobile-menu__nav-list">
        {headerNavMenuData.map(({ id, title, href, value }) => {
          if (!href) {
            const visibleList =
              value === 'platform' ? platformPageNavMenuData : aboutAsPageNavMenuData;

            return (
              <li key={id}>
                <Accordion title={title} isMobileMenu={true}>
                  <ul className="mobile-menu__sub-nav-list">
                    {visibleList.map(({ title, description, pathname, hash }, index) => {
                      return (
                        <li key={index}>
                          <Link href={{ pathname, hash }} className="mobile-menu__accordion-link">
                            <h6>{title}</h6>
                            <p>{description}</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Accordion>
              </li>
            );
          }

          return (
            <li key={id}>
              <Link href={href} className="mobile-menu__link">
                <h6>{title}</h6>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mobile-menu__btn-wrapper">
        <SecondaryButton href={''} additionalClass="mobile-menu__btn">
          Log In
        </SecondaryButton>
        <PrimaryButton href={''} additionalClass="mobile-menu__btn">
          Book a Demo
        </PrimaryButton>
      </div>
    </div>
  );
}
