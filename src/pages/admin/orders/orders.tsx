import { Helmet } from 'react-helmet-async';

import { AdminOrdersListView } from 'src/sections/orders/view/admin-orders-list-view';


// ----------------------------------------------------------------------

const metadata = { title: `Orders | Tom Martin & Co` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminOrdersListView/>
    </>
  );
}
