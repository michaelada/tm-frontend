
import { Link, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ProductGroupSkeleton } from 'src/sections/product/product-skeleton';


import { adminpaths as paths } from 'src/routes/adminpaths';
import { RouterLink } from 'src/routes/components';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { Iconify } from 'src/components/iconify';
import { useRouter } from '../../../routes/hooks';
import { IProduct, IProductGroup } from '../../../utils/types';
import { GroupDetails } from './group-details';

// ----------------------------------------------------------------------

type Props = {
  productGroup?: IProductGroup;
  error: string;
  loading?: boolean;
};

export function GroupDetailsView({ productGroup, error, loading }: Props) {

  if (loading || !productGroup) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <ProductGroupSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Product Group not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.group.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/admin' },
          { name: 'Product Groups', href: paths.dashboard.group.root },
          { name: productGroup.name },
        ]}
        sx={{ mb: 5 }}
      />


      <GroupDetails productGroup={productGroup} error={error} />

    </Container>
  );
}

