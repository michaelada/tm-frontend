import { useSetState } from 'src/hooks/use-set-state';

import { useEffect } from 'react';

import Card from '@mui/material/Card';
import { useParams, useRouter, useSearchParams } from 'src/routes/hooks';
import { useSearchProductGroups } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import Typography from '@mui/material/Typography';
import { IProductGroupFilters } from '../../../utils/types';
import { CollapsibleProductGroupTable } from '../table/product-groups-table';
import { ProductGroupsToolbar } from '../table/product-groups-toolbar';
import { useGetCategories } from '../../../actions/category';
import { useGetBrands } from '../../../actions/brand';
import { useDebounce } from '../../../hooks/use-debounce';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------

export function ProductListView() {
  const router = useRouter();

  const { categories, categoriesLoading } = useGetCategories();

  const searchParams = useSearchParams();
  const filters = useSetState<IProductGroupFilters>({
    categoryId: searchParams.get('categoryId') || undefined,
    subcategoryId: searchParams.get('subcategoryId') || undefined,
    search: searchParams.get('search') ?? undefined,
  });

  console.log("product group listing");

  useEffect(() => {
    console.log("useEffect - product group listing");
    const { categoryId = '', subcategoryId = '', search = '' } = filters.state;
    const queryParams = new URLSearchParams({ categoryId, subcategoryId, search });
    router.replace(`${paths.product.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: IProductGroupFilters) {
    console.log("product group listing - map filters");
    return {
      search: f.search,
      deep: f.search?.length ? 1 : undefined,
      categoryid: f.subcategoryId ?? f.categoryId,
    };
  }

  const debouncedFilters = useDebounce<IProductGroupFilters>(filters.state);
  const { productGroups, productGroupsLoading } = useSearchProductGroups(
    mapFilters(debouncedFilters)
  );


  return (
    <>
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
          <ProductGroupsToolbar filters={filters} options={{ categories }} />
          <CollapsibleProductGroupTable
            productGroups={productGroups}
            productGroupsLoading={productGroupsLoading}
            isLoading={productGroupsLoading}
          />
        </Card>
      </DashboardContent>
    </>
  );
}
