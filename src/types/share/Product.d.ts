import { CommonProps } from './common';

export interface Product extends CommonProps {
  sort: any;
  concertId: number;
  price: number;
  name: string;
  detail?: string;
  image: string;
  stock: number;
  color: Array;
  size: Array;
}

export type CreateProductData = Pick<Product, 'concertId' | 'price' | 'name' | 'detail' | 'image' | 'stock' | 'color' | 'size'>;
