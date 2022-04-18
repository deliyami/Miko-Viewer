import { Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Order } from '@src/types/local';
import { FC } from 'react';

const OrderHistory: FC<{ orders: Order }> = ({ orders }) => {
  console.log(orders);
  return (
    <Flex mt={'3%'} background={'blue.50'} alignSelf={'center'} w="70%" justifyContent="center" p={'3%'} h="100%">
      <TableContainer w={'100%'}>
        <Table variant={'unstyled'} background={'blue.50'}>
          <Thead>
            <Tr>
              <Th>受付番号</Th>
              <Th>注文日</Th>
              <Th>商品名</Th>
              <Th>お支払い合計</Th>
              <Th>出荷状況</Th>
              <Th>注文詳細</Th>
            </Tr>
          </Thead>
          <Tbody background={'white'}>
            {orders.map((item, key: number) => {
              return (
                <Tr border={'1px'} borderColor={'blackAlpha.200'} key={key}>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
                    {item.id}
                  </Td>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}></Td>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
                    {item.products[0].name}
                  </Td>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}></Td>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
                    キャンセル
                  </Td>
                  <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
                    <Button background={'orange'} color="white">
                      注文詳細
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default OrderHistory;
