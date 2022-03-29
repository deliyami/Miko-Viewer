import { AnimationControls, motion, TargetAndTransition, Transition, VariantLabels } from 'framer-motion';
import { FC } from 'react';

// type Props = {
//   width?: string;
// };

const animate: AnimationControls | TargetAndTransition | VariantLabels | boolean = {
  y: ['20%', '-5%', '0%'],
  scale: [0, 1.1, 1],
};

const transition: Transition = {
  damping: 10,
  duration: 2,
  times: [0, 0.15, 0.3],
  repeat: 1,
  repeatType: 'reverse',
  repeatDelay: 5,
};

const DonateAnimationBox: FC = ({ children }) => {
  return (
    <motion.div animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default DonateAnimationBox;
