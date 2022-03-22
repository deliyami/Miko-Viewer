import { NEST_URL } from '@src/const';
import { UserTicket } from '@src/types/share/UserTicket';
import axios from 'axios';
import { atom, selector } from 'recoil';
import { toastLog } from '../../helper/toastLog';
import { localStorageEffect } from './effects/localStorageEffect ';

const enterRoomIdState = atom<string>({
  key: 'enterRoomId',
  default: undefined,
  effects: [localStorageEffect('enterRoomId')],
});

const curUserTicketState = atom<UserTicket>({
  key: 'curUserTicket',
  default: undefined,
  effects: [localStorageEffect('curUserTicket')],
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
      `${NEST_URL}/room/enter-random`,
      {
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
