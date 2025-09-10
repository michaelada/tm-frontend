import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { Button, Link, ListItemText } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';

import { useRouter } from '../../../../routes/hooks';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TablePaginationCustom,
} from '../../../../components/table';
import axios, { endpoints } from '../../../../utils/axios';

import type { IProductImage } from '../../../../utils/types';

type ProductImageTableProps = {
  images?: IProductImage[];
  imagesLoading: boolean;
  isLoading: boolean;
};

export function ProductImageTable({
  images,
  imagesLoading,
  isLoading,
}: ProductImageTableProps) {
  const navigate = useNavigate();
  const table = useTable({ defaultRowsPerPage: 10 });
    const { enqueueSnackbar } = useSnackbar();

  const notFound = !images?.length && !imagesLoading;

  const onImageRemove = (imageId:number) => {
    console.log('Removing association');
    try {
        axios.delete(endpoints.admin.product.image(`${imageId}`)).then(response => {
            enqueueSnackbar('Image removed - refresh page', { variant: 'success'});
            navigate(0);
        }).catch(err => {
            enqueueSnackbar(`Problem removing image: ${err}`, { variant: 'error'});
        });
    } catch (e) {
        enqueueSnackbar(`Problem removing image: ${e}`, { variant: 'error'});
    }
  }

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {images?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row, index) => (
                <ProductImageTableRow key={`product-image-row-${index}`} row={row} onImageRemove={(id:number) => onImageRemove(id)} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, images?.length || 0)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={images?.length || 0}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type ProductImageRowProps = {
  row: IProductImage;
  onImageRemove?: Function;  
};

function ProductImageTableRow({ row, onImageRemove }: ProductImageRowProps) {

  const onRemove = (id:string) => {
    if(onImageRemove) {
      onImageRemove(id);
    }
  }

  return (
    <TableRow hover>
      <TableCell>        
          <Image
                          key={row.image}
                          alt={row.image}
                          src={row.image}
                          ratio="1/1"
                          sx={{ cursor: 'zoom-in', maxWidth: 100 }}
                        />
      </TableCell>
      <TableCell align="right"> 
          <Button onClick={() => onRemove(`${row.id}`)} variant="outlined" startIcon={<Iconify icon='eva:close-outline' />}  color="warning" >
            Remove
          </Button>
      </TableCell>
    </TableRow>
  )
}
