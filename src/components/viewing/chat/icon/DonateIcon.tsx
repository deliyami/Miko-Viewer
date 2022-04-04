import { JSONExporter } from '@src/components/viewing/chat/icon/JSONExporter';
import { PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { DonateProps } from '@src/types/DonateTypes';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC, forwardRef } from 'react';
/* eslint-disable */
export const DonateIcon: FC<DonateProps> = forwardRef(({ path, loop = true, autoplay = true, width = 100 }, ref) => {
  const options: LottieOptions = {
    renderer: 'canvas',
    animationData: JSONExporter[PATHNAME[path]],
    loop,
    autoplay,
    style: {
      width: `${width}px`,
    },
  };
  const { View } = useLottie(options);
  return View;
});
