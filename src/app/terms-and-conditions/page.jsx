'use client';

import { useEffect } from 'react';

import { TermsAndConditionsPage } from '@/views';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms And Conditions';
  }, []);

  return <TermsAndConditionsPage />;
}
