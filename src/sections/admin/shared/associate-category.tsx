import type { IProduct, ICategoryFilters } from 'src/utils/types';

import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import { Card, Alert, Container, Typography, CardContent } from '@mui/material';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints } from 'src/utils/axios';

import { useSearchCategoryChildren } from 'src/actions/product';

import { CategoryTable } from '../category/category-table';
import { CategoryToolbar } from '../category/category-toolbar';
import { adminpaths as paths } from '../../../routes/adminpaths';

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

    const { categorys, categorysLoading } = useSearchCategoryChildren(
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
