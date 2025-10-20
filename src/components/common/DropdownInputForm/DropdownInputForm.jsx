'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ChevronBottomSecond } from '@/components/icons';

import { useDropdown } from '@/hooks';

import './DropdownInputForm.scss';

export default function DropdownInputForm({
  label,
  name,
  placeholder = '',
  dropdownList,
  value = '',
  onChange,
  ...props
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { isDropdownOpen, dropdownRef, buttonRef, toggleDropdown, closeDropdown, openDropdown } =
    useDropdown();
  const optionRefs = useRef([]);

  const listId = `${name || 'dropdown'}-listbox`;

  useEffect(() => {
    if (!isDropdownOpen) return;

    dropdownRef.current.scrollTop = 0;
    setActiveIndex(0);
    optionRefs.current[0]?.focus();
  }, [isDropdownOpen]);

  const open = (focus = 'first') => {
    openDropdown();
    queueMicrotask(() => {
      const arr = optionRefs.current;
      if (!arr.length) return;
      const idx = focus === 'last' ? arr.length - 1 : 0;
      setActiveIndex(idx);
      arr[idx]?.focus();
    });
  };

  const close = () => {
    closeDropdown();
    setActiveIndex(0);
    buttonRef.current?.focus();
  };

  const selectByIndex = idx => {
    const value = dropdownList[idx] ?? '';
    onChange?.(value);
    close();
  };

  const onButtonKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isDropdownOpen) open('first');
        else optionRefs.current[activeIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isDropdownOpen) open('last');
        else optionRefs.current[activeIndex]?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        isDropdownOpen ? close() : open('first');
        break;
      case 'Escape':
        if (isDropdownOpen) {
          e.preventDefault();
          close();
        }
        break;
    }
  };

  const onListKeyDown = e => {
    if (!isDropdownOpen) return;
    const last = dropdownList.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => {
          const ni = Math.min(i + 1, last);
          optionRefs.current[ni]?.focus();
          return ni;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => {
          const ni = Math.max(i - 1, 0);
          optionRefs.current[ni]?.focus();
          return ni;
        });
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        optionRefs.current[0]?.focus();
        break;
      case 'End':
      case 'PageDown':
        e.preventDefault();
        setActiveIndex(last);
        optionRefs.current[last]?.focus();
        break;
      case 'Enter':
        e.preventDefault();
        selectByIndex(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div className="dropdown-input-form">
      {label && (
        <label htmlFor={name} className="dropdown-input-form__label">
          {label}
        </label>
      )}

      <div className="dropdown-input-form__field-wrapper" onClick={toggleDropdown} ref={buttonRef}>
        <input
          id={name}
          type="text"
          name={name}
          placeholder={placeholder}
          readOnly
          value={value}
          className={clsx('dropdown-input-form__field', isDropdownOpen && 'open')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              isDropdownOpen ? close() : open('first');
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              open('first');
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              open('last');
            }
          }}
          {...props}
        />

        <button
          type="button"
          ref={buttonRef}
          className="dropdown-input-form__trigger"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-controls={listId}
          onClick={() => (isDropdownOpen ? close() : open('first'))}
          onKeyDown={onButtonKeyDown}
        >
          <ChevronBottomSecond
            className={clsx('dropdown-input-form__icon', isDropdownOpen && 'open')}
          />
          <span className="visually-hidden">Toggle dropdown</span>
        </button>
      </div>

      <ul
        id={listId}
        role="listbox"
        ref={dropdownRef}
        className={clsx('dropdown-input-form__dropdown-list', isDropdownOpen && 'open')}
        onKeyDown={onListKeyDown}
      >
        {dropdownList.map((value, index) => (
          <li
            key={`${value}-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            tabIndex={-1}
            ref={el => (optionRefs.current[index] = el)}
            className={clsx(
              'dropdown-input-form__dropdown-list__item',
              isDropdownOpen && 'open',
              index === activeIndex && 'active'
            )}
            onClick={() => selectByIndex(index)}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
