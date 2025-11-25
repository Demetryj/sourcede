'use client';

import { useEffect } from 'react';

import { PrivacyPolicyPage } from '@/views';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy policy';
  }, []);

  return <PrivacyPolicyPage />;
}
