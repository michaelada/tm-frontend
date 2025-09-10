
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import type { UseSetStateReturn } from '../../../hooks/use-set-state';
import type { ICategory, IProductGroupFilters } from '../../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductGroupFilters>;
  placeholder?: string;
  options?: {
    categories: ICategory[];
  };
};

export function GroupsToolbar({ filters, options, placeholder }: Props) {
  const renderSearch = (
    <TextField
      value={filters.state.search}
      onChange={(newValue) => {
        filters.setState({ search: newValue.target.value });
      }}
      placeholder={placeholder || "Search product name or SKU"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
      sx={{minWidth: 400}}
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
