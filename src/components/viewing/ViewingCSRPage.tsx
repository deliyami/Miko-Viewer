import { HStack, VStack } from "@chakra-ui/react";
import VideoPlayer from "@src/components/ivs-player/VideoPlayer";
import ChatBox from "@src/components/viewing/chat/ChatBox";
import WithSocketEventLayout from "./AddSocketPeerLayer";
import { TempRoomAvatarView } from "./avatar/RoomAvatarView";
import ChatMessageInput from "./chat/ChatMessageInput";
import ViewingDrawer from "./menu/ViewingDrawer";
import ViewingSideMenuBar from "./menu/ViewingSideMenuBar";
import ViewingWindowEventLayout from "./ViewingWindowEventLayout";

const ViewingCSRPage = () => {
  return (
    <ViewingWindowEventLayout>
      <WithSocketEventLayout>
        <HStack width="100vw" minH="100vh" backgroundColor="#181818">
          <ViewingSideMenuBar />
          <VStack width="full">
            <VideoPlayer />
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
      </WithSocketEventLayout>
    </ViewingWindowEventLayout>
  );
};
export default ViewingCSRPage;
