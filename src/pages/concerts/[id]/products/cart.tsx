/* eslint-disable eqeqeq */
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const cart = () => {
  return (
    <AsyncBoundary>
      <Carts />
    </AsyncBoundary>
  );
};

export default cart;

cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
