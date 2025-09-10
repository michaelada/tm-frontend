import { useEffect } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { useSearchProduct } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { ProductTable } from './table/product-table';
import { ProductToolbar } from './table/product-toolbar';
import { useDebounce } from '../../../hooks/use-debounce';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { IProductFilters } from '../../../utils/types';

// ----------------------------------------------------------------------

export function AdminProductListView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const filters = useSetState<IProductFilters>({
    newin: searchParams.get('newin') || undefined,
    instock: searchParams.get('instock') || undefined,
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') ?? undefined,
  });


  useEffect(() => {
    console.log(filters.state);
    const { newin = '', instock = '', search = '', status='active' } = filters.state;
    const queryParams = new URLSearchParams({ newin, instock, search, status });
    router.replace(`${paths.dashboard.product.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: IProductFilters) {
    return {
      search: f.search,
      status: f.status,
      newin: f.newin,
      instock: f.instock
    };
  }

  const debouncedFilters = useDebounce<IProductFilters>(filters.state);

  const { products } = useSearchProduct(
    mapFilters(debouncedFilters)
  );


  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Products
        </Typography>

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            // height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <ProductToolbar filters={filters}  />
          <ProductTable productsLoading={false} isLoading={false} products={products} assigned/>
        </Card>
      </DashboardContent>
  );
}
