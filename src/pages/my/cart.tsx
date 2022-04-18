/* eslint-disable eqeqeq */
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const cart = () => {
  return (
    <AsyncBoundary>
      {/* 필요할 때가 있고 없어도 될 때가 있음 */}
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
