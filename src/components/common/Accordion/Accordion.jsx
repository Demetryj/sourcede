'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { IconButton } from '@/components/common';

import { ChevronRightSecond, Plus } from '@/components/icons';

import './Accordion.scss';

export default function Accordion({ isMobileMenu, children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;
    const el = contentRef.current;
    const update = () => setMaxHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen, children]);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <div className={clsx('accordion', isMobileMenu && 'mobile', isOpen && 'open')}>
      <div role="button" className="accordion__header" onClick={toggleAccordion}>
        <h6 className={clsx('accordion__title', isMobileMenu && 'mobile__title')}>{title}</h6>

        <IconButton
          icon={isMobileMenu ? ChevronRightSecond : Plus}
          handleClick={() => toggleAccordion}
          additionalClass={clsx('accordion__button', isOpen && 'open', isMobileMenu && 'mobile')}
        />
      </div>

      <div
        ref={contentRef}
        className={clsx('accordion__body', isOpen && 'open', isMobileMenu && 'mobile')}
        style={{ maxHeight: isOpen ? maxHeight : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
