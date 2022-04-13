import { Flex, Text } from '@chakra-ui/react';
import OrderHistory from '@src/components/product/pay/OrderHistory';
import { getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { Order } from '@src/types/local';
import { Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';

// const order = () => {
//   return <Orders></Orders>;
// };
// export default order;
type Data = {
  data?: Pagination<Order>;
};

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const user = useUser();
  const ORDER_URL = `/orders/${user.data.id}`;
  const result = await getDataFromLaravel<Pagination<Order>>(ORDER_URL);
  return {
    props: {
      data: result?.data ?? null,
    },
  };
};

export default function Orders({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log(data);
  return (
    <Flex>
      <Text>order</Text>
      {/* {data.map((item, key) => {
        return <Text key={key}>{item.id}</Text>;
      })} */}
      <OrderHistory data={data}></OrderHistory>
    </Flex>
  );
}

Orders.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
