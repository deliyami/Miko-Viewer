import { AnimationControls, motion, TargetAndTransition, Transition, VariantLabels } from 'framer-motion';
import { FC, useEffect } from 'react';

type Props = { retry: Function; duration?: number; delay?: number; x: number; y: number };

const animate: AnimationControls | TargetAndTransition | VariantLabels | boolean = {
  y: ['20%', '-5%', '0%'],
  scale: [0, 1.1, 1],
};

const DonateAnimationBox: FC<Props> = ({ children, retry, duration = 2, delay = 5, x, y }) => {
  const transition: Transition = {
    damping: 10,
    duration,
    times: [0, 0.15, 0.3],
    repeat: 1,
    repeatType: 'reverse',
    repeatDelay: delay,
  };
  useEffect(() => {
    setTimeout(() => {
      retry();
    }, (duration * 2 + delay) * 1000 + 500);
  }, []);
  return (
    <motion.div style={{ x, y, position: 'absolute' }} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default DonateAnimationBox;
