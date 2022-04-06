import { Box, Divider } from '@chakra-ui/react';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { Variants } from 'framer-motion';
import Peer from 'peerjs';
import { memo, useEffect, useState } from 'react';

const avatarStatusMotion: Variants = {
  initial: {
    width: '20px',
    height: '5px',
  },
  hover: {
    opacity: [1, 1],
    width: '80px',
    height: '30px',
    transition: {
      duration: 0.3,
      type: 'spring',
      when: 'afterChildren',
    },
  },
};

const avatarStatusTextMotion: Variants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      when: 'beforeChildren',
    },
  },
};

type Props = {
  dataConnection?: Peer.DataConnection;
  mediaStream?: MediaStream;
};

const CONNECTION_CHECK_INTERVAL = 5000;

export const AvatarConnectionStatus = memo<Props>(({ dataConnection, mediaStream }) => {
  const setRerender = useState(0)[1];
  const isOkData = dataConnection?.open;
  const isOkMedia = mediaStream?.active;

  const fireRerender = () => {
    setRerender(prev => prev + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fireRerender();
    }, CONNECTION_CHECK_INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box onMouseEnter={fireRerender}>
      <MotionBox position="absolute" left="0" top="0" display="flex" whileHover="hover" initial="initial">
        <MotionBox variants={avatarStatusMotion} overflow="clip" backgroundColor={isOkData ? 'teal.300' : 'red.500'} display="flex" justifyContent="center" alignItems="center">
          <MotionBox variants={avatarStatusTextMotion}>Data {isOkData ? '👌' : '❌'}</MotionBox>
        </MotionBox>
        <Divider orientation="vertical" />
        <MotionBox variants={avatarStatusMotion} overflow="clip" backgroundColor={isOkData ? 'teal.300' : 'red.500'} display="flex" justifyContent="center" alignItems="center">
          <MotionBox variants={avatarStatusTextMotion}>Media {isOkMedia ? '👌' : '❌'}</MotionBox>
        </MotionBox>
      </MotionBox>
    </Box>
  );
});
AvatarConnectionStatus.displayName = 'AvatarConnectionStatus';
