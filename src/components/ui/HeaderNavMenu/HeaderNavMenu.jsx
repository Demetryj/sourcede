'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  useFloating,
  offset,
  flip,
  shift,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  FloatingPortal,
  FloatingFocusManager,
  useFocus,
} from '@floating-ui/react';

import { TextButton } from '@/components/common';

import {
  headerNavMenuData,
  platformPageNavMenuData,
  aboutAsPageNavMenuData,
} from '@/data/headerNavData';

import './HeaderNavMenu.scss';

function MenuWithDropdown({ title, withIcon, items, placement = 'bottom-start' }) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(16), flip(), shift()],
    strategy: 'fixed',
  });

  const hover = useHover(context, {
    move: true,
    handleClose: safePolygon({ buffer: 4 }),
    delay: { open: 60, close: 60 },
  });

  const dismiss = useDismiss(context, { escapeKey: true });
  const focus = useFocus(context, { enabled: true });

  const role = useRole(context, { role: 'menu' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <li className="header-nav-menu__item">
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => setOpen(v => !v),
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          className: clsx('menu-trigger'),
        })}
        role="button"
      >
        <TextButton withIcon={withIcon} isOpen={open}>
          {title}
        </TextButton>
      </div>

      <FloatingPortal>
        <FloatingFocusManager context={context} modal={false} returnFocus>
          <ul
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx('header-nav-menu__dropdown')}
            data-open={open}
          >
            {items.map(({ title, description, pathname, hash }, index) => (
              <li key={index} className="header-nav-menu__dropdown-item">
                <Link
                  href={{ pathname, hash }}
                  className="header-nav-menu__dropdown-link"
                  onClick={() => setOpen(false)}
                >
                  <h6 className="header-nav-menu__dropdown-link__title">{title}</h6>
                  <p className="header-nav-menu__dropdown-link__description">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </FloatingFocusManager>
      </FloatingPortal>
    </li>
  );
}

export default function HeaderNavMenu() {
  return (
    <nav>
      <ul className="header-nav-menu">
        {headerNavMenuData.map(({ id, title, withIcon, href, value }) => {
          const visibleList =
            value === 'platform'
              ? platformPageNavMenuData
              : value === 'about_us'
                ? aboutAsPageNavMenuData
                : null;

          if (visibleList) {
            return (
              <MenuWithDropdown
                key={id}
                title={title}
                withIcon={withIcon}
                items={visibleList}
                placement="bottom-start"
              />
            );
          }

          return (
            <li key={id} className="header-nav-menu__item">
              <TextButton withIcon={withIcon} href={href}>
                {title}
              </TextButton>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
