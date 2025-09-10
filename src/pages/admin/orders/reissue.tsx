import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';

import { Box, Alert } from '@mui/material';

import { adminpaths } from 'src/routes/adminpaths';
import { useParams, useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useGetOrder } from 'src/actions/order';

import { Confirmation } from 'src/sections/admin/shared/confirmation';

// ----------------------------------------------------------------------

const metadata = { title: `Reissue Order` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { order } = useGetOrder(id);

  const onConfirm = () => {
    axios.post(endpoints.admin.order.reissue(`${order?.id}`)).then(response => {
      enqueueSnackbar('Order will be regenerated for collection by SAGE', { variant: 'success' });
      router.replace(`${adminpaths.dashboard.order.root}`);
    })
      .catch(err => {
        setError(`Problem reissuing order : ${err}`);
      });

  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Confirmation title="Reissue Order" description={`Please confirm that you want to reissue the order number #${order?.orderNo} ?`} onConfirm={onConfirm} />
      {error && <Box sx={{ m: 3 }}><Alert severity='error'>{error}</Alert></Box>}

    </>
  );
}
