'use client';

import { useEffect } from 'react';

import { ContactUsPage } from '@/views';

export default function MarketInsights() {
  useEffect(() => {
    document.title = 'Contact us';
  }, []);

  return <ContactUsPage />;
}
