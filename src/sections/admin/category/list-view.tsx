import { useSetState } from 'src/hooks/use-set-state';

import { useEffect } from 'react';

import Card from '@mui/material/Card';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useSearchCategory } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { Typography, Button} from '@mui/material';
import { ICategoryFilters } from '../../../utils/types';
import { useDebounce } from '../../../hooks/use-debounce';
import { adminpaths as paths } from '../../../routes/adminpaths';
import { CategoryTable } from './category-table';
import { CategoryToolbar } from './category-toolbar';

// ----------------------------------------------------------------------

export function CategoryListView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const filters = useSetState<ICategoryFilters>({
    search: searchParams.get('search') ?? undefined,
  });

 
  useEffect(() => {
    console.log(filters.state);
    const { search = '' } = filters.state;
    const queryParams = new URLSearchParams({ search });
    router.replace(`${paths.dashboard.category.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: ICategoryFilters) {
    return {
      search: f.search,
    };
  }

  const debouncedFilters = useDebounce<ICategoryFilters>(filters.state);

  const { categorys, categorysLoading } = useSearchCategory(
    mapFilters(debouncedFilters)
  );


  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Top Level Categories
        </Typography>

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            // height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
            pt:3
          }}
        >
          {/* <CategoryToolbar filters={filters} /> */}
          <CategoryTable categorysLoading={categorysLoading} isLoading={categorysLoading} categorys={categorys} isSubcategory={false}/>
        </Card>
        
      </DashboardContent>
    </>
  );
}
