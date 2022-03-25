import { Box, VStack } from '@chakra-ui/react';
import AudioAnalyser from '@src/components/result/AudioAnalyser';
import AudioVisualizer from '@src/components/result/AudioVisualizer';
import { myStreamState } from '@src/state/recoil/viewingState';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { useRecoilValue } from 'recoil';

export const AudioAnalyze = () => {
  const myStream = useRecoilValue(myStreamState);
  
  const handleAddScore = () => {
    // 이렇게 점수 추가해주면 나머지는 알아서 처리됨.
    addedScoreForSeconds.addScore(0);
  };

  return (
    <VStack width="full" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white" py="1" px="0.5">
      <Box w="full" bgColor="red.300" h="1">
        <AudioAnalyser></AudioAnalyser>
      </Box>
    </VStack>
  );
};
