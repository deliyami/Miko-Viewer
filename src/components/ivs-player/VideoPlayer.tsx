import { Box, Center, HStack, Spinner, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BiVolumeFull } from '@react-icons/all-files/bi/BiVolumeFull';
import { BiVolumeMute } from '@react-icons/all-files/bi/BiVolumeMute';
import { IoPause } from '@react-icons/all-files/io5/IoPause';
import { IoPlay } from '@react-icons/all-files/io5/IoPlay';
import { dayIsBetween, toastLog } from '@src/helper';
import { useIvsPlayer } from '@src/hooks/dynamicHooks';
import { enterTicketDataState, isOnVideoAmbianceState, msgMetaDataState, quizMetaDataState, quizResultMetaDataState } from '@src/state/recoil';
import { AllMetaData } from '@src/types/share';
import type * as ivs from 'amazon-ivs-player';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import QuizResultView from './QuizResultView';
import QuizView from './QuizView';
import VideoQualitySelect from './VideoQualitySelect';

// const streamUrl = 'https://de853ef2a345.us-east-1.playback.live-video.net/api/video/v1/us-east-1.121323684128.channel.Cj5ynk97sEJv.m3u8';

const jwt =
  'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy1lYXN0LTE6MTIxMzIzNjg0MTI4OmNoYW5uZWwvQ2o1eW5rOTdzRUp2IiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6IioiLCJleHAiOjE2NDY4MDg2MjQsImlhdCI6MTY0NDM4OTg2OX0.fmdaERbkxkNAThbJtFNv-JScxNl0dy1TSsS7gYWZmOWokUS-teTlZrMKwRvfaIXrUPRpBH7KQoI0n6wOOuOqwODM24mOpgv7OrUb6GBfTllKFes0XZ3sMCpey6bnkzya';

// NOTE aws cli 실행할때 region 설정 주의

const Video = styled.video`
  background-color: #292929;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const VideoPlayer: FC = () => {
  const IVSPlayer = useIvsPlayer();
  const router = useRouter();

  const [selectableQuality, setSelectableQuality] = useState<ivs.Quality[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  const player = useRef<ivs.MediaPlayer>();
  const videoEl = useRef(null);

  const enterTicketData = useRecoilValue(enterTicketDataState);
  if (!enterTicketData) router.push('/');

  const setQuizResultMetaDataState = useSetRecoilState(quizResultMetaDataState);
  const setQuizMetaDataState = useSetRecoilState(quizMetaDataState);
  const setMsgMetaDataState = useSetRecoilState(msgMetaDataState);
  const isOnVideoAmbiance = useRecoilValue(isOnVideoAmbianceState);

  // 브라우저 설정으로 인해서 소리와 함께 자동재생이 허용되지 않았을 경우 state 변경
  useEffect(() => {
    // if (!player.current) return;
    // setMuted(player.current.isMuted());
  }, [loading]);

  // @ts-ignore
  useEffect(() => {
    if (!videoEl.current) return;

    toastLog('info', 'USE EFFECT Video Player');
    const { ENDED, PLAYING, READY, BUFFERING, IDLE } = IVSPlayer.PlayerState;
    const { REBUFFERING, QUALITY_CHANGED, PLAYBACK_BLOCKED, ERROR, BUFFER_UPDATE, AUDIO_BLOCKED } = IVSPlayer.PlayerEventType;
    const { isPlayerSupported } = IVSPlayer;
    if (!isPlayerSupported) {
      toastLog('error', 'このブラウザでは利用ができません。 ');
      return router.push('/');
    }
    if (!enterTicketData) {
      return toastLog('error', 'No enterTicketData');
    }

    const onStateChange = () => {
      if (!player.current) return;
      const playerState = player.current.getState();
      // player.current.setLiveLowLatencyEnabled(true);
      console.log('-------------------');
      console.log('onStateChange', playerState);
      console.log('quality', player.current.getQuality());
      console.log('buffer time', player.current.getBuffered(), 'buffered duration', player.current.getBufferDuration());
      console.log('is auto play', player.current.isAutoplay());
      console.log('lowLatency', player.current.isLiveLowLatency());
      console.log('-------------------');

      setLoading(playerState === READY || playerState === BUFFERING);

      switch (playerState) {
        case READY:
          // eslint-disable-next-line no-case-declarations
          const qualities = player.current.getQualities();
          setSelectableQuality(qualities);
          player.current.setQuality(qualities[0], true); // 왜 이거 안해주면 버퍼링 오래 걸리지
          break;
        case BUFFERING:
          console.log('NOW BUFFERING');
          break;
        case PLAYING:
          break;
        case IDLE: // 스스로 멈췄을때
          toastLog('info', 'idle');
          break;
        case ENDED: // TODO 끝났을떄 로직
          if (dayjs(enterTicketData.concertEndDate).isAfter(Date.now())) {
            toastLog('info', 'コンサートが終了しました。');
          } else {
            toastLog('error', '動画ストリーミングに問題が発生しています。');
          }
          break;
        default:
          break;
      }
    };

    const tryLoadAndPlay = () => {
      player.current?.load(enterTicketData.playbackUrl + '?token=' + jwt);
      player.current?.play();
    };

    const onError = (err: any) => {
      if (!player.current) return;
      const errorType = err.type as ivs.ErrorType;
      switch (errorType) {
        case 'ErrorNoSource': // url 자체가 잘못됨.
          toastLog('error', '스트리밍 url이 잘못됨', '시딩을 확인해주세요.');
          break;
        case 'ErrorNotAvailable': // IVS에서 스트리밍 주이지 않음. , 429명 인원초과, 404면 미방송
          if (dayIsBetween(enterTicketData.concertStartDate, enterTicketData.concertEndDate)) {
            toastLog('info', '스트리밍 시작을 기다려주세요.', '3초 간격으로 확인합니다.');
            setTimeout(() => {
              tryLoadAndPlay();
            }, 3000);
          } else {
            toastLog('error', '콘서트 시간이 아닙니다. 뒤로가집니다.。');
            router.push('/');
          }
          break;
        case 'ErrorNetwork':
        case 'ErrorNetworkIO':
          toastLog('error', '네트워크 에러', '', err);
          break;
        case 'ErrorTimeout':
          toastLog('error', 'ive timeout', '', err);
          break;
        default:
          toastLog('error', 'IVS Player ERROR', '5초후 재시도', err);
          setTimeout(() => {
            tryLoadAndPlay();
          }, 5000);
          break;
      }
    };

    const onTimeMetaData = (cue: any) => {
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
    };
    // @ts-ignore
    const aPlayer = IVSPlayer.create(); // web 버전이어서 wasm 넣어줄 필요는 없음.
    player.current = aPlayer;
    player.current.setLogLevel('debug' as ivs.LogLevel.DEBUG);
    player.current.setLiveLowLatencyEnabled(true);
    player.current.setRebufferToLive(true); // NOTE
    console.log('is low?', player.current.isLiveLowLatency());
    // @ts-ignore
    player.current.load(enterTicketData.playbackUrl + '?token=' + jwt);
    player.current.attachHTMLVideoElement(videoEl.current);

    player.current.setAutoplay(true);
    player.current.setVolume(1);
    player.current.play();

    player.current.addEventListener(IDLE, onStateChange);
    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(BUFFERING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);
    player.current.addEventListener(ERROR, onError);

    player.current.addEventListener(REBUFFERING, e => {
      console.log(REBUFFERING, e);
    });
    player.current.addEventListener(QUALITY_CHANGED, e => {
      console.log(QUALITY_CHANGED, e);
    });
    player.current.addEventListener(PLAYBACK_BLOCKED, e => {
      console.log(PLAYBACK_BLOCKED, e);
    });
    player.current.addEventListener(BUFFER_UPDATE, e => {
      console.log(BUFFER_UPDATE, e);
      // const bufferlen = player.current.getBufferDuration();
      // if (bufferlen > 3.0) {
      //   player.current.seekTo(player.current.getPosition() + bufferlen - 1.1);
      // } else if (bufferlen > 2.0) {
      //   player.current.setPlaybackRate(1.5);
      // } else if (bufferlen > 1.5) {
      //   player.current.setPlaybackRate(1.25);
      // } else if (bufferlen > 1.35) {
      //   player.current.setPlaybackRate(1.1);
      // } else if (bufferlen > 1.1) {
      //   player.current.setPlaybackRate(1.05);
      // } else {
      //   player.current.setPlaybackRate(1);
      // }
    });
    player.current.addEventListener(AUDIO_BLOCKED, e => {
      console.log(AUDIO_BLOCKED, e);
    });
    player.current.addEventListener(IVSPlayer.PlayerEventType.TEXT_METADATA_CUE, onTimeMetaData);

    const intervalId = setInterval(() => {
      // player.current.setLiveLowLatencyEnabled(true);
      // player.current.setAutoMaxBitrate(true);
      // player.current.setAutoMaxQuality(true);
      // player.current.play();
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
      // if (player.current.getBufferDuration() > 7) {
      //   player.current.seekTo(player.current.getPosition() + 5.0);
      // }
      // console.log('-------------------------------');
    }, 1000);

    return () => {
      if (!player.current) return;
      player.current.removeEventListener(IDLE, onStateChange);
      player.current.removeEventListener(READY, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(BUFFERING, onStateChange);
      player.current.removeEventListener(ERROR, onError);
      player.current.removeEventListener(IVSPlayer.PlayerEventType.TEXT_METADATA_CUE, onTimeMetaData);
      player.current.delete();
      clearInterval(intervalId);
    };
  }, [enterTicketData]);

  useEffect(() => {
    const canvas = document.getElementById('ambiance') as HTMLCanvasElement;
    let requestAnimationId: number;
    if (canvas && isOnVideoAmbiance) {
      const ctx = canvas.getContext('2d');
      const drawAmbiance = () => {
        if (ctx && videoEl.current) {
          // console.time('draw ambiance');
          ctx.drawImage(videoEl.current, 0, 0, canvas.width, canvas.height);
          // console.timeEnd('draw ambiance');
          requestAnimationId = requestAnimationFrame(drawAmbiance);
        }
      };
      requestAnimationId = requestAnimationFrame(drawAmbiance);
    }

    return () => {
      cancelAnimationFrame(requestAnimationId);
    };
  }, [isOnVideoAmbiance]);

  const pause = () => {
    if (!player.current) return;
    const isPaused = player.current.isPaused();
    if (isPaused) {
      player.current.play();
    } else {
      player.current.pause();
    }
    setIsPlaying(isPaused);
  };

  const toggleMute = () => {
    if (!player.current) return;
    const shouldMute = !player.current.isMuted();
    player.current.setMuted(shouldMute);
    setMuted(shouldMute);
  };

  console.log('player', player.current);

  return (
    <Box id="player-wrapper" width="80%" position="relative" overflow="hidden" role="group">
      <Box id="aspect-spacer" pb="56.25%"></Box>
      <Box height="100%" width="100%" position="absolute" top="0">
        <QuizView />
        <QuizResultView />
        <Center position="absolute" w="full" h="full" zIndex="300" pointerEvents="none">
          {loading && <Spinner boxSize="36" />}
        </Center>
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
          <Text color="white">{enterTicketData?.playbackUrl}</Text>

          <HStack aria-label="video-controller" id="control-bottom" position="absolute" width="full" bottom="0" p="2rem" color="white">
            <Box fontSize="4xl" cursor="pointer" onClick={toggleMute}>
              {muted ? <BiVolumeMute /> : <BiVolumeFull />}
            </Box>
            <Box fontSize="4xl" cursor="pointer" onClick={pause}>
              {isPlaying ? <IoPlay /> : <IoPause />}
            </Box>
            <Box flexGrow={1}></Box>
            {player.current && <VideoQualitySelect player={player.current} selectableQuality={selectableQuality}></VideoQualitySelect>}
          </HStack>
        </Box>
        <Video ref={videoEl} playsInline></Video>
      </Box>
    </Box>
  );
};

//  ios를 위해 video 태그에 playsInline 반드시 필요함.

export default VideoPlayer;
