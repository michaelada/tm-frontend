import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetCustomer } from 'src/actions/product';

import { CustomerDetailsView } from 'src/sections/admin/customer/details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Customer details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { customer, customerLoading, customerError } = useGetCustomer(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomerDetailsView customer={customer} loading={customerLoading} error={customerError} />
    </>
  );
}
