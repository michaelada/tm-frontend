import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Chip, Link, Stack, Button, ListItemText } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { useRouter } from '../../../routes/hooks';
import { adminpaths as paths } from '../../../routes/adminpaths';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TablePaginationCustom,
} from '../../../components/table';

import type { ICustomer } from '../../../utils/types';

type CustomerTableProps = {
  customers?: ICustomer[];
  customersLoading: boolean;
  isLoading: boolean;
  onStatusChange : Function;
};

export function CustomerTable({
  customers,
  customersLoading,
  isLoading,
  onStatusChange
}: CustomerTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !customers?.length && !customersLoading;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Account Code</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align='center'>Num Users</TableCell>              
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {customers?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <CustomerTableRow key={row.id} row={row} onStatusChange={onStatusChange}/>
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, customers?.length || 0)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={customers?.length || 0}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type CustomerRow = {
  row: ICustomer;
  onStatusChange: Function;
};

function CustomerTableRow({ row, onStatusChange }: CustomerRow) {
  const router = useRouter();

  const openCustomerDetail = () => {
      router.push(paths.dashboard.customer.details(`${row.id}`));
    // if(isSubCustomer) {
    // } else {
    //   router.push(paths.dashboard.Customer.children(`${row.id}`));
    // }    
  };

  return (
    <TableRow hover>
      <TableCell>
        <ListItemText
          primary={
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={openCustomerDetail}
            >
              {row.name}
            </Link>
          }
          // secondary={`SKU: ${row.sku}`}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
        />
      </TableCell>
      <TableCell>{row.isActive ? <Chip size="small" label="Active" color="success" variant="outlined" /> : <Chip size="small" label="InActive" color="error" variant="outlined" />}</TableCell>
      <TableCell>{row.accountCode}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell align='center'>{row.users?.length}</TableCell>
      <TableCell > <Stack direction="row"><Button onClick={openCustomerDetail} sx={{mr:1}} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />}  color="primary" >
            View
          </Button>
          <Button onClick={() => onStatusChange(row.id, row.isActive)} sx={{mr:1}} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />}  color={row.isActive ? "error" : "success"} >
            {row.isActive ? "Block" : "Unblock"}
          </Button></Stack>
      </TableCell>
    </TableRow>
  )
}
