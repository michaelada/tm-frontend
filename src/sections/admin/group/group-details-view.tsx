
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';
import { adminpaths as paths } from 'src/routes/adminpaths';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductGroupSkeleton } from 'src/sections/product/product-skeleton';

import { GroupDetails } from './group-details';

import type { IProductGroup } from '../../../utils/types';

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

