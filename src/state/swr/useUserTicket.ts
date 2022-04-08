import { CommonDataResponse, CommonFSW, Pagination } from '@src/types/share/common';
import useSWR from 'swr';
import { UserTicket } from '../../types/share/UserTicket';
import { fetcher } from '../fetcher';
import { createFSWQueryString } from './helper/createQueryStringKey';
import laggy from './middleware/laggy';

const URL_USER_TICKETS = '/user_tickets';

const useUserTickets = (query?: CommonFSW) => {
  let url = URL_USER_TICKETS + '?';
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<UserTicket>>(query ? url : null, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

const useTicket = (Concert_id: number) => {
  const url = `${URL_USER_TICKETS}/${Concert_id}`;

  const swrResponses = useSWR<CommonDataResponse<UserTicket>>(url, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

export { useUserTickets, useTicket };
