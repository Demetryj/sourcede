'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { ChevronDownDropdown } from '@/components/icons';

import './TextButton.scss';

export default function TextButton({ isOpen, handleClick, children, disabled, withIcon, href }) {
  if (href) {
    return (
      <Link href={href} className={clsx('text-button', isOpen && 'open')}>
        {children}

        {withIcon && (
          <ChevronDownDropdown className={clsx('text-button__icon', isOpen && 'rotate')} />
        )}
      </Link>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={clsx('text-button', isOpen && 'open')}
    >
      {children}

      {withIcon && (
        <ChevronDownDropdown className={clsx('text-button__icon', isOpen && 'rotate')} />
      )}
    </button>
  );
}
