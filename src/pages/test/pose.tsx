import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import '@mediapipe/camera_utils';
import * as cam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { aPose } from '@src/state/shareObject/sharePose';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// const sleep = miliseconds => {
//   const currentTime = new Date().getTime();

//   while (currentTime + miliseconds >= new Date().getTime()) {}
// };

const PoseTest = () => {
  const [time, setTime] = useState(0);
  const [cameraStart, setCameraStart] = useState(false);
  const [frameOn, setFrameOn] = useState(false);
  const camera = useRef<cam.Camera>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log('2');

    const setI = setInterval(() => {
      //   sleep(3000);
    }, 100);

    const set2 = setInterval(() => {
      //   console.log('*******************');
      setTime(Date.now());
    }, 100);
    return () => {
      console.log('3');
      clearInterval(setI);
      clearInterval(set2);
    };
  }, []);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current) {
      camera.current = new cam.Camera(webcamRef?.current, {
        onFrame: async () => {
          const img = document.createElement('img');
          await aPose.send({ image: webcamRef.current });
          setFrameOn(true);
        },
        width: 320,
        height: 240,
      });
      camera.current.start().then(() => {
        console.log('camera start');
        setCameraStart(true);
      });
      //   camera.current.start();
    }

    return () => {};
  }, []);

  return (
    <Center w="full" h="100vh">
      <VStack>
        <Spinner boxSize="300px" color="red.500" mb={20} />
        <Text fontSize="6xl">Loading...</Text>
        <Text>{cameraStart ? 'yes' : 'no'}</Text>
        <Text>{frameOn ? 'yes' : 'no'}</Text>
        <Text>{time} </Text>
        <Link href="/test/2" as="/test/as">
          link
        </Link>
      </VStack>
      <video
        ref={webcamRef}
        style={{
          display: 'hidden',
          position: 'absolute',
          width: 320,
          height: 240,
        }}
      ></video>
    </Center>
  );
};

export default PoseTest;
