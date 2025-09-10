import type { StackProps } from '@mui/material/Stack';

import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  name?: string;
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  updateQuantity: (newQuantity:number) => void;
  validateQuantity: () => boolean;
};

export const IncrementerButtonV2 = forwardRef<HTMLDivElement, Props>(
  ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, updateQuantity, validateQuantity, sx, ...other }, ref) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 128,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      <TextField
        hiddenLabel
        defaultValue="Small"
        variant="filled"
        size="small"
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        value={quantity}
        onChange={(event) => updateQuantity(parseInt(event.target.value, 10))}
        onBlur={() => validateQuantity()}
      />

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="mingcute:add-line" width={16} />
      </IconButton>
    </Stack>
  )
);
