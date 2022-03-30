import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { useState } from 'react';
import CartButton from './cart/CartButton';
import OptionSelect from './OptionSelect';

const ProductDetail = ({ item }) => {
  console.log(item);
  const [cartCount, setCartCount] = useState(0);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  // const [options, setOptions] = useState({""});.ㅋ
  // const [child, setChild] = useState(0);

  return (
    <Flex justifyContent={'center'}>
      <Flex>
        <Box w={500} h={500}>
          <Image boxSize={'full'} src={`${S3_URL}products/${item.image}`}></Image>
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
            color={color}
            size={size}
            count={count}
            setColor={setColor}
            setSize={setSize}
            setCount={setCount}
            cartCount={cartCount}
            setCartCount={setCartCount}
          ></OptionSelect>
        </Flex>
      </Flex>
      <Flex alignItems={'end'}>
        <CartButton item={item} count={count} color={color} size={size} cartCount={cartCount}></CartButton>
      </Flex>
    </Flex>
  );
};
export default ProductDetail;
