import type { ICheckoutItem } from 'src/types/checkout';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Chip, CircularProgress } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import Notify from 'src/components/notify';
import { Label } from 'src/components/label';
import { Form } from 'src/components/hook-form';

import { useCartContext } from '../cart/context';
import { Iconify } from '../../components/iconify';
import ProductQuantity from './components/quantity';
import { useBoolean } from '../../hooks/use-boolean';
import axios, { endpoints } from '../../utils/axios';
import { useGetProductPrice } from '../../actions/product';

import type { IProduct } from '../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  items?: ICheckoutItem[];
  product: IProduct;
  disableActions?: boolean;
  onAddCart?: (product: IProduct) => void;
};

export function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  disableActions,
  ...other
}: Props) {
  const [notify, setNotify] = useState("");

  const { id, name, description } = product;

  const defaultValues = {
    id,
    name,
    quantity: product.minQuantity ?? 1,
  };

  const methods = useForm({ defaultValues });

  const { reset, watch, setValue } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const cart = useCartContext();

  const { price, priceLoading } = useGetProductPrice(`${product.id}`);

  const favourited = useBoolean(product?.isFavourite ?? false);

  const onToggleFavourite = useCallback(async () => {
    let res = null;
    if(favourited.value) {
      res = await axios.delete(endpoints.favourite.remove(`${product.id}`));
    } else {
        res = await axios.post(endpoints.favourite.add, { productid: product.id });
    }
    if (res.status === 200) {
      favourited.onToggle();
    }
  }, [favourited, product.id]);

  const isAddingToCart = useBoolean();
  const handleAddCart = async () => {
    isAddingToCart.setValue(true);
    try {
      cart.onAddToCart({ product, quantity: values.quantity, price });
    } catch (error) {
      console.log(error);
    } finally {
      isAddingToCart.setValue(false);
      addedToCart();

    }

    };

    const addedToCart = () => {
    setNotify(`Added ${product.name} to cart`);
  }




  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      <Typography sx={{fontWeight: '500', mb:3}}>Your Price:&nbsp; {priceLoading ? <CircularProgress /> : fCurrency(price)}</Typography>
      <Typography sx={{fontWeight: '500'}}>RRP:&nbsp; {fCurrency(product.regularPrice)}</Typography>
      <Typography sx={{fontWeight: '500'}}>SKU:&nbsp; {product.sku}</Typography>
    </Box>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
         <ProductQuantity quantity={values.quantity} updateQuantity={(newValue: number) => setValue('quantity', newValue)} minQuantity={product.minQuantity} groupOfQuantity={product.groupOfQuantity} />

        {product.inStock === false && <Label color="warning">Out of Stock</Label>}
      </Stack>
    </Stack>
   
    
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={disableActions}
        size="large"
        color="warning"
        variant={favourited.value ? "contained" : "outlined"}
        startIcon={<Iconify icon="solar:star-bold-duotone" width={24} />}
        onClick={onToggleFavourite}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Favourite
      </Button>

      <LoadingButton
        fullWidth
        color="primary"
        variant="contained"
        loading={isAddingToCart.value}
        loadingIndicator="Adding to cart..."
        onClick={handleAddCart}
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
      >
        Add To Cart
      </LoadingButton>
    </Stack>
  );

  const renderInStock = (
    <Chip
      label="Out Of Stock" 
      color="error"
      sx={{ml:3}}
      />
  )

  const renderDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {description}
    </Typography>
  );

  // const renderLabels = (newLabel.enabled) && (
  //   <Stack direction="row" alignItems="center" spacing={1}>
  //     {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
  //   </Stack>
  // );

  return (
    <>
    <Form methods={methods}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {/* {renderLabels} */}

          <Typography variant="h5">{name}</Typography>

          {renderDescription}
        </Stack>

         <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack direction="row">{renderPrice}{!product.inStock &&  renderInStock}</Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderQuantity}
       
        {renderActions}
      </Stack>
    </Form>
    <Notify notification={notify} open={notify !== ''} onClose={() => setNotify('')} />
    </>
  );
}
