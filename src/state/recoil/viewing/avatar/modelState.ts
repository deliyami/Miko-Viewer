import { Model } from '@src/types/avatar/ModelType';
import { atom } from 'recoil';

const model = atom<{ [peerId: string]: Model | any }>({
  key: 'model',
  default: {},
});

export { model };
