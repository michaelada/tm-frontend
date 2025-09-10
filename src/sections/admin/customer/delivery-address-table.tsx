import type { IDeliveryAddress } from 'src/utils/types';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { Scrollbar } from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TablePaginationCustom,
} from '../../../components/table';


type DeliveryAddressTableProps = {
  addresses?: IDeliveryAddress[];
  isLoading?: boolean;
};

export function DeliveryAddressTable({
  addresses,
  isLoading
}: DeliveryAddressTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !addresses?.length;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {addresses?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <AddressTableRow key={`address-${index}`} row={row} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, addresses?.length || 0)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={addresses?.length || 0}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type AddressTableRowProps = {
  row: IDeliveryAddress;
};

function AddressTableRow({ row }: AddressTableRowProps) {

  return (
    <TableRow hover>
      <TableCell>{row.address}</TableCell>
    </TableRow>
  )
}
