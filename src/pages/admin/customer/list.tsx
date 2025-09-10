import { Helmet } from 'react-helmet-async';

import { CustomerListView } from 'src/sections/admin/customer/list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Customers` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomerListView />
    </>
  );
}
