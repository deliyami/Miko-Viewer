import { HStack, VStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import { useEffect, useState } from 'react';
import WithSocketEventLayout from './AddSocketPeerLayer';
import { TempRoomAvatarView } from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingDrawer from './menu/ViewingDrawer';
import ViewingSideMenuBar from './menu/ViewingSideMenuBar';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import { WithIntervalTaskLayer } from './WithIntervalTaskLayer';

const ViewingCSRPage = () => {
  const { IVSPlayer } = window;
  const [scriptLoaded, setScriptLoaded] = useState(IVSPlayer ? true : false);
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
  }, [scriptLoaded]);

  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <WithIntervalTaskLayer>
          <HStack width="100vw" minH="100vh" backgroundColor="#181818">
            <ViewingSideMenuBar />
            <VStack width="full">
              {IVSPlayer ? <VideoPlayer /> : 'loading'}
              <TempRoomAvatarView />
            </VStack>
            <ChatBox />
          </HStack>
          {/* <HStack backgroundColor="blue.200" width="80vw" height="20vh"> */}
          {/* <RoomAvatarView /> */}
          {/* </HStack> */}
          <ChatMessageInput />
          <>
            <ViewingDrawer />
          </>
        </WithIntervalTaskLayer>
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
