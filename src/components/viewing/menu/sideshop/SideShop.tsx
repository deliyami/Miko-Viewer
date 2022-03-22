import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@chakra-ui/react';
import React, { forwardRef, useImperativeHandle } from 'react';

const SideShop = forwardRef((_, ref) => {
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
        <DrawerBody>{/* Body */}</DrawerBody>
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
