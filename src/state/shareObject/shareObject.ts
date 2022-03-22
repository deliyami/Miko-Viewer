class AddedScoreForSeconds {
  private score: number;

  constructor() {
    this.score = 0;
  }

  public get getScore(): number {
    return this.score;
  }

  public set setScore(v: number) {
    this.score = v;
  }

  public addScore(v: number) {
    this.score += v;
  }

  public getAndReset() {
    const { score } = this;
    this.score = 0;
    return score;
  }
}

export const addedScoreForSeconds = new AddedScoreForSeconds();

//  WebRTC Data Connection으로 받은  룸 멤버들의 최신 스코어
//  이후 IntervalLayer에서  latestScoreState 에 방영되면서 삭제됨.
export const roomMemberScores = {} as { [key: string]: number };

export const hideChatSetTimeOut = {};

export const topRankingData = [];
