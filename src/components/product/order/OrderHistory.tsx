import { Button, Flex, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text, useDisclosure } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Order } from '@src/types/local';
import { FC } from 'react';
import OrderDetail from './OrderDetail';

const OrderHistory: FC<{ orders: Order }> = ({ orders }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // alert(JSON.stringify(orders.data));
  // const enterTicketData = useRecoilValue(enterTicketDataState);
  // alert(orders);
  return (
    // <Flex mt={'3%'} background={'blue.50'} alignSelf={'center'} w="65%" justifyContent="center" pb={'3%'}>
    //   <TableContainer>
    //     <Table variant={'unstyled'} background={'blue.50'}>
    //       <Thead>
    //         <Tr>
    //           <Th textAlign={'center'}>受付番号</Th>
    //           <Th textAlign={'center'}>注文日</Th>
    //           <Th textAlign={'center'}>商品名</Th>
    //           <Th textAlign={'center'}>お支払い合計</Th>
    //           <Th textAlign={'center'}>出荷状況</Th>
    //           <Th textAlign={'center'}>注文詳細</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody background={'white'}>
    //         {orders.map((item: Order, key: number) => {
    //           return (
    //             <Tr border={'1px'} borderColor={'blackAlpha.200'} key={key}>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 {item.id}
    //               </Td>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 {convertDate(item.createdAt, 'YMD')}
    //               </Td>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 {item.products[0].name}
    //               </Td>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 {item.total_price}
    //               </Td>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 キャンセル
    //               </Td>
    //               <Td textAlign={'center'} borderRight={'1px'} borderColor={'blackAlpha.200'}>
    //                 <Button background={'orange'} color="white">
    //                   注文詳細
    //                 </Button>
    //               </Td>
    //             </Tr>
    //           );
    //         })}
    //       </Tbody>
    //     </Table>
    //   </TableContainer>
    // </Flex>
    <Flex mt={'35px'} flexDir={'column'} w="100%" alignSelf={'center'}>
      <Flex justifyContent={'space-between'} w={'90%'} mb={'35px'} alignSelf={'center'}>
        <Tag ml={'23%'} size={'lg'} variant="outline" colorScheme={'purple'}>
          商品情報
        </Tag>
        <Tag mr={'4%'} size={'lg'} variant="outline" colorScheme={'green'}>
          注文日
        </Tag>
      </Flex>
      <Flex w="90%" alignSelf={'center'} flexDir={'column'} h="54vh" overflow={'auto'}>
        {orders?.map((order: Order, key: number) => {
          return (
            <Flex justifyContent={'center'} p={'1%'} key={key} borderBottom={'1px'} borderColor="blackAlpha.100">
              <Flex
                onClick={() => {
                  onOpen();
                }}
                cursor={'pointer'}
                justifyContent={'center'}
                background={'gray.100'}
                w="100px"
                h={'100px'}
                p={'1%'}
                borderRadius={'2xl'}
              >
                <Image borderRadius={'md'} w={'100%'} src={`${IMAGE_DOMAIN}product_image/${order.products[0].image}`} alt="productIamge"></Image>
              </Flex>
              <Flex ml="15px" w={'60%'} flexDir={'column'} justifyContent="center">
                <Text onClick={onOpen} cursor={'pointer'} width={'70%'}>
                  {order.products[0].name}
                </Text>
                <Link style={{ textDecoration: 'none' }} href={`/concerts/${order.products[0].concert_id}`}>
                  <Text cursor={'pointer'} fontWeight={'bold'} fontSize="lg" color={'blackAlpha.500'} ml={'10px'}>
                    {order.products[0].concert_title}
                  </Text>
                </Link>
              </Flex>
              <Flex justifyContent="end" w="20%" alignItems={'center'}>
                {convertDate(order.createdAt, 'YMD')}
              </Flex>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="10%" />
                <ModalContent>
                  <ModalHeader textAlign={'center'} fontSize={'2xl'}>
                    商品詳細
                  </ModalHeader>
                  <ModalBody>
                    <OrderDetail order={order}></OrderDetail>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="orange" mr={3} onClick={onClose}>
                      閉じる
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default OrderHistory;
