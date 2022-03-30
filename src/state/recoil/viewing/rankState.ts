import { atom } from 'recoil';

export const myRankState = atom<number>({
  key: 'myRankState',
  default: undefined,
});
