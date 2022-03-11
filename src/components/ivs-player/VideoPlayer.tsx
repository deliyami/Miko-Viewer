import { Box, Button, HStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as ivs from 'amazon-ivs-player';
import { useEffect, useRef, useState } from 'react';
import VideoQualitySelect from './VideoQualitySelect';
const streamUrl =
  'https://de853ef2a345.us-east-1.playback.live-video.net/api/video/v1/us-east-1.121323684128.channel.Cj5ynk97sEJv.m3u8';

const jwt =
  'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy1lYXN0LTE6MTIxMzIzNjg0MTI4OmNoYW5uZWwvQ2o1eW5rOTdzRUp2IiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6IioiLCJleHAiOjE2NDY4MDg2MjQsImlhdCI6MTY0NDM4OTg2OX0.fmdaERbkxkNAThbJtFNv-JScxNl0dy1TSsS7gYWZmOWokUS-teTlZrMKwRvfaIXrUPRpBH7KQoI0n6wOOuOqwODM24mOpgv7OrUb6GBfTllKFes0XZ3sMCpey6bnkzya';

// NOTE aws cli 실행할때 region 설정 주의
// aws ivs put-metadata --channel-arn arn:aws:ivs:us-east-1:121323684128:channel/Cj5ynk97sEJv --metadata '{"question": "What does IVS stand for?", "correctIndex": 0, "answers": ["interactive video service", "interesting video service", "ingenious video service"]}'
declare global {
  interface Window {
    IVSPlayer: typeof ivs;
  }
}

const Video = styled.video`
  background-color: #292929;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

//  TODO  브라우저에 따라서 window에 IVSPlayer 없음
const VideoPlayer = (props) => {
  const { IVSPlayer } = window;

  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const [selectableQuality, setSelectableQuality] = useState<ivs.Quality[]>([]);
  // const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [muted, setMuted] = useState(false);

  // const [playerPosition, setPlayerPosition] = useState({});
  // const [playerSize, setPlayerSize] = useState({});

  const player = useRef<ivs.MediaPlayer>(null);
  const playerBaseEl = useRef(null);
  const videoEl = useRef(null);
  // const visibleRef = useRef(null);

  // 브라우저 설정으로 인해서 소리와 함께 자동재생이 허용되지 않았을 경우 state 변경
  useEffect(() => {
    if (!player.current) return;
    setMuted(player.current.isMuted());
  }, [loading]);

  if (IVSPlayer?.isPlayerSupported) {
    console.log('yes');
  } else {
    console.log('no');
  }

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState;
    const { ERROR } = IVSPlayer.PlayerEventType;
    const { isPlayerSupported } = IVSPlayer;
    if (!isPlayerSupported) {
      return console.warn('현재 브라우저는 ivs player를 지원하지 않습니다.');
    }

    const onStateChange = () => {
      const playerState = player.current.getState();

      switch (playerState) {
        case READY:
          setSelectableQuality(player.current.getQualities());
          console.log('aaa', player.current.getQualities());
          break;
        default:
          break;
      }

      console.log(`Player State - ${playerState}`);
      setLoading(playerState !== PLAYING);
    };

    const onError = (err) => {
      console.warn('Player Event - ERROR:', err);
    };

    const onTimeMetaData = (cue) => {
      console.log(cue);
      console.log('Timed metadata: ', cue.text);
      console.log(player.current.getPosition().toFixed(2));
    };
    //@ts-ignore
    player.current = IVSPlayer.create(); // web 버전이어서 wasm 넣어줄 필요는 없음.
    player.current.attachHTMLVideoElement(videoEl.current);

    player.current.setAutoplay(true);
    player.current.setVolume(1);

    player.current.load(streamUrl + '?token=' + jwt);
    player.current.play();

    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);
    player.current.addEventListener(ERROR, onError);
    player.current.addEventListener(
      IVSPlayer.PlayerEventType.TEXT_METADATA_CUE,
      onTimeMetaData
    );

    return () => {
      player.current.removeEventListener(READY, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(ENDED, onStateChange);
      player.current.removeEventListener(ERROR, onError);
      player.current.removeEventListener(
        IVSPlayer.PlayerEventType.TEXT_METADATA_CUE,
        onTimeMetaData
      );
      player.current.delete();
    };
  }, []);

  const pause = () => {
    const isPaused = player.current.isPaused();
    if (isPaused) {
      player.current.play();
    } else {
      player.current.pause();
    }
    console.log(player.current.isPaused());
    setIsPlaying(isPaused);
    // setIsMiniPlayer(false);
  };

  const resize = () => {
    const { offsetLeft, offsetTop } = playerBaseEl.current;

    window.scrollTo({
      top: offsetTop - 20,
      left: offsetLeft,
      behavior: 'smooth',
    });
  };

  const toggleMute = () => {
    const shouldMute = !player.current.isMuted();

    player.current.setMuted(shouldMute);
    setMuted(shouldMute);
  };

  // if (!isPlayerSupported) {
  //   return <Text> 지원되지 않는 브라우저 입니다. </Text>;
  // }

  return (
    <Box
      id="player-wrapper"
      width="90%"
      position="relative"
      overflow="hidden"
      role="group"
    >
      <Box id="aspect-spacer" pb="56.25%"></Box>
      <Box height="100%" width="100%" position="absolute" top="0">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="1"
          visibility="hidden"
          _groupHover={{
            visibility: 'visible',
          }}
        >
          <HStack
            id="control-bottom"
            position="absolute"
            width="full"
            bottom="0"
            pd="2rem"
          >
            <Button onClick={toggleMute}>
              {muted ? '소리켜기' : '뮤트하기'}
            </Button>
            <Button onClick={pause}>{isPlaying ? '정지' : '재생'}</Button>
            <Box flexGrow="1"></Box>
            <VideoQualitySelect
              player={player}
              selectableQuality={selectableQuality}
            ></VideoQualitySelect>
          </HStack>
        </Box>
        <Video ref={videoEl} playsInline></Video>
      </Box>
    </Box>
  );
};

//  ios를 위해 video 태그에 playsInline 반드시 필요함.

export default VideoPlayer;
