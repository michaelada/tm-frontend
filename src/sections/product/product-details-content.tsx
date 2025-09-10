import { Box, Button, Grid, Stack } from '@mui/material';
import { IProduct } from 'src/utils/types';
import { Iconify } from 'src/components/iconify';
import Field from '../shared/field';
import { ProductDownloadImages } from './product-download-images';

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
