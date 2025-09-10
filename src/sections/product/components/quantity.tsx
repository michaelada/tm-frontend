import { useState } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { validateQuantity } from "src/utils/helper";
import { IncrementerButtonV2 } from "./incrementer-button-v2";

type ProductQuantityProps = {
    quantity: number;
    updateQuantity: Function;
    minQuantity?: number;
    groupOfQuantity?: number;
};

export default function ProductQuantity({ quantity, updateQuantity, minQuantity, groupOfQuantity }: ProductQuantityProps) {
    const [error, setError] = useState("");
    minQuantity = minQuantity ?? 1;
    groupOfQuantity = groupOfQuantity ?? 1;

    const changeQuantity = (value: number) => {
        console.log(value);
        if (Number.isNaN(value)) {
            updateQuantity();
            return;
        }
        updateQuantity(value);
    }

    const checkQuantity = () => {
        const isValid = validateQuantity(quantity, minQuantity, groupOfQuantity);        
        setError(isValid);
        return isValid === "";
    }

    return (
        <Stack>            
            <IncrementerButtonV2
                quantity={quantity}
                disabledDecrease={quantity <= (minQuantity ?? 1)}
                onIncrease={() => !Number.isNaN(quantity) && updateQuantity(quantity + groupOfQuantity)}
                onDecrease={() => !Number.isNaN(quantity) && updateQuantity(quantity - groupOfQuantity)}
                updateQuantity={(newq: number) => changeQuantity(newq)}
                validateQuantity={checkQuantity}
            />
            {error && <Typography sx={{fontSize:"12px", color: 'red' }} >{error}</Typography>}
            {/* {error && <Alert variant="outlined" severity="error" sx={{fontSize:"12px" }} ><Box sx={{ m: 0, p:0 }}>{error}</Box></Alert>} */}
        </Stack>
    )
}