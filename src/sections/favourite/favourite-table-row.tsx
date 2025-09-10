import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';

import { validateQuantity } from 'src/utils/helper';

import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { useCartContext } from '../cart/context';
import { Iconify } from '../../components/iconify';
import { useBoolean } from '../../hooks/use-boolean';
import axios, { endpoints } from '../../utils/axios';
import { fCurrency } from '../../utils/format-number';
import { useGetProductPrice } from '../../actions/product';
import ProductQuantity from '../product/components/quantity';

import type { IProduct } from '../../utils/types';

type FavouriteTableRowProps = {
  row: IProduct;
  addedToCart: Function;
};

export function RenderFavouriteRow({ row, addedToCart }: FavouriteTableRowProps) {
  const favourited = useBoolean(true);
  // const [notify, setNotify] = useState("");
  
  const onToggleFavourite = useCallback(async () => {
    const res = await axios.delete(endpoints.favourite.remove(`${row.id}`));
    if (res.status === 200) {
      favourited.onToggle();
      // console.log(removeFavourite);
    }
  }, [favourited, row.id]);

  const router = useRouter();
  const { price, priceLoading } = useGetProductPrice(`${row.id}`);

  const openProductDetail = () => {
    router.push(paths.product.details(`${row.id}`));
  };

  const defaultValues = {
    id: row.id,
    quantity: row.minQuantity ?? 1,
  };

  const getDefaultImage = () => {
    if (row.product_images?.length) {
      return row.product_images.find((i) => i.isDefault)?.image ?? row.product_images[0].image;
    }
    return '';
  };

  const methods = useForm({ defaultValues });

  const { watch, setValue } = methods;

  const values = watch();

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
      addedToCart(row);
    }
  };

  return (
    <TableRow key={row.name}>
      <TableCell>
        <IconButton
          size="small"
          color={favourited.value ? 'warning' : 'default'}
          onClick={onToggleFavourite}        

        >
          <Iconify icon={favourited.value ? 'eva:star-fill' : 'eva:star-outline'} />
        </IconButton>
      </TableCell>
      <TableCell>
        <Avatar
          alt={row.name}
          src={getDefaultImage()}
          variant="rounded"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
      </TableCell>
      <TableCell component="th" scope="row">
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
      <TableCell align="right">
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
            disabled={validateQuantity(values.quantity, row.minQuantity||1, row.groupOfQuantity||1) !==""}
            sx={{whiteSpace: 'nowrap'}}
          >
            Add To Cart
          </LoadingButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
