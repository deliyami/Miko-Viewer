import { Box, VStack } from '@chakra-ui/react';
import AudioAnalyser from '@src/components/viewing/rightContainer/audioAnalyze/AudioAnalyser';
import { myStreamState } from '@src/state/recoil/viewingState';
import { useRecoilValue } from 'recoil';

export const AudioAnalyze = () => {
  const myStream = useRecoilValue(myStreamState);

  return (
    <VStack width="full" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white" py="1" px="0.5">
      <Box w="full" bgColor="red.300">
        <AudioAnalyser></AudioAnalyser>
      </Box>
    </VStack>
  );
};
