import { HStack } from '@chakra-ui/react';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import ChatBox from '@src/components/viewing/chat/ChatBox';
import RoomAvatarView from './avatar/RoomAvatarView';
import ChatMessageInput from './chat/ChatMessageInput';
import WithSocketEventLayout from './WithSocketEventLayout';

const ViewingCSRPage = () => {
  return (
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
  );
};
export default ViewingCSRPage;
