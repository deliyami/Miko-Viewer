import { Concert } from '@src/types/share/Concert';
import useSWR from 'swr';
import {
  CommonDataResponse,
  CommonFSW,
  Pagination,
} from 'types/share/common/common';
import { createFSWQueryString } from './createQueryStringKey';
import { fetcher } from './fetcher';
import laggy from './middleware/laggy';

const URL_CONCERTS = '/concerts';

const useConcerts = (query?: CommonFSW) => {
  let url = URL_CONCERTS + '?';
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<Concert>>(
    query ? url : null,
    fetcher,
    {
      use: [laggy],
    }
  );

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
