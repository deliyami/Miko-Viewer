import { CommonProps } from '../share/common';

export interface Cart extends CommonProps {
  length: SetStateAction<undefined>;
  userId: number;
  productId: number;
  size: string;
  color: string;
  quantity: number;
}

export type CreateCartData = Pick<Cart, 'userId' | 'productId' | 'size' | 'color' | 'quantity'>;
