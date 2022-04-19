import { JSONExporter } from '@src/components/viewing/chat/icon/JSONExporter';
import { DoneProps } from '@src/types/share';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC, forwardRef } from 'react';
/* eslint-disable */
export const DoneIcon: FC<DoneProps> = forwardRef(({ path, loop = true, autoplay = true, width = 100 }, ref) => {
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
  return View;
});
