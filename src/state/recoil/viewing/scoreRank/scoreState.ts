import { atom } from 'recoil';

export const latestScoreState = atom<{ [key: string]: number }>({
  key: 'latestScoreStateF',
  default: {},
});
