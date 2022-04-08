import { roomMemberMotions } from '@src/state/shareObject/shareMotionObject';
import { ChatMotionInterface } from '@src/types/ChatMotionType';

export const setMotionToAvatar = (id: string, motionData: ChatMotionInterface) => {
  roomMemberMotions[id] = motionData.motion;
};
