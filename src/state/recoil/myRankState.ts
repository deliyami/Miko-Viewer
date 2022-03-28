import { atom } from 'recoil';

export const myRankState = atom<{ [key: string]: number }>({
    key: 'myRank',
    default: {},
});
