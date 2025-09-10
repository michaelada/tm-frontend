import { Helmet } from 'react-helmet-async';
import { AdminProductListView } from 'src/sections/admin/product';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Admin Products` };

export default function Page() {
  console.log("Test test")
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminProductListView />
    </>
  );
}
