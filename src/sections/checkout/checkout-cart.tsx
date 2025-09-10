import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { CheckoutSummary } from './checkout-summary';
import { CheckoutCartProductList } from './checkout-cart-product-list';
import { useCartContext } from '../cart/context';

// ----------------------------------------------------------------------
type Props = {
  onCheckout: Function;
};

export function CheckoutCart({ onCheckout } : Props) {
  const router = useRouter();
  const cart = useCartContext();
  const empty = !cart.totalItems;

  const next = () => {
    router.push("?step=1");
  }

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;(
                  {cart.totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {empty ? (
            <EmptyContent
              title="Cart is empty!"
              description="Look like you have no items in your shopping props.cart."
              imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-folder-empty.svg`}
              sx={{ pt: 5, pb: 10 }}
            />
          ) : (
            <CheckoutCartProductList
              products={cart.cart?.Cartitems ?? []}
              onDelete={cart.onDeleteCart}
              onIncreaseQuantity={cart.onIncreaseQuantity}
              onDecreaseQuantity={cart.onDecreaseQuantity}
            />
          )}
        </Card>

        <Button
          component={RouterLink}
          href={paths.product.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue shopping
        </Button>
      </Grid>

      <Grid xs={12} md={4}>
        <CheckoutSummary
          total={cart.total}
          subtotal={cart.subtotal}
          tax={cart.tax}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={empty}
          color="primary"
          onClick={() => onCheckout()}
        >
          Check out
        </Button>
      </Grid>
    </Grid>
  );
}
