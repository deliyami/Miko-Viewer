import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Kbd, Text, useDisclosure } from '@chakra-ui/react';
import React, { forwardRef, useImperativeHandle } from 'react';

const ViewingHelp = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>ヘルプ</DrawerHeader>
        <DrawerBody>
          <Heading size="md">ショートカットキー</Heading>
          <Text>
            <Kbd>C</Kbd> - チャットインプットの開け閉め
          </Text>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

ViewingHelp.displayName = 'ViewingDrawer';

export default ViewingHelp;
