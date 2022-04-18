import { Flex, Text } from '@chakra-ui/react';
import { Cart } from '@src/types/local';

type CartType = {
  cart: Cart;
};

const Carts = ({ cart }: CartType) => {
  // alert(JSON.stringify(cart.data.map()));
  // cart.data.map((item, key) => {
  //   alert(item.id);
  // });
  return (
    <Flex>
      {cart.data?.map((item, key) => {
        return (
          <Flex key={key} flexDir={'column'}>
            <Text>{item.color}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.size}</Text>
            <Text>{item.products[0].name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default Carts;
