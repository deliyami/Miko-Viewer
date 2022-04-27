import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { useUser } from '@src/state/swr';
import { Product } from '@src/types/share';
import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';
import Options from './Options';

type ProductType = {
  product: Product;
  setCartCount: Function;
};

export default function ProductList({ product, setCartCount }: ProductType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [stockValue, setStock] = useState(0);
  const [colorValue, setColor] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [sizeValue, setSize] = useState('');
  const [address, setAddress] = useState('');
  const { data: userData } = useUser();
  const cancelRef = useRef(null);

  function resetOptions() {
    setSize('');
    setColor('');
    setStock(0);
    setAddress('');
  }
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
        .then(() => {
          setCartCount((prev: number) => prev + 1);
          resetOptions();
          alert('カートに入れました。');
        })
        .catch(error => alert(error));
    }
  }

  function inputAddress(e: ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }
  function cartSwitch() {
    setCartIsOpen(prev => !prev);
    resetOptions();
  }
  function confirmSwitch() {
    setConfirmOpen(prev => !prev);
  }

  // function confirm() {
  //   // alert('ccc');
  //   // confirmSwitch();
  //   return (

  //   );
  // }

  function goBuy() {
    if (stockValue === 0 || colorValue === '' || sizeValue === '') {
      alert('オプションを全部選択して下さい。');
    } else if (address === '') {
      alert('ご住所を入力してください。');
    } else if (address !== '' && stockValue !== 0 && colorValue !== '' && sizeValue !== '') {
      axios
        .post(`${LARAVEL_URL}/orders`, {
          user_id: userData?.id,
          quantity: stockValue,
          address,
          size: sizeValue,
          color: colorValue,
          state: false,
          total_price: totalPrice,
          product_id: product.id,
        })
        .then(response => {
          // confirmSwitch();
          console.log(response);
          resetOptions();
          onClose();
          // return <BuyAlert></BuyAlert>;
        })
        .catch(err => alert(err));
    }
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
          <Button
            onClick={() => {
              onOpen();
              // confirmOpen();
            }}
            _hover={{ color: 'orange', background: '#EFEFEF' }}
            w={'130px'}
            background="orange"
            color={'white'}
          >
            注文&nbsp;
            <FaCoins />
          </Button>
          <Button onClick={cartSwitch} _hover={{ color: 'blue.300', background: '#EFEFEF' }} w={'130px'} background="blue.300" color={'white'}>
            カート
            <FaShoppingCart />
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              resetOptions();
            }}
          >
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
                    confirmSwitch();
                    setTotalPrice(product.price * stockValue + 300);
                  }}
                >
                  注文する
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                    resetOptions();
                  }}
                >
                  キャンセル
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={cartIsOpen} onClose={cartSwitch}>
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
                    cartSwitch();
                    onCart();
                  }}
                >
                  カートに入れる
                </Button>
                <Button onClick={cartSwitch} variant="ghost">
                  キャンセル
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <AlertDialog isOpen={confirmOpen} leastDestructiveRef={cancelRef} onClose={confirmSwitch}>
            <AlertDialogOverlay>
              <AlertDialogContent w={'20%'} mt="7%">
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  ご注文の確認
                </AlertDialogHeader>

                <AlertDialogBody textAlign={'center'}>
                  コイン<span style={{ color: '#E74A45' }}>「{totalPrice + 300}」</span>を使ってご注文しますか？
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    bg={'#1CE0D7'}
                    _hover={{ bg: '#B0F5F1' }}
                    color="white"
                    onClick={() => {
                      confirmSwitch();
                      goBuy();
                    }}
                  >
                    注文
                  </Button>
                  <Button bg={'#F57F6E'} _hover={{ bg: '#F6B0A6' }} color="white" onClick={confirmSwitch} ml={3}>
                    戻る
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </Flex>
    </Flex>
  );
}
