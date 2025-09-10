import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetOrder } from 'src/actions/order';
import { AdminOrderDetailsView } from 'src/sections/orders/view/admin-order-details-view';


// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.appName}` };

export default function AdminOrderDetailsPage() {
  const { id = '', type = 'web' } = useParams();

  const { order, orderLoading, orderError } = useGetOrder(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminOrderDetailsView order={order} loading={orderLoading} error={orderError} />
    </>
  );
}
function useQuery(): { id?: "" | undefined; type: any; } {
  throw new Error('Function not implemented.');
}

