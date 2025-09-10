import { useEffect } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { useSearchProduct } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { useDebounce } from '../../../hooks/use-debounce';
import { ProductTable } from '../product/table/product-table';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { IProductFilters } from '../../../utils/types';

// ----------------------------------------------------------------------

export function UnassignedListView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const filters = useSetState<IProductFilters>({
    search: searchParams.get('search') ?? undefined,
  });


  useEffect(() => {
    console.log(filters.state);
    const { search = ''} = filters.state;
    const queryParams = new URLSearchParams({ search });
    router.replace(`${paths.dashboard.unassignedproduct.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: IProductFilters) {
    return {
      search: f.search,
      unassigned: true
    };
  }

  const debouncedFilters = useDebounce<IProductFilters>(filters.state);

  const { products, productsLoading } = useSearchProduct(
    mapFilters(debouncedFilters)
  );


  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Unassigned Products
        </Typography>

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            // height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <ProductTable productsLoading={productsLoading} isLoading={false} products={products} assigned={false}/>
        </Card>
      </DashboardContent>
  );
}
