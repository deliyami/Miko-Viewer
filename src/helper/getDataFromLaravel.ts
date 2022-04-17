import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/helper/createQueryStringKey';
import { CommonDataResponse, CommonFSW, Pagination } from '@src/types/share/common';
import { UrlToTypeDict } from '@src/types/share/UrlToTypeDict';
import { AxiosError } from 'axios';

export async function getPageLaravelData<K extends keyof UrlToTypeDict, T = UrlToTypeDict[K], RT = Pagination<T>>(url: K, query?: CommonFSW, id?: number): Promise<RT> {
  let aUrl: string = url;
  aUrl += typeof id === 'number' ? `/${id}?` : '?';
  aUrl += query ? createFSWQueryString(query) : '';

  return axiosI
    .get<RT>(aUrl)
    .then(res => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err.message);
      return Promise.reject(err);
    });
}

export async function getSingleLaravelData<K extends keyof UrlToTypeDict, T = UrlToTypeDict[K], RT = CommonDataResponse<T>>(url: K, id?: number, query?: CommonFSW): Promise<RT> {
  let aUrl = `${url}/${id}?`;
  aUrl += query ? createFSWQueryString(query) : '';

  return axiosI
    .get<RT>(aUrl)
    .then(res => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err.message);
      return Promise.reject(err);
    });
}
