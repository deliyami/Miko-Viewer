import { Cart } from '../local/Cart.d';
import { Coin } from './Coin.d';
import { Concert } from './Concert.d';
import { Product } from './Product.d';
import { Ticket } from './Ticket.d';
import { UserTicket } from './UserTicket.d';

export type UrlToTypeDict = {
  '/cart_products': Cart;
  '/coin_histories': Coin;
  '/concerts': Concert;
  '/products': Product;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
};
