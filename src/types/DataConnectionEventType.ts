import { ChatMessageInterface } from './ChatMessageType';
import { ChatMotionInterface } from './ChatMotionType';
import { DonateInterface } from './DonateTypes';

interface ChatEvent {
  type: 'chat';
  data: ChatMessageInterface;
}

interface MotionEvent {
  type: 'motion';
  data: ChatMotionInterface;
}

interface UpdateScoreEvent {
  type: 'scoreUpdate';
  data: number;
}

interface DonateEvent {
  type: 'donate';
  data: DonateInterface;
}

type DataConnectionEvent = ChatEvent | MotionEvent | UpdateScoreEvent | DonateEvent;

export type { DataConnectionEvent };
