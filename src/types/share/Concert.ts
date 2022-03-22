import { CommonProps } from './common/common';

export interface Concert extends CommonProps {
  categoryId: number;
  user: number;
  coverImage: string;
  title: string;
  artist: string;
  detail: string;

  content: string;
  isPublic: boolean;
  allConcertStartDate: string;
  allConcertEndDate: string;
}

export type CreateConcertData = Pick<Concert, 'coverImage' | 'title' | 'artist' | 'detail' | 'content' | 'categoryId' | 'allConcertStartDate' | 'allConcertEndDate'>;
