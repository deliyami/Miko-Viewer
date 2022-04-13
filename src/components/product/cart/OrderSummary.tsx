import { Button, Flex, Text } from '@chakra-ui/react';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { useRouter } from 'next/router';

const OrderSummary = ({ data }) => {
  const router = useRouter();
  // const item = JSON.parse(rawItem);
  let cost = 0;
  data.map(item => {
    cost += item.products[0].price * item.quantity;
    return 1;
  });
  // setTotalCoast(cost);

  function goPay() {
    router.push(`/concerts/${router.query.id}/products/purchase`);
  }
  // console.log(data.ma);
  return (
    <Flex flexDirection={'column'} justifyContent={'space-between'} h={'70%'} w="30%" p={'2%'} mt={'6.5%'} border="1px" borderColor={'gray.300'} rounded="lg">
      <Text fontWeight={'bold'} fontSize={'4xl'} textAlign="center">
        Order Summary
      </Text>
      <Flex flexDirection={'column'} color={'gray'} fontSize={'xl'} textAlign="center">
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>商品代金合計</Text>
          <Text> ¥{cost}</Text>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>内消費税</Text>
          <Text>¥{cost / 10}</Text>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text>送料</Text>
          <Text>¥300</Text>
        </Flex>
      </Flex>
      <hr></hr>
      <Flex fontSize={'2xl'} justifyContent={'space-between'}>
        <Text>ご注文合計</Text>
        <Text>¥{cost + 300}</Text>
      </Flex>
      <Button onClick={goPay} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        <Text fontSize={'xl'}>注文する</Text>
      </Button>
    </Flex>
  );
};
export default OrderSummary;
