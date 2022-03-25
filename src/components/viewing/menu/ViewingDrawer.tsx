import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { enterRoomIdAsyncState } from '@src/state/recoil/concertState';
import { isOnModelState } from '@src/state/recoil/viewingState';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ViewingSettingDrawer = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enterRoomId = useRecoilValue(enterRoomIdAsyncState);
  const [isOnModel, setIsOnModel] = useRecoilState(isOnModelState);

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
        <DrawerHeader>設定</DrawerHeader>
        <DrawerBody>
          <Heading size="sm">Room Id :{enterRoomId} </Heading>
          <Divider my="6" />
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="is-on-model" mb="0">
              Show Avatar
            </FormLabel>
            <Switch id="is-on-model" onChange={() => setIsOnModel(prev => !prev)} />
          </FormControl>
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
