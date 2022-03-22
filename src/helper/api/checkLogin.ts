/* eslint-disable @next/next/no-server-import-in-page */
import { LARAVEL_SESSION, LOGIN_COOKIE } from '@src/const';
import { NextRequest, NextResponse } from 'next/server';

//  로그인을 증명하는 2가지 Cookie를 체크, 하나라도 없을 경우 나머지 하나도 제거
export const checkLogin = (req: NextRequest) => {
  const { origin } = req.nextUrl;

  const laravelSession = req.cookies[LARAVEL_SESSION];
  const loginCookie = req.cookies[LOGIN_COOKIE];

  const isNotLogin = !loginCookie || !laravelSession;
  // NOTE 최신 Next 버전에서 상대경로는 허용하지 않는다.
  const redirect = NextResponse.redirect(`${origin}/login`).cookie(LARAVEL_SESSION, '', { maxAge: 0 }).cookie(LOGIN_COOKIE, '', { maxAge: 0 });

  return [isNotLogin, redirect];
};
