import { useState } from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { AlertColor } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import Card from '@mui/material/Card';
import { IProduct } from 'src/utils/types';
import Notify from 'src/components/notify';

import { Scrollbar } from '../../../components/scrollbar';
import { RenderFavouriteRow } from '../favourite-table-row';
import {
  emptyRows,
  TableEmptyRows,
  TablePaginationCustom,
  useTable,
} from '../../../components/table';
import { useGetFavourites } from '../../../actions/favourite';

// ----------------------------------------------------------------------

export function FavouritesListView() {
  const { productGroups, productGroupsLoading } = useGetFavourites();
  const table = useTable({ defaultRowsPerPage: 10 });
  const [notify, setNotify] = useState("");
  const [alert, setAlert] = useState<AlertColor>("success");

  const addedToCart = (product: IProduct) => {
    setAlert("success");
    setNotify(`Added ${product.name} to cart`);
  }

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Favourites
      </Typography>
      <Notify notification={notify} open={notify !== ''} onClose={() => setNotify('')} alert={alert}/>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Product</TableCell>
                <TableCell />
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productGroups
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <RenderFavouriteRow key={row.name} row={row} addedToCart={addedToCart}/>
                ))}
              <TableEmptyRows
                height={table.dense ? 34 : 34 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, productGroups.length)}
              />
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={productGroups.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
