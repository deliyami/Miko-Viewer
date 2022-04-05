import { MotionInterface } from '@src/types/ChatMotionType';
import { atom } from 'recoil';

const latestMotionState = atom<{ [peerId: string]: MotionInterface }>({
  key: 'motion',
  default: {},
});

export { latestMotionState };
