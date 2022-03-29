import { MY_AVATAR_ID } from '@src/const';
import { atom } from 'recoil';

type Donate = {
  nickname: string;
  coin: string | number;
  content: string;
  start: number;
};

const donateState = atom<Donate>({
  key: 'donate',
  default: {
    nickname: MY_AVATAR_ID,
    coin: 0,
    content: 'test입니다 저는',
    start: 0,
  },
});

export { donateState };
