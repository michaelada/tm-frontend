import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher , endpoints} from 'src/utils/axios';

import type { IOrder } from '../utils/types';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetOrder(orderId: string) {
  const url = orderId ? [endpoints.order.details(orderId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<IOrder>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      order: data,
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

