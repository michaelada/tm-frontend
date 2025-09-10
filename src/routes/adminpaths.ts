
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/admin',
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

export const adminpaths = {
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
      remove: (id: string) => `${ROOTS.DASHBOARD}/products/remove/${id}`,
      associate: (id: string) => `${ROOTS.DASHBOARD}/products/associate/${id}`,
      addimage: (id: string) => `${ROOTS.DASHBOARD}/products/addimage/${id}`,
    },
    unassignedproducts: `${ROOTS.DASHBOARD}/unassignedproducts`,
    unassignedproduct: {
      root: `${ROOTS.DASHBOARD}/unassignedproducts`,
      details: (id: string) => `${ROOTS.DASHBOARD}/unassignedproducts/${id}`,
    },
    groups: `${ROOTS.DASHBOARD}/groups`,
    group: {
      root: `${ROOTS.DASHBOARD}/groups`,
      add: `${ROOTS.DASHBOARD}/groups/add`,
      details: (id: string) => `${ROOTS.DASHBOARD}/groups/${id}`,
      delete: (id: string) => `${ROOTS.DASHBOARD}/groups/delete/${id}`,
      addimage: (id: string) => `${ROOTS.DASHBOARD}/groups/addimage/${id}`,

    },
    categorys: `${ROOTS.DASHBOARD}/categorys`,
    category: {
      root: `${ROOTS.DASHBOARD}/categorys`,
      add: (id: string) => `${ROOTS.DASHBOARD}/categorys/add/${id}`,
      details: (id: string) => `${ROOTS.DASHBOARD}/categorys/${id}`,
      rename: (id: string) => `${ROOTS.DASHBOARD}/categorys/rename/${id}`,
      children: (id: string) => `${ROOTS.DASHBOARD}/categorys/children/${id}`,
      delete: (id: string) => `${ROOTS.DASHBOARD}/categorys/delete/${id}`,
    },
    customers: `${ROOTS.DASHBOARD}/customers`,
    customer: {
      root: `${ROOTS.DASHBOARD}/customers`,
      details: (id: string) => `${ROOTS.DASHBOARD}/customers/${id}`,
    },
    user: {
      reset: (id: string) => `${ROOTS.DASHBOARD}/users/${id}`,
    },
    orders: `${ROOTS.DASHBOARD}/orders`,
    order: {
      root: `${ROOTS.DASHBOARD}/orders`,
      details: (id: string) => `${ROOTS.DASHBOARD}/orders/${id}`,
      reissue: (id: string) => `${ROOTS.DASHBOARD}/orders/reissue/${id}`,
    },
  }
};
