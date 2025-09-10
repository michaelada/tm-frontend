import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { useAuthContext } from 'src/auth/hooks';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
import { adminRoutes } from './admin';

// ----------------------------------------------------------------------

export function Router() {
  
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Auth
    ...authRoutes,

    // Dashboard
     ...dashboardRoutes,

    // Admin
    ...adminRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
