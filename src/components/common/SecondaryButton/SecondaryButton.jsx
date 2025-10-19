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
  href,
  ...props
}) {
  if (href) {
    return (
      <Link href={href} className={clsx('secondary-button', additionalClass && additionalClass)}>
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
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={clsx('secondary-button', additionalClass && additionalClass)}
      {...props}
    >
      {children}

      {withIcon &&
        (isOpen ? (
          <ChevronTopDropdown className="secondary-button__icon" />
        ) : (
          <ChevronDownDropdown className="secondary-button__icon" />
        ))}
    </button>
  );
}
