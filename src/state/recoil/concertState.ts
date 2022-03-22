import { UserTicket } from '@src/types/share/UserTicket';
import axios from 'axios';
import { atom, selector } from 'recoil';
import { toastLog } from '../../helper/toastLog';

const enterRoomIdState = atom<string>({
  key: 'enterRoomId',
  default: undefined,
});

const curUserTicketState = atom<UserTicket>({
  key: 'curUserTicket',
  default: undefined,
});

const enterTicketDataState = selector({
  key: 'enterConcert',
  get: ({ get }) => {
    return get(curUserTicketState).ticket;
  },
});

const enterRoomIdAsyncState = selector({
  key: 'enterRoomIdAsync',
  get: async ({ get }) => {
    // private room일 경우 이미 지정 받은 상태임.
    const enterRoomId = get(enterRoomIdState);
    if (enterRoomId) return enterRoomId;

    // public room일 경우 서버에서 받아와서 접속
    axios.defaults.withCredentials = true;
    const { data: myRoomId } = await axios.post<string>(
      'http://localhost:3001/api/room/enter-random',
      {
        // concertId: get(enterConcertState),
        ticketId: get(enterTicketDataState).id,
      },
      {
        withCredentials: true,
      },
    );

    if (myRoomId) {
      return myRoomId;
    }
    toastLog('error', 'get random roomId fail', 'fail');
  },
});

export { enterTicketDataState, enterRoomIdState, curUserTicketState, enterRoomIdAsyncState };
