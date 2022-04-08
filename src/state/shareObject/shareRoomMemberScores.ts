//  WebRTC Data Connection으로 받은  룸 멤버들의 최신 스코어
//  이후 IntervalLayer에서  latestScoreState 에 방영되면서 삭제됨.
export const roomMemberScores = {} as { [key: string]: number };
