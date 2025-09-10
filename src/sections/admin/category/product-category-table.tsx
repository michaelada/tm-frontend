import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  emptyRows,
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
  TableSkeleton,
  useTable,
} from '../../../components/table';
import { useRouter } from '../../../routes/hooks';
import axios, { endpoints } from '../../../utils/axios';

import type { IProductCategory } from '../../../utils/types';

type ProductCategoryTableProps = {
  categorys?: IProductCategory[];
  categorysLoading: boolean;
  isLoading: boolean;
};

export function ProductCategoryTable({
  categorys,
  categorysLoading,
  isLoading,
}: ProductCategoryTableProps) {
  const navigate = useNavigate();

  const table = useTable({ defaultRowsPerPage: 10 });
    const { enqueueSnackbar } = useSnackbar();

  const notFound = !categorys?.length && !categorysLoading;

  const onCategoryDissassociate = (categoryId:string, productId:string) => {
    console.log('Removing association');
    try {
        axios.delete(endpoints.admin.category.remove(`${categoryId}`, `${productId}`)).then(response => {
            enqueueSnackbar('Association removed - refresh page', { variant: 'success'});
            navigate(0);
        }).catch(err => {
            enqueueSnackbar(`Problem removing association: ${err}`, { variant: 'error'});
        });
    } catch (e) {
        enqueueSnackbar(`Problem removing association: ${e}`, { variant: 'error'});
    }
  }

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {categorys?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <ProductCategoryTableRow key={row.id} row={row} onCategoryDissassociate={(cid:string, pid:string) => onCategoryDissassociate(cid, pid)} />
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


type ProductCategoryRow = {
  row: IProductCategory;
  onCategoryDissassociate?: Function;  
};

function ProductCategoryTableRow({ row, onCategoryDissassociate }: ProductCategoryRow) {
  const router = useRouter();

  const onRemove = (categoryId:number, productId:number) => {
    if(onCategoryDissassociate) {
      onCategoryDissassociate(categoryId, productId);
    }
  }

  return (
    <TableRow hover>
      <TableCell>        
          {row.name}
      </TableCell>
      <TableCell align="right"> 
          <Button onClick={() => onRemove(row.id, row.productId)} variant="outlined" startIcon={<Iconify icon='eva:close-outline' />}  color="warning" >
            Disassociate
          </Button>
      </TableCell>
    </TableRow>
  )
}
