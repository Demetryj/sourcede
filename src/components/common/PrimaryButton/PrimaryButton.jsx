'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { ArrowRight } from '@/components/icons';

import './PrimaryButton.scss';

export default function PrimaryButton({
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
      <Link href={href} className={clsx('primary-button', additionalClass && additionalClass)}>
        {children}

        {withIcon && <ArrowRight className="primary-button__icon" />}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={clsx('primary-button', additionalClass && additionalClass)}
      {...props}
    >
      {children}

      {withIcon && <ArrowRight className="primary-button__icon" />}
    </button>
  );
}
