'use client';

import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    isMobileS: false,
    isMobileM: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isWide: false,
    isUltra: false,
    screenWidth: 0,
  });

  useEffect(() => {
    function updateBreakpoints() {
      const width = window.innerWidth;

      setBreakpoints({
        isMobile: width <= 375,
        isTablet: width <= 768,
        isDesktop: width >= 1440,
        screenWidth: width,
      });
    }

    updateBreakpoints();

    window.addEventListener('resize', updateBreakpoints);

    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
}
