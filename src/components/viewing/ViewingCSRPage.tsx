import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import { DoneBallon } from '@src/components/viewing/chat/icon/DoneBallon';
import { useIvsPlayer } from '@src/hooks/dynamicHooks';
import styles from '@src/style/css/viewing.module.scss';
import { useEffect, useState } from 'react';
import RoomAvatarView from './avatar/RoomAvatarView';
import ChatBox from './chat/ChatBox';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingSideMenuBar from './menu/ViewingSideMenuBar';
import AudioAnalyser from './rightContainer/audioAnalyze/AudioAnalyser';
import RankingView from './rightContainer/ranking/RankingView';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import { WithIntervalTaskLayer } from './WithIntervalTaskLayer';
import WithSocketEventLayout from './WithSocketEventLayout';

const ViewingCSRPage = () => {
  const IVSPlayer = useIvsPlayer();
  const [scriptLoaded, setScriptLoaded] = useState(!!IVSPlayer);

  useEffect(() => {
    let intervalId = null;
    if (!scriptLoaded) {
      intervalId = setInterval(() => {
        console.log('ivs player Loaded?', IVSPlayer ? 'Yes' : 'NO');
        if (IVSPlayer) {
          setScriptLoaded(true);
          clearInterval(intervalId);
        }
      }, 300);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [scriptLoaded, IVSPlayer]);

  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <WithIntervalTaskLayer>
          <HStack width="100vw" h="full" position="relative" color="white" overflow="clip" backgroundColor="#181818">
            <Center h="full" w="full" zIndex="0" position="absolute">
              <canvas className={styles.ambiance} id="ambiance" />
            </Center>
            <VStack width="full" h="full" position="relative">
              {IVSPlayer ? (
                <VideoPlayer />
              ) : (
                <Center>
                  <Text fontSize="7xl" color="whatsapp.100">
                    Loading Player
                  </Text>
                </Center>
              )}
              <ChatMessageInput />
              <RoomAvatarView />
            </VStack>
            <DoneBallon></DoneBallon>
            <VStack width="25vw" h="100vh" maxH="100vh" overflow="hidden" zIndex="0">
              <RankingView />
              <ChatBox />
              <AudioAnalyser />
            </VStack>
            <ViewingSideMenuBar zIndex="2" />
          </HStack>
        </WithIntervalTaskLayer>
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
