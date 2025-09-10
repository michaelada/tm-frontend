import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher , endpoints} from 'src/utils/axios';

import type { ICategory } from '../utils/types';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetCategories() {
  const url = endpoints.category.list;

  const { data, isLoading, error, isValidating } = useSWR<ICategory[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      categories: data ?? [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
