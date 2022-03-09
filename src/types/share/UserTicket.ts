import { Ticket } from './Ticket';
export interface UserTicket {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  ticket_id: number;
  ticket?: Ticket;
  is_used: number;
  p_ranking: null;
  g_ranking: null;
}
