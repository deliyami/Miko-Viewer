import { roomMemberMotions } from '@src/state/shareObject/shareMotionObject';
import { ChatMotionInterface } from '@src/types/ChatMotionType';

const setMotionToAvatar = (id: string, motionData: ChatMotionInterface) => {
  roomMemberMotions[id] = motionData.motion;
  // setMotion(id, motionData.motion.pose, motionData.motion.face);
};

export default setMotionToAvatar;

// let motion: ChatMotionInterface = {
//     sender: "kirari",
//     motion: {
//       pose: undefined,
//       face: { left: 0, center: 0, right: 0 },
//     },
//   };

//   const setMotion = (
//     peerId: string,
//     pose: Kalidokit.TPose,
//     face: FaceDirection<"left" | "center" | "right", number>
//   ) => {
//     motion = {
//       sender: peerId,
//       motion: {
//         pose,
//         face,
//       },
//     };
//   };
