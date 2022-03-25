import { MY_AVATAR_ID } from '@src/const';
import { ChatMotionInterface } from '@src/types/ChatMotionType';
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

const motionState = atom<ChatMotionInterface>({
  key: 'motion',
  default: {
    sender: MY_AVATAR_ID,
    motion: {
      pose: undefined,
      face: { left: 0, center: 0, right: 0 },
    },
  },
});

export { motionState };
