import videoPlayJson from '@src/components/lottie/videoPlay.json';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC } from 'react';

const LottieVideoPlay: FC = () => {
  const options: LottieOptions = {
    animationData: videoPlayJson,
    loop: true,
    autoplay: true,
    className: 'LottieVideoPlay',
  };

  const { View } = useLottie(options);

  return View;
};

export default LottieVideoPlay;
