import { Button, Flex, Text } from '@chakra-ui/react';
import { Cart } from '@src/types/local';
import { useRouter } from 'next/router';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

type Type = {
  setTabIndex: Function;
  cart: Cart;
};

const Carts = ({ setTabIndex, cart }: Type) => {
  const router = useRouter();
  // const { data: userData } = useUser();
  // const [data, setData] = useState({});

  // const cart = useSingleLaravel('/cart_products', userData?.id, {});
  // const URL_PRODUCTS = `/cart_products/${user.data.id`;
  console.log('ue');
  // ar
  // useEffect(() => {
  //   getDataFromLaravel<Cart>(URL_PRODUCTS).then(response => setData(response.data));
  // }, [URL_PRODUCTS]);
  // if (data) console.log(data);
  // console.log(data.length);
  // console.log(cart);
  return (
    <Flex mt={'5%'} flexDirection={'column'} h={'70vh'}>
      {cart.length === 0 ? (
        <Flex flexDirection={'column'}>
          <Flex justifyContent={'center'}>
            <Text fontSize={'4xl'}>ショッピングカート</Text>
          </Flex>
          <Text my={'10%'} textAlign={'center'} color={'gray.300'} fontSize={'4xl'} cursor="default">
            ショッピングカートに何も入っていません。
          </Text>
          <Button w={'20%'} mt="5%" onClick={() => router.push(`/concerts/${1}/products`)} alignSelf={'center'} colorScheme={'blue'}>
            グッズリストに戻る
          </Button>
        </Flex>
      ) : (
        // <Box h={'100%'}>
        <Flex h="100%" border="2px" justifyContent={'space-around'} borderColor={'green.100'} rounded="xl">
          <Flex w={'50%'} flexDir={'column'} alignItems="center" p={'2%'}>
            <Text fontSize={'3xl'} color="green.600" fontWeight={'bold'}>
              ショッピングカート({cart.length})
            </Text>
            {/* <Flex flexDirection={'column'} border="solid" w={'80%'} justifyContent={'space-evenly'}> */}
            {/* <Flex border={'solid'} mt="10%" mb={'4%'} justifyContent={'center'}> */}
            <CartItem cart={cart}></CartItem>
          </Flex>
          {/* </Flex> */}
          {/* </Flex> */}
          <OrderSummary setTabIndex={setTabIndex} cart={cart}></OrderSummary>
        </Flex>
        // </Box>
      )}
    </Flex>
  );
};
export default Carts;
