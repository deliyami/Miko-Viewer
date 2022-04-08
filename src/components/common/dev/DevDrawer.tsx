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
  Heading,
  HStack,
  Input,
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
import { toastLog } from '@src/helper/toastLog';
import { useWindowEvent } from '@src/hooks';
import { axiosI } from '@src/state/fetcher';
import {
  isOnAudioAnalyzerState,
  isOnAvatarState,
  isOnMediaPipeState,
  isOnMyRankingState,
  isOnRankingState,
  isOnVideoAmbianceState,
  myAvatarReplicateNumState,
  prepareAnimationDurationState,
} from '@src/state/recoil';
import dayjs from 'dayjs';
import produce from 'immer';
import React, { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import CommonDivider from '../divider/CommonDivider';

// TODO  콘서트 시간 갱신

const UpdateTicketTime: FC = () => {
  const property = ['saleStartDate', 'saleEndDate', 'concertStartDate', 'concertEndDate', 'archiveEndTime'];
  const [addMinutes, setAddMinutes] = useState([undefined, undefined, 0, 10, 100]);
  const [ticketId, setTicketId] = useState(1);
  const handleUpdateTicketData = async () => {
    const updateData = {};
    const now = dayjs();
    addMinutes.forEach((m, idx) => {
      if (m) {
        updateData[property[idx]] = now.add(m, 'm').unix();
      }
    });
    const { data } = await axiosI.patch('/tickets/' + ticketId, updateData);
    if (data) {
      toastLog('success', 'ticket updated!');
    }
  };

  const handleUpdateMinutes = (m: string, idx: number) => {
    // - 전환
    let v = m;
    if (v.slice(-1) === '-') {
      if (v.slice(0, 1) === '-') {
        v = v.slice(1, -1);
      } else {
        v = '-' + v.slice(0, -1);
      }
    }

    //  문자열 방지
    const value = parseInt(v === '' ? '0' : v, 10);
    if (Number.isNaN(value)) {
      return;
    }
    setAddMinutes(
      produce(draft => {
        draft[idx] = value;
      }),
    );
  };

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading fontSize="sm">ticket id</Heading>
        <Input placeholder="minute" w="28" value={ticketId} onChange={e => setTicketId(e.target.value)} />
      </HStack>
      {property.map((key, idx) => (
        <HStack key={key} justifyContent="space-between">
          <Heading fontSize="sm">{key}</Heading>
          <Input placeholder="minute" w="28" value={addMinutes[idx]} onChange={e => handleUpdateMinutes(e.target.value, idx)} />
        </HStack>
      ))}
      <Button onClick={handleUpdateTicketData}>Update</Button>
    </Box>
  );
};

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
  const [prepareAnimationDuration, setPrepareAnimationDuration] = useRecoilState(prepareAnimationDurationState);
  const btnRef = useRef();

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
