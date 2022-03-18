import sendToAllPeers from "@src/helper/sendToAllPeers";
import { latestScoreStateF } from "@src/state/recoil/scoreState";
import { peerDataListState } from "@src/state/recoil/viewingState";
import { addedScoreForSeconds } from "@src/state/shareObject/shareObject";
import { useUser } from "@src/state/swr/useUser";
import { FC, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const WithIntervalTaskLayer: FC = ({ children }) => {
  const { data } = useUser();
  // const userId = "0";
  const peers = useRecoilValue(peerDataListState);

  const setLatestScoreState = useSetRecoilState(latestScoreStateF(data.uuid));

  useEffect(() => {
    const updateLatestScoreIntervalId = setInterval(() => {
      const addedScore = addedScoreForSeconds.getAndReset();

      setLatestScoreState(prev => {
        const updatedScore = prev + addedScore;

        sendToAllPeers(peers, { type: "scoreUpdate", data: updatedScore });
        return updatedScore;
      });
    });

    return () => {
      clearInterval(updateLatestScoreIntervalId);
    };
  }, []);

  return <>{children}</>;
};
