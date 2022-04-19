import { Concert } from './Concert';
import { Ticket } from './Ticket';

export interface UserTicket {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  ticketId: number;
  ticket: Ticket;
  concertId: number;
  concert: Concert;
  isUsed: number;
  pRanking: null;
  gRanking: null;
}
