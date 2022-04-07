import { atom } from 'recoil';
import { localStorageBooleanEffect } from './effects/localStorageBooleanEffect';

export const isOnAvatarState = atom<boolean>({
  key: 'isOnAvatarState',
  default: undefined,
  effects: [localStorageBooleanEffect('isOnAvatarState')],
});

export const isOnVideoAmbianceState = atom<boolean>({
  key: 'isOnVideoAmbianceState',
  default: undefined,
  effects: [localStorageBooleanEffect('isOnVideoAmbianceState')],
});

export const isOnMediaPipeState = atom<boolean>({
  key: 'isOnMediaPipeState',
  default: undefined,
  effects: [localStorageBooleanEffect('isOnMediaPipeState')],
});

export const isOnRankingState = atom<boolean>({
  key: 'isOnRankingState',
  default: undefined,
  effects: [localStorageBooleanEffect('isOnRankingState')],
});

export const isOnMyRankingState = atom<boolean>({
  key: 'isOnMyRankingState',
  default: undefined,
  effects: [localStorageBooleanEffect('isOnMyRankingState')],
});
