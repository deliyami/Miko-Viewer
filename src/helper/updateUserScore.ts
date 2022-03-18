import { latestScoreStateF } from "@src/state/recoil/scoreState";
import { useSetRecoilState } from "recoil";

export const updateUserScore = (id: string, newScore: number) => {
  const setLatestScore = useSetRecoilState(latestScoreStateF(id));
  console.log("update new Score", id, newScore);
  setLatestScore(newScore);
};
