import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints} from 'src/utils/axios';
import type { ICart } from '../utils/types';
import { useAuthContext } from '../auth/hooks';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetCart() {
  const url = [endpoints.cart.get];

  const authContext = useAuthContext();
  const shouldFetch = authContext.authenticated;

  const { data, isLoading, error, isValidating } = useSWR<ICart>(shouldFetch ? url : null, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      cart: data,
      cartLoading: isLoading,
      cartError: error,
      cartValidating: isValidating,
      cartEmpty: !isLoading && !data?.Cartitems?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
