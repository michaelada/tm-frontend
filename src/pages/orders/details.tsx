import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetOrder } from 'src/actions/order';
import { OrderDetailsView } from 'src/sections/orders/view/order-details-view';


// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.appName}` };

export default function OrderDetailsPage() {
  const { id = '', type = 'web' } = useParams();

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
function useQuery(): { id?: "" | undefined; type: any; } {
  throw new Error('Function not implemented.');
}

