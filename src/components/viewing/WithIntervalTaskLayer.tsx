import sendToAllPeers from '@src/helper/sendToAllPeers';
import useSocket from '@src/hooks/useSocket';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { addedScoreForSeconds, roomMemberScores } from '@src/state/shareObject/shareObject';
import { useUser } from '@src/state/swr/useUser';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalTaskLayer: FC = ({ children }) => {
  const { data: user } = useUser();
  const socket = useSocket();
  // const userId = "0";
  const peers = useRecoilValue(peerDataListState);

  const setLatestScoreState = useSetRecoilState(latestScoreState);

  useEffect(() => {
    const updateLatestMyScoreInterval = setInterval(() => {
      // n 초간 추가된 점수를 더한 최신 총점수를 모든 룸 Peer에게 보냅니다.
      // redis 상의 자신의 랭킹 점수를 업데이트 합니다
      const addedScore = addedScoreForSeconds.getAndReset();
      setLatestScoreState(
        produce(draft => {
          const updatedScore = (draft?.[user.uuid] ?? 0) + addedScore;
          // DataConnection을 통해 전달 후 shareObject의 roomMemberScores를 업데이트
          sendToAllPeers(peers, { type: 'scoreUpdate', data: updatedScore });

          // redis에 자신의 점수를 업데이트
          socket.emit('fe-update-score', addedScore, updatedScore);

          // 나의 Score State를 업데이트
          draft[user.uuid] = updatedScore;
        }),
      );
    }, 1000);

    const updateRoomMemberScoreInterval = setInterval(() => {
      //  shareObject의 roomMemberScores에서 주기적으로 실제 ScoreState로 점수를 반영함.
      // console.log('peers', peers);
      // console.log('roomMemberScores', roomMemberScores);
      setLatestScoreState(
        produce(draft => {
          for (const key in roomMemberScores) {
            const newScore = roomMemberScores[key];
            draft[key] = newScore;
            delete roomMemberScores[key];
          }
        }),
      );
    }, 1000);

    return () => {
      clearInterval(updateLatestMyScoreInterval);
      clearInterval(updateRoomMemberScoreInterval);
    };
    // NOTE 또 이거 까먹어서 고생함.
  }, [peers, user.uuid, setLatestScoreState]);

  return <>{children}</>;
};
