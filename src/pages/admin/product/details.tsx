import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetAdminProduct } from 'src/actions/product';

import { AdminProductDetailsView } from 'src/sections/admin/product';

// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetAdminProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminProductDetailsView product={product} loading={productLoading} error={productError} />
    </>
  );
}
