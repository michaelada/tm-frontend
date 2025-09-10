import type { AlertColor} from '@mui/material';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';
import { validateQuantity } from 'src/utils/helper';

import Notify from 'src/components/notify';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

import { useCartContext } from '../cart/context';
import ProductQuantity from './components/quantity';
import { useBoolean } from '../../hooks/use-boolean';
import { useGetProductPrice } from '../../actions/product';

import type { IProduct } from '../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

export function ProductCard({ product }: Props) {
  const { id, name } = product;
  const [notify, setNotify] = useState("");
  const [alert, setAlert] = useState<AlertColor>("success");

  const linkTo = paths.product.details(`${id}`);

  const { price, priceLoading } = useGetProductPrice(`${id}`);

  const defaultValues = {
    id,
    name,
    quantity: product.minQuantity ?? 1,
  };

  const methods = useForm({ defaultValues });

  const { watch, setValue } = methods;

  const values = watch();

  const getDefaultImage = () => {
    if (product.product_images?.length) {
      return (
        product.product_images.find((i) => i.isDefault)?.image ?? product.product_images[0].image
      );
    }
    return '/assets/icons/empty/ic-folder-empty.svg';
  };

  const cart = useCartContext()

  const isAddingToCart = useBoolean();
  const handleAddCart = async () => {
    isAddingToCart.setValue(true);
    try {
      cart.onAddToCart({ product, quantity: values.quantity, price })
    } catch (error) {
      console.log(error);
    } finally {
      isAddingToCart.setValue(false);
      addedToCart()
    }
  }

  const addedToCart = () => {
    setAlert("success");
    setNotify(`Added ${product.name} to cart`);
  }

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      <Image alt={name} src={getDefaultImage()} ratio="1/1" sx={{ borderRadius: 1.5 }} />
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }} alignItems="center" >


      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" align='center'>
        {name}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={2} justifyContent="space-between" sx={{ typography: 'subtitle1' }} alignItems="center" >
          <Box component="span">{priceLoading ? <CircularProgress /> : fCurrency(price)}</Box>

          <Stack direction="column" spacing={1} >
            <ProductQuantity quantity={values.quantity} updateQuantity={(newValue: number) => setValue('quantity', newValue)} minQuantity={product.minQuantity} groupOfQuantity={product.groupOfQuantity} />
            
            <LoadingButton
              color="primary"
              size="small"
              type="submit"
              variant="contained"
              loading={isAddingToCart.value}
              loadingIndicator="Adding to cart..."
              onClick={handleAddCart}
              startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
              disabled={validateQuantity(values.quantity, product.minQuantity||1, product.groupOfQuantity||1) !==""}            
              sx={{whiteSpace: 'nowrap'}}
            >
              Add To Cart
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ '&:hover .add-cart-btn': { opacity: 1 } }}>
      {renderImg}

      {renderContent}

      <Notify notification={notify} open={notify !== ''} onClose={() => setNotify('')} alert={alert} />
    </Card>
  );
}
