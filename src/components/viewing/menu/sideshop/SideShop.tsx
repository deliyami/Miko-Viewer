import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BiArrowFromLeft } from '@react-icons/all-files/bi/BiArrowFromLeft';
import { BiArrowFromRight } from '@react-icons/all-files/bi/BiArrowFromRight';
import { FaGift } from '@react-icons/all-files/fa/FaGift';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import React, { FC, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Carts from './Carts';
import Product from './Product';

const CartView: FC<{ size: string; cartIsOpen: boolean; setCartCount: (value: React.SetStateAction<number>) => void }> = ({ size, cartIsOpen, setCartCount }) => {
  const { data: userData } = useUser();
  const cart = useSingleLaravel('/cart_products', userData?.id, {});
  useEffect(() => {
    setCartCount(cart.data?.length);
  }, [cart.data?.length, setCartCount]);
  if (cartIsOpen && cart.data) return <Carts cart={cart.data}></Carts>;

  return <Product size={size} setCartCount={setCartCount} />;
};

const SideShop = forwardRef((_, ref) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState(true);
  const [opacity, setOpacity] = useState(100);

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  let sizeValue = 'md';
  if (size === false) {
    sizeValue = 'xl';
  } else {
    sizeValue = 'md';
  }

  // const [bg, setBg] = useState('100');

  const onOpacity = (event: number) => {
    if (event > 31) {
      setOpacity(event);
    }
    // if (event === 100) {
    //   setBg(`rgba(255,255,255, 1)`);
    //   // bg = `rgba(255,255,255)`;/
    // } else {
    //   setBg(`rgba(255,255,255, .${event / 10})`);
    // }
    // // alert(ov);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={sizeValue}>
      <DrawerContent opacity={`${opacity}%`}>
        <Button position={'absolute'} _focus={{ border: 'none' }} top="7px" right="1px" w={'40px'} onClick={() => setSize(!size)} variant="unstyled">
          {!size ? <BiArrowFromLeft fontSize={'25px'} /> : <BiArrowFromRight fontSize={'25px'} />}
        </Button>
        <DrawerHeader>
          {cartOpen === true ? (
            <Flex cursor={'default'} border={'1px'} p="8px" w={'180px'} color="white" justifyContent="center" borderRadius={'2xl'} alignItems="center" background="#1CE0D7">
              <Text>カート</Text>
              <FaShoppingCart />
            </Flex>
          ) : (
            <Flex cursor={'default'} border={'1px'} p="8px" w={'180px'} color="white" justifyContent="center" borderRadius={'2xl'} alignItems="center" background="#1CE0D7">
              <Text>グッズリスト</Text>
              <FaGift />
            </Flex>
          )}
        </DrawerHeader>
        <Slider min={30} value={opacity} onChange={onOpacity} position={'absolute'} bottom="11px" ml="20px" aria-label="slider-ex-1" w={'190px'} defaultValue={100}>
          <SliderTrack>
            <SliderFilledTrack bg={'#94E5E1'} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <DrawerBody mt={'10px'}>
          <AsyncBoundary>
            <CartView size={sizeValue} cartIsOpen={cartOpen} setCartCount={setCartCount} />
          </AsyncBoundary>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              onClose();
              setOpacity(100);
            }}
          >
            リセット
          </Button>
          {cartOpen === false ? (
            <Button onClick={() => setCartOpen(prev => !prev)} colorScheme="blue">
              {cartCount !== 0 ? <Text>カート({cartCount})</Text> : <Text>カート</Text>}
            </Button>
          ) : (
            <Button onClick={() => setCartOpen(prev => !prev)} colorScheme="blue">
              リスト
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

SideShop.displayName = 'SideShop';

export default SideShop;
