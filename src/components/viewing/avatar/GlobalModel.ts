import { Model } from '@src/types/ModelType';

const model: { [peerId: string]: Model } = {
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
