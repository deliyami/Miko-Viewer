import {
  Button,
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
  Portal,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { isOnAvatarState, isOnMediaPipeState, isOnMyRankingState, isOnRankingState, isOnVideoAmbianceState } from '@src/state/recoil/devState';
import React, { FC, useEffect, useRef } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import CommonDivider from '../divider/CommonDivider';

// TODO  콘서트 시간 갱신
// TODO  랭킹 갱신 on off
// TODO  자신 봇 x 5
// TODO  media Pipe onoff

const CustomSwitch: FC<{ label: string; isOn: boolean; set: SetterOrUpdater<boolean> }> = ({ isOn, label, set }) => {
  return (
    <Flex justifyContent="space-between">
      <FormLabel htmlFor={label} mb="0">
        {label}
      </FormLabel>
      <Switch id={label} defaultChecked={isOn} onChange={() => set(prev => !prev)} />
    </Flex>
  );
};

export const DevDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOnModel, setIsOnModel] = useRecoilState(isOnAvatarState);
  const [isOnVideoAmbiance, setIsOnVideoAmbiance] = useRecoilState(isOnVideoAmbianceState);
  const [isOnMediaPipe, setIsOnMediaPipe] = useRecoilState(isOnMediaPipeState);
  const [isOnRanking, setIsOnRanking] = useRecoilState(isOnRankingState);
  const [isOnMyRanking, setIsOnMyRanking] = useRecoilState(isOnMyRankingState);
  const btnRef = useRef();

  useEffect(() => {
    setIsOnModel(localStorage.getItem('isOnAvatarState') === 'true');
    setIsOnVideoAmbiance(localStorage.getItem('isOnVideoAmbianceState') === 'true');
    setIsOnMediaPipe(localStorage.getItem('isOnMediaPipeState') === 'true');
    setIsOnRanking(localStorage.getItem('isOnRankingState') === 'true');

    return () => {};
  }, []);

  return (
    <Portal>
      <Button ref={btnRef} colorScheme="teal" w="1" p="0" m="0" onClick={onOpen} position="fixed" top="32" left="0" zIndex="101">
        D
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay backgroundColor="transparent" />
        <DrawerContent backgroundColor="#FFFFFFAA">
          <DrawerCloseButton />
          <DrawerHeader>設定</DrawerHeader>
          <DrawerBody>
            <CommonDivider />
            <FormControl display="flex" flexDir="column">
              <CustomSwitch label="turn on avatar rendering" isOn={isOnModel} set={setIsOnModel} />
              <CustomSwitch label="turn on video ambiance" isOn={isOnVideoAmbiance} set={setIsOnVideoAmbiance} />
              <CustomSwitch label="turn on mediapipe" isOn={isOnMediaPipe} set={setIsOnMediaPipe} />
              <CustomSwitch label="turn on ranking update" isOn={isOnRanking} set={setIsOnRanking} />
              <CustomSwitch label="turn on my ranking update" isOn={isOnMyRanking} set={setIsOnMyRanking} />
            </FormControl>
            <CommonDivider />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Portal>
  );
};
