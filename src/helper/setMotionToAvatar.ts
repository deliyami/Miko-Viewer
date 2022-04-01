import { roomMemberMotions } from '@src/state/shareObject/shareMotionObject';
import { ChatMotionInterface } from '@src/types/ChatMotionType';

const setMotionToAvatar = (id: string, motionData: ChatMotionInterface) => {
  roomMemberMotions[id] = motionData.motion;
};

export default setMotionToAvatar;
