import { UserTicket } from '@src/types/share/UserTicket';
import { atom } from 'recoil';

const enterRoomIdState = atom<string>({
  key: 'enterRoomId',
  default: undefined,
});

const enterConcertIdState = atom<number>({
  key: 'enterConcert',
  default: 1111,
});

const curUserTicketState = atom<UserTicket>({
  key: 'curUserTicket',
  default: undefined,
});

export { enterConcertIdState, enterRoomIdState, curUserTicketState };
