import { HStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import RoomAvatarView from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import ViewingWindowEventLayout from './ViewingWindowEventLayout';
import WithSocketEventLayout from './WithSocketEventLayout';

const ViewingCSRPage = () => {
  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <HStack width="full">
          <VideoPlayer />
          <ChatBox />
        </HStack>
        <HStack backgroundColor="blue.200" width="80vw" height="20vh">
          {/* <Text>아바타</Text> */}
          <RoomAvatarView />
        </HStack>
        <ChatMessageInput />
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
