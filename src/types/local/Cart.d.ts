import { CommonProps } from '../share/common';

export interface Cart extends CommonProps {
  map: any;
  length: SetStateAction<undefined>;
  userId: number;
  productId: number;
  size: string;
  color: string;
  quantity: number;
  products: Array;
}

export type CreateCartData = Pick<Cart, 'userId' | 'productId' | 'size' | 'color' | 'quantity' | 'products'>;
