'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ArticlePage } from '@/views';

export default function Article() {
  useEffect(() => {
    document.title = 'Article';
  }, []);

  const { id } = useParams();

  return <ArticlePage articleId={id} />;
}
