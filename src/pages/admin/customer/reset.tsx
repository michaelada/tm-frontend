import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';

import { Box, Alert } from '@mui/material';

import { useParams, useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useGetCategory } from 'src/actions/product';

import { RenameComponent } from 'src/sections/admin/shared/rename-component';

// ----------------------------------------------------------------------

const metadata = { title: `Reset Password Page` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const { id = '' } = useParams();

  const { category } = useGetCategory(id);

  const onConfirm = (name: string) => {
    axios.post(endpoints.admin.category.details(id), { name }).then(response => {
      if (response.data.error) {
        setError(response.data.message);
        return;
      }
      enqueueSnackbar('Category name changes', { variant: 'success' });
      router.back();
    })
      .catch(err => {
        setError(`Problem changing category name : ${err}`);
      });
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {category && <RenameComponent name={category?.name} onChange={(n:string) => onConfirm(n)} />}
      {error && <Box sx={{ m: 3 }}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
