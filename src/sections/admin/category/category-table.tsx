
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

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

import type { ICategory } from '../../../utils/types';

type CategoryTableProps = {
  categorys?: ICategory[];
  categorysLoading: boolean;
  isLoading: boolean;
  isSubcategory: boolean;
  readonly?: boolean;
  onAssociate?: (categoryId: string) => void;
};

export function CategoryTable({
  categorys,
  categorysLoading,
  isLoading,
  isSubcategory,
  readonly,
  onAssociate
}: CategoryTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !categorys?.length && !categorysLoading;


  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {categorys?.slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
              .map((row, index) => (
                <CategoryTableRow key={row.id} row={row} isSubcategory={isSubcategory} onAssociate={onAssociate} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, categorys?.length || 0)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={categorys?.length || 0}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type CategoryRow = {
  row: ICategory;
  isSubcategory?: boolean;
  readonly?: boolean;
  onAssociate?: (categoryId: string) => void;
};

function CategoryTableRow({ row, isSubcategory, readonly, onAssociate }: CategoryRow) {
  const router = useRouter();

  const openCategoryDetail = () => {
    if (isSubcategory) {
      router.push(paths.dashboard.category.details(`${row.id}`));
    } else {
      router.push(paths.dashboard.category.children(`${row.id}`));
    }
  };

  const onRename = (id: string) => {
    router.push(paths.dashboard.category.rename(`${id}`));
  };

  const onCategoryDelete = () => {
    if (isSubcategory) {
      router.push(paths.dashboard.category.delete(`${row.id}`));
    }
  };

  return (
    <TableRow hover>
      <TableCell>       
        {row.name}
      </TableCell>
      <TableCell align="right">
        {!isSubcategory && <Button onClick={openCategoryDetail} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />} color="primary" >
          View
        </Button>}
        {isSubcategory && <Button onClick={onCategoryDelete} variant="outlined" sx={{ mr: 1 }}  startIcon={<Iconify icon='eva:trash-2-outline' />} color="error" >
          Delete
        </Button>}
        {onAssociate && <Button onClick={() => onAssociate(`${row.id}`)} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:link-outline' />} color="primary" >
          Associate
        </Button>}
        {onRename && <Button onClick={() => onRename(`${row.id}`)} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:edit-outline' />} color="primary" >
          Rename
        </Button>}

      </TableCell>
    </TableRow>
  )
}
