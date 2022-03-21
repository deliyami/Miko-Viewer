class AddedScoreForSeconds {
  private _score: number;
  constructor() {
    this._score = 0;
  }

  public get getScore(): number {
    return this._score;
  }

  public set setScore(v: number) {
    this._score = v;
  }

  public addScore(v: number) {
    this._score += v;
  }

  public getAndReset() {
    const score = this._score;
    this._score = 0;
    return score;
  }
}

export const addedScoreForSeconds = new AddedScoreForSeconds();
export const roomMemberScores = {} as { [key: string]: number };
export const hideChatSetTimeOut = {};
