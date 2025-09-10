import { useForm } from 'react-hook-form';

import Link from '@mui/material/Link';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Chip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { fDateTime } from 'src/utils/format-time';

import { adminpaths as paths } from '../../routes/adminpaths';
import { useRouter } from '../../routes/hooks';
import { Iconify } from '../../components/iconify';

import type { IOrder } from '../../utils/types';

type OrderRowProps = {
  row: IOrder;
};

export function AdminOrderRow({ row }: OrderRowProps) {
  const router = useRouter();

  const openOrderDetail = () => {
    router.push(paths.dashboard.order.details(`${row.id}`));
  };

  const defaultValues = row;

  const methods = useForm({ defaultValues });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

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
        {row.status}
      </TableCell>
      <TableCell>
        {row.accountCode}
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
