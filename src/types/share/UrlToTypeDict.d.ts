import { Cart } from '../local/Cart.d';
import { Coin } from './Coin.d';
import { Concert } from './Concert.d';
import { Ticket } from './Ticket.d';
import { UserTicket } from './UserTicket.d';

export type UrlToTypeDict = {
  '/concerts': Concert;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
  '/coin_histories': Coin;
  '/cart_products': Cart;
};
