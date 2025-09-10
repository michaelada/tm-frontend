import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    skip: boolean;
    redirectPath: string;
  };
};

// ----------------------------------------------------------------------
console.table(import.meta.env);
export const CONFIG: ConfigValue = {
  appName: 'Tom Martin',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? 'https://api.tommartin.ie',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  /**
   * Auth
   */
  auth: {
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};
