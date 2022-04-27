import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import { useIvsPlayer } from '@src/hooks/dynamicHooks';
import { useEffect, useState } from 'react';
import RoomAvatarView from './avatar/RoomAvatarView';
import AmbianceBox from './centerContainer/AmbianceBox';
import ChangePenColor from './centerContainer/ChangePenColor';
import DoneRenderBox from './centerContainer/DoneRenderBox';
import ExitBtn from './centerContainer/ExitBtn';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingSideMenuBar from './menu/ViewingSideMenuBar';
import ViewingRightContainer from './rightContainer/ViewingRightContainer';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import { WithIntervalTaskLayer } from './WithIntervalTaskLayer';
import WithSocketEventLayout from './WithSocketEventLayout';

const ViewingCSRPage = () => {
  const IVSPlayer = useIvsPlayer();
  const [scriptLoaded, setScriptLoaded] = useState(!!IVSPlayer);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
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
            <AmbianceBox />
            <DoneRenderBox />
            <ChangePenColor />
            <ExitBtn />
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
            <ViewingRightContainer />
            <ViewingSideMenuBar zIndex="2" />
          </HStack>
        </WithIntervalTaskLayer>
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
