'use client';

import { FAQSection } from '@/components/common';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Platform';
  });

  return (
    <>
      <h1>Platform page</h1>
      <FAQSection />;
    </>
  );
}
