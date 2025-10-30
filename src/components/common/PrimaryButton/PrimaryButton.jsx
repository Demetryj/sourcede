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
  type = 'button',
  href,
  ...props
}) {
  const Content = (
    <>
      <div className="primary-button__wrapper">
        <span className="primary-button__label" aria-hidden="true">
          <span className="primary-button__line">{children}</span>
          <span className="primary-button__line">{children}</span>
        </span>
      </div>

      <span className="sr-only">{typeof children === 'string' ? children : ''}</span>

      {withIcon && <ArrowRight className="primary-button__icon" />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx('primary-button', additionalClass && additionalClass)}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || undefined}
      >
        {Content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={clsx('primary-button', additionalClass && additionalClass)}
      {...props}
    >
      {Content}
    </button>
  );
}
