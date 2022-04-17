import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/helper/createQueryStringKey';
import { CommonDataResponse, CommonFSW } from '@src/types/share/common';
import { UrlToTypeDict } from '@src/types/share/UrlToTypeDict';
import { AxiosError } from 'axios';

export async function getDataFromLaravel<K extends keyof UrlToTypeDict, T = UrlToTypeDict[K][], CT = CommonDataResponse<T>>(url: K, query?: CommonFSW): Promise<CT>;
export async function getDataFromLaravel<K extends keyof UrlToTypeDict, T = UrlToTypeDict[K], CT = CommonDataResponse<T>>(
  url: K,
  query?: CommonFSW,
  id?: number,
): Promise<CT | null> {
  let aUrl: string = url;
  aUrl += typeof id === 'number' ? `/${id}?` : '?';
  aUrl += query ? createFSWQueryString(query) : '';

  return axiosI
    .get<CT>(aUrl)
    .then(res => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err.message);
      return Promise.reject(err);
    });
}
