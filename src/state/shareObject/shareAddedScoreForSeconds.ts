import { db } from '@src/pwa/db/db';

export const ScoreType = { chat: 0, motion: 1, done: 2, superChat: 3, test: 4, voice: 5 };

type ScoreTypeKeys = keyof typeof ScoreType;

export const scoreIdxToStringArray = Object.keys(ScoreType);

class AddedScoreForSeconds {
  private score: number;

  private concertId!: number;

  private userId!: number;

  constructor() {
    this.score = 0;

    const savedValue = localStorage.getItem('curUserTicket');
    if (savedValue != null) {
      try {
        const parsed = JSON.parse(savedValue);
        this.concertId = parsed.concertId;
        this.userId = parsed.userId;
      } catch {
        console.error('in AddedScoreForSeconds not curUserTicket');
      }
    }
  }

  public get getScore(): number {
    return this.score;
  }

  public set setScore(v: number) {
    this.score = v;
  }

  public addScore(addedScore: number, stringType: ScoreTypeKeys = 'chat') {
    if (!addedScore) return;
    this.score += addedScore;
    const type = ScoreType[stringType];
    db.scoreHistory.add({ addedScore, concertId: this.concertId, createdAt: Date.now(), totalScore: 10, type, userId: this.userId });
  }

  public getAndReset() {
    const { score } = this;
    this.score = 0;
    return score;
  }
}

export const addedScoreForSeconds = new AddedScoreForSeconds();
