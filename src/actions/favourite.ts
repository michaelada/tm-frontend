import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, fetcher } from 'src/utils/axios';
import { IProduct, IProductGroup } from '../utils/types';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: false,
};

const swrFavouriteOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: false,
  // refreshInterval: 1000
};

// ----------------------------------------------------------------------

export function useGetFavourites() {
  const url = endpoints.favourite.list;

  const { data, isLoading, error, isValidating } = useSWR<IProduct[]>(
    url,
    fetcher,
    swrFavouriteOptions
  );

  const memoizedValue = useMemo(
    () => ({
      productGroups: data ?? [],
      productGroupsLoading: isLoading,
      productGroupsError: error,
      productGroupsValidating: isValidating,
      productGroupsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useRemoveFavourite(productId: string) {
  const url = endpoints.favourite.remove(productId);

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      productGroup: data,
      productGroupLoading: isLoading,
      productGroupError: error,
      productGroupValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const url = productId ? [endpoints.product.details(productId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<IProduct>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetNewInProducts() {
  const url = endpoints.product.newIn;

  const { data, isLoading, error, isValidating } = useSWR<IProduct[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProductGroups(searchOptions: {
  search?: string;
  deep?: number;
  newin?: number;
  instock?: number;
  categoryid?: string;
  brandid?: string;
}) {
  const url = searchOptions ? [endpoints.productGroup.list, { params: searchOptions }] : '';

  const { data, isLoading, error, isValidating } = useSWR<IProductGroup[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      productGroups: data ?? [],
      productGroupsLoading: isLoading,
      productGroupsError: error,
      productGroupsValidating: isValidating,
      productGroupsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PriceData = {
  price: string;
};

export function useGetProductPrice(productId: string) {
  const url = productId ? [endpoints.product.price(productId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<PriceData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      price: data?.price ?? '',
      priceLoading: isLoading,
      priceError: error,
      priceValidating: isValidating,
    }),
    [data?.price, error, isLoading, isValidating]
  );

  return memoizedValue;
}
