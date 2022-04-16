import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { getDataFromLaravel } from '@src/helper';
import { useUser } from '@src/state/swr';
import { Cart } from '@src/types/local';
import { useEffect, useState } from 'react';
import CartButton from './cart/CartButton';
import OptionSelect from './OptionSelect';

const ProductDetail = ({ item }) => {
  // console.log(item);
  const user = useUser();
  const [cart, setCart] = useState();
  const [cartCount, setCartCount] = useState(cart);
  // console.log(user);
  const URL_PRODUCTS = `/cart_products/${user.data.id}`;
  useEffect(() => {
    if (user.data) {
      getDataFromLaravel<Cart>(URL_PRODUCTS).then(response => setCartCount(response.data.length));
    }
    // console.log(cart);
  }, [cartCount]);

  // const [options, setOptions] = useState({""});
  // const [child, setChild] = useState(0);

  return (
    <Flex justifyContent={'center'}>
      <Flex>
        <Box w={500} h={500}>
          <Image boxSize={'full'} alt="productImage" src={`${IMAGE_DOMAIN}products/${item.image}`}></Image>
        </Box>
      </Flex>
      <Flex mt={'2.5%'} ml={'2%'} flexDirection={'column'} mr={'8%'} alignItems={'end'}>
        <Flex flexDirection={'column'} alignItems="end">
          <Text fontSize={30}>{item.name}</Text>
          <Text fontWeight="bold" fontSize={35}>
            ¥{item.price}
          </Text>
        </Flex>
        <Flex mt={'3%'} w={'100%'} h={'50%'} justifyContent={'center'}>
          <OptionSelect
            color={item.color}
            size={item.size}
            stock={item.stock}
            // setColor={setColor}
            // setSize={setSize}
            // setStock={setStock}
            cartCount={cartCount}
            setCartCount={setCartCount}
          ></OptionSelect>
        </Flex>
      </Flex>
      <Flex alignItems={'end'}>
        <CartButton cartCount={cartCount}></CartButton>
      </Flex>
    </Flex>
  );
};
export default ProductDetail;
