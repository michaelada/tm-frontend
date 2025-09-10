import { Helmet } from 'react-helmet-async';

import { Divider } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { HomeHero } from 'src/sections/home/home-hero';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Admin Home` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

       <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} >
      <HomeHero />
      <Divider sx={{ my: 2 }}/>
    </DashboardContent>
    </>
  );
}
