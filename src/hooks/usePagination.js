'use client';

import { useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePagination = ({ items = [], perPage = 9, param = 'page', hash }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // read the page from the URL if it is not present — 1
  const pageFromUrl = Number(searchParams.get(param));
  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(page, totalPages);

  // slice of the array for the current page
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, safePage, perPage]);

  // write the page to the URL after clicking
  const setPage = nextPage => {
    const page = nextPage.selected + 1;
    const params = new URLSearchParams(searchParams);
    params.set(param, String(page));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    const target = document.getElementById(hash);
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const next = useCallback(() => setPage(safePage + 1), [setPage, safePage]);
  const prev = useCallback(() => setPage(safePage - 1), [setPage, safePage]);

  return { currentPage: safePage, pageItems, next, prev, setPage, totalPages };
};
