import { DoneSendInterface } from '@src/types/share';
import { atom } from 'recoil';

const doneState = atom<{ data: DoneSendInterface; x: number; y: number }[]>({
  key: 'doneState',
  default: [],
});

export { doneState };
