import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import { useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';

import { AssociateCategory } from 'src/sections/admin/shared/associate-category';
import { useSnackbar } from 'notistack';
import { Alert, Box, Typography } from '@mui/material';
import { adminpaths } from 'src/routes/adminpaths';
import { useGetProduct } from 'src/actions/favourite';
import { AddGroup } from 'src/sections/admin/group/add-group';

// ----------------------------------------------------------------------

const metadata = { title: `Associate Category Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const onConfirm = (name: string) => {
      axios.post(endpoints.admin.group.add, { name }).then(response => {
        if(response.data.error) {
          setError(response.data.message);
          return;
        }
        enqueueSnackbar('Product Group Added', { variant: 'success'});
        router.back();
      })
      .catch(err => {
        setError(`Problem adding group  : ${err}`);
      });    
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddGroup onConfirm={onConfirm} />
      {error && <Box sx={{m:3}}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
