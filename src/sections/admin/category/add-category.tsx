import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { TextField, Stack, Alert, Container, Card, CardContent, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { ConfirmOrCancel } from 'src/components/confirm-or-cancel';
import { ICategory } from 'src/utils/types';




// ----------------------------------------------------------------------

type Props = {
    parent?: ICategory;
    onConfirm: Function;
};

export function AddCategory({
    onConfirm,
    parent,
    ...other
}: Props) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');

    const checkConfirm = () => {
        if (name === '') {
            setError('Please provide a product name');
            return;
        }
        onConfirm(name);
    }
   

    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Card>
                <CardContent>
                    <Typography gutterBottom component="div">
                        Please provide a unique name for the new product sub category which will be a child of the parent category {parent?.name}
                    </Typography><Stack spacing={2}>
                        <TextField
                            label="Sub Category Name"
                            value={name}
                            error={!!error}
                            onChange={(event) => setName(event.target.value)}
                            helperText={error || ''}
                            autoComplete="off"
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <ConfirmOrCancel onConfirm={checkConfirm} disabled={name === ''} confirmLabel='Add Sub Category'/>
                    </Stack>
                </CardContent>
            </Card>
        </Container>


    );
}
