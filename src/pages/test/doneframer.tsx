import { Center } from '@chakra-ui/react';
import { TempDoneOption } from '@src/components/viewing/chat/TempDoneOption';
import { motion } from 'framer-motion';

const letterAnimation = {
  initial: {
    y: null,
  },
  animate: {
    transition: {
      y: 100,
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
};

const popover = () => {
  return (
    <Center>
      <motion.span initial="initial" animate="animate" variants={letterAnimation}>
        test
      </motion.span>
      <TempDoneOption />
    </Center>
  );
};

export default popover;
