import { ChatMotionInterface } from "@src/types/ChatMotionType";
import { FaceDirection } from "@src/types/FaceDirectionType";
import * as Kalidokit from "kalidokit";

let motion: ChatMotionInterface = {
  sender: "kirari",
  motion: {
    pose: undefined,
    face: { left: 0, center: 0, right: 0 },
  },
};

const setMotion = (peerId: string, pose: Kalidokit.TPose, face: FaceDirection<"left" | "center" | "right", number>) => {
  motion = {
    sender: peerId,
    motion: {
      pose,
      face,
    },
  };
};

export { motion, setMotion };
