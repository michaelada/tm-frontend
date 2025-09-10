import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';

import { useGetProduct } from 'src/actions/product';
import { Confirmation } from 'src/sections/admin/shared/confirmation';
import { useSnackbar } from 'notistack';
import { adminpaths } from 'src/routes/adminpaths';

// ----------------------------------------------------------------------

const metadata = { title: `Remove Product From Group Confirmation` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  const onConfirm = () => {
    axios.post(endpoints.admin.group.remove(`${product?.id}`, `${product?.product_group?.id}`)).then(response => {
      enqueueSnackbar('Product has been removed from group', { variant: 'success' });
      router.replace(`${adminpaths.dashboard.product.root}`);
    })
      .catch(err => {
        setError(`Problem removing product from group : ${err}`);
      });

  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Confirmation title="Remove Group Association" description={`Please confirm that you want to remove the product ${product?.name} from the product group ${product?.product_group?.name}`} onConfirm={onConfirm} />
    </>
  );
}
