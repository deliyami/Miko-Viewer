import { axiosI, fetcher } from '@src/state/fetcher';
import { LoginData, User } from '@src/types/User';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import laggy from './middleware/laggy';

const URL_USER = '/users';
const URL_LOGIN = '/login';
const URL_OAUTH_LOGIN = '/login/google';
const URL_LOGOUT = '/logout';

const useUser = () => {
  const aFetcher = (url: string) => {
    if (typeof window === 'undefined') return Promise.resolve(undefined);

    const isExistToken = document.cookie.match(
      /^(.*;)?\s*isLogin\s*=\s*[^;]+(.*)?$/
    );
    console.log('isExistToken', isExistToken);
    if (!isExistToken) return Promise.resolve(undefined);
    return fetcher(url);
  };

  return useSWRImmutable<User>(URL_USER, aFetcher, {
    errorRetryCount: 5,
    use: [laggy],
    // suspense: true,
  });

  // const isNotLogged = !isValidating && !data; // 확인중이 아니며, 데이터가 undefined
  // return { data, error, mutate, isValidating, isNotLogged };
};

const useLogin = async (loginData: LoginData) => {
  try {
    const { data, status } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    return false;
  }
};

const useOAuthLogin = async (token: string) => {
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

const useLogOut = async () => {
  try {
    const { data, status } = await axiosI.get(`${URL_LOGOUT}`);
    return undefined;
  } catch (error) {
    return undefined;
  }
};
export { useLogin, useUser, useLogOut, useOAuthLogin };
