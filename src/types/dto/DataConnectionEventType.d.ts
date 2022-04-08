import { ChatMotionInterface } from '../avatar/ChatMotionType';
import { DoneInterface } from '../share/DoneTypes';
import { ChatMessageInterface } from './ChatMessageType';

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
