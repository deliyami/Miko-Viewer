import { CommonProps } from './common';

export interface Concert extends CommonProps {
  id: number;
  categoryId: number;
  userId: number;
  coverImage: string;
  title: string;
  artist: string;
  detail: string;
  content: string;
  salesVolume: number;
  isPublic: boolean;
  allConcertStartDate: string;
  allConcertEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateConcertData = Pick<Concert, 'coverImage' | 'title' | 'artist' | 'detail' | 'content' | 'categoryId' | 'allConcertStartDate' | 'allConcertEndDate'>;
