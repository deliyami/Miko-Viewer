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
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { enterRoomIdAsyncState, isOnAvatarState, isOnVideoAmbianceState } from '@src/state/recoil';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ViewingSettingDrawer = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enterRoomId = useRecoilValue(enterRoomIdAsyncState);
  const [isOnModel, setIsOnModel] = useRecoilState(isOnAvatarState);
  const [isOnVideoAmbiance, setIsOnVideoAmbiance] = useRecoilState(isOnVideoAmbianceState);
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay backgroundColor="transparent" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>設定</DrawerHeader>
        <DrawerBody>
          <Heading size="sm">Room Id :{enterRoomId} </Heading>
          <Divider my="6" />
          <FormControl display="flex" flexDir="column">
            <Flex justifyContent="space-between">
              <FormLabel htmlFor="is-on-model" mb="0">
                Show Avatar
              </FormLabel>
              <Switch id="is-on-model" defaultChecked={isOnModel} onChange={() => setIsOnModel(prev => !prev)} />
            </Flex>
            <Flex justifyContent="space-between">
              <FormLabel htmlFor="is-on-video-ambiance" mb="0">
                turn on video ambiance
              </FormLabel>
              <Switch id="is-on-video-ambiance" defaultChecked={isOnVideoAmbiance} onChange={() => setIsOnVideoAmbiance(prev => !prev)} />
            </Flex>
          </FormControl>
          <Divider my="6" />
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
