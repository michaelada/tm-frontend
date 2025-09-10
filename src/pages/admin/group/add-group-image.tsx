import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetProductGroup } from 'src/actions/product';

import { AddProductGroupImage } from 'src/sections/admin/group/add-product-group-image';

// ----------------------------------------------------------------------

const metadata = { title: `Add Group Image Confirmation` };

export default function Page() {
  const { id = '' } = useParams();

  const { productGroup } = useGetProductGroup(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddProductGroupImage productGroup={productGroup} />
    </>
  );
}
