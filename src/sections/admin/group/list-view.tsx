import { useEffect } from 'react';

import Card from '@mui/material/Card';
import { Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { useSearchProductGroups } from 'src/actions/product';

import { Iconify } from 'src/components/iconify';

import { GroupsTable } from './groups-table';
import { GroupsToolbar } from './groups-toolbar';
import { useDebounce } from '../../../hooks/use-debounce';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { IProductGroupFilters } from '../../../utils/types';

// ----------------------------------------------------------------------

export function GroupListView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const filters = useSetState<IProductGroupFilters>({
    search: searchParams.get('search') ?? undefined,
  });


  useEffect(() => {
    console.log(filters.state);
    const { search = '' } = filters.state;
    const queryParams = new URLSearchParams({ search });
    router.replace(`${paths.dashboard.group.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: IProductGroupFilters) {
    return {
      search: f.search,
    };
  }

  const debouncedFilters = useDebounce<IProductGroupFilters>(filters.state);

  const { productGroups, productGroupsLoading } = useSearchProductGroups(
    mapFilters(debouncedFilters)
  );

  const addGroup = () => {
    router.push(paths.dashboard.group.add);
  }

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

          <Stack direction="row" sx={{ justifyContent: 'space-between'}} >
            <GroupsToolbar filters={filters} placeholder='Search by group name' />
            <Button size="small" onClick={addGroup} sx={{ mr: 1, verticalAlign:"middle", m:3 }} variant="outlined" startIcon={<Iconify icon='eva:plus-square-outline' />} color="primary" >
              Add Group
            </Button>
          </Stack>
          <GroupsTable productGroupsLoading={productGroupsLoading} isLoading={productGroupsLoading} productGroups={productGroups} />
          {/* <Stack sx={{ maxWidth: 200, m: 3 }}><Button onClick={addGroup} variant="contained" color="warning">Add Group</Button></Stack> */}
        </Card>
      </DashboardContent>
  );
}
