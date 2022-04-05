import { waitingDone } from '@src/state/shareObject/shareDoneObject';
import { DoneSendInterface } from '@src/types/share/DoneItem';

const addDoneToRoom = (data: DoneSendInterface) => {
  waitingDone[waitingDone.length] = data;
  // waitingDone.push(data);
};

export default addDoneToRoom;
// export interface DoneItem {
//   price: number;
//   name: string;
//   id: number;
// }
// export interface DoneSendInterface {
//   sender: string;
//   itemId: number;
//   timestamp: number;
// }
