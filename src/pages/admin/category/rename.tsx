import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';
import { useGetCategory } from 'src/actions/product';

import { Alert, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AddCategory } from 'src/sections/admin/category/add-category';
import { RenameComponent } from 'src/sections/admin/shared/rename-component';

// ----------------------------------------------------------------------

const metadata = { title: `Rename Category Page` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const { id = '' } = useParams();

  const { category, categoryLoading, categoryError } = useGetCategory(id);

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
