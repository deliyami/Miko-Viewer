import { Box, BoxProps, Text, VStack } from '@chakra-ui/react';
import { toastLog } from '@src/helper/toastLog';
import useBeforeunload from '@src/hooks/useBeforeunload';
import useMyPeer from '@src/hooks/useMyPeer';
import useSocket from '@src/hooks/useSocket';
import { isReadyIvsState, myStreamState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LottieVideoPlay from '../lottie/lottieVideoPlay';
import ViewingCSRPage from './ViewingCSRPage';

// NOTE video를 true로 할경우 여러 브라우저에서 카메로 리소스 접근할때 보안상의 이유로 에러가 나올 확률이 높음
// getUserMedia의 callback이 실행되지 않아서 먼저 들어온 사람의 영상이 안 보일 수 있음.
// Bind 해주지 않으면 this 에러남.
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;
const streamOptions: MediaStreamConstraints = { audio: true, video: true };

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

// Prepare 단계를 둠으로써 State 상태 관리
const ViewingPrepareCSRPage = () => {
  const [isReadySocket, setIsReadySocket] = useState(false);
  const [isReadyStream, setIsReadyStream] = useState(false);
  const [isReadyPeer, setIsReadyPeer] = useState(false);
  const [peerError, setPeerError] = useState(undefined);

  const [isReadyIvs, setIsReadyIvs] = useRecoilState(isReadyIvsState);

  const isAllReady = isReadyPeer && isReadySocket && isReadyStream && isReadyIvs;

  const socket = useSocket();
  const myPeer = useMyPeer();

  const user = useUser();
  const myPeerUniqueID = user.data?.uuid;

  const [myStream, setMyStream] = useRecoilState(myStreamState);
  // const roomId = useRecoilValue(enterRoomIdAsyncState);
  // const userTicket = useRecoilValue(curUserTicketState);
  // const { concertId, ticketId, id: userTicketId } = userTicket;

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
      myPeer.destroy();
    }

    window.socket = undefined;
    window.myPeer = undefined;
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

  useEffect(() => {
    getUserMedia(streamOptions)
      .then(stream => {
        setMyStream(stream);
        setIsReadyStream(true);
      })
      .catch(err => {
        toastLog('error', 'get stream fail', '', err);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!socket || !user.data || myPeer) {
    }
  }, [socket, myPeer, user.data]);

  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      setIsReadySocket(true);
    }
  }, [socket.connected, socket]);

  useEffect(() => {
    //  on("open")에서 하면 useEffect에서 등록하기 전에 이미 open 되어버림.
    if (myPeer.open) {
      setIsReadyPeer(true);
    }
  }, [myPeer.open]);
  useEffect(() => {
    if (!myPeer) return;

    const handlePeerDisconnected = () => {
      //   myPeer.reconnect();
      toastLog('error', 'myPeer disconnected', 'peer가 시그널링 서버와 끊겼습니다.');
    };

    const handlePeerError = e => {
      toastLog('error', 'myPeer error', '심각한 에러발생 로그창 확인.');
      setPeerError(e.type as string);
      console.error('handlePeerError', e.type, e);
    };

    myPeer.on('disconnected', handlePeerDisconnected);

    myPeer.on('error', handlePeerError);

    // NOTE  peer.connect 는  peer open 상태가 아니면 undefined 리턴

    return () => {
      myPeer.off('disconnected', handlePeerDisconnected);
      myPeer.off('error', handlePeerError);
    };
  }, [myPeer]);

  return (
    <AnimatePresence>
      {!isAllReady && (
        <MotionBox
          key="video-prepare"
          // initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1, backgroundColor: '#000000FF' }}
          exit={{ x: 0, opacity: 0, backgroundColor: '#00000000' }}
          transition={{ duration: 2 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="full"
          h="full"
          minH="100vh"
        >
          <VStack>
            <MotionBox whileTap={{ scale: 1.2 }}>
              <LottieVideoPlay />
            </MotionBox>
            <Text fontSize="6xl">Loading...</Text>
            <VStack>
              <Text> カメラ - {isReadyStream ? '✅' : '❌'} </Text>
              <Text> P2P - {isReadyPeer ? '✅' : '❌'} </Text>
              <Text> Socket - {isReadySocket ? '✅' : '❌'} </Text>
              <Text> Script - {isReadyIvs ? '✅' : '❌'} </Text>
              {peerError && <Text>{peerError}</Text>}
            </VStack>
            <Script
              src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
              // @ts-ignore
              strategy="afterInteractive" // NOTE 왜 before하면 새로고침시 에러?, onLoad도 작동 안함?
              onLoad={e => {
                console.log('ivs script load', e);
                setIsReadyIvs(true);
              }}
              onError={e => {
                toastLog('error', 'failed to load ivs script', '', e);
              }}
            />
          </VStack>
        </MotionBox>
      )}
      {isAllReady && <ViewingCSRPage />}
    </AnimatePresence>
  );
};

export default ViewingPrepareCSRPage;
