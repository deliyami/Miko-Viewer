import { checkLogin } from '@src/helper/checkLogin';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const [isNotLogin, redirect] = checkLogin(req);
  if (isNotLogin) return redirect;

  return NextResponse.next();
}
