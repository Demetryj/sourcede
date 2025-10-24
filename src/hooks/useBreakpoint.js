'use client';

import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    screenWidth: 0,
  });

  useEffect(() => {
    function updateBreakpoints() {
      const width = window.innerWidth;

      setBreakpoints({
        isMobile: width < 768,
        isTablet: width < 1024,
        isLaptop: width < 1440,
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
