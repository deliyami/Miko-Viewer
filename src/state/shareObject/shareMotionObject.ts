import { MY_AVATAR_ID } from '@src/const';
import { ChatMotionInterface, MotionInterface } from '@src/types/ChatMotionType';

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

//  WebRTC Data Connection으로 받은  룸 멤버들의 최신 스코어
//  이후 IntervalLayer에서  latestScoreState 에 방영되면서 삭제됨.
export const roomMemberMotions = {} as { [peerId: string]: MotionInterface };
