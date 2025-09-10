import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';

import { Button, Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useGetProductCategorys } from 'src/actions/product';
import { Iconify } from 'src/components/iconify';
import { adminpaths as paths } from '../../../routes/adminpaths';

import type { IProduct } from '../../../utils/types';
import { ProductCategoryTable } from '../category/product-category-table';

// ----------------------------------------------------------------------

type Props = {
    product: IProduct | undefined;
};

export function AdminProductCategories({
    product
}: Props) {
    const router = useRouter();

    const { productCategorys, productCategorysLoading, productCategorysError } = useGetProductCategorys(`${product?.id}`);

    const addAssociaton = () => {
      router.push(paths.dashboard.product.associate(`${product?.id}`));
    }

    return (
        <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                    Product Categories for {product?.name}
                </Typography>
                <Button size="small" onClick={addAssociaton} sx={{ mr: 1 }} variant="outlined" startIcon={<Iconify icon='eva:eye-outline' />} color="primary" >
                    Add Association
                </Button>
            </Stack>
            <Card
                sx={{
                    flexGrow: { md: 1 },
                    display: { md: 'flex' },
                    flexDirection: { md: 'column' },
                }}
            >
                {/* <CategoryToolbar filters={filters} /> */}
                <ProductCategoryTable categorysLoading={productCategorysLoading} isLoading={productCategorysLoading} categorys={productCategorys} />
            </Card>
        </DashboardContent>
    );
}
