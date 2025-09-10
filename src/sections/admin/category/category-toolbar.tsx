import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import { Iconify } from 'src/components/iconify';
import { IProductFilters } from 'src/utils/types';
import { UseSetStateReturn } from 'src/hooks/use-set-state';

// import type { UseSetStateReturn } from '../../../../hooks/use-set-state';
// import type { IProductFilters } from '../../../../utils/types';


const statii =  ['Active', 'Inactive'];
const newin = [{ id: '0', name: 'All' }, { id: '1', name: 'New In' }];
const instock = [{ id: '1', name: 'In Stock'} , { id: '0', name: 'Out Of Stock' }];

// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductFilters>;
  // options: {
  //   status: string;
  //   newin: string;
  //   instock: string;
  //   search: string;
  // };
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
