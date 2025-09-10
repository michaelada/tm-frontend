import { Stack, Typography } from "@mui/material";

type Props = {
    name: string;
    value: string | undefined | null;
    horizontal?: boolean; 
};


export default function Field({ name, value, horizontal }: Props) {
    return (
        <Stack direction={horizontal ? 'row' : 'column'} spacing={1} >
            <Typography component="div" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {name} {horizontal && ":"}
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {value}
            </Typography>
        </Stack>
    )

} 