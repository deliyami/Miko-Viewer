import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
// import Carts from '@src/components/product/cart/Carts';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const cart = () => {
  return <AsyncBoundary>{/* <Carts setTabIndex="1" /> */}</AsyncBoundary>;
};

cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};

export default cart;
