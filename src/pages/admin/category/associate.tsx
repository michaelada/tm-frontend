import { Helmet } from 'react-helmet-async';

import { useParams} from 'src/routes/hooks';

import { useGetProduct } from 'src/actions/favourite';

import { AssociateCategory } from 'src/sections/admin/shared/associate-category';

// ----------------------------------------------------------------------

const metadata = { title: `Associate Category Confirmation` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {!productLoading && <AssociateCategory product={product} />}
    </>
  );
}
