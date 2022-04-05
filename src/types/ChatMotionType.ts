import { FaceDirection } from '@src/types/FaceDirectionType';
import * as Kalidokit from 'kalidokit';

interface ChatMotionInterface {
  sender: string;
  motion: MotionInterface;
  amount?: number;
}
interface MotionInterface {
  pose: Kalidokit.TPose;
  face: FaceDirection<'left' | 'center' | 'right', number>;
}

export type { ChatMotionInterface };
export type { MotionInterface };
