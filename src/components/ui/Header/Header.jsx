'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { BookDemoButton, SecondaryButton } from '@/components/common';
import { HeaderNavMenu, MobileMenu } from '@/components/ui';

import { useBreakpoint } from '@/hooks';

import { BurgerMenu } from '@/components/icons';

import './Header.scss';

import TemporaryTooltip from '@/components/common/TemporaryTooltip/TemporaryTooltip';

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

  useEffect(() => {
    if (isMobileMenuOpen && screenWidth >= 1024) {
      setIsMobileMenuOpen(false);
    }
  }, [screenWidth]);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className={clsx('container-general', 'header__container')}>
        <Link href="/" className="header__logo" onClick={closeMobileMenu}>
          <Image src="/icons/logo.svg" alt="Logo" width={42} height={30} />
          SureCede
        </Link>

        <div className="header__wrapper">
          <HeaderNavMenu />

          {/* Tooltip added temporarily until there is a link to the Platform */}
          <TemporaryTooltip>
            <SecondaryButton
            // href={''}
            >
              Log In
            </SecondaryButton>
          </TemporaryTooltip>

          <BookDemoButton />
        </div>

        <button
          type="button"
          className="header__burger-menu-btn"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          <BurgerMenu className="header__burger-menu-btn__icon" />
        </button>
      </div>

      {screenWidth < 1024 && (
        <MobileMenu isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
      )}
    </header>
  );
}
