import { Box, Button, Text } from '@chakra-ui/react';
import { AvatarModel } from '@src/components/viewing/avatar/AvatarModel';
import { NEXT_URL } from '@src/const';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { isOnModelState, PeerDataInterface } from '@src/state/recoil/viewingState';
import { createRef, FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AvatarConnectionStatus } from './AvatarConnectionStatus';
import { ScoreView } from './AvatarScore';

const AVATAR_SIZE = 200;

export const Peer3DAvatar: FC<{ peer: PeerDataInterface }> = ({ peer }) => {
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
        <Text fontSize="6xl" id={uuid + 'motion'}></Text>
        <Text fontSize="3xl" width="30vw" id={uuid + 'chat'}></Text>
      </Box>
      <AvatarConnectionStatus dataConnection={dataConnection} mediaStream={mediaStream} />
      <ScoreView score={scores?.[uuid] ?? 0} />
      <Box width="full" position="absolute" bottom="0" h="2rem" color="white">
        <Button size="sm" onClick={handleMute} colorScheme="facebook">
          {muted ? '뮤트됨' : '재생중'}
          <audio autoPlay muted={muted} ref={audioRef}>
            audio
          </audio>
        </Button>
      </Box>
    </Box>
  );
};
