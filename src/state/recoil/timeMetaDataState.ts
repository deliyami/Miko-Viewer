import { QuizMetaData } from "@src/types/share/TimeMetadataFormat";
import { atom } from "recoil";
import { MessageMetadata, QuizResultMetaData } from "./../../types/share/TimeMetadataFormat";

export const quizMetaDataState = atom<QuizMetaData | undefined>({
  key: "quizMetaDataState",
  default: undefined,
});

export const quizResultMetaDataState = atom<QuizResultMetaData | undefined>({
  key: "quizResultMetaDataState",
  default: undefined,
});

export const msgMetaDataState = atom<MessageMetadata | undefined>({
  key: "msgMetaDataState",
  default: undefined,
});
