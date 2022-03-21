import { atom } from 'recoil';

// export const latestScoreStateF = atomFamily<number, string>({
//   key: "latestScoreStateF",
//   default: userUuid => {
//     return 0;
//   },
// });

export const latestScoreState = atom<{ [key: string]: number }>({
  key: 'latestScoreStateF',
  default: {},
});
