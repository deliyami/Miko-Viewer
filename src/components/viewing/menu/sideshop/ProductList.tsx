import { Box, Button, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { useUser } from '@src/state/swr';
import { Product } from '@src/types/share';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Options from './Options';

type ProductType = {
  product: Product;
  setCartCount: Function;
};

export default function ProductList({ product, setCartCount }: ProductType) {
  //   function setOption() {}
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [stockValue, setStock] = useState(0);
  const [colorValue, setColor] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [sizeValue, setSize] = useState('');
  const [address, setAddress] = useState('');
  const { data: userData } = useUser();
  function onCart() {
    console.log('onCart');
    if (stockValue === 0 || colorValue === '' || sizeValue === '') {
      alert('オプションを全部選択して下さい。');
    } else if (stockValue !== 0 && colorValue !== '' && sizeValue !== '') {
      axios
        .post(
          `${LARAVEL_URL}/cart_products`,
          {
            user_id: userData?.id,
            size: sizeValue,
            color: colorValue,
            product_id: product.id,
            quantity: stockValue,
          },
          // { withCredentials: true },
        )
        .then(response => {
          setCartCount((prev: number) => prev + 1);
          console.log(response);
          setSize('');
          setColor('');
          setStock(0);
        })
        .catch(error => console.log(error));
    }
  }
  function goBuy() {
    setTotalPrice(product.price * stockValue + 300);
    if (stockValue === 0 || colorValue === '' || sizeValue === '') {
      alert('オプションを全部選択して下さい。');
    } else if (stockValue !== 0 && colorValue !== '' && sizeValue !== '') {
      axios
        .post(`${LARAVEL_URL}/orders`, {
          user_id: userData?.id,
          quantity: stockValue,
          address,
          state: false,
          total_price: totalPrice,
          product_id: product.id,
        })
        .then(response => {
          console.log(response);
          setSize('');
          setColor('');
          setStock(0);
          onClose();
        })
        .catch(err => alert(err));
    }
  }
  function inputAddress(e: ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }
  function cartOpen() {
    setCartIsOpen(prev => !prev);
  }
  function cartClose() {
    setCartIsOpen(prev => !prev);
  }
  // alert(size);
  return (
    <Flex mb={'200px'} justifyContent={'center'}>
      <Flex alignItems={'center'} flexDir="column">
        <Box w={'300px'}>
          <Image alt="product_image" src={`${IMAGE_DOMAIN}product_image/${product.image}`} boxSize={'full'}></Image>
        </Box>
        <Text>{product.name}</Text>
        <Text fontWeight={'bold'}>¥{product.price}</Text>
        <Flex mt={'5%'} w={'300px'} justifyContent="space-around">
          <Button onClick={onOpen} _hover={{ color: 'orange', background: '#EFEFEF' }} w={'130px'} background="orange" color={'white'}>
            注文&nbsp;
            <FaCoins />
          </Button>
          <Button onClick={cartOpen} _hover={{ color: 'blue.300', background: '#EFEFEF' }} w={'130px'} background="blue.300" color={'white'}>
            カート
            <FaShoppingCart />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>オプション選択</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Options
                  setStock={setStock}
                  setSize={setSize}
                  setColor={setColor}
                  sizeValue={sizeValue}
                  colorValue={colorValue}
                  stockValue={stockValue}
                  stock={product.stock}
                  size={product.size}
                  color={product.color}
                />
                <Text mt="4%" fontWeight={'bold'} fontSize="xl">
                  お届け先
                </Text>
                <Input
                  onChange={inputAddress}
                  value={address}
                  focusBorderColor="#1CE0D7"
                  _hover={{ borderBottomColor: '#1CE0D7' }}
                  ml="2%"
                  mt="5%"
                  variant={'flushed'}
                  placeholder={'ご住所を入力してください。'}
                ></Input>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    // onClose();
                    goBuy();
                  }}
                >
                  注文する
                </Button>
                <Button variant="ghost">キャンセル</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={cartIsOpen} onClose={cartClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>オプション選択</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Options
                  setStock={setStock}
                  setSize={setSize}
                  setColor={setColor}
                  sizeValue={sizeValue}
                  colorValue={colorValue}
                  stockValue={stockValue}
                  stock={product.stock}
                  size={product.size}
                  color={product.color}
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    cartClose();
                    onCart();
                  }}
                >
                  カートに入れる
                </Button>
                <Button variant="ghost">キャンセル</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
}
