import { UserTicket } from '@src/types/share/UserTicket';
import { atom, selector } from 'recoil';

const enterRoomIdState = atom<string>({
  key: 'enterRoomId',
  default: undefined,
});

const curUserTicketState = atom<UserTicket>({
  key: 'curUserTicket',
  default: undefined,
});

const enterConcertState = selector({
  key: 'enterConcert',
  get: ({ get }) => {
    return get(curUserTicketState)?.concert;
  },
});

export { enterConcertState, enterRoomIdState, curUserTicketState };
