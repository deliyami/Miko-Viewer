import { DoneSendInterface } from '@src/types/share/DoneItem';
import { atom } from 'recoil';

const donateState = atom<DoneSendInterface>({
  key: 'donateState',
  default: undefined,
});

const donateAccept = atom<boolean>({
  key: 'donateAccept',
  default: false,
});

export { donateState, donateAccept };
