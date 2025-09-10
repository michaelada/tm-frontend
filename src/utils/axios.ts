import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });
console.log(`Config`);
console.table(CONFIG);

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    migrate: '/auth/migrate',
    impersonate: '/auth/impersonate',
  },
  productGroup: {
    list: '/productgroup',
    summary: '/productgroup',
    details: (productGroupId: string | number) => `/productgroup/${productGroupId}`
  },
  favourite: {
    list: '/favourite',
    add: '/favourite',
    remove: (favouriteId: string | number) => `/favourite/${favouriteId}`,
  },
  brand: {
    list: '/brand',
  },
  category: {
    list: '/category',
    details: (categoryId: string | number) => `/category/${categoryId}`,
  },
  product: {
    list: '/product/list',
    details: (productId: string | number) => `/product/${productId}`,
    search: '/product/search',
    newIn: '/product/newin',
    price: (productId: string | number) => `/price/${productId}`,
    addimage: (productId: string | number) => `/product/addimage/${productId}`,
  },
  order: {
    list: '/order',
    details:  (orderId: string | number) => `/order/${orderId}`
  },
  address: {
    list:  `/deliveryAddresses`
  },
  cart: {
    get: '/cart',
    checkout: (orderReference: string, deliveryid: number, orderNote: string) => `/cart/checkout?ref=${orderReference}&deliveryId=${deliveryid}&note=${orderNote}`,
    add: '/cart',
    delete: (itemid: string | number) => `/cart/${itemid}`,
    quantity: (itemid: string | number) => `/cart/${itemid}`,    
  },
  admin: {
    group: {
      add: '/admin/product_groups/add',
      remove: (productId: string | number, productGroupId: string | number) => `/admin/product_groups/remove/${productId}/${productGroupId}`,
      delete: (productGroupId: string | number) => `/admin/product_groups/${productGroupId}`,
      details: (productGroupId: string | number) => `/admin/product_groups/${productGroupId}`,
      addimage: (productGroupId: string | number) => `/product_groups/addimage/${productGroupId}`,
      image: (imageId: string | number) => `/admin/product_group/image/${imageId}`,
    },
    product: {
      list: '/admin/product/list',
      details: (productId: string | number) => `/admin/product/${productId}`,
      search: '/product/search',
      newIn: '/product/newin',
      price: (productId: string | number) => `/price/${productId}`,
      categorys: (productId: string | number) => `/admin/product/categorys/${productId}`,
      images: (productId: string | number) => `/admin/product/images/${productId}`,
      image: (imageId: string | number) => `/admin/product/image/${imageId}`,
    },
    category: {
      list: '/admin/category',
      search: '/admin/category/children',
      add: (parentId: string | number) => `/admin/category/add/${parentId}`,
      products: (categoryId: string | number) => `/admin/category/products/${categoryId}`,
      details: (categoryId: string | number) => `/admin/category/${categoryId}`,
      remove: (categoryId: string | number, productId: string | number) => `/admin/product/categorys/${categoryId}/${productId}`,
      associate: (categoryId: string | number, productId: string | number) => `/admin/product/categorys/associate/${categoryId}/${productId}`,
    },
    customer: {
      list: '/admin/customer',
      details: (customerId: string | number) => `/admin/customer/${customerId}`,
    },
    order: {
      list: '/admin/orders',
      details: (id: string | number) => `/admin/orders/${id}`,
      reissue: (id: string | number) => `/admin/order/reissue/${id}`,
    }

  }
};
