import { Helmet } from 'react-helmet-async';

import { BlankView } from 'src/sections/blank/view';
import { OrdersListView } from 'src/sections/orders/view/orders-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Orders | Tom Martin & Co` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrdersListView/>
    </>
  );
}
