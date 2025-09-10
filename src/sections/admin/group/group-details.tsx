import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CardContent, Divider, Link, ListItemText, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form';
import { Image } from 'src/components/image';
import { Scrollbar } from 'src/components/scrollbar';
import { ProductGroupSkeleton } from 'src/sections/product/product-skeleton';


import { adminpaths as paths } from 'src/routes/adminpaths';
import { RouterLink } from 'src/routes/components';

import { LoadingButton } from '@mui/lab';
import { EmptyContent } from 'src/components/empty-content';
import { Iconify } from 'src/components/iconify';
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
import { IProduct, IProductGroup } from '../../../utils/types';
import TmTextField from '../shared/form/tm-textfield';

// ----------------------------------------------------------------------

type Props = {
  productGroup: IProductGroup;
  error: string;
  loading?: boolean;
};

export function GroupDetails({ productGroup, error, loading }: Props) {
  const [err, setErr] = useState('');
  const [dirty, setDirty] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const router = useRouter();


  const table = useTable({ defaultRowsPerPage: 10 });
  const methods = useForm({ defaultValues: productGroup });
  const { reset, watch, control, setValue, handleSubmit, formState } = methods;

  const notFound = !productGroup && !loading;
  const values = watch();


  const getUpdates = () => ({
    name: values.name,
  });

  const validate = () => {
    if (!values.name) {
      return 'Product group name cannot be blank';
    }
    return '';
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log("Handle Submit");
    setErr('');
    try {
      const isValid = validate();
      if (isValid !== '') {
        setErr(isValid);
        return;
      }
      axios.post(endpoints.admin.group.details(`${productGroup.id}`), getUpdates()).then(response => {
        enqueueSnackbar('Product details updated', { variant: 'success' });
        navigate(0);
      }).catch(e => {
        setErr(`Problem updating product: ${e}`);
      });
    } catch (e) {
      setErr(`Problem updating product - ${e}`);
    }
  });

  const onChangeImage = () => {
    console.log("change image");
    router.push(paths.dashboard.group.addimage(`${productGroup?.id}`));

  }

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <ProductGroupSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Product Group not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.group.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }
  return (

    <Card>
      <CardContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <TmTextField label="Product Name" name="name" helperText="The name of the product group as it will be displayed on the main website" />
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="space-between" >
            <Stack direction="row" sx={{ minWidth: 200 }}><Typography component="span" sx={{ color: 'text.secondary', mr: 1, fontSize: 12, fontWeight: 'bold', ml: 1, minWidth: 100 }} >Group Image</Typography>
              <Image
                key={productGroup.image}
                alt={productGroup.image}
                src={productGroup.image}
                ratio="1/1"
                sx={{ cursor: 'zoom-in', maxWidth: 200 }}
              /></Stack>
            <Button onClick={() => onChangeImage()} variant="outlined" startIcon={<Iconify icon='eva:edit-2-outline' />} color="warning" sx={{ maxHeight: 32 }} >
              Change Image
            </Button>
          </Stack>
          {(dirty || formState.isDirty) && <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ m: 3 }}>
            <LoadingButton color="warning" variant="contained" type="submit" loading={formState.isSubmitting}>
              Save Changes
            </LoadingButton>
            <Button color="warning" variant="outlined" onClick={() => reset()}>Cancel</Button>
          </Stack>}
          <Divider sx={{ my: 2 }} />
        </Form>


        {/* 
          <Typography gutterBottom component="div" sx={{ mt: 3, ml: 1 }}>
            Linked Products:
          </Typography> */}

        {!dirty && !formState.isDirty && <Scrollbar>
          <Table sx={{ minWidth: 800 }} size="small" >
            <TableHead>
              <TableRow>
                <TableCell>Linked Products</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && <TableSkeleton />}

              {productGroup.products?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
                .map((row, index) => (
                  <ProductTableRow key={row.id} row={row} />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, productGroup.products?.length || 0)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>}

        {!dirty && !formState.isDirty && <TablePaginationCustom
          page={table.page}
          count={productGroup.products?.length || 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />}
      </CardContent>
    </Card>

  );
}

type ProductTableRowProps = {
  row?: IProduct;
};

function ProductTableRow({ row }: ProductTableRowProps) {
  const router = useRouter();

  const openProductDetail = () => {
    router.push(paths.dashboard.product.details(`${row?.id}`));
  };

  const onProductRemove = () => {
    // call server to remove group association

    router.push(paths.dashboard.product.remove(`${row?.id}`));
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
              onClick={openProductDetail}
            >
              {row?.name}
            </Link>
          }
          // secondary={`SKU: ${row.sku}`}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
        />
      </TableCell>
      <TableCell>{row?.sku}</TableCell>
      <TableCell > <Button onClick={onProductRemove} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:file-remove-outline' />} color="primary" >
        Disassociate
      </Button>
      </TableCell>
    </TableRow>
  )
}
