import axios, { endpoints } from '../../../utils/axios';
import { ICartItem } from '../../../utils/types';

/** **************************************
 * Add to Cart
 *************************************** */

export type AddToCartParams = {
  productid: number;
  quantity: number;
  price: string;
};

export interface AddToCartResponse extends ICartItem {}

export const addToCart = async ({
  productid,
  quantity,
  price,
}: AddToCartParams) => {
  try {
    const params = { productid, quantity, price };

    return await axios.post<AddToCartResponse>(endpoints.cart.add, params);
  } catch (error) {
    console.error('Error during add to cart:', error);
    throw error;
  }
};

/** **************************************
 * Remove from Cart
 *************************************** */

export type RemoveFromCartParams = {
  cartItemId: number;
};

export interface RemoveFromCartResponse {}

export const removeFromCart = async ({ cartItemId,
}: RemoveFromCartParams): Promise<void> => {
  try {
    const res = await axios.delete<RemoveFromCartResponse>(endpoints.cart.delete(cartItemId));
  } catch (error) {
    console.error('Error during remove from cart:', error);
    throw error;
  }
};

export type SetQuantityParams = {
  cartItemId: number;
  quantity: number;
};

export interface SetQuantityResponse {}

export const setQuantity = async ({
  cartItemId,
  quantity,
}: SetQuantityParams) => {
  try {
    const params = { cartItemId, quantity };

    return await axios.post<SetQuantityResponse>(endpoints.cart.quantity(cartItemId), params);
  } catch (error) {
    console.error('Error setting new quantity on cart:', error);
    throw error;
  }
};
