import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { Variants } from 'framer-motion';
import { Children, FC } from 'react';

const boxMotion: Variants = {
  hover: {
    // backgroundColor: '#15f5e911',
  },
};

const circleMotion: Variants = {
  hover: ([idx]: [number]) => {
    const xy = [
      [-80, -40],
      [-30, -60],
      [30, -60],
      [80, -40],
    ];
    return {
      opacity: [1, 1],
      x: xy[idx][0],
      y: xy[idx][1],
      //   width: '200px',
      //   height: '200px',
      //   scale: [0, 1.5],
      transition: {
        duration: 0.5,
        type: 'spring',
        // ease: 'easeIn',
        when: 'beforeChildren',
        delay: 0.1 * (idx + 1),
      },
    };
  },
};
const iconMotion: Variants = {};

export const AvatarMenu: FC = ({ children }) => {
  return (
    <MotionBox
      whileHover="hover"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      w="full"
      h="full"
      left="50%"
      transform="translate(-50%,0)"
      variants={boxMotion}
    >
      {Children.map(children, (child, idx) => (
        <MotionBox key="idx" variants={circleMotion} custom={[idx]} position="absolute">
          <MotionBox display="flex" alignItems="center" justifyContent="center" variants={iconMotion} w="40px" h="40px">
            {/* <Center w="40px" h="40px" bgColor="red" borderRadius="full"> */}
            {child}
            {/* </Center> */}
          </MotionBox>
        </MotionBox>
      ))}
    </MotionBox>
  );
};
//  세부 사항, 뮤트 on / off , 친구 추가 ,
