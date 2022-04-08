import { atom } from 'recoil';
import { localStorageBooleanEffect } from '../effects/localStorageBooleanEffect';
import { localStorageNumberEffect } from '../effects/localStorageNumberEffect';

export const isOnAvatarState = atom<boolean>({
  key: 'isOnAvatarState',
  default: true,
  effects: [localStorageBooleanEffect('isOnAvatarState')],
});

export const isOnVideoAmbianceState = atom<boolean>({
  key: 'isOnVideoAmbianceState',
  default: true,
  effects: [localStorageBooleanEffect('isOnVideoAmbianceState')],
});

export const isOnMediaPipeState = atom<boolean>({
  key: 'isOnMediaPipeState',
  default: true,
  effects: [localStorageBooleanEffect('isOnMediaPipeState')],
});

export const isOnRankingState = atom<boolean>({
  key: 'isOnRankingState',
  default: true,
  effects: [localStorageBooleanEffect('isOnRankingState')],
});

export const isOnMyRankingState = atom<boolean>({
  key: 'isOnMyRankingState',
  default: true,
  effects: [localStorageBooleanEffect('isOnMyRankingState')],
});

export const isOnAudioAnalyzerState = atom<boolean>({
  key: 'isOnAudioAnalyzerState',
  default: true,
  effects: [localStorageBooleanEffect('isOnAudioAnalyzerState')],
});

export const isOnChatState = atom<boolean>({
  key: 'isOnChatState',
  default: true,
  effects: [localStorageBooleanEffect('isOnChatState')],
});

export const prepareAnimationDurationState = atom<number>({
  key: 'prepareAnimationDurationState',
  default: 2,
  effects: [localStorageNumberEffect('prepareAnimationDurationState')],
});

export const myAvatarReplicateNumState = atom<number>({
  key: 'myAvatarReplicateNumState',
  default: 0,
  effects: [localStorageNumberEffect('myAvatarReplicateNumState')],
});
