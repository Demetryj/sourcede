'use client';

import { useEffect, useRef, useState } from 'react';

import { useBreakpoint } from '@/hooks';

import './TemporaryTooltip.scss';

export default function TemporaryTooltip({ children, fullWidth, positionTop }) {
  const { screenWidth } = useBreakpoint();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const isClickTooltip = screenWidth > 0 && screenWidth <= 1140;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isClickTooltip && isTooltipOpen) {
      setIsTooltipOpen(false);
    }
  }, [isClickTooltip, isTooltipOpen]);

  useEffect(() => {
    if (!isClickTooltip || !isTooltipOpen) {
      return undefined;
    }

    const handleOutsideClick = event => {
      if (!containerRef.current || containerRef.current.contains(event.target)) {
        return;
      }

      setIsTooltipOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isClickTooltip, isTooltipOpen]);

  const handleClick = event => {
    if (!isClickTooltip) {
      return;
    }

    event.preventDefault();
    setIsTooltipOpen(prev => !prev);
  };

  return (
    <div
      className="book-demo-button"
      data-tooltip-open={isTooltipOpen || undefined}
      ref={containerRef}
      onClick={handleClick}
      style={{
        width: fullWidth ? '100%' : 'fit-content',
      }}
    >
      {children}

      <span
        className="book-demo-button__tooltip"
        role="status"
        aria-live="polite"
        style={{ top: positionTop ? 'calc(-100% + 6px)' : ' calc(100% + 6px)' }}
      >
        Coming soon
      </span>
    </div>
  );
}
