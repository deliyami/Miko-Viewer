import { UserTicket } from "@src/types/share/UserTicket";
import axios from "axios";
import { atom, selector } from "recoil";
import { toastLog } from "./../../helper/toastLog";

const enterRoomIdState = atom<string>({
  key: "enterRoomId",
  default: undefined,
});

const enterRoomIdAsyncState = selector({
  key: "enterRoomIdAsync",
  get: async ({ get }) => {
    const setId = get(enterRoomIdState);
    if (setId) return setId;
    axios.defaults.withCredentials = true;
    const { data } = await axios.post<string>(
      "http://localhost:3001/api/room/enter-random",
      {
        // concertId: get(enterConcertState),
        concertId: 1111,
      },
      {
        withCredentials: true,
      },
    );

    if (data) {
      return data;
    } else {
      toastLog("error", "get random roomId fail", "fail");
    }
  },
});

const curUserTicketState = atom<UserTicket>({
  key: "curUserTicket",
  default: undefined,
});

const enterConcertState = selector({
  key: "enterConcert",
  get: ({ get }) => {
    return get(curUserTicketState)?.concert;
  },
});

export { enterConcertState, enterRoomIdState, curUserTicketState, enterRoomIdAsyncState };
