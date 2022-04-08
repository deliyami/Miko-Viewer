import { atom } from 'recoil';

export const myStreamState = atom<MediaStream>({
  key: 'myStream',
  default: undefined,
});
