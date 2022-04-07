/* eslint-disable eqeqeq */
import Carts from '@src/components/product/cart/Carts';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const cart = () => {
  return <Carts></Carts>;
};
export default cart;

cart.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
