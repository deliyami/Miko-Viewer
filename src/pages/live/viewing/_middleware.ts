import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const allowedParams = ['roomId'];

const LARAVEL_SESSION = 'laravel_session';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookies = req.cookies[LARAVEL_SESSION];
  if (!cookies) {
    return NextResponse.redirect('/login');
  }

  // const url = req.nextUrl;
  // if (url.searchParams.has('roomId') === false) {
  //   return NextResponse.redirect('/login');
  // }

  return NextResponse.next();
}
