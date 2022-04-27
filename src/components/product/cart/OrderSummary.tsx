import { Button, Flex, Text } from '@chakra-ui/react';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { Cart } from '@src/types/local';
import { useRouter } from 'next/router';

type OrderType = {
  cart: Cart;
  setTabIndex: Function;
};

const OrderSummary = ({ cart, setTabIndex }: OrderType) => {
  const router = useRouter();
  // const item = JSON.parse(rawItem);
  let cost = 0;
  cart.map((item: Cart) => {
    cost += item.products[0].price * item.quantity;
    return 1;
  });
  // setTotalCoast(cost);

  function goPay() {
    if (router.query.id) {
      setTabIndex(1);
    }
    router.push(`/concerts/${1}/products/purchase`);
  }
  // console.log(cart.ma);
  return (
    <Flex flexDirection={'column'} justifyContent={'space-between'} h={'70%'} w="28%" p={'2%'} mt={'6.5%'} border="2px" borderColor={'green.300'} borderRadius="3xl">
      <Text color="green.600" fontWeight={'bold'} fontSize={'3xl'} textAlign="center">
        Order Summary
      </Text>
      <Flex flexDirection={'column'} color={'gray'} fontSize={'xl'}>
        <Flex justifyContent={'space-between'}>
          <Text alignItems={'center'} mb={'4%'}>
            商品代金合計
          </Text>
          <Flex>
            <Text>{cost}</Text>
            &nbsp;
            <Text alignItems={'center'} h="60%" mt={'5px'} justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>内消費税</Text>
          <Flex>
            <Text>{cost / 10}</Text>
            &nbsp;
            <Text alignItems={'center'} h="60%" mt={'5px'} justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text>送料</Text>
          <Flex>
            <Text>300</Text>
            &nbsp;
            <Text alignItems={'center'} h="60%" mt={'5px'} justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <hr></hr>
      <Flex fontSize={'2xl'} justifyContent={'space-between'}>
        <Text>ご注文合計</Text>
        <Flex>
          <Text color={'#E74A45'}>{cost + 300}</Text>
          &nbsp;
          <Text alignItems={'center'} h="60%" mt={'5px'} justifyContent="center">
            <FaCoins color="#FFC300" />
          </Text>
        </Flex>
      </Flex>
      <Button onClick={goPay} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        <Text fontSize={'xl'}>注文する</Text>
      </Button>
    </Flex>
  );
};
export default OrderSummary;
