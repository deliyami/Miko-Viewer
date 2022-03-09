import { atom } from 'recoil';
import { Ticket } from './../../types/share/Ticket';

const enterRoomIdState = atom<string>({
  key: 'enterRoomId',
  default: undefined,
});

const enterConcertIdState = atom<number>({
  key: 'enterConcert',
  default: 1111,
});

const curUseTicketState = atom<Ticket>({
  key: 'curUseTicket',
  default: undefined,
});

export { enterConcertIdState, enterRoomIdState, curUseTicketState };
