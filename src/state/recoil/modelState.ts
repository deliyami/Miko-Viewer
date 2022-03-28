import { Model } from '@src/types/ModelType';
import { atom } from 'recoil';

const model = atom<{ [peerId: string]: Model | any }>({
  key: 'model',
  default: {},
});

export { model };
