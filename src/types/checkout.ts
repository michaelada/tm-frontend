import type { ICart, IProduct } from '../utils/types';

// ----------------------------------------------------------------------


export type ICheckoutItem = IProduct & {
id: number;
  price: number;
  quantity: number;
  subtotal?: number;
};

export type ICheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type ICheckoutState = {
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  totalItems: number;
  cart?: ICart;
  cartLoading: boolean;
  orderReference: string;
  deliveryId: number;
  deliveryAddress: string;
};

export type CartContextValue = ICheckoutState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<ICheckoutState>) => void;
  onUpdateField: (
    name: keyof ICheckoutState,
    updateValue: ICheckoutState[keyof ICheckoutState]
  ) => void;
  //
  completed: boolean;
  //
  onAddToCart: (newItem: { product: IProduct, quantity: number, price: string }) => void;
  onDeleteCart: (cartItemId: number) => void;
  //
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  //
  onSetDeliveryAddress: (deliveryId: number, deliveryAddress: string) => void;
  onSetOrderReference: (orderReference: string) => void;
  
  
};

