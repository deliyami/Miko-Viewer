import { DonateIconName } from '@src/types/DonateTypes';
import { DoneItem, DoneSendInterface } from '@src/types/share/DoneItem';

// export interface DoneItem {
//     price: number;
//     name: string;
//     id: number;
//   }
const DONATEITEM = {} as { [id: number]: DoneItem };

export const PATHNAME: DonateIconName[] = ['Battery', 'Confetti', 'FourStar', 'GreenHeart', 'Gift', 'Mental', 'Night', 'StarBurst'];
for (let i: number = 0; i < PATHNAME.length; i++) {
  DONATEITEM[i] = {
    price: 10000 * i,
    name: PATHNAME[i] as string,
    id: i,
  };
}

export { DONATEITEM };

export const waitingDonate = [] as DoneSendInterface[];
