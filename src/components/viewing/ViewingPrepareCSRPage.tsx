import { Alert, AlertIcon, Box, BoxProps, Heading, HStack, Spinner, Tag, VStack } from '@chakra-ui/react';
import { toastLog } from '@src/helper';
import { useBeforeunload } from '@src/hooks';
import { useMyPeer, useSocket } from '@src/hooks/dynamicHooks';
import { ivsErrorState, mediapipeErrorState, myStreamState, peerErrorState, prepareAnimationDurationState, socketErrorState, streamErrorState } from '@src/state/recoil';
import { AnimatePresence, motion } from 'framer-motion';
import Script from 'next/script';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LottieVideoPlay from '../lottie/LottieVideoPlay';
import ViewingCSRPage from './ViewingCSRPage';
import MediaPipeSetup from './viewingPrepare/MediaPipeSetup';

// NOTE video를 true로 할경우 여러 브라우저에서 카메로 리소스 접근할때 보안상의 이유로 에러가 나올 확률이 높음
// getUserMedia의 callback이 실행되지 않아서 먼저 들어온 사람의 영상이 안 보일 수 있음.
// Bind 해주지 않으면 this 에러남.
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;
const streamOptions: MediaStreamConstraints = { audio: true, video: true };

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);
const MotionViewingCSRPage = motion(ViewingCSRPage);

// Prepare 단계를 둠으로써 State 상태 관리
const ViewingPrepareCSRPage = () => {
  const [fireRerender, setFireRerender] = useState(0);
  const [isMediapipeSetup, setIsMediapipeSetup] = useState(false);
  const [mediapipeError, setMediapipeError] = useRecoilState(mediapipeErrorState);
  const [isReadySocket, setIsReadySocket] = useState(false);
  const [socketError, setSocketError] = useRecoilState(socketErrorState);
  const [isReadyStream, setIsReadyStream] = useState(false);
  const [streamError, setStreamError] = useRecoilState(streamErrorState);
  const [isReadyPeer, setIsReadyPeer] = useState(false);
  const [peerError, setPeerError] = useRecoilState(peerErrorState);
  const [isReadyIvs, setIsReadyIvs] = useState(!!window.IVSPlayer); // script 로드는 이미 로드된 상태면 fire되지 않음.
  const [ivsError, setIvsError] = useRecoilState(ivsErrorState);
  const prepareAnimationDuration = useRecoilValue(prepareAnimationDurationState);

  const isAllReady = isReadyPeer && isReadySocket && isReadyStream && isReadyIvs && isMediapipeSetup;
  const [asyncIsAllReady, setAsyncIsAllReady] = useState<boolean>(isAllReady);

  const [myStream, setMyStream] = useRecoilState(myStreamState);

  const socket = useSocket();
  const myPeer = useMyPeer();

  const handleFireRerender = () => {
    setFireRerender(prev => prev + 1);
  };

  useEffect(() => {
    //  isAllReady의 상태가 방영된 상태로 Framer Motion이 exit 애니메이션을 실행하게 하기위해 AllReady가 2종류 임
    if (isAllReady) {
      setTimeout(() => {
        setAsyncIsAllReady(true);
      }, 0);
    }
  }, [isAllReady]);

  const handleCleanUp = () => {
    console.log('handleCleanUp');

    if (myStream) {
      myStream.getTracks().forEach(track => {
        track.stop();
        myStream.removeTrack(track);
      });
      setMyStream(undefined);
    }

    if (socket) {
      socket.emit('fe-user-left');
      socket.disconnect();
    }

    if (myPeer) {
      myPeer.disconnect();
      myPeer.destroy();
    }

    window.socket = undefined;
    window.myPeer = undefined;

    setMediapipeError(undefined);
    setSocketError(undefined);
    setStreamError(undefined);
    setPeerError(undefined);
    setIvsError(undefined);
  };

  useBeforeunload(() => {
    handleCleanUp();
    console.log('windowBeforeUnloadEvent in Prepare');
  });

  useEffect(() => {
    return () => {
      handleCleanUp();
    };
  }, []);

  useLayoutEffect(() => {
    getUserMedia(streamOptions)
      .then(stream => {
        setMyStream(stream);
        setIsReadyStream(true);
      })
      .catch(err => {
        // toastLog('error', 'get stream fail', '', err);
        console.error(err);
        setStreamError('カメラの接続に失敗しました。');
      });
  }, []);

  useLayoutEffect(() => {
    if (!socket) return;

    let timeoutId;
    if (socket.connected) {
      setIsReadySocket(true);
    } else {
      const checkSocketConnected = () => {
        if (socket.connected) {
          setIsReadySocket(true);
        } else {
          timeoutId = setTimeout(checkSocketConnected, 200);
        }
      };
      timeoutId = setTimeout(checkSocketConnected);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [socket]);

  useLayoutEffect(() => {
    //  on("open")에서 하면 useEffect에서 등록하기 전에 이미 open 되어버림.
    let setTimeoutId;
    if (myPeer.open) {
      setIsReadyPeer(true);
    } else {
      myPeer.reconnect();
      setTimeoutId = setTimeout(handleFireRerender, 200);
    }
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [myPeer.open, fireRerender]);
  useLayoutEffect(() => {
    if (!myPeer) return;

    const handleClose = () => {
      toastLog('error', 'myPeer destroyed', 'peer가 파괴되었습니다..');
      myPeer.destroy();
    };

    const handlePeerDisconnected = () => {
      //   myPeer.reconnect();
      toastLog('error', 'myPeer disconnected', 'peer가 시그널링 서버와 끊겼습니다.');
    };

    const handlePeerError = e => {
      toastLog('error', 'myPeer error', '심각한 에러발생 로그창 확인.');
      console.error('handlePeerError', e.type, e);
      switch (e.type as string) {
        case 'unavailable-id': // id가 중복되었을 경우
          myPeer.disconnect(); // reconnect를 위해 한번 disconnect를 할 필요가 있다.
          setPeerError('このIDで既に接続しているユーザーがいます。');
          break;
        default:
          setPeerError(e.type as string);
          break;
      }
    };

    myPeer.on('close', handleClose);

    myPeer.on('disconnected', handlePeerDisconnected);

    myPeer.on('error', handlePeerError);

    // NOTE  peer.connect 는  peer open 상태가 아니면 undefined 리턴
    return () => {
      myPeer.off('disconnected', handlePeerDisconnected);
      myPeer.off('error', handlePeerError);
    };
  }, [myPeer]);

  return (
    <>
      <AnimatePresence>
        {asyncIsAllReady ? (
          <MotionViewingCSRPage key="live-ing" />
        ) : (
          <MotionBox
            key="live-prepare"
            exit={{ x: 0, opacity: [1, 1, 1, 0], color: ['#000000', '#FFFFFFFF', '#FFFFFF00', '#FFFFFF00'], backgroundColor: ['#FFFFFF', '#282828FF', '#282828FF', '#28282800'] }}
            transition={{ duration: prepareAnimationDuration, times: [0, 0.6, 0.85, 1], type: 'keyframes' }}
            display="flex"
            position="fixed"
            zIndex="10000"
            justifyContent="center"
            alignItems="center"
            w="full"
            minH="100vh"
            sx={{ '.LottieVideoPlay  path': { stroke: '#39c5bb' } }}
          >
            <VStack>
              <Box position="relative">
                <MotionBox whileTap={{ scale: 1.2 }} position="relative">
                  <LottieVideoPlay />
                </MotionBox>
              </Box>
              <Heading fontSize="6xl">
                L<Spinner size="lg" thickness="7px" />
                ading...
              </Heading>
              <Box opacity={isAllReady ? 0 : 1.0} transition={'opacity 1s'}>
                <HStack py="5">
                  <Tag colorScheme={isReadyStream ? 'green' : 'red'}>カメラ</Tag>
                  <Tag colorScheme={isReadyPeer ? 'green' : 'red'}>P2P</Tag>
                  <Tag colorScheme={isReadySocket ? 'green' : 'red'}>Socket</Tag>
                  <Tag colorScheme={isReadyIvs ? 'green' : 'red'}>Script</Tag>
                  <Tag colorScheme={isMediapipeSetup ? 'green' : 'red'}>motion</Tag>
                </HStack>
                <HStack>
                  {[mediapipeError, socketError, streamError, peerError, ivsError].map((errorText, idx) => {
                    if (errorText)
                      return (
                        <Alert status="error">
                          <AlertIcon />
                          {peerError}
                        </Alert>
                      );
                  })}
                </HStack>
              </Box>
              <Script
                src="https://player.live-video.net/1.8.0/amazon-ivs-player.min.js"
                // @ts-ignore
                strategy="afterInteractive" // NOTE 왜 before하면 새로고침시 에러?, onLoad도 작동 안함?
                onLoad={e => {
                  console.log('ivs script loaded', e);
                  setIsReadyIvs(true);
                }}
                onError={err => {
                  toastLog('error', 'failed to load ivs script', '', err);
                  setIvsError(err);
                }}
              />
            </VStack>
          </MotionBox>
        )}
        <MediaPipeSetup setIsMediaPipeSetup={setIsMediapipeSetup} setMediaPipeError={setMediapipeError} />
      </AnimatePresence>
    </>
  );
};

export default ViewingPrepareCSRPage;
