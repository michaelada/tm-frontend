import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link, ListItemText } from '@mui/material';


import { fCurrency } from 'src/utils/format-number';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { useRouter } from '../../routes/hooks';



import { IncrementerButton } from '../product/components/incrementer-button';
import { ICartItem } from '../../utils/types';

// ----------------------------------------------------------------------

type Props = {
  row: ICartItem;
  onDelete: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }: Props) {
  
  const getProductImage = (item: ICartItem) => {
    if(item.product.product_images && item.product.product_images.length > 0) {
      return item.product.product_images[0].image;
    }
    return "";
  }
  const router = useRouter();

  const openProductDetail = () => {
      router.push(paths.product.details(`${row.product.id}`));
    };
  
  const minQuantity = row.product.minQuantity || 1;


  return (
    <TableRow>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar
            variant="rounded"
            alt={row.product.name}
            // src={row.defaultImage?.url}
            src={getProductImage(row)}
            sx={{ width: 64, height: 64 }}
          />

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" >
               <ListItemText
                  primary={
                    <Link
                      color="inherit"
                      variant="subtitle2"
                      sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                      onClick={openProductDetail}
                    >
                      {row.product.name}
                    </Link>
                  }
                  secondary={`SKU: ${row.product.sku}`}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{ component: 'span', color: 'text.disabled', mt: 0.5 }}
                />
            </Typography>

          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        {fCurrency(row.amount)}
      </TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={row.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={row.quantity <= minQuantity}
          />
        </Box>
      </TableCell>

      <TableCell align="right">
        {fCurrency(row.amount * row.quantity)}
      </TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
      
    </TableRow>
  );
}
