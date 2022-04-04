import { Box, BoxProps, Flex, HStack, Text } from '@chakra-ui/react';
import { RiVoiceprintLine } from '@react-icons/all-files/ri/RiVoiceprintLine';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { memo } from 'react';

type Props = {
  normalizedVolume: number;
};

const MotionBox = motion<Omit<BoxProps, 'transition' | 'style'>>(Box);

const MAX_PROCESS_RESULT = 100;

const COLORS = ['#e3f015', '#39c5bb', '#2132dc', '#f700ff', '#fe0059'];

const AudioVisualizer = memo<Props>(({ normalizedVolume: volume }) => {
  const x = useMotionValue(0);
  const xRange = [...Array(COLORS.length).keys()];
  const background = useTransform(x, xRange, COLORS);

  const colorIdx = (volume * (COLORS.length - 1)) / MAX_PROCESS_RESULT;

  x.set(colorIdx);

  return (
    <Flex alignItems="center" w="full" position="relative">
      <HStack zIndex="1" px="1">
        <RiVoiceprintLine />
        <Text pl="1">{volume}</Text>
      </HStack>
      <MotionBox position="absolute" display="flex" style={{ background }} alignItems="center" h="20px" animate={{ width: `${volume}%` }}></MotionBox>
    </Flex>
  );
});

AudioVisualizer.displayName = 'AudioVisualizer';

export default AudioVisualizer;
