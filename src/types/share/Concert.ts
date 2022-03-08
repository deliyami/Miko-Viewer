import { CommonProps } from './common/common';

export interface Concert extends CommonProps {
  id: number;
  createdAt: string;
  updatedAt: Date;
  categoryId: number;
  user: number;
  coverImage: string;
  title: string;
  artist: string;
  detail: string;
  channelArn: string;
  playbackUrl: string;
  streamKeyArn: string;
  streamKeyValue: string;
  content: string;
  isPublic: boolean;
  allConcertStartDate: string;
  allConcertEndDate: string;
}

export type CreateConcertData = Pick<
  Concert,
  | 'coverImage'
  | 'title'
  | 'artist'
  | 'detail'
  | 'content'
  | 'categoryId'
  | 'allConcertStartDate'
  | 'allConcertEndDate'
>;
