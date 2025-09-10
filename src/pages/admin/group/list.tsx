import { Helmet } from 'react-helmet-async';

import { GroupListView } from 'src/sections/admin/group/list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Admin Product Groups` };

export default function Page() {
  console.log("Test test")
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GroupListView />
    </>
  );
}
