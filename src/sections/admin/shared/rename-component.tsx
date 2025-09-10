import { Button, Card, CardActions, CardContent, Container, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form';

import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import TmTextField from './form/tm-textfield';

// ----------------------------------------------------------------------

type Props = {
    title?: string;
    name?: string;
    description?: string;
    onChange: Function;
    onCancel?: Function;
    validate?: Function;
};

export function RenameComponent({ title, name, onChange, description, onCancel, validate }: Props) {
    const [error, setError] = useState('');
    const router = useRouter();
    const methods = useForm({ defaultValues: { name } });
    const { reset, watch, control, setValue, handleSubmit, formState } = methods;
    const values = watch();

    const onCheckCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        console.log("Handle Submit");
        setError('');
        try {
            if (validate) {
                const isValid = validate(values.name);
                if (isValid !== '') {
                    setError(isValid);
                    return;
                }
            }
            onChange(values.name);

        } catch (e) {
            setError(`Problem changing name - ${e}`);
        }
    });
    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title || "Change Name"}
                    </Typography>
                    <Stack spacing={3}>
                        <Typography>{description || "Type new name and click save"}, or click cancel to return</Typography>
                        <Form methods={methods} onSubmit={onSubmit} >
                            <TmTextField label="Name" name="name" helperText="" />
                        </Form>
                        <Divider sx={{ my: 2 }} />
                    </Stack>
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            variant='outlined'
                            onClick={() => onCheckCancel()}
                            startIcon={<Iconify width={16} icon="eva:arrow-back-outline" />}
                            color="warning"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="warning"
                            variant='contained'
                            onClick={() => onChange(values.name)}
                            startIcon={<Iconify width={16} icon="eva:checkmark-outline" />}
                            disabled={!formState.isDirty}
                        >
                            Confirm
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    );
}
