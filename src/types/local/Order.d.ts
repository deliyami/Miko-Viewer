import { CommonProps } from '../share/common';

export interface Order extends CommonProps {
  map: any;
  userId: number;
  total_price: number;
  address: string;
  state: boolean;
  size: string;
  color: string;
  quantity: number;
  products: Array;
  length: number;
}

export type CreateOrderData = Pick<Order, 'userId' | 'total_price' | 'address' | 'state' | 'products' | 'color' | 'size' | 'quantity' | 'length'>;
