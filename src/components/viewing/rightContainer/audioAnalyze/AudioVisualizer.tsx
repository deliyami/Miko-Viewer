import { Box, BoxProps, Flex, HStack, Text } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { memo } from 'react';
import { RiVoiceprintLine } from 'react-icons/ri';

type Props = {
  volume: number;
};

const MotionBox = motion<Omit<BoxProps, 'transition' | 'style'>>(Box);

const MAX_VOLUME = 300;
const MIN_VOLUME = 100;

const MAX_PROCESS_RESULT = 100;

const COLORS = ['#e3f015', '#39c5bb', '#2132dc', '#f700ff', '#fe0059'];

const processVolume = volume => {
  const cut = Math.min(MAX_VOLUME, volume);
  const normalized = ((cut - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)) * 100;
  const rounded = Math.round(normalized);
  return Math.max(0, rounded);
};

const AudioVisualizer = memo<Props>(({ volume }) => {
  const x = useMotionValue(0);
  const xRange = [...Array(COLORS.length).keys()];
  const background = useTransform(x, xRange, COLORS);

  const processedVolume = processVolume(volume);
  const colorIdx = (processedVolume * (COLORS.length - 1)) / MAX_PROCESS_RESULT;

  x.set(colorIdx);

  return (
    <Flex alignItems="center" w="full" position="relative">
      <HStack zIndex="1" px="1">
        <RiVoiceprintLine />
        <Text pl="1">{processedVolume}</Text>
      </HStack>
      <MotionBox position="absolute" display="flex" style={{ background }} alignItems="center" h="20px" animate={{ width: `${processedVolume}%` }}></MotionBox>
    </Flex>
  );
});

AudioVisualizer.displayName = 'AudioVisualizer';

export default AudioVisualizer;
