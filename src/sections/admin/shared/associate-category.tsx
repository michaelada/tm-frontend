import { useEffect, useState } from 'react';
import { useSetState } from 'src/hooks/use-set-state';
import { useDebounce } from 'src/hooks/use-debounce';
import { Card, Typography, CardActions, Button, CardContent, Container, Alert } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useSnackbar } from 'notistack';
import { ICategoryFilters, IProduct } from 'src/utils/types';
import { useSearchCategoryChildren } from 'src/actions/product';
import axios, { endpoints } from 'src/utils/axios';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { adminpaths as paths } from '../../../routes/adminpaths';
import { CategoryToolbar } from '../category/category-toolbar';
import { CategoryTable } from '../category/category-table';

// ----------------------------------------------------------------------
type Props = {
    product?: IProduct;
    onCancel?: Function;
};

export function AssociateCategory({ product, onCancel }: Props) {
    const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

    const searchParams = useSearchParams();
    const filters = useSetState<ICategoryFilters>({
        search: searchParams.get('search') ?? undefined,
    });

    useEffect(() => {
        console.log(filters.state);
        const { search = '' } = filters.state;
        const queryParams = new URLSearchParams({ search });
        router.replace(`${paths.dashboard.product.associate(`${product?.id}`)}?${queryParams}`);

    }, [filters.state, router, product?.id]);

    const onCheckCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    }

    const onAssociate = (categoryId: string) => {
        axios.post(endpoints.admin.category.associate(`${categoryId}`, `${product?.id}`)).then(response => {
        enqueueSnackbar('Product Category association with this product', { variant: 'success'});
        router.back();
      })
      .catch(err => {
        setError(`Problem associating category : ${err}`);
      });    
    }

    function mapFilters(f: ICategoryFilters) {
        return {
            search: f.search,
        };
    }

    const debouncedFilters = useDebounce<ICategoryFilters>(filters.state);

    const { categorys, categorysLoading, categorysError } = useSearchCategoryChildren(
        mapFilters(debouncedFilters)
    );

    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Card>
                <CardContent>
                    <Typography gutterBottom component="div">
                        Select Category to associate with {product?.name}
                    </Typography>
                    {error !== '' && <Alert severity="error">{error}</Alert>}                
                    <CategoryToolbar filters={filters} />
                    <CategoryTable categorysLoading={categorysLoading} isLoading={categorysLoading} categorys={categorys} isSubcategory={false} onAssociate={(categoryId) => onAssociate(categoryId)}/>                  
                </CardContent>
            </Card>
        </Container>
    );
}
