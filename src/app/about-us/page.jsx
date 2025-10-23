'use client';

import { useEffect } from 'react';

import { AboutUsPage } from '@/views';

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About us';
  });

  return <AboutUsPage />;
}
