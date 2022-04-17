import { axiosI, fetcher } from '@src/state/fetcher';
import { LoginData, User } from '@src/types/share';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { loginState } from '../recoil';
import laggy from './middleware/laggy';

export const URL_USER = '/users';
const URL_LOGIN = '/login';
const URL_OAUTH_LOGIN = '/login/google';
const URL_LOGOUT = '/logout';

export const useUser = () => {
  const aFetcher = (url: string) => {
    if (typeof window === 'undefined') return Promise.resolve(undefined);

    const isTokenExist = document.cookie.match(/^(.*;)?\s*isLogin\s*=\s*[^;]+(.*)?$/);
    console.log('여기는 useUser 로그인 토큰', isTokenExist ? ' 존재 ✅' : ' 없음. ❌');
    if (!isTokenExist) {
      // NOTE  useSWR는 undefined일 경우 suspense가 안 끝남.
      return Promise.resolve(null);
    }
    return fetcher(url);
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
      // console.log(userResult.data);
    } else {
      window.localStorage.removeItem('uuid');
    }
  }, [userResult.data]);

  return userResult;

  // const isNotLogged = !isValidating && !data; // 확인중이 아니며, 데이터가 undefined
  // return { data, error, mutate, isValidating, isNotLogged };
};

export const tryLogin = async (loginData: LoginData) => {
  try {
    const { data } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, true);
    return true;
  } catch (error) {
    return false;
  }
};

export const tryOAuthLogin = async (token: string) => {
  try {
    const { data, status } = await axiosI.post<User>(`${URL_OAUTH_LOGIN}`, {
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
    if (isTokenExist) setIsLogin(true);
  }, []);

  return isLogin;
};
