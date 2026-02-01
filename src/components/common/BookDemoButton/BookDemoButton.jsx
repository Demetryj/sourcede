'use client';

import { useEffect, useState } from 'react';

import { PrimaryButton } from '@/components/common';
import { useBreakpoint } from '@/hooks';

import './BookDemoButton.scss';

export default function BookDemoButton({ additionalClass }) {
  // Tooltip added temporarily until there is a link to the Platform
  const { screenWidth } = useBreakpoint();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const isClickTooltip = screenWidth > 0 && screenWidth <= 1140;

  useEffect(() => {
    if (!isClickTooltip && isTooltipOpen) {
      setIsTooltipOpen(false);
    }
  }, [isClickTooltip, isTooltipOpen]);

  const handleClick = event => {
    if (!isClickTooltip) {
      return;
    }

    event.preventDefault();
    setIsTooltipOpen(prev => !prev);
  };

  return (
    <div className="book-demo-button" data-tooltip-open={isTooltipOpen || undefined}>
      <PrimaryButton
        withIcon
        additionalClass={additionalClass}
        type="button"
        handleClick={handleClick}
      >
        Book a Demo
      </PrimaryButton>
      <span className="book-demo-button__tooltip" role="status" aria-live="polite">
        Coming soon
      </span>
    </div>
  );
}
