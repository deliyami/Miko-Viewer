import { waitingDonate } from '@src/state/shareObject/shareDonateObject';
import { DoneSendInterface } from '@src/types/share/DoneItem';

const addDonateToRoom = (data: DoneSendInterface) => {
  waitingDonate.push(data);
};

export default addDonateToRoom;
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
