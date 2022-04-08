import { atom } from 'recoil';

export const mediapipeErrorState = atom<string>({
  key: 'mediapipeErrorState',
  default: undefined,
});

export const socketErrorState = atom<string>({
  key: 'socketErrorState',
  default: undefined,
});

export const streamErrorState = atom<string>({
  key: 'streamErrorState',
  default: undefined,
});

export const peerErrorState = atom<string>({
  key: 'peerErrorState',
  default: undefined,
});

export const ivsErrorState = atom<string>({
  key: 'ivsErrorState',
  default: undefined,
});
