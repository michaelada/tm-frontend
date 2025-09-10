import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetProduct } from 'src/actions/favourite';

import { AddProductImage } from 'src/sections/admin/product/add-product-image';

// ----------------------------------------------------------------------

const metadata = { title: `Add Image Confirmation` };

export default function Page() {

  const { id = '' } = useParams();

  const { product } = useGetProduct(id);


  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddProductImage product={product}  />
    </>
  );
}
