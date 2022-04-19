import { CommonProps } from '../share/common';

export interface Order extends CommonProps {
  map: any;
  userId: number;
  total_price: number;
  address: string;
  state: boolean;
}

export type CreateOrderData = Pick<Order, 'userId' | 'total_price' | 'address' | 'state'>;
