import type { IProduct } from 'src/utils/types';

import { Stack } from '@mui/material';

import Field from '../shared/field';

// ----------------------------------------------------------------------

type Props = {
  product?: IProduct;
};

export function ProductDetailsContent({ product }: Props) {

  return (
    <Stack sx={{p:2}}>
      <Field name="Individual Barcode" value={product?.individual_barcode} />
      <Field name="Boxed Barcode" value={product?.boxed_barcode} />
    </Stack>
  )
}
