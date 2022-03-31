import { JSONExporter } from '@src/components/viewing/chat/icon/JSONExporter';
import { PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { DonateProps } from '@src/types/DonateTypes';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC, forwardRef } from 'react';
/* eslint-disable */
export const DonateIcon: FC<DonateProps> = forwardRef(({ path, loop = true, autoplay = true, width = '100px' }, ref) => {
  const options: LottieOptions = {
    animationData: JSONExporter[PATHNAME[path]],
    loop,
    autoplay,
    style: {
      width,
    },
  };
  const { View } = useLottie(options);
  return View;
});
