'use client';

import { useEffect } from 'react';

import { AgreementPage } from '@/views';

export default function Agreement() {
  useEffect(() => {
    document.title = 'Data Processing Agreement';
  }, []);

  return <AgreementPage />;
}
