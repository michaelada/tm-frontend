import { Box } from '@mui/material';
import { useCartContext } from './use-cart-context';

// material
// ----------------------------------------------------------------------


export default function CartSize() {
    const cart = useCartContext();


    if (cart.cart && cart.cart?.Cartitems.length > 0) {
        return (
            <Box color="error"> ({cart.cart?.Cartitems.length})</Box>
        )
    }
    return <></>;

}

