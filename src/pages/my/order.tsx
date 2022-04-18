import { Flex, Text } from '@chakra-ui/react';
import OrderHistory from '@src/components/product/pay/OrderHistory';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { ReactElement } from 'react';

// const order = () => {
//   return <Orders></Orders>;
// };
// export default order;
// type Data = {
//   data?: Pagination<Order>;
// };

// export const getServerSideProps: GetServerSideProps<Data> = async () => {
//   // const user = useUser();
//   // const ORDER_URL = `/orders/${user.data.id}`;
//   const result = await getSingleLaravelData<Pagination<Order>>(ORDER_URL);
//   return {
//     props: {
//       data: result?.data ?? null,
//     },
//   };
// };

export default function Orders() {
  // console.log(data);
  const { data: userData } = useUser();
  const orders = useSingleLaravel('/orders', userData?.id, {});
  return (
    <Flex flexDir={'column'} h="70vh">
      <Text ml={'15%'} fontSize={'3xl'}>
        ご注文履歴
      </Text>
      {/* {data.map((item, key) => {
        return <Text key={key}>{item.id}</Text>;
      })} */}
      {orders ? <OrderHistory orders={orders}></OrderHistory> : <Text>ご注文履歴がおりません。</Text>}
    </Flex>
  );
}

Orders.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
