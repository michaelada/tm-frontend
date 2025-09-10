import { Helmet } from 'react-helmet-async';
import { UnassignedListView } from 'src/sections/admin/unassigned/list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Unassigned Products` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UnassignedListView />
    </>
  );
}
