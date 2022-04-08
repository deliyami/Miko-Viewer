import { CommonProps } from './common';

export interface Product extends CommonProps {
  concertId: number;
  price: number;
  name: string;
  detail?: string;
  image: string;
}

export type CreateProductData = Pick<Product, 'concertId' | 'price' | 'name' | 'detail' | 'image'>;
