import { Helmet } from 'react-helmet-async';

import { FavouritesListView } from '../../sections/favourite/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Products` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FavouritesListView />
    </>
  );
}
