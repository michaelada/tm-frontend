import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Link, Button, ListItemText } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { useRouter } from '../../../../routes/hooks';
import { adminpaths as paths } from '../../../../routes/adminpaths';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TablePaginationCustom,
} from '../../../../components/table';

import type { IProduct } from '../../../../utils/types';

type ProductTableProps = {
  products: IProduct[];
  productsLoading: boolean;
  isLoading: boolean;
  assigned: boolean;
};

export function ProductTable({
  products,
  productsLoading,
  isLoading,
  assigned
}: ProductTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !products.length && !productsLoading;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              {assigned && <TableCell >Group</TableCell>}
              <TableCell align="center">New In</TableCell>
              <TableCell align="center">In Stock</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {products
              .slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <ProductTableRow key={row.id} row={row} dense={table.dense} assigned={assigned} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, products.length)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={products.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type ProductTableRowProps = {
  row: IProduct;
  dense?: boolean;
  assigned: boolean;
};

function ProductTableRow({ row, dense, assigned }: ProductTableRowProps) {
  const router = useRouter();

  const openProductDetail = () => {
    if(assigned) {
      router.push(paths.dashboard.product.details(`${row.id}`));
    } else {
      router.push(paths.dashboard.unassignedproduct.details(`${row.id}`));
    }
  };

  return (
    <TableRow hover sx={{ height: dense ? 56 : 56 + 20 }}>
      <TableCell>
        <ListItemText
          primary={
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={openProductDetail}
            >
              {row.name}
            </Link>
          }
          secondary={`SKU: ${row.sku}`}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
        />
      </TableCell>
      {assigned && <TableCell>{row.group}</TableCell>}
      <TableCell align="center">{row.newIn ? "Yes" : "No" }</TableCell>
      <TableCell align="center">{row.inStock ? "Yes" : "No" }</TableCell>
      <TableCell align="right">{row.status} </TableCell>
      <TableCell onClick={openProductDetail}> <Button variant="outlined" startIcon={<Iconify icon='eva:edit-2-outline' />}  color="primary" >
            Edit
          </Button>
      </TableCell>
    </TableRow>
  )

  // return (
  //   <>
  //     <Stack
  //       key={row.id}
  //       // direction="row"
  //        direction={{ xs: 'column', sm: 'row' }}         
  //        alignItems={{ xs: 'left', sm: 'center' }}
  //       // alignItems="center"
  //       sx={{
  //         p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
  //         '&:not(:last-of-type)': {
  //           borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
  //         },
  //       }}
  //     >
  //       <ListItemText
  //         primary={
  //           <Link
  //             noWrap
  //             color="inherit"
  //             variant="subtitle2"
  //             sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
  //             onClick={openProductDetail}
  //           >
  //             {row.name}
  //           </Link>
  //         }
  //         secondary={`SKU: ${row.sku}`}
  //         primaryTypographyProps={{ typography: 'body2' }}
  //         secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
  //       />

  //       <Stack direction="row" spacing={2} alignItems="center">
  //         <LoadingButton
  //           color="primary"
  //           size="small"
  //           type="submit"
  //           variant="contained"
  //           loading={false}
  //           loadingIndicator="Adding to cart..."
  //           sx={{whiteSpace: 'nowrap'}}
  //         >
  //           View
  //         </LoadingButton>
  //       </Stack>

  //     </Stack>
  //     <Notify notification={notify} open={notify !== ''} onClose={() => setNotify('')} />
  //   </>
  // );
}
