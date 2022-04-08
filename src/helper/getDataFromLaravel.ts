import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/helper/createQueryStringKey';
import { CommonFSW } from '@src/types/share/common/common';
import { AxiosError, AxiosResponse } from 'axios';

export const getDataFromLaravel = async <T>(url: string, query?: CommonFSW): Promise<AxiosResponse<T>> => {
  let finalUrl = url;
  query && (finalUrl += '?' + createFSWQueryString(query));
  return axiosI.get<T>(finalUrl).catch((e: AxiosError) => {
    console.error('error in getDataFromLaravel', e.message);
    return undefined;
  });
};
