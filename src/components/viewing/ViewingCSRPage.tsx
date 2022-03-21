import { HStack, VStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import { useEffect, useState } from 'react';
import { TempRoomAvatarView } from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingSideMenuBar from './menu/ViewingSideMenuBar';
import { AudioAnalyze } from './rightContainer/audioAnalyze/AudioAnalyze';
import RankingView from './rightContainer/ranking/rankingView';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import { WithIntervalTaskLayer } from './WithIntervalTaskLayer';
import WithSocketEventLayout from './WithSocketPeerLayer';

const ViewingCSRPage = () => {
  const { IVSPlayer } = window;
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

    return () => {
      clearInterval(intervalId);
    };
  }, [scriptLoaded, IVSPlayer]);

  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <WithIntervalTaskLayer>
          <HStack width="100vw" minH="100vh" backgroundColor="#181818">
            <VStack width="full">
              {IVSPlayer ? <VideoPlayer /> : 'loading'}
              {/* <HStack backgroundColor="blue.200" width="80vw" height="20vh"> */}
              {/* <RoomAvatarView /> */}
              {/* </HStack> */}
              <TempRoomAvatarView />
              <ChatMessageInput />
            </VStack>
            <VStack width="25vw">
              <RankingView />
              <ChatBox />
              <AudioAnalyze />
            </VStack>
            <ViewingSideMenuBar />
          </HStack>
        </WithIntervalTaskLayer>
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
