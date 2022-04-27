import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { ReactElement } from 'react';

const Cart = () => {
  function setTabIndex() {
    return 1;
  }
  const { data: userData } = useUser();

  const carts = useSingleLaravel('/cart_products', userData?.id, {});
  return (
    <AsyncBoundary>
      <Carts setTabIndex={setTabIndex} cart={carts?.data} />
    </AsyncBoundary>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};

export default Cart;
