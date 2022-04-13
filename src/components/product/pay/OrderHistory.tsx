import { Flex, Text } from '@chakra-ui/react';
import { Order } from '@src/types/local';
import { Pagination } from '@src/types/share/common';
import { FC } from 'react';

const OrderHistory: FC<{ data: Pagination<Order> }> = ({ data }) => {
  console.log(data);
  return (
    <Flex>
      <Text>order</Text>
      {data.map((item, key) => {
        return <Text key={key}>{item.id}</Text>;
      })}
    </Flex>
  );
};
export default OrderHistory;
