import { MY_AVATAR_ID } from '@src/const';
import { ChatMotionInterface, MotionInterface } from '@src/types/avatar/ChatMotionType';

class SendMotionForFrames {
  private motion: ChatMotionInterface;

  constructor() {
    this.motion = {
      sender: MY_AVATAR_ID,
      motion: undefined,
    };
  }

  public get getPeerId(): string {
    return this.motion.sender;
  }

  public get getMotion(): MotionInterface {
    return this.motion.motion;
  }

  public setPeerId(v: string) {
    this.motion.sender = v;
  }

  public setMotionStatus(v: MotionInterface) {
    this.motion.motion = v;
  }

  public getMotionObject(): ChatMotionInterface {
    return this.motion;
  }

  public motionReset(v: ChatMotionInterface) {
    this.motion = v;
  }
}

export const sendMotionForFrames = new SendMotionForFrames();

export const roomMemberMotions = {} as { [peerId: string]: MotionInterface };
