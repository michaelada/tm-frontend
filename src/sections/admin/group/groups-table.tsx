import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Link, Button, ListItemText } from '@mui/material';

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

import type { IProductGroup } from '../../../utils/types';

type ProductTableProps = {
  productGroups: IProductGroup[];
  productGroupsLoading: boolean;
  isLoading: boolean;
};

export function GroupsTable({
  productGroups,
  productGroupsLoading,
  isLoading
}: ProductTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !productGroups.length && !productGroupsLoading;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell>
              <TableCell>Num Products</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {productGroups
              .slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <GroupTableRow key={row.id} row={row} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, productGroups.length)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={productGroups.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type GroupTableRowProps = {
  row: IProductGroup;
  dense?: boolean;
};

function GroupTableRow({ row, dense }: GroupTableRowProps) {
  const router = useRouter();

  const openGroupDetail = () => {
    router.push(paths.dashboard.group.details(`${row.id}`));
  };

  const onGroupDelete = () => {
      router.replace(paths.dashboard.group.delete(`${row.id}`));
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
              onClick={openGroupDetail}
            >
              {row.name}
            </Link>
          }
          // secondary={`SKU: ${row.sku}`}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
        />
      </TableCell>
      <TableCell>{row.numOptions}</TableCell>
      <TableCell >
        <Button onClick={openGroupDetail} sx={{mr:1}} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />}  color="primary" >
            View
          </Button>
          {row.numOptions === 0 && <Button onClick={() => onGroupDelete()} variant="outlined" startIcon={<Iconify icon='eva:trash-2-outline' />}  color="error" >
            Delete
          </Button>}
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
