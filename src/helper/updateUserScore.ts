import { roomMemberScores } from '@src/state/shareObject/shareObject';

export const updateUserScore = (id: string, newScore: number) => {
  roomMemberScores[id] = newScore;
};
