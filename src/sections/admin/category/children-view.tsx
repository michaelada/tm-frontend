import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Stack, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { adminpaths as paths } from 'src/routes/adminpaths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CategoryTable } from './category-table';

import type { ICategory } from '../../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  category?: ICategory;
  error?: any;
  loading?: boolean;
};

export function CategoryChildrensView({ category, error, loading }: Props) {
    const router = useRouter();

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        {/* <ProductDetailsSkeleton /> */}
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

  const getCategories = () => {
    if (!category) {
      return [];
    }
    return category?.children?.map(s => {
      const c: ICategory = {
        id: s.id,
        name: s.name,
        image: '',
        children: []
      }
      return c;
    });
  }

  const onAddSubCategory = () => {
     router.push(paths.dashboard.category.add(`${category?.id}`));
  }


  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Categories', href: paths.dashboard.category.root },
          { name: category?.name },
        ]}
        sx={{ mb: 5 }}
      />
     
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          // height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >
         <Stack direction="row" sx={{ justifyContent: 'space-between', m:2 }}>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                   {category?.name} - Sub categories
                </Typography>
                <Button size="small" onClick={() => onAddSubCategory()} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:plus-square-outline' />} color="primary" >
                    Add Sub Category
                </Button>
            </Stack>
        <CategoryTable categorysLoading={false} isLoading={false} categorys={getCategories()} isSubcategory />
      </Card>

    </DashboardContent>
  );
}
