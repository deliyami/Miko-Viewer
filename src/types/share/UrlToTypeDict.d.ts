import { Cart } from '../local/Cart.d';
import { Order } from '../local/Order.d';
import { Coin } from './Coin.d';
import { Concert } from './Concert.d';
import { Product } from './Product.d';
import { Recording } from './Recording';
import { Ticket } from './Ticket.d';
import { UserTicket } from './UserTicket.d';

export type UrlToTypeDict = {
  '/cart_products': Cart;
  '/coin_histories': Coin;
  '/concerts': Concert;
  '/orders': Order;
  '/products': Product;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
  '/recordings': Recording;
};
