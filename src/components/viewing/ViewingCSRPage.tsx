import { HStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import WithSocketEventLayout from './AddSocketPeerLayer';
import RoomAvatarView from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';

const ViewingCSRPage = () => {
  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <HStack width="full">
          <VideoPlayer />
          <ChatBox />
        </HStack>
        <HStack backgroundColor="blue.200" width="80vw" height="20vh">
          <RoomAvatarView />
        </HStack>
        <ChatMessageInput />
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
