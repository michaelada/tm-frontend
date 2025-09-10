import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import type { ICheckoutDeliveryOption } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  options: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;  
  selectedValue: number;
};

export function CheckoutSelectDeliveryAddress({ options, onApplyShipping, selectedValue, sx, ...other }: Props) {
 
  const onClick = (option: { value: number; }) => {
    if(selectedValue === option.value) { 
      onApplyShipping(-1);
    } else {
      onApplyShipping(option.value)
    }
  }

  return (
    <Card {...other}>
      
          <Typography sx={{pl:2, pt:2, color: 'text.secondary'}}>
            Please select the delivery address from the list below, and click continue.
          </Typography>           
          <Box
            columnGap={2}
            rowGap={2.5}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(4, 1fr)' }}
            sx={{ p: 3 }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.label}
                option={option}
                selected={selectedValue === option.value}
                onClick={() => {
                  onClick(option) ;
                }}
              />
            ))}
          </Box>        
        </Card>
          );
}

// ----------------------------------------------------------------------

type OptionItemProps = BoxProps & {
  selected: boolean;
  option: ICheckoutDeliveryOption;
};

function OptionItem({ option, selected, sx, ...other }: OptionItemProps) {
  return (
    <Box
      display="flex"
      sx={{
        p: 1,
        gap: 2,
        cursor: 'pointer',
        borderRadius: 1.5,
        border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
        transition: (theme) =>
          theme.transitions.create(['box-shadow'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px orange`,
          borderColor: 'orange',
          color: 'orange'
        }),
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={28}
        icon='carbon:delivery'
      />

      <Box flex="1 1 auto">
        <Box display="flex" alignItems="center" sx={{ typography: 'h6' }}>
          <Box component="span" flexGrow={1} sx={{ typography: 'subtitle1', fontSize: 12 }}>
            {option.label}
          </Box>
          {selected && <Iconify icon='eva:checkmark-outline' />}
        </Box>
      </Box>
    </Box>
  );
}
