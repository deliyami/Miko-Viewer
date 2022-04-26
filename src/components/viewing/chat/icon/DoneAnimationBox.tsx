import { AnimationControls, motion, TargetAndTransition, Transition, VariantLabels } from 'framer-motion';
import { FC, ReactElement } from 'react';

type Props = { children: ReactElement };

const animate: AnimationControls | TargetAndTransition | VariantLabels | boolean = {
  y: ['20%', '-5%', '0%'],
  scale: [0, 1.1, 1],
};

const DoneAnimationBox: FC<Props> = ({ children }) => {
  const transition: Transition = {
    damping: 10,
    duration: 0.2,
    times: [0, 0.15, 0.3],
  };

  return (
    <motion.div animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default DoneAnimationBox;
