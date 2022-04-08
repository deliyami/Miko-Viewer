import { NEXT_URL, USER_TICKET_COOKIE } from '@src/const';
import { checkLogin } from '@src/helper/checkLogin';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const allowedParams = ['roomId'];

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Check Login Cookie
  const userTicketId = req.cookies[USER_TICKET_COOKIE];

  const [isNotLogin, redirect] = checkLogin(req);
  if (isNotLogin) return redirect;

  if (!userTicketId) {
    // NOTE 절대값 경로만 써야함.
    return NextResponse.redirect(NEXT_URL);
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
