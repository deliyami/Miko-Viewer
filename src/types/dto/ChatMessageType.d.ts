import { User } from '../share';

interface ChatMessageInterface {
  sender: string;
  text: string;
  amount?: number;
  itemId?: number;
  timestamp: number;
  user?: User;
}

export type { ChatMessageInterface };
