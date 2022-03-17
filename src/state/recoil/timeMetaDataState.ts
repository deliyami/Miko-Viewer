import { QuizMetaData } from "@src/types/share/TimeMetadataFormat";
import { atom } from "recoil";

const quizMetaDataState = atom<QuizMetaData | undefined>({
  key: "quizMetaDataState",
  default: undefined,
});

export { quizMetaDataState };
