import { Helmet } from 'react-helmet-async';
import { HomeView } from '../../sections/home/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tom Martin | Home` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
