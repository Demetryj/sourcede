'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { ChevronTopDropdown, ChevronDownDropdown } from '@/components/icons';

import './SecondaryButton.scss';

export default function SecondaryButton({
  isOpen,
  handleClick,
  children,
  disabled,
  additionalClass = '',
  withIcon,
  type = 'button',
  href,
  isSubmitting,
  ...props
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx('secondary-button', additionalClass && additionalClass)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}

        {withIcon &&
          (isOpen ? (
            <ChevronTopDropdown className="secondary-button__icon" />
          ) : (
            <ChevronDownDropdown className="secondary-button__icon" />
          ))}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={clsx('secondary-button', additionalClass && additionalClass)}
      {...props}
    >
      {isSubmitting ? 'Loading...' : children}

      {withIcon &&
        (isOpen ? (
          <ChevronTopDropdown className="secondary-button__icon" />
        ) : (
          <ChevronDownDropdown className="secondary-button__icon" />
        ))}
    </button>
  );
}
