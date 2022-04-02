import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import { DonateBallon } from '@src/components/viewing/chat/icon/DonateBallon';
import useIvsPlayer from '@src/hooks/useIvsPlayer';
import { useEffect, useState } from 'react';
import ivsPlayer from '../ivs-player';
import RoomAvatarView from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingSideMenuBar from './menu/ViewingSideMenuBar';
import AudioAnalyser from './rightContainer/audioAnalyze/AudioAnalyser';
import RankingView from './rightContainer/ranking/RankingView';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import { WithIntervalMotionLayer } from './WithIntervalMotionLayer';
import { WithIntervalTaskLayer } from './WithIntervalTaskLayer';
import WithSocketEventLayout from './WithSocketPeerLayer';

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
      }, 1000);
    }

    // const setI = setInterval(() => {
    //   console.log('*******************');
    // }, 100);

    return () => {
      clearInterval(intervalId);
      // clearInterval(setI);
    };
  }, [scriptLoaded, IVSPlayer]);

  console.log('ivs player', ivsPlayer);

  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <WithIntervalMotionLayer>
          <WithIntervalTaskLayer>
            <HStack width="100vw" minH="100vh" backgroundColor="#181818">
              <VStack width="full">
                {IVSPlayer ? (
                  <VideoPlayer />
                ) : (
                  <Center>
                    <Text fontSize="7xl" color="whatsapp.100">
                      Loading Player
                    </Text>
                  </Center>
                )}
                <RoomAvatarView />
                <ChatMessageInput />
              </VStack>
              <DonateBallon width={100} x={200} y={-100} duration={1} delay={1}></DonateBallon>
              <VStack width="25vw" maxH="100vh" overflowY="hidden">
                <RankingView />
                <ChatBox />
                <AudioAnalyser />
              </VStack>
              <ViewingSideMenuBar />
            </HStack>
          </WithIntervalTaskLayer>
        </WithIntervalMotionLayer>
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
