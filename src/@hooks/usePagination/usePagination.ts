import { useCallback, useEffect, useState } from 'react';
import { getPaginationInfo } from './pagination.service';

export function usePagination<T>(items: T[], page: number = 0, perPage: number = 15) {

  const [pagination, setPagination] = useState(() => getPaginationInfo<T>(items, page, perPage));

  console.log(pagination.items);

  useEffect(() => {
    setPagination(getPaginationInfo<T>(items, page, perPage));
  }, [items, perPage]);

  const goToPage = useCallback((num) => {
    if (num > 0 && num < pagination.total) {
      const pagination = getPaginationInfo<T>(items, num, perPage);
      setPagination(pagination);
    }
  }, [items, pagination, perPage]);

  function nextPage() {
    goToPage(pagination.page + 1);
  }

  function previousPage() {
    goToPage(pagination.page - 1);
  }

  return { ...pagination, nextPage, previousPage, goToPage };
}
