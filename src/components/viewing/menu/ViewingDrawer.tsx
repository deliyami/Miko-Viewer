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
  Select,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { setAvatarColor, setLightColor } from '@src/helper';
import { enterRoomIdAsyncState, isOnAvatarState, isOnVideoAmbianceState, model } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const avatarTheme = ['Default', 'Miku', 'Kirari', 'Tanjiro', 'Satoru'];
const ViewingSettingDrawer = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enterRoomId = useRecoilValue(enterRoomIdAsyncState);
  const [isOnModel, setIsOnModel] = useRecoilState(isOnAvatarState);
  const [isOnVideoAmbiance, setIsOnVideoAmbiance] = useRecoilState(isOnVideoAmbianceState);
  const avatarColorRef = useRef(null);
  const lightColorRef = useRef(null);
  const { data: user } = useUser();
  const models = useRecoilValue(model);
  // models[user.uuid].scene.materials[10].name
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));
  const optionChangeHandler = () => {
    setAvatarColor(models, avatarColorRef.current.value, user.uuid);
    setLightColor(models, lightColorRef.current.value, user.uuid);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
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
          <FormControl display="flex" flexDir="column">
            <Flex justifyContent="space-between" direction="column">
              <FormLabel htmlFor="avatar-color">Change Avatar Color</FormLabel>
              <Select id="avatar-color" ref={avatarColorRef} defaultValue={0}>
                {avatarTheme.map((charName, i) => (
                  <option value={i} key={i}>
                    {charName}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>
          <Divider my="6" />
          <FormControl display="flex" flexDir="column">
            <Flex justifyContent="space-between" direction="column">
              <FormLabel htmlFor="light-color">Change Light Color</FormLabel>
              <Select id="light-color" ref={lightColorRef} defaultValue={0}>
                {avatarTheme.map((charName, i) => (
                  <option value={i} key={i}>
                    {charName}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={optionChangeHandler}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

ViewingSettingDrawer.displayName = 'ViewingDrawer';

export default ViewingSettingDrawer;
