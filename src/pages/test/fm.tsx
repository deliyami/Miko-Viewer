import { Center, Heading } from '@chakra-ui/react';
import { BiVolumeMute } from '@react-icons/all-files/bi/BiVolumeMute';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const circleMotion: Variants = {
  hover: ([idx, total]: [number, number]) => {
    const xy = [
      [100, -100],
      [100, -50],
      [100, 0],
      [100, 50],
      [100, 100],
    ];
    return {
      opacity: [1, 1],
      x: xy[idx][0],
      y: xy[idx][1],
      width: '200px',
      height: '200px',
      //   scale: [0, 1.5],
      transition: {
        duration: 0.3,
        type: 'spring',
        ease: 'easeIn',
        when: 'beforeChildren',
        delay: 0.1 * (idx + 1),
        staggerChildren: 0.3,
      },
    };
  },
};

const iconMotion: Variants = {};
const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670', '#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670'];

const Test = () => {
  console.log('aaaaaaaaaaaa');

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    console.log('bbbbbbbb');

    return () => {};
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(Date.now()), 111);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Center w="full" h="full" flexDir="column">
      <Heading>Motion test</Heading>
      <Heading>Motion test</Heading>
      <MotionBox initial="" position="relative" whileHover="hover" display="flex" justifyContent="center" alignItems="center" w="100px" h="100px" bgColor="red">
        {new Array(4).fill(0).map((_, idx, arr) => (
          <MotionBox key="idx" variants={circleMotion} custom={[idx + 1, arr.length]} position="absolute" w="50px" h="50px">
            <MotionBox display="flex" alignItems="center" justifyContent="center" variants={iconMotion} w="full" h="full" borderRadius="full" backgroundColor="white" border="2px">
              <BiVolumeMute size="30px" />
            </MotionBox>
          </MotionBox>
        ))}
      </MotionBox>
      <Heading>{time}</Heading>
    </Center>
  );
};

export default Test;
