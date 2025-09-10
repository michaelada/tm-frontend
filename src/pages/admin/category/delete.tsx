import { Helmet } from 'react-helmet-async';
import { useParams, useRouter } from 'src/routes/hooks';
import { useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';

import { useGetCategory } from 'src/actions/product';
import { DeleteConfirmation } from 'src/sections/admin/shared/delete-confirmation';
import { useSnackbar } from 'notistack';
import { Alert, Box } from '@mui/material';
import { adminpaths } from 'src/routes/adminpaths';

// ----------------------------------------------------------------------

const metadata = { title: `Delete Category Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { category, categoryLoading, categoryError } = useGetCategory(id);

  const onDelete = () => {
      axios.delete(endpoints.category.details(`${category?.id}`)).then(response => {
        enqueueSnackbar('Category has been deleted', { variant: 'success'});
        router.replace(`${adminpaths.dashboard.category.children(`${category?.parent}`)}`);
      })
      .catch(err => {
        setError(`Problem deleting category : ${err}`);
      });
    
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DeleteConfirmation name={category?.name} description={categoryLoading ? 'loading' : `Please confirm that you want to delete the category "${category?.name}"`} onDelete={onDelete} />
      {error && <Box sx={{m:3}}><Alert severity='error'>{error}</Alert></Box>}
    </>
  );
}
