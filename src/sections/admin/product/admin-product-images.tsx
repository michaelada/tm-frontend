import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';

import { Button, Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useGetProductImages } from 'src/actions/product';
import { Iconify } from 'src/components/iconify';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { IProduct } from '../../../utils/types';
import { ProductCategoryTable } from '../category/product-category-table';
import { ProductImageTable } from './table/product-image-table';

// ----------------------------------------------------------------------

type Props = {
    product: IProduct | undefined;
};

export function AdminProductImages({
    product
}: Props) {
    const router = useRouter();

    const { productImages, productImagesLoading, productImagesError } = useGetProductImages(`${product?.id}`);

    const addImage = () => {
      router.push(paths.dashboard.product.addimage(`${product?.id}`));
    }

    return (
        <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                    Product Images for {product?.name}
                </Typography>
                <Button size="small" onClick={addImage} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />} color="primary" >
                    Add Image
                </Button>
            </Stack>
            <Card
                sx={{
                    flexGrow: { md: 1 },
                    display: { md: 'flex' },
                    flexDirection: { md: 'column' },
                }}
            >
                <ProductImageTable imagesLoading={productImagesLoading} isLoading={productImagesLoading} images={productImages} />
            </Card>
        </DashboardContent>
    );
}
