import { Helmet } from 'react-helmet-async';
import { ProductListView } from '../../sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Products` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
