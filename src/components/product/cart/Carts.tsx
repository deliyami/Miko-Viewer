import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper';
import { useUser } from '@src/state/swr';
import { Cart } from '@src/types/local';
import { Pagination } from '@src/types/share/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const Carts = ({ data, setData }) => {
  // console.log(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // console.log('data' + cart.data);
  // const [selectedCount, setSelectedCount] = useState(query.count);
  // console.log(data.length);
  const router = useRouter();
  return (
    <Flex justifyContent={'space-between'} flexDirection={'column'} h={'80vh'}>
      {data===undefined ? (
        <Flex flexDirection={'column'}>
          <Flex mt="3%" justifyContent={'center'}>
            <Text fontSize={'4xl'}>ショッピングカート</Text>
          </Flex>
          <Text p={'5%'} mt={'10%'} textAlign={'center'} color={'gray.300'} fontSize={'4xl'} cursor="default">
            ショッピングカートに何も入っていません。
          </Text>
          <Button w={'20%'} onClick={() => router.push(`/concerts/${router.query.id}/products`)} alignSelf={'center'} colorScheme={'blue'}>
            グッズリストに戻る
          </Button>
        </Flex>
      ) : (
        <Box h={'100%'} p={'2%'}>
          <Flex h="100%" border="1px" justifyContent={'space-around'} borderColor={'gray.300'} rounded="xl">
            <Flex flexDirection={'column'} pb={'3%'} justifyContent={'space-evenly'}>
              <Flex mt="3%" mb={'4%'} justifyContent={'center'}>
                <Text fontSize={'3xl'}>ショッピングカート({data.length})</Text>
              </Flex>
              <CartItem data={data} setData={setData}></CartItem>
            </Flex>
            <OrderSummary data={data}></OrderSummary>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
export default Carts;
