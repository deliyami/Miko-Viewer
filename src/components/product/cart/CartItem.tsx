import { CloseButton, Flex, Image, Tag, TagLabel, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { Cart } from '@src/types/local';
import axios from 'axios';
import { FC } from 'react';

const CartItem: FC<{ carts: Cart[] }> = ({ carts }) => {
  // console.log(Array(data)[0][0]);
  // console.log(typeof data);
  // console.log([...Array(data)]);
  // [...Array(data)][0].map((item, key) => {
  //   console.log(item);
  // });
  // console.log(data.map());
  // data.map(item => console.log(item));
  // console.log(data);
  // const [quantity, setQuantity] = useState(0);
  // function onSelectChange(e) {
  //   setQuantity(e.target.value);
  // }
  function deleteCart(cartId: number) {
    axios
      .delete(`${LARAVEL_URL}/cart_products/${cartId}`)
      // .then(response => setData(response.data))
      .catch(error => console.log(error));
  }
  // let item = null;
  // if (query.item) {
  //   item = JSON.parse(query.item);
  // }
  // console.log(data[0].products.data);
  return (
    <Flex background={'whiteAlpha.600'} rounded="2xl" p={'1%'} flexDir={'column'} mt="8%" alignSelf="center" w="100%" h="100%" overflow={'auto'}>
      {carts
        ? carts.map((item, key) => {
            return (
              <Flex h={'35%'} key={key} mb="7%" justifyContent={'space-evenly'} w={'100%'}>
                <Image w="20%" h="100%" src={`${IMAGE_DOMAIN}product_image/${item.products[0].image}`} rounded={'30%'} alt="productImage"></Image>
                <Flex m={'2%'} flexDirection={'column'}>
                  <Text fontSize={'xl'}>{item.products[0].name}</Text>
                  <Tag
                    mt={'4%'}
                    alignSelf={'end'}
                    justifyContent={'center'}
                    w={'25%'}
                    textAlign="center"
                    colorScheme={`${item.color.toLowerCase()}`}
                    color={`${item.color.toLowerCase()}.500`}
                  >
                    {/* <TagLeftIcon boxSize={'12px'}>¥</TagLeftIcon> */}
                    <TagLabel textAlign={'center'} fontSize={'md'}>
                      {item.color}
                    </TagLabel>
                  </Tag>
                  <Tag mt={'2%'} justifyContent={'center'} alignSelf={'end'} w={'10%'} background="blackAlpha.300" color={'blackAlpha.700'}>
                    {/* <TagLeftIcon boxSize={'12px'}>¥</TagLeftIcon> */}
                    <TagLabel fontWeight={'bold'} fontSize={'md'}>
                      {item.size}
                    </TagLabel>
                  </Tag>
                </Flex>
                <Flex w={'13%'} ml={'5%'} mr={'5%'} justifyContent={'center'} alignItems="center">
                  {/* <Select defaultValue={item.quantity} value={quantity} onChange={onSelectChange}>
                    {[...Array(item.products[0].stock)].map((value, index) => {
                      return <option key={index}>{index + 1}</option>;
                    })}
                  </Select> */}
                  <Text fontSize={'lg'} fontWeight="bold">
                    {item.quantity}点
                  </Text>
                </Flex>
                <Flex w={'10%'} justifyContent={'center'} alignItems="center">
                  {/* <Text as={'mark'} color={'green.400'}>
                    ¥{item.products[0].price * item.quantity}
                  </Text> */}
                  <Tag colorScheme={'green'} variant="outline">
                    {/* <TagLeftIcon boxSize={'12px'}>¥</TagLeftIcon> */}
                    <TagLabel fontSize={'md'}>¥{item.products[0].price * item.quantity}</TagLabel>
                  </Tag>
                </Flex>
                <Flex ml={'3%'} justifyContent={'center'} alignItems="center">
                  <CloseButton color={'red.300'} onClick={() => deleteCart(item.id)}></CloseButton>
                </Flex>
              </Flex>
            );
          })
        : null}
    </Flex>
  );
};
export default CartItem;
