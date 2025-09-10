import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { adminpaths as paths } from 'src/routes/adminpaths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ProductDetailsSkeleton } from 'src/sections/product/product-skeleton';
import { AdminProductDetails } from './admin-product-details';
import { IProduct } from '../../../utils/types';
import { AdminProductCategories } from './admin-product-categories';
import { AdminProductImages } from './admin-product-images';

// ----------------------------------------------------------------------

type Props = {
  product?: IProduct;
  error?: any;
  loading?: boolean;
};

export function AdminProductDetailsView({ product, error, loading }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs = useTabs(searchParams.get('tab') ?? 'details');
  
  // useEffect(() => {
  //   const queryParams = new URLSearchParams({ tab: tabs.value });
  //   router.replace(`${paths.dashboard.product.details(`${pid}`)}?${queryParams}`);

  // }, [tabs, router, pid]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <ProductDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Product not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.root}
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
          { name: 'Products', href: paths.dashboard.product.root },
          { name: `${product?.name} (${product?.sku})` },
        ]}
        sx={{ mb: 5 }}
      />

      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {[
            { value: 'details', label: 'Details' },
            { value: 'category', label: 'Categories' },
            { value: 'images', label: 'Images' },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'details' && (
          <AdminProductDetails product={product} />
        )}
        {tabs.value === 'category' && (
          <AdminProductCategories product={product} />
        )}
        {tabs.value === 'images' && (
          <AdminProductImages product={product} />
        )}

      </Card>
    </Container>
  );
}
