import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';

import { Alert, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useGetProductGroup } from 'src/actions/product';
import { IProductImage } from 'src/utils/types';
import { AddProductGroupImage } from 'src/sections/admin/group/add-product-group-image';

// ----------------------------------------------------------------------

const metadata = { title: `Add Group Image Confirmation` };

export default function Page() {
  const router = useRouter();

  const { id = '' } = useParams();

  const { productGroup, productGroupLoading, productGroupError } = useGetProductGroup(id);

  // const onConfirm = (image: IProductImage) => {
  //     axios.post(endpoints.admin.group.addimage(`${productGroup?.id}`)).then(response => {
  //       enqueueSnackbar('Image added to product group', { variant: 'success'});
  //       router.back();
  //     })
  //     .catch(err => {
  //       setError(`Problem adding image : ${err}`);
  //     });    
  // }

  // const onCancel = () => {
  //     enqueueSnackbar('Cancelled', { variant: 'warning'});
  //     router.replace(endpoints.product.details(`${productGroup?.id}`));
  // }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddProductGroupImage productGroup={productGroup} />
      {/* {error && <Box sx={{m:3}}><Alert severity='error'>{error}</Alert></Box>} */}
    </>
  );
}
