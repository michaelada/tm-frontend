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

import type { IProductFilters } from '../../../../utils/types';
import type { UseSetStateReturn } from '../../../../hooks/use-set-state';


const statii =  ['Active', 'Inactive'];
const newin = [{ id: '0', name: 'All' }, { id: '1', name: 'New In' }];
const instock = [{ id: '1', name: 'In Stock'} , { id: '0', name: 'Out Of Stock' }];

// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductFilters>;
};

export function ProductToolbar({ filters }: Props) {
  const handleChangeStatus = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      filters.setState({ status: value });
    },
    [filters]
  );

  const handleChangeNewIn = useCallback(
    (event: SelectChangeEvent) => {
      console.log(event.target.value);
      const {
        target: { value },
      } = event;
      filters.setState({ newin: value });
    },
    [filters]
  );

  const handleChangeInStock = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      filters.setState({ instock: value });
    },
    [filters]
  );

  const renderSelects = (
    <>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="product-filter-status-select-label">Status</InputLabel>

        <Select
          value={filters.state.status ?? 'Active'}
          onChange={handleChangeStatus}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => statii.find((c) => c.toLowerCase() === selected.toLowerCase()) ?? ''}
          inputProps={{ id: 'product-filter-status-select-label' }}
        >
          {statii.map((option) => (
            <MenuItem key={option} value={`${option}`}>
              <Checkbox
                disableRipple
                size="small"
                checked={`${option}` === filters.state.status}
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="product-filter-newin-select-label">New In</InputLabel>

        <Select
          value={filters.state.newin ?? '0'}
          onChange={handleChangeNewIn}
          input={<OutlinedInput label="New In" />}
          renderValue={(selected) => newin.find((c) => c.name.toLowerCase() === selected.toLowerCase())?.name ?? ''}
          inputProps={{ id: 'product-filter-newin-select-label' }}
        >
          {newin.map((option) => (
            <MenuItem key={option.id} value={`${option.name}`}>
              <Checkbox
                disableRipple
                size="small"
                checked={option.name === filters.state.newin}
              />
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="product-filter-instock-select-label">In Stock</InputLabel>

        <Select
          value={filters.state.instock ?? '1'}
          onChange={handleChangeInStock}
          input={<OutlinedInput label="In Stock" />}
          renderValue={(selected) => instock.find((c) => c.name.toLowerCase() === selected.toLowerCase())?.name ?? ''}
          inputProps={{ id: 'product-filter-instock-select-label' }}
        >
          {instock.map((option) => (
            <MenuItem key={option.id} value={`${option.name}`}>
              <Checkbox
                disableRipple
                size="small"
                checked={option.name === filters.state.instock}
              />
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>      
    </>
  );

  const renderSearch = (
    <TextField
      fullWidth
      value={filters.state.search}
      onChange={(newValue) => {
        filters.setState({ search: newValue.target.value });
      }}
      placeholder="Search product name or SKU"
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
        {renderSelects}
        {renderSearch}
      </Stack>
    </Stack>
  );
}
