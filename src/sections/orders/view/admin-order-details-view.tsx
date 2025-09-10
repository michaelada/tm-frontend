import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';

import { adminpaths as paths } from 'src/routes/adminpaths';
import { RouterLink } from 'src/routes/components';

import { CardContent, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { Iconify } from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';
import { fDateTime } from 'src/utils/format-time';
import { IOrder } from 'src/utils/types';
import Field from '../../shared/field';

// ----------------------------------------------------------------------

type Props = {
  order?: IOrder;
  error?: any;
  loading?: boolean;
};

export function AdminOrderDetailsView({ order, error, loading }: Props) {
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
              href={paths.dashboard.orders}
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
  const getSubTotal = () => order?.lineItems.reduce((a, b) => a + parseFloat(`${b.lineItemValue}`), 0) || 0;

  const getPrice = (unitPrice: number, quantity: string) => (parseInt(quantity, 10) * unitPrice).toFixed(2);
  const fCurrency = (total: number) => {
    total = (Math.round(total * 100) / 100);
    return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getStatus = () => {
    const status = order?.status?.toLowerCase();
    switch (status) {
      case "draft":
        return 'Not Submitted';
      case "migrated":
        return "Submitted";
      case "reissue":
        return "Being re-submitted";
      default:
        return "????";
    }
  }

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Orders', href: paths.dashboard.orders },
          { name: `${order?.id}` },
        ]}
        sx={{ mb: 5 }}
      />

      <Stack justifyContent="space-between" direction="row"><Typography variant="h4" gutterBottom sx={{ color: 'orange' }}>
        {`Order: #${order?.orderNo}`}
      </Typography>
        <Typography >
          {`Status: ${getStatus()}`}
        </Typography>
        {order?.status !== 'Draft' && <Button
          component={RouterLink}
          size="small" color="primary" variant="outlined"
          href={paths.dashboard.order.reissue(`${order?.id}`)}
          startIcon={<Iconify width={16} icon="eva:paper-plane-outline" />}
        >
          Reissue To Sage
        </Button>}
      </Stack>
      <Divider sx={{ mb: 1 }} color="orange" />

      <Grid container spacing={{ xs: 1, md: 3, lg: 5 }}>
        <Grid xs={12} >
          {order && (<Stack direction="row" spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "baseline",
            }}>
            <Field name="Order Date" value={fDateTime(order.orderDate)} />
            <Field name="Account" value={order.accountCode} />
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
                      {row.lineItemDesc}
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
        href={paths.dashboard.orders}
        startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
        sx={{ mt: 3 }}
      >
        Back to order list
      </Button>

    </Container>
  );
}
