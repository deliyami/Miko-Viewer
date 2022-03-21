import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { USER_TICKET_COOKIE } from './../../../const';

const allowedParams = ['roomId'];

const LARAVEL_SESSION = 'laravel_session';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Check Login Cookie
  const isLogin = req.cookies[LARAVEL_SESSION];
  const userTicketId = req.cookies[USER_TICKET_COOKIE];

  if (!isLogin) {
    return NextResponse.redirect('/login');
  }

  if (!userTicketId) {
    return NextResponse.redirect('/');
  }

  // const { data } = await getDataFromLaravel<CommonDataResponse<UserTicket>>(
  //   URL_USER_TICKET + '/' + userTicketId,
  //   { with: ['concert', 'ticket'] }
  // );
  // if (!data) return NextResponse.redirect('/');
  // const { ticket } = data.data;
  // // TODO
  // if (ticket.concertStartDate) {
  // }

  // const url = req.nextUrl;
  // if (url.searchParams.has('roomId') === false) {
  //   return NextResponse.redirect('/login');
  // }

  return NextResponse.next();
}
