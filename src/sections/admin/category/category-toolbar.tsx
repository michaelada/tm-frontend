
import type { IProductFilters } from 'src/utils/types';
import type { UseSetStateReturn } from 'src/hooks/use-set-state';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// import type { UseSetStateReturn } from '../../../../hooks/use-set-state';
// import type { IProductFilters } from '../../../../utils/types';


// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductFilters>;
};

export function CategoryToolbar({ filters }: Props) {

  const renderSearch = (
    <TextField
      fullWidth
      value={filters.state.search}
      onChange={(newValue) => {
        filters.setState({ search: newValue.target.value });
      }}
      placeholder="Search by category name"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        {renderSearch}
      </Stack>
    </Stack>
  );
}
