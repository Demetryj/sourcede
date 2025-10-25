'use client';

import ReactPaginate from 'react-paginate';
import clsx from 'clsx';

import { IconButton } from '@/components/common';

import { useBreakpoint } from '@/hooks';

import { ChevronLeftSecond, ChevronRightSecond } from '@/components/icons';

import './Pagination.scss';

export default function Pagination({ currentPage, totalPages, handlePageClick, additionalClass }) {
  const { isMobile } = useBreakpoint();

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<IconButton icon={ChevronRightSecond} />}
      previousLabel={<IconButton icon={ChevronLeftSecond} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={isMobile ? 1 : 3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      forcePage={Number(currentPage) - 1}
      className={clsx('pagination', additionalClass && additionalClass)}
      pageLinkClassName="pagination__item"
      activeLinkClassName="pagination__item--active"
      nextLinkClassName="pagination__change-button"
      previousLinkClassName="pagination__change-button"
      breakClassName="pagination__break"
      disabledLinkClassName="pagination__disabled-button"
    />
  );
}
