import { fetcher } from '@src/state/fetcher';
import { CommonDataResponse, CommonFindId, CommonFSW, Pagination } from '@src/types/share/common';
import { UrlToTypeDict } from '@src/types/share/UrlToTypeDict';
import useSWR, { SWRConfiguration } from 'swr';
import { createFSWQueryString } from './helper/createQueryStringKey';
import laggy from './middleware/laggy';

// query를 주지 않으면 null이 반환됨, 빈 오브젝트 {}라도 반드시 줘야함.
// CSR에 필요한 query 데이터가 필요한 경우가 있어서 이렇게 설계함.

export const usePageLaravel = <K extends keyof UrlToTypeDict, T = UrlToTypeDict[K], PT = Pagination<T>>(url: K, query: CommonFSW | null, option?: SWRConfiguration<PT>) => {
  let aUrl = url + '?';
  aUrl += query ? createFSWQueryString(query) : '';

  return useSWR<PT>(query ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};

export const useSingleLaravel = <K extends keyof UrlToTypeDict, T = UrlToTypeDict[K], CT = CommonDataResponse<T>>(
  url: K,
  id?: number,
  query?: CommonFindId,
  option?: SWRConfiguration<CT>,
) => {
  let aUrl = `${url}/${id}?`;
  aUrl += query ? createFSWQueryString(query) : '';

  const isReady = query && id;

  return useSWR<CT>(isReady ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};
