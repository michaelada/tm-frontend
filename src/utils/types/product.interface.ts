export interface IProductGroupFilters {
  categoryId?: string;
  subcategoryId?: string;
  deep?: boolean;
  search?: string;
  newin?: number;
  instock?: number;
}

export interface ICategoryFilters {
  search?: string;
}  

export interface ICustomerFilters  {
  search?: string;
}  

export interface IProductFilters {
  status?: string;
  search?: string;
  newin?: string;
  instock?: string;
}

export interface IBrand {
  id: number;
  name?: string;
  image?: string;
}

export interface ICategory {
  id: number;
  name?: string;
  image?: string;
  children?: ISubCategory[];
  parent?: number;
}

export interface IProductCategory {
  id: number;
  name?: string;
  image?: string;
  parent?: number;
  productId: number;
}

export interface ISubCategory {
  id: number;
  name?: string;
}

export interface IProductGroup {
  id: number;
  name: string;
  description?: string;
  numOptions?: number;
  image: string;
  created?: Date;
  modified?: Date;
  categories?: ICategory[];
  brand?: IBrand;
  products?: IProduct[];
}

export interface IAttributeType {
  id?: number;
  name?: string;
}

export interface IProductAttribute {
  id?: number;
  attributeType?: IAttributeType;
  attributeValue?: string;
  product?: IProduct;
}

export interface IProductImage {
  id?: number;
  image?: string;
  isDefault?: boolean;
}

export interface IProduct {
  vat: number;
  id?: number;
  sku?: string;
  name?: string;
  status?: string;
  group?: string;
  description?: string;
  minQuantity?: number;
  groupOfQuantity?: number;
  newIn?: boolean;
  inStock?: boolean;
  individual_barcode?: string;
  boxed_barcode?: string;
  product_images?: IProductImage[];
  created?: Date;
  modified?: Date;
  isFavourite?: boolean;
  regularPrice: number;
  product_group?: IProductGroup;
  discontinued?: boolean;
  product_group_name?: string;
}

export interface IOrderTotal {
  price: number;
  originalPrice: number;
  vat: number;
}

export interface IOrderItem {
  id: number;
  discountPerc: string;
  lineItemCode: string;
  lineItemDesc: string;
  lineItemPrice: number;
  lineItemQty: number;
  lineItemUnit: string;
  lineItemValue: number;
  lineType: string;
  nettPrice: number;
  salesOrderID: number;
  salesOrderLineID: number;
  vatCode: string;
  vatPrice: number;
  productId: number;
}

export interface IOrder {
  id?: number;
  customerId?: number;
  orderId?: number;
  orderDate?: string;
  orderReference?: string;
  source?: string;
  address?: string;
  deliveryAddress?: string;
  orderTakenBy?: string;
  orderType?: string;
  branchName?: string;
  originalOrder: object;
  numItems:number;
  orderTotal:number;
  orderTax:number;
  lineItems: IOrderItem[];
  orderNo: string;
  accountCode?: string;
  status?: string;
}


