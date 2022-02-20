import { atom } from 'recoil';

const roomKeyState = atom<string>({
  key: 'roomKey',
  default: undefined,
});

const concertIdState = atom<number>({
  key: 'concertId',
  default: undefined,
});
