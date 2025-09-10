import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetOrder } from 'src/actions/order';

import { OrderDetailsView } from 'src/sections/orders/view/order-details-view';


// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.appName}` };

export default function OrderDetailsPage() {
  const { id = '' } = useParams();

  const { order, orderLoading, orderError } = useGetOrder(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderDetailsView order={order} loading={orderLoading} error={orderError} />
    </>
  );
}

