import { MotionInterface } from '@src/types/avatar/ChatMotionType';
import { atom } from 'recoil';

export const latestMotionState = atom<{ [peerId: string]: MotionInterface }>({
  key: 'motion',
  default: {},
});
