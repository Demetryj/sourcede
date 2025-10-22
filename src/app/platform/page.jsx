'use client';

import { useEffect } from 'react';

import { PlatformPage } from '@/views';

export default function Home() {
  useEffect(() => {
    document.title = 'Platform';
  });

  return <PlatformPage />;
}
