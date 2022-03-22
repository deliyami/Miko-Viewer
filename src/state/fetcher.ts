import { createStandaloneToast } from '@chakra-ui/react';
import { NEST_URL } from '@src/const';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig<any> = {
  baseURL: 'http://' + process.env.NEXT_PUBLIC_LARAVEL_URL,
  withCredentials: true,
  timeout: 5000,
};

const axiosI = axios.create(config);
const toast = createStandaloneToast();
// 요청 인터셉터 추가
const requestInterceptor = axiosI.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일

    return config;
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
const responseInterceptor = axiosI.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    return response;
  },
  function (error: AxiosError) {
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

const fetcher = (url: string) =>
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

const fetcherForInfinite = (url: string) =>
  axiosI
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error('An error occurred while fetching the data.');
    });

const nodeFetcher = (url: string) =>
  axiosI
    .get(url, { baseURL: NEST_URL })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error('An error occurred while fetching the data.');
    });

export { fetcher, axiosI, nodeFetcher };
