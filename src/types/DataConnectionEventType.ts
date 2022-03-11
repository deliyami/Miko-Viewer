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

type DataConnectionEvent = ChatEvent | MotionEvent;

export type { DataConnectionEvent };
