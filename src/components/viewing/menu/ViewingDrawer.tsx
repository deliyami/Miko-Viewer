import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Input, useDisclosure } from '@chakra-ui/react';
import { enterRoomIdAsyncState } from '@src/state/recoil/concertState';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useRecoilValue } from 'recoil';

const ViewingSettingDrawer = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enterRoomId = useRecoilValue(enterRoomIdAsyncState);

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
          <Heading size="md">Room Id :{enterRoomId} </Heading>
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

ViewingSettingDrawer.displayName = 'ViewingDrawer';

export default ViewingSettingDrawer;
