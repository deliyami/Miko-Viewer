import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/createQueryStringKey';
import { CommonFSW } from '@src/types/share/common/common';

export const getDataFromLaravel = async <T>(url: string, query?: CommonFSW) => {
  let finalUrl = url;
  query && (finalUrl += '?' + createFSWQueryString(query));
  return axiosI.get<T>(finalUrl);
};
