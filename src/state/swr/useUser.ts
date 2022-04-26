import { setCookie } from '@src/helper';
import { axiosI } from '@src/state/fetcher';
import { LoginData, User } from '@src/types/share';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { loginState } from '../recoil';
import laggy from './middleware/laggy';

export const URL_USER = '/users';
const URL_LOGIN = '/login';
const URL_OAUTH_LOGIN = '/login/google';
const URL_LOGOUT = '/logout';

export const useUser = () => {
  const setIsLogin = useSetRecoilState(loginState);

  const aFetcher = (url: string) => {
    if (typeof window === 'undefined') return Promise.resolve(undefined);

    const isTokenExist = document.cookie.match(/^(.*;)?\s*isLogin\s*=\s*[^;]+(.*)?$/);
    if (!isTokenExist) {
      // NOTE  useSWR는 undefined일 경우 suspense가 안 끝남.
      return Promise.resolve(null);
    }
    //  TODO 쿠키 로직 문제
    return axiosI
      .get(url)
      .then(res => res.data)
      .catch(err => {
        setCookie('isLogin', '', 0.0001);
        setIsLogin(false);
        console.error(err);
        return null;
      });
  };

  const userResult = useSWRImmutable<User>(URL_USER, aFetcher, {
    errorRetryCount: 2,
    use: [laggy],
    suspense: true,
    revalidateOnMount: false, // NOTE Message에서 마운트 되면서 전체 페이지가 리랜더링 되었음.
  });

  useEffect(() => {
    if (userResult.data?.uuid) {
      window.localStorage.setItem('uuid', userResult.data.uuid);
    } else {
      window.localStorage.removeItem('uuid');
    }
  }, [userResult.data]);

  // NOTE   shallow 비교 항상 머리속에 염두
  return userResult;
};

export const tryLogin = async (loginData: LoginData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const setLoginStatus = useSetRecoilState(loginState);
  try {
    const { data } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, true);
    // setLoginStatus(true);
    return true;
  } catch (error) {
    return false;
  }
};

export const tryOAuthLogin = async (token: string) => {
  try {
    const { data } = await axiosI.post<User>(`${URL_OAUTH_LOGIN}`, {
      token,
    });
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    return false;
  }
};

export const tryLogOut = async () => {
  try {
    await axiosI.get(`${URL_LOGOUT}`);
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const useCheckLogin = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  useEffect(() => {
    const isTokenExist = document.cookie.match(/^(.*;)?\s*isLogin\s*=\s*[^;]+(.*)?$/);
    if (isTokenExist?.[0]) setIsLogin(true);
  }, []);

  return isLogin;
};
