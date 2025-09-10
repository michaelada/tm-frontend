import { useState } from 'react';

import { Card, Stack, Alert, TextField, Container, Typography, CardContent } from '@mui/material';

import { ConfirmOrCancel } from 'src/components/confirm-or-cancel';




// ----------------------------------------------------------------------

type Props = {
    onConfirm: Function;
};

export function AddGroup({
    onConfirm,
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
                        Please provide a unique name for the new group and click Add New Group, or click cancel to return.
                    </Typography><Stack spacing={2}>
                        <TextField
                            label="Product Group Name"
                            fullWidth
                            value={name}
                            error={!!error}
                            onChange={(event) => setName(event.target.value)}
                            helperText={error || ''}
                            autoComplete="off"
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <ConfirmOrCancel onConfirm={checkConfirm} disabled={name === ''} confirmLabel='Add New Group'/>
                    </Stack>
                </CardContent>
            </Card>
        </Container>


    );
}
