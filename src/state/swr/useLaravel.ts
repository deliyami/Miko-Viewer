import { fetcher } from '@src/state/fetcher';
import { CommonDataResponse, CommonFindId, CommonFSW, Pagination } from '@src/types/share/common';
import { Concert } from '@src/types/share/Concert';
import { Ticket } from '@src/types/share/Ticket';
import { UserTicket } from '@src/types/share/UserTicket';
import useSWR, { SWRConfiguration } from 'swr';
import { createFSWQueryString } from './helper/createQueryStringKey';
import laggy from './middleware/laggy';

// query를 주지 않으면 null이 반환됨, 빈 오브젝트 {}라도 반드시 줘야함.
// CSR에 필요한 query 데이터가 필요한 경우가 있어서 이렇게 설계함.

type DataTypeDict = {
  '/concerts': Concert;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
};

export const usePageLaravel = <K extends keyof DataTypeDict, T = DataTypeDict[K], PT = Pagination<T>>(url: K, query?: CommonFSW, option?: SWRConfiguration<PT>) => {
  let aUrl = url + '?';
  aUrl += query ? createFSWQueryString(query) : '';
  // query && (aUrl += createFSWQueryString(query));

  return useSWR<PT>(query ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};

export const useSingleLaravel = <K extends keyof DataTypeDict, T = DataTypeDict[K], CT = CommonDataResponse<T>>(
  url: K,
  id: number,
  query?: CommonFindId,
  option?: SWRConfiguration<CT>,
) => {
  let aUrl = `${url}/${id}`;
  aUrl += query ? createFSWQueryString(query) : '';

  return useSWR<CT>(query ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};
