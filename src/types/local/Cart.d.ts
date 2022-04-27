import { CommonProps } from '../share/common';

export interface Cart extends CommonProps {
  map: any;
  length: SetStateAction<undefined>;
  userId: number;
  product_id: number;
  size: string;
  color: string;
  quantity: number;
  products: Array;
}

export type CreateCartData = Pick<Cart, 'userId' | 'product_id' | 'size' | 'color' | 'quantity' | 'products'>;
