import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import type { ICategory, IProductCategory, ICustomer, IProduct, IProductGroup, IProductImage } from '../utils/types';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetProductImages(productId: string) {
  const url = endpoints.admin.product.images(productId);

  const { data, isLoading, error, isValidating } = useSWR<IProductImage[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      productImages: data ?? [],
      productImagesLoading: isLoading,
      productImagesError: error,
      productImagesValidating: isValidating,
      productImagesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProductCategorys(productId: string) {
  const url = endpoints.admin.product.categorys(productId);

  const { data, isLoading, error, isValidating } = useSWR<IProductCategory[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      productCategorys: data ?? [],
      productCategorysLoading: isLoading,
      productCategorysError: error,
      productCategorysValidating: isValidating,
      productCategorysEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------


export function useGetProductGroups() {
  const url = endpoints.productGroup.list;

  const { data, isLoading, error, isValidating } = useSWR<IProductGroup[]>(
    url,
    fetcher,
    swrOptions
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

export function useGetProductGroup(productGroupId: string) {
  const url = productGroupId ? [endpoints.productGroup.details(productGroupId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<IProductGroup>(url, fetcher, swrOptions);

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

export function useGetAdminProduct(productId: string) {
  const url = productId ? [endpoints.admin.product.details(productId)] : '';

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

export function useGetCategory(categoryId: string) {
  const url = categoryId ? [endpoints.admin.category.details(categoryId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<ICategory>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      category: data,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCustomer(customerId: string) {
  const url = customerId ? [endpoints.admin.customer.details(customerId)] : '';

  const { data, isLoading, error, isValidating } = useSWR<ICustomer>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      customer: data,
      customerLoading: isLoading,
      customerError: error,
      customerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
export function useGetCategoryProducts(categoryId: string) {
  const url = [endpoints.admin.category.products(categoryId)];

  const { data, isLoading, error, isValidating } = useSWR<IProduct[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      products: data ?? [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
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
  console.log("useSearchProductGroups");
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

export function useSearchProduct(searchOptions: {
  search?: string;
  newin?: string;
  instock?: string;
  status?: string;
  unsassigned?: boolean;
}) {
  const url = searchOptions ? [endpoints.admin.product.list, { params: searchOptions }] : '';

  const { data, isLoading, error, isValidating } = useSWR<IProduct[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      products: data ?? [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useSearchCategory(searchOptions: {
  search?: string;
}) {
  const url = searchOptions ? [endpoints.admin.category.list, { params: searchOptions }] : '';

  const { data, isLoading, error, isValidating } = useSWR<ICategory[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      categorys: data ?? [],
      categorysLoading: isLoading,
      categorysError: error,
      categorysValidating: isValidating,
      categorysEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useSearchCategoryChildren(searchOptions: {
  search?: string;
}) {
  const url = searchOptions ? [endpoints.admin.category.search, { params: searchOptions }] : '';

  const { data, isLoading, error, isValidating } = useSWR<ICategory[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      categorys: data ?? [],
      categorysLoading: isLoading,
      categorysError: error,
      categorysValidating: isValidating,
      categorysEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useSearchCustomer(searchOptions: {
  search?: string;
}) {
  const url = searchOptions ? [endpoints.admin.customer.list, { params: searchOptions }] : '';

  const { data, isLoading, error, isValidating } = useSWR<ICustomer[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      customers: data ?? [],
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.length,
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
