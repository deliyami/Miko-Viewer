import { HStack } from '@chakra-ui/react';
import ChatBox from '@src/components/chat/ChatBox';
import VideoPlayer from '@src/components/ivs-player/VideoPlayer';
import RoomAvatarView from './RoomAvatarView';
import SocketEventAdd from './SocketEventAdd';

const ViewingCSRPage = () => {
  return (
    <SocketEventAdd>
      <HStack width="full">
        <VideoPlayer />
        <ChatBox />
      </HStack>
      <HStack backgroundColor="blue.200" width="80vw" height="20vh">
        {/* <Text>아바타</Text> */}
        <RoomAvatarView />
      </HStack>
    </SocketEventAdd>
  );
};

export default ViewingCSRPage;
