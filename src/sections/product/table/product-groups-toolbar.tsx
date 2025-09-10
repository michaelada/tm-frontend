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

import type { UseSetStateReturn } from '../../../hooks/use-set-state';
import type { IBrand, ICategory, IProductGroupFilters } from '../../../utils/types';


// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductGroupFilters>;
  options: {
    categories: ICategory[];
  };
};

export function ProductGroupsToolbar({ filters, options }: Props) {
  const handleChangeCategory = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      filters.setState({ categoryId: value, subcategoryId: undefined });
    },
    [filters]    
  );

  const handleChangeSubCategory = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      filters.setState({ subcategoryId: value });
    },
    [filters]
  );  

  const renderCategory = (
    <>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="product-group-filter-category-select-label">Category</InputLabel>

        <Select
          value={filters.state.categoryId ?? ''}
          onChange={handleChangeCategory}
          input={<OutlinedInput label="Category" />}
          renderValue={(selected) => options.categories.find((c) => c.id === +selected)?.name ?? ''}
          inputProps={{ id: 'product-group-filter-category-select-label' }}
        >
          <MenuItem key={-1} value={undefined}>
            <Checkbox disableRipple size="small" checked={filters.state.categoryId === undefined} />
            All
          </MenuItem>
          {options.categories.map((option) => (
            <MenuItem key={option.id} value={`${option.id}`}>
              <Checkbox
                disableRipple
                size="small"
                checked={`${option.id}` === filters.state.categoryId}
              />
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="product-group-filter-subcategory-select-label">Sub Category</InputLabel>
        <Select
          value={filters.state.subcategoryId ?? ''}
          onChange={handleChangeSubCategory}
          input={<OutlinedInput label="Sub Category" />}
          renderValue={(selected) =>
            options.categories
              .flatMap((c) => c.children || [])
              .find((sc) => sc.id === +selected)?.name ?? ''
        }
          inputProps={{ id: 'product-group-filter-subcategory-select-label' }}
        >
          <MenuItem key={-1} value={undefined}>
            <Checkbox disableRipple size="small" checked={filters.state.subcategoryId === undefined} />
            All
          </MenuItem>
          {options.categories.find(option => `${option.id}` === filters.state.categoryId)?.children?.map((option) => (
            <MenuItem key={option.id} value={`${option.id}`}>
              <Checkbox
                disableRipple
                size="small"
                checked={`${option.id}` === filters.state.subcategoryId}
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
         {renderCategory}
        {renderSearch}
      </Stack>
    </Stack>
  );
}
