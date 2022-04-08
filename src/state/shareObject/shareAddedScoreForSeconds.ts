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
