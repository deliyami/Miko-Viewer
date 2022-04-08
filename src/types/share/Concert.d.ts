import { CommonProps } from './common/common';

declare interface Concert extends CommonProps {
  categoryId: number;
  user: number;
  coverImage: string;
  title: string;
  artist: string;
  detail: string;
  content: string;
  salesVolume: number;
  isPublic: boolean;
  allConcertStartDate: string;
  allConcertEndDate: string;
}

declare type CreateConcertData = Pick<Concert, 'coverImage' | 'title' | 'artist' | 'detail' | 'content' | 'categoryId' | 'allConcertStartDate' | 'allConcertEndDate'>;
