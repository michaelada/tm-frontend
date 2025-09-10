import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetCategory } from 'src/actions/product';

import { AdminCategoryDetailsView } from 'src/sections/admin/category/details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Category details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { category, categoryLoading, categoryError } = useGetCategory(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminCategoryDetailsView category={category} loading={categoryLoading} error={categoryError} />
    </>
  );
}
