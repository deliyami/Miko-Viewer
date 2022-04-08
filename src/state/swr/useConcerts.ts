import { Concert } from '@src/types/share';
import { CommonDataResponse, CommonFSW, Pagination } from '@src/types/share/common';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { createFSWQueryString } from './helper/createQueryStringKey';
import laggy from './middleware/laggy';

const URL_CONCERTS = '/concerts';

const useConcerts = (query?: CommonFSW) => {
  let url = URL_CONCERTS + '?';
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<Concert>>(query ? url : null, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

const useConcert = (Concert_id: number) => {
  const url = `${URL_CONCERTS}/${Concert_id}`;

  const swrResponses = useSWR<CommonDataResponse<Concert>>(url, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

export { useConcerts, useConcert };
