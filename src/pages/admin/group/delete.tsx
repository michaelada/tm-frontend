import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';

import { adminpaths } from 'src/routes/adminpaths';
import { useParams, useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useGetProductGroup } from 'src/actions/product';

import { DeleteConfirmation } from 'src/sections/admin/shared/delete-confirmation';

// ----------------------------------------------------------------------

const metadata = { title: `Delete Group Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id = '' } = useParams();

  const { productGroup, productGroupLoading } = useGetProductGroup(id);

  const onDelete = () => {
    axios.delete(endpoints.admin.group.delete(`${productGroup?.id}`)).then(response => {
      enqueueSnackbar('Product Group has been deleted', { variant: 'success' });
      router.replace(`${adminpaths.dashboard.group.root}`);
    })
      .catch(err => {
        enqueueSnackbar(`Problem deleting product group : ${err}`, { variant: 'error' });
      });
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DeleteConfirmation type="Product Group" name={productGroup?.name} description={productGroupLoading ? 'loading' : `Please confirm that you want to delete the product group "${productGroup?.name}"`} onDelete={() => onDelete()} />
    </>
  );
}
