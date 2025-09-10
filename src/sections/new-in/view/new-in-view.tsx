import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetNewInProducts, useSearchProductGroups } from 'src/actions/product';

import { useRouter } from '../../../routes/hooks';
import { ProductCard } from '../../product/product-card';
import { ProductGroupSkeleton } from '../../product/product-skeleton';

// ----------------------------------------------------------------------

export function NewInView() {
  const router = useRouter();

  const { products, productsLoading } = useGetNewInProducts();

  const renderLoading = <ProductGroupSkeleton />;

  const renderList = products?.length ? (
    products?.map((product) => <ProductCard key={product.id} product={product} />)
  ) : (
    <Box>
      <Typography variant="h5">No items found</Typography>
    </Box>
  );

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          New In
        </Typography>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {productsLoading ? renderLoading : renderList}
        </Box>
      </DashboardContent>
    </>
  );
}
