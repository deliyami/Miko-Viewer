import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure, Text } from '@chakra-ui/react';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Cart from './Cart';
import ProductList from './ProductList';

// type Data = {
//   data?: Pagination<Product>;
// };

// export const getServerSideProps: GetServerSideProps<Data> = async context => {
//   const URL_PRODUCTS = '/products';
//   const concertId = parseInt((context.query.id as string) ?? '1', 10);
//   // const enterTicketData = useRecoilValue(enterTicketDataState);
//   // console.log(nterTicketDataState.concertId);

//   const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
//     filter: [['concert_id', 1]],
//   });
//   return {
//     props: {
//       data: result?.data ?? null,
//     },
//   };
// };

const SideShop = forwardRef((_, ref) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOnclose = () => {
    onClose();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleOnclose} size="md">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>グッズリスト</DrawerHeader>
        <DrawerBody>{cartOpen === false ? <ProductList></ProductList> : <Cart></Cart>}</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={handleOnclose}>
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
