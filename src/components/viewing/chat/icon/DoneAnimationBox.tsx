import { AnimationControls, motion, TargetAndTransition, Transition, VariantLabels } from 'framer-motion';
import { FC, ReactElement, useEffect } from 'react';

type Props = { endDone: Function; children: ReactElement; duration?: number; delay?: number; x: number; y: number };

const animate: AnimationControls | TargetAndTransition | VariantLabels | boolean = {
  y: ['20%', '-5%', '0%'],
  scale: [0, 1.1, 1],
};

const DoneAnimationBox: FC<Props> = ({ children, endDone, duration = 1, delay = 5, x, y }) => {
  console.log('donebox 들어옴');
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
      endDone();
    }, (duration * 2 + delay) * 1000 + 500);
  }, []);
  return (
    <motion.div style={{ x, y, position: 'absolute' }} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default DoneAnimationBox;
