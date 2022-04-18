import { Model } from '@src/types/avatar/ModelType';
import { atom } from 'recoil';

export const modelListState = atom<{ [peerId: string]: Model | any }>({
  key: 'model',
  default: {},
});
