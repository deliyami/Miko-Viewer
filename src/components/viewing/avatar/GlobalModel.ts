import { Model } from '@src/types/ModelType';

const model: { [peerId: string]: Model } = {
  // 이것 변경하면 @src/const.ts에서 MY_AVATAR_ID값 변경해야 함
  kirari: {
    borns: undefined,
    originalBorns: undefined,
    scene: undefined,
  },
};

const setModel = (peerId: string, newModel: Model) => {
  model[peerId] = newModel;
};

export { model, setModel };
