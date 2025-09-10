import { Helmet } from 'react-helmet-async';

import { CartView } from '../../sections/checkout/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Cart` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CartView />
    </>
  );
}
