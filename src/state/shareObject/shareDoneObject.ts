import { DoneItem, DoneSendInterface } from '@src/types/share/DoneItem';
import { DoneIconName } from '@src/types/share/DoneTypes';

const DONEITEM = {} as { [id: number]: DoneItem };

const PATHNAME: DoneIconName[] = ['GreenHeart', 'Confetti', 'FourStar', 'Gift', 'Night', 'StarBurst'];
for (let i: number = 0; i < PATHNAME.length; i++) {
  DONEITEM[i] = {
    price: 5000,
    name: PATHNAME[i] as string,
    id: i,
  };
}

const waitingDone = [] as DoneSendInterface[];

export { PATHNAME, DONEITEM, waitingDone };
