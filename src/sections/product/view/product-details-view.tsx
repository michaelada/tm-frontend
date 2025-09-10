import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ProductDetailsSkeleton } from '../product-skeleton';
import { ProductDetailsCarousel } from '../product-details-carousel';
import { ProductDetailsDescription } from '../product-details-description';
import { IProduct } from '../../../utils/types';
import { ProductDetailsSummary } from '../product-details-summary';
import { ProductDetailsContent } from '../product-details-content';
import { ProductDownloadImages } from '../product-download-images';

// ----------------------------------------------------------------------

type Props = {
  product?: IProduct;
  error?: any;
  loading?: boolean;
};

export function ProductDetailsView({ product, error, loading }: Props) {
  const tabs = useTabs('description');

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
              href={paths.product.root}
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
          { name: 'Products', href: paths.product.root },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel images={product?.product_images ?? []} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {product && (
            <ProductDetailsSummary
              product={product}
            />
          )}
        </Grid>
      </Grid>

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
            { value: 'description', label: 'Description' },
            { value: 'content', label: 'Barcodes' },
            { value: 'images', label: 'Images' },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}
        {tabs.value === 'content' && (
          <ProductDetailsContent product={product} />
        )}
        {tabs.value === 'images' && (
          <ProductDownloadImages product={product} />
        )}

      </Card>
    </Container>
  );
}
