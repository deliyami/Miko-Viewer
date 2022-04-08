import { waitingDone } from '@src/state/shareObject/shareDoneObject';
import { DoneSendInterface } from '@src/types/share/DoneItem';

export const addDoneToRoom = (data: DoneSendInterface) => {
  waitingDone[waitingDone.length] = data;
};
