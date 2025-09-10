import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import OrderDetailsPage from 'src/pages/orders/details';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/home/home'));
const NewIn = lazy(() => import('src/pages/new-in/new-in'));
// ----------------------------------------------------------------------

// Product
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailsPage = lazy(() => import('src/pages/product/details'));
// ----------------------------------------------------------------------

// Favourite
const FavouritesListPage = lazy(() => import('src/pages/favourite/list'));

// ----------------------------------------------------------------------

// Cart
const Cart = lazy(() => import('src/pages/cart/cart'));

const Orders = lazy(() => import('src/pages/orders/orders'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: '',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'products',
        children: [
          { element: <ProductListPage />, index: true },
          { path: ':id', element: <ProductDetailsPage /> },
        ],
      },
      { path: 'favourites', element: <FavouritesListPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'new-in', element: <NewIn /> },
      { path: 'orders', 
        children: [
          { element: <Orders />, index: true },
          { path: ':id', element: <OrderDetailsPage /> },
        ]
      },
    ],
  },
];