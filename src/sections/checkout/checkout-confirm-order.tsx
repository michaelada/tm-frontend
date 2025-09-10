
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, Grid, Stack, TextField, CardHeader, CardContent } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { useCartContext } from '../cart/context';
import { CheckoutSummary } from './checkout-summary';

// ----------------------------------------------------------------------
type Props = {
  onConfirm: Function;
  deliveryAddress: string;
}

export function CheckoutConfirmOrder({ onConfirm, deliveryAddress}: Props) {
  const cart = useCartContext();

  return (
    <><Grid container spacing={2}>
      <Grid md={4} sm={6} xs={12}>
        <Card sx={{ m: 1 }}>
          <CardHeader title="Add Order Reference" />
          <CardContent>
            <Typography sx={{ color: 'text.secondary' }}>Optionally you can add your own reference number to this order.</Typography>
            <TextField
              fullWidth
              placeholder="Your Order Reference"
              value={cart.orderReference}
              onChange={(event) => cart.onSetOrderReference(event.target.value)}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid md={4} sm={6} xs={12}>
        <Card sx={{ m: 1 }}>
          <CardHeader title="Shipping Address" />
          <CardContent>

            {deliveryAddress?.split(",").map((line, index) => (
              <Typography key={`da-${index}`} sx={{ color: 'text.secondary', fontSize: 14 }}>
                {line}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid md={4} sm={6} xs={12} >
        <Box sx={{ m: 1 }}><CheckoutSummary total={cart.total} subtotal={cart.subtotal} tax={cart.tax} /></Box>
      </Grid>
    </Grid>
      <Stack sx={{
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
      >
        <Button
          sx={{ width: 200 }}
          color="primary"
          variant="contained"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={() => onConfirm()}
        >
          Submit Order
        </Button>
      </Stack>
    </>
  );
}
