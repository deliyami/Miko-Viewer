import { CommonProps } from './common/common';

export interface Cart extends CommonProps {
  userId: number;
  productId: number;
  size: string;
  color: string;
  quantity: number;
}

export type CreateCartData = Pick<Cart, 'userId' | 'productId' | 'size' | 'color' | 'quantity'>;
