import {
  Box,
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
  HStack,
  Portal,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import useWindowEvent from '@src/hooks/useWIndowEvent';
import {
  isOnAudioAnalyzerState,
  isOnAvatarState,
  isOnMediaPipeState,
  isOnMyRankingState,
  isOnRankingState,
  isOnVideoAmbianceState,
  myAvatarReplicateNumState,
} from '@src/state/recoil/devState';
import React, { FC, useEffect, useRef } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import CommonDivider from '../divider/CommonDivider';

// TODO  콘서트 시간 갱신

const MAX_REPLICATE = 4;
const ReplicateMyAvatarOption: FC = () => {
  const [num, setNum] = useRecoilState(myAvatarReplicateNumState);

  return (
    <Flex flexDir="column">
      <Text> my avatar replicate num : {num}</Text>
      <Slider defaultValue={num} value={num} onChange={v => setNum(v)} min={0} max={MAX_REPLICATE} step={1}>
        <SliderTrack bg="blue.200">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb boxSize={4} />
        {new Array(MAX_REPLICATE + 1).fill(0).map((_, idx) => (
          <SliderMark key={'sliderMark' + idx} value={idx} pt="2" w="0" fontSize="sm">
            {idx}
          </SliderMark>
        ))}
      </Slider>
    </Flex>
  );
};

const CustomSwitch: FC<{ label: string; isOn: boolean; set: SetterOrUpdater<boolean> }> = ({ isOn, label, set }) => {
  return (
    <Flex justifyContent="space-between">
      <FormLabel htmlFor={label} mb="0">
        {label}
      </FormLabel>
      <Switch id={label} isChecked={isOn} defaultChecked={isOn} onChange={() => set(prev => !prev)} />
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
  const [isOnAudioAnalyzer, setIsOnAudioAnalyzer] = useRecoilState(isOnAudioAnalyzerState);
  const btnRef = useRef();

  useWindowEvent('keyup', e => {
    if (['d', 'D'].includes(e.key)) {
      onOpen();
    }
  });

  useEffect(() => {
    setIsOnModel(localStorage.getItem('isOnAvatarState') === 'true');
    setIsOnVideoAmbiance(localStorage.getItem('isOnVideoAmbianceState') === 'true');
    setIsOnMediaPipe(localStorage.getItem('isOnMediaPipeState') === 'true');
    setIsOnRanking(localStorage.getItem('isOnRankingState') === 'true');
    setIsOnMyRanking(localStorage.getItem('isOnMyRankingState') === 'true');
    setIsOnAudioAnalyzer(localStorage.getItem('isOnAudioAnalyzerState') === 'true');

    return () => {};
  }, []);

  const handleSetAll = (aBoolean: boolean) => {
    setIsOnModel(aBoolean);
    setIsOnVideoAmbiance(aBoolean);
    setIsOnMediaPipe(aBoolean);
    setIsOnRanking(aBoolean);
    setIsOnMyRanking(aBoolean);
    setIsOnAudioAnalyzer(aBoolean);
  };

  return (
    <Portal>
      <Button ref={btnRef} colorScheme="teal" w="1" p="0" m="0" onClick={onOpen} position="fixed" top="32" left="0" zIndex="101">
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
            </FormControl>
            <CommonDivider />
            <ReplicateMyAvatarOption />
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
