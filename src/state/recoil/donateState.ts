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
    nickname: 'kirari',
    coin: 0,
    content: '얄루얄루얄얄루 얄라셩얄라',
    start: 0,
  },
});

export { donateState };
