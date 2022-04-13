import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { FC, ReactElement } from 'react';

export const AvatarEnterEffect: FC<{ layoutId: string; children: ReactElement }> = ({ children, layoutId }) => {
  return (
    <MotionBox layoutId={layoutId} animate={{ scale: [0, 1], opacity: [0, 1], transition: { duration: 0.3 } }} exit={{ opacity: [1, 0], y: [0, 300] }}>
      {children}
    </MotionBox>
  );
};
