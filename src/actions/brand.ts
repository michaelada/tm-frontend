import useSWR from 'swr';
import { useMemo } from 'react';

import {  fetcher , endpoints} from 'src/utils/axios';
import type { IBrand } from '../utils/types';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetBrands() {
  const url = endpoints.brand.list;

  const { data, isLoading, error, isValidating } = useSWR<IBrand[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      brands: data ?? [],
      brandsLoading: isLoading,
      brandsError: error,
      brandsValidating: isValidating,
      brandsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
