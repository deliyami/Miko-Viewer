import { motion } from 'framer-motion';
import { LottieOptions, useLottie } from 'lottie-react';
import { FC, useEffect, useState } from 'react';

type Props = {
  // path: string;
  path:
    | 'addland_heatfav_v2'
    | 'avatar_icon'
    | 'circular_audio_spectrum'
    | 'confetti_customized'
    | 'controller'
    | 'crown'
    | 'electric_battery'
    | 'get_four_starts'
    | 'gift_box'
    | 'hello_streamers'
    | 'like_heart'
    | 'loading_404_ufo'
    | 'melting_lolly'
    | 'mental_wellbeing'
    | 'night_day'
    | 'pool_chart_loading'
    | 'start_burst_animation';
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};
const DonateBallon: FC<Props> = ({ path, loop = true, autoplay = true, className = 'donateBallonDefaultClassName' }) => {
  const [value, setValue] = useState<any>();
  const options: LottieOptions = {
    animationData: value,
    loop,
    autoplay,
    className,
  };
  useEffect(() => {
    const loadData = async () => {
      const data = await import(`@src/components/viewing/donateBallon/json/${path}.json`);
      setValue(data);
    };
    loadData();
  }, [path]);
  //   const lottieStyle = { transform: 'scale(50%)' };
  const { View } = useLottie(options);
  return (
    <motion.div style={{ width: '300px' }} animate={{ y: '120%' }} transition={{ duration: 0.5 }}>
      {View}
    </motion.div>
  );
};

export default DonateBallon;
