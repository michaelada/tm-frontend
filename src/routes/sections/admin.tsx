import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';


// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/home/adminhome'));
// ----------------------------------------------------------------------

// Product
const AdminProductListPage = lazy(() => import('src/pages/admin/product/list'));
const AdminProductDetailsPage = lazy(() => import('src/pages/admin/product/details'));
const UnassignedListPage = lazy(() => import('src/pages/admin/unsassigned/list'));
const GroupListPage = lazy(() => import('src/pages/admin/group/list'));
const GroupDetailsPage = lazy(() => import('src/pages/admin/group/details'));
const CustomerListPage = lazy(() => import('src/pages/admin/customer/list'));
const CustomerDetailsPage = lazy(() => import('src/pages/admin/customer/details'));
const CategoryListPage = lazy(() => import('src/pages/admin/category/list'));
const CategoryChildrensViewPage = lazy(() => import('src/pages/admin/category/children'));
const CategoryDeleteViewPage = lazy(() => import('src/pages/admin/category/delete'));
const GroupDeleteViewPage = lazy(() => import('src/pages/admin/group/delete'));
const RemoveGroupConfirmationPage = lazy(() => import('src/pages/admin/group/remove'));
const AssociateProductCategoryPage = lazy(() => import('src/pages/admin/category/associate'));
const AdminCategoryDetailsPage = lazy(() => import('src/pages/admin/category/details'));
const AddProductImagePage = lazy(() => import('src/pages/admin/product/addimage'));
const AddProductGroupImagePage = lazy(() => import('src/pages/admin/group/add-group-image'));
const AddProductGroupPage = lazy(() => import('src/pages/admin/group/add'));
const AddCategoryPage = lazy(() => import('src/pages/admin/category/add'));
const RenameCategoryPage = lazy(() => import('src/pages/admin/category/rename'));
const ReissueOrderPage = lazy(() => import('src/pages/admin/orders/reissue'));

// ----------------------------------------------------------------------

// Favourite

// ----------------------------------------------------------------------

// Cart
const AdminOrders = lazy(() => import('src/pages/admin/orders/orders'));
const AdminOrderDetails = lazy(() => import('src/pages/admin/orders/details'));


// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout >
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const adminRoutes = [
  {
    path: 'admin',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'products',
        children: [
          { element: <AdminProductListPage />, index: true },
          { path: ':id', element: <AdminProductDetailsPage /> },
            { path: 'remove/:id', element: <RemoveGroupConfirmationPage /> },
            { path: 'associate/:id', element: <AssociateProductCategoryPage /> },
            { path: 'addimage/:id', element: <AddProductImagePage /> },
        ],
      },
      {
        path: 'unassignedproducts',
        children: [
          { element: <UnassignedListPage />, index: true },
          { path: ':id', element: <AdminProductDetailsPage /> },
        ],
      },
      {
        path: 'groups',
        children: [
          { element: <GroupListPage />, index: true },
          { path: 'add', element: <AddProductGroupPage /> },
          { path: 'delete/:id', element: <GroupDeleteViewPage /> },
          { path: ':id', element: <GroupDetailsPage /> },
          { path: 'addimage/:id', element: <AddProductGroupImagePage /> },

        ],
      },
      {
        path: 'categorys',
        children: [
          { element: <CategoryListPage />, index: true },
          { path: 'children/:id', element: <CategoryChildrensViewPage /> },
          { path: 'add/:id', element: <AddCategoryPage /> },
          { path: 'rename/:id', element: <RenameCategoryPage /> },
          { path: ':id', element: <AdminCategoryDetailsPage /> },
          { path: 'delete/:id', element: <CategoryDeleteViewPage /> },
        ],
      },
      {
        path: 'customers',
        children: [
          { element: <CustomerListPage />, index: true },
          { path: ':id', element: <CustomerDetailsPage /> },
        ],
      },
      { path: 'orders', 
        children: [
          { element: <AdminOrders />, index: true },
          { path: ':id', element: <AdminOrderDetails /> },
          { path: 'reissue/:id', element: <ReissueOrderPage /> },
        ]
      },
         
    ],
  },
];