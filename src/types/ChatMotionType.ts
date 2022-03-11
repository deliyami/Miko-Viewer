import * as Kalidokit from "kalidokit";
import { FaceDirection } from "./FaceDirectionType";

interface ChatMotionInterface {
  sender: string;
  motion: {
    pose: Kalidokit.TPose;
    face: FaceDirection<"left" | "center" | "right", number>;
    // face: { [key in "left" | "center" | "right"]: number };
  };
  amount?: number;
}

// type FaceDirection<K extends keyof any, T> = {
//   [Direction in K]: T;
// };

export type { ChatMotionInterface };
