import { Box, Button } from "@mui/material";

import { useRouter } from "src/routes/hooks";

type ConfirmOrCancelProps = {
    onConfirm: Function,
    onCancel?: Function,
    confirmLabel?: string,
    disabled: boolean
};

export function ConfirmOrCancel({ onConfirm, onCancel, confirmLabel, disabled }: ConfirmOrCancelProps) {
    const router = useRouter();
    const label = confirmLabel || 'Confirm';

    const onCheckCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    }
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
            <Button disabled={disabled} variant='contained' color='warning' onClick={() => onConfirm()}>{label}</Button>
            <Button variant='outlined' color='warning' onClick={onCheckCancel} >Cancel</Button>
        </Box>
    );
}