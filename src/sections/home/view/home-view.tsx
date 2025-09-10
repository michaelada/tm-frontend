// ----------------------------------------------------------------------

import Divider from '@mui/material/Divider';
import { HomeHero } from '../home-hero';
import { HomeCategories } from '../home-categories';
import { DashboardContent } from '../../../layouts/dashboard';

export function HomeView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} >
      <HomeHero />
      <Divider sx={{ my: 2 }}/>
      <HomeCategories />
    </DashboardContent>
  );
}
