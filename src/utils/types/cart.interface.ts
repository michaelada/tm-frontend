import { IProduct } from './product.interface';

export interface ICart {
  id: number;
  username: number;
  createdAt: Date;
  updatedAt: Date;
  Cartitems: ICartItem[];
}

export interface ICartItem {
  id: number;
  product: IProduct;
  amount: number;
  quantity: number;
}
