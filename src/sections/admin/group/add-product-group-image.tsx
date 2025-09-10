import type { IProductGroup } from 'src/utils/types';

import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Box, Card, Alert, Stack, Button, Container, Typography, CardContent } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { adminpaths as paths } from 'src/routes/adminpaths';

import axios, { endpoints } from 'src/utils/axios';

import { Form } from 'src/components/hook-form';

import { TmFileUpload } from '../shared/form/tm-fileupload';

// ----------------------------------------------------------------------

type Props = {
    productGroup?: IProductGroup;
    onCancel?: Function;
};

export function AddProductGroupImage({ productGroup, onCancel }: Props) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [files, setFiles] = useState<FileList>();

    const defautValues = () => ({ 'image': '' });

    const methods = useForm({ defaultValues: defautValues() });
    const { handleSubmit } = methods;

    const onCheckCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    }

    const onUpdate = (fs: FileList) => {
        console.log("Adding files");
        console.table(fs);
        setFiles(fs);
    }

    const getUpdates = (): FormData => {
        // image: files
        const formData = new FormData();
        console.log(files);
        if (!files) {
            return formData;
        }
        formData.append('file', files[0]);
        return formData;
    };

    const validate = () => {
        if (!files || files.length === 0) {
            return 'Please select the image to add';
        }
        return '';
    }


    const onSubmit = handleSubmit(async (data) => {
        console.log("Handle Submit");
        setError('');
        try {
            const isValid = validate();
            if (isValid !== '') {
                setError(isValid);
                return;
            }

            axios({
                method: "post",
                url: endpoints.admin.group.image(`${productGroup?.id}`),
                data: getUpdates(),
                headers: { "Content-Type": "multipart/form-data" },
            }).then(result => {
                if(result.data.error) {
                    enqueueSnackbar(result.data.messages, { variant: 'error' });
                    return;
                }
                enqueueSnackbar('Product image added', { variant: 'success' });
                router.push(paths.dashboard.group.details(`${productGroup?.id}`));
                router.refresh();
                // navigate(-1);
            });
        } catch (e) {
            setError(`Problem updating product - ${e}`);
        }
    });

    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Card>
                <CardContent>
                    <Typography gutterBottom component="div">
                        Select image to use for this product group ({productGroup?.name}) and click the Upload button, or click cancel to go back.
                    </Typography>
                    <Form methods={methods} onSubmit={onSubmit} >

                        <Stack spacing={1} direction="row">
                            <TmFileUpload name="Select File to Upload" onUpdate={(fs: any) => onUpdate(fs)} />
                            {files && files.length > 0 && <Typography sx={{ mt: 1, color: 'GrayText' }}>Selected File: {files[0].name}</Typography>}
                            {(!files || files?.length === 0) && <Typography sx={{ mt: 1, color: 'GrayText' }}>click button to select file</Typography>}
                        </Stack>
                        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
                            <Button disabled={!files || files?.length === 0} sx={{ mt: 1 }} variant='contained' color='warning' type="submit" >Upload</Button>
                            <Button variant='outlined' color='warning' onClick={onCheckCancel} >Cancel</Button>
                        </Box>
                        {error && <Stack spacing={3} sx={{ m: 3 }}>
                            <Alert severity='error'>{error}</Alert>
                        </Stack>}
                    </Form>
                </CardContent>
            </Card>


        </Container>
    );
}
