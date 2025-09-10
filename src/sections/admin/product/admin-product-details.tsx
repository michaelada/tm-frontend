import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Alert, Button } from '@mui/material';

import { Form } from 'src/components/hook-form';

import TmSwitch from '../shared/form/tm-switch';
import TmTextField from '../shared/form/tm-textfield';
import axios, { endpoints } from '../../../utils/axios';
import TmNumberField from '../shared/form/tm-numberfield';
import TmAsyncAutocomplete from '../shared/form/tm-async-autocomplete';

import type { IProduct } from '../../../utils/types';

// ----------------------------------------------------------------------

type Props = {
    product: IProduct | undefined;
};

export function AdminProductDetails({
    product,
    ...other
}: Props) {
    const [error, setError] = useState('');
    const [dirty, setDirty] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const methods = useForm({ defaultValues: product });

    const { reset, watch, handleSubmit, formState } = methods;

    const values = watch();

    useEffect(() => {
        if (product) {
            reset(product);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);


    const getUpdates = () => ({
        inStock: values.inStock,
        newIn: values.newIn,
        minQuantity: values.minQuantity,
        groupOfQuantity: values.groupOfQuantity,
        status: values.discontinued ? 'InActive' : 'Active',
        name: values.name,
        description: values.description,
        product_group_name: values.product_group_name,
        csp_product_individual_barcode: values.individual_barcode,
        csp_product_boxed_barcode: values.boxed_barcode,
    });

    const validate = () => {
        if(!values.minQuantity  || !Number(values.minQuantity)) {
            return 'Minimum quality must be a number';
        }
        if(!values.groupOfQuantity  || !Number(values.groupOfQuantity)) {
            return 'Group Of Quality must be a number';
        }
        if(!values.description  ) {
            return 'Please provide a product description';
        }        
        if(!values.name ) {
            return 'Please provide a product name';
        }
        return '';
    }

    const onSubmit = handleSubmit(async (data) => {
        console.log("Handle Submit");
        setError('');
        try {
            const isValid = validate();
            if(isValid !== '') {
                setError(isValid);
                return;
            }
            axios.post(endpoints.admin.product.details(`${product?.id}`), getUpdates()).then(response => {
                enqueueSnackbar('Product details updated', { variant: 'success'});
                navigate(0);
            }).catch(err => {
                setError(`Problem updating product: ${err}`);
            });
        } catch (e) {
            setError(`Problem updating product - ${e}`);
        }
    });

    const onChangeAutomcomplete = (newValue: string) => {
        setDirty(true);
    }

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container sx={{ m: 3 }}>
                <Grid item md={8} sm={6} xs={12} sx={{ p: 1 }}>
                    <Stack spacing={2}>
                        <TmTextField label="Product Name" name="name" helperText="The name of the product as it will be displayed on the main website" />
                        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                        <TmTextField
                            label="Product Description"
                            name="description"
                            helperText="The description of the product as it will be displayed on the main website"
                            multiline
                            maxRows={10}
                        />
                    </Stack>
                    <Divider sx={{ mt: 2, mb: 3, borderStyle: 'dashed' }} />
                    <TmAsyncAutocomplete
                        label="Product Group"
                        name="product_group_name"
                        helperText="The name of the group that this product is connected to"
                        url="/admin/product_groups/auto"
                        onChange={onChangeAutomcomplete}
                    />
                    <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} sx={{ p: 1 }}>
                    <Stack spacing={1}>
                        <TmSwitch label="In Stock" name="inStock" />
                        <TmSwitch label="New In" name="newIn" />
                        <TmSwitch label="Discontinued (Status = Inactive)" name="discontinued" />
                    </Stack>
                    <Stack spacing={1} sx={{ pr: 4 }}>
                        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        <TmNumberField label="Min Quantity" name="minQuantity" helperText="The minimum number that can be ordered" />
                        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        <TmNumberField label="Group Of Quantity" name="groupOfQuantity" helperText="The number to be ordered per group" />
                        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        <TmNumberField label="Boxed Barcode" name="boxed_barcode" helperText="The box related barcode for this product" />
                        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        <TmNumberField label="Individual Barcode" name="individual_barcode" helperText="The individual barcode for this product" />
                        
                    </Stack>

                </Grid>
            </Grid>


            <Divider sx={{ borderStyle: 'dashed' }} />
            {error && <Stack spacing={3} sx={{ m: 3 }}>
                <Alert severity='error'>{error}</Alert>
            </Stack>}
            {(dirty || formState.isDirty) && <Stack direction="row" spacing={3} alignItems="flex-end" sx={{ m: 3 }}>
                <LoadingButton color="warning" variant="contained" type="submit" loading={formState.isSubmitting}>
                    Save Changes
                </LoadingButton>
                <Button color="warning" variant="outlined" onClick={() => reset()}>Cancel</Button>
            </Stack>}
        </Form>

    );
}
