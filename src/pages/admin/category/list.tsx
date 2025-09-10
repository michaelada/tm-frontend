import { Helmet } from 'react-helmet-async';

import { CategoryListView } from 'src/sections/admin/category/list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Admin Product Categories` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CategoryListView />
    </>
  );
}
