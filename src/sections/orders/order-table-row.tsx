
import Link from '@mui/material/Link';
import { Chip, Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { Iconify } from '../../components/iconify';

import type { IOrder } from '../../utils/types';

type OrderRowProps = {
  row: IOrder;
};

export function OrderRow({ row }: OrderRowProps) {
  const router = useRouter();

  const openOrderDetail = () => {
    router.push(paths.orders.details(row.id));
  };

  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        <ListItemText
          primary={
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={openOrderDetail}
            >
              {row.orderNo}
            </Link>
          }
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
        />
      </TableCell>
      <TableCell>
        {row.branchName}
      </TableCell>
      <TableCell>
        <Chip label={row.orderType} color={row.orderType === 'Offline' ? "warning" : "error"} size="small" variant="outlined"/>
      </TableCell>
      <TableCell>
        {fDateTime(row.orderDate)}
      </TableCell>
      <TableCell>
        {row.orderReference}
      </TableCell>
      <TableCell  align="center">
        {row.numItems}
      </TableCell>
      <TableCell  align="right">
        {row.orderTax}
      </TableCell>
      <TableCell  align="right">
        {row.orderTotal}
      </TableCell>
      <TableCell align="right"  onClick={openOrderDetail}>
          <Button variant="contained" startIcon={<Iconify icon='eva:eye-outline' />}  color="primary" >
            View
          </Button>
      </TableCell>
    </TableRow>
  );
}
