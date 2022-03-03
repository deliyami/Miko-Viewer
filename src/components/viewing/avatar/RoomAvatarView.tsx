import { Box, HStack } from '@chakra-ui/react';
import Streamer from '@src/components/viewing/Streamer';
import useSocket from '@src/hooks/useSocket';
import {
  myStreamState,
  screenStreamIDState,
  screenStreamState,
  userNamesState,
  videoStreamsState,
} from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { createRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const RoomAvatarView = () => {
  const socket = useSocket();
  const user = useUser();

  const screenVideoRef = createRef<HTMLVideoElement>();

  const [screenStreamID, setScreenStreamID] =
    useRecoilState(screenStreamIDState);
  const [screenStream, setScreenStream] = useRecoilState(screenStreamState);

  const [videoStreams, setVideoStreams] = useRecoilState(videoStreamsState);
  const [myStream, setMyStream] = useRecoilState(myStreamState);
  const [userNames, setUserNames] = useRecoilState(userNamesState);

  useEffect(() => {
    if (screenStream) {
      if (screenVideoRef?.current) {
        screenVideoRef.current.srcObject = screenStream;
        screenVideoRef.current.onloadedmetadata = function (e) {
          if (screenVideoRef?.current) {
            screenVideoRef.current.play();
          }
        };
      }
    }
  }, [screenVideoRef, screenStream]);

  useEffect(() => {
    if (screenStreamID) {
      setVideoStreams((streams) => {
        let screenStreams = streams.filter((el) => el.id === screenStreamID);
        if (screenStreams.length > 0) {
          setScreenStream(screenStreams[0]);
          let streamsCopy = [...streams].filter(
            (el) => el.id !== screenStreams[0].id
          );
          return streamsCopy;
        }

        return streams;
      });
    }
  }, [screenStreamID, videoStreams]);

  const videoStreamsList = (
    <>
      {myStream && (
        <Streamer
          controls={true}
          fullName={user.data.email ?? 'User 1'}
          muted={true}
          stream={myStream}
        />
      )}
      {videoStreams.length > 0 &&
        videoStreams.map((stream, idx) => {
          return (
            <Streamer
              key={`stream-${idx}`}
              controls={false}
              fullName={userNames[idx] ?? `User ${idx + 1}`}
              muted={false}
              stream={stream}
            />
          );
        })}
      {screenStream && screenVideoRef && (
        <div className="screen-sharing-video-cover">
          <video ref={screenVideoRef} muted={false} autoPlay={true} />
        </div>
      )}
    </>
  );

  return (
    <HStack width="full" backgroundColor="blue.400">
      <Box>aaa</Box>
      {videoStreamsList}
    </HStack>
  );
};

export default RoomAvatarView;
