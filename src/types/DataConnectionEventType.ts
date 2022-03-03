import { ChatMessageInterface } from './ChatMessageType';

interface ChatEvent {
  type: 'chat';
  data: ChatMessageInterface;
}

interface MotionEvent {
  type: 'motion';
  data: {
    h: number;
  };
}

type DataConnectionEvent = ChatEvent | MotionEvent;

export type { DataConnectionEvent };
