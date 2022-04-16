import { Flex, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import OrderHistory from '@src/components/product/pay/OrderHistory';
import { getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { Order } from '@src/types/local';
import { Pagination } from '@src/types/share/common';
import { ReactElement, useEffect, useState } from 'react';

export default function Orders() {
  const user = useUser();
  const [data, setData] = useState({});
  const ORDER_URL = `/orders/${user.data.id}`;
  useEffect(() => {
    getDataFromLaravel<Pagination<Order>>(ORDER_URL).then(response => console.log(response));
  }, []);
  return (
    <Flex flexDir={'column'} h="70vh">
      <Text ml={'15%'} fontSize={'3xl'}>
        ご注文履歴
      </Text>
      {data.length === undefined ? <Text>ご注文履歴がおりません。</Text> : <OrderHistory data={data}></OrderHistory>}
    </Flex>
  );
}

Orders.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
