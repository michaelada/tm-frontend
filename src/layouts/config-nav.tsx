import { paths } from 'src/routes/paths';
import { adminpaths } from 'src/routes/adminpaths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';
import CartSize from 'src/sections/cart/context/cart-size';
import FavouriteSize from 'src/sections/favourite/favourite-size';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  newIn: icon('ic-new-in'),
  home: icon('ic-round-home'),
};

// ----------------------------------------------------------------------
export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Navigation',
    items: [
      { title: 'Home', path: paths.dashboard.root, icon: ICONS.home },
      { title: 'Products', path: paths.dashboard.products, icon: ICONS.ecommerce },
      { title: 'Favourites', path: paths.dashboard.favourites, icon: ICONS.label, info: <FavouriteSize/> },
      { title: 'New In', path: paths.dashboard.newIn, icon: ICONS.newIn },
      { title: 'Orders', path: paths.dashboard.orders, icon: ICONS.invoice },
      { title: 'Cart', path: paths.dashboard.cart, icon: ICONS.order, info: <CartSize/> },
    ],
  },
];

export const adminNavData = [
  {
    subheader: 'Navigation',
    items: [
      { title: 'Admin Home', path: adminpaths.dashboard.root, icon: ICONS.home },
    ],
  },
  {
    subheader: 'Products',
    items: [
      { title: 'Individual', path: adminpaths.dashboard.products, icon: ICONS.newIn },
      { title: 'Unassigned', path: adminpaths.dashboard.unassignedproducts, icon: ICONS.blank },
      { title: 'Groups', path: adminpaths.dashboard.groups, icon: ICONS.job },
      { title: 'Categories', path: adminpaths.dashboard.categorys, icon: ICONS.parameter },
    ],
  },
  {
    subheader: 'Customers',
    items: [
      { title: 'Customers', path: adminpaths.dashboard.customers, icon: ICONS.user},
      { title: 'Orders', path: adminpaths.dashboard.orders, icon: ICONS.invoice},
    ],
  },
];
