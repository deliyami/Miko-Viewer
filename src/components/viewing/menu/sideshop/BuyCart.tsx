/* eslint-disable no-alert */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { LARAVEL_URL } from '@src/const';
import { useUser } from '@src/state/swr';
import { Cart } from '@src/types/local/Cart';
import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';

type CartType = {
  cart: Cart;
};

export default function BuyCart({ cart }: CartType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [done, setDone] = useState(false);
  const [address, setAddress] = useState('');
  const cancelRef = useRef(null);
  const { data: userData } = useUser();
  let totalCoast: number = 0;
  const productIds: Array<number> = [];
  const quantity: Array<number> = [];
  const size: Array<string> = [];
  const color: Array<string> = [];
  cart?.map((item: Cart) => {
    totalCoast += item.products[0].price * item.quantity;
    size.push(item.size);
    color.push(item.color);
    quantity.push(item.quantity);
    // alert(JSON.stringify(item));
    if (!productIds.includes(item.product_id)) productIds.push(item.product_id);
    return 1;
  });

  function onBuy() {
    if (address !== '') {
      axios
        .post(`${LARAVEL_URL}/orders`, {
          user_id: userData?.id,
          quantity,
          address,
          state: false,
          total_price: totalCoast + 300,
          size,
          color,
          // product_id: JSON.stringify(product_id),
          product_id: productIds,
        })
        .then(() => {
          onClose();
          // setDone(true);
          alert('ご注文が完了しました。');
        })
        .catch(err => console.log(err));
    } else alert('ご住所を入力してください。');
  }
  function inputAddress(e: ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }

  return (
    <Flex justifyContent={'end'} w={'100%'} mr="6%">
      <Button my={'40px'} onClick={onOpen} colorScheme={'green'}>
        カートの商品を注文&nbsp;({cart.length})
      </Button>
      <AlertDialog closeOnOverlayClick={false} motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>注文</AlertDialogHeader>
          <AlertDialogBody color={'blackAlpha.700'} textAlign={'center'} p={'25px'} fontSize={'lg'}>
            ショッピングカートの商品全体を注文しますか？
            <br /> <span style={{ color: '#FF8F00' }}>お届け先の住所</span>を入力してください。
            <Input mt="5%" placeholder="お届け先の住所" value={address} onChange={inputAddress}></Input>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={onBuy} colorScheme="green" ml={3}>
              注文
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* {done ? (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      ) : null} */}
    </Flex>
  );
}
