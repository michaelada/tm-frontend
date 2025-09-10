import type { ICheckoutState, CartContextValue } from 'src/types/checkout';

import { useMemo, Suspense, useEffect, useCallback, createContext } from 'react';

import { useSearchParams } from 'src/routes/hooks';

import { getStorage, useLocalStorage } from 'src/hooks/use-local-storage';

import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { SplashScreen } from 'src/components/loading-screen';

import { useGetCart } from '../../../actions/cart';
import { addToCart, setQuantity, removeFromCart } from './action';

import type { IProduct, ICartItem } from '../../../utils/types';

// ----------------------------------------------------------------------

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartConsumer = CartContext.Consumer;

const STORAGE_KEY = 'app-checkout';

const initialState: ICheckoutState = {
  total: 0,
  subtotal: 0,
  shipping: 0,
  totalItems: 0,
  tax: 0,
  cart: undefined,
  cartLoading: true,
  orderReference: '',
  deliveryId: 0,
  deliveryAddress: ''
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function CartProvider({ children }: Props) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Container>{children}</Container>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {

  const { cart } = useGetCart();

  const searchParams = useSearchParams();

  const activeStep = Number(searchParams.get('step'));

  const { state, setState, setField, canReset, resetState } = useLocalStorage<ICheckoutState>(
    STORAGE_KEY,
    initialState
  );

  const completed = activeStep === PRODUCT_CHECKOUT_STEPS.length;

  const updateTotalField = useCallback(() => {
    const totalItems: number = (state.cart?.Cartitems ?? []).reduce(
      (total: number, item: ICartItem) => total + item.quantity,
      0
    );

    // TODO: Calculate with product price
    const subtotal: number = (state.cart?.Cartitems ?? []).reduce(
      (total: number, item: ICartItem) => total + item.quantity * item.amount,
      0
    );

    const tax: number = (state.cart?.Cartitems ?? []).reduce(
      (total: number, item: ICartItem) => total + (item.quantity * item.amount) * (item.product.vat/100),
      0
    );

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('tax', tax);
    setField('total', state.subtotal + state.shipping + state.tax);
  }, [setField, state.cart, state.shipping, state.subtotal, state.tax]);

  useEffect(() => {
    setState({ cart });
  }, [cart, setState]);

  useEffect(() => {
    const restoredValue = getStorage(STORAGE_KEY);
    if (restoredValue) {
      updateTotalField();
    }
  }, [updateTotalField]);

  const onAddToCart = useCallback((newItem: { product: IProduct; quantity: number, price: string }) => {
    // check if product already in cart
    const cartItem = cart?.Cartitems.find(ci => ci.product.id === newItem.product.id);
    if(cartItem) {
      setQuantity({ cartItemId: cartItem.id , quantity: cartItem.quantity+newItem.quantity}).then(() => {
        console.log(`Adding ${newItem.quantity} to existing cart item for product id ${newItem.product.id}`);
        if(cart != null) {
          cart.Cartitems = cart?.Cartitems.map(item => {
            if(item.id === cartItem.id) {
              item.quantity += newItem.quantity;            
            }
            return item;
          });
          setState({cart});
          updateTotalField();
        }

      });
    } else {
      addToCart({ productid: newItem.product.id!, quantity: newItem.quantity, price: newItem.price })
        .then((res) => {
          cart?.Cartitems.push(res.data);
          setState({cart});
          updateTotalField();
        });
    }

  }, [cart, setState, updateTotalField]);

  const onDeleteCart = useCallback((cartItemId: number) => {
    removeFromCart({ cartItemId }).then(() => {
      // remove from local storage
      if(cart != null) {
        cart.Cartitems = cart?.Cartitems.filter(item => item.id !== cartItemId);
        setState({cart});
        updateTotalField();
      }

    });
  }, [cart, setState, updateTotalField]);

  const onIncreaseQuantity = useCallback(
    (cartItemId: number) => {
      const cartItem = cart?.Cartitems.find(ci => ci.id === cartItemId);
      if(cartItem === undefined) {
        console.error("Could not find product");
        return;
      }
      const minQuantity = cartItem.product.minQuantity || 1;

      setQuantity({ cartItemId , quantity: cartItem.quantity+minQuantity}).then(() => {
        console.log("Increase cart");
        if(cart != null) {
          cart.Cartitems = cart?.Cartitems.map(item => {
            if(item.id === cartItemId) {
              item.quantity += minQuantity;            
            }
            return item;
          });
          setState({cart});
          updateTotalField();
        }

      });
    },
    [cart, setState, updateTotalField]
  );

  const onDecreaseQuantity = useCallback(
    (cartItemId: number) => {
      const cartItem = cart?.Cartitems.find(ci => ci.id === cartItemId);
      if(cartItem === undefined) {
        console.error("Could not find product");
        return;
      }
      const minQuantity = cartItem.product.minQuantity || 1;
      setQuantity({ cartItemId , quantity: cartItem.quantity-minQuantity}).then(() => {
      // const updatedItems = state.items.map((item: ICheckoutItem) => {
      //   if (item.id === itemId) {
      //     return { ...item, quantity: item.quantity + 1 };
      //   }
      //   return item;
      // });
      // setField('items', updatedItems);
      console.log("Decrease cart");
      if(cart != null) {
        cart.Cartitems = cart?.Cartitems.map(item => {
          if(item.id === cartItemId) {
            item.quantity -= minQuantity;            
          }
          return item;
        });
        setState({cart});
        updateTotalField();
      }

      });
    },
    [cart, setState, updateTotalField]
  );

  // Reset
  const onReset = useCallback(() => {
      resetState();
      // router.push(paths.product.root);
  }, [resetState]);

  const onSetDeliveryAddress = useCallback(
    (deliveryId: number, deliveryAddress: string) => {
       setField('deliveryId', deliveryId);
       setField('deliveryAddress', deliveryAddress);
       console.log(`Set address to ${deliveryAddress}`);
    },
    [setField]
  );

  const onSetOrderReference = useCallback(
    (orderReference: string) => {
       setField('orderReference', orderReference);
    },
    [setField]
  );
  const memoizedValue = useMemo(
    () => ({
      ...state,
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      //
      completed,
      //
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onSetDeliveryAddress,
      onSetOrderReference,
    }),
    [
      state,
      onReset,
      canReset,
      setField,
      completed,
      setState,
      onAddToCart,
      onDeleteCart,
      onDecreaseQuantity,
      onIncreaseQuantity,
      onSetDeliveryAddress,
      onSetOrderReference,
    ]
  );

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
}
