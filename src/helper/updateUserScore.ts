import { roomMemberScores } from '@src/state/shareObject/shareRoomMemberScores';

export const updateUserScore = (id: string, newScore: number) => {
  roomMemberScores[id] = newScore;
};
