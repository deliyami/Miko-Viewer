import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { GetServerSideProps } from 'next';
import React, { forwardRef, useImperativeHandle } from 'react';
import ProductList from './ProductList';

type Data = {
  data?: Pagination<Product>;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_PRODUCTS = '/products';
  const concertId = parseInt((context.query.id as string) ?? '1', 10);
  // const enterTicketData = useRecoilValue(enterTicketDataState);
  // console.log(nterTicketDataState.concertId);

  const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', 1]],
  });
  return {
    props: {
      data: result?.data ?? null,
    },
  };
};

const SideShop = forwardRef((data, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOnclose = () => {
    onClose();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));
  console.log(data);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleOnclose} size="md">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>グッズリスト</DrawerHeader>
        <DrawerBody>
          <ProductList></ProductList>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={handleOnclose}>
            リセット
          </Button>
          <Button colorScheme="blue">購入</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

SideShop.displayName = 'SideShop';

export default SideShop;
