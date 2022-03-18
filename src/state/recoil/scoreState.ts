import { atomFamily } from "recoil";

export const latestScoreStateF = atomFamily<number, string>({
  key: "latestScoreStateF",
  default: userUuid => {
    return 0;
  },
});
