import { JSONExporter } from '@src/components/viewing/chat/icon/JSONExporter';
import { DonateProps } from '@src/types/DonateTypes';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC, forwardRef, useEffect, useState } from 'react';
/* eslint-disable */
export const DonateIcon: FC<DonateProps> = forwardRef(({ path, loop = true, autoplay = true, width = '100px' }, ref) => {
  const [value, setValue] = useState<any>();
  const options: LottieOptions = {
    animationData: JSONExporter[path],
    loop,
    autoplay,
    style: {
      width,
    },
  };
  //   useEffect(() => {
  //     const loadData = async () => {
  //       const data = await import(`@src/components/viewing/donateBallon/json/${path}.json`);
  //       setValue(data);
  //     };
  //     loadData();
  //   }, [path]);
  //   const lottieStyle = { transform: 'scale(50%)' };
  const { View } = useLottie(options);
  return View;
});

export const DonateLazyIcon: FC<DonateProps> = forwardRef(({ path, loop = true, autoplay = true, width = '100px' }, ref) => {
  const [value, setValue] = useState<any>();
  const options: LottieOptions = {
    animationData: value,
    loop,
    autoplay,
    style: {
      width,
    },
  };
  useEffect(() => {
    const loadData = async () => {
      const data = await import(`@src/components/viewing/chat/icon/json/${path}.json`);
      setValue(data);
    };
    loadData();
  }, [path]);
  const { View } = useLottie(options);
  return View;
});
