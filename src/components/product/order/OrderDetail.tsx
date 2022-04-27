import { Flex, Heading, Image, Tag, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper/convertDate';
import { useUser } from '@src/state/swr';
import { Order } from '@src/types/local';

type OrderDetailType = {
  order: Order;
};

export default function OrderDetail({ order }: OrderDetailType) {
  const { data: userData } = useUser();
  // eslint-disable-next-line no-restricted-globals
  // alert(JSON.stringify(order));
  return (
    <Flex flexDir={'column'} h="45vh" overflow={'auto'} scrollPadding="5%">
      <Text border={'1px'} p="1%" borderRadius="xl" w={'30%'} textAlign="center">
        注文番号 - <span style={{ fontWeight: 'bold' }}>{order.id}</span>
      </Text>
      <Flex alignSelf={'center'} my="5%" justifyContent={'center'} background={'gray.100'} w="200px" h={'200px'} p={'2%'} borderRadius={'2xl'}>
        <Image borderRadius={'md'} w={'100%'} src={`${IMAGE_DOMAIN}product_image/${order.products[0].image}`} alt="productIamge"></Image>
      </Flex>
      <Text alignSelf={'center'}>{order.products[0].name}</Text>
      <Text color={'blackAlpha.500'} fontSize="xl" alignSelf={'center'}>
        {order.products[0].concert_title}
      </Text>
      <Flex alignSelf={'end'} my="1%" w="30%" justifyContent={'end'}>
        <Tag variant={'outline'} mr="5%" colorScheme={`${order.color.toLowerCase()}`}>
          color
        </Tag>
        <Text>{order.color}</Text>
      </Flex>
      <Flex alignSelf={'end'} my="1%" w="30%" justifyContent={'end'}>
        <Tag variant={'outline'} mr="5%" colorScheme={'telegram'}>
          size
        </Tag>
        <Text>{order.size}</Text>
      </Flex>

      <Heading mt={'7%'} fontSize={'xl'}>
        決済内訳
      </Heading>
      <Flex flexDir={'column'} my="5%">
        <Flex borderTop={'2px'} borderBottom="1px" borderBottomColor={'blackAlpha.200'} bg="blackAlpha.50" h="50px" alignItems={'center'} justifyContent="space-around">
          <Text fontSize={'sm'} fontWeight="bold">
            お支払い総額
          </Text>
          <Text fontSize={'lg'} color="#EB2721">
            {order.total_price}コイン
          </Text>
        </Flex>
        <Flex my={'3%'} alignItems={'center'} justifyContent="space-around">
          <Text w={'140px'} textAlign="center" fontSize={'sm'}>
            商品価額
          </Text>
          <Text w={'170px'} textAlign="center" fontSize={'sm'}>
            {order.total_price - 300}コイン
          </Text>
        </Flex>
        <Flex pb="3%" alignItems={'center'} justifyContent="space-around" borderBottom={'1px'} borderBottomColor={'blackAlpha.200'}>
          <Text w={'140px'} textAlign="center" fontSize={'sm'}>
            配送料
          </Text>
          <Text w={'170px'} textAlign="center" fontSize={'sm'}>
            300コイン
          </Text>
        </Flex>
        <Flex my={'3%'} borderBottomColor={'blackAlpha.200'} justifyContent="space-around">
          <Text w={'144px'} textAlign="center" fontSize={'sm'}>
            購入日
          </Text>
          <Text w={'170px'} textAlign="center" fontSize={'sm'}>
            {convertDate(order.createdAt, 'YMDHM')}
          </Text>
        </Flex>
        <Heading mt={'7%'} fontSize={'xl'}>
          お届け先
        </Heading>
        <Flex flexDir={'column'} my="5%">
          <Flex borderTop={'2px'} borderBottom="1px" borderBottomColor={'blackAlpha.200'} py="3%" alignItems={'center'} justifyContent="space-around">
            <Text w={'140px'} textAlign="center" fontSize={'sm'}>
              お名前
            </Text>
            <Text w={'170px'} textAlign="center" fontSize={'sm'}>
              {userData?.name}様
            </Text>
          </Flex>
          <Flex borderBottom="1px" borderBottomColor={'blackAlpha.200'} py="3%" alignItems={'center'} justifyContent="space-around">
            <Text w={'140px'} textAlign="center" fontSize={'sm'}>
              Email
            </Text>
            <Text w={'170px'} textAlign="center" fontSize={'sm'}>
              {userData?.email}
            </Text>
          </Flex>
          <Flex borderBottom="1px" borderBottomColor={'blackAlpha.200'} py="3%" alignItems={'center'} justifyContent="space-around">
            <Text w={'140px'} textAlign="center" fontSize={'sm'}>
              ご住所
            </Text>
            <Text w={'170px'} textAlign="center" fontSize={'sm'}>
              {order.address}
            </Text>
          </Flex>
          <Heading mt={'7%'} fontSize={'xl'}>
            決済情報
          </Heading>
          <Flex my="5%" borderTop={'2px'} borderBottom="1px" borderBottomColor={'blackAlpha.200'} py="3%" alignItems={'center'} justifyContent="space-around">
            <Text w={'140px'} textAlign="center" fontSize={'sm'}>
              お支払方法
            </Text>
            <Text color={'green.500'} w={'170px'} textAlign="center" fontSize={'sm'}>
              コイン
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
