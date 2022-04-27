import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { Product } from '@src/types/share';
import { FC, useState } from 'react';
import CartButton from './cart/CartButton';
import OptionSelect from './OptionSelect';

const ProductDetail: FC<{ item: Product }> = ({ item }) => {
  // console.log(item);
  const { data: userData } = useUser();
  // const [cart, setCart] = useState();
  const { data: carts } = useSingleLaravel('/cart_products', userData?.id, {});
  // console.log(carts);
  // alert(carts.length);
  // alert(JSON.stringify(carts));
  const [cartCount, setCartCount] = useState(carts?.length);
  // if (carts) {
  //   setCartCount(carts.length);
  // }
  // console.log(user);
  // const URL_PRODUCTS = `/cart_products`;
  // useEffect(() => {
  //   if (user.data) {
  //     getSingleLaravelData(URL_PRODUCTS).then(response => setCartCount(response.data.length));
  //   }
  //   // console.log(cart);
  // }, [cartCount]);

  // const [options, setOptions] = useState({""});
  // const [child, setChild] = useState(0);

  return (
    <Flex justifyContent={'center'}>
      <Flex>
        <Box w={'500px'} h={'500px'}>
          <Image boxSize={'full'} alt="productImage" src={`${IMAGE_DOMAIN}product_image/${item.image}`}></Image>
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
