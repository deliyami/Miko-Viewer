import { JSONExporter } from '@src/components/viewing/chat/icon/JSONExporter';
import { DoneProps } from '@src/types/share';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC } from 'react';
/* eslint-disable */
export const DoneIcon: FC<DoneProps> = ({ path, loop = true, autoplay = true, width = 100 }) => {
  console.log('아이콘은 들어옴');
  const options: LottieOptions = {
    renderer: 'canvas',
    animationData: JSONExporter[path],
    loop,
    autoplay,
    style: {
      width: `${width}px`,
    },
  };
  const { View } = useLottie(options);
  console.log('아이콘 리턴도 도미');
  return View;
};
