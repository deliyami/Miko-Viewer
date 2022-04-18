import { atom } from 'recoil';

export const myStreamState = atom<MediaStream | undefined>({
  key: 'myStream',
  default: undefined,
});
