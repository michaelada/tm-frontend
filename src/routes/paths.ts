import { _id } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '',
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/sign-in`,
      contact: `https://www.tommartin.ie/contact-us/`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    products: `${ROOTS.DASHBOARD}/products`,
    product: {
      root: `${ROOTS.DASHBOARD}/products`,
      details: (id: string) => `${ROOTS.DASHBOARD}/products/${id}`,
    },
    favourites: `${ROOTS.DASHBOARD}/favourites`,
    newIn: `${ROOTS.DASHBOARD}/new-in`,
    orders: `${ROOTS.DASHBOARD}/orders`,
    cart: `${ROOTS.DASHBOARD}/cart`,
  },
  product: {
    root: `/products`,
    checkout: `/product/checkout`,
    details: (id: string) => `/products/${id}`,
    demo: { details: `/products/${MOCK_ID}` },
  },
  orders: {
    root: `/orders`,
    details: (id?: number) => `/orders/${id}`,
  }
};
