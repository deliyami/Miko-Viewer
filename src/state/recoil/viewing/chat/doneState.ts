import { DoneSendInterface } from '@src/types/share';
import { atom } from 'recoil';

const doneState = atom<DoneSendInterface>({
  key: 'doneState',
  default: undefined,
});

const doneAccept = atom<boolean>({
  key: 'doneAccept',
  default: false,
});

export { doneState, doneAccept };
