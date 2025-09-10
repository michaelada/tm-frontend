import { Stack, InputAdornment, TextField, MenuItem, Button, Box, Icon } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type OrderTableToolbarProps = {
  isFiltered: boolean,
  filterName: string,
  onFilterName: Function,
  onResetFilter: Function,
};

export default function OrderTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilter
}: OrderTableToolbarProps) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2, py: 0.5 }}
    >

      <TextField
        size="small"
        value={filterName}
        onChange={(event) => onFilterName(event)}
        placeholder="Search orders ..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          onClick={() => onResetFilter()}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
