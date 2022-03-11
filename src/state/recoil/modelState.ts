import { ChatMotionInterface } from "@src/types/ChatMotionType";
import { Model } from "@src/types/ModelType";
import { atom } from "recoil";

const modelState = atom<{ [peerId: string]: Model }>({
  key: "model",
  default: {
    kirari: {
      borns: undefined,
      originalBorns: undefined,
      scene: undefined,
    },
  },
  //   default: undefined,
});

const motionState = atom<ChatMotionInterface>({
  key: "motion",
  default: {
    sender: "kirari",
    motion: {
      pose: undefined,
      face: { left: 0, center: 0, right: 0 },
    },
    timestamp: 0,
  },
});

export { modelState, motionState };
