import { ChatMessageInterface } from "./ChatMessageType";
import { ChatMotionInterface } from "./ChatMotionType";

interface ChatEvent {
  type: "chat";
  data: ChatMessageInterface;
}

interface MotionEvent {
  type: "motion";
  data: ChatMotionInterface;
}

interface UpdateScoreEvent {
  type: "scoreUpdate";
  data: number;
}

type DataConnectionEvent = ChatEvent | MotionEvent | UpdateScoreEvent;

export type { DataConnectionEvent };
