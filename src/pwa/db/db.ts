import Dexie, { Table } from 'dexie';

export interface ScoreHistory {
  id?: number;
  concertId: number;
  userId: number;
  createdAt: number;
  addedScore: number;
  totalScore: number;
  type: number;
}

// TODO 적당한 시기에 score 테이블 초기화
export class MySubClassedDexie extends Dexie {
  scoreHistory!: Table<ScoreHistory>;

  constructor() {
    super('mikoIndexedDB');
    this.version(1).stores({
      scoreHistory: '++id, concertId, userId,createdAt, addedScore, totalScore, type',
    });
  }
}

export const db = new MySubClassedDexie();
