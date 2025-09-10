import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProductGroup } from 'src/actions/product';

import { GroupDetailsView } from 'src/sections/admin/group/group-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product Group details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { productGroup, productGroupLoading, productGroupError } = useGetProductGroup(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GroupDetailsView productGroup={productGroup} loading={productGroupLoading} error={productGroupError} />
    </>
  );
}
