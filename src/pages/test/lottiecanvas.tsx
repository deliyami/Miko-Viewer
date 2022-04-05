import { Button, Center } from '@chakra-ui/react';
import LottieVideoPlay from '@src/components/lottie/LottieVideoPlay';

const lottiecanvas = () => {
  return (
    <Center w="full" h="100vh">
      <LottieVideoPlay></LottieVideoPlay>
      <Button
        onClick={() => {
          console.log('yaho');
        }}
      >
        아무것도 아닌 버튼
      </Button>
    </Center>
  );
};

export default lottiecanvas;
