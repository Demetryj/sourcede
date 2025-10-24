'use client';

import { useEffect } from 'react';

import { HomePage } from '@/views';

export default function Home() {
  useEffect(() => {
    document.title = 'Home';
  });

  return <HomePage />;
}
