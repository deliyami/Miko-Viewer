import { NEXT_URL, USER_TICKET_COOKIE } from '@src/const';
import { checkLogin } from '@src/helper/api';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, _ev: NextFetchEvent) {
  // Check Login Cookie
  const userTicketId = req.cookies[USER_TICKET_COOKIE];
  const [isNotLogin, redirect] = checkLogin(req);
  if (isNotLogin) return redirect;

  if (!userTicketId) {
    // NOTE 절대값 경로만 써야함.
    return NextResponse.redirect(NEXT_URL);
  }

  return NextResponse.next();
}
