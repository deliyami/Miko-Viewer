import { atom } from 'recoil';

export const mediapipeErrorState = atom<string | undefined>({
  key: 'mediapipeErrorState',
  default: undefined,
});

export const socketErrorState = atom<string | undefined>({
  key: 'socketErrorState',
  default: undefined,
});

export const streamErrorState = atom<string | undefined>({
  key: 'streamErrorState',
  default: undefined,
});

export const peerErrorState = atom<string | undefined>({
  key: 'peerErrorState',
  default: undefined,
});

export const ivsErrorState = atom<string | undefined>({
  key: 'ivsErrorState',
  default: undefined,
});
