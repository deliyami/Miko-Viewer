import { MotionInterface } from '@src/types/ChatMotionType';
import { atom } from 'recoil';

// const modelState = atom<{ [peerId: string]: Model }>({
//   key: "model",
//   default: {
//     chulsu: {
//       borns: undefined,
//       originalBorns: undefined,
//       scene: undefined,
//     },
//   },
//   //   default: undefined,
// });

const latestMotionState = atom<{ [peerId: string]: MotionInterface }>({
  key: 'motion',
  default: {},
});

export { latestMotionState };
