import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useParams, useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';

import { useGetProduct } from 'src/actions/product';
import { Confirmation } from 'src/sections/admin/shared/confirmation';
import { useSnackbar } from 'notistack';
import { adminpaths } from 'src/routes/adminpaths';
import { useGetOrder } from 'src/actions/order';

// ----------------------------------------------------------------------

const metadata = { title: `Reissue Order` };

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  const { id = '' } = useParams();

  const { order, orderLoading, orderError } = useGetOrder(id);

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
    </>
  );
}
