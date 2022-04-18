import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  HStack,
  Input,
  Portal,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useWindowEvent } from '@src/hooks';
import {
  isOnAudioAnalyzerState,
  isOnAvatarState,
  isOnChatState,
  isOnMediaPipeState,
  isOnMyRankingState,
  isOnPeerSoundState,
  isOnRankingState,
  isOnVideoAmbianceState,
  prepareAnimationDurationState,
} from '@src/state/recoil';
import React, { ChangeEventHandler, FC, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import CommonDivider from '../divider/CommonDivider';
import { CustomSwitch } from './CustomSwitch';
import { ReplicateMyAvatarOption } from './ReplicateMyAvatarOption';
import { UpdateTicketTime } from './UpdateTicketTime';

export const DevDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOnModel, setIsOnModel] = useRecoilState(isOnAvatarState);
  const [isOnVideoAmbiance, setIsOnVideoAmbiance] = useRecoilState(isOnVideoAmbianceState);
  const [isOnMediaPipe, setIsOnMediaPipe] = useRecoilState(isOnMediaPipeState);
  const [isOnRanking, setIsOnRanking] = useRecoilState(isOnRankingState);
  const [isOnMyRanking, setIsOnMyRanking] = useRecoilState(isOnMyRankingState);
  const [isOnAudioAnalyzer, setIsOnAudioAnalyzer] = useRecoilState(isOnAudioAnalyzerState);
  const [isOnChat, setIsOnChat] = useRecoilState(isOnChatState);
  const [isOnPeerSound, setIsOnPeerSound] = useRecoilState(isOnPeerSoundState);
  const [prepareAnimationDuration, setPrepareAnimationDuration] = useRecoilState(prepareAnimationDurationState);
  const btnRef = useRef<HTMLElement>();

  useWindowEvent('keyup', e => {
    if (['d', 'D'].includes(e.key)) {
      return isOpen ? onClose() : onOpen();
    }
  });

  useEffect(() => {
    setIsOnModel(localStorage.getItem('isOnAvatarState') === 'true');
    setIsOnVideoAmbiance(localStorage.getItem('isOnVideoAmbianceState') === 'true');
    setIsOnMediaPipe(localStorage.getItem('isOnMediaPipeState') === 'true');
    setIsOnRanking(localStorage.getItem('isOnRankingState') === 'true');
    setIsOnMyRanking(localStorage.getItem('isOnMyRankingState') === 'true');
    setIsOnAudioAnalyzer(localStorage.getItem('isOnAudioAnalyzerState') === 'true');
    setIsOnChat(localStorage.getItem('isOnChatState') === 'true');
    setIsOnPeerSound(localStorage.getItem('isOnPeerSoundState') === 'true');
  }, []);

  const handleSetAll = (aBoolean: boolean) => {
    setIsOnModel(aBoolean);
    setIsOnVideoAmbiance(aBoolean);
    setIsOnMediaPipe(aBoolean);
    setIsOnRanking(aBoolean);
    setIsOnMyRanking(aBoolean);
    setIsOnAudioAnalyzer(aBoolean);
    setIsOnChat(aBoolean);
    setIsOnPeerSound(aBoolean);
  };

  const handleUpdatePrepareAnimationDuration: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === '') {
      setPrepareAnimationDuration(0);
    } else if (!Number.isNaN(parseFloat(e.target.value))) {
      setPrepareAnimationDuration(parseFloat(e.target.value));
    }
  };

  return (
    <Portal>
      <Button ref={btnRef} colorScheme="teal" visibility={isOpen ? 'hidden' : 'visible'} w="1" p="0" m="0" onClick={onOpen} position="fixed" top="32" left="0" zIndex="101">
        D
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay backgroundColor="transparent" />
        <DrawerContent backgroundColor="#FFFFFFDD">
          <DrawerCloseButton />
          <DrawerHeader>Dev Option</DrawerHeader>
          <DrawerBody>
            <CommonDivider />
            <FormControl display="flex" flexDir="column">
              <HStack>
                <Button onClick={() => handleSetAll(true)}>All On </Button>
                <Button onClick={() => handleSetAll(false)}>All Off</Button>
              </HStack>
              <CustomSwitch label="turn on avatar rendering" isOn={isOnModel} set={setIsOnModel} />
              <CustomSwitch label="turn on video ambiance" isOn={isOnVideoAmbiance} set={setIsOnVideoAmbiance} />
              <CustomSwitch label="turn on mediapipe" isOn={isOnMediaPipe} set={setIsOnMediaPipe} />
              <CustomSwitch label="turn on ranking update" isOn={isOnRanking} set={setIsOnRanking} />
              <CustomSwitch label="turn on my ranking update" isOn={isOnMyRanking} set={setIsOnMyRanking} />
              <CustomSwitch label="turn on my audio analyzer" isOn={isOnAudioAnalyzer} set={setIsOnAudioAnalyzer} />
              <CustomSwitch label="turn on my chat" isOn={isOnChat} set={setIsOnChat} />
              <CustomSwitch label="turn on peer sound" isOn={isOnPeerSound} set={setIsOnPeerSound} />
              <HStack>
                <Text>Prepare Ani Duration(s)</Text>
                <Input value={prepareAnimationDuration} onChange={handleUpdatePrepareAnimationDuration} />
              </HStack>
            </FormControl>
            <CommonDivider />
            <ReplicateMyAvatarOption />
            <CommonDivider />
            <UpdateTicketTime />
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
