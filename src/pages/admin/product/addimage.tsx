import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';

import { Alert, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useGetProduct } from 'src/actions/favourite';
import { AddProductImage } from 'src/sections/admin/product/add-product-image';
import { IProductImage } from 'src/utils/types';

// ----------------------------------------------------------------------

const metadata = { title: `Add Image Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  // const onConfirm = (image: IProductImage) => {
  //   axios.post(endpoints.product.addimage(`${product?.id}`)).then(response => {
  //     enqueueSnackbar('Image added to product', { variant: 'success' });
  //     router.back();
  //   })
  //     .catch(err => {
  //       setError(`Problem adding image : ${err}`);
  //     });
  // }

  // const onCancel = () => {
  //   enqueueSnackbar('Cancelled', { variant: 'warning' });
  //   router.replace(endpoints.product.details(`${product?.id}`));
  // }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddProductImage product={product}  />
      {error && <Box sx={{ m: 3 }}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
