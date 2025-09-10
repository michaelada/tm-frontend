import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { useSearchCustomer } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomerTable } from './customer-table';
import { CustomerToolbar } from './customer-toolbar';
import axios, { endpoints } from '../../../utils/axios';
import { useDebounce } from '../../../hooks/use-debounce';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { ICustomerFilters } from '../../../utils/types';
// import { CategoryToolbar } from './category-toolbar';
// import { CustomerTable } from './customer-table';

// ----------------------------------------------------------------------

export function CustomerListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const filters = useSetState<ICustomerFilters>({
    search: searchParams.get('search') ?? undefined,
  });


  useEffect(() => {
    console.log(filters.state);
    const { search = '' } = filters.state;
    const queryParams = new URLSearchParams({ search });
    router.replace(`${paths.dashboard.customer.root}?${queryParams}`);

  }, [filters.state, router]);

  function mapFilters(f: ICustomerFilters) {
    return {
      search: f.search,
    };
  }

  const debouncedFilters = useDebounce<ICustomerFilters>(filters.state);

  const { customers, customersLoading } = useSearchCustomer(
    mapFilters(debouncedFilters)
  );


  const onStatusChange = (id: string, status: boolean) => {
    try {
      axios.post(endpoints.admin.customer.details(id), { isActive: !status }).then(response => {
        if (response.data.error) {
          enqueueSnackbar(`Problem updating product - ${response.data.message}`);
          return;
        }
        enqueueSnackbar('Customer status changed', { variant: 'success' });
        navigate(0);
      }).catch(err => {
        enqueueSnackbar(`Problem updating product: ${err}`, { variant: 'error' });
      });
    } catch (e) {
      enqueueSnackbar(`Problem updating product - ${e}`);
    }
  }

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Customers
        </Typography>

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            // height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <CustomerToolbar filters={filters} />
          <CustomerTable customersLoading={customersLoading} isLoading={customersLoading} customers={customers} onStatusChange={onStatusChange} />
        </Card>
      </DashboardContent>
  );
}
