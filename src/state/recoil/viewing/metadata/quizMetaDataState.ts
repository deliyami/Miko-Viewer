import { QuizMetaData, QuizResultMetaData } from '@src/types/share';
import { atom } from 'recoil';

export const quizMetaDataState = atom<QuizMetaData | undefined>({
  key: 'quizMetaDataState',
  default: undefined,
});

export const quizResultMetaDataState = atom<QuizResultMetaData | undefined>({
  key: 'quizResultMetaDataState',
  default: undefined,
});
