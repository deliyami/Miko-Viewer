import { Box, Button, Center, HStack, Tag, Text } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import {
  myStreamState,
  PeerDataInterface,
  peerDataListState,
  videoStreamsState,
} from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { createRef, FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const RoomAvatarView = () => {
  const socket = useSocket();
  const user = useUser();

  const screenVideoRef = createRef<HTMLVideoElement>();

  const [videoStreams, setVideoStreams] = useRecoilState(videoStreamsState);
  const [myStream, setMyStream] = useRecoilState(myStreamState);

  const peerDataList = useRecoilValue(peerDataListState);

  // useEffect(() => {
  //   if (screenStream) {
  //     if (screenVideoRef?.current) {
  //       screenVideoRef.current.srcObject = screenStream;
  //       screenVideoRef.current.onloadedmetadata = function (e) {
  //         if (screenVideoRef?.current) {
  //           screenVideoRef.current.play();
  //         }
  //       };
  //     }
  //   }
  // }, [screenVideoRef, screenStream]);

  // useEffect(() => {
  //   if (screenStreamID) {
  //     setVideoStreams((streams) => {
  //       let screenStreams = streams.filter((el) => el.id === screenStreamID);
  //       if (screenStreams.length > 0) {
  //         setScreenStream(screenStreams[0]);
  //         let streamsCopy = [...streams].filter(
  //           (el) => el.id !== screenStreams[0].id
  //         );
  //         return streamsCopy;
  //       }

  //       return streams;
  //     });
  //   }
  // }, [screenStreamID, videoStreams]);

  // const videoStreamsList = (
  //   <>
  //     {myStream && (
  //       <Streamer
  //         controls={true}
  //         fullName={user.data.email ?? 'User 1'}
  //         muted={true}
  //         stream={myStream}
  //       />
  //     )}
  //     {videoStreams.length > 0 &&
  //       videoStreams.map((stream, idx) => {
  //         return (
  //           <Streamer
  //             key={`stream-${idx}`}
  //             controls={false}
  //             fullName={userNames[idx] ?? `User ${idx + 1}`}
  //             muted={false}
  //             stream={stream}
  //           />
  //         );
  //       })}
  //     {screenStream && screenVideoRef && (
  //       <div className="screen-sharing-video-cover">
  //         <video ref={screenVideoRef} muted={false} autoPlay={true} />
  //       </div>
  //     )}
  //   </>
  // );

  console.log('peerDataList', peerDataList);

  return (
    <HStack width="full" backgroundColor="blue.400">
      <Box>aaa</Box>
      {/* {videoStreamsList} */}
      {peerDataList.map((peer) => (
        <UserBox peer={peer} key={peer.id} />
      ))}
    </HStack>
  );
};

const UserBox: FC<{ peer: PeerDataInterface }> = ({ peer }) => {
  const { id, data, dataConnection, mediaStream } = peer;

  const audioRef = createRef<HTMLAudioElement>();

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = true;
      audio.srcObject = mediaStream;
    }
    return () => {};
  }, [mediaStream]);

  const handleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <Center
      width="300px"
      height="300px"
      bgColor="blackAlpha.500"
      id={id + 'box'}
      position="relative"
    >
      <Text> {data.email} </Text>
      <Text fontSize="6xl" id={id + 'chat'}>
        {' '}
      </Text>
      <Button onClick={handleMute}>
        {muted ? '뮤트됨' : '재생중'}
        <audio autoPlay muted={muted} ref={audioRef}>
          audio
        </audio>
      </Button>
      <HStack position="absolute" right="1" bottom="1">
        {dataConnection && <Tag> Data 👌</Tag>}
        {mediaStream && <Tag> media 👌</Tag>}
      </HStack>
    </Center>
  );
};

export default RoomAvatarView;
