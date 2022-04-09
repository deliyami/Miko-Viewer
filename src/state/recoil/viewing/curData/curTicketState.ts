import { UserTicket } from '@src/types/share';
import { atom, selector } from 'recoil';
import { localStorageEffect } from '../../effects/localStorageEffect ';

export const curUserTicketState = atom<UserTicket>({
  key: 'curUserTicket',
  default: undefined,
  effects: [localStorageEffect('curUserTicket')],
});

export const enterTicketDataState = selector({
  key: 'enterConcert',
  get: ({ get }) => {
    return get(curUserTicketState).ticket;
  },
});
