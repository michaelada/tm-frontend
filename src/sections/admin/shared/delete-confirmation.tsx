import { Card, Stack, Button, Container, Typography, CardActions, CardContent } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    name?: string;
    description: string;
    onDelete: Function;
    onCancel?: Function;
    type?: string;
};

export function DeleteConfirmation({ name, description, onDelete, onCancel, type }: Props) {
    const router = useRouter();
    
    const onCheckCancel = () => {
        if(onCancel) {
            onCancel();
        } else {
            router.back();
        }        
    }
    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Card>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Deleting {type} {name}
                </Typography>
                    <Stack>
                        <Typography>{description}, or click cancel to return</Typography>
                    </Stack>
                <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                        onClick={() => onDelete()} 
                        startIcon={<Iconify width={16} icon="eva:checkmark-outline" />}
                    >
                        Confirm
                    </Button>
                </CardActions>
                </CardContent>
            </Card>
        </Container>
    );
}
