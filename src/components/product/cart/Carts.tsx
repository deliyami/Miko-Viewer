import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { getPageLaravelData } from '@src/helper';
import { useUser } from '@src/state/swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const Carts = ({ setTabIndex }) => {
  const router = useRouter();
  const user = useUser();
  const [data, setData] = useState({});
  const URL_PRODUCTS = `/cart_products/${user.data.id}`;
  // console.log("ue");
  useEffect(() => {
    getPageLaravelData(URL_PRODUCTS).then(response => setData(response.data));
  }, [URL_PRODUCTS]);
  // if (data) console.log(data);
  // console.log(data.length);
  return (
    <Flex justifyContent={'center'} mt={'5%'} background="mintcream" flexDirection={'column'} h={'70vh'}>
      {data.length === undefined ? (
        <Flex flexDirection={'column'}>
          <Flex mt="10%" justifyContent={'center'}>
            <Text fontSize={'4xl'}>ショッピングカート</Text>
          </Flex>
          <Text p={'5%'} mt={'10%'} textAlign={'center'} color={'gray.300'} fontSize={'4xl'} cursor="default">
            ショッピングカートに何も入っていません。
          </Text>
          <Button w={'20%'} onClick={() => router.push(`/concerts/${1}/products`)} alignSelf={'center'} colorScheme={'blue'}>
            グッズリストに戻る
          </Button>
        </Flex>
      ) : (
        <Box h={'100%'}>
          <Flex h="100%" border="2px" justifyContent={'space-around'} borderColor={'green.100'} rounded="xl">
            <Flex w={'50%'} flexDir={'column'} alignItems="center" p={'2%'}>
              <Text fontSize={'3xl'} color="green.600" fontWeight={'bold'}>
                ショッピングカート({data.length})
              </Text>
              {/* <Flex flexDirection={'column'} border="solid" w={'80%'} justifyContent={'space-evenly'}> */}
              {/* <Flex border={'solid'} mt="10%" mb={'4%'} justifyContent={'center'}> */}
              <CartItem data={data} setData={setData}></CartItem>
            </Flex>
            {/* </Flex> */}
            {/* </Flex> */}
            <OrderSummary setTabIndex={setTabIndex} data={data}></OrderSummary>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
export default Carts;
