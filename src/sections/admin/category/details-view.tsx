import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';
import { adminpaths as paths } from 'src/routes/adminpaths';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import type { ICategory } from '../../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  category?: ICategory;
  error?: any;
  loading?: boolean;
};

export function AdminCategoryDetailsView({ category, error, loading }: Props) {

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        Loading
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Category not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.category.root}
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
          { name: 'Home', href: '/' },
          { name: 'Categories', href: paths.dashboard.category.root },
          { name: category?.name },
        ]}
        sx={{ mb: 5 }}
      />


    </Container>
  );
}
