import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import { useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';

import { AssociateCategory } from 'src/sections/admin/shared/associate-category';
import { useSnackbar } from 'notistack';
import { Alert, Box } from '@mui/material';
import { useGetProduct } from 'src/actions/favourite';

// ----------------------------------------------------------------------

const metadata = { title: `Associate Category Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {!productLoading && <AssociateCategory product={product} />}
      {error && <Box sx={{m:3}}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
