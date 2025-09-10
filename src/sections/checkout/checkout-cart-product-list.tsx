import { useSnackbar } from 'notistack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

import { CheckoutCartProduct } from './checkout-cart-product';
import { ICartItem } from '../../utils/types';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalAmount', label: 'Total Price', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

type Props = {
  products: ICartItem[];
  onDelete: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onIncreaseQuantity: (id: number) => void;
};

export function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
    const { enqueueSnackbar } = useSnackbar();
  

  const onDeleteFromCart = (cartItem: ICartItem) => {
    onDelete(cartItem.id);
    enqueueSnackbar(`${cartItem.product.name} removed from cart`, { variant: 'success'});
    
  }


  return (
    <Scrollbar>
      <Table sx={{ minWidth: 720 }}>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {products.map((row) => (
            <CheckoutCartProduct
              key={row.id}
              row={row}
              onDelete={() => onDeleteFromCart(row)}
              onDecrease={() => onDecreaseQuantity(row.id)}
              onIncrease={() => onIncreaseQuantity(row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
}
