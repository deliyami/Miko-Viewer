import { Box, Button, Center, HStack, Tag, Text } from '@chakra-ui/react';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { myStreamState, PeerDataInterface, peerDataListState } from '@src/state/recoil/viewingState';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { useUser } from '@src/state/swr/useUser';
import { createRef, FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AvatarModel } from './AvatarModel';
import ModelMotion from './ModelMotion';

const RoomAvatarView = () => {
  const peerDataList = useRecoilValue(peerDataListState);

  return (
    <HStack width="full" backgroundColor="blue.400">
      <MyUserBox />
      {peerDataList.map(peer => (
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
    setMuted(prev => !prev);
  };

  return (
    <Center width="300px" height="300px" bgColor="blackAlpha.500" id={id + 'box'} position="relative">
      <Text> {data.email} </Text>
      <AvatarModel width={300} height={300} path={'http://localhost:3000/resources/babylonjs/models/proseka/proseka.glb'} peerId={peer.id} antialias></AvatarModel>
      <Text fontSize="6xl" id={id + 'chat'}></Text>
      <Text fontSize="6xl" id={id + 'motion'}></Text>
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

const MyUserBox: FC = () => {
  const {
    data: { uuid, email },
  } = useUser();
  const [myStream, setMyStream] = useRecoilState(myStreamState);
  console.log('myStream', myStream);

  return (
    <Center width="300px" height="300px" bgColor="blackAlpha.500" id={uuid + 'box'} position="relative">
      <Text> {email} </Text>
      <AvatarModel width={300} height={300} path={'http://localhost:3000/resources/babylonjs/models/proseka/proseka.glb'} peerId={'kirari'} antialias></AvatarModel>
      {myStream ? <ModelMotion mediaStream={myStream}></ModelMotion> : <></>}
      <Text fontSize="6xl" id={uuid + 'chat'}></Text>
      <Text fontSize="6xl" id={uuid + 'motion'}></Text>
    </Center>
  );
};

export default RoomAvatarView;

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

const TempRoomAvatarView = () => {
  const { data } = useUser();
  const peers = useRecoilValue(peerDataListState);
  const scores = useRecoilValue(latestScoreState);

  return (
    <Center gap="5">
      <Box position="relative" width={200} height={200} bg="red" backgroundImage="url('/image/temp/avatar.png')" backgroundRepeat="no-repeat" backgroundSize="cover">
        <Text>나</Text>
        <Center width="full" position="absolute" bottom="0.5" h="2rem" color="white">
          <Text as="span" fontSize="1xl">
            내 Score
          </Text>
          <Text as="span" fontSize="2xl">
            {scores?.[data.uuid] ?? 0}
          </Text>
          <Text fontSize="6xl" id={data.id + 'chat'}></Text>
        </Center>
      </Box>

      {peers.map((peer, idx) => {
        const score = scores?.[peer.id] ?? 0;
        console.log('peer other in avatar', peer);
        return (
          <Box
            position="relative"
            key={peer.id}
            width={200}
            height={200}
            bg="red"
            backgroundImage="url('/image/temp/avatar.png')"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          >
            <Text>아바타</Text>
            <Center width="full" position="absolute" bottom="0.5" h="2rem" color="white">
              <Text as="span" fontSize="1xl">
                Score{' '}
              </Text>
              <Text as="span" fontSize="2xl">
                {score}
              </Text>
              <Text fontSize="6xl" id={peer.id + 'chat'}></Text>
            </Center>
          </Box>
        );
      })}
      <TempAddScoreLogic />
    </Center>
  );
};

export { TempRoomAvatarView };
