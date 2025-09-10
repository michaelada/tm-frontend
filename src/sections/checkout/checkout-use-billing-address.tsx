import type { CardProps } from '@mui/material/Card';
import type { IDeliveryAddress } from 'src/utils/types/user.interface';

import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

import { formatAddress } from 'src/routes/utils';

// ----------------------------------------------------------------------

type Props = CardProps & {
  address: IDeliveryAddress;
  hasAlternatives: boolean;
};

export function CheckoutUseBillingAddress({ address, hasAlternatives, sx, ...other }: Props) {

  return (
    <Card {...other }>

      {hasAlternatives && <><Typography sx={{ pl: 2, my:3, color: 'text.secondary' }}>
        By default your order will be delivered to {formatAddress(address)}.
      </Typography>
      <Typography sx={{ pl: 2, my:3, color: 'text.secondary' }}>
        If you would rather select a different address then please
        click the Select Alternative Delivery Address tab above and make your selection there. 
      </Typography>
      </>}
      {!hasAlternatives && <Typography sx={{ pl: 2, my: 2, color: 'text.secondary' }}>
        Your order will be delivered to {formatAddress(address)}
      </Typography>}
    </Card>
  );
}

// ----------------------------------------------------------------------

