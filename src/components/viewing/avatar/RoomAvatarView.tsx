import { Box, Button, Center, Tag, Text } from '@chakra-ui/react';
import { AvatarModel } from '@src/components/viewing/avatar/AvatarModel';
import { NEXT_URL } from '@src/const';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { isOnModelState, myStreamState, PeerDataInterface, peerDataListState } from '@src/state/recoil/viewingState';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { useUser } from '@src/state/swr/useUser';
import { createRef, FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const AVATAR_SIZE = 200;

const TempAddScoreLogic = () => {
  useEffect(() => {
    const setIntervalId = setInterval(() => {
      addedScoreForSeconds.addScore(Math.round(Math.random() * 10));
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
  }, []);

  return <Box></Box>;
};

const UserBox: FC<{ peer: PeerDataInterface }> = ({ peer }) => {
  const { id: uuid, data, dataConnection, mediaStream } = peer;
  const scores = useRecoilValue(latestScoreState);
  const audioRef = createRef<HTMLAudioElement>();
  const score = scores?.[uuid] ?? 0;
  const [muted, setMuted] = useState(false);
  const isOnModel = useRecoilValue(isOnModelState);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = true;
      audio.srcObject = mediaStream;
    }
    return () => {};
  }, [mediaStream]);

  const handleMute = () => {
    setMuted(prev => !prev);
  };

  return (
    <Box
      position="relative"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      backgroundImage={!isOnModel && "url('/image/temp/avatar.png')"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      {isOnModel && (
        <>
          <AvatarModel width={AVATAR_SIZE} height={AVATAR_SIZE} path={`${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`} peerId={uuid} antialias></AvatarModel>
        </>
      )}
      <Box width="full" position="absolute" top="0" h="2rem" color="white">
        <Text fontSize="1xl">スコア</Text>
        <Text fontSize="2xl">{scores?.[uuid] ?? 0}</Text>
        <Text fontSize="6xl" id={uuid + 'motion'}></Text>
        <Text fontSize="3xl" width="30vw" id={uuid + 'chat'}></Text>
      </Box>
      <Box width="full" position="absolute" bottom="0" h="2rem" color="white">
        <Button size="sm" onClick={handleMute} colorScheme="facebook">
          {muted ? '뮤트됨' : '재생중'}
          <audio autoPlay muted={muted} ref={audioRef}>
            audio
          </audio>
        </Button>
        <Tag> Data {dataConnection ? '👌' : '❌'} </Tag>
        <Tag> media {mediaStream ? '👌' : '❌'}</Tag>
      </Box>
    </Box>
  );
};

const MyUserBox: FC = () => {
  const {
    data: { uuid },
  } = useUser();
  const myStream = useRecoilValue(myStreamState);
  const scores = useRecoilValue(latestScoreState);
  const isOnModel = useRecoilValue(isOnModelState);

  return (
    <Box
      position="relative"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      backgroundImage={!isOnModel && "url('/image/temp/avatar.png')"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      {isOnModel && (
        <Box overflow="hidden" position="relative">
          <AvatarModel width={AVATAR_SIZE} height={AVATAR_SIZE} path={`${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`} peerId={uuid} antialias></AvatarModel>
          {/* {myStream && <ModelMotion myPeerId={uuid} mediaStream={myStream}></ModelMotion>} */}
        </Box>
      )}
      <Box width="full" position="absolute" top="0" h="2rem" color="white">
        <Text fontSize="1xl">スコア</Text>
        <Text fontSize="2xl">{scores?.[uuid] ?? 0}</Text>
        <Text fontSize="6xl" id={uuid + 'motion'}></Text>
        <Text fontSize="3xl" width="30vw" id={uuid + 'chat'}></Text>
      </Box>
      {/* <TempAddScoreLogic /> */}
    </Box>
  );
};

const RoomAvatarView = () => {
  const peerDataList = useRecoilValue(peerDataListState);

  return (
    <Center gap="5">
      <MyUserBox />
      {peerDataList.map(peer => (
        <UserBox peer={peer} key={peer.id} />
      ))}
    </Center>
  );
};

export default RoomAvatarView;
