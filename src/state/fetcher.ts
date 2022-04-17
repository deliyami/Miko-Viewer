import { createStandaloneToast } from '@chakra-ui/react';
import { LARAVEL_URL, NEST_URL } from '@src/const';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig<any> = {
  baseURL: LARAVEL_URL,
  withCredentials: true,
  timeout: 5000,
};

export const axiosI = axios.create(config);
const toast = createStandaloneToast();
// 요청 인터셉터 추가
export const requestInterceptor = axiosI.interceptors.request.use(
  function (aConfig) {
    // 요청을 보내기 전에 수행할 일

    return aConfig;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    console.error('❌ response error', error.toJSON());
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 1000,
      isClosable: true,
    });
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
export const responseInterceptor = axiosI.interceptors.response.use(
  response => {
    // 응답 데이터를 가공
    return response;
  },
  (error: AxiosError) => {
    // 오류 응답을 처리
    console.error('❌ response error', error.toJSON());
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 1000,
      isClosable: true,
    });
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) =>
  axiosI
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      // throw new Error("An error occurred while fetching the data.");
      console.log('error in fetcher', err);
      return null;
    });

export const fetcherForInfinite = (url: string) =>
  axiosI
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('error in fetcher infinite ', err);
      throw new Error('An error occurred while fetching the data.');
    });

export const nodeFetcher = (url: string) =>
  axiosI
    .get(url, { baseURL: NEST_URL })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('error in ndeFetcher', err);
      throw new Error('An error occurred while fetching the data.');
    });
