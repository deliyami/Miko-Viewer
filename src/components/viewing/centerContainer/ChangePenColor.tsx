import { Center, Image } from '@chakra-ui/react';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { Variants } from 'framer-motion';

const BoxSize = 50;

const circleMotion: Variants = {
  hover: ([idx, length]: [number, number]) => {
    const degrees = (180 / length) * idx - 80;
    return {
      opacity: [0, 0.8, 1],
      x: Math.cos((degrees * Math.PI) / 180) * BoxSize * 1.2 + 10,
      y: Math.sin((degrees * Math.PI) / 180) * BoxSize * 1.2 + 25,
      width: BoxSize * 1.5,
      height: BoxSize * 1.5,
      transition: {
        duration: 0.5,
        type: 'spring',
        delay: 0.07 * (idx + 1),
      },
    };
  },
};

const iconMotion: Variants = {
  hidden: {
    width: 0,
    height: 0,
  },
  hover: {
    width: 25,
    height: 25,
  },
};

const colors = ['#39c5bb', '#ffcc11', '#ffee11', '#ffbbcc', '#dd4444', '#3366cc'];

const ChangePenColor = () => {
  return (
    <MotionBox bottom="20vh" left="1" display="flex" zIndex="2" justifyContent="center" alignItems="center" whileHover="hover" animate="hidden" position="absolute">
      {colors.map((child, idx) => (
        <MotionBox key={child} variants={circleMotion} custom={[idx, colors.length]} position="absolute">
          <MotionBox variants={iconMotion} borderRadius="full" backgroundColor={child} _hover={{ borderColor: 'white', border: '2px', scale: 1.5 }}></MotionBox>
        </MotionBox>
      ))}
      <Center border="2px" borderRadius="full" borderColor="white" width={BoxSize + 'px'} height={BoxSize + 'px'}>
        <Image alt="penlight-icon" boxSize="full" width={BoxSize * 0.7 + 'px'} height={BoxSize * 0.7 + 'px'} src="/image/temp/penlight.svg" color="white" />
      </Center>
    </MotionBox>
  );
};

export default ChangePenColor;
