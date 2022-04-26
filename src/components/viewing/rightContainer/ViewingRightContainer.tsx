import { VStack } from '@chakra-ui/react';
import ChatBox from '../chat/ChatBox';
import AudioAnalyser from './audioAnalyze/AudioAnalyser';
import RankingView from './ranking/RankingView';

export default function ViewingRightContainer(): JSX.Element {
  return (
    <VStack width="25vw" h="100vh" maxH="100vh" overflow="hidden" zIndex="0">
      <RankingView />
      <ChatBox />
      <AudioAnalyser />
    </VStack>
  );
}
