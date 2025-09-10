import type { IOrder, IOrderItem } from 'src/utils/types';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Link, Stack, Table, Divider, TableRow, TableBody, TableCell, TableHead, Typography, CardContent, ListItemText, TableContainer } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import Field from '../../shared/field';

// ----------------------------------------------------------------------

type Props = {
  order?: IOrder;
  error?: any;
  loading?: boolean;
};

export function OrderDetailsView({ order, error, loading }: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <LoadingScreen />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Order not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.orders.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }  
  const getSubTotal = () => order?.lineItems.reduce((a,b) => a + parseFloat(`${b.lineItemValue}`), 0) || 0;  

  const fCurrency = (total: number) => {
    total = (Math.round(total * 100) / 100);
    return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    const openProductDetail = (row: IOrderItem) => {
        router.push(paths.product.details(`${row.productId}`));
      };
  
  // const getTax = () =>  (order?.lineItems ?? []).reduce(
  //       (total: number, item) => total + (Number(getPrice(item.lineItemPrice, `${item.lineItemQty}`)) - Number(item.vatPrice) ),
  //       0
  //   );

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Orders', href: paths.orders.root },
          { name: `${order?.id}` },
        ]}
        sx={{ mb: 5 }}
      />

      <Typography variant="h4" gutterBottom sx={{ color: 'orange' }}>
        {`Order: #${order?.orderNo}`}
      </Typography>
      <Divider sx={{ mb: 1 }} color="orange" />

      <Grid container spacing={{ xs: 1, md: 3, lg: 5 }}>
        <Grid xs={12} >
          {order && (<Stack direction="row" spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "baseline",
            }}>
            <Field name="Order Date" value={fDateTime(order.orderDate)} />
            <Field name="Reference" value={order.orderReference} />
            <Field name="Taken By" value={order.orderTakenBy} />
            <Field name="Order Type" value={order.orderType} />
          </Stack>)}
        </Grid>

        <Grid xs={12} >
          {order && (<TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Product</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Net Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.lineItems.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell >
                      {row.lineItemCode}
                    </TableCell>
                    <TableCell >                      
                    <ListItemText
                      primary={
                        <Link
                          color="inherit"
                          variant="subtitle2"
                          sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                          onClick={() => openProductDetail(row)}
                        >
                          {row.lineItemDesc}
                        </Link>
                      }
                    />
                    </TableCell>
                    <TableCell align="center">{parseInt(`${row.lineItemQty}`, 10)}</TableCell>
                    <TableCell align="right">€{fCurrency(row.nettPrice)}</TableCell>
                    <TableCell align="right">€{fCurrency(row.lineItemValue)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">Subtotal:</TableCell>
                  <TableCell align="right">€{fCurrency(getSubTotal())}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">Tax:</TableCell>
                  <TableCell align="right">€{fCurrency(order.orderTax)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">Total:</TableCell>
                  <TableCell align="right">€{fCurrency(order.orderTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </Grid>

        <Grid xs={12} md={6} lg={7}>
          <Typography variant="h5" gutterBottom sx={{ color: 'orange' }}>Billing Address</Typography>
          <Card variant="outlined">
            <CardContent>
              {order?.address?.split(",").map((line, index) => (
                <Typography key={`a-${index}`} sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {line}
                </Typography>
              ))}
            </CardContent>
          </Card>

        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <Typography variant="h5" gutterBottom sx={{ color: 'orange' }}>Shipping Address</Typography>
          <Card variant="outlined">
            <CardContent>
              {order?.deliveryAddress?.split(",").map((line, index) => (
                <Typography key={`da-${index}`} sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {line}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={paths.orders.root}
        startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
        sx={{ mt: 3 }}
      >
        Back to order list
      </Button>

    </Container>
  );
}
