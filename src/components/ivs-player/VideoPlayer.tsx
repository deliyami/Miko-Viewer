import { Box, HStack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { toastLog } from '@src/helper/toastLog';
import useIvsPlayer from '@src/hooks/useIvsPlayer';
import { enterTicketDataState } from '@src/state/recoil/concertState';
import { msgMetaDataState, quizMetaDataState, quizResultMetaDataState } from '@src/state/recoil/timeMetaDataState';
import { AllMetaData } from '@src/types/share/TimeMetadataFormat';
import * as ivs from 'amazon-ivs-player';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { IoPause, IoPlay } from 'react-icons/io5';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import QuizResultView from './QuizResultView';
import QuizView from './QuizView';
import VideoQualitySelect from './VideoQualitySelect';

// const streamUrl = 'https://de853ef2a345.us-east-1.playback.live-video.net/api/video/v1/us-east-1.121323684128.channel.Cj5ynk97sEJv.m3u8';

const jwt =
  'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy1lYXN0LTE6MTIxMzIzNjg0MTI4OmNoYW5uZWwvQ2o1eW5rOTdzRUp2IiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6IioiLCJleHAiOjE2NDY4MDg2MjQsImlhdCI6MTY0NDM4OTg2OX0.fmdaERbkxkNAThbJtFNv-JScxNl0dy1TSsS7gYWZmOWokUS-teTlZrMKwRvfaIXrUPRpBH7KQoI0n6wOOuOqwODM24mOpgv7OrUb6GBfTllKFes0XZ3sMCpey6bnkzya';

// NOTE aws cli 실행할때 region 설정 주의
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
const VideoPlayer: FC = () => {
  const IVSPlayer = useIvsPlayer();
  const router = useRouter();

  const [selectableQuality, setSelectableQuality] = useState<ivs.Quality[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  const player = useRef<ivs.MediaPlayer>(null);
  const playerBaseEl = useRef(null);
  const videoEl = useRef(null);

  const enterTicketData = useRecoilValue(enterTicketDataState);
  if (!enterTicketData) router.push('/');

  const setQuizResultMetaDataState = useSetRecoilState(quizResultMetaDataState);
  const setQuizMetaDataState = useSetRecoilState(quizMetaDataState);
  const setMsgMetaDataState = useSetRecoilState(msgMetaDataState);

  // 브라우저 설정으로 인해서 소리와 함께 자동재생이 허용되지 않았을 경우 state 변경
  useEffect(() => {
    if (!player.current) return;
    setMuted(player.current.isMuted());
  }, [loading]);

  if (!IVSPlayer.isPlayerSupported) {
    toastLog('info', 'IVS Player Not Supported');
    router.push('/');
  }

  useEffect(() => {
    const { ENDED, PLAYING, READY, BUFFERING, IDLE } = IVSPlayer.PlayerState;
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

    const onError = err => {
      console.warn('Player Event - ERROR:', err);
    };

    const onTimeMetaData = cue => {
      const result = JSON.parse(cue.text) as AllMetaData;
      if (result.type === 'q') {
        setQuizMetaDataState(result);
      }
      if (result.type === 'm') {
        setMsgMetaDataState(result);
      }
      if (result.type === 'qr') {
        setQuizResultMetaDataState(result);
      }

      console.log(player.current.getPosition().toFixed(2));
    };
    // @ts-ignore
    player.current = IVSPlayer.create(); // web 버전이어서 wasm 넣어줄 필요는 없음.
    player.current.attachHTMLVideoElement(videoEl.current);

    player.current.setAutoplay(true);
    player.current.setVolume(1);
    player.current.setLiveLowLatencyEnabled(true);

    // @ts-ignore
    player.current.load(enterTicketData.playbackUrl + '?token=' + jwt);
    player.current.play();

    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);
    player.current.addEventListener(ERROR, onError);
    player.current.addEventListener(IVSPlayer.PlayerEventType.TEXT_METADATA_CUE, onTimeMetaData);

    const intervalId = setInterval(() => {
      player.current.setLiveLowLatencyEnabled(true);
      // player.current.setAutoMaxBitrate(true);
      // player.current.setAutoMaxQuality(true);
      player.current.play();
      // console.log("-------------------------------", Date.now());
      // console.log("getBufferDuration", player.current.getBufferDuration()); // 현재 재생 위치보다, 남은 버퍼가  몇초 있는지
      // console.log("getBuffered", player.current.getBuffered()); // 메모리에 저장중이 버퍼 데이터의 시작 초 ~ 끝나는 초
      // console.log("getDuration", player.current.getDuration()); // 총 길이
      // console.log("getLiveLatency", player.current.getLiveLatency()); // 재생 속도
      // console.log("getPosition", player.current.getPosition()); //  현재 실 재생 위치
      // console.log("getPlaybackRate", player.current.getPlaybackRate()); //
      // console.log("getState", player.current.getState());
      // console.log("isAutoplay", player.current.isAutoplay());
      // console.log("isAutoQualityMode", player.current.isAutoQualityMode());
      // console.log("isLiveLowLatency", player.current.isLiveLowLatency());
      if (player.current.getBufferDuration() > 7) {
        player.current.seekTo(player.current.getPosition() + 5.0);
      }

      console.log('-------------------------------');
    }, 1000);

    return () => {
      player.current.play();
      player.current.removeEventListener(READY, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(ENDED, onStateChange);
      player.current.removeEventListener(ERROR, onError);
      player.current.removeEventListener(IVSPlayer.PlayerEventType.TEXT_METADATA_CUE, onTimeMetaData);
      player.current.delete();
      clearInterval(intervalId);
    };
  }, [enterTicketData]);

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
    <Box id="player-wrapper" width="80%" position="relative" overflow="hidden" role="group">
      <Box id="aspect-spacer" pb="56.25%"></Box>
      <Box height="100%" width="100%" position="absolute" top="0">
        <QuizView />
        <QuizResultView />
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
          <Text color="white">{enterTicketData.playbackUrl}</Text>

          <HStack aria-label="video-controller" id="control-bottom" position="absolute" width="full" bottom="0" p="2rem" color="white">
            <Box fontSize="4xl" cursor="pointer" onClick={toggleMute}>
              {muted ? <BiVolumeMute /> : <BiVolumeFull />}
            </Box>
            <Box fontSize="4xl" cursor="pointer" onClick={pause}>
              {isPlaying ? <IoPlay /> : <IoPause />}
            </Box>
            <Box flexGrow="1"></Box>
            <VideoQualitySelect player={player} selectableQuality={selectableQuality}></VideoQualitySelect>
          </HStack>
        </Box>
        <Video ref={videoEl} playsInline></Video>
      </Box>
    </Box>
  );
};

//  ios를 위해 video 태그에 playsInline 반드시 필요함.

export default VideoPlayer;
