import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Image,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { Cart } from '@src/types/local';
import axios from 'axios';
import { FC, useRef } from 'react';
import BuyCart from './BuyCart';

// type CartType = {
//   cart: Cart;
// };

const Carts: FC<{ cart: Cart }> = ({ cart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  function onDelete(cartId: number) {
    axios
      .delete(`${LARAVEL_URL}/cart_products/${cartId}`)
      .then(onClose)
      .catch(error => console.log(error));
  }

  return (
    <Flex flexDir={'column'} alignItems="center">
      {cart.length !== 0 ? (
        cart?.map((item: Cart, key: number) => {
          return (
            <Flex my={'20px'} key={key} flexDir={'column'} w="95%" p={'15px'} shadow={'xl'} borderRadius="3xl">
              <CloseButton onClick={onOpen} color={'red.300'} alignSelf={'end'} size={'sm'}></CloseButton>
              <Flex justifyContent="space-between">
                <Box w={'100px'} h="100px" bg="blackAlpha.200" borderRadius="2xl">
                  <Image boxSize={'full'} borderRadius="2xl" p="6px" src={`${IMAGE_DOMAIN}product_image/${item.products[0].image}`} alt="productImage"></Image>
                </Box>
                <Flex flexDir={'column'} justifyContent={'space-around'} alignItems="end">
                  <Text textAlign={'right'} fontWeight="semibold">
                    {item.products[0].name}
                  </Text>
                  <Flex alignItems={'center'} mt="2%">
                    <Text>{item.products[0].price}&nbsp;</Text>
                    <FaCoins color="#FFC300"></FaCoins>
                  </Flex>
                  <Tag mt={'2%'} justifyContent={'center'} textAlign="center" colorScheme={`${item.color.toLowerCase()}`} color={`${item.color.toLowerCase()}.500`}>
                    <TagLabel textAlign={'center'} fontSize={'xs'}>
                      {item.color}
                    </TagLabel>
                  </Tag>
                  <Tag mt={'1%'} justifyContent={'center'} variant="outline" alignSelf={'end'} color={'blackAlpha.700'}>
                    <TagLabel fontWeight={'bold'} fontSize={'xs'}>
                      {item.size}
                    </TagLabel>
                  </Tag>
                  <Divider h={'15px'}></Divider>
                  <Text fontSize={'sm'} mt={'10px'}>
                    ({item.quantity}点&nbsp;X&nbsp;{item.products[0].price})
                  </Text>
                  <Flex mt={'5px'} fontSize={'xl'} alignItems={'center'}>
                    <Text mr={'5px'} fontSize={'md'}>
                      小計
                    </Text>
                    <Text color={'#E74A45'} fontWeight="bold">
                      {item.products[0].price * item.quantity}&nbsp;
                    </Text>
                    <FaCoins color="#FFC300"></FaCoins>
                  </Flex>
                </Flex>
              </Flex>
              <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogCloseButton />
                  <AlertDialogHeader>削除</AlertDialogHeader>
                  <AlertDialogBody textAlign={'center'} p={'25px'} fontSize={'xl'}>
                    ショッピングカートから削除します。
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      キャンセル
                    </Button>
                    <Button onClick={() => onDelete(item.id)} colorScheme="red" ml={3}>
                      削除
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>
          );
        })
      ) : (
        <Text p={'5%'} mt={'10%'} textAlign={'center'} color={'gray.300'} fontSize={'3xl'} cursor="default">
          ショッピングカートに何も入っていません。
        </Text>
      )}
      {cart.length !== 0 ? <BuyCart cart={cart}></BuyCart> : null}
    </Flex>
  );
};
export default Carts;
