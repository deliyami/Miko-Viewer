import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { AiOutlineSound } from '@react-icons/all-files/ai/AiOutlineSound';
import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd';
import { BiVolumeMute } from '@react-icons/all-files/bi/BiVolumeMute';
import { FiMoreHorizontal } from '@react-icons/all-files/fi/FiMoreHorizontal';
import { AvatarModel } from '@src/components/viewing/avatar/AvatarModel';
import { NEXT_URL } from '@src/const';
import { isOnModelState, PeerDataInterface } from '@src/state/recoil/viewingState';
import { createRef, memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AvatarConnectionStatus } from './AvatarConnectionStatus';
import { AvatarMenu } from './AvatarMenu';
import { AvatarScore } from './AvatarScore';

const AVATAR_SIZE = 200;

type Props = {
  peer: PeerDataInterface;
};

export const Peer3DAvatar = memo<Props>(({ peer }) => {
  const { id: uuid, data, dataConnection, mediaStream, mediaConnection } = peer;

  const audioRef = createRef<HTMLAudioElement>();

  const [muted, setMuted] = useState(false);
  const isOnModel = useRecoilValue(isOnModelState);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = true;
      audio.srcObject = mediaStream;
    }
    console.log('abacdf');
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
      <AvatarMenu>
        <Center onClick={handleMute} cursor="pointer" zIndex="3" borderRadius="full" border="2px" padding="1">
          {muted ? <BiVolumeMute size="20px" /> : <AiOutlineSound size="20px" />}
          <audio autoPlay muted={muted} ref={audioRef}>
            audio
          </audio>
        </Center>
        <AiOutlineSound size="20px" />
        <AiOutlineUserAdd size="20px" />
        <FiMoreHorizontal size="20px" />
      </AvatarMenu>
      {isOnModel && (
        <Box overflow="hidden" position="relative" pointerEvents="none">
          <AvatarModel width={AVATAR_SIZE} height={AVATAR_SIZE} path={`${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`} peerId={uuid} antialias></AvatarModel>
        </Box>
      )}
      <Box width="full" position="absolute" top="0" h="2rem" color="white">
        <Text fontSize="6xl" id={uuid + 'motion'}></Text>
        <Text fontSize="3xl" width="30vw" id={uuid + 'chat'}></Text>
      </Box>
      <Heading position="absolute" top="2" left="1" fontSize="1.2rem">
        {data.name}
      </Heading>
      <AvatarConnectionStatus dataConnection={dataConnection} mediaStream={mediaStream} />

      <AvatarScore uuid={uuid} />
    </Box>
  );
});

Peer3DAvatar.displayName = 'Peer3DAvatar';
// 친구 추가
// 상세보기
