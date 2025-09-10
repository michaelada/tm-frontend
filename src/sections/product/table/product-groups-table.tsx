import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, CircularProgress } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { validateQuantity } from 'src/utils/helper';

import Notify from 'src/components/notify';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { paths } from '../../../routes/paths';
import { useRouter } from '../../../routes/hooks';
import { useCartContext } from '../../cart/context';
import ProductQuantity from '../components/quantity';
import axios, { endpoints } from '../../../utils/axios';
import { fCurrency } from '../../../utils/format-number';
import { useGetProductGroup, useGetProductPrice } from '../../../actions/product';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TablePaginationCustom,
} from '../../../components/table';

import type { IProduct, IProductGroup } from '../../../utils/types';

type CollapsibleProductGroupTableProps = {
  productGroups: IProductGroup[];
  productGroupsLoading: boolean;
  isLoading: boolean;
};

export function CollapsibleProductGroupTable({
  productGroups,
  productGroupsLoading,
  isLoading,
}: CollapsibleProductGroupTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !productGroups.length && !productGroupsLoading;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Group</TableCell>
              <TableCell />
              {/* <TableCell align="right">Brand</TableCell> */}
              <TableCell sx={{ pr: 3 }} align="right">Options</TableCell>
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
                <ProductGroupTableRow initialState={index === 0} key={row.id} row={row} dense={table.dense} />
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

// ----------------------------------------------------------------------
const DEFAULT_COUNT = 10;

type ProductGroupTableRowProps = {
  row: IProductGroup;
  dense?: boolean;
  initialState?: boolean
};

function ProductGroupTableRow({ row, dense, initialState }: ProductGroupTableRowProps) {
  const collapsible = useBoolean(initialState);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const { productGroup } = useGetProductGroup(
    collapsible.value ? `${row.id}` : ''
  );

  const hasMore = () => productGroup && productGroup.products && productGroup.products.length > count;

  const displayRows = () => {
    console.log("displayRows");
    return productGroup?.products?.slice(0, count);
  }

  const getImage = () => {
    if(row.image) {
      return row.image;
    }
    return '/logo/no_image_available.png';

  }

  const renderPrimary = (
    <TableRow hover onClick={collapsible.onToggle} sx={{ height: dense ? 56 : 56 + 20, m: 0, p: 0 }}>
      <TableCell padding="checkbox" sx={{ p: 0 }}>
        <IconButton size="small" color={collapsible.value ? 'inherit' : 'default'}>
          <Iconify
            icon={collapsible.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </IconButton>
      </TableCell>

      <TableCell component="th" scope="row" sx={{ p: 0 }}>
        <Avatar
          alt={row.name}
          src={getImage()}
          variant="rounded"
          sx={{ width: 124, height: 124, mr: 2, my:2, p: 0 }}
        />
      </TableCell>
      <TableCell sx={{ p: 0 }}>{row.name}</TableCell>
      {/* <TableCell align="right"  sx={{p:0}}>{row.brand?.name}</TableCell> */}
      <TableCell align="right" sx={{ p: 0, pr: 3 }}>{row.numOptions} Options</TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapsible.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {displayRows()?.map((product) => (
              <ProductTableRow key={product.id} row={product} />
            ))}
            {hasMore() && <Box sx={{mx:15, my:1, pb:2}} alignItems="center">
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={() => { setCount(count + DEFAULT_COUNT) }}
                startIcon={<Iconify icon="eva:arrowhead-down-outline" />}
              >
                Click to see More Products in Group {`(Showing ${count} of ${productGroup?.products?.length})`}
              </Button>
            </Box>}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      {renderSecondary}
    </>
  );
}

type ProductTableRowProps = {
  row: IProduct;
};

function ProductTableRow({ row }: ProductTableRowProps) {
  const { price, priceLoading } = useGetProductPrice(`${row.id}`);
  const favourited = useBoolean(row.isFavourite ?? false);
  const [notify, setNotify] = useState("");


  const onToggleFavourite = useCallback(async () => {
    let res = null;
    if (row.isFavourite) {
      res = await axios.delete(endpoints.favourite.remove(`${row.id}`));
    } else {
      res = await axios.post(endpoints.favourite.add, { productid: row.id });
    }
    if (res.status === 200) {
      favourited.onToggle();
    }
  }, [favourited, row.id, row.isFavourite]);

  const router = useRouter();

  const defaultValues = {
    id: row.id,
    quantity: row.minQuantity ?? 1,
  };

  const getDefaultImage = () => {
    if (row.product_images?.length) {
      return row.product_images.find((i) => i.isDefault)?.image ?? row.product_images[0].image;
    }
    return '/logo/no_image_available.png';
  };

  const methods = useForm({ defaultValues });

  const { watch, setValue } = methods;

  const values = watch();

  const openProductDetail = () => {
    router.push(paths.product.details(`${row.id}`));
  };

  const cart = useCartContext();

  const isAddingToCart = useBoolean();
  const handleAddCart = async () => {
    isAddingToCart.setValue(true);
    try {
      cart.onAddToCart({ product: row, quantity: values.quantity, price });
    } catch (error) {
      console.log(error);
    } finally {
      isAddingToCart.setValue(false);
      addedToCart();
    }
  };

  const addedToCart = () => {
    setNotify(`Added ${row.name} to cart`);
  }



  return (
    <>
      <Stack
        key={row.id}
        // direction="row"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'left', sm: 'center' }}
        // alignItems="center"
        sx={{
          p: (theme) => theme.spacing(0.5, 0.5, 0.5, 0.5),
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
          },
        }}
      >
        <IconButton
          size="small"
          color={favourited.value ? 'warning' : 'default'}
          onClick={onToggleFavourite}
        >
          <Iconify icon={favourited.value ? 'eva:star-fill' : 'eva:star-outline'} />
        </IconButton>
        <Avatar
          alt={row.name}
          src={getDefaultImage()}
          variant="rounded"
          sx={{ width: 124, height: 124, my:2, mr: 2 }}
        />

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

        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: 110, textAlign: 'right' }}>
            {priceLoading ? <CircularProgress /> : fCurrency(price)}
          </Box>
          <ProductQuantity quantity={values.quantity} updateQuantity={(newValue: number) => setValue('quantity', newValue)} minQuantity={row.minQuantity} groupOfQuantity={row.groupOfQuantity} />
          <LoadingButton
            color="primary"
            size="small"
            type="submit"
            variant="contained"
            loading={isAddingToCart.value}
            loadingIndicator="Adding to cart..."
            onClick={handleAddCart}
            disabled={validateQuantity(values.quantity, row.minQuantity || 1, row.groupOfQuantity || 1) !== ""}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add To Cart
          </LoadingButton>
        </Stack>

      </Stack>
      <Notify notification={notify} open={notify !== ''} onClose={() => setNotify('')} />
    </>
  );
}
