import { Helmet } from 'react-helmet-async';

import { NewInView } from '../../sections/new-in/view/new-in-view';

// ----------------------------------------------------------------------

const metadata = { title: `New In | Tom Martin & Co` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NewInView />
    </>
  );
}
