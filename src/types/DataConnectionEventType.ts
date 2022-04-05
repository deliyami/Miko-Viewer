import { ChatMessageInterface } from './ChatMessageType';
import { ChatMotionInterface } from './ChatMotionType';
import { DoneInterface } from './DoneTypes';

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

interface DoneEvent {
  type: 'done';
  data: DoneInterface;
}

type DataConnectionEvent = ChatEvent | MotionEvent | UpdateScoreEvent | DoneEvent;

export type { DataConnectionEvent };
