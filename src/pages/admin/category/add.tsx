import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';
import { useGetCategory } from 'src/actions/product';

import { Alert, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AddCategory } from 'src/sections/admin/category/add-category';

// ----------------------------------------------------------------------

const metadata = { title: `Add Category Page` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const { id = '' } = useParams();

  const { category, categoryLoading, categoryError } = useGetCategory(id);

  const onConfirm = (name: string) => {
    axios.post(endpoints.admin.category.add(id), { name }).then(response => {
      if (response.data.error) {
        setError(response.data.message);
        return;
      }
      enqueueSnackbar('Product Sub Category Added', { variant: 'success' });
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

      <AddCategory onConfirm={onConfirm} parent={category}/>
      {error && <Box sx={{ m: 3 }}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
