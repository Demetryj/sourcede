import { useCallback, useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const secondButtonRef = useRef(null);
  const secondDropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const toggleSecondDropdown = useCallback(() => {
    setIsSecondDropdownOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        secondDropdownRef.current &&
        !secondDropdownRef.current.contains(event.target) &&
        secondButtonRef.current &&
        !secondButtonRef.current.contains(event.target)
      ) {
        setIsSecondDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsSecondDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return {
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    buttonRef,
    openDropdown: () => setIsDropdownOpen(true),
    closeDropdown: () => setIsDropdownOpen(false),
    isSecondDropdownOpen,
    secondButtonRef,
    secondDropdownRef,
    toggleSecondDropdown,
    openSecondDropdown: () => setIsSecondDropdownOpen(true),
    closeSecondDropdown: () => setIsSecondDropdownOpen(false),
  };
};
