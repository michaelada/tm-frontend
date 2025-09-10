import type { IProduct } from './product.interface';

export interface IUser {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  isActive: boolean;
  name: string;
  favourites?: IProduct[];
}

export type IDeliveryAddress = {
  name?: string;
  address: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  county: string;
};


export interface ICustomer {
  id: number;
  name: string;
  users?: IUser[];
  accountCode: string;
  email: string;
  deliveryAddresses: IDeliveryAddress[];
  billingEmail?: string;
  billingPhone?: string;
  billingCompany?: string;
  billingPostcode?: string;
  billingAddress1?: string;
  billingAddress2?: string;
  billingAddress3?: string;
  billingAddress4?: string;
  billingCity?: string;
  isActive?: boolean;
}
