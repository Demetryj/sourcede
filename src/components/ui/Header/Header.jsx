'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { PrimaryButton, SecondaryButton } from '@/components/common';
import { HeaderNavMenu, MobileMenu } from '@/components/ui';

import { useBreakpoint } from '@/hooks';

import { BurgerMenu } from '@/components/icons';

import './Header.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const paddingOffset = window.innerWidth - document.body.offsetWidth;

    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${paddingOffset}px`;
    }

    return () => {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className={clsx('container-general', 'header__container')}>
        <Link href="/" className="header__logo">
          SureCede
        </Link>

        <div className="header__wrapper">
          <HeaderNavMenu />

          <SecondaryButton href={''}>Log In</SecondaryButton>
          <PrimaryButton href={''} additionalClass="header__demo-btn">
            Book a Demo
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="header__burger-menu-btn"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          <BurgerMenu className="header__burger-menu-btn__icon" />
        </button>
      </div>

      {screenWidth < 1440 && <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />}
    </header>
  );
}
